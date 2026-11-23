import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { experiences } from '../data';
import { ConstructionPage, IndustrialPage, SecurityPage, ManufacturingPage, VeterinaryPage } from '@/components/experiences/ExperiencePages';

type Slug = keyof typeof experiences;
export function generateStaticParams() { return Object.keys(experiences).map((slug) => ({ slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
 const { slug } = await params;
 if (!(slug in experiences)) return {};
 const item = experiences[slug as Slug];
 return { title: `${item.sector} | JQsystems`, description: `${item.description} Diseño web conceptual desarrollado por JQsystems.`, openGraph: { title: `${item.sector} | JQsystems`, description: item.description, images: [item.heroImage] } };
}
export default async function ExperiencePage({ params }: { params: Promise<{ slug: string }> }) {
 const { slug } = await params;
 if (!(slug in experiences)) notFound();
 const data = experiences[slug as Slug];
 switch (slug) {
  case 'construccion': return <ConstructionPage data={data}/>;
  case 'industrial': return <IndustrialPage data={data}/>;
  case 'seguridad': return <SecurityPage data={data}/>;
  case 'fabricantes': return <ManufacturingPage data={data}/>;
  case 'veterinarias': return <VeterinaryPage data={data}/>;
  default: notFound();
 }
}
