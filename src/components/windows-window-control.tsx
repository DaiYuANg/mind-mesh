'use client'

import { useState, useEffect } from 'react'
import { getCurrentWindow } from '@tauri-apps/api/window'
import { X, Minus, Maximize, Minimize } from 'lucide-react'

const WinControls = () => {
  const [maximized, setMaximized] = useState(false)
  const win = getCurrentWindow()

  useEffect(() => {
    // 同步初始最大化状态
    win.isMaximized().then(setMaximized)
  }, [win])

  const handleMinimize = () => {
    win.minimize()
  }

  const handleMaximize = () => {
    win.toggleMaximize()
    // 切换本地状态（UI 图标/样式）
    setMaximized(!maximized)
  }

  const handleClose = () => {
    win.close()
  }

  return (
    <div className="flex items-center space-x-1">
      {/* 最小化按钮 */}
      <button onClick={handleMinimize} className="p-1 hover:bg-slate-200 rounded" title="最小化">
        <Minus className="w-4 h-4" />
      </button>

      {/* 最大化 / 恢复 */}
      <button onClick={handleMaximize} className="p-1 hover:bg-slate-200 rounded" title={maximized ? '还原' : '最大化'}>
        {maximized ? <Minimize className="w-4 h-4" /> : <Maximize className="w-4 h-4" />}
      </button>

      {/* 关闭窗口 */}
      <button onClick={handleClose} className="p-1 hover:bg-red-500 hover:text-white rounded" title="关闭">
        <X className="w-4 h-4" />
      </button>
    </div>
  )
}

export { WinControls }
