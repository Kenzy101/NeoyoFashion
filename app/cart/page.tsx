import type { Metadata } from "next";
import BagView from "@/components/BagView";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Your bag",
  description: "The pieces you are holding.",
  robots: { index: false, follow: false },
};

export default function Cart() {
  return (
    <>
      <BagView />
      <Footer />
    </>
  );
}
