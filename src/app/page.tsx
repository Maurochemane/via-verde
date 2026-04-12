import { Hero } from "./components/Hero";
import { How } from "./components/How";
import SearchBar from "./components/SearchBar";
import WhatsAppBanner from "./components/WhatsappBanner";
import Container from "./components/Container";

export default function Home() {
  return (
    <div className="w-full">
      <Hero />
      <Container className="py-10">
        {/* SearchBar moved to registration page */}
      </Container>
      <Container className="py-6">
        <WhatsAppBanner />
      </Container>
    </div>
  );
}
