import { prisma } from '../../../lib/prisma'
import { validateRoute } from '../../../lib/auth'

export default validateRoute(async (req, res, user) => {
  const { tabType } = req.body

  const upperTabType = tabType.toUpperCase()

  const nodes = await prisma.widget.findFirst({
    where: {
      type: upperTabType,
    },
    select: {
      nodes: true,
    },
  })

  res.json(nodes)
})
