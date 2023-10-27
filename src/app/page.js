import HeaderMain from "@/components/HeaderMain";
import Navbar from "@/components/Navbar";
import Hero from "../components/Hero";
import NewProducts from "../components/NewProducts";
import Testimonial from "../components/Testimonial";
import MobNavbar from "@/components/MobNavbar";

export default function Home() {
  return (
    <main>
      <HeaderMain />
      <Navbar />
      <MobNavbar />
      <Hero />
      <NewProducts />
      <Testimonial />
    </main>
  );
}
