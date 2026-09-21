"use client";

import { useEffect, useState, type CSSProperties } from "react";
import { Icon } from "./Icon";
import "./recognition-experience.css";

/* A centred deck — one kudos card you can read with two more behind it, and
   the three deal themselves in one after another on arrival. The deck is the
   point: a single kind word in a panel reads as "here is a feature"; a stack
   reads as the thing the copy claims, that this happens all the time.

   The front card is an award moment rather than a generic note, because that
   is what a recognition programme looks like on the day it matters: a named
   award, a reason, kudos points, and a reward unlocked at the end of it. */

const CONFETTI = ["#e8a33d", "#e0685a", "#7c5cf8", "#19c6b4", "#f2c14e", "#5c7cf9", "#e87f9b", "#2fb98a", "#d4903a", "#f0a", "#5ad"];

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
  const [appreciated, setAppreciated] = useState(false);
  /* the burst belongs to the moment the award lands, not only to a click */
  const [arrived, setArrived] = useState(false);
  useEffect(() => { const t = window.setTimeout(() => setArrived(true), 520); return () => window.clearTimeout(t); }, []);

  return (
    <div className="hw-scene rc-experience">
      <div className="rc-canvas">
        <div className="rc-deck" data-celebrating={arrived || appreciated}>
          <span className="rc-confetti" aria-hidden="true">{CONFETTI.map((colour,index)=><i key={`${arrived}-${appreciated}-${index}`} style={{"--x":`${(index - 5) * 12}px`,"--d":`${index * 38}ms`,"--c":colour} as CSSProperties}/>)}</span>

          {/* the two behind deal themselves in first, then the award lands */}
          <span className="rc-back rc-back--2" aria-hidden="true"/>
          <span className="rc-back rc-back--1" aria-hidden="true"/>

          <article className="rc-note">
            <div className="rc-award"><Trophy size={17}/>Excellence Award · September</div>
            <header>
              <span className="rc-avatar">RM</span>
              <div><b>Rohan Mehta</b><small>Product team</small></div>
            </header>
            <p>“You made a complex launch feel effortless.”</p>
            <footer>
              <button type="button" className="rc-appreciate" aria-label="Add your kudos" aria-pressed={appreciated} onClick={()=>setAppreciated(v=>!v)}>
                <Icon name="heart" size={14}/>{appreciated ? 25 : 24} kudos
              </button>
              <span className="rc-reward"><Icon name="check" size={12}/>500 points · reward unlocked</span>
            </footer>
          </article>
        </div>
        <p className="rc-caption"><b>312</b> moments celebrated this month</p>
      </div>
    </div>
  );
}
