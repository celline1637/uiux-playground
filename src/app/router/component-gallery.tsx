import { Suspense, lazy } from "react"
import { Outlet } from "react-router-dom"

// ----------------------------------------------------------------------

const IndexPage = lazy(() => import("@/pages/component-gallery"))
const UtilitiesPage = lazy(() => import("@/pages/component-gallery/utilities"))

// ----------------------------------------------------------------------

export const componentGalleryRoutes = [
  {
    element: (
      <Suspense fallback={<>loading...</>}>
        <Outlet />
      </Suspense>
    ),
    children: [
      {
        path: "component-gallery",
        children: [
          { element: <IndexPage />, index: true },
          { element: <UtilitiesPage />, path: "utilities" },
        ],
      },
    ],
  },
]
