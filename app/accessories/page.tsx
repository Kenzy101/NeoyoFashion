import type { Metadata } from "next";
import CollectionPage from "@/components/CollectionPage";
import { COLLECTIONS } from "@/lib/catalog";

export const metadata: Metadata = {
  title: COLLECTIONS.accessories.title,
  description: COLLECTIONS.accessories.lede,
};

export default function Accessories() {
  return <CollectionPage id="accessories" even />;
}
