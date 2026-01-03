import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from '@/components/ui/empty.tsx'
import { FolderIcon } from 'lucide-react'
import { Button } from '@/components/ui/button.tsx'
import { FC, useState } from 'react'
import { invoke } from '@tauri-apps/api/core'
import { MilkdownEditorWrapper } from '@/components/markdown-editor.tsx'

const Dashboard: FC = () => {
  const [isEditor, setEditor] = useState(false)
  const selectProjectFolder = async () => {
    const result = await invoke('select_directory')
    console.log(result)
    setEditor(true)
  }

  return (
    <>
      {isEditor ? (
        <>
        <MilkdownEditorWrapper/>
        </>
      ) : (
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
      )}
    </>
  )
}

export default Dashboard
