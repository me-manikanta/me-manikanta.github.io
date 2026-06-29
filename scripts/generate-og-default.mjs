// Generates the branded default Open Graph image (1200x630) at
// public/assets/og-default.png. Run via `node scripts/generate-og-default.mjs`.
// Reproducible: re-run any time the branding/text changes.
import sharp from "sharp";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT = join(__dirname, "..", "public", "assets", "og-default.png");

const NAME = "Manikanta Inugurthi";
const TAGLINE = "Senior Software Engineer at Microsoft";
const SUB = "Writing about software, tools &amp; the things I learn";
const SITE = "me-manikanta.github.io";

const svg = `
<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#0b1220"/>
      <stop offset="55%" stop-color="#0f172a"/>
      <stop offset="100%" stop-color="#13233f"/>
    </linearGradient>
    <linearGradient id="accent" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="#47a3f3"/>
      <stop offset="100%" stop-color="#7cc0ff"/>
    </linearGradient>
  </defs>

  <rect width="1200" height="630" fill="url(#bg)"/>

  <!-- subtle corner glow -->
  <circle cx="1080" cy="90" r="220" fill="#47a3f3" opacity="0.10"/>
  <circle cx="120" cy="560" r="180" fill="#ffc600" opacity="0.06"/>

  <!-- accent bar -->
  <rect x="90" y="150" width="90" height="10" rx="5" fill="url(#accent)"/>

  <text x="90" y="270" font-family="Helvetica, Arial, sans-serif" font-size="76" font-weight="700" fill="#f8fafc">${NAME}</text>
  <text x="92" y="338" font-family="Helvetica, Arial, sans-serif" font-size="38" font-weight="600" fill="#47a3f3">${TAGLINE}</text>
  <text x="92" y="398" font-family="Helvetica, Arial, sans-serif" font-size="30" font-weight="400" fill="#94a3b8">${SUB}</text>

  <!-- footer -->
  <rect x="90" y="520" width="44" height="44" rx="10" fill="url(#accent)"/>
  <text x="106" y="551" font-family="Helvetica, Arial, sans-serif" font-size="26" font-weight="700" fill="#0b1220">M</text>
  <text x="150" y="551" font-family="Helvetica, Arial, sans-serif" font-size="28" font-weight="500" fill="#cbd5e1">${SITE}</text>
</svg>
`;

await sharp(Buffer.from(svg)).png().toFile(OUT);
console.log(`Wrote ${OUT}`);
