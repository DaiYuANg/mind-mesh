import { Milkdown, MilkdownProvider, useEditor } from '@milkdown/react'
// import {nord} from "@milkdown/theme-nord";
import { FC } from 'react'
import '@milkdown/crepe/theme/common/style.css'
import '@milkdown/crepe/theme/frame.css'
import '@milkdown/crepe/theme/frame-dark.css'
import { Crepe } from '@milkdown/crepe'

const CrepeEditor: FC = () => {
  useEditor((root) => {
    return new Crepe({ root })
  })

  return <Milkdown />
}
export const MilkdownEditorWrapper: FC = () => {
  return (
    <MilkdownProvider>
      <CrepeEditor />
    </MilkdownProvider>
  )
}
