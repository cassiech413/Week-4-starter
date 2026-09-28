// Design tokens (spec §3). Every screen and component reads colors, type,
// spacing and radii from here, so a visual change is a one-file edit.
// Colors use the spec's "a11y fix" column where one was proposed.

export const colors = {
  primary: '#2F6B47', // app title, selected chip, active tab, saved star
  cta: '#1F7A3A', // Start Navigation button
  bgScreen: '#F5F5F5',
  bgCard: '#FFFFFF',
  border: '#E3E3E3',
  divider: '#E5E7EB',
  textPrimary: '#1F2328',
  textSecondary: '#5F6673', // spec #6B7280 nudged darker so it passes 4.5:1 on #F5F5F5
  textOnColor: '#FFFFFF',

  easy: '#2E7D4F',
  easyText: '#FFFFFF',
  moderate: '#F2A824',
  moderateText: '#1F2328', // white on amber fails contrast → dark text
  hard: '#C62828',
  hardText: '#FFFFFF',
  unknownBadge: '#5F6673',

  starSaved: '#2F6B47', // one saved-star color everywhere (spec §8 #11)
  starUnsaved: '#6B7280',
  chevron: '#8A919C',
  destructive: '#C62828',

  overlayDark: 'rgba(0,0,0,0.45)',
  overlayLight: 'rgba(255,255,255,0.92)',
  imageLoading: '#E5E7EB',
  imageFallback: '#DDEBDF',
  disabled: '#A3AAB3',
  tabInactive: '#6B7280',
};

export const type = {
  appTitle: { fontSize: 28, fontWeight: '700', color: colors.primary },
  screenTitle: { fontSize: 28, fontWeight: '600', color: colors.textPrimary },
  detailTitle: { fontSize: 22, fontWeight: '700', color: colors.textPrimary },
  cardTitle: { fontSize: 18, fontWeight: '600', color: colors.textPrimary },
  meta: { fontSize: 15, fontWeight: '400', color: colors.textSecondary },
  badge: { fontSize: 13, fontWeight: '600' },
  sectionTitle: { fontSize: 18, fontWeight: '700', color: colors.textPrimary },
  body: { fontSize: 15, fontWeight: '400', lineHeight: 22, color: colors.textPrimary },
  statValue: { fontSize: 17, fontWeight: '700', color: colors.textPrimary },
  statLabel: { fontSize: 13, fontWeight: '400', color: colors.textSecondary },
  profileName: { fontSize: 24, fontWeight: '700', color: colors.textPrimary },
  settingsRow: { fontSize: 17, fontWeight: '400', color: colors.textPrimary },
  button: { fontSize: 18, fontWeight: '700', color: colors.textOnColor },
  tabLabel: { fontSize: 12 },
};

export const spacing = {
  screen: 16,
  card: 12,
  cardGap: 12,
  chipGap: 8,
  section: 20,
};

export const radius = {
  card: 12,
  image: 8,
  chip: 10,
  search: 24,
  pill: 999,
  button: 12,
  map: 12,
};

export const sizes = {
  thumbWidth: 100,
  thumbHeight: 88,
  heroHeight: 220,
  avatar: 112,
  minTouch: 44,
};

// Soft card shadow that looks similar on iOS (shadow*) and Android (elevation).
export const cardShadow = {
  shadowColor: '#000',
  shadowOpacity: 0.06,
  shadowRadius: 6,
  shadowOffset: { width: 0, height: 2 },
  elevation: 2,
};
