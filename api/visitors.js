const json = (response, status, body) => {
  response.statusCode = status;
  response.setHeader('Content-Type', 'application/json');
  response.end(JSON.stringify(body));
};

const supabaseRequest = async (path, options = {}) => {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !key) {
    throw new Error('Supabase visitor counter is not configured');
  }

  return fetch(`${url.replace(/\/$/, '')}/rest/v1/${path}`, {
    ...options,
    headers: {
      apikey: key,
      Authorization: `Bearer ${key}`,
      'Content-Type': 'application/json',
      Prefer: 'return=minimal',
      ...(options.headers || {}),
    },
  });
};

export default async function handler(request, response) {
  if (!['GET', 'POST'].includes(request.method)) {
    response.setHeader('Allow', 'GET, POST');
    return json(response, 405, { error: 'Method not allowed' });
  }

  try {
    if (request.method === 'POST') {
      const page = typeof request.body?.page === 'string' ? request.body.page : '/';
      const insert = await supabaseRequest('site_visits', {
        method: 'POST',
        body: JSON.stringify([{ page }]),
      });

      if (!insert.ok) {
        throw new Error('Could not register visit');
      }
    }

    const countResponse = await supabaseRequest('site_visits?select=id', {
      method: 'GET',
      headers: { Prefer: 'count=exact' },
    });

    if (!countResponse.ok) {
      throw new Error('Could not read visit count');
    }

    const range = countResponse.headers.get('content-range') || '';
    const count = Number(range.split('/').pop());

    if (!Number.isFinite(count)) {
      throw new Error('Invalid visitor count');
    }

    return json(response, 200, { count });
  } catch (error) {
    return json(response, 503, { error: 'Visitor counter unavailable' });
  }
}
