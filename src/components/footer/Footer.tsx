import Link from "next/link";
import {
  Facebook,
  Instagram,
  Twitter,
  GitlabIcon as GitHub,
  Mail,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";

export default function Footer() {
  return (
    <footer className="bg-secondary mt-auto">
      <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <h2 className="text-lg font-semibold text-foreground">About Us</h2>
            <p className="mt-4 text-sm text-muted-foreground">
              We are a company dedicated to providing high-quality products and
              excellent customer service. Our mission is to make your life
              easier and more enjoyable.
            </p>
          </div>
          <div>
            <h2 className="text-lg font-semibold text-foreground">
              Quick Links
            </h2>
            <ul className="mt-4 space-y-2">
              {[
                "Home",
                "Products",
                "About",
                "Contact",
                "FAQ",
                "Privacy Policy",
                "Terms of Service",
              ].map((item) => (
                <li key={item}>
                  <Link
                    href={`/${item.toLowerCase().replace(/\s+/g, "-")}`}
                    className="text-sm text-muted-foreground hover:text-foreground"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="text-lg font-semibold text-foreground">
              Contact Us
            </h2>
            <ul className="mt-4 space-y-2">
              <li className="text-sm text-muted-foreground">
                123 Main St, Anytown, USA 12345
              </li>
              <li className="text-sm text-muted-foreground">
                Phone: (123) 456-7890
              </li>
              <li className="text-sm text-muted-foreground">
                Email: info@example.com
              </li>
            </ul>
          </div>
          <div>
            <h2 className="text-lg font-semibold text-foreground">
              Newsletter
            </h2>
            <p className="mt-4 text-sm text-muted-foreground">
              Stay up to date with our latest news and products.
            </p>
            <form className="mt-4 flex flex-col sm:flex-row gap-2">
              <Input
                type="email"
                placeholder="Enter your email"
                className="flex-grow"
              />
              <Button type="submit">Subscribe</Button>
            </form>
          </div>
        </div>
        <Separator className="my-8" />
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <p className="text-sm text-muted-foreground">
            &copy; 2023 Your Company Name. All rights reserved.
          </p>
          <div className="flex space-x-4">
            <Button variant="ghost" size="icon" aria-label="Facebook">
              <Facebook className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" aria-label="Instagram">
              <Instagram className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" aria-label="Twitter">
              <Twitter className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" aria-label="GitHub">
              <GitHub className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" aria-label="Email">
              <Mail className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </footer>
  );
}

// export default function Layout({ children }: { children: React.ReactNode }) {
//   return (
//     <div className="flex flex-col min-h-screen">
//       <Navbar />
//       <main className="flex-1">{children}</main>
//       <Footer />
//     </div>
//   );
// }
