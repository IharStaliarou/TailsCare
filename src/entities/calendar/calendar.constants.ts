import { TEventType } from './calendar.types'

// TODO: refactor

export const CALENDAR_LS_KEY = 'tails-care-calendar-local-storage-data-key'

export const EVENT_TYPE_VALUES = [
  'vet',
  'medication',
  'feeding',
  'walking',
  'other',
] as const satisfies readonly TEventType[]

export const CALENDAR_CONFIG = {
  HOURS: Array.from({ length: 24 }, (_, i) => i),
  WEEK_DAYS: 7,
  MAX_VISIBLE_EVENTS: 2,
  ANIMATION: {
    HOVER_Y: -4,
  },
} as const

export const TIME_CONFIG = {
  START_OF_DAY: 'T00:00:00',
  DEFAULT_TIME: '09:00',
} as const

// TODO: move to theme
export const COLORS_CONFIG = {
  INDIGO: {
    50: 'bg-indigo-50',
    100: 'bg-indigo-100',
    200: 'border-indigo-200',
    400: 'bg-indigo-400',
    500: 'bg-indigo-500 text-indigo-600 border-indigo-500',
    600: 'border-indigo-600 bg-indigo-600',
    700: 'text-indigo-700',
  },
  RED: {
    50: 'bg-red-50',
    500: 'text-red-500 border-red-500',
    600: 'text-red-600',
  },
  GRAY: {
    50: 'bg-gray-50',
    100: 'border-gray-100 bg-gray-100',
    200: 'border-gray-200',
    300: 'text-gray-300',
    400: 'text-gray-400 border-gray-400',
    500: 'text-gray-500',
    600: 'text-gray-600',
    700: 'text-gray-700',
    800: 'text-gray-800',
    900: 'text-gray-900',
  },
  WHITE: 'bg-white',
} as const

export const DIMENSIONS = {
  DAY_CARD: {
    CIRCLE_SIZE: 'h-14 w-14',
    SQUARE_MIN_HEIGHT: 'min-h-40',
  },
  BUTTON: {
    SM: 'h-8 w-8',
    MD: 'h-9 w-9',
    LG: 'h-9 px-4',
  },
  INDICATOR: {
    SIZE: 'h-3 w-3',
  },
} as const

export const ROUNDING = {
  FULL: 'rounded-full',
  XL: 'rounded-xl',
  XL2: 'rounded-2xl',
  XL4: 'rounded-4xl',
  LG: 'rounded-lg',
} as const

export const WEEKEND_DAYS = {
  SUNDAY: 0,
  SATURDAY: 6,
} as const

export const UI_TEXTS = {
  TIMEZONE_LABEL: 'GMT',
  TODAY_BUTTON: 'Today',
  PLUS_SYMBOL: '+',
  BULLET_SYMBOL: '•',
} as const
