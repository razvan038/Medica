import { Hexagon } from "lucide-react"
import { Footer } from "@/components/ui/footer"

export default function Demo() {
  return (
    <div className="w-full">
      <Footer
        logo={<Hexagon className="h-10 w-10" />}
        brandName="Medica"
        socialLinks={[]}
        mainLinks={[
          { href: "/products", label: "Products" },
          { href: "/about", label: "About" },
          { href: "/contact", label: "Contact" },
        ]}
        legalLinks={[
          { href: "/privacy", label: "Privacy" },
          { href: "/terms", label: "Terms" },
        ]}
        copyright={{
          text: "© 2025 Medica",
          license: "All rights reserved",
        }}
      />
    </div>
  )
}

