import { ArrowUpRight, type LucideIcon } from 'lucide-react';
import { whatsappUrl } from '@/lib/whatsapp';
import type { ReactNode } from 'react';

export function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      aria-hidden="true"
      className={className}
    >
      <path d="M20.5 11.6a8.4 8.4 0 0 1-12.4 7.5L3 20.5l1.4-4.9A8.4 8.4 0 1 1 20.5 11.6Z" />
      <path
        d="m8.4 7.4 1.3 2-1 1.2a9.2 9.2 0 0 0 4.6 4l1-1.1 2.2 1c-.3 1.7-1.5 2.1-3 1.6-3.8-1.2-6-3.8-6.7-6.3-.3-1.1.2-2.1 1.6-2.4Z"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function ContactButton({
  children,
  message,
  className = '',
  outline = false,
  icon = false,
}: {
  children: ReactNode;
  message?: string;
  className?: string;
  outline?: boolean;
  icon?: boolean;
}) {
  return (
    <a
      href={whatsappUrl(message)}
      target="_blank"
      rel="noopener noreferrer"
      className={`button ${outline ? 'button-outline' : 'button-primary'} ${className}`}
    >
      {icon && <WhatsAppIcon />}
      <span>{children}</span>
      <ArrowUpRight size={17} aria-hidden="true" />
    </a>
  );
}

export function Eyebrow({
  children,
  light = false,
}: {
  children: ReactNode;
  light?: boolean;
}) {
  return (
    <p className={`eyebrow${light ? ' eyebrow-light' : ''}`}>
      <span aria-hidden="true" />
      {children}
    </p>
  );
}

export function Feature({
  icon: Icon,
  children,
}: {
  icon: LucideIcon;
  children: ReactNode;
}) {
  return (
    <span className="feature">
      <Icon size={19} strokeWidth={1.5} aria-hidden="true" />
      {children}
    </span>
  );
}
