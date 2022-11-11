import { useState } from 'react'
import Link from 'next/link'
import { useSWRConfig } from 'swr'

import fetcher from '../../../lib/fetcher'
import { useProjects } from '../../../lib/hooks'

import { titleCase } from '../../../utils/formattedString'

import MainLayout from '../../components/MainLayout'
import LoadingTable from '../../components/LoadingTable'
import ActionButton from '../../components/ActionButton'
import ProjectSlideover from '../../components/ProjectSlideover'
import Badge from '../../components/Badge'
import { useRouter } from 'next/router'

const Project = ({ isAdmin }) => {
  const router = useRouter()
  const { id: projectId } = router.query
  return <MainLayout>{projectId}</MainLayout>
}

export default Project
