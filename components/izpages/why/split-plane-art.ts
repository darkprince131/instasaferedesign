/* ============================================================
   split-plane-art.ts — generated isometric geometry.

   PROGRAMMATICALLY GENERATED, NOT HAND-DRAWN. True isometric
   projection (30/30, parallel, no vanishing point) exported from the
   approved prototype: ~540 exact polygons. Nothing here should be
   edited by hand, and rewriting it as JSX would add a transcription
   step for no gain, so it is held as raw markup and injected — which
   keeps the coordinates byte-identical to the art that was approved.

   Safe to inject: static, local, author-authored art. No
   interpolation, no user input.

   THEMING: every colour is a `var(--illus-*)` reference resolved in
   whyreasons.css. Note `--illus-fill` — the prototype referenced it
   264 times and never defined it, so its dark hex fallback applied
   always and every solid rendered near-black on a paper page. It is
   bound to the scene background per theme now.
   ============================================================ */

export const SPLIT_PLANE_VIEWBOX = "0 0 1600 1000";

export const SPLIT_PLANE_ART = String.raw`
<defs>
    <filter id="spr-blur" x="-40%" y="-40%" width="180%" height="180%">
      <feGaussianBlur stdDeviation="5"/>
    </filter>
  </defs>
  
  
<g class="spr-grid">
<line x1="0" y1="0" x2="0" y2="1000" stroke="var(--illus-grid, rgba(233,228,218,.05))" stroke-width="1"/>
<line x1="50" y1="0" x2="50" y2="1000" stroke="var(--illus-grid, rgba(233,228,218,.05))" stroke-width="1"/>
<line x1="100" y1="0" x2="100" y2="1000" stroke="var(--illus-grid, rgba(233,228,218,.05))" stroke-width="1"/>
<line x1="150" y1="0" x2="150" y2="1000" stroke="var(--illus-grid, rgba(233,228,218,.05))" stroke-width="1"/>
<line x1="200" y1="0" x2="200" y2="1000" stroke="var(--illus-grid, rgba(233,228,218,.05))" stroke-width="1"/>
<line x1="250" y1="0" x2="250" y2="1000" stroke="var(--illus-grid, rgba(233,228,218,.05))" stroke-width="1"/>
<line x1="300" y1="0" x2="300" y2="1000" stroke="var(--illus-grid, rgba(233,228,218,.05))" stroke-width="1"/>
<line x1="350" y1="0" x2="350" y2="1000" stroke="var(--illus-grid, rgba(233,228,218,.05))" stroke-width="1"/>
<line x1="400" y1="0" x2="400" y2="1000" stroke="var(--illus-grid, rgba(233,228,218,.05))" stroke-width="1"/>
<line x1="450" y1="0" x2="450" y2="1000" stroke="var(--illus-grid, rgba(233,228,218,.05))" stroke-width="1"/>
<line x1="500" y1="0" x2="500" y2="1000" stroke="var(--illus-grid, rgba(233,228,218,.05))" stroke-width="1"/>
<line x1="550" y1="0" x2="550" y2="1000" stroke="var(--illus-grid, rgba(233,228,218,.05))" stroke-width="1"/>
<line x1="600" y1="0" x2="600" y2="1000" stroke="var(--illus-grid, rgba(233,228,218,.05))" stroke-width="1"/>
<line x1="650" y1="0" x2="650" y2="1000" stroke="var(--illus-grid, rgba(233,228,218,.05))" stroke-width="1"/>
<line x1="700" y1="0" x2="700" y2="1000" stroke="var(--illus-grid, rgba(233,228,218,.05))" stroke-width="1"/>
<line x1="750" y1="0" x2="750" y2="1000" stroke="var(--illus-grid, rgba(233,228,218,.05))" stroke-width="1"/>
<line x1="800" y1="0" x2="800" y2="1000" stroke="var(--illus-grid, rgba(233,228,218,.05))" stroke-width="1"/>
<line x1="850" y1="0" x2="850" y2="1000" stroke="var(--illus-grid, rgba(233,228,218,.05))" stroke-width="1"/>
<line x1="900" y1="0" x2="900" y2="1000" stroke="var(--illus-grid, rgba(233,228,218,.05))" stroke-width="1"/>
<line x1="950" y1="0" x2="950" y2="1000" stroke="var(--illus-grid, rgba(233,228,218,.05))" stroke-width="1"/>
<line x1="1000" y1="0" x2="1000" y2="1000" stroke="var(--illus-grid, rgba(233,228,218,.05))" stroke-width="1"/>
<line x1="1050" y1="0" x2="1050" y2="1000" stroke="var(--illus-grid, rgba(233,228,218,.05))" stroke-width="1"/>
<line x1="1100" y1="0" x2="1100" y2="1000" stroke="var(--illus-grid, rgba(233,228,218,.05))" stroke-width="1"/>
<line x1="1150" y1="0" x2="1150" y2="1000" stroke="var(--illus-grid, rgba(233,228,218,.05))" stroke-width="1"/>
<line x1="1200" y1="0" x2="1200" y2="1000" stroke="var(--illus-grid, rgba(233,228,218,.05))" stroke-width="1"/>
<line x1="1250" y1="0" x2="1250" y2="1000" stroke="var(--illus-grid, rgba(233,228,218,.05))" stroke-width="1"/>
<line x1="1300" y1="0" x2="1300" y2="1000" stroke="var(--illus-grid, rgba(233,228,218,.05))" stroke-width="1"/>
<line x1="1350" y1="0" x2="1350" y2="1000" stroke="var(--illus-grid, rgba(233,228,218,.05))" stroke-width="1"/>
<line x1="1400" y1="0" x2="1400" y2="1000" stroke="var(--illus-grid, rgba(233,228,218,.05))" stroke-width="1"/>
<line x1="1450" y1="0" x2="1450" y2="1000" stroke="var(--illus-grid, rgba(233,228,218,.05))" stroke-width="1"/>
<line x1="1500" y1="0" x2="1500" y2="1000" stroke="var(--illus-grid, rgba(233,228,218,.05))" stroke-width="1"/>
<line x1="1550" y1="0" x2="1550" y2="1000" stroke="var(--illus-grid, rgba(233,228,218,.05))" stroke-width="1"/>
<line x1="1600" y1="0" x2="1600" y2="1000" stroke="var(--illus-grid, rgba(233,228,218,.05))" stroke-width="1"/>
<line x1="0" y1="0" x2="1600" y2="0" stroke="var(--illus-grid, rgba(233,228,218,.05))" stroke-width="1"/>
<line x1="0" y1="50" x2="1600" y2="50" stroke="var(--illus-grid, rgba(233,228,218,.05))" stroke-width="1"/>
<line x1="0" y1="100" x2="1600" y2="100" stroke="var(--illus-grid, rgba(233,228,218,.05))" stroke-width="1"/>
<line x1="0" y1="150" x2="1600" y2="150" stroke="var(--illus-grid, rgba(233,228,218,.05))" stroke-width="1"/>
<line x1="0" y1="200" x2="1600" y2="200" stroke="var(--illus-grid, rgba(233,228,218,.05))" stroke-width="1"/>
<line x1="0" y1="250" x2="1600" y2="250" stroke="var(--illus-grid, rgba(233,228,218,.05))" stroke-width="1"/>
<line x1="0" y1="300" x2="1600" y2="300" stroke="var(--illus-grid, rgba(233,228,218,.05))" stroke-width="1"/>
<line x1="0" y1="350" x2="1600" y2="350" stroke="var(--illus-grid, rgba(233,228,218,.05))" stroke-width="1"/>
<line x1="0" y1="400" x2="1600" y2="400" stroke="var(--illus-grid, rgba(233,228,218,.05))" stroke-width="1"/>
<line x1="0" y1="450" x2="1600" y2="450" stroke="var(--illus-grid, rgba(233,228,218,.05))" stroke-width="1"/>
<line x1="0" y1="500" x2="1600" y2="500" stroke="var(--illus-grid, rgba(233,228,218,.05))" stroke-width="1"/>
<line x1="0" y1="550" x2="1600" y2="550" stroke="var(--illus-grid, rgba(233,228,218,.05))" stroke-width="1"/>
<line x1="0" y1="600" x2="1600" y2="600" stroke="var(--illus-grid, rgba(233,228,218,.05))" stroke-width="1"/>
<line x1="0" y1="650" x2="1600" y2="650" stroke="var(--illus-grid, rgba(233,228,218,.05))" stroke-width="1"/>
<line x1="0" y1="700" x2="1600" y2="700" stroke="var(--illus-grid, rgba(233,228,218,.05))" stroke-width="1"/>
<line x1="0" y1="750" x2="1600" y2="750" stroke="var(--illus-grid, rgba(233,228,218,.05))" stroke-width="1"/>
<line x1="0" y1="800" x2="1600" y2="800" stroke="var(--illus-grid, rgba(233,228,218,.05))" stroke-width="1"/>
<line x1="0" y1="850" x2="1600" y2="850" stroke="var(--illus-grid, rgba(233,228,218,.05))" stroke-width="1"/>
<line x1="0" y1="900" x2="1600" y2="900" stroke="var(--illus-grid, rgba(233,228,218,.05))" stroke-width="1"/>
<line x1="0" y1="950" x2="1600" y2="950" stroke="var(--illus-grid, rgba(233,228,218,.05))" stroke-width="1"/>
<line x1="0" y1="1000" x2="1600" y2="1000" stroke="var(--illus-grid, rgba(233,228,218,.05))" stroke-width="1"/>
</g>
<polygon points="1016.9,242.5 981.8,262.8 981.8,255.0 1016.9,234.7" fill="var(--illus-fill, #0a0c10)" stroke="var(--illus-line-dim, rgba(233,228,218,.38))" stroke-width="1.1" stroke-linejoin="round"/>
<polygon points="952.1,245.6 981.8,262.8 981.8,255.0 952.1,237.8" fill="var(--illus-fill, #0a0c10)" stroke="var(--illus-line-dim, rgba(233,228,218,.38))" stroke-width="1.1" stroke-linejoin="round"/>
<polygon points="987.2,217.5 1016.9,234.7 981.8,255.0 952.1,237.8" fill="var(--illus-fill, #0a0c10)" stroke="var(--illus-line-dim, rgba(233,228,218,.38))" stroke-width="1.1" stroke-linejoin="round"/>
<polygon points="1003.4,236.2 984.5,247.2 984.5,41.2 1003.4,30.3" fill="var(--illus-fill, #0a0c10)" stroke="var(--illus-line-dim, rgba(233,228,218,.38))" stroke-width="1.1" stroke-linejoin="round"/>
<polygon points="965.6,236.2 984.5,247.2 984.5,41.2 965.6,30.3" fill="var(--illus-fill, #0a0c10)" stroke="var(--illus-line-dim, rgba(233,228,218,.38))" stroke-width="1.1" stroke-linejoin="round"/>
<polygon points="984.5,19.4 1003.4,30.3 984.5,41.2 965.6,30.3" fill="var(--illus-fill, #0a0c10)" stroke="var(--illus-line-dim, rgba(233,228,218,.38))" stroke-width="1.1" stroke-linejoin="round"/>
<polygon points="827.8,351.7 792.7,372.0 792.7,364.2 827.8,343.9" fill="var(--illus-fill, #0a0c10)" stroke="var(--illus-line-dim, rgba(233,228,218,.38))" stroke-width="1.1" stroke-linejoin="round"/>
<polygon points="763.0,354.8 792.7,372.0 792.7,364.2 763.0,347.0" fill="var(--illus-fill, #0a0c10)" stroke="var(--illus-line-dim, rgba(233,228,218,.38))" stroke-width="1.1" stroke-linejoin="round"/>
<polygon points="798.1,326.7 827.8,343.9 792.7,364.2 763.0,347.0" fill="var(--illus-fill, #0a0c10)" stroke="var(--illus-line-dim, rgba(233,228,218,.38))" stroke-width="1.1" stroke-linejoin="round"/>
<polygon points="814.3,345.4 795.4,356.4 795.4,150.4 814.3,139.5" fill="var(--illus-fill, #0a0c10)" stroke="var(--illus-line-dim, rgba(233,228,218,.38))" stroke-width="1.1" stroke-linejoin="round"/>
<polygon points="776.5,345.4 795.4,356.4 795.4,150.4 776.5,139.5" fill="var(--illus-fill, #0a0c10)" stroke="var(--illus-line-dim, rgba(233,228,218,.38))" stroke-width="1.1" stroke-linejoin="round"/>
<polygon points="795.4,128.6 814.3,139.5 795.4,150.4 776.5,139.5" fill="var(--illus-fill, #0a0c10)" stroke="var(--illus-line-dim, rgba(233,228,218,.38))" stroke-width="1.1" stroke-linejoin="round"/>
<polygon points="638.7,460.9 603.5,481.2 603.5,473.4 638.7,453.1" fill="var(--illus-fill, #0a0c10)" stroke="var(--illus-line-dim, rgba(233,228,218,.38))" stroke-width="1.1" stroke-linejoin="round"/>
<polygon points="573.8,464.0 603.5,481.2 603.5,473.4 573.8,456.2" fill="var(--illus-fill, #0a0c10)" stroke="var(--illus-line-dim, rgba(233,228,218,.38))" stroke-width="1.1" stroke-linejoin="round"/>
<polygon points="608.9,435.9 638.7,453.1 603.5,473.4 573.8,456.2" fill="var(--illus-fill, #0a0c10)" stroke="var(--illus-line-dim, rgba(233,228,218,.38))" stroke-width="1.1" stroke-linejoin="round"/>
<polygon points="625.2,454.6 606.2,465.6 606.2,259.6 625.2,248.7" fill="var(--illus-fill, #0a0c10)" stroke="var(--illus-line-dim, rgba(233,228,218,.38))" stroke-width="1.1" stroke-linejoin="round"/>
<polygon points="587.3,454.6 606.2,465.6 606.2,259.6 587.3,248.7" fill="var(--illus-fill, #0a0c10)" stroke="var(--illus-line-dim, rgba(233,228,218,.38))" stroke-width="1.1" stroke-linejoin="round"/>
<polygon points="606.2,237.8 625.2,248.7 606.2,259.6 587.3,248.7" fill="var(--illus-fill, #0a0c10)" stroke="var(--illus-line-dim, rgba(233,228,218,.38))" stroke-width="1.1" stroke-linejoin="round"/>
<polygon points="449.5,570.1 414.4,590.4 414.4,582.6 449.5,562.3" fill="var(--illus-fill, #0a0c10)" stroke="var(--illus-line-dim, rgba(233,228,218,.38))" stroke-width="1.1" stroke-linejoin="round"/>
<polygon points="384.7,573.2 414.4,590.4 414.4,582.6 384.7,565.4" fill="var(--illus-fill, #0a0c10)" stroke="var(--illus-line-dim, rgba(233,228,218,.38))" stroke-width="1.1" stroke-linejoin="round"/>
<polygon points="419.8,545.1 449.5,562.3 414.4,582.6 384.7,565.4" fill="var(--illus-fill, #0a0c10)" stroke="var(--illus-line-dim, rgba(233,228,218,.38))" stroke-width="1.1" stroke-linejoin="round"/>
<polygon points="436.0,563.8 417.1,574.8 417.1,368.8 436.0,357.9" fill="var(--illus-fill, #0a0c10)" stroke="var(--illus-line-dim, rgba(233,228,218,.38))" stroke-width="1.1" stroke-linejoin="round"/>
<polygon points="398.2,563.8 417.1,574.8 417.1,368.8 398.2,357.9" fill="var(--illus-fill, #0a0c10)" stroke="var(--illus-line-dim, rgba(233,228,218,.38))" stroke-width="1.1" stroke-linejoin="round"/>
<polygon points="417.1,347.0 436.0,357.9 417.1,368.8 398.2,357.9" fill="var(--illus-fill, #0a0c10)" stroke="var(--illus-line-dim, rgba(233,228,218,.38))" stroke-width="1.1" stroke-linejoin="round"/>
<polygon points="260.4,679.3 225.3,699.6 225.3,691.8 260.4,671.5" fill="var(--illus-fill, #0a0c10)" stroke="var(--illus-line-dim, rgba(233,228,218,.38))" stroke-width="1.1" stroke-linejoin="round"/>
<polygon points="195.5,682.4 225.3,699.6 225.3,691.8 195.5,674.6" fill="var(--illus-fill, #0a0c10)" stroke="var(--illus-line-dim, rgba(233,228,218,.38))" stroke-width="1.1" stroke-linejoin="round"/>
<polygon points="230.7,654.3 260.4,671.5 225.3,691.8 195.5,674.6" fill="var(--illus-fill, #0a0c10)" stroke="var(--illus-line-dim, rgba(233,228,218,.38))" stroke-width="1.1" stroke-linejoin="round"/>
<polygon points="246.9,673.0 228.0,684.0 228.0,478.0 246.9,467.1" fill="var(--illus-fill, #0a0c10)" stroke="var(--illus-line-dim, rgba(233,228,218,.38))" stroke-width="1.1" stroke-linejoin="round"/>
<polygon points="209.0,673.0 228.0,684.0 228.0,478.0 209.0,467.1" fill="var(--illus-fill, #0a0c10)" stroke="var(--illus-line-dim, rgba(233,228,218,.38))" stroke-width="1.1" stroke-linejoin="round"/>
<polygon points="228.0,456.2 246.9,467.1 228.0,478.0 209.0,467.1" fill="var(--illus-fill, #0a0c10)" stroke="var(--illus-line-dim, rgba(233,228,218,.38))" stroke-width="1.1" stroke-linejoin="round"/>
<polygon points="71.2,788.5 36.1,808.8 36.1,801.0 71.2,780.7" fill="var(--illus-fill, #0a0c10)" stroke="var(--illus-line-dim, rgba(233,228,218,.38))" stroke-width="1.1" stroke-linejoin="round"/>
<polygon points="6.4,791.6 36.1,808.8 36.1,801.0 6.4,783.8" fill="var(--illus-fill, #0a0c10)" stroke="var(--illus-line-dim, rgba(233,228,218,.38))" stroke-width="1.1" stroke-linejoin="round"/>
<polygon points="41.5,763.5 71.2,780.7 36.1,801.0 6.4,783.8" fill="var(--illus-fill, #0a0c10)" stroke="var(--illus-line-dim, rgba(233,228,218,.38))" stroke-width="1.1" stroke-linejoin="round"/>
<polygon points="57.7,782.2 38.8,793.2 38.8,587.2 57.7,576.3" fill="var(--illus-fill, #0a0c10)" stroke="var(--illus-line-dim, rgba(233,228,218,.38))" stroke-width="1.1" stroke-linejoin="round"/>
<polygon points="19.9,782.2 38.8,793.2 38.8,587.2 19.9,576.3" fill="var(--illus-fill, #0a0c10)" stroke="var(--illus-line-dim, rgba(233,228,218,.38))" stroke-width="1.1" stroke-linejoin="round"/>
<polygon points="38.8,565.4 57.7,576.3 38.8,587.2 19.9,576.3" fill="var(--illus-fill, #0a0c10)" stroke="var(--illus-line-dim, rgba(233,228,218,.38))" stroke-width="1.1" stroke-linejoin="round"/>
<polygon points="1476.3,-231.8 -77.4,665.2 -77.4,645.0 1476.3,-252.0" fill="var(--illus-fill, #0a0c10)" stroke="var(--illus-line, #e9e4da)" stroke-width="1.5" stroke-linejoin="round"/>
<polygon points="-115.2,643.4 -77.4,665.2 -77.4,645.0 -115.2,623.1" fill="var(--illus-fill, #0a0c10)" stroke="var(--illus-line, #e9e4da)" stroke-width="1.5" stroke-linejoin="round"/>
<polygon points="1438.5,-273.9 1476.3,-252.0 -77.4,645.0 -115.2,623.1" fill="var(--illus-fill, #0a0c10)" stroke="var(--illus-line, #e9e4da)" stroke-width="1.5" stroke-linejoin="round"/>
<line x1="1443.9" y1="-255.2" x2="-82.8" y2="626.2" stroke="var(--illus-line-dim, rgba(233,228,218,.38))" stroke-width="1.2" stroke-linecap="round" stroke-dasharray="7 8"/>
<line x1="1435.8" y1="-212.3" x2="1426.3" y2="-219.3" stroke="var(--illus-line-faint, rgba(233,228,218,.16))" stroke-width="1" stroke-linecap="round"/>
<line x1="1381.7" y1="-181.1" x2="1372.3" y2="-188.1" stroke="var(--illus-line-faint, rgba(233,228,218,.16))" stroke-width="1" stroke-linecap="round"/>
<line x1="1327.7" y1="-149.9" x2="1318.2" y2="-156.9" stroke="var(--illus-line-faint, rgba(233,228,218,.16))" stroke-width="1" stroke-linecap="round"/>
<line x1="1273.6" y1="-118.7" x2="1264.2" y2="-125.7" stroke="var(--illus-line-faint, rgba(233,228,218,.16))" stroke-width="1" stroke-linecap="round"/>
<line x1="1219.6" y1="-87.5" x2="1210.1" y2="-94.5" stroke="var(--illus-line-faint, rgba(233,228,218,.16))" stroke-width="1" stroke-linecap="round"/>
<line x1="1165.6" y1="-56.3" x2="1156.1" y2="-63.3" stroke="var(--illus-line-faint, rgba(233,228,218,.16))" stroke-width="1" stroke-linecap="round"/>
<line x1="1111.5" y1="-25.1" x2="1102.1" y2="-32.1" stroke="var(--illus-line-faint, rgba(233,228,218,.16))" stroke-width="1" stroke-linecap="round"/>
<line x1="1057.5" y1="6.1" x2="1048.0" y2="-0.9" stroke="var(--illus-line-faint, rgba(233,228,218,.16))" stroke-width="1" stroke-linecap="round"/>
<line x1="1003.4" y1="37.3" x2="994.0" y2="30.3" stroke="var(--illus-line-faint, rgba(233,228,218,.16))" stroke-width="1" stroke-linecap="round"/>
<line x1="949.4" y1="68.5" x2="939.9" y2="61.5" stroke="var(--illus-line-faint, rgba(233,228,218,.16))" stroke-width="1" stroke-linecap="round"/>
<line x1="895.4" y1="99.7" x2="885.9" y2="92.7" stroke="var(--illus-line-faint, rgba(233,228,218,.16))" stroke-width="1" stroke-linecap="round"/>
<line x1="841.3" y1="130.9" x2="831.9" y2="123.9" stroke="var(--illus-line-faint, rgba(233,228,218,.16))" stroke-width="1" stroke-linecap="round"/>
<line x1="787.3" y1="162.1" x2="777.8" y2="155.1" stroke="var(--illus-line-faint, rgba(233,228,218,.16))" stroke-width="1" stroke-linecap="round"/>
<line x1="733.2" y1="193.3" x2="723.8" y2="186.3" stroke="var(--illus-line-faint, rgba(233,228,218,.16))" stroke-width="1" stroke-linecap="round"/>
<line x1="679.2" y1="224.5" x2="669.7" y2="217.5" stroke="var(--illus-line-faint, rgba(233,228,218,.16))" stroke-width="1" stroke-linecap="round"/>
<line x1="625.2" y1="255.7" x2="615.7" y2="248.7" stroke="var(--illus-line-faint, rgba(233,228,218,.16))" stroke-width="1" stroke-linecap="round"/>
<line x1="571.1" y1="286.9" x2="561.7" y2="279.9" stroke="var(--illus-line-faint, rgba(233,228,218,.16))" stroke-width="1" stroke-linecap="round"/>
<line x1="517.1" y1="318.1" x2="507.6" y2="311.1" stroke="var(--illus-line-faint, rgba(233,228,218,.16))" stroke-width="1" stroke-linecap="round"/>
<line x1="463.0" y1="349.3" x2="453.6" y2="342.3" stroke="var(--illus-line-faint, rgba(233,228,218,.16))" stroke-width="1" stroke-linecap="round"/>
<line x1="409.0" y1="380.5" x2="399.5" y2="373.5" stroke="var(--illus-line-faint, rgba(233,228,218,.16))" stroke-width="1" stroke-linecap="round"/>
<line x1="355.0" y1="411.7" x2="345.5" y2="404.7" stroke="var(--illus-line-faint, rgba(233,228,218,.16))" stroke-width="1" stroke-linecap="round"/>
<line x1="300.9" y1="442.9" x2="291.5" y2="435.9" stroke="var(--illus-line-faint, rgba(233,228,218,.16))" stroke-width="1" stroke-linecap="round"/>
<line x1="246.9" y1="474.1" x2="237.4" y2="467.1" stroke="var(--illus-line-faint, rgba(233,228,218,.16))" stroke-width="1" stroke-linecap="round"/>
<line x1="192.8" y1="505.3" x2="183.4" y2="498.3" stroke="var(--illus-line-faint, rgba(233,228,218,.16))" stroke-width="1" stroke-linecap="round"/>
<line x1="138.8" y1="536.5" x2="129.3" y2="529.5" stroke="var(--illus-line-faint, rgba(233,228,218,.16))" stroke-width="1" stroke-linecap="round"/>
<line x1="84.8" y1="567.7" x2="75.3" y2="560.7" stroke="var(--illus-line-faint, rgba(233,228,218,.16))" stroke-width="1" stroke-linecap="round"/>
<line x1="30.7" y1="598.9" x2="21.3" y2="591.9" stroke="var(--illus-line-faint, rgba(233,228,218,.16))" stroke-width="1" stroke-linecap="round"/>
<line x1="-23.3" y1="630.1" x2="-32.8" y2="623.1" stroke="var(--illus-line-faint, rgba(233,228,218,.16))" stroke-width="1" stroke-linecap="round"/>
<g id="spr-ticket-auth" class="spr-ticket">
<polygon points="244.9,407.8 245.3,409.6 246.4,411.1 248.2,412.5 280.6,431.2 283.0,432.3 285.8,433.0 288.8,433.2 291.7,433.0 294.5,432.3 296.9,431.2 296.9,431.2 327.3,413.7 325.7,412.4 324.8,411.0 324.8,409.4 325.7,407.9 327.3,406.7 329.4,405.8 332.0,405.3 334.7,405.3 337.2,405.8 339.4,406.7 339.4,406.7 369.8,389.1 371.6,387.7 372.8,386.2 373.2,384.4 373.2,393.0 372.8,394.7 371.6,396.3 369.8,397.7 339.4,415.3 339.4,415.3 337.2,414.3 334.7,413.9 332.0,413.9 329.4,414.3 327.3,415.3 325.7,416.5 324.8,418.0 324.8,419.5 325.7,421.0 327.3,422.3 296.9,439.8 296.9,439.8 294.5,440.9 291.7,441.5 288.8,441.8 285.8,441.5 283.0,440.9 280.6,439.8 248.2,421.1 246.4,419.7 245.3,418.1 244.9,416.4" fill="var(--illus-fill, #0a0c10)" stroke="var(--illus-line, #e9e4da)" stroke-width="1.5" stroke-linejoin="round"/>
<polygon points="321.2,361.0 323.6,360.0 326.3,359.3 329.3,359.1 332.3,359.3 335.0,360.0 337.4,361.0 369.8,379.8 371.6,381.1 372.8,382.7 373.2,384.4 372.8,386.2 371.6,387.7 369.8,389.1 339.4,406.7 339.4,406.7 337.2,405.8 334.7,405.3 332.0,405.3 329.4,405.8 327.3,406.7 325.7,407.9 324.8,409.4 324.8,411.0 325.7,412.4 327.3,413.7 296.9,431.2 296.9,431.2 294.5,432.3 291.7,433.0 288.8,433.2 285.8,433.0 283.0,432.3 280.6,431.2 248.2,412.5 246.4,411.1 245.3,409.6 244.9,407.8 245.3,406.1 246.4,404.5 248.2,403.2 278.6,385.6 290.8,378.6 292.4,379.8 293.2,381.3 293.2,382.9 292.4,384.4 290.8,385.6 288.6,386.5 286.0,387.0 283.4,387.0 280.8,386.5 278.6,385.6" fill="var(--illus-fill, #0a0c10)" stroke="var(--illus-line, #e9e4da)" stroke-width="1.5" stroke-linejoin="round"/>
<polygon points="323.2,367.7 324.8,367.0 326.6,366.5 328.6,366.4 330.6,366.5 332.4,367.0 334.0,367.7 358.3,381.7 359.5,382.6 360.3,383.7 360.6,384.8 360.3,386.0 359.5,387.0 358.3,388.0 330.6,403.9 330.6,403.9 329.2,403.3 327.5,403.0 325.7,403.0 324.0,403.3 322.5,403.9 321.5,404.8 320.9,405.8 320.9,406.8 321.5,407.8 322.5,408.6 294.8,424.6 294.8,424.6 293.2,425.3 291.4,425.8 289.4,425.9 287.5,425.8 285.6,425.3 284.0,424.6 259.7,410.6 258.5,409.7 257.7,408.6 257.5,407.5 257.7,406.3 258.5,405.2 259.7,404.3 287.4,388.3 295.5,383.7 296.6,384.5 297.1,385.5 297.1,386.5 296.6,387.5 295.5,388.3 294.1,388.9 292.4,389.3 290.6,389.3 288.9,388.9 287.4,388.3" fill="none" stroke="var(--illus-line, #e9e4da)" stroke-width="1" stroke-dasharray="4 5" opacity="0.8"/>
<ellipse cx="340.8" cy="377.8" rx="3.6" ry="2.2" fill="none" stroke="var(--illus-line, #e9e4da)" stroke-width="1.2"/>
<ellipse cx="277.3" cy="414.5" rx="3.6" ry="2.2" fill="none" stroke="var(--illus-line, #e9e4da)" stroke-width="1.2"/>
<text transform="matrix(0.8660 -0.5000 0.8660 0.5000 313.1 398.5)" font-family="var(--illus-font, ui-monospace, 'JetBrains Mono', 'SF Mono', Menlo, monospace)" font-size="18" font-weight="700" letter-spacing="2" fill="var(--illus-text, #e9e4da)" text-anchor="middle">AUTH</text>
</g>
<g id="spr-ticket-policy" class="spr-ticket">
<g class="spr-glow" filter="url(#spr-blur)"><polygon points="440.8,294.7 441.2,296.5 442.3,298.0 444.1,299.4 476.5,318.1 478.9,319.2 481.7,319.9 484.6,320.1 487.6,319.9 490.4,319.2 492.8,318.1 492.8,318.1 523.2,300.6 521.6,299.3 520.7,297.9 520.7,296.3 521.6,294.8 523.2,293.6 525.3,292.7 527.9,292.2 530.6,292.2 533.1,292.7 535.3,293.6 535.3,293.6 565.7,276.0 567.5,274.6 568.7,273.1 569.1,271.3 569.1,279.9 568.7,281.6 567.5,283.2 565.7,284.6 535.3,302.2 535.3,302.2 533.1,301.2 530.6,300.8 527.9,300.8 525.3,301.2 523.2,302.2 521.6,303.4 520.7,304.9 520.7,306.4 521.6,307.9 523.2,309.2 492.8,326.7 492.8,326.7 490.4,327.8 487.6,328.4 484.6,328.7 481.7,328.4 478.9,327.8 476.5,326.7 444.1,308.0 442.3,306.6 441.2,305.0 440.8,303.3" fill="none" stroke="var(--illus-accent, #ff4d00)" stroke-width="6"/><polygon points="517.1,247.9 519.4,246.9 522.2,246.2 525.2,246.0 528.1,246.2 530.9,246.9 533.3,247.9 565.7,266.7 567.5,268.0 568.7,269.6 569.1,271.3 568.7,273.1 567.5,274.6 565.7,276.0 535.3,293.6 535.3,293.6 533.1,292.7 530.6,292.2 527.9,292.2 525.3,292.7 523.2,293.6 521.6,294.8 520.7,296.3 520.7,297.9 521.6,299.3 523.2,300.6 492.8,318.1 492.8,318.1 490.4,319.2 487.6,319.9 484.6,320.1 481.7,319.9 478.9,319.2 476.5,318.1 444.1,299.4 442.3,298.0 441.2,296.5 440.8,294.7 441.2,293.0 442.3,291.4 444.1,290.1 474.5,272.5 486.7,265.5 488.3,266.7 489.1,268.2 489.1,269.8 488.3,271.3 486.7,272.5 484.5,273.4 481.9,273.9 479.3,273.9 476.7,273.4 474.5,272.5" fill="none" stroke="var(--illus-accent, #ff4d00)" stroke-width="6"/></g>
<polygon points="440.8,294.7 441.2,296.5 442.3,298.0 444.1,299.4 476.5,318.1 478.9,319.2 481.7,319.9 484.6,320.1 487.6,319.9 490.4,319.2 492.8,318.1 492.8,318.1 523.2,300.6 521.6,299.3 520.7,297.9 520.7,296.3 521.6,294.8 523.2,293.6 525.3,292.7 527.9,292.2 530.6,292.2 533.1,292.7 535.3,293.6 535.3,293.6 565.7,276.0 567.5,274.6 568.7,273.1 569.1,271.3 569.1,279.9 568.7,281.6 567.5,283.2 565.7,284.6 535.3,302.2 535.3,302.2 533.1,301.2 530.6,300.8 527.9,300.8 525.3,301.2 523.2,302.2 521.6,303.4 520.7,304.9 520.7,306.4 521.6,307.9 523.2,309.2 492.8,326.7 492.8,326.7 490.4,327.8 487.6,328.4 484.6,328.7 481.7,328.4 478.9,327.8 476.5,326.7 444.1,308.0 442.3,306.6 441.2,305.0 440.8,303.3" fill="var(--illus-fill, #0a0c10)" stroke="var(--illus-accent, #ff4d00)" stroke-width="2" stroke-linejoin="round"/>
<polygon points="517.1,247.9 519.4,246.9 522.2,246.2 525.2,246.0 528.1,246.2 530.9,246.9 533.3,247.9 565.7,266.7 567.5,268.0 568.7,269.6 569.1,271.3 568.7,273.1 567.5,274.6 565.7,276.0 535.3,293.6 535.3,293.6 533.1,292.7 530.6,292.2 527.9,292.2 525.3,292.7 523.2,293.6 521.6,294.8 520.7,296.3 520.7,297.9 521.6,299.3 523.2,300.6 492.8,318.1 492.8,318.1 490.4,319.2 487.6,319.9 484.6,320.1 481.7,319.9 478.9,319.2 476.5,318.1 444.1,299.4 442.3,298.0 441.2,296.5 440.8,294.7 441.2,293.0 442.3,291.4 444.1,290.1 474.5,272.5 486.7,265.5 488.3,266.7 489.1,268.2 489.1,269.8 488.3,271.3 486.7,272.5 484.5,273.4 481.9,273.9 479.3,273.9 476.7,273.4 474.5,272.5" fill="var(--illus-fill, #0a0c10)" stroke="var(--illus-accent, #ff4d00)" stroke-width="2" stroke-linejoin="round"/>
<polygon points="519.1,254.6 520.7,253.9 522.5,253.4 524.5,253.3 526.5,253.4 528.3,253.9 529.9,254.6 554.2,268.6 555.4,269.5 556.2,270.6 556.5,271.7 556.2,272.9 555.4,273.9 554.2,274.9 526.5,290.8 526.5,290.8 525.1,290.2 523.4,289.9 521.6,289.9 519.9,290.2 518.4,290.8 517.4,291.7 516.8,292.7 516.8,293.7 517.4,294.7 518.4,295.5 490.7,311.5 490.7,311.5 489.1,312.2 487.3,312.7 485.3,312.8 483.3,312.7 481.5,312.2 479.9,311.5 455.6,297.5 454.4,296.6 453.6,295.5 453.4,294.4 453.6,293.2 454.4,292.1 455.6,291.2 483.3,275.2 491.4,270.6 492.5,271.4 493.0,272.4 493.0,273.4 492.5,274.4 491.4,275.2 490.0,275.8 488.2,276.2 486.5,276.2 484.7,275.8 483.3,275.2" fill="none" stroke="var(--illus-accent, #ff4d00)" stroke-width="1" stroke-dasharray="4 5" opacity="0.8"/>
<ellipse cx="536.7" cy="264.7" rx="3.6" ry="2.2" fill="none" stroke="var(--illus-accent, #ff4d00)" stroke-width="1.2"/>
<ellipse cx="473.2" cy="301.4" rx="3.6" ry="2.2" fill="none" stroke="var(--illus-accent, #ff4d00)" stroke-width="1.2"/>
<text transform="matrix(0.8660 -0.5000 0.8660 0.5000 509.0 285.4)" font-family="var(--illus-font, ui-monospace, 'JetBrains Mono', 'SF Mono', Menlo, monospace)" font-size="18" font-weight="700" letter-spacing="2" fill="var(--illus-accent, #ff4d00)" text-anchor="middle">POLICY</text>
</g>
<g id="spr-ticket-log" class="spr-ticket">
<polygon points="650.2,173.8 650.6,175.6 651.7,177.1 653.5,178.5 685.9,197.2 688.3,198.3 691.1,199.0 694.1,199.2 697.0,199.0 699.8,198.3 702.2,197.2 702.2,197.2 732.6,179.7 731.0,178.4 730.1,177.0 730.1,175.4 731.0,173.9 732.6,172.7 734.7,171.8 737.3,171.3 740.0,171.3 742.5,171.8 744.7,172.7 744.7,172.7 775.1,155.1 776.9,153.7 778.1,152.2 778.5,150.4 778.5,159.0 778.1,160.7 776.9,162.3 775.1,163.7 744.7,181.2 744.7,181.2 742.5,180.3 740.0,179.9 737.3,179.9 734.7,180.3 732.6,181.2 731.0,182.5 730.1,184.0 730.1,185.5 731.0,187.0 732.6,188.3 702.2,205.8 702.2,205.8 699.8,206.9 697.0,207.5 694.1,207.8 691.1,207.5 688.3,206.9 685.9,205.8 653.5,187.1 651.7,185.7 650.6,184.1 650.2,182.4" fill="var(--illus-fill, #0a0c10)" stroke="var(--illus-line, #e9e4da)" stroke-width="1.5" stroke-linejoin="round"/>
<polygon points="726.5,127.0 728.9,126.0 731.6,125.3 734.6,125.1 737.5,125.3 740.3,126.0 742.7,127.0 775.1,145.8 776.9,147.1 778.1,148.7 778.5,150.4 778.1,152.2 776.9,153.7 775.1,155.1 744.7,172.7 744.7,172.7 742.5,171.8 740.0,171.3 737.3,171.3 734.7,171.8 732.6,172.7 731.0,173.9 730.1,175.4 730.1,177.0 731.0,178.4 732.6,179.7 702.2,197.2 702.2,197.2 699.8,198.3 697.0,199.0 694.1,199.2 691.1,199.0 688.3,198.3 685.9,197.2 653.5,178.5 651.7,177.1 650.6,175.6 650.2,173.8 650.6,172.1 651.7,170.5 653.5,169.2 683.9,151.6 696.1,144.6 697.7,145.8 698.5,147.3 698.5,148.9 697.7,150.4 696.1,151.6 693.9,152.5 691.3,153.0 688.7,153.0 686.1,152.5 683.9,151.6" fill="var(--illus-fill, #0a0c10)" stroke="var(--illus-line, #e9e4da)" stroke-width="1.5" stroke-linejoin="round"/>
<polygon points="728.5,133.7 730.1,133.0 731.9,132.5 733.9,132.4 735.9,132.5 737.7,133.0 739.3,133.7 763.6,147.7 764.8,148.6 765.6,149.7 765.9,150.8 765.6,152.0 764.8,153.0 763.6,154.0 735.9,169.9 735.9,169.9 734.5,169.3 732.8,169.0 731.0,169.0 729.3,169.3 727.8,169.9 726.8,170.8 726.2,171.8 726.2,172.8 726.8,173.8 727.8,174.6 700.1,190.6 700.1,190.6 698.5,191.3 696.7,191.8 694.7,191.9 692.8,191.8 690.9,191.3 689.3,190.6 665.0,176.6 663.8,175.7 663.0,174.6 662.8,173.5 663.0,172.3 663.8,171.2 665.0,170.3 692.7,154.3 700.8,149.7 701.9,150.5 702.4,151.5 702.4,152.5 701.9,153.5 700.8,154.3 699.4,154.9 697.7,155.3 695.9,155.3 694.2,154.9 692.7,154.3" fill="none" stroke="var(--illus-line, #e9e4da)" stroke-width="1" stroke-dasharray="4 5" opacity="0.8"/>
<ellipse cx="746.1" cy="143.8" rx="3.6" ry="2.2" fill="none" stroke="var(--illus-line, #e9e4da)" stroke-width="1.2"/>
<ellipse cx="682.6" cy="180.5" rx="3.6" ry="2.2" fill="none" stroke="var(--illus-line, #e9e4da)" stroke-width="1.2"/>
<text transform="matrix(0.8660 -0.5000 0.8660 0.5000 718.4 164.5)" font-family="var(--illus-font, ui-monospace, 'JetBrains Mono', 'SF Mono', Menlo, monospace)" font-size="18" font-weight="700" letter-spacing="2" fill="var(--illus-text, #e9e4da)" text-anchor="middle">LOG</text>
</g>
<line x1="340.1" y1="377.4" x2="467.1" y2="304.1" stroke="var(--illus-accent, #ff4d00)" stroke-width="1.4" stroke-linecap="round" stroke-dasharray="3 7" opacity="0.85"/>
<line x1="542.7" y1="260.4" x2="676.5" y2="183.2" stroke="var(--illus-line-dim, rgba(233,228,218,.38))" stroke-width="1.2" stroke-linecap="round" stroke-dasharray="3 7"/>
<polygon points="1543.8,220.6 1511.4,239.4 1511.4,231.6 1543.8,212.8" fill="var(--illus-fill, #0a0c10)" stroke="var(--illus-line-dim, rgba(233,228,218,.38))" stroke-width="1.1" stroke-linejoin="round"/>
<polygon points="1485.7,224.5 1511.4,239.4 1511.4,231.6 1485.7,216.7" fill="var(--illus-fill, #0a0c10)" stroke="var(--illus-line-dim, rgba(233,228,218,.38))" stroke-width="1.1" stroke-linejoin="round"/>
<polygon points="1518.2,198.0 1543.8,212.8 1511.4,231.6 1485.7,216.7" fill="var(--illus-fill, #0a0c10)" stroke="var(--illus-line-dim, rgba(233,228,218,.38))" stroke-width="1.1" stroke-linejoin="round"/>
<polygon points="1532.3,214.8 1514.8,224.9 1514.8,142.2 1532.3,132.1" fill="var(--illus-fill, #0a0c10)" stroke="var(--illus-line-dim, rgba(233,228,218,.38))" stroke-width="1.1" stroke-linejoin="round"/>
<polygon points="1497.2,214.8 1514.8,224.9 1514.8,142.2 1497.2,132.1" fill="var(--illus-fill, #0a0c10)" stroke="var(--illus-line-dim, rgba(233,228,218,.38))" stroke-width="1.1" stroke-linejoin="round"/>
<polygon points="1514.8,122.0 1532.3,132.1 1514.8,142.2 1497.2,132.1" fill="var(--illus-fill, #0a0c10)" stroke="var(--illus-line-dim, rgba(233,228,218,.38))" stroke-width="1.1" stroke-linejoin="round"/>
<polygon points="1637.1,274.5 1604.6,293.2 1604.6,285.4 1637.1,266.7" fill="var(--illus-fill, #0a0c10)" stroke="var(--illus-line-dim, rgba(233,228,218,.38))" stroke-width="1.1" stroke-linejoin="round"/>
<polygon points="1579.0,278.4 1604.6,293.2 1604.6,285.4 1579.0,270.6" fill="var(--illus-fill, #0a0c10)" stroke="var(--illus-line-dim, rgba(233,228,218,.38))" stroke-width="1.1" stroke-linejoin="round"/>
<polygon points="1611.4,251.8 1637.1,266.7 1604.6,285.4 1579.0,270.6" fill="var(--illus-fill, #0a0c10)" stroke="var(--illus-line-dim, rgba(233,228,218,.38))" stroke-width="1.1" stroke-linejoin="round"/>
<polygon points="1625.6,268.6 1608.0,278.8 1608.0,196.1 1625.6,185.9" fill="var(--illus-fill, #0a0c10)" stroke="var(--illus-line-dim, rgba(233,228,218,.38))" stroke-width="1.1" stroke-linejoin="round"/>
<polygon points="1590.4,268.6 1608.0,278.8 1608.0,196.1 1590.4,185.9" fill="var(--illus-fill, #0a0c10)" stroke="var(--illus-line-dim, rgba(233,228,218,.38))" stroke-width="1.1" stroke-linejoin="round"/>
<polygon points="1608.0,175.8 1625.6,185.9 1608.0,196.1 1590.4,185.9" fill="var(--illus-fill, #0a0c10)" stroke="var(--illus-line-dim, rgba(233,228,218,.38))" stroke-width="1.1" stroke-linejoin="round"/>
<polygon points="1629.6,186.7 1609.4,198.4 1609.4,189.0 1629.6,177.3" fill="var(--illus-fill, #0a0c10)" stroke="var(--illus-line-dim, rgba(233,228,218,.38))" stroke-width="1.1" stroke-linejoin="round"/>
<polygon points="1493.2,131.3 1609.4,198.4 1609.4,189.0 1493.2,122.0" fill="var(--illus-fill, #0a0c10)" stroke="var(--illus-line-dim, rgba(233,228,218,.38))" stroke-width="1.1" stroke-linejoin="round"/>
<polygon points="1513.4,110.3 1629.6,177.3 1609.4,189.0 1493.2,122.0" fill="var(--illus-fill, #0a0c10)" stroke="var(--illus-line-dim, rgba(233,228,218,.38))" stroke-width="1.1" stroke-linejoin="round"/>
<line x1="1512.1" y1="220.2" x2="1593.1" y2="189.0" stroke="var(--illus-line-faint, rgba(233,228,218,.16))" stroke-width="1" stroke-linecap="round"/>
<line x1="1512.1" y1="142.2" x2="1593.1" y2="267.0" stroke="var(--illus-line-faint, rgba(233,228,218,.16))" stroke-width="1" stroke-linecap="round"/>
<polygon points="1381.7,314.2 1349.3,333.0 1349.3,325.2 1381.7,306.4" fill="var(--illus-fill, #0a0c10)" stroke="var(--illus-line-dim, rgba(233,228,218,.38))" stroke-width="1.1" stroke-linejoin="round"/>
<polygon points="1323.6,318.1 1349.3,333.0 1349.3,325.2 1323.6,310.3" fill="var(--illus-fill, #0a0c10)" stroke="var(--illus-line-dim, rgba(233,228,218,.38))" stroke-width="1.1" stroke-linejoin="round"/>
<polygon points="1356.0,291.6 1381.7,306.4 1349.3,325.2 1323.6,310.3" fill="var(--illus-fill, #0a0c10)" stroke="var(--illus-line-dim, rgba(233,228,218,.38))" stroke-width="1.1" stroke-linejoin="round"/>
<polygon points="1370.2,308.4 1352.7,318.5 1352.7,235.8 1370.2,225.7" fill="var(--illus-fill, #0a0c10)" stroke="var(--illus-line-dim, rgba(233,228,218,.38))" stroke-width="1.1" stroke-linejoin="round"/>
<polygon points="1335.1,308.4 1352.7,318.5 1352.7,235.8 1335.1,225.7" fill="var(--illus-fill, #0a0c10)" stroke="var(--illus-line-dim, rgba(233,228,218,.38))" stroke-width="1.1" stroke-linejoin="round"/>
<polygon points="1352.7,215.6 1370.2,225.7 1352.7,235.8 1335.1,225.7" fill="var(--illus-fill, #0a0c10)" stroke="var(--illus-line-dim, rgba(233,228,218,.38))" stroke-width="1.1" stroke-linejoin="round"/>
<polygon points="1474.9,368.1 1442.5,386.8 1442.5,379.0 1474.9,360.3" fill="var(--illus-fill, #0a0c10)" stroke="var(--illus-line-dim, rgba(233,228,218,.38))" stroke-width="1.1" stroke-linejoin="round"/>
<polygon points="1416.8,372.0 1442.5,386.8 1442.5,379.0 1416.8,364.2" fill="var(--illus-fill, #0a0c10)" stroke="var(--illus-line-dim, rgba(233,228,218,.38))" stroke-width="1.1" stroke-linejoin="round"/>
<polygon points="1449.3,345.4 1474.9,360.3 1442.5,379.0 1416.8,364.2" fill="var(--illus-fill, #0a0c10)" stroke="var(--illus-line-dim, rgba(233,228,218,.38))" stroke-width="1.1" stroke-linejoin="round"/>
<polygon points="1463.4,362.2 1445.9,372.3 1445.9,289.7 1463.4,279.5" fill="var(--illus-fill, #0a0c10)" stroke="var(--illus-line-dim, rgba(233,228,218,.38))" stroke-width="1.1" stroke-linejoin="round"/>
<polygon points="1428.3,362.2 1445.9,372.3 1445.9,289.7 1428.3,279.5" fill="var(--illus-fill, #0a0c10)" stroke="var(--illus-line-dim, rgba(233,228,218,.38))" stroke-width="1.1" stroke-linejoin="round"/>
<polygon points="1445.9,269.4 1463.4,279.5 1445.9,289.7 1428.3,279.5" fill="var(--illus-fill, #0a0c10)" stroke="var(--illus-line-dim, rgba(233,228,218,.38))" stroke-width="1.1" stroke-linejoin="round"/>
<polygon points="1467.5,280.3 1447.2,292.0 1447.2,282.6 1467.5,270.9" fill="var(--illus-fill, #0a0c10)" stroke="var(--illus-line-dim, rgba(233,228,218,.38))" stroke-width="1.1" stroke-linejoin="round"/>
<polygon points="1331.0,224.9 1447.2,292.0 1447.2,282.6 1331.0,215.6" fill="var(--illus-fill, #0a0c10)" stroke="var(--illus-line-dim, rgba(233,228,218,.38))" stroke-width="1.1" stroke-linejoin="round"/>
<polygon points="1351.3,203.9 1467.5,270.9 1447.2,282.6 1331.0,215.6" fill="var(--illus-fill, #0a0c10)" stroke="var(--illus-line-dim, rgba(233,228,218,.38))" stroke-width="1.1" stroke-linejoin="round"/>
<line x1="1350.0" y1="313.8" x2="1431.0" y2="282.6" stroke="var(--illus-line-faint, rgba(233,228,218,.16))" stroke-width="1" stroke-linecap="round"/>
<line x1="1350.0" y1="235.8" x2="1431.0" y2="360.6" stroke="var(--illus-line-faint, rgba(233,228,218,.16))" stroke-width="1" stroke-linecap="round"/>
<polygon points="1219.6,407.8 1187.2,426.6 1187.2,418.8 1219.6,400.0" fill="var(--illus-fill, #0a0c10)" stroke="var(--illus-line-dim, rgba(233,228,218,.38))" stroke-width="1.1" stroke-linejoin="round"/>
<polygon points="1161.5,411.7 1187.2,426.6 1187.2,418.8 1161.5,403.9" fill="var(--illus-fill, #0a0c10)" stroke="var(--illus-line-dim, rgba(233,228,218,.38))" stroke-width="1.1" stroke-linejoin="round"/>
<polygon points="1193.9,385.2 1219.6,400.0 1187.2,418.8 1161.5,403.9" fill="var(--illus-fill, #0a0c10)" stroke="var(--illus-line-dim, rgba(233,228,218,.38))" stroke-width="1.1" stroke-linejoin="round"/>
<polygon points="1208.1,402.0 1190.5,412.1 1190.5,329.4 1208.1,319.3" fill="var(--illus-fill, #0a0c10)" stroke="var(--illus-line-dim, rgba(233,228,218,.38))" stroke-width="1.1" stroke-linejoin="round"/>
<polygon points="1173.0,402.0 1190.5,412.1 1190.5,329.4 1173.0,319.3" fill="var(--illus-fill, #0a0c10)" stroke="var(--illus-line-dim, rgba(233,228,218,.38))" stroke-width="1.1" stroke-linejoin="round"/>
<polygon points="1190.5,309.2 1208.1,319.3 1190.5,329.4 1173.0,319.3" fill="var(--illus-fill, #0a0c10)" stroke="var(--illus-line-dim, rgba(233,228,218,.38))" stroke-width="1.1" stroke-linejoin="round"/>
<polygon points="1312.8,461.7 1280.4,480.4 1280.4,472.6 1312.8,453.9" fill="var(--illus-fill, #0a0c10)" stroke="var(--illus-line-dim, rgba(233,228,218,.38))" stroke-width="1.1" stroke-linejoin="round"/>
<polygon points="1254.7,465.6 1280.4,480.4 1280.4,472.6 1254.7,457.8" fill="var(--illus-fill, #0a0c10)" stroke="var(--illus-line-dim, rgba(233,228,218,.38))" stroke-width="1.1" stroke-linejoin="round"/>
<polygon points="1287.1,439.0 1312.8,453.9 1280.4,472.6 1254.7,457.8" fill="var(--illus-fill, #0a0c10)" stroke="var(--illus-line-dim, rgba(233,228,218,.38))" stroke-width="1.1" stroke-linejoin="round"/>
<polygon points="1301.3,455.8 1283.8,465.9 1283.8,383.3 1301.3,373.1" fill="var(--illus-fill, #0a0c10)" stroke="var(--illus-line-dim, rgba(233,228,218,.38))" stroke-width="1.1" stroke-linejoin="round"/>
<polygon points="1266.2,455.8 1283.8,465.9 1283.8,383.3 1266.2,373.1" fill="var(--illus-fill, #0a0c10)" stroke="var(--illus-line-dim, rgba(233,228,218,.38))" stroke-width="1.1" stroke-linejoin="round"/>
<polygon points="1283.8,363.0 1301.3,373.1 1283.8,383.3 1266.2,373.1" fill="var(--illus-fill, #0a0c10)" stroke="var(--illus-line-dim, rgba(233,228,218,.38))" stroke-width="1.1" stroke-linejoin="round"/>
<polygon points="1305.4,373.9 1285.1,385.6 1285.1,376.2 1305.4,364.5" fill="var(--illus-fill, #0a0c10)" stroke="var(--illus-line-dim, rgba(233,228,218,.38))" stroke-width="1.1" stroke-linejoin="round"/>
<polygon points="1168.9,318.5 1285.1,385.6 1285.1,376.2 1168.9,309.2" fill="var(--illus-fill, #0a0c10)" stroke="var(--illus-line-dim, rgba(233,228,218,.38))" stroke-width="1.1" stroke-linejoin="round"/>
<polygon points="1189.2,297.5 1305.4,364.5 1285.1,376.2 1168.9,309.2" fill="var(--illus-fill, #0a0c10)" stroke="var(--illus-line-dim, rgba(233,228,218,.38))" stroke-width="1.1" stroke-linejoin="round"/>
<line x1="1187.8" y1="407.4" x2="1268.9" y2="376.2" stroke="var(--illus-line-faint, rgba(233,228,218,.16))" stroke-width="1" stroke-linecap="round"/>
<line x1="1187.8" y1="329.4" x2="1268.9" y2="454.2" stroke="var(--illus-line-faint, rgba(233,228,218,.16))" stroke-width="1" stroke-linecap="round"/>
<polygon points="1057.5,501.4 1025.0,520.2 1025.0,512.4 1057.5,493.6" fill="var(--illus-fill, #0a0c10)" stroke="var(--illus-line-dim, rgba(233,228,218,.38))" stroke-width="1.1" stroke-linejoin="round"/>
<polygon points="999.4,505.3 1025.0,520.2 1025.0,512.4 999.4,497.5" fill="var(--illus-fill, #0a0c10)" stroke="var(--illus-line-dim, rgba(233,228,218,.38))" stroke-width="1.1" stroke-linejoin="round"/>
<polygon points="1031.8,478.8 1057.5,493.6 1025.0,512.4 999.4,497.5" fill="var(--illus-fill, #0a0c10)" stroke="var(--illus-line-dim, rgba(233,228,218,.38))" stroke-width="1.1" stroke-linejoin="round"/>
<polygon points="1046.0,495.6 1028.4,505.7 1028.4,423.0 1046.0,412.9" fill="var(--illus-fill, #0a0c10)" stroke="var(--illus-line-dim, rgba(233,228,218,.38))" stroke-width="1.1" stroke-linejoin="round"/>
<polygon points="1010.9,495.6 1028.4,505.7 1028.4,423.0 1010.9,412.9" fill="var(--illus-fill, #0a0c10)" stroke="var(--illus-line-dim, rgba(233,228,218,.38))" stroke-width="1.1" stroke-linejoin="round"/>
<polygon points="1028.4,402.8 1046.0,412.9 1028.4,423.0 1010.9,412.9" fill="var(--illus-fill, #0a0c10)" stroke="var(--illus-line-dim, rgba(233,228,218,.38))" stroke-width="1.1" stroke-linejoin="round"/>
<polygon points="1150.7,555.3 1118.3,574.0 1118.3,566.2 1150.7,547.5" fill="var(--illus-fill, #0a0c10)" stroke="var(--illus-line-dim, rgba(233,228,218,.38))" stroke-width="1.1" stroke-linejoin="round"/>
<polygon points="1092.6,559.2 1118.3,574.0 1118.3,566.2 1092.6,551.4" fill="var(--illus-fill, #0a0c10)" stroke="var(--illus-line-dim, rgba(233,228,218,.38))" stroke-width="1.1" stroke-linejoin="round"/>
<polygon points="1125.0,532.6 1150.7,547.5 1118.3,566.2 1092.6,551.4" fill="var(--illus-fill, #0a0c10)" stroke="var(--illus-line-dim, rgba(233,228,218,.38))" stroke-width="1.1" stroke-linejoin="round"/>
<polygon points="1139.2,549.4 1121.6,559.6 1121.6,476.9 1139.2,466.7" fill="var(--illus-fill, #0a0c10)" stroke="var(--illus-line-dim, rgba(233,228,218,.38))" stroke-width="1.1" stroke-linejoin="round"/>
<polygon points="1104.1,549.4 1121.6,559.6 1121.6,476.9 1104.1,466.7" fill="var(--illus-fill, #0a0c10)" stroke="var(--illus-line-dim, rgba(233,228,218,.38))" stroke-width="1.1" stroke-linejoin="round"/>
<polygon points="1121.6,456.6 1139.2,466.7 1121.6,476.9 1104.1,466.7" fill="var(--illus-fill, #0a0c10)" stroke="var(--illus-line-dim, rgba(233,228,218,.38))" stroke-width="1.1" stroke-linejoin="round"/>
<polygon points="1143.3,467.5 1123.0,479.2 1123.0,469.9 1143.3,458.1" fill="var(--illus-fill, #0a0c10)" stroke="var(--illus-line-dim, rgba(233,228,218,.38))" stroke-width="1.1" stroke-linejoin="round"/>
<polygon points="1006.8,412.1 1123.0,479.2 1123.0,469.9 1006.8,402.8" fill="var(--illus-fill, #0a0c10)" stroke="var(--illus-line-dim, rgba(233,228,218,.38))" stroke-width="1.1" stroke-linejoin="round"/>
<polygon points="1027.1,391.1 1143.3,458.1 1123.0,469.9 1006.8,402.8" fill="var(--illus-fill, #0a0c10)" stroke="var(--illus-line-dim, rgba(233,228,218,.38))" stroke-width="1.1" stroke-linejoin="round"/>
<line x1="1025.7" y1="501.1" x2="1106.8" y2="469.8" stroke="var(--illus-line-faint, rgba(233,228,218,.16))" stroke-width="1" stroke-linecap="round"/>
<line x1="1025.7" y1="423.1" x2="1106.8" y2="547.9" stroke="var(--illus-line-faint, rgba(233,228,218,.16))" stroke-width="1" stroke-linecap="round"/>
<polygon points="895.4,595.0 862.9,613.8 862.9,606.0 895.4,587.2" fill="var(--illus-fill, #0a0c10)" stroke="var(--illus-line-dim, rgba(233,228,218,.38))" stroke-width="1.1" stroke-linejoin="round"/>
<polygon points="837.3,598.9 862.9,613.8 862.9,606.0 837.3,591.1" fill="var(--illus-fill, #0a0c10)" stroke="var(--illus-line-dim, rgba(233,228,218,.38))" stroke-width="1.1" stroke-linejoin="round"/>
<polygon points="869.7,572.4 895.4,587.2 862.9,606.0 837.3,591.1" fill="var(--illus-fill, #0a0c10)" stroke="var(--illus-line-dim, rgba(233,228,218,.38))" stroke-width="1.1" stroke-linejoin="round"/>
<polygon points="883.9,589.2 866.3,599.3 866.3,516.6 883.9,506.5" fill="var(--illus-fill, #0a0c10)" stroke="var(--illus-line-dim, rgba(233,228,218,.38))" stroke-width="1.1" stroke-linejoin="round"/>
<polygon points="848.7,589.2 866.3,599.3 866.3,516.6 848.7,506.5" fill="var(--illus-fill, #0a0c10)" stroke="var(--illus-line-dim, rgba(233,228,218,.38))" stroke-width="1.1" stroke-linejoin="round"/>
<polygon points="866.3,496.4 883.9,506.5 866.3,516.6 848.7,506.5" fill="var(--illus-fill, #0a0c10)" stroke="var(--illus-line-dim, rgba(233,228,218,.38))" stroke-width="1.1" stroke-linejoin="round"/>
<polygon points="988.6,648.9 956.1,667.6 956.1,659.8 988.6,641.1" fill="var(--illus-fill, #0a0c10)" stroke="var(--illus-line-dim, rgba(233,228,218,.38))" stroke-width="1.1" stroke-linejoin="round"/>
<polygon points="930.5,652.8 956.1,667.6 956.1,659.8 930.5,645.0" fill="var(--illus-fill, #0a0c10)" stroke="var(--illus-line-dim, rgba(233,228,218,.38))" stroke-width="1.1" stroke-linejoin="round"/>
<polygon points="962.9,626.2 988.6,641.1 956.1,659.8 930.5,645.0" fill="var(--illus-fill, #0a0c10)" stroke="var(--illus-line-dim, rgba(233,228,218,.38))" stroke-width="1.1" stroke-linejoin="round"/>
<polygon points="977.1,643.0 959.5,653.2 959.5,570.5 977.1,560.3" fill="var(--illus-fill, #0a0c10)" stroke="var(--illus-line-dim, rgba(233,228,218,.38))" stroke-width="1.1" stroke-linejoin="round"/>
<polygon points="942.0,643.0 959.5,653.2 959.5,570.5 942.0,560.3" fill="var(--illus-fill, #0a0c10)" stroke="var(--illus-line-dim, rgba(233,228,218,.38))" stroke-width="1.1" stroke-linejoin="round"/>
<polygon points="959.5,550.2 977.1,560.3 959.5,570.5 942.0,560.3" fill="var(--illus-fill, #0a0c10)" stroke="var(--illus-line-dim, rgba(233,228,218,.38))" stroke-width="1.1" stroke-linejoin="round"/>
<polygon points="981.1,561.1 960.9,572.8 960.9,563.4 981.1,551.8" fill="var(--illus-fill, #0a0c10)" stroke="var(--illus-line-dim, rgba(233,228,218,.38))" stroke-width="1.1" stroke-linejoin="round"/>
<polygon points="844.7,505.7 960.9,572.8 960.9,563.4 844.7,496.4" fill="var(--illus-fill, #0a0c10)" stroke="var(--illus-line-dim, rgba(233,228,218,.38))" stroke-width="1.1" stroke-linejoin="round"/>
<polygon points="865.0,484.7 981.1,551.8 960.9,563.4 844.7,496.4" fill="var(--illus-fill, #0a0c10)" stroke="var(--illus-line-dim, rgba(233,228,218,.38))" stroke-width="1.1" stroke-linejoin="round"/>
<line x1="863.6" y1="594.7" x2="944.7" y2="563.5" stroke="var(--illus-line-faint, rgba(233,228,218,.16))" stroke-width="1" stroke-linecap="round"/>
<line x1="863.6" y1="516.7" x2="944.7" y2="641.5" stroke="var(--illus-line-faint, rgba(233,228,218,.16))" stroke-width="1" stroke-linecap="round"/>
<polygon points="733.2,688.6 700.8,707.4 700.8,699.6 733.2,680.8" fill="var(--illus-fill, #0a0c10)" stroke="var(--illus-line-dim, rgba(233,228,218,.38))" stroke-width="1.1" stroke-linejoin="round"/>
<polygon points="675.1,692.5 700.8,707.4 700.8,699.6 675.1,684.7" fill="var(--illus-fill, #0a0c10)" stroke="var(--illus-line-dim, rgba(233,228,218,.38))" stroke-width="1.1" stroke-linejoin="round"/>
<polygon points="707.6,666.0 733.2,680.8 700.8,699.6 675.1,684.7" fill="var(--illus-fill, #0a0c10)" stroke="var(--illus-line-dim, rgba(233,228,218,.38))" stroke-width="1.1" stroke-linejoin="round"/>
<polygon points="721.7,682.8 704.2,692.9 704.2,610.2 721.7,600.1" fill="var(--illus-fill, #0a0c10)" stroke="var(--illus-line-dim, rgba(233,228,218,.38))" stroke-width="1.1" stroke-linejoin="round"/>
<polygon points="686.6,682.8 704.2,692.9 704.2,610.2 686.6,600.1" fill="var(--illus-fill, #0a0c10)" stroke="var(--illus-line-dim, rgba(233,228,218,.38))" stroke-width="1.1" stroke-linejoin="round"/>
<polygon points="704.2,590.0 721.7,600.1 704.2,610.2 686.6,600.1" fill="var(--illus-fill, #0a0c10)" stroke="var(--illus-line-dim, rgba(233,228,218,.38))" stroke-width="1.1" stroke-linejoin="round"/>
<polygon points="826.5,742.5 794.0,761.2 794.0,753.4 826.5,734.7" fill="var(--illus-fill, #0a0c10)" stroke="var(--illus-line-dim, rgba(233,228,218,.38))" stroke-width="1.1" stroke-linejoin="round"/>
<polygon points="768.4,746.4 794.0,761.2 794.0,753.4 768.4,738.6" fill="var(--illus-fill, #0a0c10)" stroke="var(--illus-line-dim, rgba(233,228,218,.38))" stroke-width="1.1" stroke-linejoin="round"/>
<polygon points="800.8,719.8 826.5,734.7 794.0,753.4 768.4,738.6" fill="var(--illus-fill, #0a0c10)" stroke="var(--illus-line-dim, rgba(233,228,218,.38))" stroke-width="1.1" stroke-linejoin="round"/>
<polygon points="815.0,736.6 797.4,746.8 797.4,664.1 815.0,653.9" fill="var(--illus-fill, #0a0c10)" stroke="var(--illus-line-dim, rgba(233,228,218,.38))" stroke-width="1.1" stroke-linejoin="round"/>
<polygon points="779.8,736.6 797.4,746.8 797.4,664.1 779.8,653.9" fill="var(--illus-fill, #0a0c10)" stroke="var(--illus-line-dim, rgba(233,228,218,.38))" stroke-width="1.1" stroke-linejoin="round"/>
<polygon points="797.4,643.8 815.0,653.9 797.4,664.1 779.8,653.9" fill="var(--illus-fill, #0a0c10)" stroke="var(--illus-line-dim, rgba(233,228,218,.38))" stroke-width="1.1" stroke-linejoin="round"/>
<polygon points="819.0,654.7 798.8,666.4 798.8,657.0 819.0,645.4" fill="var(--illus-fill, #0a0c10)" stroke="var(--illus-line-dim, rgba(233,228,218,.38))" stroke-width="1.1" stroke-linejoin="round"/>
<polygon points="682.6,599.3 798.8,666.4 798.8,657.0 682.6,590.0" fill="var(--illus-fill, #0a0c10)" stroke="var(--illus-line-dim, rgba(233,228,218,.38))" stroke-width="1.1" stroke-linejoin="round"/>
<polygon points="702.8,578.3 819.0,645.4 798.8,657.0 682.6,590.0" fill="var(--illus-fill, #0a0c10)" stroke="var(--illus-line-dim, rgba(233,228,218,.38))" stroke-width="1.1" stroke-linejoin="round"/>
<line x1="701.5" y1="688.2" x2="782.5" y2="657.1" stroke="var(--illus-line-faint, rgba(233,228,218,.16))" stroke-width="1" stroke-linecap="round"/>
<line x1="701.5" y1="610.2" x2="782.5" y2="735.1" stroke="var(--illus-line-faint, rgba(233,228,218,.16))" stroke-width="1" stroke-linecap="round"/>
<polygon points="571.1,782.2 538.7,801.0 538.7,793.2 571.1,774.4" fill="var(--illus-fill, #0a0c10)" stroke="var(--illus-line-dim, rgba(233,228,218,.38))" stroke-width="1.1" stroke-linejoin="round"/>
<polygon points="513.0,786.1 538.7,801.0 538.7,793.2 513.0,778.3" fill="var(--illus-fill, #0a0c10)" stroke="var(--illus-line-dim, rgba(233,228,218,.38))" stroke-width="1.1" stroke-linejoin="round"/>
<polygon points="545.4,759.6 571.1,774.4 538.7,793.2 513.0,778.3" fill="var(--illus-fill, #0a0c10)" stroke="var(--illus-line-dim, rgba(233,228,218,.38))" stroke-width="1.1" stroke-linejoin="round"/>
<polygon points="559.6,776.4 542.1,786.5 542.1,703.9 559.6,693.7" fill="var(--illus-fill, #0a0c10)" stroke="var(--illus-line-dim, rgba(233,228,218,.38))" stroke-width="1.1" stroke-linejoin="round"/>
<polygon points="524.5,776.4 542.1,786.5 542.1,703.9 524.5,693.7" fill="var(--illus-fill, #0a0c10)" stroke="var(--illus-line-dim, rgba(233,228,218,.38))" stroke-width="1.1" stroke-linejoin="round"/>
<polygon points="542.1,683.6 559.6,693.7 542.1,703.9 524.5,693.7" fill="var(--illus-fill, #0a0c10)" stroke="var(--illus-line-dim, rgba(233,228,218,.38))" stroke-width="1.1" stroke-linejoin="round"/>
<polygon points="664.3,836.1 631.9,854.8 631.9,847.0 664.3,828.3" fill="var(--illus-fill, #0a0c10)" stroke="var(--illus-line-dim, rgba(233,228,218,.38))" stroke-width="1.1" stroke-linejoin="round"/>
<polygon points="606.2,840.0 631.9,854.8 631.9,847.0 606.2,832.2" fill="var(--illus-fill, #0a0c10)" stroke="var(--illus-line-dim, rgba(233,228,218,.38))" stroke-width="1.1" stroke-linejoin="round"/>
<polygon points="638.7,813.4 664.3,828.3 631.9,847.0 606.2,832.2" fill="var(--illus-fill, #0a0c10)" stroke="var(--illus-line-dim, rgba(233,228,218,.38))" stroke-width="1.1" stroke-linejoin="round"/>
<polygon points="652.8,830.2 635.3,840.4 635.3,757.7 652.8,747.5" fill="var(--illus-fill, #0a0c10)" stroke="var(--illus-line-dim, rgba(233,228,218,.38))" stroke-width="1.1" stroke-linejoin="round"/>
<polygon points="617.7,830.2 635.3,840.4 635.3,757.7 617.7,747.5" fill="var(--illus-fill, #0a0c10)" stroke="var(--illus-line-dim, rgba(233,228,218,.38))" stroke-width="1.1" stroke-linejoin="round"/>
<polygon points="635.3,737.4 652.8,747.5 635.3,757.7 617.7,747.5" fill="var(--illus-fill, #0a0c10)" stroke="var(--illus-line-dim, rgba(233,228,218,.38))" stroke-width="1.1" stroke-linejoin="round"/>
<polygon points="656.9,748.3 636.6,760.0 636.6,750.6 656.9,738.9" fill="var(--illus-fill, #0a0c10)" stroke="var(--illus-line-dim, rgba(233,228,218,.38))" stroke-width="1.1" stroke-linejoin="round"/>
<polygon points="520.4,692.9 636.6,760.0 636.6,750.6 520.4,683.6" fill="var(--illus-fill, #0a0c10)" stroke="var(--illus-line-dim, rgba(233,228,218,.38))" stroke-width="1.1" stroke-linejoin="round"/>
<polygon points="540.7,671.9 656.9,738.9 636.6,750.6 520.4,683.6" fill="var(--illus-fill, #0a0c10)" stroke="var(--illus-line-dim, rgba(233,228,218,.38))" stroke-width="1.1" stroke-linejoin="round"/>
<line x1="539.4" y1="781.9" x2="620.4" y2="750.7" stroke="var(--illus-line-faint, rgba(233,228,218,.16))" stroke-width="1" stroke-linecap="round"/>
<line x1="539.4" y1="703.9" x2="620.4" y2="828.7" stroke="var(--illus-line-faint, rgba(233,228,218,.16))" stroke-width="1" stroke-linecap="round"/>
<polygon points="409.0,875.8 376.6,894.6 376.6,886.8 409.0,868.0" fill="var(--illus-fill, #0a0c10)" stroke="var(--illus-line-dim, rgba(233,228,218,.38))" stroke-width="1.1" stroke-linejoin="round"/>
<polygon points="350.9,879.7 376.6,894.6 376.6,886.8 350.9,871.9" fill="var(--illus-fill, #0a0c10)" stroke="var(--illus-line-dim, rgba(233,228,218,.38))" stroke-width="1.1" stroke-linejoin="round"/>
<polygon points="383.3,853.2 409.0,868.0 376.6,886.8 350.9,871.9" fill="var(--illus-fill, #0a0c10)" stroke="var(--illus-line-dim, rgba(233,228,218,.38))" stroke-width="1.1" stroke-linejoin="round"/>
<polygon points="397.5,870.0 379.9,880.1 379.9,797.5 397.5,787.3" fill="var(--illus-fill, #0a0c10)" stroke="var(--illus-line-dim, rgba(233,228,218,.38))" stroke-width="1.1" stroke-linejoin="round"/>
<polygon points="362.4,870.0 379.9,880.1 379.9,797.5 362.4,787.3" fill="var(--illus-fill, #0a0c10)" stroke="var(--illus-line-dim, rgba(233,228,218,.38))" stroke-width="1.1" stroke-linejoin="round"/>
<polygon points="379.9,777.2 397.5,787.3 379.9,797.5 362.4,787.3" fill="var(--illus-fill, #0a0c10)" stroke="var(--illus-line-dim, rgba(233,228,218,.38))" stroke-width="1.1" stroke-linejoin="round"/>
<polygon points="502.2,929.7 469.8,948.4 469.8,940.6 502.2,921.9" fill="var(--illus-fill, #0a0c10)" stroke="var(--illus-line-dim, rgba(233,228,218,.38))" stroke-width="1.1" stroke-linejoin="round"/>
<polygon points="444.1,933.6 469.8,948.4 469.8,940.6 444.1,925.8" fill="var(--illus-fill, #0a0c10)" stroke="var(--illus-line-dim, rgba(233,228,218,.38))" stroke-width="1.1" stroke-linejoin="round"/>
<polygon points="476.5,907.0 502.2,921.9 469.8,940.6 444.1,925.8" fill="var(--illus-fill, #0a0c10)" stroke="var(--illus-line-dim, rgba(233,228,218,.38))" stroke-width="1.1" stroke-linejoin="round"/>
<polygon points="490.7,923.8 473.2,934.0 473.2,851.3 490.7,841.1" fill="var(--illus-fill, #0a0c10)" stroke="var(--illus-line-dim, rgba(233,228,218,.38))" stroke-width="1.1" stroke-linejoin="round"/>
<polygon points="455.6,923.8 473.2,934.0 473.2,851.3 455.6,841.1" fill="var(--illus-fill, #0a0c10)" stroke="var(--illus-line-dim, rgba(233,228,218,.38))" stroke-width="1.1" stroke-linejoin="round"/>
<polygon points="473.2,831.0 490.7,841.1 473.2,851.3 455.6,841.1" fill="var(--illus-fill, #0a0c10)" stroke="var(--illus-line-dim, rgba(233,228,218,.38))" stroke-width="1.1" stroke-linejoin="round"/>
<polygon points="494.8,841.9 474.5,853.6 474.5,844.2 494.8,832.5" fill="var(--illus-fill, #0a0c10)" stroke="var(--illus-line-dim, rgba(233,228,218,.38))" stroke-width="1.1" stroke-linejoin="round"/>
<polygon points="358.3,786.5 474.5,853.6 474.5,844.2 358.3,777.2" fill="var(--illus-fill, #0a0c10)" stroke="var(--illus-line-dim, rgba(233,228,218,.38))" stroke-width="1.1" stroke-linejoin="round"/>
<polygon points="378.6,765.5 494.8,832.5 474.5,844.2 358.3,777.2" fill="var(--illus-fill, #0a0c10)" stroke="var(--illus-line-dim, rgba(233,228,218,.38))" stroke-width="1.1" stroke-linejoin="round"/>
<line x1="377.2" y1="875.5" x2="458.3" y2="844.3" stroke="var(--illus-line-faint, rgba(233,228,218,.16))" stroke-width="1" stroke-linecap="round"/>
<line x1="377.2" y1="797.5" x2="458.3" y2="922.3" stroke="var(--illus-line-faint, rgba(233,228,218,.16))" stroke-width="1" stroke-linecap="round"/>
<polygon points="246.9,969.4 214.4,988.2 214.4,980.4 246.9,961.6" fill="var(--illus-fill, #0a0c10)" stroke="var(--illus-line-dim, rgba(233,228,218,.38))" stroke-width="1.1" stroke-linejoin="round"/>
<polygon points="188.8,973.3 214.4,988.2 214.4,980.4 188.8,965.5" fill="var(--illus-fill, #0a0c10)" stroke="var(--illus-line-dim, rgba(233,228,218,.38))" stroke-width="1.1" stroke-linejoin="round"/>
<polygon points="221.2,946.8 246.9,961.6 214.4,980.4 188.8,965.5" fill="var(--illus-fill, #0a0c10)" stroke="var(--illus-line-dim, rgba(233,228,218,.38))" stroke-width="1.1" stroke-linejoin="round"/>
<polygon points="235.4,963.6 217.8,973.7 217.8,891.0 235.4,880.9" fill="var(--illus-fill, #0a0c10)" stroke="var(--illus-line-dim, rgba(233,228,218,.38))" stroke-width="1.1" stroke-linejoin="round"/>
<polygon points="200.3,963.6 217.8,973.7 217.8,891.0 200.3,880.9" fill="var(--illus-fill, #0a0c10)" stroke="var(--illus-line-dim, rgba(233,228,218,.38))" stroke-width="1.1" stroke-linejoin="round"/>
<polygon points="217.8,870.8 235.4,880.9 217.8,891.0 200.3,880.9" fill="var(--illus-fill, #0a0c10)" stroke="var(--illus-line-dim, rgba(233,228,218,.38))" stroke-width="1.1" stroke-linejoin="round"/>
<polygon points="340.1,1023.3 307.7,1042.0 307.7,1034.2 340.1,1015.5" fill="var(--illus-fill, #0a0c10)" stroke="var(--illus-line-dim, rgba(233,228,218,.38))" stroke-width="1.1" stroke-linejoin="round"/>
<polygon points="282.0,1027.2 307.7,1042.0 307.7,1034.2 282.0,1019.4" fill="var(--illus-fill, #0a0c10)" stroke="var(--illus-line-dim, rgba(233,228,218,.38))" stroke-width="1.1" stroke-linejoin="round"/>
<polygon points="314.4,1000.6 340.1,1015.5 307.7,1034.2 282.0,1019.4" fill="var(--illus-fill, #0a0c10)" stroke="var(--illus-line-dim, rgba(233,228,218,.38))" stroke-width="1.1" stroke-linejoin="round"/>
<polygon points="328.6,1017.4 311.0,1027.5 311.0,944.9 328.6,934.7" fill="var(--illus-fill, #0a0c10)" stroke="var(--illus-line-dim, rgba(233,228,218,.38))" stroke-width="1.1" stroke-linejoin="round"/>
<polygon points="293.5,1017.4 311.0,1027.5 311.0,944.9 293.5,934.7" fill="var(--illus-fill, #0a0c10)" stroke="var(--illus-line-dim, rgba(233,228,218,.38))" stroke-width="1.1" stroke-linejoin="round"/>
<polygon points="311.0,924.6 328.6,934.7 311.0,944.9 293.5,934.7" fill="var(--illus-fill, #0a0c10)" stroke="var(--illus-line-dim, rgba(233,228,218,.38))" stroke-width="1.1" stroke-linejoin="round"/>
<polygon points="332.7,935.5 312.4,947.2 312.4,937.9 332.7,926.1" fill="var(--illus-fill, #0a0c10)" stroke="var(--illus-line-dim, rgba(233,228,218,.38))" stroke-width="1.1" stroke-linejoin="round"/>
<polygon points="196.2,880.1 312.4,947.2 312.4,937.9 196.2,870.8" fill="var(--illus-fill, #0a0c10)" stroke="var(--illus-line-dim, rgba(233,228,218,.38))" stroke-width="1.1" stroke-linejoin="round"/>
<polygon points="216.5,859.1 332.7,926.1 312.4,937.9 196.2,870.8" fill="var(--illus-fill, #0a0c10)" stroke="var(--illus-line-dim, rgba(233,228,218,.38))" stroke-width="1.1" stroke-linejoin="round"/>
<line x1="215.1" y1="969.1" x2="296.2" y2="937.9" stroke="var(--illus-line-faint, rgba(233,228,218,.16))" stroke-width="1" stroke-linecap="round"/>
<line x1="215.1" y1="891.1" x2="296.2" y2="1015.9" stroke="var(--illus-line-faint, rgba(233,228,218,.16))" stroke-width="1" stroke-linecap="round"/>
<polygon points="84.8,1063.0 52.3,1081.8 52.3,1074.0 84.8,1055.2" fill="var(--illus-fill, #0a0c10)" stroke="var(--illus-line-dim, rgba(233,228,218,.38))" stroke-width="1.1" stroke-linejoin="round"/>
<polygon points="26.7,1066.9 52.3,1081.8 52.3,1074.0 26.7,1059.1" fill="var(--illus-fill, #0a0c10)" stroke="var(--illus-line-dim, rgba(233,228,218,.38))" stroke-width="1.1" stroke-linejoin="round"/>
<polygon points="59.1,1040.4 84.8,1055.2 52.3,1074.0 26.7,1059.1" fill="var(--illus-fill, #0a0c10)" stroke="var(--illus-line-dim, rgba(233,228,218,.38))" stroke-width="1.1" stroke-linejoin="round"/>
<polygon points="73.3,1057.2 55.7,1067.3 55.7,984.7 73.3,974.5" fill="var(--illus-fill, #0a0c10)" stroke="var(--illus-line-dim, rgba(233,228,218,.38))" stroke-width="1.1" stroke-linejoin="round"/>
<polygon points="38.1,1057.2 55.7,1067.3 55.7,984.7 38.1,974.5" fill="var(--illus-fill, #0a0c10)" stroke="var(--illus-line-dim, rgba(233,228,218,.38))" stroke-width="1.1" stroke-linejoin="round"/>
<polygon points="55.7,964.4 73.3,974.5 55.7,984.7 38.1,974.5" fill="var(--illus-fill, #0a0c10)" stroke="var(--illus-line-dim, rgba(233,228,218,.38))" stroke-width="1.1" stroke-linejoin="round"/>
<polygon points="178.0,1116.9 145.5,1135.6 145.5,1127.8 178.0,1109.1" fill="var(--illus-fill, #0a0c10)" stroke="var(--illus-line-dim, rgba(233,228,218,.38))" stroke-width="1.1" stroke-linejoin="round"/>
<polygon points="119.9,1120.8 145.5,1135.6 145.5,1127.8 119.9,1113.0" fill="var(--illus-fill, #0a0c10)" stroke="var(--illus-line-dim, rgba(233,228,218,.38))" stroke-width="1.1" stroke-linejoin="round"/>
<polygon points="152.3,1094.2 178.0,1109.1 145.5,1127.8 119.9,1113.0" fill="var(--illus-fill, #0a0c10)" stroke="var(--illus-line-dim, rgba(233,228,218,.38))" stroke-width="1.1" stroke-linejoin="round"/>
<polygon points="166.5,1111.0 148.9,1121.2 148.9,1038.5 166.5,1028.3" fill="var(--illus-fill, #0a0c10)" stroke="var(--illus-line-dim, rgba(233,228,218,.38))" stroke-width="1.1" stroke-linejoin="round"/>
<polygon points="131.4,1111.0 148.9,1121.2 148.9,1038.5 131.4,1028.3" fill="var(--illus-fill, #0a0c10)" stroke="var(--illus-line-dim, rgba(233,228,218,.38))" stroke-width="1.1" stroke-linejoin="round"/>
<polygon points="148.9,1018.2 166.5,1028.3 148.9,1038.5 131.4,1028.3" fill="var(--illus-fill, #0a0c10)" stroke="var(--illus-line-dim, rgba(233,228,218,.38))" stroke-width="1.1" stroke-linejoin="round"/>
<polygon points="170.5,1029.1 150.3,1040.8 150.3,1031.5 170.5,1019.8" fill="var(--illus-fill, #0a0c10)" stroke="var(--illus-line-dim, rgba(233,228,218,.38))" stroke-width="1.1" stroke-linejoin="round"/>
<polygon points="34.1,973.7 150.3,1040.8 150.3,1031.5 34.1,964.4" fill="var(--illus-fill, #0a0c10)" stroke="var(--illus-line-dim, rgba(233,228,218,.38))" stroke-width="1.1" stroke-linejoin="round"/>
<polygon points="54.4,952.7 170.5,1019.8 150.3,1031.5 34.1,964.4" fill="var(--illus-fill, #0a0c10)" stroke="var(--illus-line-dim, rgba(233,228,218,.38))" stroke-width="1.1" stroke-linejoin="round"/>
<line x1="53.0" y1="1062.6" x2="134.1" y2="1031.4" stroke="var(--illus-line-faint, rgba(233,228,218,.16))" stroke-width="1" stroke-linecap="round"/>
<line x1="53.0" y1="984.6" x2="134.1" y2="1109.4" stroke="var(--illus-line-faint, rgba(233,228,218,.16))" stroke-width="1" stroke-linecap="round"/>
<polygon points="1710.0,17.1 21.3,992.1 21.3,974.9 1710.0,-0.1" fill="var(--illus-fill, #0a0c10)" stroke="var(--illus-line, #e9e4da)" stroke-width="1.4" stroke-linejoin="round"/>
<polygon points="1.0,980.4 21.3,992.1 21.3,974.9 1.0,963.2" fill="var(--illus-fill, #0a0c10)" stroke="var(--illus-line, #e9e4da)" stroke-width="1.4" stroke-linejoin="round"/>
<polygon points="1689.7,-11.8 1710.0,-0.1 21.3,974.9 1.0,963.2" fill="var(--illus-fill, #0a0c10)" stroke="var(--illus-line, #e9e4da)" stroke-width="1.4" stroke-linejoin="round"/>
<polygon points="1811.3,75.6 122.6,1050.6 122.6,1033.4 1811.3,58.4" fill="var(--illus-fill, #0a0c10)" stroke="var(--illus-line, #e9e4da)" stroke-width="1.4" stroke-linejoin="round"/>
<polygon points="102.3,1038.9 122.6,1050.6 122.6,1033.4 102.3,1021.7" fill="var(--illus-fill, #0a0c10)" stroke="var(--illus-line, #e9e4da)" stroke-width="1.4" stroke-linejoin="round"/>
<polygon points="1791.1,46.7 1811.3,58.4 122.6,1033.4 102.3,1021.7" fill="var(--illus-fill, #0a0c10)" stroke="var(--illus-line, #e9e4da)" stroke-width="1.4" stroke-linejoin="round"/>
<polygon points="1529.0,223.0 1516.8,230.0 1516.8,225.3 1529.0,218.3" fill="var(--illus-fill, #0a0c10)" stroke="var(--illus-line-dim, rgba(233,228,218,.38))" stroke-width="1" stroke-linejoin="round"/>
<polygon points="1397.9,161.4 1516.8,230.0 1516.8,225.3 1397.9,156.7" fill="var(--illus-fill, #0a0c10)" stroke="var(--illus-line-dim, rgba(233,228,218,.38))" stroke-width="1" stroke-linejoin="round"/>
<polygon points="1410.1,149.7 1529.0,218.3 1516.8,225.3 1397.9,156.7" fill="var(--illus-fill, #0a0c10)" stroke="var(--illus-line-dim, rgba(233,228,218,.38))" stroke-width="1" stroke-linejoin="round"/>
<polygon points="1275.7,369.2 1263.5,376.2 1263.5,371.6 1275.7,364.6" fill="var(--illus-fill, #0a0c10)" stroke="var(--illus-line-dim, rgba(233,228,218,.38))" stroke-width="1" stroke-linejoin="round"/>
<polygon points="1144.6,307.6 1263.5,376.2 1263.5,371.6 1144.6,302.9" fill="var(--illus-fill, #0a0c10)" stroke="var(--illus-line-dim, rgba(233,228,218,.38))" stroke-width="1" stroke-linejoin="round"/>
<polygon points="1156.8,295.9 1275.7,364.6 1263.5,371.6 1144.6,302.9" fill="var(--illus-fill, #0a0c10)" stroke="var(--illus-line-dim, rgba(233,228,218,.38))" stroke-width="1" stroke-linejoin="round"/>
<polygon points="995.3,531.1 983.2,538.1 983.2,533.4 995.3,526.4" fill="var(--illus-fill, #0a0c10)" stroke="var(--illus-line-dim, rgba(233,228,218,.38))" stroke-width="1" stroke-linejoin="round"/>
<polygon points="864.3,469.5 983.2,538.1 983.2,533.4 864.3,464.8" fill="var(--illus-fill, #0a0c10)" stroke="var(--illus-line-dim, rgba(233,228,218,.38))" stroke-width="1" stroke-linejoin="round"/>
<polygon points="876.4,457.8 995.3,526.4 983.2,533.4 864.3,464.8" fill="var(--illus-fill, #0a0c10)" stroke="var(--illus-line-dim, rgba(233,228,218,.38))" stroke-width="1" stroke-linejoin="round"/>
<polygon points="738.6,679.3 726.5,686.3 726.5,681.6 738.6,674.6" fill="var(--illus-fill, #0a0c10)" stroke="var(--illus-line-dim, rgba(233,228,218,.38))" stroke-width="1" stroke-linejoin="round"/>
<polygon points="607.6,617.7 726.5,686.3 726.5,681.6 607.6,613.0" fill="var(--illus-fill, #0a0c10)" stroke="var(--illus-line-dim, rgba(233,228,218,.38))" stroke-width="1" stroke-linejoin="round"/>
<polygon points="619.7,606.0 738.6,674.6 726.5,681.6 607.6,613.0" fill="var(--illus-fill, #0a0c10)" stroke="var(--illus-line-dim, rgba(233,228,218,.38))" stroke-width="1" stroke-linejoin="round"/>
<g id="spr-container-1" class="spr-container spr-faded">
<polygon points="1693.8,113.8 1545.2,199.6 1545.2,99.7 1693.8,13.9" fill="var(--illus-fill, #0a0c10)" stroke="var(--illus-line-dim, rgba(233,228,218,.38))" stroke-width="1.2" stroke-linejoin="round"/>
<polygon points="1442.5,140.3 1545.2,199.6 1545.2,99.7 1442.5,40.5" fill="var(--illus-fill, #0a0c10)" stroke="var(--illus-line-dim, rgba(233,228,218,.38))" stroke-width="1.2" stroke-linejoin="round"/>
<polygon points="1591.1,-45.3 1693.8,13.9 1545.2,99.7 1442.5,40.5" fill="var(--illus-fill, #0a0c10)" stroke="var(--illus-line-dim, rgba(233,228,218,.38))" stroke-width="1.2" stroke-linejoin="round"/>
<rect x="1690.8" y="10.9" width="6" height="6" fill="var(--illus-fill, #0a0c10)" stroke="var(--illus-line-dim, rgba(233,228,218,.38))" stroke-width="1"/>
<rect x="1542.2" y="96.7" width="6" height="6" fill="var(--illus-fill, #0a0c10)" stroke="var(--illus-line-dim, rgba(233,228,218,.38))" stroke-width="1"/>
<rect x="1439.5" y="37.5" width="6" height="6" fill="var(--illus-fill, #0a0c10)" stroke="var(--illus-line-dim, rgba(233,228,218,.38))" stroke-width="1"/>
<rect x="1542.2" y="196.6" width="6" height="6" fill="var(--illus-fill, #0a0c10)" stroke="var(--illus-line-dim, rgba(233,228,218,.38))" stroke-width="1"/>
<rect x="1439.5" y="137.3" width="6" height="6" fill="var(--illus-fill, #0a0c10)" stroke="var(--illus-line-dim, rgba(233,228,218,.38))" stroke-width="1"/>
<rect x="1690.8" y="110.8" width="6" height="6" fill="var(--illus-fill, #0a0c10)" stroke="var(--illus-line-dim, rgba(233,228,218,.38))" stroke-width="1"/>
<line x1="1583.0" y1="-36.0" x2="1677.6" y2="18.6" stroke="var(--illus-line-faint, rgba(233,228,218,.16))" stroke-width="1" stroke-linecap="round"/>
<line x1="1458.7" y1="35.8" x2="1553.3" y2="90.4" stroke="var(--illus-line-faint, rgba(233,228,218,.16))" stroke-width="1" stroke-linecap="round"/>
<line x1="1683.0" y1="110.7" x2="1683.0" y2="29.5" stroke="var(--illus-line-faint, rgba(233,228,218,.16))" stroke-width="1" stroke-linecap="round"/>
<line x1="1672.2" y1="116.9" x2="1672.2" y2="35.8" stroke="var(--illus-line-faint, rgba(233,228,218,.16))" stroke-width="1" stroke-linecap="round"/>
<line x1="1564.1" y1="179.3" x2="1564.1" y2="98.2" stroke="var(--illus-line-faint, rgba(233,228,218,.16))" stroke-width="1" stroke-linecap="round"/>
<line x1="1493.8" y1="165.3" x2="1493.8" y2="74.8" stroke="var(--illus-line-dim, rgba(233,228,218,.38))" stroke-width="1.2" stroke-linecap="round"/>
<line x1="1457.4" y1="141.1" x2="1457.4" y2="56.8" stroke="var(--illus-line-faint, rgba(233,228,218,.16))" stroke-width="1" stroke-linecap="round"/>
<line x1="1454.0" y1="126.7" x2="1460.7" y2="130.5" stroke="var(--illus-line-faint, rgba(233,228,218,.16))" stroke-width="1" stroke-linecap="round"/>
<line x1="1454.0" y1="97.0" x2="1460.7" y2="100.9" stroke="var(--illus-line-faint, rgba(233,228,218,.16))" stroke-width="1" stroke-linecap="round"/>
<line x1="1454.0" y1="67.4" x2="1460.7" y2="71.3" stroke="var(--illus-line-faint, rgba(233,228,218,.16))" stroke-width="1" stroke-linecap="round"/>
<line x1="1484.4" y1="156.7" x2="1484.4" y2="72.4" stroke="var(--illus-line-faint, rgba(233,228,218,.16))" stroke-width="1" stroke-linecap="round"/>
<line x1="1481.0" y1="142.2" x2="1487.8" y2="146.2" stroke="var(--illus-line-faint, rgba(233,228,218,.16))" stroke-width="1" stroke-linecap="round"/>
<line x1="1481.0" y1="112.6" x2="1487.8" y2="116.5" stroke="var(--illus-line-faint, rgba(233,228,218,.16))" stroke-width="1" stroke-linecap="round"/>
<line x1="1481.0" y1="83.0" x2="1487.8" y2="86.9" stroke="var(--illus-line-faint, rgba(233,228,218,.16))" stroke-width="1" stroke-linecap="round"/>
<line x1="1503.3" y1="167.6" x2="1503.3" y2="83.4" stroke="var(--illus-line-faint, rgba(233,228,218,.16))" stroke-width="1" stroke-linecap="round"/>
<line x1="1499.9" y1="153.2" x2="1506.7" y2="157.1" stroke="var(--illus-line-faint, rgba(233,228,218,.16))" stroke-width="1" stroke-linecap="round"/>
<line x1="1499.9" y1="123.5" x2="1506.7" y2="127.4" stroke="var(--illus-line-faint, rgba(233,228,218,.16))" stroke-width="1" stroke-linecap="round"/>
<line x1="1499.9" y1="93.9" x2="1506.7" y2="97.8" stroke="var(--illus-line-faint, rgba(233,228,218,.16))" stroke-width="1" stroke-linecap="round"/>
<line x1="1530.3" y1="183.2" x2="1530.3" y2="99.0" stroke="var(--illus-line-faint, rgba(233,228,218,.16))" stroke-width="1" stroke-linecap="round"/>
<line x1="1526.9" y1="168.8" x2="1533.7" y2="172.7" stroke="var(--illus-line-faint, rgba(233,228,218,.16))" stroke-width="1" stroke-linecap="round"/>
<line x1="1526.9" y1="139.1" x2="1533.7" y2="143.0" stroke="var(--illus-line-faint, rgba(233,228,218,.16))" stroke-width="1" stroke-linecap="round"/>
<line x1="1526.9" y1="109.5" x2="1533.7" y2="113.4" stroke="var(--illus-line-faint, rgba(233,228,218,.16))" stroke-width="1" stroke-linecap="round"/>
<line x1="1484.4" y1="130.2" x2="1479.0" y2="131.7" stroke="var(--illus-line-dim, rgba(233,228,218,.38))" stroke-width="1.2" stroke-linecap="round"/>
<line x1="1503.3" y1="141.1" x2="1508.7" y2="148.9" stroke="var(--illus-line-dim, rgba(233,228,218,.38))" stroke-width="1.2" stroke-linecap="round"/>
</g>
<g id="spr-container-2" class="spr-container spr-faded">
<polygon points="1477.6,238.6 1302.0,340.0 1302.0,240.1 1477.6,138.7" fill="var(--illus-fill, #0a0c10)" stroke="var(--illus-line-dim, rgba(233,228,218,.38))" stroke-width="1.2" stroke-linejoin="round"/>
<polygon points="1199.3,280.7 1302.0,340.0 1302.0,240.1 1199.3,180.9" fill="var(--illus-fill, #0a0c10)" stroke="var(--illus-line-dim, rgba(233,228,218,.38))" stroke-width="1.2" stroke-linejoin="round"/>
<polygon points="1375.0,79.5 1477.6,138.7 1302.0,240.1 1199.3,180.9" fill="var(--illus-fill, #0a0c10)" stroke="var(--illus-line-dim, rgba(233,228,218,.38))" stroke-width="1.2" stroke-linejoin="round"/>
<rect x="1474.6" y="135.7" width="6" height="6" fill="var(--illus-fill, #0a0c10)" stroke="var(--illus-line-dim, rgba(233,228,218,.38))" stroke-width="1"/>
<rect x="1299.0" y="237.1" width="6" height="6" fill="var(--illus-fill, #0a0c10)" stroke="var(--illus-line-dim, rgba(233,228,218,.38))" stroke-width="1"/>
<rect x="1196.3" y="177.9" width="6" height="6" fill="var(--illus-fill, #0a0c10)" stroke="var(--illus-line-dim, rgba(233,228,218,.38))" stroke-width="1"/>
<rect x="1299.0" y="337.0" width="6" height="6" fill="var(--illus-fill, #0a0c10)" stroke="var(--illus-line-dim, rgba(233,228,218,.38))" stroke-width="1"/>
<rect x="1196.3" y="277.7" width="6" height="6" fill="var(--illus-fill, #0a0c10)" stroke="var(--illus-line-dim, rgba(233,228,218,.38))" stroke-width="1"/>
<rect x="1474.6" y="235.6" width="6" height="6" fill="var(--illus-fill, #0a0c10)" stroke="var(--illus-line-dim, rgba(233,228,218,.38))" stroke-width="1"/>
<line x1="1366.9" y1="88.8" x2="1461.4" y2="143.4" stroke="var(--illus-line-faint, rgba(233,228,218,.16))" stroke-width="1" stroke-linecap="round"/>
<line x1="1215.5" y1="176.2" x2="1310.1" y2="230.8" stroke="var(--illus-line-faint, rgba(233,228,218,.16))" stroke-width="1" stroke-linecap="round"/>
<line x1="1466.8" y1="235.5" x2="1466.8" y2="154.3" stroke="var(--illus-line-faint, rgba(233,228,218,.16))" stroke-width="1" stroke-linecap="round"/>
<line x1="1456.0" y1="241.7" x2="1456.0" y2="160.6" stroke="var(--illus-line-faint, rgba(233,228,218,.16))" stroke-width="1" stroke-linecap="round"/>
<line x1="1445.2" y1="247.9" x2="1445.2" y2="166.8" stroke="var(--illus-line-faint, rgba(233,228,218,.16))" stroke-width="1" stroke-linecap="round"/>
<line x1="1337.1" y1="310.3" x2="1337.1" y2="229.2" stroke="var(--illus-line-faint, rgba(233,228,218,.16))" stroke-width="1" stroke-linecap="round"/>
<line x1="1326.3" y1="316.6" x2="1326.3" y2="235.5" stroke="var(--illus-line-faint, rgba(233,228,218,.16))" stroke-width="1" stroke-linecap="round"/>
<line x1="1315.5" y1="322.8" x2="1315.5" y2="241.7" stroke="var(--illus-line-faint, rgba(233,228,218,.16))" stroke-width="1" stroke-linecap="round"/>
<text transform="matrix(0.8660 -0.5000 0.0000 1.0000 1389.8 247.2)" font-family="var(--illus-font, ui-monospace, 'JetBrains Mono', 'SF Mono', Menlo, monospace)" font-size="20" font-weight="700" letter-spacing="5" fill="var(--illus-text-dim, rgba(233,228,218,.55))" text-anchor="middle">YOUR DATA</text>
<line x1="1250.7" y1="305.7" x2="1250.7" y2="215.2" stroke="var(--illus-line-dim, rgba(233,228,218,.38))" stroke-width="1.2" stroke-linecap="round"/>
<line x1="1214.2" y1="281.5" x2="1214.2" y2="197.2" stroke="var(--illus-line-faint, rgba(233,228,218,.16))" stroke-width="1" stroke-linecap="round"/>
<line x1="1210.8" y1="267.0" x2="1217.6" y2="270.9" stroke="var(--illus-line-faint, rgba(233,228,218,.16))" stroke-width="1" stroke-linecap="round"/>
<line x1="1210.8" y1="237.4" x2="1217.6" y2="241.3" stroke="var(--illus-line-faint, rgba(233,228,218,.16))" stroke-width="1" stroke-linecap="round"/>
<line x1="1210.8" y1="207.8" x2="1217.6" y2="211.7" stroke="var(--illus-line-faint, rgba(233,228,218,.16))" stroke-width="1" stroke-linecap="round"/>
<line x1="1241.2" y1="297.1" x2="1241.2" y2="212.8" stroke="var(--illus-line-faint, rgba(233,228,218,.16))" stroke-width="1" stroke-linecap="round"/>
<line x1="1237.8" y1="282.6" x2="1244.6" y2="286.5" stroke="var(--illus-line-faint, rgba(233,228,218,.16))" stroke-width="1" stroke-linecap="round"/>
<line x1="1237.8" y1="253.0" x2="1244.6" y2="256.9" stroke="var(--illus-line-faint, rgba(233,228,218,.16))" stroke-width="1" stroke-linecap="round"/>
<line x1="1237.8" y1="223.4" x2="1244.6" y2="227.3" stroke="var(--illus-line-faint, rgba(233,228,218,.16))" stroke-width="1" stroke-linecap="round"/>
<line x1="1260.1" y1="308.0" x2="1260.1" y2="223.8" stroke="var(--illus-line-faint, rgba(233,228,218,.16))" stroke-width="1" stroke-linecap="round"/>
<line x1="1256.7" y1="293.6" x2="1263.5" y2="297.5" stroke="var(--illus-line-faint, rgba(233,228,218,.16))" stroke-width="1" stroke-linecap="round"/>
<line x1="1256.7" y1="263.9" x2="1263.5" y2="267.8" stroke="var(--illus-line-faint, rgba(233,228,218,.16))" stroke-width="1" stroke-linecap="round"/>
<line x1="1256.7" y1="234.3" x2="1263.5" y2="238.2" stroke="var(--illus-line-faint, rgba(233,228,218,.16))" stroke-width="1" stroke-linecap="round"/>
<line x1="1287.1" y1="323.6" x2="1287.1" y2="239.4" stroke="var(--illus-line-faint, rgba(233,228,218,.16))" stroke-width="1" stroke-linecap="round"/>
<line x1="1283.8" y1="309.2" x2="1290.5" y2="313.1" stroke="var(--illus-line-faint, rgba(233,228,218,.16))" stroke-width="1" stroke-linecap="round"/>
<line x1="1283.8" y1="279.5" x2="1290.5" y2="283.4" stroke="var(--illus-line-faint, rgba(233,228,218,.16))" stroke-width="1" stroke-linecap="round"/>
<line x1="1283.8" y1="249.9" x2="1290.5" y2="253.8" stroke="var(--illus-line-faint, rgba(233,228,218,.16))" stroke-width="1" stroke-linecap="round"/>
<line x1="1241.2" y1="270.6" x2="1235.8" y2="272.1" stroke="var(--illus-line-dim, rgba(233,228,218,.38))" stroke-width="1.2" stroke-linecap="round"/>
<line x1="1260.1" y1="281.5" x2="1265.5" y2="289.3" stroke="var(--illus-line-dim, rgba(233,228,218,.38))" stroke-width="1.2" stroke-linecap="round"/>
</g>
<g id="spr-container-3" class="spr-container">
<polygon points="1224.3,384.8 1001.4,513.5 1001.4,413.7 1224.3,285.0" fill="var(--illus-fill, #0a0c10)" stroke="var(--illus-line, #e9e4da)" stroke-width="1.6" stroke-linejoin="round"/>
<polygon points="898.7,454.2 1001.4,513.5 1001.4,413.7 898.7,354.4" fill="var(--illus-fill, #0a0c10)" stroke="var(--illus-line, #e9e4da)" stroke-width="1.6" stroke-linejoin="round"/>
<polygon points="1121.6,225.7 1224.3,285.0 1001.4,413.7 898.7,354.4" fill="var(--illus-fill, #0a0c10)" stroke="var(--illus-line, #e9e4da)" stroke-width="1.6" stroke-linejoin="round"/>
<rect x="1221.3" y="282.0" width="6" height="6" fill="var(--illus-fill, #0a0c10)" stroke="var(--illus-line, #e9e4da)" stroke-width="1"/>
<rect x="998.4" y="410.7" width="6" height="6" fill="var(--illus-fill, #0a0c10)" stroke="var(--illus-line, #e9e4da)" stroke-width="1"/>
<rect x="895.7" y="351.4" width="6" height="6" fill="var(--illus-fill, #0a0c10)" stroke="var(--illus-line, #e9e4da)" stroke-width="1"/>
<rect x="998.4" y="510.5" width="6" height="6" fill="var(--illus-fill, #0a0c10)" stroke="var(--illus-line, #e9e4da)" stroke-width="1"/>
<rect x="895.7" y="451.2" width="6" height="6" fill="var(--illus-fill, #0a0c10)" stroke="var(--illus-line, #e9e4da)" stroke-width="1"/>
<rect x="1221.3" y="381.8" width="6" height="6" fill="var(--illus-fill, #0a0c10)" stroke="var(--illus-line, #e9e4da)" stroke-width="1"/>
<line x1="1113.5" y1="235.1" x2="1208.1" y2="289.7" stroke="var(--illus-line-faint, rgba(233,228,218,.16))" stroke-width="1" stroke-linecap="round"/>
<line x1="914.9" y1="349.7" x2="1009.5" y2="404.3" stroke="var(--illus-line-faint, rgba(233,228,218,.16))" stroke-width="1" stroke-linecap="round"/>
<line x1="1213.5" y1="381.7" x2="1213.5" y2="300.6" stroke="var(--illus-line-dim, rgba(233,228,218,.38))" stroke-width="1" stroke-linecap="round"/>
<line x1="1202.7" y1="387.9" x2="1202.7" y2="306.8" stroke="var(--illus-line-dim, rgba(233,228,218,.38))" stroke-width="1" stroke-linecap="round"/>
<line x1="1191.9" y1="394.2" x2="1191.9" y2="313.1" stroke="var(--illus-line-dim, rgba(233,228,218,.38))" stroke-width="1" stroke-linecap="round"/>
<line x1="1181.1" y1="400.4" x2="1181.1" y2="319.3" stroke="var(--illus-line-dim, rgba(233,228,218,.38))" stroke-width="1" stroke-linecap="round"/>
<line x1="1170.3" y1="406.7" x2="1170.3" y2="325.6" stroke="var(--illus-line-dim, rgba(233,228,218,.38))" stroke-width="1" stroke-linecap="round"/>
<line x1="1051.4" y1="475.3" x2="1051.4" y2="394.2" stroke="var(--illus-line-dim, rgba(233,228,218,.38))" stroke-width="1" stroke-linecap="round"/>
<line x1="1040.6" y1="481.6" x2="1040.6" y2="400.4" stroke="var(--illus-line-dim, rgba(233,228,218,.38))" stroke-width="1" stroke-linecap="round"/>
<line x1="1029.8" y1="487.8" x2="1029.8" y2="406.7" stroke="var(--illus-line-dim, rgba(233,228,218,.38))" stroke-width="1" stroke-linecap="round"/>
<line x1="1019.0" y1="494.0" x2="1019.0" y2="412.9" stroke="var(--illus-line-dim, rgba(233,228,218,.38))" stroke-width="1" stroke-linecap="round"/>
<text transform="matrix(0.8660 -0.5000 0.0000 1.0000 1112.9 407.1)" font-family="var(--illus-font, ui-monospace, 'JetBrains Mono', 'SF Mono', Menlo, monospace)" font-size="25" font-weight="700" letter-spacing="5" fill="var(--illus-text, #e9e4da)" text-anchor="middle">YOUR DATA</text>
<line x1="950.1" y1="479.2" x2="950.1" y2="388.7" stroke="var(--illus-line, #e9e4da)" stroke-width="1.2" stroke-linecap="round"/>
<line x1="913.6" y1="455.0" x2="913.6" y2="370.8" stroke="var(--illus-line-dim, rgba(233,228,218,.38))" stroke-width="1" stroke-linecap="round"/>
<line x1="910.2" y1="440.6" x2="917.0" y2="444.5" stroke="var(--illus-line-dim, rgba(233,228,218,.38))" stroke-width="1" stroke-linecap="round"/>
<line x1="910.2" y1="411.0" x2="917.0" y2="414.9" stroke="var(--illus-line-dim, rgba(233,228,218,.38))" stroke-width="1" stroke-linecap="round"/>
<line x1="910.2" y1="381.3" x2="917.0" y2="385.2" stroke="var(--illus-line-dim, rgba(233,228,218,.38))" stroke-width="1" stroke-linecap="round"/>
<line x1="940.6" y1="470.6" x2="940.6" y2="386.4" stroke="var(--illus-line-dim, rgba(233,228,218,.38))" stroke-width="1" stroke-linecap="round"/>
<line x1="937.2" y1="456.2" x2="944.0" y2="460.1" stroke="var(--illus-line-dim, rgba(233,228,218,.38))" stroke-width="1" stroke-linecap="round"/>
<line x1="937.2" y1="426.6" x2="944.0" y2="430.5" stroke="var(--illus-line-dim, rgba(233,228,218,.38))" stroke-width="1" stroke-linecap="round"/>
<line x1="937.2" y1="396.9" x2="944.0" y2="400.8" stroke="var(--illus-line-dim, rgba(233,228,218,.38))" stroke-width="1" stroke-linecap="round"/>
<line x1="959.5" y1="481.5" x2="959.5" y2="397.3" stroke="var(--illus-line-dim, rgba(233,228,218,.38))" stroke-width="1" stroke-linecap="round"/>
<line x1="956.1" y1="467.1" x2="962.9" y2="471.0" stroke="var(--illus-line-dim, rgba(233,228,218,.38))" stroke-width="1" stroke-linecap="round"/>
<line x1="956.1" y1="437.5" x2="962.9" y2="441.4" stroke="var(--illus-line-dim, rgba(233,228,218,.38))" stroke-width="1" stroke-linecap="round"/>
<line x1="956.1" y1="407.8" x2="962.9" y2="411.7" stroke="var(--illus-line-dim, rgba(233,228,218,.38))" stroke-width="1" stroke-linecap="round"/>
<line x1="986.5" y1="497.1" x2="986.5" y2="412.9" stroke="var(--illus-line-dim, rgba(233,228,218,.38))" stroke-width="1" stroke-linecap="round"/>
<line x1="983.2" y1="482.7" x2="989.9" y2="486.6" stroke="var(--illus-line-dim, rgba(233,228,218,.38))" stroke-width="1" stroke-linecap="round"/>
<line x1="983.2" y1="453.1" x2="989.9" y2="457.0" stroke="var(--illus-line-dim, rgba(233,228,218,.38))" stroke-width="1" stroke-linecap="round"/>
<line x1="983.2" y1="423.4" x2="989.9" y2="427.3" stroke="var(--illus-line-dim, rgba(233,228,218,.38))" stroke-width="1" stroke-linecap="round"/>
<line x1="940.6" y1="444.1" x2="935.2" y2="445.7" stroke="var(--illus-line, #e9e4da)" stroke-width="1.2" stroke-linecap="round"/>
<line x1="959.5" y1="455.0" x2="964.9" y2="462.8" stroke="var(--illus-line, #e9e4da)" stroke-width="1.2" stroke-linecap="round"/>
</g>
<g id="spr-container-4" class="spr-container">
<polygon points="960.9,536.9 738.0,665.6 738.0,565.8 960.9,437.1" fill="var(--illus-fill, #0a0c10)" stroke="var(--illus-line, #e9e4da)" stroke-width="1.6" stroke-linejoin="round"/>
<polygon points="635.3,606.3 738.0,665.6 738.0,565.8 635.3,506.5" fill="var(--illus-fill, #0a0c10)" stroke="var(--illus-line, #e9e4da)" stroke-width="1.6" stroke-linejoin="round"/>
<polygon points="858.2,377.8 960.9,437.1 738.0,565.8 635.3,506.5" fill="var(--illus-fill, #0a0c10)" stroke="var(--illus-line, #e9e4da)" stroke-width="1.6" stroke-linejoin="round"/>
<rect x="957.9" y="434.1" width="6" height="6" fill="var(--illus-fill, #0a0c10)" stroke="var(--illus-line, #e9e4da)" stroke-width="1"/>
<rect x="735.0" y="562.8" width="6" height="6" fill="var(--illus-fill, #0a0c10)" stroke="var(--illus-line, #e9e4da)" stroke-width="1"/>
<rect x="632.3" y="503.5" width="6" height="6" fill="var(--illus-fill, #0a0c10)" stroke="var(--illus-line, #e9e4da)" stroke-width="1"/>
<rect x="735.0" y="662.6" width="6" height="6" fill="var(--illus-fill, #0a0c10)" stroke="var(--illus-line, #e9e4da)" stroke-width="1"/>
<rect x="632.3" y="603.3" width="6" height="6" fill="var(--illus-fill, #0a0c10)" stroke="var(--illus-line, #e9e4da)" stroke-width="1"/>
<rect x="957.9" y="533.9" width="6" height="6" fill="var(--illus-fill, #0a0c10)" stroke="var(--illus-line, #e9e4da)" stroke-width="1"/>
<line x1="850.1" y1="387.2" x2="944.7" y2="441.8" stroke="var(--illus-line-faint, rgba(233,228,218,.16))" stroke-width="1" stroke-linecap="round"/>
<line x1="651.5" y1="501.8" x2="746.1" y2="556.4" stroke="var(--illus-line-faint, rgba(233,228,218,.16))" stroke-width="1" stroke-linecap="round"/>
<line x1="950.1" y1="533.8" x2="950.1" y2="452.7" stroke="var(--illus-line-dim, rgba(233,228,218,.38))" stroke-width="1" stroke-linecap="round"/>
<line x1="939.3" y1="540.1" x2="939.3" y2="458.9" stroke="var(--illus-line-dim, rgba(233,228,218,.38))" stroke-width="1" stroke-linecap="round"/>
<line x1="928.5" y1="546.3" x2="928.5" y2="465.2" stroke="var(--illus-line-dim, rgba(233,228,218,.38))" stroke-width="1" stroke-linecap="round"/>
<line x1="917.6" y1="552.5" x2="917.6" y2="471.4" stroke="var(--illus-line-dim, rgba(233,228,218,.38))" stroke-width="1" stroke-linecap="round"/>
<line x1="906.8" y1="558.8" x2="906.8" y2="477.7" stroke="var(--illus-line-dim, rgba(233,228,218,.38))" stroke-width="1" stroke-linecap="round"/>
<line x1="787.9" y1="627.4" x2="787.9" y2="546.3" stroke="var(--illus-line-dim, rgba(233,228,218,.38))" stroke-width="1" stroke-linecap="round"/>
<line x1="777.1" y1="633.6" x2="777.1" y2="552.5" stroke="var(--illus-line-dim, rgba(233,228,218,.38))" stroke-width="1" stroke-linecap="round"/>
<line x1="766.3" y1="639.9" x2="766.3" y2="558.8" stroke="var(--illus-line-dim, rgba(233,228,218,.38))" stroke-width="1" stroke-linecap="round"/>
<line x1="755.5" y1="646.1" x2="755.5" y2="565.0" stroke="var(--illus-line-dim, rgba(233,228,218,.38))" stroke-width="1" stroke-linecap="round"/>
<text transform="matrix(0.8660 -0.5000 0.0000 1.0000 849.4 559.2)" font-family="var(--illus-font, ui-monospace, 'JetBrains Mono', 'SF Mono', Menlo, monospace)" font-size="25" font-weight="700" letter-spacing="5" fill="var(--illus-text, #e9e4da)" text-anchor="middle">YOUR DATA</text>
<line x1="686.6" y1="631.3" x2="686.6" y2="540.8" stroke="var(--illus-line, #e9e4da)" stroke-width="1.2" stroke-linecap="round"/>
<line x1="650.1" y1="607.1" x2="650.1" y2="522.9" stroke="var(--illus-line-dim, rgba(233,228,218,.38))" stroke-width="1" stroke-linecap="round"/>
<line x1="646.8" y1="592.7" x2="653.5" y2="596.6" stroke="var(--illus-line-dim, rgba(233,228,218,.38))" stroke-width="1" stroke-linecap="round"/>
<line x1="646.8" y1="563.1" x2="653.5" y2="567.0" stroke="var(--illus-line-dim, rgba(233,228,218,.38))" stroke-width="1" stroke-linecap="round"/>
<line x1="646.8" y1="533.4" x2="653.5" y2="537.3" stroke="var(--illus-line-dim, rgba(233,228,218,.38))" stroke-width="1" stroke-linecap="round"/>
<line x1="677.2" y1="622.7" x2="677.2" y2="538.5" stroke="var(--illus-line-dim, rgba(233,228,218,.38))" stroke-width="1" stroke-linecap="round"/>
<line x1="673.8" y1="608.3" x2="680.5" y2="612.2" stroke="var(--illus-line-dim, rgba(233,228,218,.38))" stroke-width="1" stroke-linecap="round"/>
<line x1="673.8" y1="578.7" x2="680.5" y2="582.6" stroke="var(--illus-line-dim, rgba(233,228,218,.38))" stroke-width="1" stroke-linecap="round"/>
<line x1="673.8" y1="549.0" x2="680.5" y2="552.9" stroke="var(--illus-line-dim, rgba(233,228,218,.38))" stroke-width="1" stroke-linecap="round"/>
<line x1="696.1" y1="633.6" x2="696.1" y2="549.4" stroke="var(--illus-line-dim, rgba(233,228,218,.38))" stroke-width="1" stroke-linecap="round"/>
<line x1="692.7" y1="619.2" x2="699.5" y2="623.1" stroke="var(--illus-line-dim, rgba(233,228,218,.38))" stroke-width="1" stroke-linecap="round"/>
<line x1="692.7" y1="589.6" x2="699.5" y2="593.5" stroke="var(--illus-line-dim, rgba(233,228,218,.38))" stroke-width="1" stroke-linecap="round"/>
<line x1="692.7" y1="559.9" x2="699.5" y2="563.8" stroke="var(--illus-line-dim, rgba(233,228,218,.38))" stroke-width="1" stroke-linecap="round"/>
<line x1="723.1" y1="649.2" x2="723.1" y2="565.0" stroke="var(--illus-line-dim, rgba(233,228,218,.38))" stroke-width="1" stroke-linecap="round"/>
<line x1="719.7" y1="634.8" x2="726.5" y2="638.7" stroke="var(--illus-line-dim, rgba(233,228,218,.38))" stroke-width="1" stroke-linecap="round"/>
<line x1="719.7" y1="605.2" x2="726.5" y2="609.1" stroke="var(--illus-line-dim, rgba(233,228,218,.38))" stroke-width="1" stroke-linecap="round"/>
<line x1="719.7" y1="575.5" x2="726.5" y2="579.4" stroke="var(--illus-line-dim, rgba(233,228,218,.38))" stroke-width="1" stroke-linecap="round"/>
<line x1="677.2" y1="596.2" x2="671.8" y2="597.8" stroke="var(--illus-line, #e9e4da)" stroke-width="1.2" stroke-linecap="round"/>
<line x1="696.1" y1="607.1" x2="701.5" y2="614.9" stroke="var(--illus-line, #e9e4da)" stroke-width="1.2" stroke-linecap="round"/>
</g>
<g id="spr-container-5" class="spr-container">
<polygon points="694.1,691.0 423.9,847.0 423.9,747.1 694.1,591.1" fill="var(--illus-fill, #0a0c10)" stroke="var(--illus-line, #e9e4da)" stroke-width="1.6" stroke-linejoin="round"/>
<polygon points="321.2,787.7 423.9,847.0 423.9,747.1 321.2,687.9" fill="var(--illus-fill, #0a0c10)" stroke="var(--illus-line, #e9e4da)" stroke-width="1.6" stroke-linejoin="round"/>
<polygon points="591.4,531.9 694.1,591.1 423.9,747.1 321.2,687.9" fill="var(--illus-fill, #0a0c10)" stroke="var(--illus-line, #e9e4da)" stroke-width="1.6" stroke-linejoin="round"/>
<rect x="691.1" y="588.1" width="6" height="6" fill="var(--illus-fill, #0a0c10)" stroke="var(--illus-line, #e9e4da)" stroke-width="1"/>
<rect x="420.9" y="744.1" width="6" height="6" fill="var(--illus-fill, #0a0c10)" stroke="var(--illus-line, #e9e4da)" stroke-width="1"/>
<rect x="318.2" y="684.9" width="6" height="6" fill="var(--illus-fill, #0a0c10)" stroke="var(--illus-line, #e9e4da)" stroke-width="1"/>
<rect x="420.9" y="844.0" width="6" height="6" fill="var(--illus-fill, #0a0c10)" stroke="var(--illus-line, #e9e4da)" stroke-width="1"/>
<rect x="318.2" y="784.7" width="6" height="6" fill="var(--illus-fill, #0a0c10)" stroke="var(--illus-line, #e9e4da)" stroke-width="1"/>
<rect x="691.1" y="688.0" width="6" height="6" fill="var(--illus-fill, #0a0c10)" stroke="var(--illus-line, #e9e4da)" stroke-width="1"/>
<line x1="583.3" y1="541.2" x2="677.8" y2="595.8" stroke="var(--illus-line-faint, rgba(233,228,218,.16))" stroke-width="1" stroke-linecap="round"/>
<line x1="337.4" y1="683.2" x2="432.0" y2="737.8" stroke="var(--illus-line-faint, rgba(233,228,218,.16))" stroke-width="1" stroke-linecap="round"/>
<line x1="683.2" y1="687.9" x2="683.2" y2="606.7" stroke="var(--illus-line-dim, rgba(233,228,218,.38))" stroke-width="1" stroke-linecap="round"/>
<line x1="672.4" y1="694.1" x2="672.4" y2="613.0" stroke="var(--illus-line-dim, rgba(233,228,218,.38))" stroke-width="1" stroke-linecap="round"/>
<line x1="661.6" y1="700.3" x2="661.6" y2="619.2" stroke="var(--illus-line-dim, rgba(233,228,218,.38))" stroke-width="1" stroke-linecap="round"/>
<line x1="650.8" y1="706.6" x2="650.8" y2="625.5" stroke="var(--illus-line-dim, rgba(233,228,218,.38))" stroke-width="1" stroke-linecap="round"/>
<line x1="640.0" y1="712.8" x2="640.0" y2="631.7" stroke="var(--illus-line-dim, rgba(233,228,218,.38))" stroke-width="1" stroke-linecap="round"/>
<line x1="629.2" y1="719.1" x2="629.2" y2="637.9" stroke="var(--illus-line-dim, rgba(233,228,218,.38))" stroke-width="1" stroke-linecap="round"/>
<line x1="618.4" y1="725.3" x2="618.4" y2="644.2" stroke="var(--illus-line-dim, rgba(233,228,218,.38))" stroke-width="1" stroke-linecap="round"/>
<line x1="499.5" y1="793.9" x2="499.5" y2="712.8" stroke="var(--illus-line-dim, rgba(233,228,218,.38))" stroke-width="1" stroke-linecap="round"/>
<line x1="488.7" y1="800.2" x2="488.7" y2="719.1" stroke="var(--illus-line-dim, rgba(233,228,218,.38))" stroke-width="1" stroke-linecap="round"/>
<line x1="477.9" y1="806.4" x2="477.9" y2="725.3" stroke="var(--illus-line-dim, rgba(233,228,218,.38))" stroke-width="1" stroke-linecap="round"/>
<line x1="467.1" y1="812.7" x2="467.1" y2="731.5" stroke="var(--illus-line-dim, rgba(233,228,218,.38))" stroke-width="1" stroke-linecap="round"/>
<line x1="456.3" y1="818.9" x2="456.3" y2="737.8" stroke="var(--illus-line-dim, rgba(233,228,218,.38))" stroke-width="1" stroke-linecap="round"/>
<line x1="445.5" y1="825.1" x2="445.5" y2="744.0" stroke="var(--illus-line-dim, rgba(233,228,218,.38))" stroke-width="1" stroke-linecap="round"/>
<line x1="434.7" y1="831.4" x2="434.7" y2="750.3" stroke="var(--illus-line-dim, rgba(233,228,218,.38))" stroke-width="1" stroke-linecap="round"/>
<text transform="matrix(0.8660 -0.5000 0.0000 1.0000 559.0 726.9)" font-family="var(--illus-font, ui-monospace, 'JetBrains Mono', 'SF Mono', Menlo, monospace)" font-size="25" font-weight="700" letter-spacing="5" fill="var(--illus-text, #e9e4da)" text-anchor="middle">YOUR DATA</text>
<line x1="372.5" y1="812.7" x2="372.5" y2="722.2" stroke="var(--illus-line, #e9e4da)" stroke-width="1.2" stroke-linecap="round"/>
<line x1="336.0" y1="788.5" x2="336.0" y2="704.2" stroke="var(--illus-line-dim, rgba(233,228,218,.38))" stroke-width="1" stroke-linecap="round"/>
<line x1="332.7" y1="774.0" x2="339.4" y2="777.9" stroke="var(--illus-line-dim, rgba(233,228,218,.38))" stroke-width="1" stroke-linecap="round"/>
<line x1="332.7" y1="744.4" x2="339.4" y2="748.3" stroke="var(--illus-line-dim, rgba(233,228,218,.38))" stroke-width="1" stroke-linecap="round"/>
<line x1="332.7" y1="714.8" x2="339.4" y2="718.7" stroke="var(--illus-line-dim, rgba(233,228,218,.38))" stroke-width="1" stroke-linecap="round"/>
<line x1="363.1" y1="804.1" x2="363.1" y2="719.8" stroke="var(--illus-line-dim, rgba(233,228,218,.38))" stroke-width="1" stroke-linecap="round"/>
<line x1="359.7" y1="789.6" x2="366.4" y2="793.5" stroke="var(--illus-line-dim, rgba(233,228,218,.38))" stroke-width="1" stroke-linecap="round"/>
<line x1="359.7" y1="760.0" x2="366.4" y2="763.9" stroke="var(--illus-line-dim, rgba(233,228,218,.38))" stroke-width="1" stroke-linecap="round"/>
<line x1="359.7" y1="730.4" x2="366.4" y2="734.3" stroke="var(--illus-line-dim, rgba(233,228,218,.38))" stroke-width="1" stroke-linecap="round"/>
<line x1="382.0" y1="815.0" x2="382.0" y2="730.8" stroke="var(--illus-line-dim, rgba(233,228,218,.38))" stroke-width="1" stroke-linecap="round"/>
<line x1="378.6" y1="800.6" x2="385.3" y2="804.5" stroke="var(--illus-line-dim, rgba(233,228,218,.38))" stroke-width="1" stroke-linecap="round"/>
<line x1="378.6" y1="770.9" x2="385.3" y2="774.8" stroke="var(--illus-line-dim, rgba(233,228,218,.38))" stroke-width="1" stroke-linecap="round"/>
<line x1="378.6" y1="741.3" x2="385.3" y2="745.2" stroke="var(--illus-line-dim, rgba(233,228,218,.38))" stroke-width="1" stroke-linecap="round"/>
<line x1="409.0" y1="830.6" x2="409.0" y2="746.4" stroke="var(--illus-line-dim, rgba(233,228,218,.38))" stroke-width="1" stroke-linecap="round"/>
<line x1="405.6" y1="816.2" x2="412.4" y2="820.1" stroke="var(--illus-line-dim, rgba(233,228,218,.38))" stroke-width="1" stroke-linecap="round"/>
<line x1="405.6" y1="786.5" x2="412.4" y2="790.4" stroke="var(--illus-line-dim, rgba(233,228,218,.38))" stroke-width="1" stroke-linecap="round"/>
<line x1="405.6" y1="756.9" x2="412.4" y2="760.8" stroke="var(--illus-line-dim, rgba(233,228,218,.38))" stroke-width="1" stroke-linecap="round"/>
<line x1="363.1" y1="777.6" x2="357.7" y2="779.1" stroke="var(--illus-line, #e9e4da)" stroke-width="1.2" stroke-linecap="round"/>
<line x1="382.0" y1="788.5" x2="387.4" y2="796.3" stroke="var(--illus-line, #e9e4da)" stroke-width="1.2" stroke-linecap="round"/>
<g transform="matrix(0.8660 0.5000 0.0000 1.0000 350.2 756.1)"><rect x="-9" y="0" width="18" height="14" rx="2.5" fill="var(--illus-fill, #0a0c10)" stroke="var(--illus-line, #e9e4da)" stroke-width="1.4"/><path d="M -5.5 0 V -5 A 5.5 5.5 0 0 1 5.5 -5 V 0" fill="none" stroke="var(--illus-line, #e9e4da)" stroke-width="1.4"/><circle cx="0" cy="6.5" r="1.8" fill="none" stroke="var(--illus-line, #e9e4da)" stroke-width="1.1"/></g>
</g>
<rect x="210" y="232" width="258" height="56" fill="var(--illus-fill, #0a0c10)" stroke="var(--illus-line, #e9e4da)" stroke-width="1.5"/>
<line x1="204" y1="232" x2="216" y2="232" stroke="var(--illus-line, #e9e4da)" stroke-width="1.5"/>
<line x1="210" y1="226" x2="210" y2="238" stroke="var(--illus-line, #e9e4da)" stroke-width="1.5"/>
<line x1="462" y1="232" x2="474" y2="232" stroke="var(--illus-line, #e9e4da)" stroke-width="1.5"/>
<line x1="468" y1="226" x2="468" y2="238" stroke="var(--illus-line, #e9e4da)" stroke-width="1.5"/>
<line x1="204" y1="288" x2="216" y2="288" stroke="var(--illus-line, #e9e4da)" stroke-width="1.5"/>
<line x1="210" y1="282" x2="210" y2="294" stroke="var(--illus-line, #e9e4da)" stroke-width="1.5"/>
<line x1="462" y1="288" x2="474" y2="288" stroke="var(--illus-line, #e9e4da)" stroke-width="1.5"/>
<line x1="468" y1="282" x2="468" y2="294" stroke="var(--illus-line, #e9e4da)" stroke-width="1.5"/>
<text x="339.0" y="266.0" font-family="var(--illus-font, ui-monospace, 'JetBrains Mono', 'SF Mono', Menlo, monospace)" font-size="21" font-weight="700" letter-spacing="4" fill="var(--illus-text, #e9e4da)" text-anchor="middle">CONTROL PLANE</text>
<line x1="390" y1="282" x2="397" y2="275" stroke="var(--illus-line-dim, rgba(233,228,218,.38))" stroke-width="1"/>
<line x1="400" y1="282" x2="407" y2="275" stroke="var(--illus-line-dim, rgba(233,228,218,.38))" stroke-width="1"/>
<line x1="410" y1="282" x2="417" y2="275" stroke="var(--illus-line-dim, rgba(233,228,218,.38))" stroke-width="1"/>
<line x1="420" y1="282" x2="427" y2="275" stroke="var(--illus-line-dim, rgba(233,228,218,.38))" stroke-width="1"/>
<line x1="430" y1="282" x2="437" y2="275" stroke="var(--illus-line-dim, rgba(233,228,218,.38))" stroke-width="1"/>
<line x1="440" y1="282" x2="447" y2="275" stroke="var(--illus-line-dim, rgba(233,228,218,.38))" stroke-width="1"/>
<line x1="450" y1="282" x2="457" y2="275" stroke="var(--illus-line-dim, rgba(233,228,218,.38))" stroke-width="1"/>
<polyline points="468,260.0 560,260 500.91305070318975,249.04000000000008" fill="none" stroke="var(--illus-line-dim, rgba(233,228,218,.38))" stroke-width="1.3"/>
<circle cx="500.91305070318975" cy="249.04000000000008" r="3.5" fill="var(--illus-accent, #ff4d00)" stroke="var(--illus-line, #e9e4da)" stroke-width="1.2"/>
<rect x="1196" y="512" width="222" height="56" fill="var(--illus-fill, #0a0c10)" stroke="var(--illus-line, #e9e4da)" stroke-width="1.5"/>
<line x1="1190" y1="512" x2="1202" y2="512" stroke="var(--illus-line, #e9e4da)" stroke-width="1.5"/>
<line x1="1196" y1="506" x2="1196" y2="518" stroke="var(--illus-line, #e9e4da)" stroke-width="1.5"/>
<line x1="1412" y1="512" x2="1424" y2="512" stroke="var(--illus-line, #e9e4da)" stroke-width="1.5"/>
<line x1="1418" y1="506" x2="1418" y2="518" stroke="var(--illus-line, #e9e4da)" stroke-width="1.5"/>
<line x1="1190" y1="568" x2="1202" y2="568" stroke="var(--illus-line, #e9e4da)" stroke-width="1.5"/>
<line x1="1196" y1="562" x2="1196" y2="574" stroke="var(--illus-line, #e9e4da)" stroke-width="1.5"/>
<line x1="1412" y1="568" x2="1424" y2="568" stroke="var(--illus-line, #e9e4da)" stroke-width="1.5"/>
<line x1="1418" y1="562" x2="1418" y2="574" stroke="var(--illus-line, #e9e4da)" stroke-width="1.5"/>
<text x="1307.0" y="546.0" font-family="var(--illus-font, ui-monospace, 'JetBrains Mono', 'SF Mono', Menlo, monospace)" font-size="21" font-weight="700" letter-spacing="4" fill="var(--illus-text, #e9e4da)" text-anchor="middle">DATA PLANE</text>
<line x1="1340" y1="562" x2="1347" y2="555" stroke="var(--illus-line-dim, rgba(233,228,218,.38))" stroke-width="1"/>
<line x1="1350" y1="562" x2="1357" y2="555" stroke="var(--illus-line-dim, rgba(233,228,218,.38))" stroke-width="1"/>
<line x1="1360" y1="562" x2="1367" y2="555" stroke="var(--illus-line-dim, rgba(233,228,218,.38))" stroke-width="1"/>
<line x1="1370" y1="562" x2="1377" y2="555" stroke="var(--illus-line-dim, rgba(233,228,218,.38))" stroke-width="1"/>
<line x1="1380" y1="562" x2="1387" y2="555" stroke="var(--illus-line-dim, rgba(233,228,218,.38))" stroke-width="1"/>
<line x1="1390" y1="562" x2="1397" y2="555" stroke="var(--illus-line-dim, rgba(233,228,218,.38))" stroke-width="1"/>
<line x1="1400" y1="562" x2="1407" y2="555" stroke="var(--illus-line-dim, rgba(233,228,218,.38))" stroke-width="1"/>
<polyline points="1196,540.0 1168,540 1120.2933821243362,465.95" fill="none" stroke="var(--illus-line-dim, rgba(233,228,218,.38))" stroke-width="1.3"/>
<circle cx="1120.2933821243362" cy="465.95" r="3.5" fill="var(--illus-fill, #0a0c10)" stroke="var(--illus-line, #e9e4da)" stroke-width="1.2"/>
<g font-family="var(--illus-font, ui-monospace, 'JetBrains Mono', 'SF Mono', Menlo, monospace)" fill="var(--illus-text-dim, rgba(233,228,218,.55))" font-size="15" letter-spacing="2">
  <text x="64" y="66" fill="var(--illus-text, #e9e4da)" font-weight="600">SPLIT PLANE RAILS&#160;&#160;v1.0</text>
  <text x="64" y="92">PRIVACY BY DESIGN</text>
  <text x="64" y="118">ISOMETRIC VIEW</text>
</g>
<g stroke="var(--illus-line-dim, rgba(233,228,218,.38))" stroke-width="1.3" fill="none" font-family="var(--illus-font, ui-monospace, 'JetBrains Mono', 'SF Mono', Menlo, monospace)" font-size="13">
  <line x1="100" y1="195" x2="100" y2="165"/>
  <line x1="100" y1="195" x2="123" y2="208"/>
  <line x1="100" y1="195" x2="77" y2="208"/>
  <path d="M 100 195 l -23 -13 l 23 -13 l 23 13 Z" opacity="0.6"/>
  <g fill="var(--illus-text-dim, rgba(233,228,218,.55))" stroke="none">
    <text x="96" y="157">Z</text>
    <text x="130" y="213">Y</text>
    <text x="60" y="213">X</text>
  </g>
</g>
<rect x="44" y="864" width="236" height="100" fill="var(--illus-fill, #0a0c10)" opacity="0.92"/>
<rect x="1290" y="864" width="266" height="100" fill="var(--illus-fill, #0a0c10)" opacity="0.92"/>
<g font-family="var(--illus-font, ui-monospace, 'JetBrains Mono', 'SF Mono', Menlo, monospace)" fill="var(--illus-text-dim, rgba(233,228,218,.55))" font-size="15" letter-spacing="2">
  <text x="64" y="896">NEVER TOUCH</text>
  <text x="64" y="922">NEVER MIX</text>
  <text x="64" y="948" fill="var(--illus-accent, #ff4d00)">PRIVACY FIRST</text>
</g>
<g font-family="var(--illus-font, ui-monospace, 'JetBrains Mono', 'SF Mono', Menlo, monospace)" fill="var(--illus-text-dim, rgba(233,228,218,.55))" font-size="15" letter-spacing="2" text-anchor="end">
  <text x="1536" y="896">INSTASAFE</text>
  <text x="1536" y="922">ARCHITECTURE DIAGRAM</text>
  <text x="1536" y="948">FIG. 01</text>
</g>
<polyline points="28,54 28,28 54,28" fill="none" stroke="var(--illus-line-dim, rgba(233,228,218,.38))" stroke-width="2"/>
<polyline points="1572,54 1572,28 1546,28" fill="none" stroke="var(--illus-line-dim, rgba(233,228,218,.38))" stroke-width="2"/>
<polyline points="28,946 28,972 54,972" fill="none" stroke="var(--illus-line-dim, rgba(233,228,218,.38))" stroke-width="2"/>
<polyline points="1572,946 1572,972 1546,972" fill="none" stroke="var(--illus-line-dim, rgba(233,228,218,.38))" stroke-width="2"/>
`;
