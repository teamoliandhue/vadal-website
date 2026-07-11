import type { MetadataRoute } from "next";
import { solutions } from "@/lib/content";
import { productPages } from "@/lib/product-pages";
import { products } from "@/lib/products";

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

  const productSlugs = new Set([...products.map((p) => p.slug), ...productPages.map((p) => p.slug)]);
  const productRoutes = [...productSlugs].map((slug) => ({
    url: `${BASE}/platform/${slug}`,
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
