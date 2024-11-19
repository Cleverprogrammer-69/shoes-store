"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, Search, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter
} from "@/components/ui/sheet";
import { Label } from "../ui/label";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

const navItems = [
  { name: "Home", href: "/" },
  { name: "Products", href: "/products" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
];
const appName = "Shoes"

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Searching for:", searchQuery);
  };

  return (
    <nav className="border-b">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link
              href="/"
              className="text-2xl font-bold hover:text-primary hover:text-2xl hover:border-b-2 border-primary transition duration-300 ease-in-out"
            >
              {appName}
            </Link>
          </div>

          {/* Search Bar - Hidden on mobile, visible on larger screens */}
          <div className="hidden sm:block flex-1 max-w-sm mx-4">
            <form onSubmit={handleSearch} className="flex">
              <div className="relative flex-grow">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search"
                  className="pl-8 rounded"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Button type="submit" className="rounded ml-2 bg-primary">
                Search
              </Button>
            </form>
          </div>

          {/* Navigation Menu - Hidden on mobile, visible on larger screens */}
          <div className="hidden md:block">
            <NavigationMenu>
              <NavigationMenuList>
                {navItems.map((item) => (
                  <NavigationMenuItem key={item.name}>
                    <NavigationMenuLink
                      href={item.href}
                      className="group inline-flex h-9 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50"
                    >
                      {item.name}
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                ))}
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="default" size="icon">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Open menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle className="hidden">Navigation Menu</SheetTitle>
                  <SheetDescription className="hidden">
                    Through this menu you can navigate in the app
                  </SheetDescription>
                </SheetHeader>
                <nav className="flex flex-col gap-4">
                  <div className="flex items-center justify-between">
                    <SheetClose asChild>
                      <Link
                        href="/"
                        className="text-2xl font-bold hover:text-primary hover:text-2xl hover:border-b-2 border-primary transition duration-300 ease-in-out"
                      >
                        {appName}
                      </Link>
                    </SheetClose>
                  </div>
                  <form onSubmit={handleSearch} className="flex">
                    <div className="relative flex-grow">
                      <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="Search"
                        className="pl-8 rounded focus:border-none"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                      />
                      <X
                        className="absolute right-2 top-2.5 h-4 w-4 text-muted-foreground cursor-pointer"
                        onClick={() => setSearchQuery("")}
                      />
                    </div>
                    <Button type="submit" className="rounded ml-2">
                      Search
                    </Button>
                  </form>
                  {navItems.map((item) => (
                    <SheetClose key={item.name} asChild>
                      <Link
                        href={item.href}
                        className="block px-2 py-1 text-lg"
                      >
                        {item.name}
                      </Link>
                    </SheetClose>
                  ))}
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>

      {/* Search Bar for mobile - Visible only on mobile screens */}
      <div className="sm:hidden px-4 pb-4">
        <form onSubmit={handleSearch} className="flex">
          <div className="relative flex-grow">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search"
              className="pl-8 rounded focus:border-none"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <X
              className="absolute right-2 top-2.5 h-4 w-4 text-muted-foreground cursor-pointer"
              onClick={() => setSearchQuery("")}
            />
          </div>
          <Button type="submit" className="rounded ml-2">
            Search
          </Button>
        </form>
      </div>
    </nav>
  );
}
