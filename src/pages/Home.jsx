import Navbar from "../components/Navbar";
import HeroSection from "../components/HeroSection";
import BestWorkers from "../components/BestWorkers";
// import Testimonials from '../components/Testimonials';
// import Footer from '../components/Footer';

const Home = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <HeroSection />
        <BestWorkers />
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-4xl font-bold text-center text-gradient mb-4">
            Welcome to Micro-Task
          </h1>
          <p className="text-center text-slate-400">
            Earn money by completing simple tasks.
          </p>
        </div>
      </main>
      {/* <Footer /> */}
    </div>
  );
};

export default Home;
