/**
 * Showtime helper utilities for Dream Cinema
 * Handles case-insensitive status normalization and Vietnam timezone (Asia/Ho_Chi_Minh) date operations.
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

/**
 * Extracts { year, month, day, dateString } in Vietnam timezone (Asia/Ho_Chi_Minh)
 */
export const getVNDateParts = (dateOrIso: string | Date) => {
  const d = typeof dateOrIso === 'string' ? new Date(dateOrIso) : dateOrIso;
  const formatter = new Intl.DateTimeFormat('en-GB', {
    timeZone: 'Asia/Ho_Chi_Minh',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  });
  const parts = formatter.formatToParts(d);
  const day = parseInt(parts.find(p => p.type === 'day')?.value || '1', 10);
  const month = parseInt(parts.find(p => p.type === 'month')?.value || '1', 10);
  const year = parseInt(parts.find(p => p.type === 'year')?.value || '1970', 10);
  const dateString = `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
  return { year, month, day, dateString };
};

/**
 * Compares two dates/ISOs to check if they represent the same calendar day in Vietnam timezone.
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
  const d = typeof dateOrIso === 'string' ? new Date(dateOrIso) : dateOrIso;
  return new Intl.DateTimeFormat('vi-VN', {
    timeZone: 'Asia/Ho_Chi_Minh',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false
  }).format(d);
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
    else label = `${dayOfWeek} ${String(day).padStart(2, '0')}/${String(month).padStart(2, '0')}`;

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
