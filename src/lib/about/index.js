import { db } from '@/lib/db';

const SINGLETON_ID = 'about';

const DEFAULTS = {
  kicker: 'Sobre a',
  name: 'Dra. Rebecca Amorim',
  intro:
    'Olá, muito prazer! Minha prática clínica é focada em garantir um atendimento ético e completo, respeitando a individualidade de cada um e buscando ser resolutiva em todas as esferas da dermatologia (estética, clínica, cirúrgica e capilar). Busco enaltecer a beleza natural e indico procedimentos que façam sentido a cada paciente.',
  paragraphs: [
    'Sou médica formada pela Universidade do Estado do Pará (UEPA) e fiz a minha residência médica em dermatologia em São Paulo, na Universidade Estadual Paulista (UNESP), tendo uma formação de excelência. Durante a residência iniciei e concluí o meu Mestrado em Melasma e atualmente curso o programa de Doutorado também em Melasma, sendo uma das minhas áreas de expertise (doenças pigmentares) — poder melhorar as manchas da pele, algo que prejudica tanto a autoestima quanto a qualidade de vida das minhas pacientes, me traz muita satisfação. Sou apaixonada por pesquisa clínica e estudo para que a minha medicina seja baseada em evidências confiáveis e que traga benefício aos pacientes.',
    'Também fiz uma formação complementar em Tricologia, área da dermatologia responsável por diagnosticar e tratar doenças dos cabelos e do couro cabeludo. Atualmente sou preceptora do programa de Fellow em cabelo do Hospital do Servidor Público Municipal (HSPM), participando de reuniões científicas e ministrando aulas.',
    'Sou membra da Sociedade Brasileira de Dermatologia (SBD), participo constantemente de eventos científicos e me mantenho atualizada para enquadrar minha prática clínica dentro do que está alinhado com a evidência científica. Realizo treinamentos frequentes em procedimentos estéticos com as grandes empresas do mercado (preenchedores, bioestimuladores, fios, toxina botulínica).',
    'Sintam-se muito bem-vindos e acolhidos — será um prazer iniciar essa caminhada de cuidado com vocês. Que ela seja cercada de escuta, ciência, ética, bem-estar, melhora da autoestima e acolhida.',
  ].join('\n\n'),
  photoUrl: '/images/photos/dra-rebecca-jaleco-1.jpg',
  photoAlt: 'Dra. Rebecca Amorim no consultório',
  crm: null,
  rqe: null,
  instagramUrl: null,
  lattesUrl: null,
};

export async function getAboutContent() {
  const content = await db.aboutContent.findUnique({ where: { id: SINGLETON_ID } });
  if (content) return content;
  return db.aboutContent.create({ data: { id: SINGLETON_ID, ...DEFAULTS } });
}

export async function updateAboutContent({
  kicker,
  name,
  intro,
  paragraphs,
  photoUrl,
  photoAlt,
  crm,
  rqe,
  instagramUrl,
  lattesUrl,
}) {
  const data = { kicker, name, intro, paragraphs, photoUrl, photoAlt, crm, rqe, instagramUrl, lattesUrl };
  return db.aboutContent.upsert({
    where: { id: SINGLETON_ID },
    update: data,
    create: { id: SINGLETON_ID, ...data },
  });
}

export function splitParagraphs(text) {
  return (text || '')
    .split(/\n\s*\n/)
    .map((p) => p.trim())
    .filter(Boolean);
}
