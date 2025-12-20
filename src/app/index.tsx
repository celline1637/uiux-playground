import "@/global.css"

import { I18nProvider, LocalizationProvider } from "@/locales"
import { MotionLazy } from "@/shared/components/animate/motion-lazy"
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
