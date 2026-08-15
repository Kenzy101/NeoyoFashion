import type { Metadata } from "next";
import CheckoutForm from "@/components/CheckoutForm";

export const metadata: Metadata = {
  title: "Checkout",
  description: "One page. Nothing more than is needed.",
  robots: { index: false, follow: false },
};

export default function Checkout() {
  return <CheckoutForm />;
}
