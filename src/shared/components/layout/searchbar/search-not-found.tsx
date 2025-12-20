import { Iconify } from "@/shared/components/iconify"
import { cn } from "@/shared/utils/cn"

interface SearchNotFoundProps extends React.HTMLAttributes<HTMLDivElement> {
  query?: string
}

export function SearchNotFound({ className, query, ...props }: SearchNotFoundProps) {
  return (
    <div
      className={cn("flex flex-col items-center justify-center py-12 text-center", className)}
      {...props}
    >
      <Iconify icon="solar:magnifer-bold" width={64} className="mb-4 text-muted-foreground/50" />
      <p className="text-lg font-semibold text-foreground">Not found</p>
      {query && (
        <p className="mt-2 text-sm text-muted-foreground">
          No results found for <span className="font-semibold">&quot;{query}&quot;</span>
        </p>
      )}
      <p className="mt-1 text-xs text-muted-foreground">Try searching with different keywords</p>
    </div>
  )
}
