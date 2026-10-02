import Faq from "./components/Faq";
import Facility from "./components/Facility";
import Footer, { BackToTop, StickyCTA } from "./components/Footer";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Insurance from "./components/Insurance";
import Levels from "./components/Levels";
import Reviews from "./components/Reviews";
import VerifyForm from "./components/VerifyForm";
import WhyChoose from "./components/WhyChoose";

export default function App() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main id="main">
        <Hero />
        <Levels />
        <Insurance />
        <WhyChoose />
        <Facility />
        <Reviews />
        <VerifyForm />
        <Faq />
      </main>
      <Footer />
      <StickyCTA />
      <BackToTop />
    </div>
  );
}
