import { Menu } from "lucide-react";
import { Tablets } from "lucide-react";
import { ShoppingBag } from "lucide-react"
import Link from "next/link";
import {TransitionLink} from '@/components/home/TransitionLink'
import { ShieldPlus } from 'lucide-react';
import { cn } from "@/lib/utils";


import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const subMenuItemsOne = [
  {
    title: "Analgezice",
    description: "Ameliorează durerea, precum paracetamolul sau ibuprofenul.",
    icon: <Tablets className="size-6 shrink-0" />,
  }, 
  {
    title: "Antibiotice",
    description: "Combat infecțiile bacteriene, cum ar fi penicilina.",
    icon: <Tablets className="size-6 shrink-0" />,
  }, 
  {
    title: "Antiinflamatoare",
    description: "Reduc inflamațiile și durerea, de exemplu, ibuprofen.",
    icon: <Tablets className="size-6 shrink-0" />,
  }, 
  {
    title: "Vitamine",
    description: "Suplimente pentru carențe de vitamine esențiale.",
    icon: <Tablets className="size-6 shrink-0" />,
  }, 
  {
    title: "Digestive",
    description: "Ajută la îmbunătățirea digestiei și alină disconfortul gastric.",
    icon: <Tablets className="size-6 shrink-0" />,
  }, 
  {
    title: "Antitusive",
    description: "Calmante pentru tuse, reduc frecvența tusei.",
    icon: <Tablets className="size-6 shrink-0" />,
  }, 
];

const Navbar = () => {
  return (
    <section className="py-4">
      <div className="px-4 mx-auto container-none sm:px-6">
        <nav className="justify-between hidden lg:flex">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <TransitionLink className="" href="/">
                <span className="flex text-xl font-bold sm:mb-1 hover:text-neutral-700">Medica</span>
              </TransitionLink>
            </div>
            <div className="flex items-center">
              <TransitionLink
                className={cn(
                  "text-muted-foreground",
                  navigationMenuTriggerStyle,
                  buttonVariants({
                    variant: "ghost",
                  })
                )}
                href="/about"
              >
                About us
              </TransitionLink>
              <TransitionLink
                className={cn(
                  "text-muted-foreground",
                  navigationMenuTriggerStyle,
                  buttonVariants({
                    variant: "ghost",
                  })
                )}
                href="/contact"
              >
                Contact
              </TransitionLink>
              <NavigationMenu>
                <NavigationMenuList>
                  <NavigationMenuItem className="text-muted-foreground">
                    <NavigationMenuTrigger>
                      <span>Shop</span>
                    </NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <ul className="w-64 p-3">
                        {subMenuItemsOne.map((item, idx) => (
                          <li key={idx}>
                            <NavigationMenuLink asChild>
                              <Link
                                className={cn(
                                  "flex select-none gap-2 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground hover:bg-stone-100"
                                )}
                                href="#"
                              >
                                {item.icon}
                                <div>
                                  <div className="text-sm font-semibold">
                                    {item.title}
                                  </div>
                                  <p className="text-xs leading-snug text-muted-foreground">
                                    {item.description}
                                  </p>
                                </div>
                              </Link>
                            </NavigationMenuLink>
                          </li>
                        ))}
                      </ul>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                </NavigationMenuList>
              </NavigationMenu>
            </div>
          </div>
          <div className="flex gap-3">
          <TransitionLink
                className={cn(
                  "text-muted-foreground size-2",
                  navigationMenuTriggerStyle,
                  buttonVariants({
                    variant: "ghost",
                  })
                )}
                href="/admin"
              >
                <ShieldPlus />
              </TransitionLink>
            
          <TransitionLink
                className={cn(
                  "text-muted-foreground size-2",
                  navigationMenuTriggerStyle,
                  buttonVariants({
                    variant: "ghost",
                  })
                )}
                href="/cart"
              >
                <ShoppingBag />
              </TransitionLink>
            
              <Button asChild>
                <TransitionLink className="" href="/auth/login">Log in</TransitionLink>
              </Button>
          </div>
        </nav>
        <div className="block lg:hidden">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-xl font-bold">Medica</span>
            </div>
            <div className="flex items-center gap-2">
              
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" size="icon">
                    <Menu className="size-4" />
                  </Button>
                </SheetTrigger>
                <SheetContent className="w-full overflow-y-auto" side="left">
                  <SheetHeader className="hidden">
                    <SheetTitle>
                      <div className="flex items-center gap-2">
                        <span className="text-xl font-bold">Medica</span>
                      </div>
                    </SheetTitle>
                  </SheetHeader>
                  <div className="flex flex-col gap-4 mt-8 mb-8">
                    <Link href="#" className="font-semibold">
                      Link
                    </Link>
                    <Accordion type="single" collapsible className="w-full">
                      <AccordionItem value="products" className="border-b-0">
                        <AccordionTrigger className="py-0 mb-4 font-semibold hover:no-underline">
                          Shop
                        </AccordionTrigger>
                        <AccordionContent className="mt-2">
                          {subMenuItemsOne.map((item, idx) => (
                            <Link
                              key={idx}
                              className={cn(
                                "flex select-none gap-4 rounded-md p-3 leading-none outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                              )}
                              href="#"
                            >
                              {item.icon}
                              <div>
                                <div className="text-sm font-semibold">
                                  {item.title}
                                </div>
                                <p className="text-sm leading-snug text-muted-foreground">
                                  {item.description}
                                </p>
                              </div>
                            </Link>
                          ))}
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Navbar;
