import Hero from "@/components/Hero";
import Grid from "@/components/Grid";
import ExpandableCardDemo from "@/components/ui/expandable-cards";
import FloatingDockDemo from "@/components/ui/FloatingDock";
import { ContactForm } from "@/components/ui/ContactForm";

export default function Home() {
  return (
    <main className="relative bg-customblack-100 flex justify-center items-center flex-col overflow-hidden mx-auto sm:px-10 px-5">
      <div>
        <FloatingDockDemo />
        <Hero />
        <Grid />
        <ExpandableCardDemo />
        <ContactForm />
      </div>
    </main>
  );
}
