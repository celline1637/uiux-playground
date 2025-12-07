import { Iconify } from "@/components/iconify";
import { cn } from "@/shared/utils/cn";

import { useActiveLink } from "@/routes/hooks";
import { Link } from "react-router-dom";
import { navigation } from "./config-nav-data";
import { ScrollArea } from "../ui/scroll-area";
import { Button } from "../ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import { Separator } from "../ui/separator";

// ----------------------------------------------------------------------

const Sidebar = ({
  collapsed,
  setCollapsed,
}: {
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
}) => {
  return (
    <aside
      className={cn(
        "hidden lg:flex flex-col h-[calc(100vh-3.5rem)] bg-background border-r transition-all duration-300 ease-in-out",
        collapsed ? "w-16" : "w-64"
      )}
    >
      {/* Header with Collapse Button */}
      <div
        className={cn(
          "flex items-center px-2 py-3 border-b border-border",
          collapsed ? "justify-center p-2" : "justify-between px-4"
        )}
      >
        {!collapsed && (
          <h2 className="font-semibold text-sm text-muted-foreground">
            Navigation
          </h2>
        )}
        <Tooltip open={collapsed ? undefined : false}>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setCollapsed(!collapsed)}
              className="h-8 w-8"
            >
              <Iconify
                icon={
                  collapsed
                    ? "solar:double-alt-arrow-right-bold"
                    : "solar:double-alt-arrow-left-bold"
                }
                width={16}
                className="text-muted-foreground"
              />
            </Button>
          </TooltipTrigger>
          <TooltipContent side="right" sideOffset={6}>
            {collapsed ? "Expand Sidebar" : "Collapse Sidebar"}
          </TooltipContent>
        </Tooltip>
      </div>

      {/* Navigation Content */}
      <ScrollArea className="flex-1">
        <div className={cn("p-2", !collapsed && "p-4")}>
          <nav className="space-y-6">
            {navigation.map((section, index) => (
              <div key={section.title}>
                {index > 0 && (
                  <Separator className={cn("my-6", collapsed && "my-4")} />
                )}
                {!collapsed && (
                  <h3 className="mb-2 px-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    {section.title}
                  </h3>
                )}
                <ul className="space-y-1">
                  {section.items.map((item) => (
                    <li key={item.path}>
                      <SidebarLinkItem
                        title={item.title}
                        path={item.path}
                        icon={item.icon}
                        collapsed={collapsed}
                      />
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>
      </ScrollArea>
    </aside>
  );
};

export default Sidebar;

const SidebarLinkItem = ({
  title,
  path,
  icon,
  collapsed,
}: {
  title: string;
  path: string;
  icon: string;
  collapsed: boolean;
}) => {
  const isActive = useActiveLink(path);

  const linkContent = (
    <Link
      to={path}
      className={cn(
        "flex items-center gap-3 rounded-md text-sm transition-colors",
        collapsed ? "justify-center px-2 py-2" : "px-3 py-2",
        isActive
          ? "bg-accent text-accent-foreground font-medium"
          : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
      )}
    >
      <Iconify icon={icon} width={16} />
      {!collapsed && <span>{title}</span>}
    </Link>
  );

  if (collapsed) {
    return (
      <Tooltip>
        <TooltipTrigger asChild>{linkContent}</TooltipTrigger>
        <TooltipContent side="right" sideOffset={6}>
          {title}
        </TooltipContent>
      </Tooltip>
    );
  }

  return linkContent;
};
