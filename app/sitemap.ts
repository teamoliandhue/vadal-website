import type { MetadataRoute } from "next";
import { solutions } from "@/lib/content";
import { platformModules } from "@/lib/platform-nav";

const BASE = "https://vadal.ai";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    "",
    "/platform",
    "/solutions",
    "/customers",
    "/resources",
    "/science",
    "/pricing",
    "/about",
    "/contact",
    "/demo",
    "/security",
    "/privacy",
    "/terms",
    "/gdpr",
  ].map((path) => ({
    url: `${BASE}${path}`,
    changeFrequency: "weekly" as const,
    priority: path === "" ? 1 : path === "/demo" || path === "/platform" ? 0.9 : 0.7,
  }));

  /* Only what the catalogue links to. Built from both product registries, the
     sitemap listed every retired page too — thirteen URLs it asked engines to
     index answered with a 308. Every page in the registries that is not in the
     catalogue is redirected (next.config.mjs), so this is the full live set. */
  const productRoutes = platformModules.map((m) => ({
    url: `${BASE}${m.href}`,
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  const solutionRoutes = solutions.map((s) => ({
    url: `${BASE}/solutions/${s.slug}`,
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  return [...staticRoutes, ...productRoutes, ...solutionRoutes];
}
