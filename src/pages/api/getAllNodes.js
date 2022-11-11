import nc from 'next-connect'
import cors from 'cors'

import { prisma } from '../../../lib/prisma'

const handler = nc()
  .use(cors())
  .get(async (req, res) => {
    let nodes = {}

    try {
      const primaryNodes = await prisma.widget.findFirst({
        where: {
          type: 'PRIMARY',
        },
        select: {
          nodes: true,
        },
      })

      if (primaryNodes) {
        nodes.primaryNodes = primaryNodes.nodes
      }

      const secondaryNodes = await prisma.widget.findFirst({
        where: {
          type: 'SECONDARY',
        },
        select: {
          nodes: true,
        },
      })

      if (secondaryNodes) {
        nodes.secondaryNodes = secondaryNodes.nodes
      }
    } catch (error) {
      res.status(500)
      res.json({ error: error.message })
    }

    res.status(200)
    res.json(nodes)
  })

export default handler
