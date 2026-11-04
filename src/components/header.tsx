'use client';

import Image from 'next/image';
import { Menu, X, ArrowUpRight, MapPin } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { company, navigation } from '@/data/site';
import { ContactButton } from './ui';

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const dialog = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 30);
    update();
    window.addEventListener('scroll', update, { passive: true });
    const desktop = window.matchMedia('(min-width: 1100px)');
    const closeOnDesktop = () => {
      if (desktop.matches) setOpen(false);
    };
    desktop.addEventListener('change', closeOnDesktop);
    return () => {
      window.removeEventListener('scroll', update);
      desktop.removeEventListener('change', closeOnDesktop);
    };
  }, []);

  useEffect(() => {
    if (!open) {
      dialog.current?.close();
      return;
    }
    dialog.current?.showModal();
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = previous;
    };
  }, [open]);

  return (
    <>
      <header className={`site-header${scrolled ? ' is-scrolled' : ''}`}>
        <div className="header-inner container">
          <a
            href="#inicio"
            aria-label={`${company.name}, início`}
            className="brand-link"
          >
            <Image
              src="/images/vdr-logo.webp"
              width={162}
              height={60}
              alt="VDR Studio Automotivo"
              loading="eager"
            />
          </a>
          <nav aria-label="Navegação principal" className="desktop-nav">
            {navigation.map((item) => (
              <a key={item.href} href={item.href}>
                {item.label}
              </a>
            ))}
          </nav>
          <ContactButton className="header-cta">
            Solicitar orçamento
          </ContactButton>
          <button
            type="button"
            className="menu-toggle icon-button"
            aria-label="Abrir menu"
            aria-expanded={open}
            aria-controls="mobile-navigation"
            onClick={() => setOpen(true)}
          >
            <Menu size={26} />
          </button>
        </div>
      </header>
      <dialog
        ref={dialog}
        id="mobile-navigation"
        className="mobile-menu"
        aria-labelledby="menu-title"
        onCancel={() => setOpen(false)}
        onClose={() => setOpen(false)}
      >
        <div className="mobile-menu-top">
          <Image
            src="/images/vdr-logo.webp"
            width={140}
            height={52}
            alt="VDR Studio Automotivo"
          />
          <button
            className="icon-button"
            onClick={() => setOpen(false)}
            aria-label="Fechar menu"
          >
            <X />
          </button>
        </div>
        <p id="menu-title" className="sr-only">
          Menu de navegação
        </p>
        <nav aria-label="Navegação mobile">
          {navigation.map((item) => (
            <a key={item.href} href={item.href} onClick={() => setOpen(false)}>
              {item.label}
              <ArrowUpRight size={24} aria-hidden="true" />
            </a>
          ))}
        </nav>
        <ContactButton className="mobile-menu-cta" icon>
          Solicitar orçamento
        </ContactButton>
        <p className="mobile-location">
          <MapPin size={15} aria-hidden="true" /> Mirassol, São Paulo
        </p>
      </dialog>
    </>
  );
}
