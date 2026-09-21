"use client";

import { useState } from "react";
import { SparkMark } from "./Brand";
import "./ask-experience.css";

/* The sixth silhouette, and the only one that is an exchange. Listen stacks
   cards, Survey sits side by side, Analyse lets the chart be the surface,
   Recognise is a deck, Act is a track — this one is a conversation, so it is
   built out of the one shape none of the others use: two bubbles on opposite
   sides, with the tail corners squared off the way a chat does it. */

type Answer = { question: string; chip: string; lead: string; body: string; number: string; metric: string; change: string; period: string };
const ANSWERS: Answer[] = [
  /* the old pair contradicted itself: "the signal behind the dip" sat next to
     "+22% vs. last quarter", which reads as an improvement. Both numbers point
     the same way now, and the headline figure is eNPS rather than a raw count. */
  { question: "Where should I focus with Engineering?", chip: "Where to focus?",
    lead: "Start with workload.", body: "It’s the strongest signal behind Engineering’s 6-point drop.",
    number: "+29", metric: "Engineering eNPS", change: "−6", period: "since last quarter" },
  { question: "What’s working well for our people?", chip: "What’s working?",
    lead: "Recognition is a strength.", body: "Teams are appreciating each other more consistently.",
    number: "84", metric: "recognition score", change: "+12", period: "teams reached" },
  { question: "What should our next action be?", chip: "Next action?",
    lead: "Run a workload reset in Engineering.", body: "Rebalance sprint load, then re-pulse to confirm it moved.",
    number: "2", metric: "teams in scope", change: "14 days", period: "to re-pulse" },
];

export function AskExperience() {
  const [asked, setAsked] = useState(0);
  const answer = ANSWERS[asked];
  return (
    <div className="hw-scene ak-experience">
      <div className="ak-canvas">
        <p className="ak-ask" key={`q-${asked}`}>{answer.question}<span className="ak-avatar" aria-hidden="true">JD</span></p>

        <div className="ak-reply" key={`a-${asked}`}>
          <span className="ak-spark" aria-hidden="true"><SparkMark size={19}/></span>
          <p><strong>{answer.lead}</strong> {answer.body}</p>
          <div className="ak-evidence">
            <div><b>{answer.number}</b><span>{answer.metric}</span></div>
            <div><b>{answer.change}</b><span>{answer.period}</span></div>
          </div>
        </div>

        <div className="ak-chips" role="group" aria-label="Example questions for Vadal AI">
          {ANSWERS.map((option,index)=><button key={option.chip} type="button" aria-pressed={asked===index} onClick={()=>setAsked(index)}>{option.chip}</button>)}
        </div>

        {/* typing is not the only way in — voice sits beside the field wherever
            the assistant appears */}
        <div className="ak-input">
          <span>Ask Vadal anything…</span>
          <button type="button" className="ak-mic" aria-label="Ask by voice">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <rect x="9" y="2.5" width="6" height="11.5" rx="3" stroke="currentColor" strokeWidth="1.7"/>
              <path d="M5.5 11.5a6.5 6.5 0 0 0 13 0M12 18v3.5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round"/>
            </svg>
            <i aria-hidden="true"/><i aria-hidden="true"/><i aria-hidden="true"/>
          </button>
        </div>
      </div>
    </div>
  );
}
