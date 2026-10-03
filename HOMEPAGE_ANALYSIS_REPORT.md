# PHASE 1 - HOMEPAGE REDESIGN ANALYSIS REPORT

## 1. CURRENT HOMEPAGE MAP
**Current Components (src/pages/Home):**
- <TopEdge />: Static visual header.
- <IntroduceMovie />: Static intro section.
- <PromotionCarousel />: Uses static mocked data for promotions.
- <TopBoxOffice />: Reads dataMovie prop, filters top 5 by ate.
- <HomeCollection />: Reads dataMovie prop, renders Swiper slider.
- <Features />: Static visual features.
- <MovieNews />: Uses static mocked news array.
- <VIPBanner />: Static promotional UI.

**API Integrations & Dependencies:**
- **Endpoint:** GET /movie/home (via useAllMovie() in src/hooks/useAllMovie.tsx).
- **Data Flow:** Extracted in App.tsx, dispatched to Redux (dispatch(moviesAction.fetchData(dataMovie))), and passed as props to HomePage.
- **CRITICAL - Do Not Break:** 
  - Redux dispatch in App.tsx expects the exact backend shape.
  - Global layout wrappers (Header, Footer used across routes).
  - React Router configuration in App.tsx.
  - Vite import.meta.env.VITE_API_URL + Axios interceptors (src/api/baseAuth.tsx).

---

## 2. NEW STITCH UI MAP
**Stitch UI Components (HomePage.tsx in dreamcine-main):**
1. **Hero Banner:** Requires ackdropUrl, posterUrl, ating, 	itle, geRating, duration, genre, eleaseDate, ormats, synopsis.
2. **Quick Booking Bar:** Requires lists of Cinemas, Movies, Dates, Showtimes.
3. **Immersion Cards:** Static/Marketing UI for IMAX, 4DX.
4. **Now Showing:** Tabs filtering by 'now', 'coming', 'special'.
5. **Top Ranking:** Movies sorted by ank.
6. **Real-time Showtimes per Cinema:** Accordion UI grouped by Cinema.
7. **Coming Soon:** Movies with 'coming_soon' status and reminders.
8. **Editorial Corner (News):** Blog cards requiring imageUrl, adge, eadTime, etc.
9. **VIP Banner:** 3D card layout (mostly static).

**Design System Differences:**
- Stitch uses Google Material Symbols (<span className="material-symbols-outlined">) whereas the current project uses lucide-react and eact-icons.
- Stitch relies on complex Tailwind utility combinations (e.g. g-[radial-gradient(...)], mix-blend-luminosity).
- Stitch data relies on a local mock file (src/data/cinemaData.ts).

---

## 3. DATA MAPPING TABLE

| Stitch UI Field | Existing MongoDB/API Field | Status | Proposed Handling |
| :--- | :--- | :--- | :--- |
| **title** | 
ame | EXISTS | Use 
ame directly. |
| **posterUrl** | image | EXISTS | Use image directly. |
| **backdropUrl** | - | MISSING | **Compute:** Fallback to image. |
| **rating** | ate | EXISTS | Use ate. |
| **synopsis** | desc | EXISTS | Use desc. |
| **duration** | duration | EXISTS | Use duration + " phút". |
| **releaseDate** | romDate / 	oDate | EXISTS (Diff Name) | Format romDate to DD/MM/YYYY. |
| **status** | status | EXISTS | Map IS_SHOWING -> 'now_showing' / COMING_SOON -> 'coming_soon'. |
| **formats** | ormat | EXISTS | Use ormat (e.g., '2D', '3D'). |
| **ageRating** | ge_id | EXISTS (Lookup) | If populated, use ge_id.name. Else, static "T18". |
| **genre** | 	ypeId | EXISTS (Lookup) | If populated, use 	ypeId.name. Else, static fallback. |
| **rank** | - | MISSING | **Compute:** Sort by ate descending. |
| **News/Blog** | - | MISSING | Keep using the static frontend mock data. |
| **Promotions** | - | MISSING | Keep using the static frontend mock data. |

---

## 4. MISSING DATA PROPOSAL
1. **backdropUrl (Missing):** 
   - *Proposal (a):* Compute from existing image. Risk: zero. The hero banner will use the poster image as a blurred backdrop.
2. **rank (Missing for Top Box Office):** 
   - *Proposal (a):* Derive dynamically on the frontend [...dataMovie].sort((a,b) => b.rate - a.rate). Risk: zero.
3. **News / Blogs / Promotions:** 
   - *Proposal (c):* Use static fallback constants in the frontend (as we currently do). Risk: zero. Creating a new collection is overkill for Phase 1.
4. **Cinemas & Showtimes (For Quick Booking Bar):**
   - *Proposal:* We will need to inject the useQuery hooks for /cinema and /showtimes directly into the QuickBookingBar component rather than fetching them globally, to prevent unnecessary renders in App.tsx.

---

## 5. RISK LIST
1. **Redux Store Corruption:** 
   - *Risk:* If we rename fields inside dataMovie to match Stitch's Movie interface, it will break Redux and the Admin Dashboard.
   - *Mitigation:* We will NOT modify the API or dataMovie. We will create a local "Adapter" mapping function inside the UI components to convert MovieType to Stitch's expected shape right before rendering.
2. **Tailwind CSS Conflicts:** 
   - *Risk:* Overwriting 	ailwind.config.js or index.css could break other pages (like /admin).
   - *Mitigation:* We will meticulously merge only the NEW custom colors/fonts from Stitch into the existing Tailwind config, keeping all current configs intact.
3. **Material Symbols Missing:** 
   - *Risk:* Stitch's <span className="material-symbols-outlined"> will render as text (e.g., "star") if the font isn't loaded.
   - *Mitigation:* Add the Google Fonts CDN link to index.html.

---

## 6. IMPLEMENTATION PLAN
- **Step 1:** Update index.html to include Google Material Symbols CDN.
- **Step 2:** Merge Tailwind config (custom colors, animations) from the Stitch project to the current 	ailwind.config.js.
- **Step 3:** Migrate HomePage.tsx from Stitch into our src/pages/Home/.
- **Step 4:** Refactor Stitch's mocked data bindings. Replace MOVIES.map with dataMovie.map, injecting an adapter function to map 
ame -> title, image -> posterUrl, etc.
- **Step 5:** Extract and connect the QuickBookingBar and CinemaShowtimes sections to our actual API endpoints (useQuery for Cinemas and Showtimes).
- **Step 6:** Test locally on localhost:5173. NO push to production until approved.

**QUESTIONS FOR YOU:**
1. Do you want the **Quick Booking Bar** to actually fetch real Cinemas and Showtimes API endpoints in this phase, or just keep it visually mocked for now?
2. Are you okay with using the image (poster) as the blurred ackdropUrl in the Hero Banner, since we don't have a separate landscape backdrop image in the Database?
