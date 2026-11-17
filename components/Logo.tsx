export default function Logo({ light = false }: { light?: boolean }) {
  return <a href="#inicio" className={`brand ${light ? 'brand-light' : ''}`} aria-label="JQsystems, inicio">
    <svg className="brand-mark" viewBox="0 0 42 42" fill="none" aria-hidden="true">
      <path d="M9 8.5h17.5a7 7 0 0 1 7 7v11a7 7 0 0 1-7 7H15a7 7 0 0 1-7-7v-2" stroke="currentColor" strokeWidth="2.7" strokeLinecap="round"/>
      <path d="M8 8.5v14.2a5.2 5.2 0 0 0 5.2 5.2h8.1" stroke="#91B69C" strokeWidth="2.7" strokeLinecap="round"/>
      <path d="m24 24 9 9" stroke="#91B69C" strokeWidth="2.7" strokeLinecap="round"/>
    </svg>
    <span>JQ<span>systems</span></span>
  </a>;
}
