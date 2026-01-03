import Navbar from "../components/Navbar";
import HeroSection from "../components/HeroSection";
import BestWorkers from "../components/BestWorkers";
import Testimonials from "../components/Testimonials";
import HowItWorks from "../components/HowItWorks";
import WhyChooseUs from "../components/WhyChooseUs";
import PlatformStats from "../components/PlatformStats";
import Footer from "../components/Footer";

const Home = () => {
  return (
    <div className="min-h-screen flex flex-col bg-slate-950">
      <Navbar />
      <main className="flex-grow">
        <HeroSection />
        <PlatformStats />
        <WhyChooseUs />
        <BestWorkers />
        <HowItWorks />
        <Testimonials />
      </main>
      <Footer />
    </div>
  );
};

export default Home;
