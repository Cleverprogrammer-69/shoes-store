import Link from "next/link";
import { Menu, ShoppingCart, Home, Package, List } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import NavbarSearch from "./NavbarSearch";
const navItems = [
  { name: "Home", href: "/", icon: Home },
  { name: "Products", href: "/product", icon: Package },
  { name: "Cart", href: "/cart", icon: ShoppingCart },
  { name: "Orders", href: "/order", icon: List },
];

const appName = "Shoes";

export default async function Navbar() {
  return (
    <nav className="border-b">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link
              href="/"
              className="text-2xl font-bold hover:text-primary transition duration-300 ease-in-out"
            >
              {appName}
            </Link>
          </div>

          {/* Search Bar */}
          <div className="hidden sm:block flex-1 max-w-sm mx-4">
            <NavbarSearch /> {/* Client Component for search */}
          </div>

          {/* Navigation Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link key={item.name} href={item.href} className="text-center">
                <div className="relative">
                  <item.icon className="h-6 w-6 mx-auto text-muted-foreground hover:text-primary" />
                </div>
                <span className="text-sm text-muted-foreground hover:text-primary">
                  {item.name}
                </span>
              </Link>
            ))}
          </div>

          {/* Mobile Menu */}
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="default" size="icon">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle>{appName}</SheetTitle>
                </SheetHeader>
                <SheetDescription className="hidden">
                  This is navigation of the app.
                </SheetDescription>
                <nav className="flex flex-col gap-4 mt-4">
                  <NavbarSearch />
                  {navItems.map((item) => (
                    <Link key={item.name} href={item.href}>
                      <SheetClose>
                        <span className="flex items-center gap-2 text-lg">
                          <item.icon className="h-5 w-5 text-muted-foreground" />
                          {item.name}
                        </span>
                      </SheetClose>
                    </Link>
                  ))}
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
}
