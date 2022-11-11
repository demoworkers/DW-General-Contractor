const { PrismaClient } = require('@prisma/client')
const bcrypt = require('bcrypt')

const prisma = new PrismaClient()

const run = async () => {
  await prisma.projects.deleteMany({})

  await prisma.projects.createMany({
    data: [
      {
        name: 'Project Scrapper',
        status: 'OPEN',
        state: 'BIDDING',
      },
      {
        name: 'Hightower',
        status: 'OPEN',
        state: 'CONSTRUCTION',
      },
      {
        name: 'Ocean Heights',
        status: 'CLOSED',
        state: 'BIDDING',
      },
    ],
  })

  // PASSWORD
  const salt = bcrypt.genSaltSync()

  await prisma.user.upsert({
    where: { email: 'osamashahi.os@gmail.com' },
    update: {},
    create: {
      firstName: 'Osama',
      lastName: 'Shahi',
      email: 'osamashahi.os@gmail.com',
      password: bcrypt.hashSync('password', salt),
      acceptTerms: true,
      approved: true,
    },
  })
}

run()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
