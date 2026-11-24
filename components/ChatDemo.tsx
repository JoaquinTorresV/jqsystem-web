'use client';

import { useEffect, useRef, useState, type FormEvent } from 'react';
import { ArrowUpRight, Bot, MessageCircle, RefreshCw, Send, Sparkles } from 'lucide-react';

type Message = {
  id: number;
  role: 'assistant' | 'user';
  text: string;
};

const initialMessages: Message[] = [{
  id: 0,
  role: 'assistant',
  text: '¡Hola! Soy la demo de JQsystems. Cuéntame, ¿a qué se dedica tu negocio? Así puedo sugerirte una solución pensada para ti.',
}];

const quickReplies = ['Clínica veterinaria', 'Tienda de productos', 'Servicios profesionales', 'Otro negocio'];
const followUpReplies = ['Quiero una web', 'Me interesa un agente IA', '¿Cuánto cuesta?'];

class ChatApiError extends Error {}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

export default function ChatDemo() {
  const [messages, setMessages] = useState(initialMessages);
  const [input, setInput] = useState('');
  const [hasBusiness, setHasBusiness] = useState(false);
  const [isReplying, setIsReplying] = useState(false);
  const nextId = useRef(1);
  const requestController = useRef<AbortController | null>(null);
  const messagesEnd = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEnd.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }, [messages, isReplying]);

  useEffect(() => () => requestController.current?.abort(), []);

  async function sendMessage(value: string) {
    const text = value.trim();
    if (!text || isReplying) return;

    const userMessage: Message = { id: nextId.current++, role: 'user', text };
    const conversation = [
      ...messages.filter((message) => message.id !== 0).slice(-10).map(({ role, text: content }) => ({ role, content })),
      { role: 'user' as const, content: text },
    ];
    const controller = new AbortController();
    requestController.current = controller;
    setMessages((current) => [...current, userMessage]);
    setInput('');
    setIsReplying(true);
    setHasBusiness(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ messages: conversation }),
        signal: controller.signal,
      });
      const payload: unknown = await response.json();
      if (!response.ok) {
        const error = isRecord(payload) && typeof payload.error === 'string'
          ? payload.error
          : 'El asistente no pudo responder en este momento.';
        throw new ChatApiError(error);
      }
      if (!isRecord(payload) || typeof payload.reply !== 'string' || !payload.reply.trim()) {
        throw new ChatApiError('El asistente no devolvió una respuesta válida.');
      }

      const assistantMessage: Message = { id: nextId.current++, role: 'assistant', text: payload.reply };
      setMessages((current) => [...current, assistantMessage]);
    } catch (error) {
      if (controller.signal.aborted) return;
      console.error('Chat request failed:', error);
      const text = error instanceof ChatApiError
        ? error.message
        : 'No pudimos conectar con el asistente. Inténtalo nuevamente o escríbenos por WhatsApp.';
      const errorMessage: Message = { id: nextId.current++, role: 'assistant', text };
      setMessages((current) => [...current, errorMessage]);
    } finally {
      if (requestController.current === controller) {
        requestController.current = null;
        setIsReplying(false);
      }
    }
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    void sendMessage(input);
  }

  function resetChat() {
    requestController.current?.abort();
    requestController.current = null;
    nextId.current = 1;
    setMessages(initialMessages);
    setHasBusiness(false);
    setInput('');
    setIsReplying(false);
  }

  const wa = 'https://wa.me/56932115412?text=' + encodeURIComponent('Hola, probé la demo de JQsystems y me gustaría conversar sobre mi negocio.');

  return (
    <section className="chat-demo section-pad" id="demo">
      <div className="container">
        <div className="chat-demo-heading">
          <div>
            <p className="section-kicker">03 / PRUEBA LA DEMO</p>
            <h2>Cuéntale de tu negocio.<br /><span className="serif-accent">Descubre cómo ayudarte.</span></h2>
          </div>
          <p className="heading-aside">Escribe a qué se dedica tu negocio o elige un ejemplo. El asistente te dará ideas de cómo una web, un agente de IA y la automatización podrían ayudarte.</p>
        </div>

        <div className="chat-demo-layout">
          <div className="chat-demo-intro">
            <span className="chat-demo-eyebrow"><Sparkles size={14} /> ASISTENTE INTERACTIVO</span>
            <h3>Empieza contándole<br />qué negocio tienes.</h3>
            <p>Recibirás ideas concretas para atraer clientes, responder consultas y organizar el seguimiento. Puedes escribir con tus propias palabras o probar los ejemplos del chat.</p>
            <div className="chat-demo-steps">
              <div><span>01</span><p><strong>Presencia digital</strong><br />Una web que explica y convierte.</p></div>
              <div><span>02</span><p><strong>Atención inteligente</strong><br />Un agente que responde y orienta.</p></div>
              <div><span>03</span><p><strong>Todo conectado</strong><br />Consultas y seguimiento centralizados.</p></div>
            </div>
            <p className="chat-demo-disclaimer">Tus mensajes se procesan con un servicio de IA para generar respuestas. No compartas información sensible. El chat no guarda la conversación ni realiza acciones en tu nombre.</p>
          </div>

          <div className="chat-window">
            <div className="chat-window-header">
              <div className="chat-assistant-avatar"><Bot size={20} /></div>
              <div className="chat-assistant-info"><strong>Asistente JQsystems</strong><span><i /> Con tecnología de IA</span></div>
              <button className="chat-reset" type="button" onClick={resetChat} aria-label="Reiniciar conversación"><RefreshCw size={15} /><span>Reiniciar</span></button>
            </div>
            <div className="chat-messages" role="log" aria-live="polite" aria-label="Conversación de demostración">
              {messages.map((message) => (
                <div className={`chat-message chat-message-${message.role}`} key={message.id}>
                  {message.role === 'assistant' && <span className="chat-message-avatar"><Bot size={14} /></span>}
                  <p>{message.text}</p>
                </div>
              ))}
              {isReplying && <div className="chat-message chat-message-assistant chat-typing" aria-label="El asistente está respondiendo"><span className="chat-message-avatar"><Bot size={14} /></span><p><i /><i /><i /></p></div>}
              <div ref={messagesEnd} />
            </div>
            <p className="chat-quick-label">{hasBusiness ? 'También puedes preguntar:' : 'O prueba con uno de estos ejemplos:'}</p>
            <div className="chat-quick-replies">
              {(hasBusiness ? followUpReplies : quickReplies).map((reply) => (
                <button key={reply} type="button" onClick={() => void sendMessage(reply)} disabled={isReplying}>{reply}</button>
              ))}
            </div>
            <form className="chat-input-form" onSubmit={handleSubmit}>
              <label className="visually-hidden" htmlFor="chat-demo-input">Escribe tu mensaje</label>
              <input id="chat-demo-input" value={input} onChange={(event) => setInput(event.target.value)} placeholder="Ej.: tengo una clínica veterinaria" maxLength={1000} disabled={isReplying} />
              <button type="submit" aria-label="Enviar mensaje" disabled={!input.trim() || isReplying}><Send size={17} /></button>
            </form>
            <div className="chat-window-footer">
              <span>DEMO CON IA · SE REINICIA AL RECARGAR</span>
              <a className="chat-whatsapp-cta" href={wa} target="_blank" rel="noreferrer" aria-label="Continuar por WhatsApp al +56 9 3211 5412">
                <MessageCircle size={15} />
                <span><strong>Seguir por WhatsApp</strong><small>+56 9 3211 5412</small></span>
                <ArrowUpRight size={13} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
