# Brandname Apparel — Minimalist Single-Page E-Commerce

A fast, responsive, single-page clothing storefront built for modern web standards. This interface features a sleek dual-mode orientation to highlight lookbooks, a dynamic category filtering system, and instant sales checkout routing.

## Live Project Link
* **Production Deployment:** [https://yourbrandname.com](https://yourbrandname.com)

## Core Functions
* **Single Page Architecture:** Removes page-load friction by organizing hero, inventory drops, and location modules inside a unified vertical viewport.
* **Dual Aesthetic System:** Seamless toggle state switching between Dark/Light mode colorways using Tailwind utility classes.
* **Dynamic Category Filtering:** An instantly responsive JavaScript catalog sorter that switches between Outerwear, Tops, Bottoms, and Accessories without page reloads.
* **Automated Order Passing:** Grabs specific product values, currencies, and selected clothing sizes to generate pre-filled WhatsApp purchase text strings.

## Problems Solved
* **High Friction Drop Cycles:** Fast-moving clothing drops need zero navigation delays; presenting items on a single viewport captures quick purchase intents instantly.
* **Cluttered Infrastructure:** Skips heavy frameworks or third-party database overhead for brands requiring immediate, lightweight catalog representation.

## Challenges Encountered & Resolutions
* **State Scope Collisions on Multi-Grids:** Reorganizing data nodes across ten separate product slots broken out into external scripts initially caused layout state switches to fall back. Mitigated by binding unique card DOM wrapper contexts (`.product-card`) to encapsulate targeted elements cleanly.
* **Dark Mode Visual Shifts:** Images and borders can appear overly harsh in high-contrast transitions. Resolved by tuning semantic slate shades (`dark:bg-slate-900` / `dark:border-slate-700`) to maintain a luxury feeling across both configurations.