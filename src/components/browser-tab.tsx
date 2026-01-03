import { X } from 'lucide-react'
import { cn } from '../lib/utils'
import { ContextMenu } from '@radix-ui/react-context-menu'
import {
  ContextMenuCheckboxItem,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuLabel,
  ContextMenuRadioGroup,
  ContextMenuRadioItem,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuTrigger,
} from '@/components/ui/context-menu.tsx'

type BrowserTabProps = {
  active?: boolean
  title?: string
  onClick?: () => void
  onClose?: () => void
}

const BrowserTab = ({ active, title, onClick, onClose }: BrowserTabProps) => {
  return (
    <ContextMenu>
      <ContextMenuTrigger>
        <div
          onClick={onClick}
          className={cn(
            'group relative flex h-8 items-center gap-2 px-3',
            'rounded-t-md text-sm select-none cursor-pointer',
            'transition-colors',
            active ? 'bg-background text-foreground shadow-sm' : 'text-muted-foreground hover:bg-accent/60',
          )}
        >
          {/* 激活态底部遮住分割线（关键） */}
          {active && <div className="absolute inset-x-0 -bottom-px h-px bg-background" />}

          <span className="truncate max-w-30 leading-none">{title}</span>

          <div
            onClick={(e) => {
              e.stopPropagation()
              onClose?.()
            }}
            className={cn(
              'ml-1 flex h-4 w-4 items-center justify-center rounded',
              'opacity-0 group-hover:opacity-100',
              'hover:bg-muted transition',
            )}
          >
            <X className="h-3 w-3" />
          </div>
        </div>
      </ContextMenuTrigger>
      <ContextMenuContent className="w-52">
        <ContextMenuItem inset>
          Back
          <ContextMenuShortcut>⌘[</ContextMenuShortcut>
        </ContextMenuItem>
        <ContextMenuItem inset disabled>
          Forward
          <ContextMenuShortcut>⌘]</ContextMenuShortcut>
        </ContextMenuItem>
        <ContextMenuItem inset>
          Reload
          <ContextMenuShortcut>⌘R</ContextMenuShortcut>
        </ContextMenuItem>
        <ContextMenuSub>
          <ContextMenuSubTrigger inset>More Tools</ContextMenuSubTrigger>
          <ContextMenuSubContent className="w-44">
            <ContextMenuItem>Save Page...</ContextMenuItem>
            <ContextMenuItem>Create Shortcut...</ContextMenuItem>
            <ContextMenuItem>Name Window...</ContextMenuItem>
            <ContextMenuSeparator />
            <ContextMenuItem>Developer Tools</ContextMenuItem>
            <ContextMenuSeparator />
            <ContextMenuItem variant="destructive">Delete</ContextMenuItem>
          </ContextMenuSubContent>
        </ContextMenuSub>
        <ContextMenuSeparator />
        <ContextMenuCheckboxItem checked>Show Bookmarks</ContextMenuCheckboxItem>
        <ContextMenuCheckboxItem>Show Full URLs</ContextMenuCheckboxItem>
        <ContextMenuSeparator />
        <ContextMenuRadioGroup value="pedro">
          <ContextMenuLabel inset>People</ContextMenuLabel>
          <ContextMenuRadioItem value="pedro">Pedro Duarte</ContextMenuRadioItem>
          <ContextMenuRadioItem value="colm">Colm Tuite</ContextMenuRadioItem>
        </ContextMenuRadioGroup>
      </ContextMenuContent>
    </ContextMenu>
  )
}

export { BrowserTab }
export type { BrowserTabProps }
