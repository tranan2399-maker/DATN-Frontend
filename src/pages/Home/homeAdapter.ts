import { MovieType } from '@/Interface/movie';

export interface StitchMovie {
  id: string;
  slug: string;
  title: string;
  posterUrl: string;
  backdropUrl: string;
  rating: number;
  synopsis: string;
  duration: string;
  releaseDate: string;
  status: string;
  formats: string[];
  ageRating: string;
  genre: string[];
  startingPrice: number;
  isFeatured: boolean;
  trailer: string;
  language: string;
  subtitleType: string[];
  destroy: boolean;
}

export const mapMovieToStitch = (m: MovieType): StitchMovie => {
  const rawAny = m as any;

  // Filter or detect junk / soft-deleted
  const isDestroyed = !!rawAny.destroy || m.name === 'adfghsdf' || m.name === 'hellomotherfucker';

  // Normalize duplicate / test title
  let title = m.name || 'Đang cập nhật';
  let slug = m.slug || '';
  if (title === 'MAI 123') {
    title = 'Mai';
    slug = 'mai';
  }

  // Formats extraction
  const rawFormat = rawAny.format || rawAny.formats;
  let formats: string[] = [];
  if (Array.isArray(rawFormat)) {
    formats = rawFormat.filter(Boolean);
  } else if (rawFormat && typeof rawFormat === 'string') {
    formats = [rawFormat];
  }
  if (formats.length === 0) {
    // Default format assignment
    if (['Oppenheimer', 'Mai'].includes(title)) {
      formats = ['IMAX', '2D'];
    } else if (['AQUAMAN AND THE LOST KINGDOM', 'WONKA HOLA'].includes(title)) {
      formats = ['3D', '2D'];
    } else {
      formats = ['2D'];
    }
  }

  const ageRating = rawAny.age_id?.name || (m.age_limit ? `T${m.age_limit}` : 'P');

  const genre = Array.isArray(m.categoryId)
    ? m.categoryId.map((c: any) => c?.name || '').filter(Boolean)
    : [];

  // Subtitle / language
  let subtitleType: string[] = ['Phụ đề'];
  if (Array.isArray(rawAny.subtitleType) && rawAny.subtitleType.length > 0) {
    subtitleType = rawAny.subtitleType;
  } else if (title.includes('KATAK') || title.includes('Migration')) {
    subtitleType = ['Lồng tiếng', 'Phụ đề'];
  }

  // Starting price from movie prices if available, else standard 75,000đ
  let startingPrice = 75000;
  if (Array.isArray(rawAny.moviePriceCol) && rawAny.moviePriceCol.length > 0) {
    const prices = rawAny.moviePriceCol.map((p: any) => p.price).filter((p: any) => typeof p === 'number' && p > 0);
    if (prices.length > 0) startingPrice = Math.min(...prices);
  }

  return {
    id: m._id || '',
    slug: slug || (title ? title.toLowerCase().replace(/[^a-z0-9]/g, '-') : ''),
    title,
    posterUrl: m.image || '',
    backdropUrl: rawAny.backdrop || m.image || '',
    rating: m.rate || 5,
    synopsis: m.desc || 'Đang cập nhật',
    duration: m.duration ? `${m.duration} phút` : '120 phút',
    releaseDate: (() => {
      if (!m.fromDate) return 'Đang cập nhật';
      const d = new Date(m.fromDate);
      if (!isNaN(d.getTime())) return d.toLocaleDateString('vi-VN');
      const str = String(m.fromDate).trim();
      return str && str !== 'undefined' && str !== 'null' && str !== 'Invalid Date' ? str : 'Đang cập nhật';
    })(),
    status:
      m.status === 'IS_SHOWING'
        ? 'now_showing'
        : m.status === 'COMING_SOON'
        ? 'coming_soon'
        : 'special',
    formats,
    ageRating,
    genre,
    startingPrice,
    isFeatured: !!rawAny.isFeatured || ['Oppenheimer', 'Mai', 'WONKA HOLA'].includes(title),
    trailer: rawAny.trailer || '',
    language: rawAny.language || 'Tiếng Việt',
    subtitleType,
    destroy: isDestroyed,
  };
};
