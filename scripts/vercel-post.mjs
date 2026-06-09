/**
 * Post-build script: restructures Nitro's dist/ output into
 * Vercel's Build Output API v3 format under .vercel/output/
 *
 * Key points:
 * - Static files go into .vercel/output/static/ and are served by Vercel CDN automatically
 * - The SSR function is placed at functions/[[catchall]].func so it catches all unmatched paths
 * - { handle: "filesystem" } MUST come before the catch-all route so assets are served statically
 */

import { cpSync, mkdirSync, writeFileSync, rmSync, existsSync } from "fs";
import { join } from "path";

const root = process.cwd();
const out = join(root, ".vercel", "output");

// Clean previous output
rmSync(out, { recursive: true, force: true });
mkdirSync(out, { recursive: true });

// 1. Copy static assets → .vercel/output/static/
//    dist/* becomes accessible at /*
const staticDir = join(out, "static");
mkdirSync(staticDir, { recursive: true });

// Check if dist directory exists
const distDir = join(root, "dist");
if (existsSync(distDir)) {
  cpSync(distDir, staticDir, { recursive: true });
} else {
  console.error("Error: dist/ directory not found. Build may have failed.");
  process.exit(1);
}

// 1b. Copy public/ folder → .vercel/output/static/ (favicon, etc.)
const publicDir = join(root, "public");
if (existsSync(publicDir)) {
  cpSync(publicDir, staticDir, { recursive: true });
}

// 2. Write top-level config.json for static site
//    All routes are handled by static files
writeFileSync(
  join(out, "config.json"),
  JSON.stringify({
    version: 3,
    routes: [
      // Serve static files directly from CDN
      { handle: "filesystem" },
    ],
  }, null, 2)
);

console.log("✓ Vercel Build Output API structure created at .vercel/output/");
console.log("  static/  →", join(out, "static"));
