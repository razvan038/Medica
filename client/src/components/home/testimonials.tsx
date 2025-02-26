"use client";

import { useEffect, useState } from "react";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { User } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const reviews = [
  {
    title: "Excellent service!",
    content:
      "I ordered immunity supplements and received them the next day. The platform is super easy to use!",
    author: "Alexandra M.",
  },
  {
    title: "Great prices and fast delivery!",
    content:
      "I love that I can order my medications from home without waiting in long pharmacy lines!",
    author: "Mihai P.",
  },
  {
    title: "Better prices than in-store!",
    content:
      "I found the products I needed at a better price than in-store. Delivery was prompt, but I’d love to see more payment options.",
    author: "Elena D.",
  },
  {
    title: "Intuitive app!",
    content:
      "The app is very intuitive, and the medication reminder notifications are a great feature!",
    author: "Cristian R.",
  },
  {
    title: "Great shopping experience!",
    content:
      "I enjoyed my shopping experience, but I’d love to see a loyalty program for returning customers.",
    author: "Andreea L.",
  },
];

function Testimonials() {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!api) {
      return;
    }

    const interval = setInterval(() => {
      if (api.selectedScrollSnap() + 1 === api.scrollSnapList().length) {
        setCurrent(0);
        api.scrollTo(0);
      } else {
        api.scrollNext();
        setCurrent((prev) => prev + 1);
      }
    }, 4000);

    return () => clearInterval(interval);
  }, [api]);

  return (
    <div className="w-full py-20 lg:py-40">
      <div className="container mx-auto">
        <div className="flex flex-col gap-10">
          <h2 className="text-3xl md:text-5xl tracking-tighter lg:max-w-xl font-regular text-left">
            What our customers say
          </h2>
          <Carousel setApi={setApi} className="w-full">
            <CarouselContent>
              {reviews.map((review, index) => (
                <CarouselItem className="lg:basis-1/2" key={index}>
                  <div className="bg-muted border-gray-200 border-2 rounded-md h-full lg:col-span-2 p-6 aspect-video flex justify-between flex-col">
                    <User className="w-8 h-8 stroke-1" />
                    <div className="flex flex-col gap-4">
                      <div className="flex flex-col">
                        <h3 className="text-xl tracking-tight">{review.title}</h3>
                        <p className="text-muted-foreground max-w-xs text-base">
                          {review.content}
                        </p>
                      </div>
                      <p className="flex flex-row gap-2 text-sm items-center">
                        <span className="text-muted-foreground">By</span>
                        <Avatar className="h-6 w-6">
                          <AvatarImage src="https://github.com/shadcn.png" />
                          <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                        <span>{review.author}</span>
                      </p>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </div>
      </div>
    </div>
  );
}

export { Testimonials };