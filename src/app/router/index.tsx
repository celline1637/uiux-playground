import { Navigate, useRoutes } from "react-router-dom";
import { patternsRoutes } from "./patterns";
import { Suspense, lazy } from "react";
import { paths } from "../../routes/paths";
import Page404 from "@/pages/error/404";
import { MainLayout } from "@/components/layout";

// ----------------------------------------------------------------------

const HomePage = lazy(() => import("@/pages/home"));

// ----------------------------------------------------------------------

export function Router() {
  return useRoutes([
    {
      element: <MainLayout />,
      children: [
        {
          path: "/",
          element: (
            <Suspense fallback={<>loading...</>}>
              <HomePage />
            </Suspense>
          ),
        },
        {
          path: paths.notFound,
          element: <Page404 />,
        },

        ...patternsRoutes,

        // No match
        { path: "*", element: <Navigate to="/404" replace /> },
      ],
    },
  ]);
}
