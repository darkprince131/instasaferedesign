/* ============================================================
   ztaa-session-art.ts — the eight in-session control scenes.

   Ported from the approved prototype. One scene per control, all on
   the same 620x470 viewBox and the same visual grammar, so switching
   tabs reads as ONE machine changing state rather than eight unrelated
   drawings:

     hairline ... the thing that exists (device, window, key)
     flat ....... inert content (skeleton bars, chrome)
     accent ..... the control doing the work. Only one per scene.
     dashed+x ... the thing attempted that does not happen

   A denial is never red. Denial is dashed and grey — it is absence,
   not an alarm. Keep that if a ninth scene is ever added.

   PORT NOTES
   - The prototype hardcoded whites, greys and the orange wash as hex.
     Those are now `--fsx-*` tokens resolved per theme in featuresplit
     .css; left as hex the whole set would have rendered a white page
     inside a dark one.
   - `<defs>` ids are namespaced per scene. They are referenced by
     url(#id), and two scenes are briefly in the DOM together during a
     cross-fade — duplicate ids would make one steal the other's
     pattern.
   - The watermark scene named "Anita R."; it is Alen J. now, the same
     cast member used across the rest of the site.

   Held as raw markup and injected: this is generated art, and a JSX
   rewrite would add a transcription step for no benefit. Static,
   local, no interpolation, no user input.
   ============================================================ */

export type ZtaaSceneId =
  | "tunnel" | "record" | "clipboard" | "watermark"
  | "timeout" | "screenshot" | "chrome" | "keylogger";

export const ZTAA_SCENES: Record<ZtaaSceneId, string> = {
  tunnel: String.raw`<svg viewBox="0 0 620 470" role="img" aria-label="An encrypted tunnel runs from one laptop to one application. Every other destination is unreachable.">
        <!-- denied branches -->
        <g class="sv-deny">
          <path d="M170 226 C170 160 130 150 108 126"/>
          <path d="M262 226 C262 150 250 132 236 106"/>
          <path d="M400 226 C400 150 424 138 448 116"/>
          <path d="M210 268 C210 336 176 348 152 372"/>
          <path d="M330 268 C330 344 342 358 358 384"/>
          <path d="M446 268 C446 330 476 342 500 364"/>
        </g>
        <g class="sv-deny" fill="none">
          <circle cx="102" cy="120" r="11"/><circle cx="230" cy="100" r="11"/><circle cx="454" cy="110" r="11"/>
          <circle cx="146" cy="378" r="11"/><circle cx="364" cy="390" r="11"/><circle cx="506" cy="370" r="11"/>
        </g>
        <g stroke="var(--fsx-deny)" stroke-width="1.4" stroke-linecap="round">
          <path d="M98 116l8 8M106 116l-8 8"/><path d="M226 96l8 8M234 96l-8 8"/><path d="M450 106l8 8M458 106l-8 8"/>
          <path d="M142 374l8 8M150 374l-8 8"/><path d="M360 386l8 8M368 386l-8 8"/><path d="M502 366l8 8M510 366l-8 8"/>
        </g>

        <!-- laptop -->
        <rect class="sv-frame" x="34" y="196" width="104" height="70" rx="6"/>
        <path class="sv-hair" d="M22 274h128l-10-8H32z"/>
        <path class="sv-o" d="M78 218v18M78 236l8-5v-10l-8-5-8 5v10z"/>

        <!-- tunnel body -->
        <path class="sv-osoft" d="M172 202h276v66H172z" opacity=".55"/>
        <ellipse cx="172" cy="235" rx="13" ry="33" fill="var(--fsx-orange-w)" stroke="var(--fsx-orange)" stroke-width="2"/>
        <ellipse cx="448" cy="235" rx="13" ry="33" fill="none" stroke="var(--fsx-orange)" stroke-width="2"/>
        <g class="sv-o" opacity=".55">
          <path d="M172 212h276"/><path d="M172 224h276"/><path d="M172 246h276"/><path d="M172 258h276"/>
        </g>
        <path class="sv-o an-flow" d="M172 235h276" stroke-width="2.5"/>

        <!-- lock -->
        <circle cx="310" cy="235" r="21" fill="var(--fsx-paper)" stroke="var(--fsx-orange)" stroke-width="2"/>
        <path class="sv-o" d="M304 236h12v9h-12zM306 236v-4a4 4 0 018 0v4"/>

        <!-- label pill -->
        <rect x="222" y="128" width="176" height="30" rx="15" fill="var(--fsx-paper)" stroke="var(--fsx-line-2)" stroke-width="1.5"/>
        <path class="sv-of" d="M244 136l7 3v5c0 3.4-3 5.6-7 6.6-4-1-7-3.2-7-6.6v-5z"/>
        <text class="sv-lbl" x="260" y="147">ENCRYPTED · APP ONLY</text>
        <path class="sv-hair" d="M310 158v34"/>

        <!-- destination app -->
        <rect class="sv-frame" x="474" y="180" width="122" height="112" rx="7"/>
        <path class="sv-chrome" d="M474 187a7 7 0 017-7h108a7 7 0 017 7v13H474z"/>
        <text class="sv-lbl" x="486" y="216">BILLING PORTAL</text>
        <circle cx="492" cy="240" r="9" class="sv-bar-d"/>
        <rect class="sv-bar" x="508" y="234" width="72" height="6" rx="3"/>
        <rect class="sv-bar" x="508" y="246" width="52" height="6" rx="3"/>
        <rect class="sv-bar" x="486" y="262" width="94" height="6" rx="3"/>
        <rect class="sv-bar" x="486" y="274" width="66" height="6" rx="3"/>
        <path class="sv-of" d="M578 190l5 2v4c0 2.4-2.1 3.9-5 4.6-2.9-.7-5-2.2-5-4.6v-4z"/>

        <text class="sv-lbl-d" x="34" y="322">ONE SESSION</text>
        <text class="sv-lbl-d" x="474" y="322">ONE APPLICATION</text>
        <text class="sv-lbl-d" x="34" y="418">SIX DESTINATIONS ATTEMPTED · SIX WITH NO ROUTE</text>
      </svg>`,

  record: String.raw`<svg viewBox="0 0 620 470" role="img" aria-label="An application window is recorded, with a timeline of session events below it.">
        <rect class="sv-frame" x="46" y="34" width="528" height="250" rx="9"/>
        <path class="sv-chrome" d="M46 43a9 9 0 019-9h510a9 9 0 019 9v22H46z"/>
        <circle cx="66" cy="54" r="4" class="sv-denyf"/><circle cx="80" cy="54" r="4" class="sv-denyf"/><circle cx="94" cy="54" r="4" class="sv-denyf"/>

        <rect x="452" y="44" width="106" height="22" rx="11" fill="var(--fsx-paper)" stroke="var(--fsx-orange)" stroke-width="1.5"/>
        <circle class="sv-of an-pulse" cx="468" cy="55" r="4.5"/>
        <text class="sv-lbl-o" x="479" y="59">RECORDING</text>

        <!-- sidebar -->
        <path class="sv-hair" d="M108 65v219"/>
        <g class="sv-bar-d">
          <rect x="68" y="86" width="22" height="16" rx="3"/><rect x="68" y="114" width="22" height="16" rx="3"/>
          <rect x="68" y="142" width="22" height="16" rx="3"/><rect x="68" y="170" width="22" height="16" rx="3"/>
        </g>
        <!-- content -->
        <g class="sv-bar">
          <rect x="130" y="88" width="150" height="9" rx="4"/><rect x="130" y="108" width="196" height="7" rx="3"/>
          <rect x="130" y="124" width="164" height="7" rx="3"/><rect x="130" y="152" width="90" height="7" rx="3"/>
          <rect x="130" y="168" width="90" height="7" rx="3"/><rect x="130" y="184" width="90" height="7" rx="3"/>
          <rect x="238" y="152" width="90" height="7" rx="3"/><rect x="238" y="168" width="90" height="7" rx="3"/>
          <rect x="238" y="184" width="90" height="7" rx="3"/>
        </g>
        <rect class="sv-hair" x="360" y="86" width="190" height="86" rx="6"/>
        <path class="sv-hair" d="M372 152l30-24 26 16 30-34 28 22"/>
        <rect class="sv-hair" x="360" y="186" width="190" height="80" rx="6"/>
        <g class="sv-bar"><rect x="374" y="202" width="70" height="6" rx="3"/><rect x="374" y="218" width="118" height="6" rx="3"/><rect x="374" y="234" width="94" height="6" rx="3"/></g>

        <!-- timeline -->
        <path class="sv-o" d="M78 366h472" opacity=".35"/>
        <g class="an-play"><circle class="sv-of" cx="78" cy="366" r="6"/></g>
        <g>
          <circle cx="118" cy="366" r="19" fill="var(--fsx-paper)" stroke="var(--fsx-orange)" stroke-width="2"/>
          <path class="sv-o" d="M110 362h6l2-3h6v10h-14z" stroke-width="1.6"/>
          <text class="sv-lbl" x="118" y="404" text-anchor="middle">OPEN</text>

          <circle cx="222" cy="366" r="19" fill="var(--fsx-paper)" stroke="var(--fsx-orange)" stroke-width="2"/>
          <path class="sv-o" d="M213 366s4-6 9-6 9 6 9 6-4 6-9 6-9-6-9-6z" stroke-width="1.6"/><circle class="sv-of" cx="222" cy="366" r="2.2"/>
          <text class="sv-lbl" x="222" y="404" text-anchor="middle">VIEW</text>

          <circle cx="326" cy="366" r="19" fill="var(--fsx-paper)" stroke="var(--fsx-orange)" stroke-width="2"/>
          <path class="sv-o" d="M319 373l2-6 10-10 4 4-10 10z" stroke-width="1.6"/>
          <text class="sv-lbl" x="326" y="404" text-anchor="middle">EDIT</text>

          <circle cx="430" cy="366" r="19" fill="var(--fsx-paper)" stroke="var(--fsx-orange)" stroke-width="2"/>
          <path class="sv-o" d="M423 366l5 5 10-10" stroke-width="1.8"/>
          <text class="sv-lbl" x="430" y="404" text-anchor="middle">APPROVE</text>

          <circle cx="534" cy="366" r="19" fill="var(--fsx-paper)" stroke="var(--fsx-orange)" stroke-width="2"/>
          <path class="sv-o" d="M528 359h-5v14h5M531 366h9m-3-3l3 3-3 3" stroke-width="1.6"/>
          <text class="sv-lbl" x="534" y="404" text-anchor="middle">EXIT</text>
        </g>
        <text class="sv-lbl-d" x="46" y="440">EVERY ACTION TIMESTAMPED · REPLAYABLE · EXPORTABLE TO SIEM</text>
      </svg>`,

  clipboard: String.raw`<svg viewBox="0 0 620 470" role="img" aria-label="Data copied inside the application cannot cross out of the session.">
        <rect class="sv-frame" x="34" y="128" width="212" height="216" rx="9"/>
        <path class="sv-chrome" d="M34 137a9 9 0 019-9h194a9 9 0 019 9v20H34z"/>
        <circle cx="52" cy="147" r="3.6" class="sv-denyf"/><circle cx="64" cy="147" r="3.6" class="sv-denyf"/><circle cx="76" cy="147" r="3.6" class="sv-denyf"/>
        <g>
          <circle cx="60" cy="186" r="9" class="sv-bar-d"/><rect class="sv-bar" x="80" y="182" width="86" height="8" rx="4"/>
          <circle cx="60" cy="222" r="9" class="sv-bar-d"/><rect class="sv-osoft" x="80" y="218" width="86" height="8" rx="4"/>
          <circle cx="60" cy="258" r="9" class="sv-bar-d"/><rect class="sv-bar" x="80" y="254" width="86" height="8" rx="4"/>
          <circle cx="60" cy="294" r="9" class="sv-bar-d"/><rect class="sv-bar" x="80" y="290" width="86" height="8" rx="4"/>
          <g class="sv-denyf" opacity=".7">
            <circle cx="192" cy="186" r="2.6"/><circle cx="202" cy="186" r="2.6"/><circle cx="212" cy="186" r="2.6"/><circle cx="222" cy="186" r="2.6"/>
            <circle cx="192" cy="222" r="2.6"/><circle cx="202" cy="222" r="2.6"/><circle cx="212" cy="222" r="2.6"/><circle cx="222" cy="222" r="2.6"/>
            <circle cx="192" cy="258" r="2.6"/><circle cx="202" cy="258" r="2.6"/><circle cx="212" cy="258" r="2.6"/><circle cx="222" cy="258" r="2.6"/>
            <circle cx="192" cy="294" r="2.6"/><circle cx="202" cy="294" r="2.6"/><circle cx="212" cy="294" r="2.6"/><circle cx="222" cy="294" r="2.6"/>
          </g>
        </g>

        <!-- travelling clipboard, stops at the boundary -->
        <g class="an-bump">
          <rect x="284" y="182" width="76" height="102" rx="8" fill="var(--fsx-paper)" stroke="var(--fsx-orange)" stroke-width="2"/>
          <rect x="308" y="174" width="28" height="15" rx="4" fill="var(--fsx-paper)" stroke="var(--fsx-line-2)" stroke-width="1.5"/>
          <rect class="sv-osoft" x="298" y="206" width="48" height="8" rx="4"/>
          <rect class="sv-of" x="298" y="224" width="34" height="8" rx="4" opacity=".85"/>
          <rect class="sv-bar" x="298" y="242" width="48" height="8" rx="4"/>
          <rect class="sv-bar" x="298" y="260" width="30" height="8" rx="4"/>
        </g>
        <path class="sv-o" d="M256 233h20m-6-5l6 5-6 5" stroke-width="1.8"/>

        <!-- boundary -->
        <path d="M436 118l18 12v206l-18 12z" fill="var(--fsx-orange-w)"/>
        <path class="sv-o" d="M436 118v230" stroke-width="4"/>
        <circle cx="436" cy="233" r="19" fill="var(--fsx-paper)" stroke="var(--fsx-orange)" stroke-width="2"/>
        <path class="sv-o" d="M430 234h12v9h-12zM432 234v-4a4 4 0 018 0v4" stroke-width="1.6"/>
        <text class="sv-lbl-o" x="392" y="106">SESSION BOUNDARY</text>

        <!-- ghost destination -->
        <rect x="504" y="182" width="76" height="102" rx="8" class="sv-deny"/>
        <rect x="528" y="174" width="28" height="15" rx="4" class="sv-deny"/>
        <circle cx="542" cy="233" r="15" class="sv-deny"/>
        <path stroke="var(--fsx-deny)" stroke-width="1.6" stroke-linecap="round" d="M536 227l12 12M548 227l-12 12"/>
        <path class="sv-deny" d="M462 233h30"/>
        <text class="sv-lbl-d" x="504" y="312">LOCAL CLIPBOARD</text>
        <text class="sv-lbl-d" x="504" y="330">NEVER RECEIVES IT</text>

        <text class="sv-lbl-d" x="34" y="392">COPY, CUT AND PASTE ARE POLICY DECISIONS — SET PER APPLICATION,</text>
        <text class="sv-lbl-d" x="34" y="410">IN ONE DIRECTION OR BOTH</text>
      </svg>`,

  watermark: String.raw`<svg viewBox="0 0 620 470" role="img" aria-label="The application screen carries a repeating watermark of the user name and timestamp.">
        <defs>
          <pattern id="ztaa-watermark-wm" width="196" height="104" patternUnits="userSpaceOnUse" patternTransform="rotate(-24)">
            <text x="0" y="26" font-family="var(--fsx-font-mono)" font-size="15" fill="var(--fsx-orange)" opacity=".26" letter-spacing="1">ALEN J. · 13:42</text>
            <text x="76" y="78" font-family="var(--fsx-font-mono)" font-size="15" fill="var(--fsx-orange)" opacity=".26" letter-spacing="1">10.4.9.22</text>
          </pattern>
          <clipPath id="ztaa-watermark-wmclip"><rect x="52" y="58" width="516" height="272" rx="9"/></clipPath>
        </defs>

        <rect class="sv-frame" x="52" y="58" width="516" height="272" rx="9"/>
        <path class="sv-chrome" d="M52 67a9 9 0 019-9h498a9 9 0 019 9v22H52z"/>
        <circle cx="72" cy="78" r="4" class="sv-denyf"/><circle cx="86" cy="78" r="4" class="sv-denyf"/><circle cx="100" cy="78" r="4" class="sv-denyf"/>

        <path class="sv-hair" d="M114 89v241"/>
        <g class="sv-bar-d"><rect x="74" y="108" width="24" height="9" rx="4"/><rect x="74" y="126" width="24" height="9" rx="4"/></g>
        <g class="sv-bar">
          <rect x="136" y="110" width="180" height="9" rx="4"/><rect x="136" y="130" width="230" height="7" rx="3"/>
          <rect x="136" y="146" width="196" height="7" rx="3"/>
        </g>
        <rect class="sv-hair" x="136" y="172" width="230" height="128" rx="6"/>
        <g class="sv-bar"><rect x="150" y="188" width="60" height="7" rx="3"/><rect x="230" y="188" width="60" height="7" rx="3"/><rect x="150" y="212" width="60" height="7" rx="3"/><rect x="230" y="212" width="60" height="7" rx="3"/><rect x="150" y="236" width="60" height="7" rx="3"/><rect x="230" y="236" width="60" height="7" rx="3"/></g>
        <rect class="sv-hair" x="386" y="172" width="162" height="128" rx="6"/>
        <g class="sv-bar-d"><rect x="404" y="252" width="18" height="34" rx="3"/><rect x="430" y="232" width="18" height="54" rx="3"/><rect x="456" y="212" width="18" height="74" rx="3"/><rect x="482" y="240" width="18" height="46" rx="3"/><rect x="508" y="196" width="18" height="90" rx="3"/></g>

        <!-- the watermark itself, drifting -->
        <g clip-path="url(#ztaa-watermark-wmclip)">
          <rect class="an-drift" x="-140" y="-60" width="900" height="560" fill="url(#ztaa-watermark-wm)"/>
        </g>

        <rect x="352" y="352" width="216" height="60" rx="8" fill="var(--fsx-paper)" stroke="var(--fsx-orange)" stroke-width="2"/>
        <text x="370" y="380" font-family="var(--fsx-font-mono)" font-size="21" font-weight="700" fill="var(--fsx-orange)" letter-spacing="1">ALEN J.</text>
        <circle class="sv-of an-pulse" cx="376" cy="396" r="4.5"/>
        <text class="sv-lbl-o" x="388" y="400">LIVE SESSION · 13:42</text>

        <text class="sv-lbl-d" x="52" y="378">A PHOTOGRAPH OF THE SCREEN STILL</text>
        <text class="sv-lbl-d" x="52" y="396">CARRIES THE NAME, THE IP AND THE</text>
        <text class="sv-lbl-d" x="52" y="414">MINUTE IT WAS TAKEN.</text>
      </svg>`,

  timeout: String.raw`<svg viewBox="0 0 620 470" role="img" aria-label="An idle session counts down and closes itself.">
        <rect class="sv-frame" x="52" y="46" width="516" height="284" rx="9" opacity=".55"/>
        <path class="sv-chrome" d="M52 55a9 9 0 019-9h498a9 9 0 019 9v22H52z" opacity=".6"/>
        <circle cx="72" cy="66" r="4" class="sv-denyf"/><circle cx="86" cy="66" r="4" class="sv-denyf"/><circle cx="100" cy="66" r="4" class="sv-denyf"/>
        <g class="sv-bar" opacity=".45">
          <rect x="80" y="102" width="180" height="9" rx="4"/><rect x="80" y="122" width="240" height="7" rx="3"/>
          <rect x="80" y="138" width="200" height="7" rx="3"/><rect x="80" y="252" width="150" height="7" rx="3"/>
          <rect x="80" y="270" width="210" height="7" rx="3"/><rect x="360" y="252" width="170" height="7" rx="3"/>
          <rect x="360" y="270" width="120" height="7" rx="3"/>
        </g>

        <!-- countdown ring -->
        <circle cx="310" cy="188" r="57" fill="var(--fsx-paper)" stroke="var(--fsx-line-2)" stroke-width="1.5"/>
        <circle cx="310" cy="188" r="57" fill="none" stroke="var(--fsx-fill)" stroke-width="7"/>
        <circle class="an-ring" cx="310" cy="188" r="57" fill="none" stroke="var(--fsx-orange)" stroke-width="7"
                stroke-linecap="round" stroke-dasharray="358" stroke-dashoffset="0" transform="rotate(-90 310 188)"/>
        <text x="310" y="184" text-anchor="middle" font-family="var(--fsx-font-mono)" font-size="30" font-weight="700" fill="var(--fsx-orange)">00:15</text>
        <text class="sv-lbl" x="310" y="206" text-anchor="middle">UNTIL LOCK</text>

        <!-- idle trace -->
        <path class="sv-hair" d="M96 372h116" />
        <path class="sv-o" d="M96 372l10-16 9 30 8-24 9 18 8-8h14" stroke-width="1.8"/>
        <path class="sv-deny" d="M270 372h254"/>
        <text class="sv-lbl" x="96" y="348">LAST INPUT</text>
        <text class="sv-lbl-d" x="270" y="348">NO KEYSTROKE, NO POINTER, NO SCROLL — 5 MIN</text>
        <circle cx="270" cy="372" r="5" class="sv-of"/>

        <text class="sv-lbl-d" x="52" y="428">THE SESSION CLOSES ITSELF. THE NEXT PERSON AT THAT DESK GETS A LOGIN SCREEN.</text>
      </svg>`,

  screenshot: String.raw`<svg viewBox="0 0 620 470" role="img" aria-label="A screen capture of the application returns an empty frame.">
        <rect class="sv-frame" x="40" y="52" width="300" height="216" rx="9"/>
        <path class="sv-chrome" d="M40 61a9 9 0 019-9h282a9 9 0 019 9v20H40z"/>
        <circle cx="58" cy="71" r="3.6" class="sv-denyf"/><circle cx="70" cy="71" r="3.6" class="sv-denyf"/><circle cx="82" cy="71" r="3.6" class="sv-denyf"/>
        <g class="sv-bar">
          <rect x="62" y="104" width="120" height="8" rx="4"/><rect x="62" y="122" width="180" height="6" rx="3"/>
          <rect x="62" y="136" width="150" height="6" rx="3"/>
        </g>
        <rect class="sv-hair" x="62" y="160" width="120" height="88" rx="5"/>
        <rect class="sv-hair" x="196" y="160" width="122" height="88" rx="5"/>
        <g class="sv-bar-d"><rect x="212" y="212" width="14" height="26" rx="2"/><rect x="234" y="196" width="14" height="42" rx="2"/><rect x="256" y="180" width="14" height="58" rx="2"/><rect x="278" y="204" width="14" height="34" rx="2"/></g>

        <!-- capture brackets + flash -->
        <g class="sv-o" stroke-width="2.5">
          <path d="M30 74v-16h16M334 58h16v16M350 246v16h-16M46 262H30v-16"/>
        </g>
        <rect class="an-shutter" x="40" y="52" width="300" height="216" rx="9" fill="var(--fsx-paper)"/>

        <!-- shutter -->
        <circle cx="190" cy="322" r="23" fill="var(--fsx-paper)" stroke="var(--fsx-orange)" stroke-width="2"/>
        <path class="sv-o" d="M180 316h4l2-3h8l2 3h4v13h-20z" stroke-width="1.6"/>
        <circle class="sv-o" cx="190" cy="322" r="4" stroke-width="1.6"/>
        <path class="sv-o" d="M226 322h58m-8-7l8 7-8 7" stroke-width="1.8"/>

        <!-- the result -->
        <defs>
          <pattern id="ztaa-screenshot-void" width="9" height="9" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
            <path d="M0 0v9" stroke="var(--fsx-fill-2)" stroke-width="1.4"/>
          </pattern>
        </defs>
        <rect x="382" y="86" width="196" height="150" rx="8" fill="url(#ztaa-screenshot-void)" stroke="var(--fsx-deny)" stroke-width="1.6" stroke-dasharray="5 5"/>
        <circle cx="480" cy="161" r="21" fill="var(--fsx-canvas)" stroke="var(--fsx-deny)" stroke-width="1.6"/>
        <path stroke="var(--fsx-deny-2)" stroke-width="1.8" stroke-linecap="round" d="M472 153l16 16M488 153l-16 16"/>
        <text class="sv-lbl-d" x="382" y="262" >SAVED FILE · 0 PIXELS OF THE APP</text>

        <text class="sv-lbl-d" x="40" y="400">NATIVE CAPTURE, SNIPPING TOOL, SCREEN SHARE AND RECORDING</text>
        <text class="sv-lbl-d" x="40" y="418">SOFTWARE ALL RETURN THE SAME EMPTY FRAME.</text>
      </svg>`,

  chrome: String.raw`<svg viewBox="0 0 620 470" role="img" aria-label="Browser controls such as print, download and developer tools are removed for the session.">
        <rect class="sv-frame" x="46" y="62" width="528" height="230" rx="9"/>
        <path class="sv-chrome" d="M46 71a9 9 0 019-9h510a9 9 0 019 9v42H46z"/>
        <circle cx="66" cy="86" r="4" class="sv-denyf"/><circle cx="80" cy="86" r="4" class="sv-denyf"/><circle cx="94" cy="86" r="4" class="sv-denyf"/>

        <!-- nav + locked address bar -->
        <path class="sv-hair" d="M124 94h12m-4-4l-4 4 4 4"/>
        <path class="sv-deny" d="M154 94h12m-4-4l4 4-4 4" stroke-dasharray="0"/>
        <rect x="184" y="82" width="286" height="25" rx="12.5" fill="var(--fsx-paper)" stroke="var(--fsx-line-2)" stroke-width="1.5"/>
        <path class="sv-of" d="M200 90h9v7h-9zM201.5 90v-3a3 3 0 016 0v3"/>
        <text class="sv-lbl" x="218" y="99">billing.internal — locked to this session</text>

        <!-- removed controls, right of the bar -->
        <g>
          <circle cx="500" cy="94" r="13" class="sv-deny"/>
          <path stroke="var(--fsx-deny)" stroke-width="1.5" stroke-linecap="round" d="M495 89l10 10M505 89l-10 10"/>
          <circle cx="536" cy="94" r="13" class="sv-deny"/>
          <path stroke="var(--fsx-deny)" stroke-width="1.5" stroke-linecap="round" d="M531 89l10 10M541 89l-10 10"/>
        </g>

        <g class="sv-bar">
          <rect x="76" y="140" width="170" height="9" rx="4"/><rect x="76" y="160" width="230" height="7" rx="3"/>
          <rect x="76" y="176" width="190" height="7" rx="3"/>
        </g>
        <rect class="sv-hair" x="76" y="204" width="212" height="70" rx="6"/>
        <rect class="sv-hair" x="312" y="140" width="232" height="134" rx="6"/>

        <!-- control ledger -->
        <text class="sv-lbl-d" x="46" y="342">CONTROLS FOR THIS SESSION</text>
        <g>
          <rect x="46" y="356" width="160" height="34" rx="17" fill="var(--fsx-paper)" stroke="var(--fsx-line-2)" stroke-width="1.5"/>
          <path class="sv-o" d="M66 373l4 4 8-8" stroke-width="1.8"/>
          <text class="sv-lbl" x="88" y="377">Reload</text>

          <rect x="216" y="356" width="160" height="34" rx="17" class="sv-deny"/>
          <path stroke="var(--fsx-deny)" stroke-width="1.6" stroke-linecap="round" d="M232 368l9 9M241 368l-9 9"/>
          <text class="sv-lbl-d" x="254" y="377">Print</text>

          <rect x="386" y="356" width="188" height="34" rx="17" class="sv-deny"/>
          <path stroke="var(--fsx-deny)" stroke-width="1.6" stroke-linecap="round" d="M402 368l9 9M411 368l-9 9"/>
          <text class="sv-lbl-d" x="424" y="377">Download</text>

          <rect x="46" y="400" width="160" height="34" rx="17" class="sv-deny"/>
          <path stroke="var(--fsx-deny)" stroke-width="1.6" stroke-linecap="round" d="M62 412l9 9M71 412l-9 9"/>
          <text class="sv-lbl-d" x="84" y="421">Developer tools</text>

          <rect x="216" y="400" width="160" height="34" rx="17" class="sv-deny"/>
          <path stroke="var(--fsx-deny)" stroke-width="1.6" stroke-linecap="round" d="M232 412l9 9M241 412l-9 9"/>
          <text class="sv-lbl-d" x="254" y="421">Extensions</text>

          <rect x="386" y="400" width="188" height="34" rx="17" class="sv-deny"/>
          <path stroke="var(--fsx-deny)" stroke-width="1.6" stroke-linecap="round" d="M402 412l9 9M411 412l-9 9"/>
          <text class="sv-lbl-d" x="424" y="421">Save page · view source</text>
        </g>
      </svg>`,

  keylogger: String.raw`<svg viewBox="0 0 620 470" role="img" aria-label="Keystrokes are encrypted at the keyboard, so a keylogger reads only noise.">
        <!-- what the app receives -->
        <rect class="sv-frame" x="40" y="40" width="238" height="96" rx="8"/>
        <text class="sv-lbl" x="58" y="70">THE APPLICATION RECEIVES</text>
        <text x="58" y="106" font-family="var(--fsx-font-mono)" font-size="20" fill="var(--fsx-orange)" letter-spacing="2">Tr0ub4dour&amp;3</text>

        <!-- what a hook receives -->
        <rect x="342" y="40" width="238" height="96" rx="8" class="sv-deny"/>
        <text class="sv-lbl-d" x="360" y="70">A KEYBOARD HOOK RECEIVES</text>
        <text x="360" y="106" font-family="var(--fsx-font-mono)" font-size="20" fill="var(--fsx-deny-2)" letter-spacing="2">◆⁘⌁ ⍜⌇◆⁘ ⌁⍜⌇</text>
        <circle cx="562" cy="58" r="11" class="sv-deny"/>
        <path stroke="var(--fsx-deny)" stroke-width="1.5" stroke-linecap="round" d="M558 54l8 8M566 54l-8 8"/>

        <!-- encryption membrane -->
        <path class="sv-o" d="M64 214 C180 178 440 178 556 214" stroke-width="2.5"/>
        <path d="M64 214 C180 178 440 178 556 214 L556 224 C440 188 180 188 64 224 Z" fill="var(--fsx-orange-w)"/>
        <circle cx="310" cy="192" r="20" fill="var(--fsx-paper)" stroke="var(--fsx-orange)" stroke-width="2"/>
        <path class="sv-o" d="M304 193h12v9h-12zM306 193v-4a4 4 0 018 0v4" stroke-width="1.6"/>
        <text class="sv-lbl-o" x="310" y="248" text-anchor="middle">ENCRYPTED AT THE KEY, NOT AT THE APP</text>

        <!-- rising keystrokes -->
        <g font-family="var(--fsx-font-mono)" font-size="17" fill="var(--fsx-orange)" font-weight="600">
          <text class="an-rise"   x="152" y="326">T</text>
          <text class="an-rise-2" x="292" y="326">r</text>
          <text class="an-rise-3" x="432" y="326">0</text>
        </g>

        <!-- keyboard -->
        <rect class="sv-frame" x="64" y="336" width="492" height="106" rx="10"/>
        <g fill="var(--fsx-paper)" stroke="var(--fsx-line-2)" stroke-width="1.4">
          <rect x="80" y="350" width="34" height="26" rx="5"/><rect x="120" y="350" width="34" height="26" rx="5"/>
          <rect x="160" y="350" width="34" height="26" rx="5"/><rect x="200" y="350" width="34" height="26" rx="5"/>
          <rect x="240" y="350" width="34" height="26" rx="5"/><rect x="280" y="350" width="34" height="26" rx="5"/>
          <rect x="320" y="350" width="34" height="26" rx="5"/><rect x="360" y="350" width="34" height="26" rx="5"/>
          <rect x="400" y="350" width="34" height="26" rx="5"/><rect x="440" y="350" width="34" height="26" rx="5"/>
          <rect x="480" y="350" width="60" height="26" rx="5"/>
          <rect x="92" y="384" width="34" height="26" rx="5"/><rect x="132" y="384" width="34" height="26" rx="5"/>
          <rect x="172" y="384" width="34" height="26" rx="5"/><rect x="212" y="384" width="34" height="26" rx="5"/>
          <rect x="252" y="384" width="34" height="26" rx="5"/><rect x="292" y="384" width="34" height="26" rx="5"/>
          <rect x="332" y="384" width="34" height="26" rx="5"/><rect x="372" y="384" width="34" height="26" rx="5"/>
          <rect x="412" y="384" width="34" height="26" rx="5"/><rect x="452" y="384" width="88" height="26" rx="5"/>
        </g>
        <rect x="140" y="418" width="336" height="14" rx="7" fill="var(--fsx-paper)" stroke="var(--fsx-line-2)" stroke-width="1.4"/>
        <rect x="141" y="351" width="32" height="24" rx="4" class="sv-osoft"/>
      </svg>`,

};
