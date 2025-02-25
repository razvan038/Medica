import { Check } from "lucide-react";
import { Badge } from "@/components/ui/badge";

function Feature() {
  return (
    <div className="w-full py-20 lg:py-40">
      <div className="container mx-auto">
        <div className="grid border border-zinc-200 rounded-lg container p-8 grid-cols-1 gap-8 items-center lg:grid-cols-2 dark:border-zinc-800">
          <div className="flex gap-10 flex-col">
            <div className="flex gap-4 flex-col">
              <div>
                <Badge variant="outline">Platform</Badge>
              </div>
              <div className="flex gap-2 flex-col">
                <h2 className="text-3xl lg:text-5xl tracking-tighter max-w-xl text-left font-regular">
                Cum funcționează Medica?
                </h2>
                <p className="text-lg leading-relaxed tracking-tight text-zinc-500 max-w-xl text-left dark:text-zinc-400">
                Un ghid vizual în 3 pași simpli:                
                </p>
              </div>
            </div>
            <div className="grid lg:pl-6 grid-cols-1 sm:grid-cols-3 items-start lg:grid-cols-1 gap-6">
              <div className="flex flex-row gap-6 items-start">
                <Check className="w-4 h-4 mt-2 text-zinc-900 dark:text-zinc-50" />
                <div className="flex flex-col gap-1">
                  <p>Caută produsul dorit 🏥</p>
                  <p className="text-zinc-500 text-sm dark:text-zinc-400">
                    We&apos;ve made it easy to use and understand.
                  </p>
                </div>
              </div>
              <div className="flex flex-row gap-6 items-start">
                <Check className="w-4 h-4 mt-2 text-zinc-900 dark:text-zinc-50" />
                <div className="flex flex-col gap-1">
                  <p>Adaugă în coș și plasează comanda 🛒</p>
                  <p className="text-zinc-500 text-sm dark:text-zinc-400">
                    We&apos;ve made it fast and reliable.
                  </p>
                </div>
              </div>
              <div className="flex flex-row gap-6 items-start">
                <Check className="w-4 h-4 mt-2 text-zinc-900 dark:text-zinc-50" />
                <div className="flex flex-col gap-1">
                  <p>Primești acasă rapid și în siguranță 🚀</p>
                  <p className="text-zinc-500 text-sm dark:text-zinc-400">
                    We&apos;ve made it beautiful and modern.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-zinc-100 rounded-md aspect-square dark:bg-zinc-800"></div>
        </div>
      </div>
    </div>
  );
}

export { Feature };