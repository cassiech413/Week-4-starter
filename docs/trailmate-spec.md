# TrailMate v1: Component & State Spec (PRD-lite)

Group: ______ · Week 4 · Design owner: Hao · Status: draft for team review

**How to use this doc**
1. Team reviews the defaults in §8 (5 min). Change any you disagree with.
2. Hand §3–§7 to the coding agent (Claude Code / Codex) with the prompt in §10.
3. §9 becomes the PR's "How to test" section and the screenshot checklist.
4. Paste §8 into the Google Doc as the "Missing requirements" section (due 11:30).

Bucket tags: **[JS]** = JavaScript fundamentals · **[RN]** = React Native / Expo-specific

---

## 1. User needs

| Need | Where | Must work |
|---|---|---|
| **Find** a trail that fits me | Explore | Browse, live search by name, filter by difficulty |
| **Decide** if it's right | Trail Details | Distance, elevation, time, description, map |
| **Remember** it for later | Star → Saved | Save/unsave anywhere; saved trails survive app restart |
| **Get there** | Start Navigation | Hands off to the phone's maps app |
| **Personalize** | Profile | Units and notification settings that actually persist |

## 2. Scope

**In v1:**
- The 4 designed screens (Explore, Details, Saved, Profile)
- 3 Profile sub-screens that are **not designed** (Notifications, Units, About)
- Empty, loading, and fallback states
- Mock data only

**Out of v1:**
- Real accounts
- Real GPS / "nearby" sorting
- Real push notifications
- In-app turn-by-turn navigation
- Dark mode, tablets, landscape

---

## 3. Design tokens → `constants/theme.js`

Hex values are **eyeballed from the mockup PNGs**. Verify them or adjust as a team. The "a11y fix" column proposes changes where the mockup color likely fails WCAG AA contrast; check these with a contrast checker before committing.

### Colors

| Token | Mockup | a11y fix (proposed) | Used for |
|---|---|---|---|
| `primary` | #2F6B47 | same | App title, selected chip, active tab, saved star |
| `cta` | #1F7A3A | same | Start Navigation button |
| `bgScreen` | #F5F5F5 | same | Screen background |
| `bgCard` | #FFFFFF | same | Cards, search field |
| `border` | #E3E3E3 | same | Card and chip outlines |
| `divider` | #E5E7EB | same | Rules on Details and Profile |
| `textPrimary` | #1F2328 | same | Titles, body |
| `textSecondary` | #6B7280 | same | Meta line, stat labels, "12 trails hiked" |
| `easy` | #4E9A5B | #2E7D4F | Easy badge (white text) |
| `moderate` | #F2A824 | keep fill, use **dark text** #1F2328 | Moderate badge (white on amber likely fails) |
| `hard` | #E53935 | #C62828 | Hard badge |
| `starSaved` | gold #F4B021 on Explore, green on Saved | **one color: `primary`** | Filled star (gold on white likely fails 3:1 icon contrast) |
| `starUnsaved` | #9CA3AF outline | #6B7280 | Outline star |
| `destructive` | #E53935 | #C62828 | "Log Out" text |
| `overlayDark` | rgba(0,0,0,0.45) | same | Back button on hero image |
| `overlayLight` | rgba(255,255,255,0.9) | same | Star button on hero image |

### Type (size / weight)

| Role | Style |
|---|---|
| appTitle "TrailMate" | 28 / 700, `primary` |
| screenTitle "Saved" | 28 / 600 |
| cardTitle | 18 / 600 |
| meta "4.2 mi • 2h 15m" | 15 / 400, secondary |
| badge | 13 / 600 |
| sectionTitle "Description" | 18 / 700 |
| body | 15 / 400, line height 22 |
| statValue | 17 / 700 |
| statLabel | 13 / 400, secondary |
| profileName | 24 / 700 |
| settingsRow | 17 / 400 |
| button | 18 / 700 |
| tabLabel | 12, 600 when active, 400 when inactive |

Font: system font. No custom font file was supplied (logged in §8).

### Spacing, radius, sizes
- **Spacing:** screen padding 16 · card padding 12 · gap between cards 12 · gap between chips 8 · gap between sections 20
- **Radius:** card 12 · card image 8 · chip 10 · search field 24 (pill) · badge 999 (pill) · button 12 · map 12 · avatar 999 (circle)
- **Sizes:** card thumbnail ≈ 100×88 · hero image height ≈ 220 · avatar ≈ 112 · **minimum touch target 44×44**

---

## 4. Data contract

### `data/trails.js`: array of trail objects [JS]

| Field | Example | Notes |
|---|---|---|
| `id` | `"trail-01"` | Never shown. Used as the list key and in saved IDs |
| `name` | `"Cedar Ridge Loop"` | Search matches this |
| `difficulty` | `"Easy"` | Exactly `"Easy"`, `"Moderate"`, or `"Hard"`, since text matching is case-sensitive [JS] |
| `distanceMiles` | `4.2` | Number, not text. Converted at display time |
| `elevationGainFt` | `850` | Number |
| `durationMinutes` | `135` | Number. Displayed as "2h 15m" |
| `description` | `["Para 1", "Para 2"]` | Array of paragraphs; the mockup shows two paragraphs with a divider |
| `imageUrl` | URL or `null` | `null` = the no-image case |
| `trailhead` | `{ latitude: 42.28, longitude: -83.74 }` | Used by Start Navigation |
| `mapImageUrl` | URL or `null` | Static map preview for v1 |

**Local images:** if you use images from `assets/`, each one needs its own written-out `require("../assets/cedar.jpg")`. React Native can't build image paths from text at runtime. [RN]

**Required edge-case trails** (about 12–15 total, uneven count per difficulty):
- Very long name: "Pictured Rocks Lakeshore – Chapel Basin to Mosquito Beach Loop"
- `imageUrl: null`
- One broken image URL (loads and fails, which is different from missing)
- `mapImageUrl: null`
- Flat trail: 0 ft elevation; tiny distance: 0.5 mi
- Big values: 12.8 mi, 3,450 ft, 10h 30m
- Three names containing "Lake" (search returns several results)
- "Easy Street Ridge" rated **Hard** (proves search and filter are separate)
- Name with punctuation or accents
- One very long description and one single sentence
- Exactly one trail matching a particular search + filter combination; another combination with zero matches

### `data/user.js`: everything that belongs to the person, not the trail

```
name, avatarUrl (or null), trailsHikedCount,
savedTrailIds: [],
settings: { units: "imperial", notifications: { nearbyTrails: true, savedReminders: false } }
```

Saved and hiked status live **here, not on trails**. When real accounts arrive, only this file's source changes. That satisfies "structure it so auth is easy to add later."

### Formatting helpers: `utils/format.js` [JS]
- **Distance:** imperial "4.2 mi"; metric "6.8 km" (× 1.609, 1 decimal)
- **Elevation:** imperial "3,450 ft"; metric "1,052 m" (× 0.3048, whole number, thousands separator)
- **Time:** "2h 15m". The mockup shows "1h 0m" and "7h 0m", so v1 matches it (see §8)
- **Hiked count:** 0 → "No trails hiked yet" · 1 → "1 trail hiked" · n → "n trails hiked"
- **Spoken versions for screen readers:** "4.2 miles", "2 hours 15 minutes". Abbreviations like "mi" may be read aloud literally

---

## 5. Components → `components/`

All components are **presentational**: data comes in via props, and taps go out via callbacks. No navigation or storage code goes inside components.

### 5.1 `TrailImage`
- **Props:** `uri` (string or null), `variant` ("thumb" | "hero"), `label`
- **States:**
  - loading: neutral background
  - loaded
  - missing (`null`): fallback of a green-tinted block with a mountain icon
  - failed (`onError` fires): same fallback [RN]
- **A11y:** decorative in cards, because the card's label covers it. Hero variant is labeled "Photo of {name}"
- **Edge cases:** odd aspect ratios, handled with `resizeMode="cover"`; slow network

### 5.2 `DifficultyBadge`
- **Props:** `level`, `size` ("sm" on cards | "md" on Details)
- **States:** Easy / Moderate / Hard, plus an **unknown fallback** that shows the raw text on a gray badge, so a data typo is visible instead of crashing
- **A11y:** difficulty is written as text, never shown by color alone; uses the contrast fixes from §3

### 5.3 `StarButton`
- **Props:** `isSaved`, `onToggle`, `trailName`, `variant` ("plain" on cards | "overlay" on the hero image, in a white circle)
- **States:** saved (filled) · unsaved (outline) · pressed
- **A11y:**
  - Role: button
  - Label: "Save {name}" or "Remove {name} from saved"
  - `accessibilityState={{ selected: isSaved }}` [RN]
  - Hit area at least 44×44, using `hitSlop` if the icon is smaller [RN]
- **Edge cases:**
  - Tapping the star inside a card must **not** open Details
  - Rapid double tap simply toggles twice
  - On the Saved screen, unsaving removes the card immediately (undo is an open question in §8)

### 5.4 `TrailCard`
- **Props:** `trail`, `isSaved`, `units`, `onPress`, `onToggleSave`
- **Layout:** thumbnail on the left · name / badge / meta in the middle (`flex: 1`) · star on the right
- **States:**
  - default and pressed (lower opacity)
  - saved and unsaved
  - no image
  - long name (max 2 lines, ending in "…")
  - large system text (card grows taller)
  - metric units
- **A11y:**
  - The whole card is one button labeled "{name}, {difficulty}, {distance spoken}, {time spoken}", with the hint "Opens trail details"
  - The star is a separate focus stop
  - The "•" separator is left out of the label so it isn't read as "bullet"

### 5.5 `SearchBar`
- **Props:** `value`, `onChangeText`
- **States:**
  - empty (placeholder "Search trails")
  - focused
  - has text, which shows a **clear ✕ button (not in the mockup; added)**
- **Behavior:** filters live as you type · ignores leading and trailing spaces · case-insensitive · matches name only [JS: `.trim()`, `.toLowerCase()`, `.includes()`]
- **A11y:** labeled "Search trails"; the clear button is labeled "Clear search"
- **Edge cases:**
  - Spaces only are treated as empty
  - Very long queries
  - The Return key dismisses the keyboard

### 5.6 `FilterChips`
- **Props:** `options` (["All", "Easy", "Moderate", "Hard"]), `selected`, `onSelect`
- **States:** selected (filled `primary`, white text) · unselected (outlined) · pressed
- **A11y:** each chip is a button with `selected` state; the group is labeled "Filter by difficulty"
- **Edge cases:**
  - **On 320pt-wide phones (iPhone SE, from the L1 table) the four chips don't fit.** Use a horizontal scroll row
  - Large text causes the same overflow
  - The filter is kept when going to Details and back, but not across app restarts

### 5.7 `ScreenHeader`
- **Variants:**
  - "brand": green "TrailMate", on Explore
  - "page": "Saved" plus a divider line
  - "none": Profile
- **A11y:** role header
- **Edge cases:** must sit below the notch or status bar, which the mockups don't show [RN: safe area]

### 5.8 `HeroHeader` (Details)
- **Contents:** `TrailImage` (hero) + back button (top-left, dark circle) + `StarButton` overlay (top-right)
- **Edge cases:**
  - No image: uses the fallback
  - Buttons stay below the status bar
  - Buttons keep their backgrounds on very bright or very dark photos
- **A11y:** back button labeled "Back"

### 5.9 `TrailTitle`
- **Contents:** name + `DifficultyBadge` inline
- **Edge cases:** a long name pushes the badge onto the next line (`flexWrap: "wrap"`) instead of squeezing it

### 5.10 `StatsRow` (Distance / Elevation / Time)
- **Props:** `distanceMiles`, `elevationGainFt`, `durationMinutes`, `units`
- **States:** normal · missing value shows "—" · metric
- **Edge cases:**
  - 0 ft is shown as "0 ft"
  - Wide values like "19.0 km", "1,052 m", "10h 30m" must fit in three columns
  - With large text, stack the items vertically
- **A11y:** each item is one element, e.g. "Distance, 11.8 miles"; icons are hidden from screen readers
- **Mockup note:** Distance uses a location-pin icon (logged in §8)

### 5.11 `MapPreview`
- **Props:** `mapImageUrl`, `trailName`
- **v1:** static image, not interactive. `react-native-maps` would add setup work (an Android API key, no web support), so it's out of scope
- **States:** has map · missing (section hidden) · failed (fallback)
- **A11y:** labeled "Map preview of {name} route"

### 5.12 `PrimaryButton`
- **Props:** `title`, `onPress`, `disabled`
- **States:** default · pressed · disabled (e.g., trail has no trailhead coordinates)
- **Start Navigation:**
  - Opens the phone's maps app at the trailhead via `Linking.openURL` [RN]
  - On web, opens Google Maps in a new tab
- **Layout:** pinned to the bottom above the safe area. The scroll content gets bottom padding so the last paragraph isn't hidden behind the button
- **A11y:** hint "Opens your maps app"

### 5.13 `ProfileHeader`
- **Props:** `name`, `avatarUrl`, `trailsHikedCount`
- **Edge cases:**
  - No avatar: show initials in a circle
  - Long name wraps to 2 lines
  - Count wording 0 / 1 / many (see §4)

### 5.14 `SettingsRow`
- **Props:** `label`, `onPress`, `value` (optional, e.g. show "Miles" on the Units row; an addition), `variant` ("nav" with chevron | "destructive", red with no chevron)
- **A11y:** role button; nav rows have the hint "Opens {label} settings"

### 5.15 `EmptyState`
- **Variants:**
  - `exploreNoResults`: "No trails match" + "Try another name or difficulty" + button "Clear search & filters"
  - `savedEmpty`: "No saved trails yet" + "Tap the star on any trail to save it here." + button "Explore trails"
  - `loading`: spinner, used while saved trails load

### 5.16 Tab bar (configured in the navigation library, not a custom component)
- **Tabs:** Explore / Saved / Profile. Active = `primary` icon and bold label; inactive = gray
- **Icons:** the mockups disagree (see §8). v1 uses one set everywhere: Explore = compass, Saved = star, Profile = person
- **Visibility:** hidden on Details, matching the mockup

### 5.17 Log Out confirmation
- **Native:** `Alert.alert` with Cancel / Log Out [RN]
- **Web gotcha:** Alert buttons don't work in the web preview. Use `window.confirm` on web, or a small custom modal
- **v1 behavior:** confirm → return to Explore with a "Logged out (demo)" message; no data is cleared

---

## 6. Screen states

### Explore
- Default list
- Searching · filtered · search + filter combined
- No results, where the message reflects the cause (search, filter, or both)
- Keyboard open:
  - Tapping a card still works (`keyboardShouldPersistTaps="handled"`, as in the gradebook demo)
  - Scrolling dismisses the keyboard (`keyboardDismissMode="on-drag"`)
- The list scrolls back to the top when the filter changes

### Trail Details
- Opened from Explore vs. from Saved: Back returns to wherever you came from
- Saved and unsaved
- No image · no map (section hidden) · long name (badge wraps) · long description (scrolls under the pinned button) · missing stat ("—")
- Unsaving here and going back updates the star on Explore, and removes the trail from Saved

### Saved
- **Loading:** saved IDs load asynchronously from AsyncStorage. Show the spinner, **not** the empty state, until loading finishes [JS: async/Promises · RN: AsyncStorage]
- Empty · one item · many items
- Order: newest saved first
- Unsave: card disappears immediately
- A saved ID with no matching trail in the data (e.g., the trail was removed) is skipped silently
- Survives a full app restart
- Stars stay in sync with Explore, because there is one shared list of saved IDs

### Profile
- Hiked count: 0 / 1 / many
- No avatar · long name
- Units row shows the current value; changing units updates Explore, Saved, and Details immediately
- Log Out confirmation (5.17)

### Profile sub-screens: **not designed; we design them in the mockup style**
- **Notifications:**
  - Toggles: "New trails near me" and "Reminders for saved trails"
  - Saved locally; no real notifications in v1
- **Units:**
  - Two choices with a checkmark: Imperial (mi, ft) / Metric (km, m)
  - Saved locally
- **About:**
  - App name, "Version 1.0.0 (prototype)"
  - Note that trail data is sample data
  - Photo credits, team names

---

## 7. Conditions that apply everywhere

- **Small phone** (320pt wide) and **large phone** (440pt wide)
- **Large system text / Dynamic Type:** nothing is clipped; rows grow
- **Screen reader:** VoiceOver / TalkBack reads everything in a sensible order
- **Safe areas:** notch, home indicator, Android status bar
- **Android hardware back button:** leaves Details; on a tab screen, exits the app
- **Web preview vs. phone:** Alert, maps linking, and keyboard behavior differ
- **Slow or no network:** remote images use their loading or fallback states
- **App restart:** saved trails and settings persist
- **Rapid taps:** nothing crashes; no duplicate screens open

---

## 8. Missing requirements & mockup conflicts (paste into Google Doc)

| # | Gap or conflict | v1 default | How we'd resolve it without the PM |
|---|---|---|---|
| 1 | "Nearby" trails, but no location behavior or permission flow | No GPS; mock list | Ask async with a proposed default; follow AllTrails pattern later |
| 2 | Start Navigation: *to* the trailhead or *along* the trail? In-app or external? | Open phone maps app to trailhead | Proposed default in Slack with a response deadline |
| 3 | Map preview: provider? interactive? route data source? | Static image per trail | Keep swappable behind `MapPreview` component |
| 4 | How does a trail become "hiked"? No action for it anywhere | Fixed count in mock user | Log as open question in PR |
| 5 | Log Out with no accounts: what happens? | Confirm → demo message, keep data | Platform convention (confirm destructive actions) |
| 6 | Notifications for what? When do we request permission? | 2 local toggles, no real notifications | Design sub-screen; flag for PM |
| 7 | Units: which ones? convert everywhere? default by region? | Imperial default; metric converts app-wide | Make it a setting so either answer works |
| 8 | Profile rows have chevrons → sub-screens exist but aren't designed | We design Notifications, Units, About in the same style | Document as design decisions |
| 9 | **Three different "save" icons:** star (cards), heart (Explore tab bar), bookmark (other tab bars) | Star everywhere | One metaphor = less confusion; ask designer |
| 10 | **Explore tab icon differs:** mountains vs. compass | Compass on every screen | Consistency; ask designer |
| 11 | **Filled star color differs:** gold (Explore) vs. green (Saved) | Green (`primary`) everywhere | Also fixes contrast (gold on white likely fails) |
| 12 | Easy badge green differs between screens; same trail has different photos | One badge color; one photo per trail | Tokens + single data source |
| 13 | Badge contrast: white text on amber/light green/red likely below WCAG AA | Darker badge colors, dark text on amber (§3) | "Account for accessibility" → we adopt WCAG 2.1 AA |
| 14 | "Account for accessibility" isn't defined | WCAG 2.1 AA, screen-reader labels, 44pt targets, large text | State the standard in the doc |
| 15 | Time format "1h 0m" / "7h 0m" | Match mockup | Ask whether "1h" is preferred |
| 16 | Distance stat uses a location-pin icon | Match mockup | Suggest a route or ruler icon to the designer |
| 17 | Description shown as two paragraphs with a divider | Data stores paragraphs as a list | Confirm intent with the designer |
| 18 | Tab bar hidden on Details? | Hidden (matches mockup) | Platform convention for detail screens |
| 19 | Search: live or on submit? name only? combined with filter? on Saved too? | Live, case-insensitive, name only, AND with filter, Explore only | Convention; easy to change |
| 20 | Missing states: no results, empty Saved, loading, broken image, long names | Designed by us (§5–§6) | Screenshot them for PM review |
| 21 | Saved list order? Undo after an accidental unsave? | Newest first; no undo | Flag undo as a v2 candidate |
| 22 | Dark mode, tablets, landscape in scope? | Light mode, portrait phones only | Lock orientation; note in doc |
| 23 | No design file, exact colors, fonts, or image licenses supplied | Colors sampled from PNGs, system font, placeholder photos | Tokens file makes a later swap one-file |
| 24 | "Structure for auth later" isn't specified | Saved/hiked/settings live on the user object, not the trails | Documented in data contract (§4) |

**General strategy when the PM is unreachable:**
- Pick the most reversible option and log it as an assumption.
- Follow platform conventions (Apple HIG / Material Design) and comparable apps.
- Post the question async with a proposed default and a deadline.
- Put uncertain choices behind a setting or a single file so changing them is cheap.
- List open questions in the PR description.

---

## 9. Test script (→ PR "How to test" + screenshot list 📸)

1. Launch the app: Explore shows the full list with no errors 📸
2. Type "lake": only the Lake trails show. Type "LAKE" or " lake ": same result
3. Tap Hard with "easy" typed: "Easy Street Ridge" shows (search and filter are separate)
4. Search for something that matches nothing: no-results state; "Clear" restores the list 📸
5. Tap a card's star: it fills, and Details does **not** open
6. Tap a card: Details opens; back returns to Explore with search and filter intact 📸
7. Open the long-name trail and the no-image trail: layout holds, fallback shows 📸
8. Save from Details, go back: the Explore star matches; the trail appears on Saved
9. Unsave on Saved: the card disappears; unsave all → empty state 📸
10. Save two trails, fully close and reopen the app: both are still on Saved
11. Tap Start Navigation: maps opens at the trailhead
12. Profile → Units → Metric: km and m appear everywhere; the setting survives restart 📸
13. Profile → Log Out: confirmation appears (on phone and on web)
14. Turn on the largest system text size and VoiceOver/TalkBack: everything is readable and labeled
15. iPhone SE-sized screen (or a narrow web window): chips scroll, nothing is clipped

---

## 10. Coding-agent handoff prompt (log this in the prompt log)

```
Read docs/trailmate-spec.md. I'm the designer on a team building TrailMate
in Expo (blank template). Teammates own App.js, navigation, and screens.

Build ONLY:
- constants/theme.js from §3 (use the "a11y fix" column where given)
- utils/format.js from §4
- data/trails.js and data/user.js from §4, including every required edge-case trail
- the components in §5, inside components/, one file each

Rules:
- Components are presentational: data in via props, actions out via
  callbacks (onPress, onToggleSave, onSelect). No navigation or storage code.
- Every accessibility requirement in §5 is required, not optional.
- Use @expo/vector-icons for icons.
- Comment every JavaScript-specific line in plain language for a
  non-developer (I need to explain it later).
- Do not edit App.js or anything in screens/.

Before writing code: list the files you'll create and each component's
props, then wait for my OK.
```

---

## 11. Decision log

| Decision | Why | Easy to reverse? |
|---|---|---|
| Skip Storybook this week | Last week the Storybook + Expo Router setup blocked the whole app | Yes: components can be added to Storybook later |
| React Navigation instead of hand-configured Expo Router (proposed to team) | README uses the blank template, which has no navigation; Expo Router is what broke last week | Medium |
| Presentational components | Lets design and screen work happen in parallel without merge conflicts | Yes |
| One star color (`primary`) and one icon set | Mockup conflicts + contrast | Yes: tokens |
| Numbers stored in imperial units, converted at display | Units setting and sorting need numbers, not text | Yes |
| Saved/hiked status on the user, not the trail | Auth-ready structure | Yes |
