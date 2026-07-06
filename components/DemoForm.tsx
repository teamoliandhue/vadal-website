"use client";

import { useEffect, useRef, useState } from "react";
import { Icon } from "./Icon";
import { SparkMark } from "./Brand";
import { Button } from "./ui";

const fields = [
  { name: "firstName", label: "First name", type: "text", required: true, half: true },
  { name: "lastName", label: "Last name", type: "text", required: true, half: true },
  { name: "email", label: "Work email", type: "email", required: true, half: false },
  { name: "company", label: "Company", type: "text", required: true, half: true },
  { name: "jobTitle", label: "Job title", type: "text", required: true, half: true },
  { name: "phone", label: "Phone", type: "tel", required: false, half: true },
];

const sizes = ["1,000–5,000", "5,000–15,000", "15,000–50,000", "50,000+"];

export function DemoForm() {
  const [sent, setSent] = useState(false);
  const [size, setSize] = useState(sizes[0]);
  const formRef = useRef<HTMLFormElement>(null);

  // Prefill the email field when arriving from the hero email-capture
  // (/demo?email=…). Post-mount, so there's no hydration mismatch.
  useEffect(() => {
    const email = new URLSearchParams(window.location.search).get("email");
    if (!email) return;
    const input = formRef.current?.querySelector<HTMLInputElement>('input[name="email"]');
    if (input && !input.value) input.value = email;
  }, []);

  if (sent) {
    return (
      <div className="flex flex-col items-center gap-4 rounded-[var(--r-xl)] border border-[var(--line)] bg-[var(--card)] p-10 text-center shadow-[var(--shadow-md)]">
        <span className="grid h-14 w-14 place-items-center rounded-full bg-[var(--brand-tint)] text-[var(--brand)]">
          <Icon name="check" size={28} strokeWidth={2.4} />
        </span>
        <h3 className="text-[22px] font-extrabold">You&apos;re on the list 🎉</h3>
        <p className="max-w-sm text-[15px] leading-relaxed text-[var(--muted)]">
          Thanks! A Vadal specialist will reach out within one business day to tailor a demo to
          your industry. Keep an eye on your inbox.
        </p>
        <button
          onClick={() => setSent(false)}
          className="mt-2 text-[14px] font-semibold text-[var(--brand)]"
        >
          Submit another request
        </button>
      </div>
    );
  }

  return (
    <form
      ref={formRef}
      onSubmit={(e) => {
        e.preventDefault();
        setSent(true);
      }}
      className="rounded-[var(--r-xl)] border border-[var(--line)] bg-[var(--card)] p-6 shadow-[var(--shadow-md)] sm:p-8"
    >
      <div className="mb-5 flex items-center gap-2">
        <SparkMark size={18} />
        <p className="text-[13px] font-semibold text-[var(--muted)]">
          We&apos;ll get in touch within 24 hours.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {fields.map((f) => (
          <label key={f.name} className={f.half ? "col-span-1" : "col-span-2"}>
            <span className="mb-1.5 block text-[13px] font-semibold text-[var(--foreground)]">
              {f.label} {f.required && <span className="text-[var(--brand)]">*</span>}
            </span>
            <input
              type={f.type}
              name={f.name}
              required={f.required}
              className="w-full rounded-[var(--r-sm)] border border-[var(--line)] bg-[var(--surface)] px-3.5 py-2.5 text-[15px] transition-colors focus:border-[var(--brand)] focus:bg-[var(--card)] focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-[var(--brand)]"
            />
          </label>
        ))}

        <div className="col-span-2">
          <span className="mb-1.5 block text-[13px] font-semibold text-[var(--foreground)]">
            Company size <span className="text-[var(--brand)]">*</span>
          </span>
          <input type="hidden" name="companySize" value={size} />
          <div className="flex flex-wrap gap-2">
            {sizes.map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => setSize(s)}
                aria-pressed={size === s}
                className={`rounded-full px-3.5 py-1.5 text-[13px] font-semibold transition-all active:scale-[0.97] ${
                  size === s
                    ? "bg-[var(--brand)] text-white"
                    : "border border-[var(--line)] bg-[var(--surface)] text-[var(--muted)] hover:text-[var(--foreground)]"
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        <label className="col-span-2 mt-1 flex items-start gap-2.5 text-[13px] leading-snug text-[var(--muted)]">
          <input type="checkbox" required className="mt-0.5 h-4 w-4 accent-[var(--brand)]" />
          <span>
            I agree to Vadal&apos;s{" "}
            <a href="/terms" className="font-semibold text-[var(--brand)] underline-offset-2 hover:underline">Terms</a>{" "}
            and{" "}
            <a href="/privacy" className="font-semibold text-[var(--brand)] underline-offset-2 hover:underline">Privacy Policy</a>.
          </span>
        </label>
        <label className="col-span-2 flex items-start gap-2.5 text-[13px] leading-snug text-[var(--muted)]">
          <input type="checkbox" className="mt-0.5 h-4 w-4 accent-[var(--brand)]" />
          <span>Keep me posted with occasional product news and engagement insights from Vadal.</span>
        </label>
      </div>

      <div className="mt-6">
        <Button type="submit" size="lg" icon className="w-full">
          Request my demo
        </Button>
      </div>
    </form>
  );
}
