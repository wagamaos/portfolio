# Portfolio Accessibility Audit & Optimization Report

**Student:** Wang Yi Heng  
**Coursework Submission:** Web Development Portfolio  
**Audit Standard:** WCAG 2.1 Level AA & Lighthouse Accessibility Audit  
**Lighthouse Accessibility Score:** Improved from **83** to **100 / 100**  

---

## 1. Required Checklist Verification

| # | Checklist Item | Requirement | Status | Implementation Details |
|:---|:---|:---|:---:|:---|
| ① | **Semantic HTML** | `<header>`, `<nav>`, `<main>`, `<footer>` | **PASS** | Valid landmark hierarchy with `<nav aria-label="Main navigation">`, bypass skip link `<a class="skip-link" href="#main">`, and structured headings. |
| ② | **Responsive CSS** | Looks good on mobile | **PASS** | Fluid grid and flexbox layout tested on 375px mobile, 600px tablet, and 1200px desktop. Touch targets exceed 44×44px. |
| ③ | **JS Interactions** | Dark mode toggle, filter, etc. | **PASS** | 1) Accessible Dark Mode Toggle with `localStorage` memory and system theme sync. 2) Interactive project category filters with `aria-live="polite"` live announcements. |
| ④ | **Lighthouse Score** | Accessibility score ≥ 90 | **PASS (100)** | Increased from 83 to a perfect 100/100 with all 28 automated checks passing. |
| ⑤ | **Meaningful Alt Text** | Meaningful alt text on all images | **PASS** | Updated profile image alt text to *"Portrait photograph of Wang Yi Heng"*. All decorative SVG icons hidden via `aria-hidden="true"`. |
| ⑥ | **Color Contrast** | Passes WCAG AA (≥ 4.5:1) | **PASS** | All text and UI component contrast ratios remediated to between 6.0:1 and 16.2:1 in both light and dark themes. |

---

## 2. Lighthouse Audit Screenshots

### Before Optimization (Score: 83)
*Failing audits: Color contrast on `.project-number` (2.43:1) and wordmark dot (2.53:1), uninformative alt metadata, ambiguous link names.*

![Lighthouse Audit Before](screenshots/lighthouse-before.png)

---

### After Optimization (Score: 100 / 100)
*All 28 audits passed. Flawless 100/100 score on Accessibility, Performance, Best Practices, and SEO.*

![Lighthouse Audit After](screenshots/lighthouse-after.png)

---

## 3. What Was Fixed

### A. Color Contrast Remediations (WCAG AA Compliance)
- **Project Numbers (`.project-number`):** Changed from `#9baa9f` (contrast ratio **2.43:1 — FAILING**) to `#4d6355` (contrast ratio **6.50:1 — PASSING**).
- **Wordmark Dot Accent:** Changed from `#d48d44` (contrast ratio **2.53:1 — FAILING**) to `#8f4c00` (contrast ratio **6.08:1 — PASSING**).
- **Muted Body Text (`--muted`):** Adjusted from `#64736a` to `#4e5f56` (**6.78:1** contrast on white) for high legibility across all screens.
- **Dark Theme Palette:** Complete dark mode color system with WCAG AA compliance (text `#f0f5f2` on `#121a16` = **16.07:1**; green `#62d499` = **8.40:1**).

### B. JavaScript Interactions
- **Dark Mode Toggle:** Smooth client-side theme switching with `localStorage` persistence, `prefers-color-scheme` matching, and accessible `aria-pressed` / `aria-label` updates.
- **Project Category Filters:** Filter pills ("All", "Web App", "Interactive", "Events", "Campus") with live screen reader announcements via `aria-live="polite"`.
- **Dynamic Year:** Automatically outputs the current year in the footer.

### C. Semantic HTML & Accessible Content
- Added descriptive contextual `aria-label` attributes to external links (`aria-label="Open Progression Board live project (opens in a new tab)"`).
- Replaced generic alt text with `"Portrait photograph of Wang Yi Heng"`.
- Explicitly marked decorative icons and arrows with `aria-hidden="true"`.

---

## 4. Google Docs & Word Export
The full report with embedded screenshots is ready for submission in:
- `Lighthouse_Accessibility_Report.docx` (Directly openable or uploadable to Google Docs)
- `Lighthouse_Accessibility_Report.html` (Self-contained HTML with embedded base64 images)

