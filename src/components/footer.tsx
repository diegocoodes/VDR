import Image from 'next/image';
import { ArrowUpRight, Camera, Mail, MapPin } from 'lucide-react';
import { company, navigation } from '@/data/site';
import { whatsappUrl } from '@/lib/whatsapp';
import { WhatsAppIcon } from './ui';

export function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-main">
        <div className="footer-brand">
          <a href="#inicio" aria-label="VDR Studio Automotivo, início">
            <Image
              src="/images/vdr-logo.webp"
              width={216}
              height={80}
              alt="VDR Studio Automotivo"
            />
          </a>
          <p>
            Proteção para a pintura.
            <br />
            Cuidado com o que é seu.
          </p>
          <a
            href={company.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="social-link"
          >
            <Camera size={18} aria-hidden="true" /> Acompanhe a VDR{' '}
            <ArrowUpRight size={15} aria-hidden="true" />
          </a>
        </div>
        <nav aria-label="Navegação do rodapé" className="footer-nav">
          <p className="footer-label">EXPLORE</p>
          {navigation.slice(1).map((item) => (
            <a key={item.href} href={item.href}>
              {item.label}
            </a>
          ))}
        </nav>
        <div className="footer-contact">
          <p className="footer-label">VAMOS CONVERSAR</p>
          <a
            href={whatsappUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="footer-phone"
          >
            <WhatsAppIcon />
            {company.phoneDisplay}
            <ArrowUpRight size={18} aria-hidden="true" />
          </a>
          <a href={`mailto:${company.email}`} className="footer-email">
            <Mail size={17} aria-hidden="true" />
            <span>{company.email}</span>
          </a>
          <a
            href={company.maps}
            target="_blank"
            rel="noopener noreferrer"
            className="footer-address"
          >
            <MapPin size={18} aria-hidden="true" />
            <span>
              {company.address}
              <br />
              Mirassol, São Paulo
              <br />
              <span className="map-link">
                Como chegar <ArrowUpRight size={13} aria-hidden="true" />
              </span>
            </span>
          </a>
        </div>
      </div>
      <div className="container footer-bottom">
        <p>
          © {new Date().getFullYear()} {company.name}. Todos os direitos
          reservados.
        </p>
        <div>
          <a href={company.privacy} target="_blank" rel="noopener noreferrer">
            Política de Privacidade
          </a>
          {company.terms && (
            <a href={company.terms} target="_blank" rel="noopener noreferrer">
              Termos de Uso
            </a>
          )}
          <a href="#inicio" className="back-top">
            Voltar ao topo <ArrowUpRight size={15} aria-hidden="true" />
          </a>
        </div>
      </div>
    </footer>
  );
}
