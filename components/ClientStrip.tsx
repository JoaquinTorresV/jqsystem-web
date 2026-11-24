const collaborators = [
  { name: 'Cinco Horizontes', sector: 'Agencia de viajes' },
  { name: 'Agenda Consultant', sector: 'Agencia de marketing' },
  { name: 'MarketingIA', sector: 'Marketing · España' },
  { name: 'BarSport', sector: 'Gastronomía · España' },
  { name: 'Wolf Control', sector: 'Seguridad · España' },
];

export default function ClientStrip() {
  return (
    <section className="client-strip" aria-labelledby="client-strip-title">
      <div className="container">
        <div className="client-strip-heading">
          <p className="section-kicker" id="client-strip-title">CON QUIÉNES HEMOS TRABAJADO</p>
          <span>Colaboraciones en distintos sectores y mercados.</span>
        </div>
        <ul className="client-strip-list">
          {collaborators.map((collaborator) => (
            <li key={collaborator.name}>
              <strong>{collaborator.name}</strong>
              <span>{collaborator.sector}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
