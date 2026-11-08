import Image from 'next/image';
import {
  ArrowDown,
  ArrowUpRight,
  Check,
  ChevronDown,
  Crosshair,
  ShieldCheck,
  Sparkles,
  Star,
} from 'lucide-react';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { HeroVideo } from '@/components/hero-video';
import { ProjectVideo } from '@/components/project-video';
import { PpfSelector } from '@/components/ppf-selector';
import { Reveal } from '@/components/reveal';
import { ServicesSection } from '@/components/services-section';
import { SectionAtmosphere } from '@/components/section-atmosphere';
import { ProfileFrame } from '@/components/profile-frame';
import { TextReveal } from '@/components/text-reveal';
import { AutomotiveDetails } from '@/components/automotive-details';
import { PackageCards } from '@/components/package-cards';
import { ContactButton, Eyebrow, Feature, WhatsAppIcon } from '@/components/ui';
import { company, faqs, socialProof, testimonials, media } from '@/data/site';
import { whatsappUrl } from '@/lib/whatsapp';

const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'AutomotiveBusiness',
  '@id': `${company.url}/#empresa`,
  name: company.name,
  url: company.url,
  telephone: `+${company.phone}`,
  email: company.email,
  description:
    'Estúdio especializado em PPF, vitrificação, polimento técnico e proteção automotiva em Mirassol, com atendimento a São José do Rio Preto e região.',
  logo: `${company.url}/images/vdr-logo-original.png`,
  image: `${company.url}/images/hero.webp`,
  address: {
    '@type': 'PostalAddress',
    streetAddress: company.address,
    addressLocality: company.city,
    addressRegion: company.state,
    addressCountry: 'BR',
  },
  areaServed: [
    { '@type': 'City', name: 'Mirassol' },
    { '@type': 'City', name: 'São José do Rio Preto' },
  ],
  sameAs: [company.instagram],
  hasMap: company.maps,
};

export default function Home() {
  return (
    <>
      <a className="skip-link" href="#conteudo">
        Pular para o conteúdo
      </a>
      <Header />
      <main id="conteudo" tabIndex={-1}>
        <section id="inicio" className="hero" aria-labelledby="hero-title">
          <HeroVideo
            videoId={media.hero.videoId}
            startSeconds={media.hero.startSeconds}
            poster={media.hero.poster}
          />
          <div className="hero-shade" />
          <div className="hero-content container">
            <div className="hero-copy">
              <div className="hero-enter hero-enter-1">
                <Eyebrow>Proteção automotiva premium</Eyebrow>
              </div>
              <h1
                id="hero-title"
                className="hero-title hero-enter hero-enter-2"
              >
                <span>
                  <TextReveal text="A PINTURA ORIGINAL" />
                </span>
                <span>
                  <TextReveal text="DO SEU CARRO MERECE" />
                </span>
                <span className="text-accent">
                  <TextReveal text="CONTINUAR ORIGINAL." />
                </span>
              </h1>
              <p className="hero-description hero-enter hero-enter-3">
                Especialistas em PPF, vitrificação e proteção automotiva em
                Mirassol e São José do Rio Preto. Cuidado técnico para preservar
                cada detalhe do seu veículo.
              </p>
              <div className="hero-actions hero-enter hero-enter-4">
                <ContactButton icon>Quero proteger meu carro</ContactButton>
                <a href="#servicos" className="button button-ghost">
                  Conhecer os serviços{' '}
                  <ArrowDown size={16} aria-hidden="true" />
                </a>
              </div>
            </div>
          </div>
        </section>

        <section
          className="proof-strip"
          aria-label="A experiência da VDR em números"
        >
          <div className="container proof-inner">
            {socialProof.items.map((item, index) => (
              <div className="proof-item" key={item.label}>
                <p className="proof-value">
                  {item.value}
                  <span>{item.suffix}</span>
                </p>
                <div>
                  <p className="proof-label">{item.label}</p>
                  {index === 1 ? (
                    <span
                      className="proof-stars"
                      role="img"
                      aria-label="Cinco estrelas, conforme divulgado pela VDR"
                    >
                      {Array.from({ length: 5 }, (_, i) => (
                        <Star
                          key={i}
                          size={12}
                          fill="currentColor"
                          aria-hidden="true"
                        />
                      ))}
                      <span>NO GOOGLE</span>
                    </span>
                  ) : (
                    <p className="proof-detail">{item.detail}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
          <p className="proof-source container">{socialProof.note}</p>
        </section>

        <ServicesSection />

        <section
          id="ppf"
          className="section ppf-section automotive-section"
          aria-labelledby="ppf-title"
        >
          <AutomotiveDetails variant="bodywork" />
          <div className="container section-foreground">
            <div className="ppf-showcase">
              <Reveal className="ppf-film-copy">
                <Eyebrow>PPF • Paint Protection Film</Eyebrow>
                <h2 id="ppf-title">
                  <TextReveal text="A PINTURA É ORIGINAL." /> <br />
                  <span className="text-accent">
                    <TextReveal text="A PROTEÇÃO É VDR." />
                  </span>
                </h2>
                <p>
                  Uma película transparente. Uma camada a mais de cuidado.
                  Veja o PPF em ação e descubra como ajudar a preservar a
                  pintura original do seu carro.
                </p>
                <div className="ppf-film-features">
                  <Feature icon={ShieldCheck}>
                    Barreira contra pequenos impactos
                  </Feature>
                  <Feature icon={Sparkles}>
                    Acabamento original preservado
                  </Feature>
                  <Feature icon={Crosshair}>
                    Aplicação cuidadosa em cada curva
                  </Feature>
                </div>
                <ContactButton
                  icon
                  message="Olá! Conheci a VDR pelo site, vi o vídeo do PPF em ação e gostaria de proteger a pintura do meu veículo."
                >
                  Quero proteger minha pintura
                </ContactButton>
                <p className="ppf-film-note">
                  O PPF ajuda a reduzir danos. A proteção depende do impacto,
                  da cobertura e dos cuidados com o veículo.
                </p>
              </Reveal>
              <Reveal className="ppf-film-frame">
                <ProjectVideo
                  src={media.ppf.src}
                  poster={media.ppf.poster}
                  label={media.ppf.label}
                  controls
                />
                <div className="ppf-film-caption">
                  <span>
                    <i aria-hidden="true" />PPF EM AÇÃO
                  </span>
                  <span>VDR STUDIO AUTOMOTIVO</span>
                </div>
              </Reveal>
            </div>
            <div className="ppf-coverage-heading">
              <Eyebrow>Proteção sob medida</Eyebrow>
              <h3>
                ESCOLHA ONDE <span className="text-accent">PROTEGER.</span>
              </h3>
              <p>
                Compare as coberturas e encontre a melhor opção para a sua rotina.
              </p>
            </div>
            <Reveal>
              <PpfSelector />
            </Reveal>
          </div>
        </section>

        <section
          id="zero-km"
          className="section zero-section automotive-section"
          aria-labelledby="zero-title"
        >
          <AutomotiveDetails variant="tread" />
          <div className="container section-foreground">
            <div className="zero-intro">
              <Reveal className="zero-photo">
                <Image
                  src="/images/zero-km.webp"
                  alt="BMW novo no estúdio VDR, com reflexos da iluminação no acabamento"
                  fill
                  sizes="(max-width: 767px) 100vw, 45vw"
                />
                <span className="image-corner-label">
                  <Sparkles size={16} aria-hidden="true" /> CUIDADO DESDE O
                  PRIMEIRO DIA
                </span>
              </Reveal>
              <Reveal className="zero-copy">
                <Eyebrow>Zero km & vitrificação</Eyebrow>
                <h2 id="zero-title">
                  <TextReveal text="SEU CARRO É NOVO." />
                  <br />A PROTEÇÃO{' '}
                  <span className="text-accent">
                    <TextReveal text="NÃO PRECISA ESPERAR." />
                  </span>
                </h2>
                <p>
                  Sol, chuva e contaminantes fazem parte da rotina desde os
                  primeiros quilômetros. Prepare a pintura agora para preservar
                  o prazer de ter um carro novo.
                </p>
                <p>
                  A vitrificação cerâmica ajuda a manter o acabamento,
                  intensifica o brilho e facilita os próximos cuidados.
                </p>
                <div className="zero-features">
                  <Feature icon={ShieldCheck}>Proteção da superfície</Feature>
                  <Feature icon={Sparkles}>
                    Brilho e facilidade de limpeza
                  </Feature>
                </div>
              </Reveal>
            </div>
            <PackageCards />
            <div className="packages-bottom">
              <p className="fine-print">
                A durabilidade depende do serviço contratado, das condições de
                uso e da manutenção adequada. Consulte a equipe para confirmar
                as condições de cada pacote.
              </p>
              <ContactButton outline>
                Quero atendimento personalizado
              </ContactButton>
            </div>
          </div>
        </section>

        <section
          id="projetos"
          className="section projects-section automotive-section"
          aria-labelledby="projects-title"
        >
          <AutomotiveDetails variant="racing" />
          <div className="container section-foreground">
            <Reveal className="section-heading">
              <div>
                <Eyebrow>Feito aqui. Cuidado VDR.</Eyebrow>
                <h2 id="projects-title">
                  <TextReveal text="O RESULTADO ESTÁ" />
                  <br />
                  <span className="text-accent">
                    <TextReveal text="NOS DETALHES." />
                  </span>
                </h2>
              </div>
            </Reveal>
            <Reveal className="project-film">
              <ProjectVideo
                src={media.project.src}
                poster={media.project.poster}
              />
              <div className="project-film-copy">
                <Eyebrow>BMW • Projeto VDR</Eyebrow>
                <h3>
                  <TextReveal text="O CUIDADO APARECE" />
                  <br />
                  <span className="text-accent">
                    <TextReveal text="DE PERTO." />
                  </span>
                </h3>
                <p>
                  Do primeiro olhar aos detalhes do acabamento. Acompanhe o
                  projeto completo da BMW no nosso estúdio.
                </p>
                <ContactButton
                  message="Olá! Conheci a VDR pelo site, vi o projeto da BMW e gostaria de solicitar um orçamento para meu veículo."
                  outline
                >
                  Quero esse cuidado para meu carro
                </ContactButton>
              </div>
            </Reveal>
            <div className="project-film-footer">
              <a
                href={company.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="text-link"
              >
                Mais projetos no Instagram{' '}
                <ArrowUpRight size={17} aria-hidden="true" />
              </a>
            </div>
          </div>
        </section>

        <section
          id="sobre"
          className="section about-section atmospheric-section"
          aria-labelledby="about-title"
        >
          <SectionAtmosphere />
          <div className="container about-grid section-foreground">
            <Reveal className="about-copy">
              <Eyebrow>VDR Studio Automotivo</Eyebrow>
              <h2 id="about-title">
                <TextReveal text="PRECISÃO EM CADA ETAPA." />
                <br />
                <span className="text-muted">
                  <TextReveal text="RESPEITO POR CADA DETALHE." />
                </span>
              </h2>
              <p>
                Na VDR, cada veículo recebe atenção individual, desde a
                avaliação inicial até o acabamento final.
              </p>
              <p>
                Em Mirassol, atendemos clientes de São José do Rio Preto e
                região com PPF, vitrificação e polimento técnico. Técnicas
                especializadas e materiais de alta performance para preservar a
                pintura e valorizar os detalhes do seu automóvel.
              </p>
              <div className="about-values">
                <Feature icon={Crosshair}>Avaliação individual</Feature>
                <Feature icon={ShieldCheck}>Aplicação técnica</Feature>
                <Feature icon={Check}>Atenção ao acabamento</Feature>
              </div>
              <ContactButton outline>Converse com a equipe</ContactButton>
            </Reveal>
            <Reveal className="about-photo">
              <ProfileFrame image={media.about.image} alt={media.about.alt} />
            </Reveal>
          </div>
        </section>

        <section
          className="section reviews-section automotive-section"
          aria-labelledby="reviews-title"
        >
          <AutomotiveDetails variant="bodywork" />
          <div className="container section-foreground">
            <Reveal className="section-heading">
              <div>
                <Eyebrow>Quem conhece, confia</Eyebrow>
                <h2 id="reviews-title">
                  <TextReveal text="A CONFIANÇA SE CONSTRÓI" />
                  <br />
                  <span className="text-muted">
                    <TextReveal text="EM CADA ENTREGA." />
                  </span>
                </h2>
              </div>
              <a
                href={company.maps}
                target="_blank"
                rel="noopener noreferrer"
                className="google-link"
              >
                <Image
                  src="/images/google.webp"
                  width={27}
                  height={27}
                  alt="Google"
                />
                <span>Ver avaliações no Google</span>
                <ArrowUpRight size={17} aria-hidden="true" />
              </a>
            </Reveal>
            <div className="reviews-grid">
              {testimonials.map((review) => (
                <Reveal key={review.name} className="review-card">
                  <span className="quote-mark" aria-hidden="true">
                    “
                  </span>
                  <blockquote>“{review.quote}”</blockquote>
                  <p className="review-context">{review.context}</p>
                  <div className="review-author">
                    <span className="review-initials" aria-hidden="true">
                      {review.initials}
                    </span>
                    <div>
                      <p>{review.name}</p>
                      <span>Depoimento publicado pela VDR</span>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
            <p className="reviews-source">
              Trechos de depoimentos reais apresentados no{' '}
              <a
                href={`${company.url}/`}
                target="_blank"
                rel="noopener noreferrer"
              >
                site oficial da VDR{' '}
                <ArrowUpRight size={12} aria-hidden="true" />
              </a>
              .
            </p>
          </div>
        </section>

        <section
          className="section faq-section automotive-section"
          aria-labelledby="faq-title"
        >
          <AutomotiveDetails variant="tread" />
          <div className="container faq-grid section-foreground">
            <Reveal>
              <Eyebrow>Antes de proteger</Eyebrow>
              <h2 id="faq-title">
                <TextReveal text="SUAS DÚVIDAS." />
                <br />
                <span className="text-muted">
                  <TextReveal text="NOSSA ATENÇÃO." />
                </span>
              </h2>
              <p>
                Entenda o que faz sentido para o seu veículo. Se precisar, a
                equipe ajuda você a escolher.
              </p>
              <a
                href={whatsappUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="text-link"
              >
                Tirar uma dúvida no WhatsApp{' '}
                <ArrowUpRight size={17} aria-hidden="true" />
              </a>
            </Reveal>
            <div className="faq-list">
              {faqs.map((faq) => (
                <details name="vdr-faq" key={faq.question}>
                  <summary>
                    {faq.question}
                    <ChevronDown size={19} aria-hidden="true" />
                  </summary>
                  <p>{faq.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section
          id="contato"
          className="contact-section"
          aria-labelledby="contact-title"
        >
          <div className="contact-photo">
            <Image
              src="/images/contato.webp"
              alt="Veículos no interior do estúdio VDR em Mirassol"
              fill
              sizes="100vw"
            />
          </div>
          <div className="contact-shade" />
          <Reveal className="container contact-content">
            <Eyebrow>O próximo cuidado começa aqui</Eyebrow>
            <h2 id="contact-title">
              <TextReveal text="SEU CARRO MERECE" />
              <br />
              PROTEÇÃO{' '}
              <span className="text-accent">
                <TextReveal text="À ALTURA." />
              </span>
            </h2>
            <p>
              Converse com a equipe da VDR e descubra a solução ideal para
              preservar a pintura, o brilho e a originalidade do seu veículo.
            </p>
            <ContactButton icon>Solicitar meu orçamento</ContactButton>
            <span className="contact-note">
              ATENDIMENTO DIRETO COM A EQUIPE VDR
            </span>
          </Reveal>
        </section>
      </main>
      <Footer />
      <a
        className="floating-whatsapp"
        href={whatsappUrl()}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Fale com a VDR pelo WhatsApp"
      >
        <WhatsAppIcon />
        <span>Fale com a VDR</span>
      </a>
      <div className="mobile-conversion">
        <ContactButton icon>Solicitar orçamento</ContactButton>
      </div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData).replace(/</g, '\\u003c'),
        }}
      />
    </>
  );
}
