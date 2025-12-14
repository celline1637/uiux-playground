import { Suspense, lazy } from "react"
import { Outlet } from "react-router-dom"

// ----------------------------------------------------------------------

const IndexPage = lazy(() => import("@/pages/components"))
const UtilitiesPage = lazy(() => import("@/pages/components/utilities"))

// ----------------------------------------------------------------------

export const componentsRoutes = [
  {
    element: (
      <Suspense fallback={<>loading...</>}>
        <Outlet />
      </Suspense>
    ),
    children: [
      {
        path: "components",
        children: [
          { element: <IndexPage />, index: true },
          { element: <UtilitiesPage />, path: "utilities" },
        ],
      },
    ],
  },
]
