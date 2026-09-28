// Mock trail data for v1 (spec §4). Swap this file for an API call later —
// screens only read trails through services/trailRepository.js.
//
// Field notes
// - difficulty: exactly "Easy" | "Moderate" | "Hard" (matching is case-sensitive)
// - distanceMiles / elevationGainFt / durationMinutes: numbers in imperial units,
//   converted for display in utils/format.js. `null` shows "—".
// - description: array of paragraphs (the mockup shows paragraphs split by a rule)
// - imageUrl / mapImageUrl: a remote URL string, a local require(...), or null.
//   React Native needs every local image written out as its own require().
// - trailhead: { latitude, longitude } used by Start Navigation, or null.
//
// Several trails are deliberate edge cases (long name, no image, broken image,
// no map, flat/tiny trail, big values, missing stat, no trailhead, accents).

const IMG = {
  cedar: require('../assets/trails/cedar-ridge.jpg'),
  willow: require('../assets/trails/willow-creek.jpg'),
  sunset: require('../assets/trails/sunset-bluff.jpg'),
  granite: require('../assets/trails/granite-peak.jpg'),
  iron: require('../assets/trails/iron-gorge.jpg'),
  forest: require('../assets/trails/forest-valley.jpg'),
  river: require('../assets/trails/river-bend.jpg'),
};
const MAP = require('../assets/maps/trail-map.jpg');

export const TRAILS = [
  {
    id: 'trail-01',
    name: 'Cedar Ridge Loop',
    difficulty: 'Easy',
    distanceMiles: 4.2,
    elevationGainFt: 520,
    durationMinutes: 135,
    description: [
      'A shaded loop through old-growth cedar with gentle rolling grades and a few boardwalk crossings.',
      'Great for families and trail runners. Look for the overlook bench at the halfway point.',
    ],
    imageUrl: IMG.cedar,
    mapImageUrl: MAP,
    trailhead: { latitude: 42.2808, longitude: -83.743 },
  },
  {
    id: 'trail-02',
    name: 'Willow Creek Path',
    difficulty: 'Moderate',
    distanceMiles: 6.5,
    elevationGainFt: 980,
    durationMinutes: 210,
    description: [
      'Follows Willow Creek upstream past small cascades before climbing to a meadow.',
      'Expect a few rocky creek crossings; waterproof shoes help in spring.',
    ],
    imageUrl: IMG.willow,
    mapImageUrl: MAP,
    trailhead: { latitude: 42.3265, longitude: -83.803 },
  },
  {
    id: 'trail-03',
    name: 'Sunset Bluff',
    difficulty: 'Easy',
    distanceMiles: 2.1,
    elevationGainFt: 180,
    durationMinutes: 60,
    description: [
      'A short walk along the bluff with wide views over the water.',
      'Arrive an hour before sunset for the best light.',
    ],
    imageUrl: IMG.sunset,
    mapImageUrl: MAP,
    trailhead: { latitude: 44.8828, longitude: -86.0419 },
  },
  {
    id: 'trail-04',
    name: 'Granite Peak Summit Trail',
    difficulty: 'Hard',
    distanceMiles: 11.8,
    elevationGainFt: 3450,
    durationMinutes: 420,
    description: [
      'Experience a challenging hike to the summit of Granite Peak. Expect steep inclines and rocky terrain.',
      'Enjoy panoramic views and alpine scenery as you make your way to the top.',
    ],
    imageUrl: IMG.granite,
    mapImageUrl: MAP,
    trailhead: { latitude: 45.1567, longitude: -109.8071 },
  },
  {
    id: 'trail-05',
    name: 'Iron Gorge Descent',
    difficulty: 'Hard',
    distanceMiles: 9.3,
    elevationGainFt: 2100,
    durationMinutes: 360,
    description: [
      'Drops steeply into Iron Gorge to a 60-foot waterfall, then climbs back out on switchbacks.',
      'Trekking poles recommended. The lower section can be slick after rain.',
    ],
    imageUrl: IMG.iron,
    mapImageUrl: MAP,
    trailhead: { latitude: 46.4705, longitude: -89.9924 },
  },
  {
    // Edge case: very long name + very long description
    id: 'trail-06',
    name: 'Pictured Rocks Lakeshore – Chapel Basin to Mosquito Beach Loop',
    difficulty: 'Moderate',
    distanceMiles: 10.2,
    elevationGainFt: 1020,
    durationMinutes: 330,
    description: [
      'This loop links Chapel Falls, Chapel Rock and Mosquito Beach along the cliffs of Lake Superior. The first stretch climbs gently through hardwood forest to the Chapel Falls overlook, where the creek drops into a narrow basin.',
      'From Chapel Rock the trail follows the escarpment west with frequent views of sandstone cliffs streaked in copper and iron tones. Several spur paths lead to viewpoints; stay behind barriers, as the cliff edges are undercut and can collapse without warning.',
      'Mosquito Beach is a good lunch stop with shallow ledges to wade on calm days. The return leg heads inland on a quieter forest path. Biting flies can be intense in early summer, so bring repellent and plenty of water — there is no potable water on the loop.',
    ],
    imageUrl: IMG.river,
    mapImageUrl: MAP,
    trailhead: { latitude: 46.5292, longitude: -86.4448 },
  },
  {
    // Edge case: no image, flat (0 ft), tiny distance, single-sentence description
    id: 'trail-07',
    name: 'Mirror Lake Boardwalk',
    difficulty: 'Easy',
    distanceMiles: 0.5,
    elevationGainFt: 0,
    durationMinutes: 15,
    description: ['A flat, stroller-friendly boardwalk around a quiet kettle lake.'],
    imageUrl: null,
    mapImageUrl: MAP,
    trailhead: { latitude: 42.4492, longitude: -83.9906 },
  },
  {
    // Edge case: broken image URL (loads and fails → fallback)
    id: 'trail-08',
    name: 'Hidden Lake Overlook',
    difficulty: 'Moderate',
    distanceMiles: 3.8,
    elevationGainFt: 740,
    durationMinutes: 150,
    description: [
      'A steady climb to a rocky overlook above Hidden Lake.',
      'The final quarter mile is steep and rooty.',
    ],
    imageUrl: 'https://example.invalid/trailmate/hidden-lake.jpg',
    mapImageUrl: MAP,
    trailhead: { latitude: 42.5117, longitude: -83.6421 },
  },
  {
    // Edge case: no map preview (section hidden)
    id: 'trail-09',
    name: 'Crystal Lake Shoreline',
    difficulty: 'Easy',
    distanceMiles: 5.0,
    elevationGainFt: 90,
    durationMinutes: 120,
    description: [
      'Hugs the shoreline of Crystal Lake on packed gravel, with benches every half mile.',
      'Popular with birders in spring and fall.',
    ],
    imageUrl: IMG.forest,
    mapImageUrl: null,
    trailhead: { latitude: 44.6597, longitude: -86.2261 },
  },
  {
    // Edge case: name says "Easy" but it is rated Hard (search ≠ filter)
    id: 'trail-10',
    name: 'Easy Street Ridge',
    difficulty: 'Hard',
    distanceMiles: 7.4,
    elevationGainFt: 2600,
    durationMinutes: 300,
    description: [
      'Despite the name, this ridge route is relentless: exposed scrambles and very little shade.',
      'Start early and carry extra water.',
    ],
    imageUrl: IMG.granite,
    mapImageUrl: MAP,
    trailhead: { latitude: 45.1182, longitude: -109.6452 },
  },
  {
    // Edge case: accents + punctuation, largest values (12.8 mi, 10h 30m)
    id: 'trail-11',
    name: "Côte-d'Ours Pass",
    difficulty: 'Hard',
    distanceMiles: 12.8,
    elevationGainFt: 4120,
    durationMinutes: 630,
    description: [
      'A long day over a high pass with two false summits and a boulder field near the top.',
      'Weather changes quickly above treeline; turn around by 1 p.m.',
    ],
    imageUrl: IMG.iron,
    mapImageUrl: MAP,
    trailhead: { latitude: 47.0525, longitude: -88.0321 },
  },
  {
    // Edge case: missing elevation ("—") and no trailhead (Start Navigation disabled)
    id: 'trail-12',
    name: 'Old Mill Trail',
    difficulty: 'Easy',
    distanceMiles: 3.1,
    elevationGainFt: null,
    durationMinutes: 80,
    description: [
      'Follows the millrace to the ruins of a 19th-century grist mill.',
      'Trailhead location is being verified, so navigation is unavailable for now.',
    ],
    imageUrl: IMG.cedar,
    mapImageUrl: MAP,
    trailhead: null,
  },
  {
    id: 'trail-13',
    name: 'Maple Hollow Loop',
    difficulty: 'Moderate',
    distanceMiles: 4.9,
    elevationGainFt: 860,
    durationMinutes: 170,
    description: [
      'Rolling hills through a sugar-maple hollow, spectacular in October.',
      'Muddy in spring; the upper loop drains faster.',
    ],
    imageUrl: IMG.forest,
    mapImageUrl: MAP,
    trailhead: { latitude: 42.2195, longitude: -84.0412 },
  },
];
