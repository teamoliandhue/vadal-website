"use client";

import { type CSSProperties } from "react";
import "./survey-experience.css";

/* Not the Listen shape. Listen is two wide cards stacked on a wallpaper;
   this is a side-by-side — the pulse as it actually arrives, in a narrow
   card, with the participation figures as bare type beside it. Different
   silhouette, and it says something the old layout did not: the question
   goes to a person, the number is what comes back. */

const SCALE = [
  { name: "Strongly disagree", mouth: "M9 20 Q14 12 19 20" },
  { name: "Disagree",          mouth: "M10 19 Q14 15 18 19" },
  { name: "Neutral",           mouth: "M10 18H18" },
  { name: "Agree",             mouth: "M9 16 Q14 22 19 16" },
  { name: "Strongly agree",    mouth: "M8 15 Q14 25 20 15Z" },
] as const;
const PARTICIPATION = [25, 42, 33, 62, 52, 75, 90];
const AVATARS = [
  { initials: "AK", tone: "violet" },
  { initials: "SM", tone: "teal" },
  { initials: "JR", tone: "amber" },
] as const;

export function SurveyExperience({ value, onChange }: { value: number; onChange: (value: number) => void }) {
  return (
    <div className="hw-scene sv-experience">
      <div className="sv-canvas">
        <div className="sv-summary">
          <div className="sv-number"><b>74%</b><span>participation this week</span></div>
          <div className="sv-who">
            <span className="sv-avatars" aria-hidden="true">{AVATARS.map(a=><i key={a.initials} className={`sv-avatar sv-avatar--${a.tone}`}>{a.initials}</i>)}</span>
            <span className="sv-bars" aria-hidden="true">{PARTICIPATION.map((height,index)=><i key={index} style={{"--bar-height":`${height}%`,"--bar-delay":`${index * 90}ms`} as CSSProperties}/>)}</span>
          </div>
        </div>

        <div className="sv-card">
          <div className="sv-progress"><span aria-hidden="true"><i/><i/><i/><i/></span><small>03 / 04</small></div>
          <h3>My workload feels manageable.</h3>
          <div className="sv-responses" role="group" aria-label="Your workload response">
            {SCALE.map((point,index)=><button type="button" key={point.name} className={`sv-point sv-point--${index}`} aria-label={point.name} aria-pressed={value===index} data-selected={value===index} onClick={()=>onChange(index)}>
              <svg width="23" height="23" viewBox="0 0 28 28" fill="none" aria-hidden="true">
                <circle cx="14" cy="14" r="11" stroke="currentColor" strokeWidth="1.6"/>
                <circle cx="10" cy="11" r="1" fill="currentColor"/><circle cx="18" cy="11" r="1" fill="currentColor"/>
                <path d={point.mouth} stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
              </svg>
            </button>)}
          </div>
          <div className="sv-ends"><span>Strongly disagree</span><span>Strongly agree</span></div>
        </div>
      </div>
    </div>
  );
}
