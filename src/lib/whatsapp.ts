import { company } from '@/data/site';

export function whatsappUrl(message: string = company.generalMessage): string {
  return `https://wa.me/${company.phone}?text=${encodeURIComponent(message)}`;
}
