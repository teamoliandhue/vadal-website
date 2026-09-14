"use client";

import { useId, useState } from "react";
import { Icon } from "./Icon";
import { SparkMark } from "./Brand";

const INTELLIGENCE = [
  { name: "Understand", title: "A thousand signals. One clear picture.", body: "Vadal connects feedback, sentiment and team context to surface what matters.", result: "Workload is rising across 3 teams", icon: "chart" as const },
  { name: "Anticipate", title: "See the change before it becomes a risk.", body: "Spot shifts in engagement and emerging concerns while there’s time to respond.", result: "An early signal, with the reasons why", icon: "pulse" as const },
  { name: "Activate", title: "Make the next step a confident one.", body: "Turn insight into a focused recommendation, ready for a manager to review and own.", result: "A team action plan, ready for review", icon: "checks" as const },
];

export function VadalIntelligence() {
  const [selected, setSelected] = useState(0);
  const id = useId();
  const item = INTELLIGENCE[selected];

  return (
    <div className="hw-scene hw-intelligence" data-mode={selected}>
      <div className="vi-universe" aria-label="Employee signals flow through Vadal AI into actionable insight">
        <div className="vi-aurora vi-aurora--teal" aria-hidden="true" />
        <div className="vi-aurora vi-aurora--violet" aria-hidden="true" />
        <div className="vi-stars" aria-hidden="true" />
        <svg className="vi-connections" viewBox="0 0 560 180" preserveAspectRatio="none" aria-hidden="true">
          <defs>
            <linearGradient id={`${id}-flow`}><stop stopColor="#45dbc2"/><stop offset=".5" stopColor="#65b8ff"/><stop offset="1" stopColor="#a491ff"/></linearGradient>
          </defs>
          {[
            "M85 43 C170 43 170 90 280 90", "M85 137 C170 137 170 90 280 90",
            "M280 90 C390 90 390 43 475 43", "M280 90 C390 90 390 137 475 137",
          ].map((d, i) => <g key={d}><path d={d} fill="none" stroke={`url(#${id}-flow)`} strokeOpacity=".35"/><path className="vi-moving-signal" d={d} fill="none" stroke={`url(#${id}-flow)`} strokeWidth="2" pathLength="100" strokeDasharray="5 95" style={{animationDelay:`${i * -.8}s`}}/></g>)}
        </svg>
        <span className="vi-node vi-node--one"><Icon name="chat" size={15}/>Feedback</span>
        <span className="vi-node vi-node--two"><Icon name="pulse" size={15}/>Sentiment</span>
        <div className="vi-core">
          <span className="vi-orbit vi-orbit--one"/>
          <span className="vi-orbit vi-orbit--two"/>
          <span className="vi-core-light"/>
          <span className="vi-ai-icon" role="img" aria-label="Vadal AI: a white spark centred in an Aurora gradient circle">
            <span className="vi-ai-icon-gradient">
              <svg viewBox="0 0 40 40" aria-hidden="true"><path d="M20 3C21.1 14.1 25.9 18.9 37 20C25.9 21.1 21.1 25.9 20 37C18.9 25.9 14.1 21.1 3 20C14.1 18.9 18.9 14.1 20 3Z" fill="white"/></svg>
            </span>
          </span>
          <b>vadal<span>.ai</span></b>
        </div>
        <span className="vi-node vi-node--three"><Icon name="chart" size={15}/>Insight</span>
        <span className="vi-node vi-node--four"><Icon name="checks" size={15}/>Action</span>
      </div>
      <div className="vi-copy" key={selected}><h3>{item.title}</h3><p>{item.body}</p></div>
      <div className="vi-modes" role="group" aria-label="Explore Vadal AI capabilities">{INTELLIGENCE.map((mode, index) => <button type="button" key={mode.name} aria-pressed={selected === index} onClick={() => setSelected(index)}><span className="vi-mode-number">0{index+1}</span><Icon name={mode.icon} size={14}/>{mode.name}</button>)}</div>
      <div className="vi-result" aria-live="polite"><SparkMark size={17}/><span>{item.result}</span><Icon name="check" size={14}/></div>
    </div>
  );
}
