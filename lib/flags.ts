/* ============================================================================
   Site-wide feature flags.

   LANDING_ONLY — beginning-stage switch. While true, the site presents as a
   single landing page: global navigation to the other (not-yet-launched) pages
   is hidden — the header nav menu + Login, and the footer's link columns. The
   home page and the "Book demo" conversion flow stay live.

   To restore the full multi-page site, flip this to false. The other routes
   (/platform, /solutions/*, /customers, …) still exist and build — they're just
   not linked from the chrome for now.
   ========================================================================== */
export const LANDING_ONLY = true;
