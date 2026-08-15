import type { Metadata } from "next";
import CollectionPage from "@/components/CollectionPage";
import { COLLECTIONS } from "@/lib/catalog";

export const metadata: Metadata = {
  title: COLLECTIONS.ease.title,
  description: COLLECTIONS.ease.lede,
};

export default function Ease() {
  return (
    <CollectionPage id="ease" fabric="Linen-silk, drifting across a bone sweep." />
  );
}
