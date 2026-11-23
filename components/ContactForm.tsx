'use client';

import type { FormEvent } from 'react';
import { ArrowUpRight } from 'lucide-react';

const whatsappNumber = '56932115412';

export default function ContactForm() {
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const name = String(formData.get('name') ?? '').trim();
    const service = String(formData.get('service') ?? '').trim();
    const details = String(formData.get('message') ?? '').trim();

    if (!name || !service || !details) {
      event.currentTarget.reportValidity();
      return;
    }

    const message = [
      `Hola, soy ${name}.`,
      `Me interesa: ${service}.`,
      `Sobre mi proyecto: ${details}`,
      'Me gustaría conversar con JQsystems.',
    ].join('\n');

    window.location.assign(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`);
  }

  return (
    <form className="contact-form" onSubmit={handleSubmit}>
      <div className="form-heading"><span>CUÉNTANOS SOBRE TU PROYECTO</span><span>01 — 03</span></div>
      <label>Tu nombre<input name="name" placeholder="¿Cómo te llamas?" autoComplete="name" required /></label>
      <label>¿En qué podemos ayudarte?<select name="service" defaultValue="" required><option value="" disabled>Selecciona un servicio</option><option>Diseño y desarrollo web</option><option>Inteligencia artificial</option><option>Automatización y sistemas</option><option>Otro proyecto</option></select></label>
      <label>Cuéntanos un poco más<textarea name="message" rows={3} placeholder="Describe brevemente lo que necesitas..." required /></label>
      <button className="button button-dark form-submit" type="submit">Continuar por WhatsApp <ArrowUpRight size={17} /></button>
      <p className="form-privacy">Se abrirá WhatsApp con el mensaje listo. Revísalo y pulsa Enviar para contactarnos.</p>
    </form>
  );
}
