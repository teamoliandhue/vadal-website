"use client";

import { useState } from "react";
import { Icon } from "./Icon";
import { SparkMark } from "./Brand";
import "./social-experience.css";

/* The seventh silhouette: a feed column. Listen stacks cards, Survey is a
   side-by-side, Recognise a deck, Act a track, Ask a conversation — this is
   the only scene built around photography, which is what a company feed
   actually looks like.

   Deliberately not the consumer pattern: no blue chrome, no thumbs-up, no
   endless column. A composer bar, one post, and the people in it. */

const PHOTOS = [
  { src: "/people/customers-celebrate.webp", alt: "Colleagues celebrating together at a company event" },
  { src: "/people/team-collab.webp", alt: "A team working together around a laptop" },
  { src: "/people/persona-employees.webp", alt: "An employee smiling in the office" },
  { src: "/people/voice-of-your-people.webp", alt: "Colleagues talking in a bright workspace" },
];

export function SocialExperience() {
  const [liked, setLiked] = useState(false);
  return (
    <div className="hw-scene sc-experience">
      <div className="sc-canvas">
        {/* the composer sits on the wallpaper, not in a card — the post is the
            object here, and the bar is the thing you type into */}
        <div className="sc-composer">
          <span className="sc-avatar sc-avatar--you">JD</span>
          <span className="sc-placeholder">Share something with the company…</span>
          <div className="sc-tools">
            <button type="button" className="sc-tool">Photo</button>
            <button type="button" className="sc-tool">Topic</button>
            <button type="button" className="sc-tool sc-tool--ai"><SparkMark size={13}/>Write this for me</button>
          </div>
        </div>

        <article className="sc-post">
          <header>
            <span className="sc-avatar sc-avatar--author">MB</span>
            <div><b>Maya Brooks</b><small>Product · 2h</small></div>
            <span className="sc-topic">Company news</span>
          </header>

          <div className="sc-photos">
            {PHOTOS.map((photo,index)=>(
              /* eslint-disable-next-line @next/next/no-img-element -- fixed-size
                 tiles in a decorative mosaic; next/image buys nothing here */
              <img key={photo.src} src={photo.src} alt={photo.alt} loading="lazy" decoding="async" style={{ animationDelay: `${index * 90}ms` }}/>
            ))}
          </div>

          <footer>
            <button type="button" className="sc-act" data-on={liked} aria-pressed={liked} aria-label="Appreciate this post" onClick={()=>setLiked(v=>!v)}>
              <Icon name="heart" size={14}/>{liked ? 49 : 48}
            </button>
            <span className="sc-act"><Icon name="chat" size={14}/>12</span>
            <span className="sc-act"><Icon name="arrow" size={14}/>Share</span>
            <span className="sc-seen">Seen by 1,204</span>
          </footer>
        </article>
      </div>
    </div>
  );
}
