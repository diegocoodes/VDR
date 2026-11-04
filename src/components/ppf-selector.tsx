'use client';

import Image from 'next/image';
import { useEffect, useRef, useState, type KeyboardEvent } from 'react';
import { ArrowUpRight, Check, ShieldCheck } from 'lucide-react';
import { motion, useReducedMotion } from 'motion/react';
import { ppfOptions } from '@/data/site';
import { ContactButton } from './ui';
import { TextReveal } from './text-reveal';

export function PpfSelector() {
  const [selected, setSelected] = useState(1);
  const [vertical, setVertical] = useState(true);
  const reduced = useReducedMotion();
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const option = ppfOptions[selected];
  useEffect(() => {
    const mobile = window.matchMedia('(max-width: 899px)');
    const update = () => setVertical(!mobile.matches);
    update();
    mobile.addEventListener('change', update);
    return () => mobile.removeEventListener('change', update);
  }, []);
  function handleKey(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    let next = index;
    if (event.key === 'ArrowRight' || event.key === 'ArrowDown')
      next = (index + 1) % ppfOptions.length;
    else if (event.key === 'ArrowLeft' || event.key === 'ArrowUp')
      next = (index - 1 + ppfOptions.length) % ppfOptions.length;
    else if (event.key === 'Home') next = 0;
    else if (event.key === 'End') next = ppfOptions.length - 1;
    else return;
    event.preventDefault();
    setSelected(next);
    tabs.current[next]?.focus();
  }
  return (
    <div className="ppf-lab">
      <div
        className="ppf-choices"
        role="tablist"
        aria-label="Compare as coberturas de PPF"
        aria-orientation={vertical ? 'vertical' : 'horizontal'}
      >
        {ppfOptions.map((item, index) => (
          <button
            key={item.id}
            ref={(element) => {
              tabs.current[index] = element;
            }}
            id={`tab-${item.id}`}
            role="tab"
            aria-label={item.name}
            aria-selected={selected === index}
            aria-controls={`panel-${item.id}`}
            tabIndex={selected === index ? 0 : -1}
            onKeyDown={(event) => handleKey(event, index)}
            onClick={() => setSelected(index)}
          >
            <span className="ppf-choice-copy">
              <strong>{item.name}</strong>
              <span>{item.shortCoverage}</span>
            </span>
            <span className="ppf-choice-icon" aria-hidden="true">
              {selected === index ? (
                <Check size={18} />
              ) : (
                <ArrowUpRight size={18} />
              )}
            </span>
          </button>
        ))}
      </div>
      {ppfOptions.map((item, index) => (
        <div
          key={item.id}
          id={`panel-${item.id}`}
          role="tabpanel"
          aria-labelledby={`tab-${item.id}`}
          hidden={selected !== index}
          tabIndex={0}
          className="ppf-preview"
        >
          {selected === index && (
            <motion.div
              className="ppf-preview-inner"
              initial={false}
              animate={
                reduced
                  ? { opacity: 1, y: 0 }
                  : { opacity: [0.5, 1], y: [8, 0] }
              }
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="ppf-preview-photo">
                <Image
                  src={item.image}
                  alt={item.alt}
                  fill
                  sizes="(max-width: 767px) 100vw, 40vw"
                />
                <span className="ppf-photo-caption">
                  <i aria-hidden="true" />
                  COBERTURA ILUSTRADA PELA VDR
                </span>
              </div>
              <div className="ppf-specification">
                <ShieldCheck
                  size={33}
                  strokeWidth={1.3}
                  className="text-accent"
                  aria-hidden="true"
                />
                <p className="ppf-spec-label">{item.name}</p>
                <h3>
                  <TextReveal text={item.tagline} />
                </h3>
                <p className="ppf-spec-description">{item.description}</p>
                <div className="ppf-coverage-detail">
                  <span>ÁREAS DE APLICAÇÃO</span>
                  <p>
                    <Check size={18} aria-hidden="true" />
                    {item.coverage}
                  </p>
                </div>
                <p className="fine-print">
                  A cobertura final é confirmada na avaliação. O PPF ajuda a
                  reduzir danos, sem tornar a pintura imune a impactos.
                </p>
              </div>
            </motion.div>
          )}
        </div>
      ))}
      <div className="ppf-consultation">
        <p>
          A proteção acompanha o seu uso. A equipe ajuda você a escolher a
          cobertura.
        </p>
        <ContactButton
          message={`Olá! Conheci a VDR pelo site e gostaria de saber mais sobre ${option.name} para meu veículo.`}
        >
          Encontrar a proteção ideal
        </ContactButton>
      </div>
    </div>
  );
}
