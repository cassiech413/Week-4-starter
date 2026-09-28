// Display + screen-reader formatting (spec §4).
// Trail numbers are stored in imperial units and converted only when shown.

export const MISSING = '—';

const KM_PER_MILE = 1.609;
const M_PER_FT = 0.3048;

const isNumber = (value) => typeof value === 'number' && Number.isFinite(value);

// "3450" -> "3,450" (manual so it behaves the same on Hermes, iOS, Android, web)
export function withThousands(n) {
  return String(Math.round(n)).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

export function formatDistance(miles, units = 'imperial') {
  if (!isNumber(miles)) return MISSING;
  return units === 'metric'
    ? `${(miles * KM_PER_MILE).toFixed(1)}\u00A0km` // non-breaking space keeps value + unit together
    : `${miles.toFixed(1)}\u00A0mi`;
}

export function spokenDistance(miles, units = 'imperial') {
  if (!isNumber(miles)) return 'unknown distance';
  return units === 'metric'
    ? `${(miles * KM_PER_MILE).toFixed(1)} kilometers`
    : `${miles.toFixed(1)} miles`;
}

export function formatElevation(feet, units = 'imperial') {
  if (!isNumber(feet)) return MISSING;
  return units === 'metric'
    ? `${withThousands(feet * M_PER_FT)}\u00A0m`
    : `${withThousands(feet)}\u00A0ft`;
}

export function spokenElevation(feet, units = 'imperial') {
  if (!isNumber(feet)) return 'unknown';
  return units === 'metric'
    ? `${withThousands(feet * M_PER_FT)} meters`
    : `${withThousands(feet)} feet`;
}

// 135 -> "2h 15m", 60 -> "1h 0m" (matches the mockup), 45 -> "45m"
export function formatDuration(minutes) {
  if (!isNumber(minutes)) return MISSING;
  const h = Math.floor(minutes / 60);
  const m = Math.round(minutes % 60);
  return h === 0 ? `${m}m` : `${h}h\u00A0${m}m`;
}

// 135 -> "2 hours 15 minutes", 60 -> "1 hour"
export function spokenDuration(minutes) {
  if (!isNumber(minutes)) return 'unknown time';
  const h = Math.floor(minutes / 60);
  const m = Math.round(minutes % 60);
  const parts = [];
  if (h > 0) parts.push(`${h} ${h === 1 ? 'hour' : 'hours'}`);
  if (m > 0 || h === 0) parts.push(`${m} ${m === 1 ? 'minute' : 'minutes'}`);
  return parts.join(' ');
}

export function formatHikedCount(count) {
  if (!isNumber(count) || count <= 0) return 'No trails hiked yet';
  return count === 1 ? '1 trail hiked' : `${count} trails hiked`;
}

export function unitsLabel(units) {
  return units === 'metric' ? 'Metric' : 'Imperial';
}
