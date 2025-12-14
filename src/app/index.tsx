import "@/global.css"

import { MotionLazy } from "@/components/animate/motion-lazy"
import { I18nProvider, LocalizationProvider } from "@/locales"
import { Toaster } from "sonner"
import { Router } from "./router"

function App() {
  return (
    <I18nProvider>
      <LocalizationProvider>
        <MotionLazy>
          <Router />
          <Toaster position="top-right" />
        </MotionLazy>
      </LocalizationProvider>
    </I18nProvider>
  )
}

export default App
