import { prisma } from '../../../lib/prisma'
import { validateRoute } from '../../../lib/auth'
import { resetNodeStylesAndDeleteNodes } from '../../../utils/processNodes'

export default validateRoute(async (req, res, user) => {
  const { tabType, nodes } = req.body

  const upperTabType = tabType.toUpperCase()

  try {
    const node = await prisma.widget.findFirst({
      where: {
        type: upperTabType,
      },
      select: {
        id: true,
      },
    })

    const fixedNodeStlyes = resetNodeStylesAndDeleteNodes(nodes)

    const updatedNodes = await prisma.widget.update({
      where: {
        id: node.id,
      },
      data: {
        nodes: fixedNodeStlyes,
      },
      select: {
        nodes: true,
      },
    })

    res.json(updatedNodes)
  } catch (e) {
    console.error(e)
    res.status(500)
    res.json({ error: 'Nodes could not be saved' })
  }
})
