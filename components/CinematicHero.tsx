'use client';

import { useRef } from 'react';
import { ArrowDown, ArrowUpRight, Bot, Code2, Workflow } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import Reveal from './Reveal';

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function CinematicHero() {
  const root = useRef<HTMLElement>(null);

  useGSAP(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion) return;

    const media = gsap.matchMedia();
    media.add('(min-width: 651px)', () => {
      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: root.current,
          start: 'top top',
          end: '+=1250',
          scrub: 1,
          pin: '.cinematic-stage',
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      timeline
        .to('.cinematic-copy', { yPercent: -24, opacity: 0, ease: 'power1.in' }, 0)
        .to('.cinematic-orbit', { rotate: 24, scale: 1.12, ease: 'none' }, 0)
        .to('.cinematic-portal', { scale: 1.65, rotateX: 0, rotateY: 0, borderRadius: 8, ease: 'power2.inOut' }, 0)
        .to('.portal-core', { scale: 1.24, opacity: 0.18, ease: 'power2.inOut' }, 0)
        .to('.portal-window', { scale: 1.18, opacity: 1, y: 0, ease: 'power2.out' }, 0.22)
        .to('.floating-panel', { y: -34, opacity: 0, stagger: 0.04, ease: 'power1.in' }, 0.12)
        .to('.cinematic-caption', { opacity: 0, y: -12 }, 0.1);
    });

    return () => media.revert();
  }, { scope: root });

  return (
    <section className="cinematic-hero" id="inicio" ref={root}>
      <div className="cinematic-stage">
        <div className="cinematic-grid" />
        <div className="container cinematic-layout">
          <div className="cinematic-copy">
            <Reveal>
              <div className="eyebrow"><span className="status-dot" /> ESTUDIO DIGITAL INDEPENDIENTE <span className="eyebrow-line" /></div>
            </Reveal>
            <Reveal delay={0.08}>
              <h1>Ideas que avanzan.<br /><span className="serif-accent">Sistemas que</span><br />hacen crecer.</h1>
            </Reveal>
            <Reveal delay={0.16}>
              <p className="hero-lead">Diseñamos experiencias web y desarrollamos soluciones digitales que ayudan a las empresas a trabajar mejor, conectar con sus clientes y crecer.</p>
            </Reveal>
            <Reveal delay={0.24}>
              <div className="hero-actions">
                <a className="button button-dark" href="#contacto">Hablemos de tu proyecto <ArrowUpRight size={17} /></a>
                <a className="text-link" href="#proyectos">Explorar proyectos <ArrowDown size={15} /></a>
              </div>
            </Reveal>
            <div className="hero-footnote"><span>ESTRATEGIA</span><i /><span>DISEÑO</span><i /><span>TECNOLOGÍA</span></div>
          </div>

          <div className="cinematic-visual" aria-label="Portal digital tridimensional de JQsystems">
            <div className="cinematic-orbit orbit-one" />
            <div className="cinematic-orbit orbit-two" />
            <div className="floating-panel panel-top"><span className="panel-dot" /> DIGITAL EXPERIENCES <b>01 / 03</b></div>
            <div className="floating-panel panel-left"><Code2 size={17} /><span>Diseño web</span></div>
            <div className="floating-panel panel-right"><Bot size={17} /><span>Inteligencia artificial</span></div>
            <div className="floating-panel panel-bottom"><Workflow size={17} /><span>Sistemas conectados</span></div>
            <div className="cinematic-portal">
              <div className="portal-back" />
              <div className="portal-core"><span>JQ</span><small>BUILD WHAT'S NEXT</small></div>
              <div className="portal-window">
                <div className="window-top"><span>JQ / DIGITAL STUDIO</span><span>● ● ●</span></div>
                <div className="window-content"><span>DESIGN / TECHNOLOGY / GROWTH</span><strong>Make it<br /><em>meaningful.</em></strong><div className="window-line" /><small>Digital systems for ambitious businesses.</small></div>
                <div className="window-bottom"><span>jqsystems.cl</span><span>↗</span></div>
              </div>
            </div>
            <div className="cinematic-caption"><span>UNA NUEVA FORMA DE AVANZAR</span><span>SCROLL TO EXPLORE ↓</span></div>
          </div>
        </div>
        <a href="#servicios" className="cinematic-scroll"><span>DESLIZA PARA DESCUBRIR</span><ArrowDown size={14} /></a>
        <span className="cinematic-index">01 — 06</span>
      </div>
    </section>
  );
}
