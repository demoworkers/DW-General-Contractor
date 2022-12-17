const bcrypt = require('bcrypt')

const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

const run = async () => {
  await prisma.projects.deleteMany({})

  await prisma.projects.createMany({
    data: [
      {
        name: 'Project Scrapper',
        status: 'OPEN',
        stage: 'BIDDING',
      },
      {
        name: 'Hightower',
        status: 'OPEN',
        stage: 'BIDDING',
      },
      {
        name: 'Ocean Heights',
        status: 'CLOSED',
        stage: 'BIDDING',
      },
    ],
  })

  const projects = await prisma.projects.findFirst({})

  const config = {
    scopeOfWork: [
      {
        id: '1243dsfa',
        label: 'Tile',
        children: [
          {
            id: '32fcaewsrg',
            label:
              'Wall Tile - install standard 12x24 wall tile in showeror tub area only - price may vary with final tile layout - price includes rough material (durock, screws, etc)',
          },
          {
            id: 'asdfasdf2309',
            label:
              'Floor Tile - install standard 12x24 floor tile - price may vary with final tile layout - price includes rough material (durock, screws, etc)',
          },
        ],
      },
    ],
  }

  await prisma.projectDetails.deleteMany({})

  await prisma.projectDetails.create({
    data: {
      config,
      projectsId: projects.id,
    },
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
