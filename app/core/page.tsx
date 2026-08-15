import type { Metadata } from "next";
import CollectionPage from "@/components/CollectionPage";
import { COLLECTIONS } from "@/lib/catalog";

export const metadata: Metadata = {
  title: COLLECTIONS.core.title,
  description: COLLECTIONS.core.lede,
};

export default function Core() {
  return <CollectionPage id="core" fabric="Wool, falling at quarter speed." />;
}
