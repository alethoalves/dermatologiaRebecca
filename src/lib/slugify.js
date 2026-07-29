import baseSlugify from 'slugify';

export function slugify(text) {
  return baseSlugify(text, { lower: true, strict: true, locale: 'pt' });
}
