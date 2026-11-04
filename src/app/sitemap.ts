import type { MetadataRoute } from 'next';
import { company } from '@/data/site';
export default function sitemap(): MetadataRoute.Sitemap {
  return [{ url: `${company.url}/`, changeFrequency: 'monthly', priority: 1 }];
}
