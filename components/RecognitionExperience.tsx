"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { Icon } from "./Icon";
import "./recognition-experience.css";

/* A centred deck that deals itself: each kudos card arrives on top in turn,
   with the next two waiting behind it. The stream is the point — a single kind
   word in a panel reads as "here is a feature"; a stack that keeps producing
   another one reads as the thing the copy claims, that this happens all the
   time.

   Each card is an award moment rather than a generic note, because that is
   what a recognition programme looks like on the day it matters: a named
   award, a reason, kudos points, and a reward unlocked at the end of it. */

const CONFETTI = ["#e8a33d", "#e0685a", "#7c5cf8", "#19c6b4", "#f2c14e", "#5c7cf9", "#e87f9b", "#2fb98a", "#d4903a", "#ef6fa4", "#4fb3e8"];

const KUDOS = [
  { award: "Excellence Award · September", initials: "RM", name: "Rohan Mehta", team: "Product team",
    quote: "You made a complex launch feel effortless.", kudos: 24, points: 500 },
  { award: "Above & Beyond · September", initials: "SK", name: "Sara Khan", team: "Customer Success",
    quote: "You stayed with that customer until it was genuinely fixed.", kudos: 31, points: 350 },
  { award: "Team Player · September", initials: "JR", name: "Jai Rao", team: "Engineering",
    quote: "You picked up the on-call nobody wanted. Twice.", kudos: 18, points: 250 },
];

function Trophy({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M7.5 4h9v3.5a4.5 4.5 0 0 1-9 0V4Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round"/>
      <path d="M7.5 5.5H5.2a2.8 2.8 0 0 0 2.8 2.8M16.5 5.5h2.3a2.8 2.8 0 0 1-2.8 2.8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
      <path d="M12 12v3.4M9.2 19h5.6M10.2 15.4h3.6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
    </svg>
  );
}

export function RecognitionExperience() {
  const [index, setIndex] = useState(0);
  const [appreciated, setAppreciated] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [visible, setVisible] = useState(false);
  const [reduced, setReduced] = useState(true);
  const deck = useRef<HTMLDivElement>(null);
  const card = KUDOS[index];

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduced(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    /* a deck dealing itself to an empty room is wasted motion, and worse, it
       means the visitor arrives mid-stream */
    const observer = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { threshold: 0.3 });
    if (deck.current) observer.observe(deck.current);
    return () => { mq.removeEventListener("change", sync); observer.disconnect(); };
  }, []);

  useEffect(() => {
    if (reduced || hovered || !visible) return;
    const t = window.setTimeout(() => { setIndex((i) => (i + 1) % KUDOS.length); setAppreciated(false); }, 4200);
    return () => window.clearTimeout(t);
  }, [index, reduced, hovered, visible]);

  return (
    <div className="hw-scene rc-experience">
      <div className="rc-canvas">
        <div
          className="rc-deck"
          ref={deck}
          data-celebrating={visible}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
          <span className="rc-confetti" aria-hidden="true">{CONFETTI.map((colour,i)=><i key={`${index}-${i}`} style={{"--x":`${(i - 5) * 12}px`,"--d":`${i * 38}ms`,"--c":colour} as CSSProperties}/>)}</span>

          {/* the next two, waiting — deliberately blank: they are the queue,
              not content to read */}
          <span className="rc-back rc-back--2" aria-hidden="true"/>
          <span className="rc-back rc-back--1" aria-hidden="true"/>

          <article className="rc-note" key={index} aria-live="polite">
            <div className="rc-award"><Trophy size={17}/>{card.award}</div>
            <header>
              <span className="rc-avatar">{card.initials}</span>
              <div><b>{card.name}</b><small>{card.team}</small></div>
            </header>
            <p>“{card.quote}”</p>
            <footer>
              <button type="button" className="rc-appreciate" aria-label={`Add your kudos for ${card.name}`} aria-pressed={appreciated} onClick={()=>setAppreciated(v=>!v)}>
                <Icon name="heart" size={14}/>{appreciated ? card.kudos + 1 : card.kudos} kudos
              </button>
              <span className="rc-reward"><Icon name="check" size={12}/>{card.points} points · reward unlocked</span>
            </footer>
          </article>
        </div>

        <div className="rc-foot">
          <p className="rc-caption"><b>312</b> moments celebrated this month</p>
          <span className="rc-dots" aria-hidden="true">
            {KUDOS.map((k,i)=><i key={k.name} data-on={i === index}/>)}
          </span>
        </div>
      </div>
    </div>
  );
}
