import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';
import { services } from '@/data/site';
import { whatsappUrl } from '@/lib/whatsapp';
import { Reveal } from './reveal';
import { SectionAtmosphere } from './section-atmosphere';
import { TextReveal } from './text-reveal';
import { Eyebrow } from './ui';

export function ServicesSection() {
  return (
    <section
      id="servicos"
      className="section services-section atmospheric-section"
      aria-labelledby="services-title"
    >
      <SectionAtmosphere />
      <div className="container section-foreground">
        <Reveal className="services-heading">
          <div>
            <Eyebrow>O cuidado certo para o seu carro</Eyebrow>
            <h2 id="services-title">
              <TextReveal text="CADA DETALHE IMPORTA." />
              <br />
              <span className="text-accent">
                <TextReveal text="CADA PROTEÇÃO TAMBÉM." delay={0.12} />
              </span>
            </h2>
          </div>
          <div className="services-intro">
            <span className="accent-rule" aria-hidden="true" />
            <p>
              Quatro formas de cuidar. Uma mesma atenção ao que faz o seu carro
              especial.
            </p>
          </div>
        </Reveal>
        <div className="service-showcase">
          {services.map((service, index) => (
            <Reveal
              className={`service-editorial ${index === 0 ? 'service-featured' : index === 3 ? 'service-panorama' : 'service-compact'}`}
              key={service.title}
              delay={(index % 2) * 0.08}
            >
              <div className="service-editorial-photo">
                <Image
                  src={service.image}
                  alt={service.alt}
                  fill
                  sizes={
                    index === 0 || index === 3
                      ? '(max-width: 767px) 100vw, 55vw'
                      : '(max-width: 767px) 100vw, 25vw'
                  }
                />
                <span className="service-photo-shade" />
                <span className="service-photo-tag">{service.category}</span>
              </div>
              <div className="service-editorial-content">
                <span className="service-accent" aria-hidden="true" />
                <h3>{service.title}</h3>
                <p>{service.description}</p>
                <a
                  className="service-budget"
                  href={whatsappUrl(service.message)}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Solicitar orçamento de ${service.title.toLowerCase()}`}
                >
                  <span>Solicitar orçamento</span>
                  <span className="service-budget-icon">
                    <ArrowUpRight size={18} aria-hidden="true" />
                  </span>
                </a>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
