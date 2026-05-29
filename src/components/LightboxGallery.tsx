import React, { useEffect, useState, useRef, useCallback } from 'react';

interface LightboxImage {
  id: string;
  src: string;
  alt: string;
}

interface LightboxGalleryProps {
  images: LightboxImage[];
  thumbnailWidth?: string;
  thumbnailHeight?: string;
  className?: string;
}

export default function LightboxGallery({ images, thumbnailWidth = '800px', thumbnailHeight, className = '' }: LightboxGalleryProps) {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [wasDrag, setWasDrag] = useState(false);
  const dragStartX = useRef(0);
  const dragStartScrollLeft = useRef(0);
  const carouselRef = useRef<HTMLDivElement>(null);

  const openLightbox = useCallback((index: number) => {
    setCurrentIndex(index);
    setLightboxOpen(true);
    window.location.hash = `lightbox-${images[index].id}`;
  }, [images]);

  const closeLightbox = useCallback(() => {
    setLightboxOpen(false);
    window.location.hash = '';
  }, []);

  const nextImage = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
    window.location.hash = `lightbox-${images[(currentIndex + 1) % images.length].id}`;
  }, [images, currentIndex]);

  const prevImage = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
    window.location.hash = `lightbox-${images[(currentIndex - 1 + images.length) % images.length].id}`;
  }, [images, currentIndex]);

  const scrollCarousel = useCallback((direction: 'prev' | 'next') => {
    if (carouselRef.current) {
      const scrollAmount = 400;
      if (direction === 'next') {
        carouselRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      } else {
        carouselRef.current.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
      }
    }
  }, []);

  const startDrag = useCallback((e: React.MouseEvent) => {
    if (carouselRef.current) {
      setIsDragging(true);
      dragStartX.current = e.clientX;
      dragStartScrollLeft.current = carouselRef.current.scrollLeft;
      carouselRef.current.style.cursor = 'grabbing';
      carouselRef.current.style.userSelect = 'none';
    }
  }, []);

  const onDrag = useCallback((e: MouseEvent) => {
    if (!isDragging || !carouselRef.current) return;
    e.preventDefault();
    const x = e.clientX;
    const dragDistance = dragStartX.current - x;
    carouselRef.current.scrollLeft = dragStartScrollLeft.current + dragDistance * 2;
    if (Math.abs(dragDistance) > 5) {
      setWasDrag(true);
    }
  }, [isDragging]);

  const endDrag = useCallback(() => {
    if (carouselRef.current) {
      setIsDragging(false);
      carouselRef.current.style.cursor = 'grab';
      carouselRef.current.style.userSelect = '';
      setTimeout(() => setWasDrag(false), 50);
    }
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!lightboxOpen) {
        if (e.key === 'ArrowRight') {
          scrollCarousel('next');
        } else if (e.key === 'ArrowLeft') {
          scrollCarousel('prev');
        }
        return;
      }
      if (e.key === 'Escape') {
        closeLightbox();
      } else if (e.key === 'ArrowRight') {
        nextImage();
      } else if (e.key === 'ArrowLeft') {
        prevImage();
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [lightboxOpen, closeLightbox, nextImage, prevImage, scrollCarousel]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => onDrag(e);
    const handleMouseUp = () => endDrag();
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, onDrag, endDrag]);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.classList.contains('lightbox-modal')) {
        closeLightbox();
      }
    };
    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, [closeLightbox]);

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash.startsWith('#lightbox-')) {
        const id = hash.substring(9);
        const index = images.findIndex(img => img.id === id);
        if (index !== -1) {
          setCurrentIndex(index);
          setLightboxOpen(true);
        }
      } else {
        setLightboxOpen(false);
      }
    };
    window.addEventListener('hashchange', handleHashChange);
    handleHashChange();
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, [images]);

  return (
    <>
      <div className={`lightbox-gallery ${className}`} style={{ position: 'relative', margin: '24px 0' }}>
        <div
          className="lightbox-carousel"
          ref={carouselRef}
          onMouseDown={startDrag}
          style={{
            display: 'flex',
            overflowX: 'auto',
            gap: '16px',
            paddingBottom: '12px',
            height: 'auto',
            scrollBehavior: 'smooth',
            cursor: 'grab',
          }}
        >
          {images.map((img, index) => (
            <a
              key={img.id}
              href={`#lightbox-${img.id}`}
              onClick={(e) => {
                if (!wasDrag) {
                  e.preventDefault();
                  openLightbox(index);
                }
              }}
              onAuxClick={(e) => {
                e.preventDefault();
              }}
              className="lightbox-slide"
              style={{ flexShrink: 0 }}
            >
              <img
                src={img.src}
                alt={img.alt}
                className="lightbox-thumbnail"
                style={{
                  borderRadius: '8px',
                  border: '1px solid #e0e0e0',
                  height: thumbnailHeight || 'auto',
                  cursor: isDragging ? 'grabbing' : 'pointer',
                  width: thumbnailWidth,
                  minWidth: thumbnailWidth,
                  display: 'block',
                  objectFit: thumbnailHeight ? 'contain' : 'cover',
                }}
              />
            </a>
          ))}
        </div>

        <button
          className="lightbox-carousel-button lightbox-carousel-button-prev"
          onClick={() => scrollCarousel('prev')}
          style={{
            position: 'absolute',
            left: '-48px',
            top: '50%',
            transform: 'translateY(-50%)',
            background: 'rgba(255, 255, 255, 0.9)',
            border: '1px solid #e0e0e0',
            borderRadius: '50%',
            width: '40px',
            height: '40px',
            cursor: 'pointer',
            fontSize: '18px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
          }}
          aria-label="Previous"
        >
          <i className="fas fa-chevron-left" aria-hidden="true" />
        </button>
        <button
          className="lightbox-carousel-button lightbox-carousel-button-next"
          onClick={() => scrollCarousel('next')}
          style={{
            position: 'absolute',
            right: '-48px',
            top: '50%',
            transform: 'translateY(-50%)',
            background: 'rgba(255, 255, 255, 0.9)',
            border: '1px solid #e0e0e0',
            borderRadius: '50%',
            width: '40px',
            height: '40px',
            cursor: 'pointer',
            fontSize: '18px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
          }}
          aria-label="Next"
        >
          <i className="fas fa-chevron-right" aria-hidden="true" />
        </button>
      </div>

      {lightboxOpen && (
        <div
          id={`lightbox-${images[currentIndex].id}`}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.95)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 10000,
            cursor: 'zoom-out',
          }}
          onClick={closeLightbox}
        >
          <span
            onClick={closeLightbox}
            style={{
              position: 'absolute',
              top: '20px',
              right: '30px',
              color: '#fff',
              fontSize: '40px',
              fontWeight: 'bold',
              cursor: 'pointer',
              lineHeight: 1,
              zIndex: 10001,
            }}
          >
            &times;
          </span>

          <button
            onClick={(e) => {
              e.stopPropagation();
              prevImage();
            }}
            style={{
              position: 'absolute',
              left: '20px',
              top: '50%',
              transform: 'translateY(-50%)',
              background: 'rgba(0, 0, 0, 0.5)',
              border: 'none',
              borderRadius: '50%',
              width: '48px',
              height: '48px',
              cursor: 'pointer',
              color: 'white',
              fontSize: '24px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
            aria-label="Previous"
          >
            &lt;
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              nextImage();
            }}
            style={{
              position: 'absolute',
              right: '70px',
              top: '50%',
              transform: 'translateY(-50%)',
              background: 'rgba(0, 0, 0, 0.5)',
              border: 'none',
              borderRadius: '50%',
              width: '48px',
              height: '48px',
              cursor: 'pointer',
              color: 'white',
              fontSize: '24px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
            aria-label="Next"
          >
            &gt;
          </button>

          <img
            src={images[currentIndex].src}
            alt={images[currentIndex].alt}
            style={{
              maxWidth: '90%',
              maxHeight: '90%',
              display: 'block',
              margin: 'auto',
              borderRadius: '8px',
              boxShadow: '0 0 20px rgba(0, 0, 0, 0.5)',
            }}
          />

          <div
            style={{
              position: 'absolute',
              bottom: '20px',
              left: '50%',
              transform: 'translateX(-50%)',
              color: 'white',
              fontSize: '16px',
              background: 'rgba(0, 0, 0, 0.5)',
              padding: '8px 16px',
              borderRadius: '20px',
            }}
          >
            {currentIndex + 1} / {images.length}
          </div>
        </div>
      )}
    </>
  );
}
