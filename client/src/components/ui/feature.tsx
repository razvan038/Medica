import { useState } from "react";
import { Check } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";

const steps = [
  {
    title: "Caută produsul dorit 🏥",
    description: "We've made it easy to use and understand.",
    image: "/SearchProduct_image.png",
  },
  {
    title: "Adaugă în coș și plasează comanda 🛒",
    description: "We've made it fast and reliable.",
    image: "/AddToCart_image.png",
  },
  {
    title: "Primești acasă rapid și în siguranță 🚀",
    description: "We've made it beautiful and modern.",
    image: "/Delivery_image.png",
  },
];

function Feature() {
  const [hoveredImage, setHoveredImage] = useState<string | null>(null);

  return (
    <div className="w-full py-20 lg:py-40">
      <div className="container mx-auto">
        <div className="grid border border-zinc-300 bg-white dark:bg-zinc-900 rounded-lg container p-8 grid-cols-1 gap-8 items-center lg:grid-cols-2 dark:border-zinc-800">
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
              {steps.map((step, index) => (
                <div
                  key={index}
                  className="flex flex-row gap-6 items-start cursor-pointer duration-300 dark:bg-zinc-800 p-3 rounded-md hover:bg-gray-200 dark:hover:bg-zinc-700 transition-colors"
                  onMouseEnter={() => setHoveredImage(step.image as string)}
                  onMouseLeave={() => setHoveredImage(null)}
                >
                  <Check className="w-4 h-4 mt-2 text-zinc-900 dark:text-zinc-50" />
                  <div className="flex flex-col gap-1">
                    <p>{step.title}</p>
                    <p className="text-zinc-500 text-sm dark:text-zinc-400">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-zinc-200 rounded-md aspect-square dark:bg-zinc-700 flex items-center justify-center overflow-hidden relative">
            <motion.div
              key={hoveredImage}
              initial={{ opacity: 0, filter: "blur(10px)" }}
              animate={{ opacity: 1, filter: "blur(0px)" }}
              exit={{ opacity: 0, filter: "blur(10px)" }}
              transition={{ duration: 0.5 }}
              className="absolute w-full h-full"
            >
              {hoveredImage ? (
                <img
                  src={hoveredImage}
                  alt="Preview"
                  className="w-full h-full object-cover rounded-md"
                />
              ) : (
                <div className="text-zinc-400 flex items-center justify-center h-full">
                  Plasează cursorul pe un pas
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}

export { Feature };