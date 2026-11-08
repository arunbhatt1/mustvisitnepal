# Content Verification Checklist (CONTENT_TODO.md)

This document tracks items that require confirmation with local operators, official government authorities (Nepal Tourism Board, Department of National Parks, TAAN), or seasonal pricing schedules.

## 1. Package Pricing (`data/treks.json`)
The following treks currently have `priceUSD: null` to avoid publishing inaccurate figures. Contact us for custom quotes based on group size and season:
- [ ] **Langtang Valley Trek** (7 days): Verify standard USD rate per person (estimate: \$450–\$700 depending on group size and private jeep vs. public bus).
- [ ] **Annapurna Base Camp Trek** (10 days): Verify standard USD rate per person (estimate: \$650–\$950).
- [ ] **Everest Base Camp Trek** (14 days): Verify standard USD rate per person including domestic flights Kathmandu/Ramechhap–Lukla (estimate: \$1,200–\$1,650).
- [ ] **Tilicho / ABC Circuit Trek** (12 days): Verify standard USD rate per person including jeep transfers and Jomsom–Pokhara flight/jeep (estimate: \$850–\$1,200).

## 2. Government & Conservation Permits
Permit fees listed in `data/treks.json` reflect the latest public rates established by the Government of Nepal and Nepal Tourism Board:
- [x] **Langtang National Park Permit**: NPR 3,000 per person + 13% VAT.
- [x] **TIMS Card (Trekkers' Information Management System)**: NPR 2,000 per person for individual trekkers through registered agency.
- [x] **Annapurna Conservation Area Permit (ACAP)**: NPR 3,000 per person.
- [x] **Sagarmatha National Park Permit**: NPR 3,000 per person.
- [x] **Khumbu Pasang Lhamu Rural Municipality Entrance**: NPR 2,000 per person (collected in Lukla).
- [ ] *Action*: Verify if recent local municipal levy changes apply to Annapurna/Manang districts.

## 3. Altitudes and Distances
All altitudes and distance estimates in `data/treks.json` correspond to standard Survey Department of Nepal topographic maps:
- [x] Langtang Valley: Syabrubesi (1,460 m), Kyanjin Gompa (3,870 m), Tserko Ri (4,773 m).
- [x] Annapurna Base Camp: Poon Hill (3,210 m), ABC (4,130 m).
- [x] Everest Base Camp: Lukla (2,840 m), Namche (3,440 m), Gorak Shep (5,140 m), EBC (5,364 m), Kala Patthar (5,545 m).
- [x] Tilicho / ABC Circuit: Manang (3,540 m), Tilicho Lake (4,919 m), Thorong La (5,416 m).

## 4. Imagery Licenses (`IMAGE_CREDITS.md`)
- [ ] **Original site photos** (`banner.jpg`, `langtang-valley.jpg`, `annapurna-base-camp.jpg`, `everest-base-camp.jpg`): Verify internal company copyright or replace with dedicated high-resolution field photos or Unsplash CC0-equivalent photos.
- [x] **Tilicho Lake**: CC BY-SA 4.0 by Santosh Mishra via Wikimedia Commons.

## 5. Form Endpoints
- [ ] Connect booking, contact, and newsletter forms to a live backend service (e.g., Formspree, Netlify Forms, or custom email webhook). Currently, client-side validation displays an accessible success state upon valid submission.
