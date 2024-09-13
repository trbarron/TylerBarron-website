declare module 'react-image-gallery' {
    import { ComponentType } from 'react';
  
    export interface ReactImageGalleryItem {
      original: string;
      thumbnail?: string;
      originalClass?: string;
      thumbnailClass?: string;
      renderItem?: (item: ReactImageGalleryItem) => React.ReactNode;
      renderThumbInner?: (item: ReactImageGalleryItem) => React.ReactNode;
      originalAlt?: string;
      thumbnailAlt?: string;
      originalTitle?: string;
      thumbnailTitle?: string;
      thumbnailLabel?: string;
      description?: string;
      imageSet?: ImageSet[];
      srcSet?: string;
      sizes?: string;
    }
  
    export interface ImageSet {
      srcSet: string;
      media: string;
    }
  
    export interface ReactImageGalleryProps {
      items: ReactImageGalleryItem[];
      showNav?: boolean;
      autoPlay?: boolean;
      lazyLoad?: boolean;
      infinite?: boolean;
      showIndex?: boolean;
      showBullets?: boolean;
      showThumbnails?: boolean;
      showPlayButton?: boolean;
      showFullscreenButton?: boolean;
      disableThumbnailScroll?: boolean;
      disableKeyDown?: boolean;
      disableSwipe?: boolean;
      useBrowserFullscreen?: boolean;
      preventDefaultTouchmoveEvent?: boolean;
      onSlide?: (currentIndex: number) => void;
      onScreenChange?: (fullScreenElement: Element) => void;
      onPause?: (currentIndex: number) => void;
      onPlay?: (currentIndex: number) => void;
      onClick?: (event: React.MouseEvent) => void;
      onImageLoad?: (event: React.SyntheticEvent<HTMLImageElement>) => void;
      onImageError?: (event: React.SyntheticEvent<HTMLImageElement>) => void;
      onTouchMove?: (event: React.TouchEvent) => void;
      onTouchEnd?: (event: React.TouchEvent) => void;
      onTouchStart?: (event: React.TouchEvent) => void;
      onMouseOver?: (event: React.MouseEvent) => void;
      onMouseLeave?: (event: React.MouseEvent) => void;
      onThumbnailError?: (event: React.SyntheticEvent<HTMLImageElement>) => void;
      onThumbnailClick?: (event: React.MouseEvent, index: number) => void;
      renderCustomControls?: () => React.ReactNode;
      renderLeftNav?: (onClick: () => void, disabled: boolean) => React.ReactNode;
      renderRightNav?: (onClick: () => void, disabled: boolean) => React.ReactNode;
      renderPlayPauseButton?: (onClick: () => void, isPlaying: boolean) => React.ReactNode;
      renderFullscreenButton?: (onClick: () => void, isFullscreen: boolean) => React.ReactNode;
      renderItem?: (item: ReactImageGalleryItem) => React.ReactNode;
      renderThumbInner?: (item: ReactImageGalleryItem) => React.ReactNode;
      stopPropagation?: boolean;
      additionalClass?: string;
      useTranslate3D?: boolean;
      isRTL?: boolean;
    }
  
    const ReactImageGallery: ComponentType<ReactImageGalleryProps>;
  
    export default ReactImageGallery;
  }