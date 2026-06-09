import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface ProductImageGalleryProps {
  images: string[];
  productName: string;
}

export function ProductImageGallery({ images, productName }: ProductImageGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const goToNext = () => {
    setSelectedIndex((prev) => (prev + 1) % images.length);
  };

  const goToPrevious = () => {
    setSelectedIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  if (images.length === 0) {
    return (
      <div className="surface-card overflow-hidden">
        <div className="aspect-[3/2.75] bg-peach-soft/60 flex items-center justify-center">
          <span className="text-muted-foreground">No images available</span>
        </div>
      </div>
    );
  }

  return (
    <div className="flex gap-3">
      {/* Thumbnail Column - Only show if more than 1 image */}
      {images.length > 1 && (
        <div className="flex flex-col gap-2 w-20">
          {images.map((image, index) => (
            <button
              key={`thumb-${image}-${index}`}
              onClick={() => setSelectedIndex(index)}
              className={`
                aspect-square overflow-hidden rounded-lg border-2 transition-all
                ${index === selectedIndex 
                  ? 'border-terracotta ring-2 ring-terracotta/20' 
                  : 'border-line hover:border-terracotta/50'
                }
              `}
            >
              <img 
                src={image} 
                alt={`${productName} thumbnail ${index + 1}`}
                className="h-full w-full object-cover"
              />
            </button>
          ))}
        </div>
      )}
      
      {/* Main Image */}
      <div className="surface-card overflow-hidden relative group flex-1">
        <div className="aspect-[3/2.75] overflow-hidden bg-peach-soft/60">
          <img 
            key={`main-${images[selectedIndex]}-${selectedIndex}`}
            src={images[selectedIndex]} 
            alt={`${productName} - Image ${selectedIndex + 1}`} 
            className="h-full w-full object-cover transition-transform duration-500"
          />
        </div>
        
        {/* Navigation Arrows - Only show if more than 1 image */}
        {images.length > 1 && (
          <>
            <button
              onClick={goToPrevious}
              className="absolute left-4 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-background/90 backdrop-blur-sm border border-line flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-background"
              aria-label="Previous image"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              onClick={goToNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-background/90 backdrop-blur-sm border border-line flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-background"
              aria-label="Next image"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
            
            {/* Image Counter */}
            <div className="absolute bottom-4 right-4 bg-background/90 backdrop-blur-sm border border-line px-3 py-1 rounded-full text-xs font-medium">
              {selectedIndex + 1} / {images.length}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
