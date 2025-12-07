import { Outlet } from "react-router-dom"

import { Suspense } from "react"
import Header from "./header"

// ----------------------------------------------------------------------

export function MainLayout() {
  // const [collapsed, setCollapsed] = useState(false)

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />

      <div className="flex flex-1 overflow-hidden">
        {/* <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} /> */}

        <main className="flex-1 min-w-0 overflow-auto">
          <div className="container mx-auto py-6 px-4 lg:px-8">
            <Suspense fallback={<div>Loading...</div>}>
              <Outlet />
            </Suspense>
          </div>
        </main>
      </div>
    </div>
  )
}
