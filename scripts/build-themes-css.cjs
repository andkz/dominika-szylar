const fs = require('fs');

const themes = [
  {
    id: "kaszmir-piasek",
    name: "1. Ciepły Kaszmir & Piasek (Domyślny)",
    color1: "#faf8f5", // Jasny kaszmir (odpowiednik bieli w tym spektrum)
    color2: "#f3efe8", // Piaskowy kaszmir (subtelny odcień o 2.5% głębszy - jak #ffffff vs #f8f8f8)
    cardIn1: "#f3efe8",
    cardIn2: "#faf8f5",
    cardBorder: "#e6decb",
    cardShadow: "0 8px 24px -6px rgba(60, 40, 25, 0.05)",
    textPrimary: "#2c231e",
    textSecondary: "#5c4e43",
    textMuted: "#8a796e",
    accent: "#b06543",
    accentHover: "#965233",
    accentText: "#ffffff",
    secBtnBg: "#f3efe8",
    secBtnBorder: "#dacfc0",
    secBtnText: "#2c231e",
    badgeBg: "#ede4d8",
    badgeBorder: "#ded1c0",
    badgeText: "#5a3421",
    ctaBg: "#2d221c",
    ctaText: "#faf8f5",
    ctaMuted: "#c8baa9",
    navBg: "rgba(250, 248, 245, 0.95)",
    cardRadius: "16px",
    btnRadius: "8px",
    badgeRadius: "999px"
  },
  {
    id: "szalwiowy-spokoj",
    name: "2. Szałwiowa Harmonia",
    color1: "#f5f8f5", // Bardzo jasna, kojąca szałwia
    color2: "#edf3ed", // Spokojna szałwia (ten sam kolor, 2.5% głębszy)
    cardIn1: "#edf3ed",
    cardIn2: "#f5f8f5",
    cardBorder: "#dce6dd",
    cardShadow: "0 8px 24px -6px rgba(30, 55, 40, 0.05)",
    textPrimary: "#1b2d22",
    textSecondary: "#455c4e",
    textMuted: "#6e8677",
    accent: "#2d654a",
    accentHover: "#23503a",
    accentText: "#ffffff",
    secBtnBg: "#edf3ed",
    secBtnBorder: "#cadccd",
    secBtnText: "#1b2d22",
    badgeBg: "#e0ede2",
    badgeBorder: "#cbded0",
    badgeText: "#1d4734",
    ctaBg: "#1a2c21",
    ctaText: "#f5f8f5",
    ctaMuted: "#b8cfc0",
    navBg: "rgba(245, 248, 245, 0.95)",
    cardRadius: "16px",
    btnRadius: "999px",
    badgeRadius: "999px"
  },
  {
    id: "alabaster-krem",
    name: "3. Kremowy Alabaster",
    color1: "#faf9f7", // Alabastrowy krem
    color2: "#f2efe9", // Subtelny alabaster (2.5% głębszy)
    cardIn1: "#f2efe9",
    cardIn2: "#faf9f7",
    cardBorder: "#dedad1",
    cardShadow: "0 6px 20px -4px rgba(40, 40, 45, 0.05)",
    textPrimary: "#232427",
    textSecondary: "#52555e",
    textMuted: "#80848f",
    accent: "#32353c",
    accentHover: "#1d1f23",
    accentText: "#faf9f7",
    secBtnBg: "#f2efe9",
    secBtnBorder: "#d2cebf",
    secBtnText: "#232427",
    badgeBg: "#e9e5db",
    badgeBorder: "#d7d2c3",
    badgeText: "#32353c",
    ctaBg: "#232427",
    ctaText: "#faf9f7",
    ctaMuted: "#abaeb9",
    navBg: "rgba(250, 249, 247, 0.95)",
    cardRadius: "12px",
    btnRadius: "6px",
    badgeRadius: "6px"
  },
  {
    id: "gleboki-mech",
    name: "4. Głęboki Mech & Złoto",
    color1: "#f4f7f3", // Jasny leśny mech
    color2: "#edf2eb", // Oliwkowy mech (2.5% głębszy)
    cardIn1: "#edf2eb",
    cardIn2: "#f4f7f3",
    cardBorder: "#d8e3d6",
    cardShadow: "0 8px 24px -6px rgba(25, 45, 30, 0.06)",
    textPrimary: "#17271c",
    textSecondary: "#3d5345",
    textMuted: "#688070",
    accent: "#1f412c",
    accentHover: "#152e1e",
    accentText: "#ffffff",
    secBtnBg: "#edf2eb",
    secBtnBorder: "#cad9c6",
    secBtnText: "#17271c",
    badgeBg: "#dfeade",
    badgeBorder: "#c8dbca",
    badgeText: "#173423",
    ctaBg: "#16271c",
    ctaText: "#f4f7f3",
    ctaMuted: "#b4c9b9",
    navBg: "rgba(244, 247, 243, 0.95)",
    cardRadius: "14px",
    btnRadius: "6px",
    badgeRadius: "6px"
  },
  {
    id: "pudrowy-kwiat",
    name: "5. Puder & Jedwab",
    color1: "#faf5f3", // Jasny pudrowy nude
    color2: "#f4ece9", // Różany beż (2.5% głębszy)
    cardIn1: "#f4ece9",
    cardIn2: "#faf5f3",
    cardBorder: "#e7dbd7",
    cardShadow: "0 8px 24px -6px rgba(90, 45, 55, 0.05)",
    textPrimary: "#342226",
    textSecondary: "#634c52",
    textMuted: "#8f737a",
    accent: "#9c5364",
    accentHover: "#824050",
    accentText: "#ffffff",
    secBtnBg: "#f4ece9",
    secBtnBorder: "#ddcbc6",
    secBtnText: "#342226",
    badgeBg: "#ebdcd7",
    badgeBorder: "#dcbeb5",
    badgeText: "#6b2c3a",
    ctaBg: "#342024",
    ctaText: "#faf5f3",
    ctaMuted: "#cfb9be",
    navBg: "rgba(250, 245, 243, 0.95)",
    cardRadius: "20px",
    btnRadius: "999px",
    badgeRadius: "999px"
  },
  {
    id: "terakota-ziemia",
    name: "6. Terakota & Glinka",
    color1: "#fbf6f2", // Jasna glinka
    color2: "#f4ede6", // Ciepły piaskowiec (2.5% głębszy)
    cardIn1: "#f4ede6",
    cardIn2: "#fbf6f2",
    cardBorder: "#e6dad0",
    cardShadow: "0 8px 24px -6px rgba(90, 40, 25, 0.06)",
    textPrimary: "#33221b",
    textSecondary: "#604a40",
    textMuted: "#8e756a",
    accent: "#a85536",
    accentHover: "#8f4429",
    accentText: "#ffffff",
    secBtnBg: "#f4ede6",
    secBtnBorder: "#dbcabf",
    secBtnText: "#33221b",
    badgeBg: "#e9dcd2",
    badgeBorder: "#dbc5b5",
    badgeText: "#743018",
    ctaBg: "#322019",
    ctaText: "#fbf6f2",
    ctaMuted: "#ccb8ae",
    navBg: "rgba(251, 246, 242, 0.95)",
    cardRadius: "16px",
    btnRadius: "10px",
    badgeRadius: "999px"
  },
  {
    id: "morska-bryza",
    name: "7. Morska Bryza & Mięta",
    color1: "#f4f8f8", // Poranna bryza
    color2: "#ebf2f2", // Kojąca mięta (2.5% głębszy)
    cardIn1: "#ebf2f2",
    cardIn2: "#f4f8f8",
    cardBorder: "#d4e3e3",
    cardShadow: "0 8px 24px -6px rgba(20, 50, 55, 0.05)",
    textPrimary: "#13272b",
    textSecondary: "#3e575b",
    textMuted: "#688488",
    accent: "#19646e",
    accentHover: "#114c54",
    accentText: "#ffffff",
    secBtnBg: "#ebf2f2",
    secBtnBorder: "#c3d7d8",
    secBtnText: "#13272b",
    badgeBg: "#dce8e8",
    badgeBorder: "#c4d8d9",
    badgeText: "#134850",
    ctaBg: "#12262a",
    ctaText: "#f4f8f8",
    ctaMuted: "#b4c9cc",
    navBg: "rgba(244, 248, 248, 0.95)",
    cardRadius: "16px",
    btnRadius: "999px",
    badgeRadius: "999px"
  },
  {
    id: "stary-pergamin",
    name: "8. Stary Pergamin & Antykwa",
    color1: "#f9f6ef", // Szlachetny papier
    color2: "#f1ece2", // Ciepły pergamin (2.5% głębszy)
    cardIn1: "#f1ece2",
    cardIn2: "#f9f6ef",
    cardBorder: "#e0d7c6",
    cardShadow: "0 6px 20px -4px rgba(45, 40, 30, 0.05)",
    textPrimary: "#211d19",
    textSecondary: "#4f483f",
    textMuted: "#7a7164",
    accent: "#2c2620",
    accentHover: "#403830",
    accentText: "#f9f6ef",
    secBtnBg: "#f1ece2",
    secBtnBorder: "#d4c8af",
    secBtnText: "#211d19",
    badgeBg: "#e7dec9",
    badgeBorder: "#d4c6a9",
    badgeText: "#2c2620",
    ctaBg: "#221d18",
    ctaText: "#f9f6ef",
    ctaMuted: "#b8af9c",
    navBg: "rgba(249, 246, 239, 0.95)",
    cardRadius: "4px",
    btnRadius: "4px",
    badgeRadius: "4px"
  },
  {
    id: "sloneczny-bursztyn",
    name: "9. Słoneczny Bursztyn",
    color1: "#faf6ee", // Jasna wanilia
    color2: "#f3ede2", // Bursztynowy krem (2.5% głębszy)
    cardIn1: "#f3ede2",
    cardIn2: "#faf6ee",
    cardBorder: "#e4dac4",
    cardShadow: "0 8px 24px -6px rgba(80, 55, 15, 0.05)",
    textPrimary: "#302514",
    textSecondary: "#5d4d35",
    textMuted: "#897658",
    accent: "#a86c23",
    accentHover: "#8c5617",
    accentText: "#ffffff",
    secBtnBg: "#f3ede2",
    secBtnBorder: "#dbc8a4",
    secBtnText: "#302514",
    badgeBg: "#e9deca",
    badgeBorder: "#d9c5a1",
    badgeText: "#6e4212",
    ctaBg: "#2d2211",
    ctaText: "#faf6ee",
    ctaMuted: "#ccbc9d",
    navBg: "rgba(250, 246, 238, 0.95)",
    cardRadius: "16px",
    btnRadius: "10px",
    badgeRadius: "999px"
  },
  {
    id: "ciemny-aksamit",
    name: "10. Ciemny Aksamit & Miedź",
    color1: "#141318", // Nocny aksamit
    color2: "#1a1920", // Głęboki grafit (2.5% głębszy w ciemności)
    cardIn1: "#1e1d26",
    cardIn2: "#15141c",
    cardBorder: "#2d2b3a",
    cardShadow: "0 12px 36px -6px rgba(0, 0, 0, 0.6)",
    textPrimary: "#f4f1f7",
    textSecondary: "#9f99ab",
    textMuted: "#726d80",
    accent: "#d97a5f",
    accentHover: "#c3674d",
    accentText: "#ffffff",
    secBtnBg: "#1e1d26",
    secBtnBorder: "#393549",
    secBtnText: "#f4f1f7",
    badgeBg: "#262331",
    badgeBorder: "#3f3851",
    badgeText: "#f09b84",
    ctaBg: "#191822",
    ctaText: "#f4f1f7",
    ctaMuted: "#a09aac",
    navBg: "rgba(20, 19, 24, 0.95)",
    cardRadius: "16px",
    btnRadius: "10px",
    badgeRadius: "8px"
  }
];

let css = `@import url('../fonts/variants.css');

/* ==========================================================================
   DOMINIKA SZYLAR - PURE TONAL ZEBRA SYSTEM
   Strictly alternating between two subtle sister tints of the SAME color family:
   Kolor 1 <-> Kolor 2 (like #ffffff and #f8f8f8, but in full harmonic colorways)
   Zero stark white voids, zero harsh contrast, 100% serene medical-aesthetic elegance.
   ========================================================================== */

/* --- Universal Typography Override (Merriweather Light 300) --- */
h1, h2, h3, h4,
[data-framer-component-type="RichTextContainer"] h1,
[data-framer-component-type="RichTextContainer"] h2,
[data-framer-component-type="RichTextContainer"] h3,
[data-framer-component-type="RichTextContainer"] h4 {
  font-family: 'Merriweather', Georgia, serif !important;
  font-weight: 300 !important;
  letter-spacing: -0.015em !important;
}

/* Subtle transitions when switching themes */
html body,
html section,
html footer,
html div,
html a,
html button,
html h1,
html h2,
html h3,
html p {
  transition: background-color 0.2s ease, color 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease;
}

/* Default Theme Applied on :root so there is NEVER an unstyled flash */
:root {
  --ds-color-1: #faf8f5;
  --ds-color-2: #f3efe8;
  --ds-card-in-1: #f3efe8;
  --ds-card-in-2: #faf8f5;
  --ds-card-border: #e6decb;
  --ds-card-shadow: 0 8px 24px -6px rgba(60, 40, 25, 0.05);
  --ds-text-primary: #2c231e;
  --ds-text-secondary: #5c4e43;
  --ds-text-muted: #8a796e;
  --ds-accent: #b06543;
  --ds-accent-hover: #965233;
  --ds-accent-text: #ffffff;
  --ds-secondary-btn-bg: #f3efe8;
  --ds-secondary-btn-border: #dacfc0;
  --ds-secondary-btn-text: #2c231e;
  --ds-badge-bg: #ede4d8;
  --ds-badge-border: #ded1c0;
  --ds-badge-text: #5a3421;
  --ds-cta-bg: #2d221c;
  --ds-cta-text: #faf8f5;
  --ds-cta-muted: #c8baa9;
  --ds-nav-bg: rgba(250, 248, 245, 0.95);
  --ds-card-radius: 16px;
  --ds-btn-radius: 8px;
  --ds-badge-radius: 999px;

  /* Overwrite internal Framer color tokens */
  --token-80553515-7ab0-44ac-b981-96d7680674fd: var(--ds-color-1) !important;
  --token-eb1c2ac0-df61-44fa-bf47-8b8b7fb5abe3: var(--ds-color-1) !important;
  --token-b49742a2-2f0a-4232-bcea-05d31a19a70e: var(--ds-card-in-1) !important;
  --token-1e4de996-fe4b-4667-88fc-284e9577f815: var(--ds-card-in-1) !important;
  --token-ee7ff27e-bc2d-40a1-8a1f-b3d025af745d: var(--ds-color-2) !important;
}
`;

themes.forEach((t) => {
  css += `
/* ==========================================================================
   THEME: ${t.name}
   ========================================================================== */
html[data-theme="${t.id}"] {
  --ds-color-1: ${t.color1};
  --ds-color-2: ${t.color2};
  --ds-card-in-1: ${t.cardIn1};
  --ds-card-in-2: ${t.cardIn2};
  --ds-card-border: ${t.cardBorder};
  --ds-card-shadow: ${t.cardShadow};
  --ds-text-primary: ${t.textPrimary};
  --ds-text-secondary: ${t.textSecondary};
  --ds-text-muted: ${t.textMuted};
  --ds-accent: ${t.accent};
  --ds-accent-hover: ${t.accentHover};
  --ds-accent-text: ${t.accentText};
  --ds-secondary-btn-bg: ${t.secBtnBg};
  --ds-secondary-btn-border: ${t.secBtnBorder};
  --ds-secondary-btn-text: ${t.secBtnText};
  --ds-badge-bg: ${t.badgeBg};
  --ds-badge-border: ${t.badgeBorder};
  --ds-badge-text: ${t.badgeText};
  --ds-cta-bg: ${t.ctaBg};
  --ds-cta-text: ${t.ctaText};
  --ds-cta-muted: ${t.ctaMuted};
  --ds-nav-bg: ${t.navBg};
  --ds-card-radius: ${t.cardRadius};
  --ds-btn-radius: ${t.btnRadius};
  --ds-badge-radius: ${t.badgeRadius};

  --token-80553515-7ab0-44ac-b981-96d7680674fd: var(--ds-color-1) !important;
  --token-eb1c2ac0-df61-44fa-bf47-8b8b7fb5abe3: var(--ds-color-1) !important;
  --token-b49742a2-2f0a-4232-bcea-05d31a19a70e: var(--ds-card-in-1) !important;
  --token-1e4de996-fe4b-4667-88fc-284e9577f815: var(--ds-card-in-1) !important;
  --token-ee7ff27e-bc2d-40a1-8a1f-b3d025af745d: var(--ds-color-2) !important;
}
`;
});

css += `
/* ==========================================================================
   GLOBAL CONTAINERS & BODY
   ========================================================================== */
html,
body,
#main,
.framer-cWFbg,
.framer-zqDo3 {
  background-color: var(--ds-color-1) !important;
  background: var(--ds-color-1) !important;
  color: var(--ds-text-primary) !important;
}

/* Neutralize all Framer wrapper backgrounds so only sections paint */
.framer-19kmjdb,
.framer-12bfmsn,
.framer-1bezxh4,
.framer-rjdtjn,
.framer-1olcsf0,
.framer-139dgwz,
.framer-1yn9zpk {
  background: transparent !important;
  background-color: transparent !important;
}

/* ==========================================================================
   TONAL ZEBRA RHYTHM: Pure Sister Tints (Kolor 1 <-> Kolor 2)
   ========================================================================== */

/* SEKCJA 1: HERO -> Kolor 1 */
.framer-olpvqv,
section[data-framer-name="Hero / Horizontal-01"] {
  background-color: var(--ds-color-1) !important;
  background: var(--ds-color-1) !important;
}

/* SEKCJA 2: PORÓWNANIE (Dlaczego warto?) -> Kolor 2 */
.framer-8tekcf,
div[data-framer-name="Comparison v6"] {
  background-color: var(--ds-color-2) !important;
  background: var(--ds-color-2) !important;
}

/* SEKCJA 3: INDIBA (Desktop, Tablet, Phone) -> Kolor 1 (ABSOLUTELY NO WHITE VOID!) */
.framer-dU8K6,
.framer-1t4i2rs-container,
div[data-framer-name="Desktop"].framer-dU8K6,
div[data-framer-name="Tablet"].framer-dU8K6,
div[data-framer-name="Phone"].framer-dU8K6 {
  background-color: var(--ds-color-1) !important;
  background: var(--ds-color-1) !important;
}

/* SEKCJA 4: OFERTA (6 kafelków) -> Kolor 2 */
.framer-cov1xy,
section[data-framer-name="Feature / Cards-04 2"] {
  background-color: var(--ds-color-2) !important;
  background: var(--ds-color-2) !important;
}

/* SEKCJA 5: OPINIE PACJENTEK (Karuzela) -> Kolor 1 */
.framer-w3d9lw,
section[data-framer-name="Testimonial / Carousel-03"] {
  background-color: var(--ds-color-1) !important;
  background: var(--ds-color-1) !important;
}

/* SEKCJA 6: FAQ (Akordeon pytań) -> Kolor 2 */
.framer-1ix845k,
section[data-framer-name="FAQ / Accordion-03"] {
  background-color: var(--ds-color-2) !important;
  background: var(--ds-color-2) !important;
}

/* SEKCJA 7: CTA BANNER WRAPPER -> Kolor 1 */
.framer-lhTDQ,
.framer-MW4wf,
section[data-framer-name="Desktop"].framer-lhTDQ,
section[data-framer-name="Tablet"].framer-lhTDQ,
section[data-framer-name="Phone"].framer-lhTDQ,
div[data-framer-name="Desktop"].framer-MW4wf,
div[data-framer-name="Tablet"].framer-MW4wf,
div[data-framer-name="Phone"].framer-MW4wf {
  background-color: var(--ds-color-1) !important;
  background: var(--ds-color-1) !important;
}

/* SEKCJA 8: FOOTER -> Kolor 2 */
footer,
.framer-l9ghc,
footer[data-framer-name="Desktop"],
footer[data-framer-name="Tablet"],
footer[data-framer-name="Phone"] {
  background-color: var(--ds-color-2) !important;
  background: var(--ds-color-2) !important;
  border-top: 1px solid var(--ds-card-border) !important;
}

/* Delikatne, niemal niewidoczne przejścia między sekcjami (zero grubych kresek) */
[data-framer-name="divider"],
.framer-1ebq8wo,
.framer-iiv745,
.framer-1355r18,
.framer-9j74ux {
  display: none !important;
}

/* ==========================================================================
   TONE-ON-TONE CARDS (Never stark white cards on beige!)
   Cards in Section 1 take Color 2.
   Cards in Section 2 take Color 1.
   ========================================================================== */

/* Karty w Porównaniu (Sekcja 2 -> Kolor 2) -> Karta ma Kolor 1 */
.framer-8tekcf .framer-pdt5y6 {
  background: var(--ds-card-in-2) !important;
  background-color: var(--ds-card-in-2) !important;
  border: 1px solid var(--ds-card-border) !important;
  border-radius: var(--ds-card-radius) !important;
  box-shadow: var(--ds-card-shadow) !important;
}
.framer-8tekcf .framer-e8j9a1 {
  background: transparent !important;
  background-color: transparent !important;
  border: 1px solid var(--ds-card-border) !important;
  border-radius: var(--ds-card-radius) !important;
}

/* Kafelki w sekcji INDIBA (Sekcja 3 -> Kolor 1) -> Kafelki mają Kolor 2 */
.framer-dU8K6 .framer-gus4pc,
.framer-dU8K6 .framer-ehsz3n,
.framer-dU8K6 .framer-pld69b,
.framer-dU8K6 .framer-ck451j,
.framer-dU8K6 [data-framer-name="Card"] {
  background: var(--ds-card-in-1) !important;
  background-color: var(--ds-card-in-1) !important;
  border: 1px solid var(--ds-card-border) !important;
  border-radius: var(--ds-card-radius) !important;
  box-shadow: var(--ds-card-shadow) !important;
}

/* Karty Oferty (Sekcja 4 -> Kolor 2) -> Karty mają Kolor 1 */
.framer-cov1xy .framer-19bricz > div,
.framer-cov1xy .framer-158kfqd,
.framer-cov1xy .framer-15xlo9f,
.framer-cov1xy .framer-1o1w9us,
.framer-cov1xy .framer-e78txs,
.framer-cov1xy .framer-sh17ld,
.framer-cov1xy .framer-1qm3gp0 {
  background: var(--ds-card-in-2) !important;
  background-color: var(--ds-card-in-2) !important;
  border: 1px solid var(--ds-card-border) !important;
  border-radius: var(--ds-card-radius) !important;
  box-shadow: var(--ds-card-shadow) !important;
}

/* Karty Opinii (Sekcja 5 -> Kolor 1) -> Karty mają Kolor 2 */
.framer-w3d9lw .framer-12bfmsn,
.framer-w3d9lw [data-framer-name="Card"] {
  background: var(--ds-card-in-1) !important;
  background-color: var(--ds-card-in-1) !important;
  border: 1px solid var(--ds-card-border) !important;
  border-radius: var(--ds-card-radius) !important;
  box-shadow: var(--ds-card-shadow) !important;
}

/* Karty FAQ (Sekcja 6 -> Kolor 2) -> Akordeon ma Kolor 1 */
.framer-1ix845k .framer-13p516z,
.framer-1ix845k [data-framer-name="Question"] {
  background: var(--ds-card-in-2) !important;
  background-color: var(--ds-card-in-2) !important;
  border: 1px solid var(--ds-card-border) !important;
  border-radius: var(--ds-card-radius) !important;
}

/* Karta CTA (Wielka karta w sekcji 7) */
.framer-l8skex,
div[data-framer-name="CTA Card"] {
  background-color: var(--ds-cta-bg) !important;
  background: var(--ds-cta-bg) !important;
  border-radius: var(--ds-card-radius) !important;
  box-shadow: 0 16px 40px -8px rgba(0, 0, 0, 0.25) !important;
}
.framer-l8skex h2,
.framer-l8skex h3,
div[data-framer-name="CTA Card"] h2,
div[data-framer-name="CTA Card"] h3 {
  color: var(--ds-cta-text) !important;
}
.framer-l8skex p,
div[data-framer-name="CTA Card"] p {
  color: var(--ds-cta-muted) !important;
}

/* ==========================================================================
   PRZYCISKI, BADGE, NAWIGACJA
   ========================================================================== */

/* Główny przycisk akcji (CTA / Umów wizytę) */
.framer-116h1p3,
.framer-122e2u9,
.framer-o6qfqy,
[data-framer-name="Primary / L"],
[data-framer-name="Primary / M"] {
  background: var(--ds-accent) !important;
  background-color: var(--ds-accent) !important;
  border-color: var(--ds-accent) !important;
  color: var(--ds-accent-text) !important;
  border-radius: var(--ds-btn-radius) !important;
}
.framer-116h1p3:hover,
.framer-122e2u9:hover,
.framer-o6qfqy:hover {
  background: var(--ds-accent-hover) !important;
  background-color: var(--ds-accent-hover) !important;
}
.framer-116h1p3 p,
.framer-122e2u9 p,
.framer-o6qfqy p {
  color: var(--ds-accent-text) !important;
}

/* Wtórne przyciski (Secondary buttons) */
.framer-1d9keem,
[data-framer-name="L / Default"],
[data-framer-name="M / Default"] {
  background: var(--ds-secondary-btn-bg) !important;
  background-color: var(--ds-secondary-btn-bg) !important;
  border: 1px solid var(--ds-secondary-btn-border) !important;
  color: var(--ds-secondary-btn-text) !important;
  border-radius: var(--ds-btn-radius) !important;
}
.framer-1d9keem p,
[data-framer-name="L / Default"] p {
  color: var(--ds-secondary-btn-text) !important;
}

/* Odznaki i etykietki (Badges / Nowość w gabinecie / Terapia) */
.framer-19d79z7,
.framer-l6r7d3,
[data-framer-name="Sec Btn"],
[data-framer-name="Badge"] {
  background: var(--ds-badge-bg) !important;
  background-color: var(--ds-badge-bg) !important;
  border: 1px solid var(--ds-badge-border) !important;
  border-radius: var(--ds-badge-radius) !important;
}
.framer-19d79z7 p,
.framer-l6r7d3 p,
[data-framer-name="Sec Btn"] p {
  color: var(--ds-badge-text) !important;
}
.framer-1yca21i {
  background-color: var(--ds-color-1) !important;
  border-color: var(--ds-badge-border) !important;
}

/* Pasek nawigacji u góry (Header / Navbar) */
.framer-olpvqv nav,
.framer-SGVm4,
[data-framer-name="Navbar"] {
  background: var(--ds-nav-bg) !important;
  background-color: var(--ds-nav-bg) !important;
  backdrop-filter: blur(12px) !important;
  -webkit-backdrop-filter: blur(12px) !important;
  border-bottom: 1px solid var(--ds-card-border) !important;
}

/* Kolory ikon w stopce */
.framer-1ub1g5t,
.framer-2j2nm0 {
  background-color: var(--ds-card-in-1) !important;
  border: 1px solid var(--ds-card-border) !important;
}

/* Kolory tekstu */
h1, h2, h3, h4 {
  color: var(--ds-text-primary) !important;
}
p {
  color: var(--ds-text-secondary);
}
.framer-text {
  color: var(--ds-text-secondary);
}
`;

fs.writeFileSync('css/themes.css', css, 'utf8');
console.log('Successfully generated css/themes.css with 10 subtle sister-tint variants.');
