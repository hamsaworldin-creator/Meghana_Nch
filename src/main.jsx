import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { createRoot } from 'react-dom/client';
import gsap from 'gsap';
import Lenis from 'lenis';
import {
  ArrowDown,
  ArrowRight,
  Award,
  BookOpen,
  Brain,
  BriefcaseBusiness,
  ChevronDown,
  GraduationCap,
  Mail,
  Menu,
  Microscope,
  Palette,
  PenTool,
  Sparkles,
  Star,
  Trophy,
  Users,
  Volume2,
  VolumeX,
  WandSparkles,
  X,
} from 'lucide-react';
import './styles.css';
import { assetPath } from './utils/assetPath';

const navItems = ['About', 'Journey', 'Projects', 'Research', 'Teaching', 'Experience', 'Achievements', 'Contact'];

const heroTags = [
  'Artificial Intelligence',
  'Machine Learning',
  'Deep Learning',
  'Large Language Models',
  'Python',
  'React',
  'Java',
  'Human-AI Interaction',
];

const highlights = [
  { icon: GraduationCap, value: '9.4 CGPA', label: 'M.Tech in Data Science' },
  { icon: Trophy, value: 'University Topper', label: 'Academic Excellence' },
  { icon: Users, value: '1000+ Students', label: 'Taught, Guided, Mentored & Supported' },
  { icon: WandSparkles, value: '3+ Years in AI', label: 'Creating, Designing & Innovating' },
];

const journeyItems = [
  {
    stage: 'Schooling',
    score: 'SSC Score: 7.8/10',
    text:
      'During school, I actively participated in academic and non-academic activities and earned more than 15 certificates through competitions, achievements and extracurricular participation. This stage developed my confidence, curiosity, creativity and willingness to explore beyond textbooks.',
  },
  {
    stage: 'Intermediate',
    score: 'Intermediate Score: 69.9/100',
    text: 'This period strengthened my interest in technology and became the foundation for my engineering journey.',
  },
  {
    stage: 'B.Tech',
    score: 'B.Tech Score: 7.2/10',
    text:
      'During B.Tech, I gained practical experience by developing projects in software development and image processing.',
    details: ['Image Processing System: MATLAB and C#.NET', 'Library Management System: Bootstrap, SQL and Java'],
  },
  {
    stage: 'M.Tech in Data Science',
    score: 'M.Tech CGPA: 9.4/10 | University Topper',
    text:
      'During M.Tech, I specialised in Data Science and worked on real-time projects using Machine Learning, Deep Learning and Large Language Models. This phase strengthened my ability to connect research concepts with practical applications in mental health, recommendation systems and assistive technology.',
  },
];

const teachingSubjects = [
  'Java Programming',
  'C Programming',
  'Office Tools',
  'Python Programming',
  'Data Structures',
  'Machine Learning',
  'Fundamentals of Artificial Intelligence',
];

const teachingRoles = ['Teacher', 'Mentor', 'Guide', 'Designer', 'Creator', 'Evaluator', 'Project Facilitator', 'Motivator'];

const experienceDomains = [
  {
    title: 'Government Projects',
    text:
      'I contributed to software solutions supporting structured public-sector workflows, data handling and operational processes. This experience helped me understand the importance of reliability, clear validation, traceable data and maintainable systems in government-oriented applications.',
  },
  {
    title: 'Singapore Insurance Project',
    text:
      'I worked as part of an enterprise insurance-domain project involving business workflows, data management and application development. The project strengthened my understanding of domain-driven requirements, structured processes and the need for accuracy in enterprise systems.',
  },
  {
    title: 'Product-Based Project',
    text:
      'I contributed to a product-focused application where usability, maintainability, evolving business needs and long-term software quality were important. This experience helped me understand how product development differs from one-time project delivery.',
  },
  {
    title: 'HR Exit Process Automation',
    text:
      'I worked on automating employee exit workflows to reduce manual effort, improve process visibility and support smoother organisational coordination. The project demonstrated how automation can simplify repetitive administrative work and improve consistency.',
  },
];

const aiNodes = [
  'AI Development',
  'Research',
  'Teaching',
  'Prompt Engineering',
  'Song Writing',
  'Album Creation',
  'Editing',
  'Designing',
  'Content Creation',
  'Mentoring',
  'Automation',
  'Application Development',
];

const projects = [
  {
    id: 'image-processing',
    number: '01',
    title: 'Image Processing System',
    category: 'Academic Software Project',
    summary: 'I explored digital image processing using MATLAB and C#.NET.',
    overview:
      'I developed this image-processing project during B.Tech to explore how digital images can be processed, enhanced and analysed through software.',
    purpose: 'I built it to understand image-processing concepts and implement them through a usable software interface.',
    technologies: ['MATLAB', 'C#.NET'],
    impact: 'I built practical understanding of algorithm and interface integration.',
    features: ['Image manipulation', 'Processing workflows', 'Desktop application development', 'Technical integration'],
  },
  {
    id: 'library-management',
    number: '02',
    title: 'Library Management System',
    category: 'Academic Web Application',
    summary: 'I built a database-driven library application with Bootstrap, SQL and Java.',
    overview: 'I developed this software application to help manage library records, book-related information and common library operations.',
    purpose: 'I built it to reduce manual record handling and organise library information using a structured database-driven system.',
    technologies: ['Bootstrap', 'SQL', 'Java'],
    impact: 'I improved my understanding of database-backed application logic.',
    features: ['Book management', 'Student or user records', 'Database operations', 'Responsive interface'],
  },
  {
    id: 'mental-health-chatbot',
    number: '03',
    title: 'Mental Health Chatbot',
    category: 'Artificial Intelligence and Mental Health',
    summary: 'I designed supportive AI conversations for stress and emotional difficulty.',
    overview:
      'I developed an AI-based Mental Health Chatbot to provide supportive conversations for users experiencing stress or emotional difficulty.',
    purpose: 'I explored natural-language interaction, accessible mental health support and empathetic response design.',
    technologies: ['Natural Language Processing', 'Conversational AI', 'Emotion-aware interaction'],
    impact: 'I present this as a supportive system and not as a replacement for professional medical care.',
    features: ['Natural-language conversation', 'Emotion-aware responses', 'Mental-health support', 'Accessible interaction'],
  },
  {
    id: 'hybrid-recommendation',
    number: '04',
    title: 'Hybrid Recommendation System',
    category: 'Machine Learning',
    summary: 'I combined recommendation techniques to improve relevance and personalisation.',
    overview: 'I developed a Hybrid Recommendation System by combining multiple recommendation techniques to improve relevance and personalisation.',
    purpose: 'I built it to overcome the limitations of using only one recommendation approach.',
    technologies: ['Machine Learning', 'Hybrid Recommendation Model'],
    impact: 'I explored more adaptive and personalised recommendation behaviour.',
    features: ['User preferences', 'Item similarity', 'Recommendation algorithms', 'Personalisation'],
  },
  {
    id: 'artificial-eye',
    number: '05',
    title: 'Artificial Eye for Blind People',
    category: 'Assistive Artificial Intelligence',
    summary: 'I transformed visible text into accessible translated speech output.',
    overview: 'I developed an assistive AI application to help visually impaired users understand printed or visible text.',
    purpose: 'I built it to transform visual information into accessible audio output.',
    technologies: ['EasyOCR', 'Language Translator', 'Text-to-Speech'],
    impact: 'The system extracts text using EasyOCR, translates it when required and converts it into speech.',
    features: ['Capture or upload image', 'Extract text using OCR', 'Translate text when required', 'Read text aloud'],
  },
  {
    id: 'robopet-companion',
    number: '06',
    title: 'RoboPet Companion for Mental Health',
    category: 'AI, Robotics and Mental Health',
    summary: 'I designed a portable AI companion concept for emotional support.',
    overview:
      'I designed RoboPet Companion as a portable AI-based mental-health assistance ally for people experiencing anxiety, depression, loneliness or emotional stress.',
    purpose: 'I explored conversational AI, emotion-aware interaction, mood tracking, personalised responses, supportive reminders and robotic companionship.',
    technologies: ['Conversational AI', 'Emotion-aware interaction', 'Robotic companion concept'],
    impact:
      'This work is connected to my patent and research interests in continuous emotional and mental-health assistance. It is a support companion and not a substitute for qualified mental-health professionals.',
    features: ['Mood tracking', 'Personalised responses', 'Supportive reminders', 'Portable robotic embodiment'],
  },
];

const researchDomains = [
  'Artificial Intelligence',
  'Psychology',
  'Computational Neural Networks',
  'Brain and Cognition',
  'Mental Health',
  'Blockchain',
  'Quantum Computing',
  'Human-AI Interaction',
  'Assistive Technologies',
];

const achievements = {
  patents: [
    {
      title: 'Skin Cancer Detection Using Machine Learning and Quantum Computing',
      text: 'A research-driven system exploring the use of Machine Learning and Quantum Computing concepts for skin-cancer detection.',
    },
    {
      title: 'System and Method for Continuous Emotional and Mental Health Assistance Using a Portable Robotic Companion',
      text: 'A portable robotic mental-health support system designed to provide continuous emotional assistance and intelligent companionship.',
    },
  ],
  recognition: [
    'Certificate of Appreciation - Aadrita 2026: Recognised for dedicating 20 hours of service as Faculty Coordinator - Operations.',
    'Workshop Speaker: Hands-on Workshop on Data Visualization and Business Intelligence using Power BI.',
    'Special Recognition: Evaluator for HackerRank GenzPlus Hackathon.',
    'Hackathon Evaluator: Evaluator for a GDG Hackathon.',
  ],
};

const certificationGroups = [
  {
    title: 'Certifications',
    items: [
      ['Microsoft Azure Fundamentals', 'AZ-900', 'Cloud'],
      ['Master SQL for Data Science', 'Udemy', 'Data Science'],
      ['ChatGPT Prompt Engineering for Developers', 'DeepLearning.AI', 'AI'],
      ['Fundamentals of Deep Learning', 'NVIDIA', 'AI'],
    ],
  },
  {
    title: 'Faculty Development and Technical Learning',
    items: [
      ['Azure Machine Learning Workshop / FDP', 'Professional Learning', 'Cloud'],
      ['Agentic AI', 'CMR Institute of Technology', 'AI'],
      ['Machine Learning and Business Analytics', 'MVGR College of Engineering', 'Data Science'],
      ['Quantum Computing', 'Blackbucks Group', 'Quantum'],
      ['Optimizing the Research-to-Publication Journey', 'AITAM', 'Research'],
    ],
  },
  {
    title: 'Workshops, Conferences and Webinars',
    items: [
      ['Amrit Kaal Three-Day Robotics Workshop', 'ISRO', 'Robotics'],
      ['Freedom with AI', 'Webinar', 'AI'],
      ['Psychology and Human Behaviour', 'International Live Conference, OLCIAS', 'Psychology'],
    ],
  },
];

function CherryBlossomRain() {
  const rainRef = useRef(null);
  const petals = useMemo(
    () =>
      Array.from({ length: 26 }, (_, index) => ({
        id: index,
        left: `${(index * 37) % 100}%`,
        size: `${9 + (index % 5) * 3}px`,
        delay: `${index * -0.85}s`,
        duration: `${13 + (index % 7) * 2}s`,
        opacity: 0.32 + (index % 5) * 0.08,
        shade: ['#ffd8e8', '#ffc4dc', '#fff2f7', '#f2d8ff', '#ffe6ee'][index % 5],
        drift: `${index % 2 === 0 ? 42 : -36}px`,
      })),
    [],
  );

  useEffect(() => {
    const onPointerMove = (event) => {
      if (!rainRef.current || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
      const x = (event.clientX / window.innerWidth - 0.5) * 18;
      rainRef.current.style.setProperty('--wind', `${x}px`);
    };
    window.addEventListener('pointermove', onPointerMove, { passive: true });
    return () => window.removeEventListener('pointermove', onPointerMove);
  }, []);

  return (
    <div className="cherry-rain" ref={rainRef} aria-hidden="true">
      {petals.map((petal) => (
        <span
          key={petal.id}
          style={{
            '--left': petal.left,
            '--size': petal.size,
            '--delay': petal.delay,
            '--duration': petal.duration,
            '--opacity': petal.opacity,
            '--shade': petal.shade,
            '--drift': petal.drift,
          }}
        />
      ))}
    </div>
  );
}

function FloatingParticles({ count = 42, className = '' }) {
  const particles = useMemo(
    () =>
      Array.from({ length: count }, (_, index) => ({
        id: index,
        x: `${Math.random() * 100}%`,
        y: `${Math.random() * 100}%`,
        size: `${Math.random() * 4 + 2}px`,
        delay: `${Math.random() * -12}s`,
        duration: `${Math.random() * 8 + 8}s`,
        opacity: Math.random() * 0.35 + 0.16,
      })),
    [count],
  );

  return (
    <div className={`particles ${className}`} aria-hidden="true">
      {particles.map((particle) => (
        <span
          key={particle.id}
          style={{
            left: particle.x,
            top: particle.y,
            width: particle.size,
            height: particle.size,
            animationDelay: particle.delay,
            animationDuration: particle.duration,
            opacity: particle.opacity,
          }}
        />
      ))}
    </div>
  );
}

function useAutoPlayVideo(ref) {
  useEffect(() => {
    const video = ref.current;
    if (!video) return undefined;

    video.muted = true;
    video.defaultMuted = true;
    video.playsInline = true;

    const attemptPlay = () => {
      video.play().catch((error) => {
        console.warn('Video autoplay was blocked:', error);
      });
    };

    attemptPlay();
    video.addEventListener('canplay', attemptPlay);

    return () => {
      video.removeEventListener('canplay', attemptPlay);
    };
  }, [ref]);
}

function SectionBackgroundVideo({ src, poster, className = '', objectPosition = 'center center', overlay }) {
  const videoRef = useRef(null);
  useAutoPlayVideo(videoRef);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.play().catch(() => undefined);
        } else {
          video.pause();
        }
      },
      { rootMargin: '200px 0px', threshold: 0.05 },
    );

    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  return (
    <div className={`section-video-background ${className}`} aria-hidden="true">
      <video
        ref={videoRef}
        aria-hidden="true"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        poster={poster}
        tabIndex={-1}
        style={{ objectPosition }}
        onCanPlay={(event) => {
          event.currentTarget.play().catch(() => undefined);
        }}
        onError={(event) => {
          console.error('Background video failed', {
            source: event.currentTarget.currentSrc,
            error: event.currentTarget.error,
          });
        }}
      >
        <source src={src} type="video/mp4" />
      </video>
      <div className="section-video-tint" />
      {overlay}
    </div>
  );
}

function Nav() {
  const [active, setActive] = useState('home');
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const navRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.brand-mark', { opacity: 0, y: -8 }, { opacity: 1, y: 0, duration: 0.55, ease: 'sine.out' });
      gsap.fromTo('.nav-line', { scaleX: 0 }, { scaleX: 1, duration: 0.9, ease: 'power2.inOut', delay: 0.1 });
      gsap.fromTo('.nav-link', { opacity: 0, y: 12, filter: 'blur(5px)' }, { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.55, stagger: 0.06, ease: 'sine.out', delay: 0.35 });
    }, navRef);
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const sectionIds = ['home', ...navItems.map((item) => item.toLowerCase())];
    const onScroll = () => {
      setScrolled(window.scrollY > 24);
      let current = 'home';
      sectionIds.forEach((id) => {
        const section = document.getElementById(id);
        if (section && section.getBoundingClientRect().top <= 120) current = id;
      });
      setActive(current);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header className={`site-nav ${scrolled ? 'is-scrolled' : ''}`} ref={navRef}>
      <a className="brand-mark" href="#home" aria-label="Meghana home" onClick={() => setOpen(false)}>
        MEGHANA
      </a>
      <span className="nav-line" />
      <button className="menu-toggle" type="button" aria-label="Toggle navigation" onClick={() => setOpen((value) => !value)}>
        {open ? <X size={20} /> : <Menu size={20} />}
      </button>
      <nav className={open ? 'is-open' : ''} aria-label="Portfolio navigation">
        {navItems.map((item) => {
          const id = item.toLowerCase();
          return (
            <a className={`nav-link ${active === id ? 'is-active' : ''}`} href={`#${id}`} key={item} onClick={() => setOpen(false)}>
              {item}
            </a>
          );
        })}
      </nav>
    </header>
  );
}

function Hero() {
  const heroRef = useRef(null);
  const heroVideoRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.hero-animate', { opacity: 0, y: 20, filter: 'blur(8px)' }, { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.85, stagger: 0.08, ease: 'sine.out' });
      gsap.fromTo('.hero-video-shell', { opacity: 0, scale: 0.96, y: 18 }, { opacity: 1, scale: 1, y: 0, duration: 1.1, delay: 0.3, ease: 'power2.out' });
      gsap.fromTo('.highlight-card strong', { textShadow: '0 0 0 rgba(245,170,196,0)' }, { textShadow: '0 0 18px rgba(245,170,196,0.42)', duration: 1.2, stagger: 0.08, yoyo: true, repeat: 1, ease: 'sine.inOut' });
    }, heroRef);
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const video = heroVideoRef.current;
    if (!video) return;

    video.muted = true;
    video.defaultMuted = true;
    video.playsInline = true;

    const attemptPlay = async () => {
      try {
        await video.play();
      } catch (error) {
        console.warn('Hero video autoplay was blocked:', error);
      }
    };

    attemptPlay();
  }, []);

  return (
    <section className="hero-section" id="home" ref={heroRef}>
      <div className="hero-background-effects" aria-hidden="true">
        <span className="pink-glow" />
        <span className="blue-glow" />
        <span className="gold-glow" />
        <span className="cloud cloud-one" />
        <span className="cloud cloud-two" />
      </div>
      <FloatingParticles count={48} className="hero-particles" />

      <div className="hero-container">
        <div className="hero-content">
          <h1 className="hero-name hero-animate">N.Ch. Sai Meghana</h1>
          <p className="hero-eyebrow hero-animate">Assistant Professor | AI Researcher | Software Developer | Mentor | Designer | Creative Technologist</p>
          <div className="theme-signature hero-animate">
            <Sparkles size={15} />
            <span>Learn with Fun</span>
            <small>Where technology, creativity and education come together.</small>
          </div>
          <div className="hero-description hero-animate">
            <p>
              I build intelligent systems, meaningful learning experiences and creative digital solutions that connect
              technology with real-world impact.
            </p>
            <p>
              For more than three years, I have explored Artificial Intelligence through application development,
              research, teaching, designing, editing, content creation, song writing and AI-assisted album creation.
            </p>
          </div>
          <div className="hero-actions hero-animate">
            <a className="hero-button btn-primary primary" href="#journey">Explore My Journey <ArrowRight size={17} /></a>
            <a className="hero-button btn-glass secondary" href="#projects">View My Work <ArrowRight size={17} /></a>
          </div>
          <div className="hero-socials hero-animate" aria-label="Social links">
            <a href="https://www.linkedin.com/in/meghananch/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><span>in</span></a>
            <a href="https://medium.com/@meghana.nch" target="_blank" rel="noopener noreferrer" aria-label="Medium"><span>M</span></a>
            <a href="mailto:Meghana.nch@outlook.com" aria-label="Email"><Mail size={18} /></a>
            <a href="https://github.com/SaiMeghanaNallanaChakravarthula" target="_blank" rel="noopener noreferrer" aria-label="GitHub"><span>GH</span></a>
          </div>
          <div className="hero-highlights hero-animate">
            {highlights.map(({ icon: Icon, value, label }) => (
              <article className="highlight-card" key={value}>
                <Icon size={18} />
                <strong>{value}</strong>
                <span>{label}</span>
              </article>
            ))}
          </div>
          <div className="hero-tags hero-animate">
            {heroTags.map((tag) => <span key={tag}>{tag}</span>)}
          </div>
        </div>

        <div className="hero-visual-column">
          <div className="hero-world-intro hero-animate">
            <span className="hero-world-eyebrow"><Sparkles size={14} />ENTER MY WORLD</span>
            <p>Learn with Fun. Create with Purpose. Guide with Empathy.</p>
          </div>
          <div className="hero-video-shell">
            <video
              ref={heroVideoRef}
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
              aria-label="Animated portfolio character representing Meghana"
              onCanPlay={(event) => {
                event.currentTarget.play().catch(() => undefined);
              }}
              onError={(event) => {
                console.error('Hero video failed to load', {
                  source: event.currentTarget.currentSrc,
                  error: event.currentTarget.error,
                  networkState: event.currentTarget.networkState,
                  readyState: event.currentTarget.readyState,
                });
              }}
            >
              <source src={assetPath('video2.mp4')} type="video/mp4" />
            </video>
            <span className="hero-frame-shine" aria-hidden="true" />
          </div>
        </div>
      </div>

      <a className="story-indicator" href="#about">
        <span>Scroll to begin my story</span>
        <ArrowDown size={16} />
      </a>
    </section>
  );
}

function SectionHeading({ icon: Icon = Sparkles, title, kicker }) {
  const displayTitle = title.includes('Create, Learn and Build Together')
    ? "Let's Create, Learn and Build Together"
    : title;

  return (
    <div className="section-heading">
      <Icon size={20} />
      <div>
        {kicker && <p>{kicker}</p>}
        <h2>{displayTitle}</h2>
      </div>
    </div>
  );
}

function About() {
  return (
    <section className="about-section screen-section about-story-section" id="about">
      <SectionBackgroundVideo src={assetPath('about-cherry-background.mp4')} className="about-video-bg" objectPosition="center center" />
      <div className="about-content section-content section-inner">
        <SectionHeading icon={Sparkles} title="The Story Behind Meghana" />
        <div className="about-intro content-glass">
          <p>I am N.Ch. Sai Meghana, an Assistant Professor, AI Researcher, Software Developer, mentor, guide, designer and creative technologist.</p>
          <p>My journey has never been limited to one role. I teach, develop, research, design, mentor, organise, create and continuously explore new ways to make technology useful, understandable and enjoyable.</p>
          <p>My teaching philosophy is “Learn with Fun.” I believe learning becomes powerful when concepts are connected to practical examples, creativity, interaction and real-world problem-solving.</p>
        </div>
        <div className="identity-cloud">
          {['Educator', 'Mentor', 'Guide', 'AI Practitioner', 'Researcher', 'Software Developer', 'Designer', 'Creator', 'Workshop Speaker', 'Evaluator', 'Project Facilitator', 'Lifelong Learner'].map((role) => (
            <span key={role}>{role}</span>
          ))}
        </div>
        <blockquote>Learn with Fun. Create with Purpose. Build with Intelligence. Guide with Empathy.</blockquote>
      </div>
    </section>
  );
}

function Journey() {
  return (
    <section className="story-section" id="journey">
      <SectionHeading icon={GraduationCap} title="Academic Journey" />
      <div className="story-timeline academic-timeline">
        {journeyItems.map((item, index) => (
          <article className="story-block" key={item.stage}>
            <div className="story-node"><span>{String(index + 1).padStart(2, '0')}</span></div>
            <div className="story-card">
              <GraduationCap size={22} />
              <span className="story-number">{item.score}</span>
              <h3>{item.stage}</h3>
              <p>{item.text}</p>
              {item.details && <ul>{item.details.map((detail) => <li key={detail}>{detail}</li>)}</ul>}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function Teaching() {
  const howITeach = [
    ['Practical Examples', 'Connecting concepts with real-world situations'],
    ['Hands-on Learning', 'Code, build, test and explore'],
    ['Interactive Sessions', 'Discuss, question and grow'],
    ['Project-Based Learning', 'Learn by developing useful solutions'],
    ['Mentorship', 'Guide, motivate and support'],
    ['Creative Learning', 'Design, visualise and imagine'],
  ];

  return (
    <section className="story-section" id="teaching">
      <SectionHeading icon={BookOpen} title="Teaching Journey" />
      <div className="code-mist" aria-hidden="true">{['{ }', '</>', 'AI', 'for', 'if', 'ML'].map((code) => <span key={code}>{code}</span>)}</div>
      <div className="teaching-timeline">
        <div className="teaching-column">
          <div className="institution-label">GVPW</div>
          <article className="teaching-card glass-panel glass-interactive">
            <BookOpen size={24} />
            <h3>Teaching Assistant</h3>
            <p>I began my academic teaching journey as a Teaching Assistant at Gayatri Vidya Parishad College of Engineering for Women - GVPW (Autonomous).</p>
            <p>During six months, I handled Python Programming and Data Structures for more than 400 women students. This experience shaped my approachable teaching style through clear explanation, practical demonstrations, mentoring and interactive engagement.</p>
          </article>
        </div>
        <div className="teaching-column">
          <div className="institution-label">MVGR</div>
          <article className="teaching-card glass-panel glass-interactive">
            <GraduationCap size={24} />
            <h3>Assistant Professor</h3>
            <p>I currently work as an Assistant Professor in the Department of Information Technology at MVGR College of Engineering (Autonomous).</p>
            <p>My role extends beyond lectures. I work as a teacher, mentor, guide, designer, content creator, evaluator, workshop speaker, project facilitator and student motivator.</p>
            <p>Across teaching, workshops and mentoring, I have trained, guided and supported more than 1000 students.</p>
          </article>
        </div>
      </div>
      <div className="tag-panel">
        <h3>Subjects I Handle</h3>
        <div>{teachingSubjects.map((subject) => <span title={`I handle ${subject}`} key={subject}>{subject}</span>)}</div>
      </div>
      <div className="teaching-method">
        <h3>My Teaching Philosophy - Learn with Fun</h3>
        <p>I make technical concepts engaging through practical examples, hands-on coding, visual explanation, mini challenges, classroom interaction and project-based learning.</p>
        <p>I encourage students to ask questions, experiment, make mistakes, develop confidence and connect classroom learning with industry, research and everyday life.</p>
        <div>{teachingRoles.map((role) => <span key={role}>{role}</span>)}</div>
      </div>
      <div className="teach-card-grid">
        {howITeach.map(([title, text]) => (
          <article className="teach-card" key={title}>
            <Sparkles size={18} />
            <h3>{title}</h3>
            <p>{text}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function Experience() {
  return (
    <section className="story-section" id="experience">
      <SectionHeading icon={BriefcaseBusiness} title="From Software Industry to Academia" />
      <div className="experience-layout">
        <div className="experience-intro glass-panel">
          <h3>Industry Experience That Shaped My Teaching</h3>
          <p>Before entering full-time academia, I worked as a Program Analyst and contributed to enterprise software projects across government, insurance, product-development and HR-automation domains.</p>
          <p>This experience taught me that successful software is not built through code alone. It requires understanding users, business processes, data, collaboration, maintainability, deadlines and the real-world impact of technical decisions.</p>
          <p>Working with enterprise technologies strengthened my ability to analyse requirements, design database-driven applications, develop user interfaces, support automation and contribute effectively within project teams.</p>
          <p>Today, I bring these industry lessons into my classroom. I help students understand not only how to write programs, but also how software is planned, built, tested, improved and used in real organisations.</p>
        </div>
        <div className="experience-detail experience-right">
          <div className="tag-panel glass-panel-soft">
            <h3>Technology Stack</h3>
            <div>{['ASP.NET', 'ADO.NET', 'SQL Server', 'C#.NET', 'Angular', 'React.js', 'React Hooks'].map((tech) => <span key={tech}>{tech}</span>)}</div>
          </div>
          <div className="domain-grid compact-domain-grid">
            {experienceDomains.map((domain) => (
              <article className="glass-card glass-panel-soft glass-interactive" key={domain.title}>
                <BriefcaseBusiness size={20} />
                <h3>{domain.title}</h3>
                <p>{domain.text}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function AICreativeJourney() {
  return (
    <section id="ai-journey" className="ai-journey-section screen-section">
      <SectionBackgroundVideo src={assetPath('researchai.mp4')} className="ai-journey-video-bg" objectPosition="center center" />
      <div className="ai-journey-content section-content section-inner">
        <SectionHeading icon={WandSparkles} title="Three Years of Creating with AI" />
        <div className="letter-panel wide content-glass">
          <p>For more than three years, I have used Artificial Intelligence not only for technical development but also as a creative and educational medium.</p>
          <p>I work across Machine Learning, Deep Learning, Large Language Models, prompt engineering, intelligent application development, research prototyping, automation, visual design, editing and educational content creation.</p>
          <p>I have also explored AI-assisted creativity by writing songs, creating an album, experimenting with media generation, editing content, designing visuals and producing creative digital experiences.</p>
        </div>
        <div className="orbit-map">
          {aiNodes.map((node, index) => <span key={node} style={{ '--i': index }}>{node}</span>)}
        </div>
      </div>
    </section>
  );
}

function ProjectModal({ project, onClose }) {
  return createPortal(
    <div className="project-modal-backdrop" onClick={onClose}>
      <section
        className="project-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="project-modal-title"
        onClick={(event) => event.stopPropagation()}
      >
        <header className="project-modal-header">
          <span className="project-modal-number">{project.number}</span>
          <span className="project-modal-category">{project.category}</span>
          <h2 className="project-modal-title" id="project-modal-title">{project.title}</h2>
          <button className="modal-close-button" type="button" onClick={onClose} aria-label="Close project details">
            <X size={20} />
          </button>
        </header>
        <div
          className="project-modal-scroll"
          data-lenis-prevent
          onWheel={(event) => event.stopPropagation()}
        >
          <div className="project-modal-body">
            <div className="project-modal-panel">
              <section>
                <h4>Overview</h4>
                <p>{project.overview}</p>
              </section>
              <section>
                <h4>Purpose</h4>
                <p>{project.purpose}</p>
              </section>
            </div>
            <div className="project-modal-panel">
              <section>
                <h4>Impact</h4>
                <p>{project.impact}</p>
              </section>
              <section>
                <h4>Technologies</h4>
                <div className="project-modal-technologies">
                  {project.technologies.map((technology) => (
                    <span className="tech-pill" key={technology}>{technology}</span>
                  ))}
                </div>
              </section>
              <section className="project-key-features">
                <h4>Key Features</h4>
                <ul>{project.features.map((feature) => <li key={feature}>{feature}</li>)}</ul>
              </section>
            </div>
          </div>
        </div>
      </section>
    </div>,
    document.body,
  );
}

function Projects() {
  const [selectedProject, setSelectedProject] = useState(null);
  const lastProjectButtonRef = useRef(null);

  useEffect(() => {
    if (!selectedProject) return undefined;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        setSelectedProject(null);
        return;
      }

      if (event.key === 'Tab') {
        const modal = document.querySelector('.project-modal');
        const focusable = modal?.querySelectorAll('button, [href], [tabindex]:not([tabindex="-1"])');
        if (!focusable || focusable.length === 0) return;

        const first = focusable[0];
        const last = focusable[focusable.length - 1];

        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    };

    window.addEventListener('keydown', onKeyDown);
    window.setTimeout(() => document.querySelector('.modal-close-button')?.focus(), 0);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', onKeyDown);
      lastProjectButtonRef.current?.focus();
    };
  }, [selectedProject]);

  return (
    <section className="story-section projects-section" id="projects">
      <FloatingParticles count={26} className="project-particles" />
      <SectionHeading icon={Sparkles} title="Projects That Connect Technology and Humanity" />
      <div className="projects-grid">
        {projects.map((project) => {
          return (
            <article className="project-card glass-panel glass-interactive" key={project.id}>
              <span className="project-visual project-icon"><Palette size={24} /></span>
              <span className="project-index project-number">{project.number}</span>
              <div className="project-heading project-card-content">
                <small className="project-category">{project.category}</small>
                <strong className="project-title">{project.title}</strong>
                <p className="project-summary">{project.summary}</p>
                <em className="project-tech-preview">{project.technologies.slice(0, 3).join(' • ')}</em>
                <button
                  type="button"
                  className="project-details-button view-details btn-glass"
                  onClick={(event) => {
                    lastProjectButtonRef.current = event.currentTarget;
                    setSelectedProject(project);
                  }}
                  aria-label={`View details for ${project.title}`}
                >
                  View details <ChevronDown size={17} />
                </button>
              </div>
            </article>
          );
        })}
      </div>
      {selectedProject && <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />}
    </section>
  );
}

function Research() {
  return (
    <section className="research-section screen-section" id="research">
      <SectionBackgroundVideo src={assetPath('research.mp4')} className="research-video-bg" objectPosition="center center" />
      <div className="research-content section-content section-inner">
        <SectionHeading icon={Microscope} title="Research Beyond Boundaries" />
        <div className="research-layout">
        <div className="research-copy glass-panel">
          <p>My research interests connect technology with human behaviour, cognition, emotional well-being and emerging computational paradigms.</p>
          <p>I am particularly interested in understanding how intelligent systems can support human learning, mental health, accessibility, decision-making and meaningful human-AI interaction.</p>
          <p>My long-term goal is to create intelligent systems that understand, support and enhance human life.</p>
        </div>
      </div>
      <div className="research-topics">
        {researchDomains.map((domain) => <span key={domain}>{domain}</span>)}
      </div>
      </div>
    </section>
  );
}

function Achievements() {
  const [activeCategory, setActiveCategory] = useState('Patents');
  const categories = ['Patents', 'Recognition', 'Speaking', 'Evaluation', 'Certifications', 'Writing'];

  return (
    <section className="story-section achievements-section" id="achievements">
      <SectionHeading icon={Award} title="Achievements" />
      <div className="achievement-tabs" role="tablist" aria-label="Achievement categories">
        {categories.map((category) => (
          <button
            type="button"
            role="tab"
            aria-selected={activeCategory === category}
            className={activeCategory === category ? 'is-active' : ''}
            key={category}
            onClick={() => setActiveCategory(category)}
          >
            {category}
          </button>
        ))}
      </div>
      {activeCategory === 'Patents' && (
        <div className="achievement-group featured">
          <h3>Patents</h3>
          <div className="domain-grid">
            {achievements.patents.map((patent) => (
              <details className="glass-card patent-card" key={patent.title}>
                <summary>
                  <Award size={24} />
                  <h3>{patent.title}</h3>
                  <span>View Details</span>
                </summary>
                <p>{patent.text}</p>
              </details>
            ))}
          </div>
        </div>
      )}
      {activeCategory === 'Recognition' && (
        <article className="achievement-group"><h3>Recognition and Service</h3><ul>{achievements.recognition.slice(0, 1).map((item) => <li key={item}>{item}</li>)}</ul></article>
      )}
      {activeCategory === 'Speaking' && (
        <article className="achievement-group"><h3>Speaking</h3><ul>{achievements.recognition.slice(1, 2).map((item) => <li key={item}>{item}</li>)}</ul></article>
      )}
      {activeCategory === 'Evaluation' && (
        <article className="achievement-group"><h3>Evaluation</h3><ul>{achievements.recognition.slice(2).map((item) => <li key={item}>{item}</li>)}</ul></article>
      )}
      {activeCategory === 'Certifications' && (
        <div className="certification-groups">
          {certificationGroups.map((group) => (
            <section className="certification-group glass-panel" key={group.title}>
              <h3>{group.title}</h3>
              <div className="certificate-grid">
                {group.items.map(([title, organisation, category]) => (
                  <article className="certificate-card glass-interactive" key={`${title}-${organisation}`}>
                    <span>{category}</span>
                    <h4>{title}</h4>
                    <p>{organisation}</p>
                  </article>
                ))}
              </div>
            </section>
          ))}
        </div>
      )}
      {activeCategory === 'Writing' && (
        <div className="writing-panel achievement-writing">
          <PenTool size={24} />
          <div>
            <h3>Writing and Knowledge Sharing</h3>
            <p>I use writing to simplify technical concepts, document my learning and share ideas related to Artificial Intelligence, education, research and technology.</p>
            <p>I have published three articles on Medium as part of my journey in technical communication and knowledge sharing.</p>
          </div>
          <a className="btn-glass" href="https://medium.com/@meghana.nch" target="_blank" rel="noopener noreferrer">Read My Articles <ArrowRight size={16} /></a>
        </div>
      )}
    </section>
  );
}

function Contact() {
  return (
    <section className="contact-section screen-section" id="contact">
      <SectionBackgroundVideo src={assetPath('contact.gif')} className="contact-video-bg" objectPosition="center center" />
      <div className="contact-content section-content section-inner">
        <SectionHeading icon={Mail} title="Let's Create, Learn and Build Together" />
        <div className="contact-panel content-glass">
          <p>I welcome meaningful conversations about teaching, research, Artificial Intelligence, creative technology, projects and collaboration.</p>
          <div className="contact-actions">
            <a className="btn-primary" href="https://www.linkedin.com/in/meghananch/" target="_blank" rel="noopener noreferrer">Connect on LinkedIn</a>
            <a className="btn-glass" href="https://medium.com/@meghana.nch" target="_blank" rel="noopener noreferrer">Read on Medium</a>
            <a className="btn-primary" href="mailto:Meghana.nch@outlook.com">Send an Email</a>
            <a className="btn-glass" href="https://github.com/SaiMeghanaNallanaChakravarthula" target="_blank" rel="noopener noreferrer">Visit GitHub</a>
          </div>
        </div>
      </div>
    </section>
  );
}

function BackgroundMusic() {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isAvailable, setIsAvailable] = useState(true);

  const playMusic = useCallback(async () => {
    const audio = audioRef.current;
    if (!audio || !isAvailable) return;

    audio.volume = 0.2;

    try {
      await audio.play();
      setIsPlaying(true);
    } catch (error) {
      console.warn('Background music autoplay was blocked:', error);
    }
  }, [isAvailable]);

  const toggleMusic = async () => {
    const audio = audioRef.current;
    if (!audio || !isAvailable) return;

    if (audio.paused) {
      await playMusic();
    } else {
      audio.pause();
      setIsPlaying(false);
    }
  };

  useEffect(() => {
    playMusic();

    const unlockAudio = () => {
      playMusic();
    };

    window.addEventListener('pointerdown', unlockAudio, { once: true });
    window.addEventListener('keydown', unlockAudio, { once: true });

    return () => {
      window.removeEventListener('pointerdown', unlockAudio);
      window.removeEventListener('keydown', unlockAudio);
    };
  }, [playMusic]);

  return (
    <>
      <audio
        ref={audioRef}
        src={assetPath('audio/portfolio-theme.mp3')}
        loop
        preload="auto"
        onError={() => {
          setIsAvailable(false);
          setIsPlaying(false);
        }}
      />
      <button
        type="button"
        className={`music-toggle glass-panel-soft${isPlaying ? ' is-playing' : ''}${isAvailable ? '' : ' is-unavailable'}`}
        onClick={toggleMusic}
        aria-label={isAvailable ? (isPlaying ? 'Pause background music' : 'Play background music') : 'Background music unavailable'}
        aria-pressed={isPlaying}
        title={isAvailable ? (isPlaying ? 'Pause background music' : 'Play background music') : 'Background music file missing'}
      >
        {isPlaying ? <Volume2 /> : <VolumeX />}
      </button>
    </>
  );
}

function VisitorCounter() {
  const [count, setCount] = useState(null);
  const [available, setAvailable] = useState(true);

  useEffect(() => {
    const countedKey = 'meghana-portfolio-visit-counted';
    const counted = sessionStorage.getItem(countedKey) === 'true';
    fetch('/api/visitors', {
      method: counted ? 'GET' : 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: counted ? undefined : JSON.stringify({ page: '/' }),
    })
      .then((response) => {
        if (!response.ok) throw new Error('visitor service unavailable');
        return response.json();
      })
      .then((data) => {
        if (typeof data.count !== 'number') throw new Error('invalid visitor count');
        sessionStorage.setItem(countedKey, 'true');
        const counter = { value: 0 };
        gsap.to(counter, {
          value: data.count,
          duration: 1.2,
          ease: 'power2.out',
          onUpdate() {
            setCount(Math.round(counter.value));
          },
        });
      })
      .catch(() => setAvailable(false));
  }, []);

  if (!available) return null;
  return (
    <footer className="visitor-counter">
      <span>Visitors to Meghana’s World</span>
      <strong>{count === null ? '----' : String(count).padStart(4, '0')}</strong>
    </footer>
  );
}

function Portfolio() {
  useEffect(() => {
    const lenis = new Lenis({ lerp: 0.08, smoothWheel: true });
    let frame;
    const raf = (time) => {
      lenis.raf(time);
      frame = requestAnimationFrame(raf);
    };
    frame = requestAnimationFrame(raf);
    return () => {
      cancelAnimationFrame(frame);
      lenis.destroy();
    };
  }, []);

  useEffect(() => {
    const sections = gsap.utils.toArray('.story-section, .paper-section, .screen-section');
    const observers = sections.map((section) => {
      const targets = section.querySelectorAll('.section-heading, .about-intro, .identity-cloud span, blockquote, .story-block, .letter-panel, .glass-card, .tag-panel, .teaching-method, .orbit-map span, .project-card, .research-topics span, .achievement-group, .writing-panel, .contact-panel');
      gsap.set(targets, { opacity: 0, y: 30, filter: 'blur(8px)' });
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (!entry.isIntersecting) return;
          gsap.to(targets, { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.85, stagger: 0.055, ease: 'sine.out' });
          observer.disconnect();
        },
        { threshold: 0.12 },
      );
      observer.observe(section);
      return observer;
    });
    return () => observers.forEach((observer) => observer.disconnect());
  }, []);

  useEffect(() => {
    const onPointerMove = (event) => {
      const target = event.target.closest?.('.glass-interactive');
      if (!target) return;
      const rect = target.getBoundingClientRect();
      target.style.setProperty('--mouse-x', `${event.clientX - rect.left}px`);
      target.style.setProperty('--mouse-y', `${event.clientY - rect.top}px`);
    };

    window.addEventListener('pointermove', onPointerMove, { passive: true });
    return () => window.removeEventListener('pointermove', onPointerMove);
  }, []);

  return (
    <main className="world ready">
      <CherryBlossomRain />
      <Nav />
      <Hero />
      <About />
      <Journey />
      <Projects />
      <Research />
      <Teaching />
      <Experience />
      <AICreativeJourney />
      <Achievements />
      <Contact />
      <BackgroundMusic />
      <VisitorCounter />
    </main>
  );
}

createRoot(document.getElementById('root')).render(<Portfolio />);
