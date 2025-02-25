import Footer from "@/components/home/footer";
import Welcome from "@/components/home/welcome";
import {Button} from '@/components/ui/button'

export default function Home() {
  return (
    <section
      id="homepage"
      className="flex flex-col min-h-screen bg-white dark:bg-zinc-950 selection:bg-black selection:text-white"
    >
      <div className="flex flex-col items-center justify-center flex-grow">
        <Welcome />
        <Button>Vezi produse</Button>
      </div>
      <Footer />
    </section>
  );
}
