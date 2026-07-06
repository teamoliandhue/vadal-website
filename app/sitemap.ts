import type { MetadataRoute } from "next";
import { solutions } from "@/lib/content";
import { productPages } from "@/lib/product-pages";

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

  const productRoutes = productPages.map((p) => ({
    url: `${BASE}/platform/${p.slug}`,
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
