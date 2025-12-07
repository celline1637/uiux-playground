import { forwardRef } from "react";
import { cn } from "@/shared/utils/cn";
import { Iconify } from "@/components/iconify";

// ----------------------------------------------------------------------

type Props = {
  title: {
    text: string;
    highlight: boolean;
  }[];
  path: {
    text: string;
    highlight: boolean;
  }[];
  isSelected?: boolean;
  onClickItem: () => void;
};

export const ResultItem = forwardRef<HTMLButtonElement, Props>(
  ({ title, path, isSelected = false, onClickItem }, ref) => {
    return (
      <button
        ref={ref}
        onClick={onClickItem}
        className={cn(
          "group w-full rounded-md border border-transparent border-b-border px-3 py-2 text-left transition-colors",
          "hover:bg-accent hover:border-border",
          isSelected && "bg-accent border-border"
        )}
      >
        <div className="flex items-center gap-2">
          <Iconify
            icon="solar:arrow-right-bold"
            width={16}
            className="shrink-0 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100"
          />
          <div className="flex-1 min-w-0">
            <div className="text-sm font-medium text-foreground">
              {title.map((part, index) => (
                <span
                  key={index}
                  className={part.highlight ? "text-primary font-semibold" : ""}
                >
                  {part.text}
                </span>
              ))}
            </div>
            <div className="truncate text-xs text-muted-foreground">
              {path.map((part, index) => (
                <span
                  key={index}
                  className={part.highlight ? "text-primary font-medium" : ""}
                >
                  {part.text}
                </span>
              ))}
            </div>
          </div>
        </div>
      </button>
    );
  }
);

ResultItem.displayName = "ResultItem";
