'use client';
import { useState } from 'react';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import Logo from './Logo';

const links = [{label:'Servicios',href:'#servicios'},{label:'Proyectos',href:'#proyectos'},{label:'Proceso',href:'#proceso'},{label:'Nosotros',href:'#nosotros'}];
export default function Header() {
  const [open,setOpen] = useState(false);
  return <header className="site-header"><div className="container nav-wrap"><Logo/><nav className={open?'nav-links nav-open':'nav-links'} aria-label="Navegación principal">{links.map(l=><a key={l.href} href={l.href} onClick={()=>setOpen(false)}>{l.label}</a>)}<a className="nav-mobile-cta" href="#contacto" onClick={()=>setOpen(false)}>Hablemos <ArrowUpRight size={15}/></a></nav><a className="button button-dark nav-cta" href="#contacto">Hablemos de tu proyecto <ArrowUpRight size={16}/></a><button className="menu-toggle" aria-label={open?'Cerrar menú':'Abrir menú'} onClick={()=>setOpen(!open)}>{open?<X/>:<Menu/>}</button></div></header>
}
