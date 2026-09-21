"use client";

import { type CSSProperties } from "react";
import { Icon } from "./Icon";
import "./listening-experience.css";

/* A signal is coloured by its THEME, so the stream is scannable at a glance
   rather than decorated arbitrarily. */
const THEME_CLASS: Record<string, string> = {
  "Career growth": "ls-theme-career",
  "Workload": "ls-theme-workload",
  "Manager support": "ls-theme-manager",
  "Belonging": "ls-theme-belonging",
};
const SIGNALS = [
  { icon: "chat",  by: "Anonymous feedback", time: "2 min ago",  start: "More clarity on ",        emphasis: "career paths",   end: ".", theme: "Career growth" },
  { icon: "pulse", by: "Weekly pulse",       time: "12 min ago", start: "We just need ",           emphasis: "room to recharge", end: ".", theme: "Workload" },
  { icon: "chat",  by: "Anonymous feedback", time: "24 min ago", start: "My manager makes ",       emphasis: "time to listen",  end: ".", theme: "Manager support" },
] as const;
/* the waveform carries the aurora ramp across its width rather than one flat
   green, so it reads as many different voices */
const WAVE = [9,15,23,13,30,39,24,46,32,20,43,54,34,62,44,28,51,37,22,44,31,17,27,38,19,12,22,10];
const RAMP = ["#19c6b4", "#22b8dd", "#3b9eff", "#5c7cf9", "#7c5cf8"];
function rampAt(t: number) {
  const x = t * (RAMP.length - 1), i = Math.min(RAMP.length - 2, Math.floor(x)), f = x - i;
  const hex = (c: string) => [1, 3, 5].map((k) => parseInt(c.slice(k, k + 2), 16));
  const a = hex(RAMP[i]), b = hex(RAMP[i + 1]);
  return `rgb(${a.map((v, k) => Math.round(v + (b[k] - v) * f)).join(",")})`;
}

export function ListeningExperience() {
  return (
    <div className="hw-scene ls-experience">
      <div className="ls-canvas">
        <div className="ls-pulse">
          <div className="ls-number"><b>2,768</b><span>signals this week</span></div>
          <div className="ls-audio" aria-hidden="true">{WAVE.map((height,index)=>{const t=index/(WAVE.length-1);return <i key={index} style={{"--bar-height":`${height}%`,"--bar-delay":`${index * -0.17}s`,"--bar-top":rampAt(t),"--bar-bottom":rampAt(Math.min(1,t+0.16))} as CSSProperties}/>;})}</div>
          <div className="ls-state">
            <span className="ls-live"><i/>Listening</span>
            <span className="ls-timing">Last signal · 2 min ago</span>
          </div>
        </div>

        {/* a board, not a chat column — the conversation belongs to the
            assistant; listening is a surface you scan by theme */}
        <div className="ls-board">
          {SIGNALS.map((signal,index)=><article className={`ls-tile ${THEME_CLASS[signal.theme]}`} key={signal.emphasis} style={{"--voice-delay":`${index * 130}ms`} as CSSProperties}>
            <header>
              <span className="ls-tile-icon"><Icon name={signal.icon} size={14}/></span>
              <span className="ls-tile-theme">{signal.theme}</span>
            </header>
            <p>“{signal.start}<mark>{signal.emphasis}</mark>{signal.end}”</p>
            <footer>{signal.time}</footer>
          </article>)}
        </div>
      </div>
    </div>
  );
}
