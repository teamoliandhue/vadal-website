import { Button, Container } from "@/components/ui";
import { SignalMark } from "@/components/Brand";

export default function NotFound() {
  return (
    <section className="relative overflow-hidden">
      <div className="aurora-wash pointer-events-none absolute inset-0 -z-10 opacity-70" />
      <Container className="flex min-h-[70vh] flex-col items-center justify-center gap-6 py-20 text-center">
        <SignalMark size={44} />
        <p className="aurora-text text-[64px] font-extrabold leading-none">404</p>
        <h1 className="display-md font-extrabold">This page wandered off</h1>
        <p className="max-w-md text-[16px] leading-relaxed text-[var(--muted)]">
          The link may be old or the page may have moved. Let&apos;s get you back to something
          useful.
        </p>
        <div className="flex flex-col gap-3 sm:flex-row">
          <Button href="/" size="lg" icon>Back to home</Button>
          <Button href="/demo" variant="ghost" size="lg">Book a demo</Button>
        </div>
      </Container>
    </section>
  );
}
