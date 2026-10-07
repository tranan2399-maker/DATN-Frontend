/**
 * Showtime helper utilities for Dream Cinema
 * Handles case-insensitive status normalization and Vietnam timezone date operations.
 * Resolves UTC ISO timezone shift where stored local times carry 'Z' suffix.
 */

export type NormalizedShowtimeStatus = 'Available' | 'Full' | 'Cancelled' | 'Approval' | 'Unknown';

/**
 * Normalizes showtime status string case-insensitively without modifying backend enums or database data.
 */
export const normalizeShowtimeStatus = (status?: string): NormalizedShowtimeStatus => {
  if (!status) return 'Unknown';
  const s = String(status).trim().toLowerCase();
  if (s === 'available') return 'Available';
  if (s === 'full') return 'Full';
  if (s === 'cancelled') return 'Cancelled';
  if (s === 'approval') return 'Approval';
  return 'Unknown';
};

export interface DateTimeParts {
  year: number;
  month: number;
  day: number;
  dateString: string; // YYYY-MM-DD
  timeFormatted: string; // HH:mm
}

/**
 * Robust date/time parser:
 * 1. ISO string with or without Z (e.g. '2026-10-07T20:00:00.000Z' -> 2026-10-07 20:00)
 * 2. Vietnam format string (e.g. '07-10-2026 20:00' -> 2026-10-07 20:00)
 * 3. Date object -> formats in Asia/Ho_Chi_Minh timezone
 */
export const parseDateTimeParts = (input: string | Date | undefined | null): DateTimeParts | null => {
  if (!input) return null;

  if (typeof input === 'string') {
    const trimmed = input.trim();

    // Case 1: YYYY-MM-DD[T or space]HH:mm... (ISO format with or without Z)
    const isoMatch = trimmed.match(/^(\d{4})-(\d{2})-(\d{2})(?:[T\s](\d{2}):(\d{2}))?/);
    if (isoMatch) {
      const year = parseInt(isoMatch[1], 10);
      const month = parseInt(isoMatch[2], 10);
      const day = parseInt(isoMatch[3], 10);
      const hour = isoMatch[4] || '00';
      const minute = isoMatch[5] || '00';
      const mStr = String(month).padStart(2, '0');
      const dStr = String(day).padStart(2, '0');
      return {
        year,
        month,
        day,
        dateString: year + '-' + mStr + '-' + dStr,
        timeFormatted: hour + ':' + minute
      };
    }

    // Case 2: DD-MM-YYYY[T or space]HH:mm... (Vietnam text format)
    const vnMatch = trimmed.match(/^(\d{2})-(\d{2})-(\d{4})(?:[T\s](\d{2}):(\d{2}))?/);
    if (vnMatch) {
      const day = parseInt(vnMatch[1], 10);
      const month = parseInt(vnMatch[2], 10);
      const year = parseInt(vnMatch[3], 10);
      const hour = vnMatch[4] || '00';
      const minute = vnMatch[5] || '00';
      const mStr = String(month).padStart(2, '0');
      const dStr = String(day).padStart(2, '0');
      return {
        year,
        month,
        day,
        dateString: year + '-' + mStr + '-' + dStr,
        timeFormatted: hour + ':' + minute
      };
    }
  }

  // Case 3: Date object or other parseable string
  const d = typeof input === 'string' ? new Date(input) : input;
  if (!(d instanceof Date) || isNaN(d.getTime())) return null;

  const formatter = new Intl.DateTimeFormat('en-GB', {
    timeZone: 'Asia/Ho_Chi_Minh',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false
  });
  const parts = formatter.formatToParts(d);
  const day = parseInt(parts.find((p) => p.type === 'day')?.value || '1', 10);
  const month = parseInt(parts.find((p) => p.type === 'month')?.value || '1', 10);
  const year = parseInt(parts.find((p) => p.type === 'year')?.value || '1970', 10);
  const hour = parts.find((p) => p.type === 'hour')?.value || '00';
  const minute = parts.find((p) => p.type === 'minute')?.value || '00';
  const mStr = String(month).padStart(2, '0');
  const dStr = String(day).padStart(2, '0');

  return {
    year,
    month,
    day,
    dateString: year + '-' + mStr + '-' + dStr,
    timeFormatted: hour + ':' + minute
  };
};

/**
 * Extracts { year, month, day, dateString } in Vietnam date standard.
 */
export const getVNDateParts = (dateOrIso: string | Date) => {
  const parsed = parseDateTimeParts(dateOrIso);
  if (!parsed) {
    return { year: 1970, month: 1, day: 1, dateString: '1970-01-01' };
  }
  return {
    year: parsed.year,
    month: parsed.month,
    day: parsed.day,
    dateString: parsed.dateString
  };
};

/**
 * Compares two dates/ISOs to check if they represent the same calendar day.
 */
export const isSameDayVN = (d1: string | Date, d2: string | Date): boolean => {
  if (!d1 || !d2) return false;
  return getVNDateParts(d1).dateString === getVNDateParts(d2).dateString;
};

/**
 * Formats time string (HH:mm) in Vietnam timezone.
 */
export const formatTimeVN = (dateOrIso: string | Date): string => {
  if (!dateOrIso) return '';
  const parsed = parseDateTimeParts(dateOrIso);
  return parsed ? parsed.timeFormatted : '';
};

/**
 * Generates an array of date tabs starting from today in Vietnam timezone.
 */
export const buildVNDateTabs = (count = 7) => {
  const now = new Date();
  const tabs = [];
  const dayNames = ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'];

  for (let i = 0; i < count; i++) {
    const d = new Date(now.getTime() + i * 24 * 60 * 60 * 1000);
    const { day, month, dateString } = getVNDateParts(d);
    const dayOfWeek = dayNames[d.getDay()];

    let label = '';
    if (i === 0) label = 'Hôm nay';
    else if (i === 1) label = 'Ngày mai';
    else {
      const dStr = String(day).padStart(2, '0');
      const mStr = String(month).padStart(2, '0');
      label = dayOfWeek + ' ' + dStr + '/' + mStr;
    }

    tabs.push({
      date: d,
      dateString,
      day,
      month,
      label
    });
  }
  return tabs;
};
