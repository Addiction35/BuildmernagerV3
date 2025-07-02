"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  BarChart3,
  Building2,
  ClipboardList,
  FileText,
  Home,
  LayoutDashboard,
  Menu,
  Receipt,
  Settings,
  ShoppingCart,
  Users,
  Wallet,
  Briefcase,
  DollarSign,
  FolderOpen,
  CheckSquare,
  UserCircle,
  Building,
  UsersRound,
  Shield,
  X,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"

const sidebarItems = [
  {
    title: "Dashboard",
    href: "/",
    icon: LayoutDashboard,
  },
  {
    title: "Projects",
    href: "/projects",
    icon: Building2,
  },
  {
    title: "Clients",
    href: "/clients",
    icon: UserCircle,
  },
  {
    title: "Vendors",
    href: "/vendors",
    icon: Building,
  },
  {
    title: "Teams",
    href: "/teams",
    icon: UsersRound,
  },
  {
    title: "Estimates",
    href: "/estimates",
    icon: ClipboardList,
  },
  {
    title: "Proposals",
    href: "/proposals",
    icon: FileText,
  },
  {
    title: "Purchase Orders",
    href: "/purchase-orders",
    icon: ShoppingCart,
  },
  {
    title: "Expenses",
    href: "/expenses",
    icon: Wallet,
  },
  {
    title: "Wages",
    href: "/wages",
    icon: Users,
  },
  {
    title: "Tasks",
    href: "/tasks",
    icon: CheckSquare,
  },
  {
    title: "Resources",
    href: "/resources",
    icon: Briefcase,
  },
  {
    title: "Budgets",
    href: "/budgets",
    icon: DollarSign,
  },
  {
    title: "Documents",
    href: "/documents",
    icon: FolderOpen,
  },
  {
    title: "Payroll",
    href: "/payroll",
    icon: DollarSign,
  },
  {
    title: "Reports",
    href: "/reports",
    icon: BarChart3,
  },
  {
    title: "Admin",
    icon: Shield,
    children: [
      {
        title: "Users",
        href: "/admin/users",
        icon: Users,
      },
      {
        title: "Settings",
        href: "/admin/settings",
        icon: Settings,
      },
    ],
  },
  {
    title: "Settings",
    href: "/settings",
    icon: Settings,
  },
]

export function MobileSidebar() {
  const pathname = usePathname()
  const [openItems, setOpenItems] = useState<string[]>([])
  const [open, setOpen] = useState(false)

  const toggleItem = (title: string) => {
    setOpenItems((prev) => (prev.includes(title) ? prev.filter((item) => item !== title) : [...prev, title]))
  }

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="h-6 w-6" />
          <span className="sr-only">Toggle menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="p-0 w-72">
        <div className="flex h-16 items-center border-b px-4">
          <Link href="/" className="flex items-center gap-2 font-semibold" onClick={() => setOpen(false)}>
            <Home className="h-6 w-6" />
            <span className="text-lg font-bold">Studio1:1</span>
          </Link>

        </div>
        <div className="flex flex-col gap-1 p-4 h-[calc(100vh-4rem)] overflow-y-auto">
          {sidebarItems.map((item) =>
            item.children ? (
              <Collapsible
                key={item.title}
                open={openItems.includes(item.title)}
                onOpenChange={() => toggleItem(item.title)}
                className="w-full"
              >
                <CollapsibleTrigger asChild>
                  <Button variant="ghost" className="w-full justify-start gap-2 font-medium">
                    <item.icon className="h-5 w-5" />
                    {item.title}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className={`ml-auto h-4 w-4 transition-transform ${
                        openItems.includes(item.title) ? "rotate-180" : ""
                      }`}
                    >
                      <polyline points="6 9 12 15 18 9"></polyline>
                    </svg>
                  </Button>
                </CollapsibleTrigger>
                <CollapsibleContent className="pl-6 pt-1">
                  {item.children.map((child) => (
                    <Button
                      key={child.href}
                      variant={pathname === child.href ? "secondary" : "ghost"}
                      className={cn("w-full justify-start gap-2 mb-1", pathname === child.href && "bg-secondary")}
                      asChild
                      onClick={() => setOpen(false)}
                    >
                      <Link href={child.href}>
                        <child.icon className="h-4 w-4" />
                        {child.title}
                      </Link>
                    </Button>
                  ))}
                </CollapsibleContent>
              </Collapsible>
            ) : (
              <Button
                key={item.href}
                variant={pathname === item.href ? "secondary" : "ghost"}
                className={cn("justify-start gap-2", pathname === item.href && "bg-secondary")}
                asChild
                onClick={() => setOpen(false)}
              >
                <Link href={item.href}>
                  <item.icon className="h-5 w-5" />
                  {item.title}
                </Link>
              </Button>
            ),
          )}
        </div>
      </SheetContent>
    </Sheet>
  )
}
