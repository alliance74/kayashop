# Rolex Watch Images

## Current Status
The Rolex watches are currently using placeholder images (hero images) because the URLs from the CSV file are no longer active (404 errors).

## How to Add Real Rolex Images

1. **Place your Rolex images in this folder** with these exact names:
   - `submariner-date.jpg` - Rolex Submariner Date (126613LB)
   - `daytona.jpg` - Rolex Cosmograph Daytona (126508)
   - `gmt-batman.jpg` - Rolex GMT-Master II Batman (116710BLNR)
   - `datejust-41.jpg` - Rolex Datejust 41 (126300)
   - `presidential.jpg` - Rolex Day-Date Presidential (228238)
   - `explorer-ii.jpg` - Rolex Explorer II Polar (226570)
   - `sky-dweller.jpg` - Rolex Sky-Dweller (326934)
   - `yacht-master-ii.jpg` - Rolex Yacht-Master II (116680)
   - `deepsea.jpg` - Rolex Sea-Dweller Deepsea (136660)
   - `milgauss.jpg` - Rolex Milgauss Green Crystal (116400GV)

2. **Update the catalog file** (`src/data/catalog.ts`):
   - Replace the placeholder imports with real image imports
   - Update each Rolex product to use its corresponding image

## Example Update in catalog.ts

Replace this section:
```typescript
// Rolex placeholder images
import imgRolexPlaceholder1 from "@/assets/hero-bathroom.jpg";
import imgRolexPlaceholder2 from "@/assets/hero-pool.jpg";
import imgRolexPlaceholder3 from "@/assets/hero-suite.jpg";
```

With:
```typescript
// Real Rolex images
import imgRolexSubmariner from "@/assets/rolex-watches/submariner-date.jpg";
import imgRolexDaytona from "@/assets/rolex-watches/daytona.jpg";
import imgRolexGMTBatman from "@/assets/rolex-watches/gmt-batman.jpg";
import imgRolexDatejust from "@/assets/rolex-watches/datejust-41.jpg";
import imgRolexPresidential from "@/assets/rolex-watches/presidential.jpg";
import imgRolexExplorer from "@/assets/rolex-watches/explorer-ii.jpg";
import imgRolexSkyDweller from "@/assets/rolex-watches/sky-dweller.jpg";
import imgRolexYachtMaster from "@/assets/rolex-watches/yacht-master-ii.jpg";
import imgRolexDeepsea from "@/assets/rolex-watches/deepsea.jpg";
import imgRolexMilgauss from "@/assets/rolex-watches/milgauss.jpg";
```

Then update each product entry to use the correct import instead of the placeholder.

## Image Requirements
- Format: JPG or PNG
- Recommended size: 800x800px minimum
- High quality product photos showing the watch clearly
- Consistent white or neutral background preferred
