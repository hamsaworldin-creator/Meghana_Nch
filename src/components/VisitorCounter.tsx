import { useEffect, useState } from "react";
import { Users } from "lucide-react";

type CounterState =
  | { status: "loading" }
  | { status: "success"; value: number }
  | { status: "error" };

const SESSION_KEY = "meghana-nch-visitor-counted";

const COUNTER_NAMESPACE = "meghana-nch-portfolio";
const COUNTER_KEY = "total-visitors";

export function VisitorCounter() {
  const [counter, setCounter] = useState<CounterState>({
    status: "loading",
  });

  useEffect(() => {
    let cancelled = false;

    async function loadCounter() {
      try {
        const hasCountedThisSession =
          sessionStorage.getItem(SESSION_KEY) === "true";

        const endpoint = hasCountedThisSession
          ? `https://api.countapi.xyz/get/${COUNTER_NAMESPACE}/${COUNTER_KEY}`
          : `https://api.countapi.xyz/hit/${COUNTER_NAMESPACE}/${COUNTER_KEY}`;

        const response = await fetch(endpoint, {
          method: "GET",
          cache: "no-store",
        });

        if (!response.ok) {
          throw new Error(`Visitor counter failed: ${response.status}`);
        }

        const data = (await response.json()) as {
          value?: number;
        };

        if (typeof data.value !== "number") {
          throw new Error("Visitor counter returned an invalid value.");
        }

        if (!hasCountedThisSession) {
          sessionStorage.setItem(SESSION_KEY, "true");
        }

        if (!cancelled) {
          setCounter({
            status: "success",
            value: data.value,
          });
        }
      } catch (error) {
        console.error("Unable to load visitor counter:", error);

        if (!cancelled) {
          setCounter({
            status: "error",
          });
        }
      }
    }

    loadCounter();

    return () => {
      cancelled = true;
    };
  }, []);

  if (counter.status === "error") {
    return null;
  }

  return (
    <div
      className="visitor-counter glass-panel-soft"
      aria-live="polite"
      aria-label={
        counter.status === "success"
          ? `${counter.value} visitors have visited Meghana's portfolio`
          : "Loading visitor count"
      }
    >
      <div className="visitor-counter-icon" aria-hidden="true">
        <Users />
      </div>

      <div className="visitor-counter-copy">
        <span className="visitor-counter-label">
          Visitors to Meghana's World
        </span>

        <strong
          key={counter.status === "success" ? counter.value : "loading"}
          className="visitor-counter-value"
        >
          {counter.status === "loading"
            ? "- - - -"
            : counter.value.toLocaleString("en-IN")}
        </strong>
      </div>
    </div>
  );
}
