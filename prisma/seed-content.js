// Popula TreatmentCategory/Treatment/FaqItem a partir do conteúdo estático atual.
// Idempotente por slug: se o registro já existir, não sobrescreve (para não apagar edições
// feitas depois pelo admin). Pode ser importado (seedContent(db)) ou rodado standalone:
// `node prisma/seed-content.js`.
const { treatmentCategories } = require('./seed-data/treatments');
const { faqItems } = require('./seed-data/faq');

async function seedContent(db) {
  for (let categoryIndex = 0; categoryIndex < treatmentCategories.length; categoryIndex += 1) {
    const category = treatmentCategories[categoryIndex];

    const savedCategory = await db.treatmentCategory.upsert({
      where: { slug: category.id },
      update: {},
      create: {
        slug: category.id,
        label: category.label,
        order: categoryIndex,
      },
    });

    for (let treatmentIndex = 0; treatmentIndex < category.treatments.length; treatmentIndex += 1) {
      const treatment = category.treatments[treatmentIndex];

      await db.treatment.upsert({
        where: { slug: treatment.id },
        update: {},
        create: {
          slug: treatment.id,
          title: treatment.title,
          description: treatment.description,
          order: treatmentIndex,
          categoryId: savedCategory.id,
        },
      });
    }

    console.log(`Categoria pronta: ${savedCategory.label} (${category.treatments.length} tratamentos)`);
  }

  for (let faqIndex = 0; faqIndex < faqItems.length; faqIndex += 1) {
    const item = faqItems[faqIndex];

    await db.faqItem.upsert({
      where: { slug: item.id },
      update: {},
      create: {
        slug: item.id,
        question: item.question,
        answer: item.answer,
        order: faqIndex,
      },
    });
  }

  console.log(`FAQ pronta: ${faqItems.length} perguntas`);
}

module.exports = { seedContent };

if (require.main === module) {
  require('dotenv').config();
  const { PrismaClient } = require('@prisma/client');
  const { PrismaPg } = require('@prisma/adapter-pg');

  const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
  const db = new PrismaClient({ adapter });

  seedContent(db)
    .catch((err) => {
      console.error(err);
      process.exit(1);
    })
    .finally(async () => {
      await db.$disconnect();
    });
}
