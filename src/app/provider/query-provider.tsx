import { useMemo } from "react";

import {
  QueryClient,
  QueryClientProvider as ReactQueryProvider,
} from "@tanstack/react-query";

import {
  queryCache,
  mutationCache,
  defaultOptions,
} from "./query-provider.options";

// ----------------------------------------------------------------------

type Props = {
  children: React.ReactNode;
};

// ----------------------------------------------------------------------

export default function QueryClientProvider({ children }: Props) {
  const queryClient = useMemo(
    () =>
      new QueryClient({
        defaultOptions,
        mutationCache,
        queryCache,
      }),
    []
  );

  return (
    <ReactQueryProvider client={queryClient}>{children}</ReactQueryProvider>
  );
}
