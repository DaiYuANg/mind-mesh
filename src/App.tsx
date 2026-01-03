import './App.css'
import { RouterProvider } from 'react-router'
import router from '@/router'
import '@fontsource/jetbrains-mono'
import { getCurrentWindow } from '@tauri-apps/api/window'

const appWindow = getCurrentWindow()

document.getElementById('titlebar-minimize')?.addEventListener('click', () => appWindow.minimize())
document.getElementById('titlebar-maximize')?.addEventListener('click', () => appWindow.toggleMaximize())
document.getElementById('titlebar-close')?.addEventListener('click', () => {
  return appWindow.close()
})
const App = () => (
  <>
    <div>
      <RouterProvider router={router} />
    </div>
  </>
)

export default App
