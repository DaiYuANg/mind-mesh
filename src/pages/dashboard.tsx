import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from '@/components/ui/empty.tsx'
import { FolderIcon } from 'lucide-react'
import { Button } from '@/components/ui/button.tsx'
import { FC } from 'react'
import { invoke } from '@tauri-apps/api/core'

const Dashboard: FC = () => {
  const selectProjectFolder = async () => {
    const result = await invoke('select_directory')

  }

  return (
    <>
      <Empty>
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <FolderIcon />
          </EmptyMedia>
          <EmptyTitle>No Project</EmptyTitle>
          <EmptyDescription>No Project found</EmptyDescription>
        </EmptyHeader>
        <EmptyContent>
          <Button onClick={selectProjectFolder}>Add Project</Button>
        </EmptyContent>
      </Empty>
    </>
  )
}

export default Dashboard
