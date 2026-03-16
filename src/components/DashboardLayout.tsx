import { ReactNode } from "react";
import { Link, useLocation } from "react-router-dom";
import { NavLink } from "@/components/NavLink";
import { NotificationBell } from "@/components/NotificationBell";
import { LucideIcon, PanelLeft } from "lucide-react";
import {
  SidebarProvider,
  SidebarTrigger,
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarHeader,
  SidebarFooter,
  SidebarInset,
} from "@/components/ui/sidebar";

export interface SidebarItem {
  title: string;
  url: string;
  icon: LucideIcon;
}

interface DashboardLayoutProps {
  children: ReactNode;
  items: SidebarItem[];
  roleLabel: string;
  roleEmoji: string;
  userName?: string;
  homeUrl: string;
}

export function DashboardLayout({
  children,
  items,
  roleLabel,
  roleEmoji,
  userName = "User",
  homeUrl,
}: DashboardLayoutProps) {
  const location = useLocation();

  return (
    <SidebarProvider>
      <Sidebar collapsible="icon">
        <SidebarHeader className="p-4 border-b border-sidebar-border">
          <Link to="/" className="flex items-center gap-2">
            <span className="text-lg">{roleEmoji}</span>
            <span className="text-sm font-bold text-gradient-gold group-data-[collapsible=icon]:hidden">
              Magic Learning
            </span>
          </Link>
          <span className="text-[10px] uppercase tracking-wider text-sidebar-foreground/50 mt-1 group-data-[collapsible=icon]:hidden">
            {roleLabel}
          </span>
        </SidebarHeader>

        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Menu</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      asChild
                      isActive={location.pathname === item.url}
                      tooltip={item.title}
                    >
                      <NavLink
                        to={item.url}
                        end
                        activeClassName="bg-sidebar-accent text-sidebar-accent-foreground font-medium"
                      >
                        <item.icon className="shrink-0" />
                        <span>{item.title}</span>
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>

        <SidebarFooter className="p-3 border-t border-sidebar-border">
          <div className="flex items-center gap-2 group-data-[collapsible=icon]:justify-center">
            <div className="w-7 h-7 rounded-full bg-gradient-gold flex items-center justify-center text-xs font-bold text-primary-foreground shrink-0">
              {userName[0]}
            </div>
            <div className="group-data-[collapsible=icon]:hidden">
              <div className="text-xs font-medium text-sidebar-foreground">{userName}</div>
              <div className="text-[10px] text-sidebar-foreground/50">{roleLabel}</div>
            </div>
          </div>
        </SidebarFooter>
      </Sidebar>

      <SidebarInset>
        {/* Header with trigger */}
        <header className="sticky top-0 z-40 h-12 flex items-center justify-between border-b border-border bg-background/80 backdrop-blur-sm px-4">
          <div className="flex items-center gap-2">
            <SidebarTrigger />
            <span className="text-sm font-medium text-muted-foreground">{roleLabel}</span>
          </div>
          <NotificationBell />
        </header>

        <div className="flex-1 overflow-auto">
          {children}
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
