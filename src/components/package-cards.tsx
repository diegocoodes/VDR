import { ArrowUpRight, Check, Gem, Layers3, ShieldCheck } from 'lucide-react';
import { packages } from '@/data/site';
import { whatsappUrl } from '@/lib/whatsapp';
import { Reveal } from './reveal';
import { TextReveal } from './text-reveal';

const icons = [ShieldCheck, Layers3, Gem];

export function PackageCards() {
  return (
    <div className="coating-packages">
      {packages.map((pkg, index) => {
        const Icon = icons[index] ?? ShieldCheck;
        return (
          <Reveal
            key={pkg.name}
            className={`coating-card${index === 2 ? ' coating-card-complete' : ''}`}
            delay={index * 0.08}
          >
            <div className="coating-card-heading">
              <p>PACOTE DE VITRIFICAÇÃO</p>
              <span className="coating-icon">
                <Icon size={27} strokeWidth={1.4} aria-hidden="true" />
              </span>
            </div>
            <h3>
              <TextReveal text={pkg.name} />
            </h3>
            <div className="coating-term">
              <p>{pkg.duration}</p>
              <span>DE PROTEÇÃO ANUNCIADA</span>
            </div>
            <div className="coating-divider" aria-hidden="true">
              <span />
            </div>
            <ul>
              {pkg.features.map((feature) => (
                <li key={feature}>
                  <Check size={16} aria-hidden="true" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
            <a
              href={whatsappUrl(
                `Olá! Conheci a VDR pelo site e gostaria de saber mais sobre o pacote ${pkg.name} de vitrificação para meu veículo.`,
              )}
              className="coating-cta"
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Consultar pacote ${pkg.name}`}
            >
              <span>Conhecer o pacote</span>
              <ArrowUpRight size={18} aria-hidden="true" />
            </a>
          </Reveal>
        );
      })}
    </div>
  );
}
