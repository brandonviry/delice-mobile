import {
  Header,
  Footer,
  HeroSection,
  AboutSection,
  FeatureBanner,
  MenuGallery,
  AmbiancePhoto,
  DeliveryContactSection,
} from "@/components/layouts";

export default function Home() {
  return (
    <>
      <Header />
      <HeroSection />
      <AboutSection />
      <FeatureBanner />
      <MenuGallery />
      <AmbiancePhoto />
      <DeliveryContactSection />
      <Footer />
    </>
  );
}
