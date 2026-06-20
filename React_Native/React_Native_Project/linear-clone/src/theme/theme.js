export const colors = {

  
  background: '#0A0A0B',      
  surface: '#141416',         
  surfaceHover: '#1C1C1F',  
  surfaceElevated: '#1A1A1D', 

  // Borders
  border: '#26262B',
  borderSubtle: '#1C1C1F',

  // Text
  textPrimary: '#EDEDEF',
  textSecondary: '#8B8B8F',
  textTertiary: '#5C5C61',

  // Brand / accent
  accent: '#5E6AD2',
  accentHover: '#4D58C4',
  accentMuted: '#5E6AD233', 


  priorityUrgent: '#EB5757',
  priorityHigh: '#E2B203',
  priorityMedium: '#5E6AD2',
  priorityLow: '#8B8B8F',
  priorityNone: '#4A4A4F',

  // Status colors (Kanban columns)
  statusBacklog: '#8B8B8F',
  statusTodo: '#E2B203',
  statusInProgress: '#5E6AD2',
  statusDone: '#4CB782',

  // Feedback
  success: '#4CB782',
  error: '#EB5757',
  warning: '#E2B203',
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  xxl: 32,
};

export const radii = {
  sm: 6,
  md: 10,
  lg: 14,
  full: 999,
};

export const typography = {


  // React Native has no built-in "h1/h2" — we define our own scale once,
  // then every screen reuses these instead of guessing fontSize values.


  h1: { fontSize: 28, fontWeight: '700', color: colors.textPrimary },
  h2: { fontSize: 20, fontWeight: '600', color: colors.textPrimary },
  h3: { fontSize: 16, fontWeight: '600', color: colors.textPrimary },
  body: { fontSize: 14, fontWeight: '400', color: colors.textPrimary },
  bodySecondary: { fontSize: 14, fontWeight: '400', color: colors.textSecondary },
  caption: { fontSize: 12, fontWeight: '400', color: colors.textTertiary },
  label: { fontSize: 12, fontWeight: '600', color: colors.textSecondary },
};

// Helper maps so screens can do `priorityMeta[issue.priority]` instead of
// writing if/else chains everywhere. Keeps screen code declarative.


export const priorityMeta = {
  urgent: { label: 'Urgent', color: colors.priorityUrgent, icon: 'alert-triangle' },
  high: { label: 'High', color: colors.priorityHigh, icon: 'arrow-up' },
  medium: { label: 'Medium', color: colors.priorityMedium, icon: 'minus' },
  low: { label: 'Low', color: colors.priorityLow, icon: 'arrow-down' },
  none: { label: 'No priority', color: colors.priorityNone, icon: 'circle' },
};

export const statusMeta = {
  backlog: { label: 'Backlog', color: colors.statusBacklog },
  todo: { label: 'Todo', color: colors.statusTodo },
  in_progress: { label: 'In Progress', color: colors.statusInProgress },
  done: { label: 'Done', color: colors.statusDone },
};

// Default export bundles everything — convenient for `import theme from ...`
// when a component needs more than one category.


const theme = { colors, spacing, radii, typography, priorityMeta, statusMeta };
export default theme;