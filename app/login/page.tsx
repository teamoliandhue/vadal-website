import type { Metadata } from "next";
import { Button, Container } from "@/components/ui";
import { Icon } from "@/components/Icon";
import { SignalMark } from "@/components/Brand";

export const metadata: Metadata = {
  title: "Login",
  description: "Sign in to your Vadal workspace.",
};

export default function LoginPage() {
  return (
    <section className="relative overflow-hidden">
      <div className="aurora-wash pointer-events-none absolute inset-0 -z-10 opacity-70" />
      <Container className="flex min-h-[72vh] items-center justify-center py-16">
        <div className="w-full max-w-sm rounded-[var(--r-xl)] border border-[var(--line)] bg-[var(--card)] p-8 shadow-[var(--shadow-md)]">
          <SignalMark size={34} className="mx-auto" />
          <h1 className="mt-5 text-center text-[24px] font-extrabold">Welcome back</h1>
          <p className="mt-1.5 text-center text-[14px] text-[var(--muted)]">Sign in to your Vadal workspace</p>

          <form className="mt-7 space-y-4">
            <label className="block">
              <span className="mb-1.5 block text-[13px] font-semibold">Work email</span>
              <input type="email" className="w-full rounded-[var(--r-sm)] border border-[var(--line)] bg-[var(--surface)] px-3.5 py-2.5 text-[15px] transition-colors focus:border-[var(--brand)] focus:bg-[var(--card)] focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-[var(--brand)]" placeholder="you@company.com" />
            </label>
            <label className="block">
              <span className="mb-1.5 block text-[13px] font-semibold">Password</span>
              <input type="password" className="w-full rounded-[var(--r-sm)] border border-[var(--line)] bg-[var(--surface)] px-3.5 py-2.5 text-[15px] transition-colors focus:border-[var(--brand)] focus:bg-[var(--card)] focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-[var(--brand)]" placeholder="••••••••" />
            </label>
            <Button type="submit" size="lg" icon className="w-full">
              Sign in
            </Button>
          </form>

          <div className="mt-5 flex items-center gap-3 text-[12px] text-[var(--muted-2)]">
            <span className="h-px flex-1 bg-[var(--line)]" /> or <span className="h-px flex-1 bg-[var(--line)]" />
          </div>
          <Button variant="ghost" type="button" size="lg" className="mt-5 w-full">
            <Icon name="lock" size={16} /> Continue with SSO
          </Button>

          <p className="mt-6 text-center text-[13px] text-[var(--muted)]">
            No account yet?{" "}
            <a href="/demo" className="font-semibold text-[var(--brand)]">Book a demo</a>
          </p>
        </div>
      </Container>
    </section>
  );
}
