import type { Metadata } from "next";
import { ImageOff } from "lucide-react";
import { PageHeader } from "@/components/ui/page-header";
import { Container } from "@/components/ui/container";
import { EmptyState } from "@/components/ui/empty-state";
import { GalleryGrid } from "@/components/gallery/gallery-grid";
import { gallery, galleryCategories } from "@/data/gallery";

export const metadata: Metadata = {
  title: "Gallery",
  description: "Screenshots and milestones from Cyrus Akacha Cyprian's development journey.",
};

export default function GalleryPage() {
  return (
    <>
      <PageHeader
        title="Gallery"
        description="Screenshots of what I have built. Milestones and before-and-after redesigns will be added as they happen."
      />
      <Container className="py-12">
        {gallery.length > 0 ? (
          <GalleryGrid entries={gallery} categories={galleryCategories} />
        ) : (
          <EmptyState icon={ImageOff} title="No images yet">
            Screenshots and milestones will appear here as I add them.
          </EmptyState>
        )}
      </Container>
    </>
  );
}
