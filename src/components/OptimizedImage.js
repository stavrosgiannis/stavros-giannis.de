import React, { useState, useCallback } from "react";
import PropTypes from "prop-types";

/**
 * OptimizedImage Component
 * Provides responsive images with fallbacks and lazy loading
 * Supports WebP with PNG fallback for better performance
 */
function OptimizedImage({
  src,
  alt,
  className = "",
  srcSet,
  sizes,
  loading = "lazy",
  onLoad,
  onError,
  width,
  height,
  style,
}) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  const handleLoad = useCallback(() => {
    setIsLoaded(true);
    onLoad?.();
  }, [onLoad]);

  const handleError = useCallback(() => {
    setHasError(true);
    onError?.();
  }, [onError]);

  // Generate WebP src with fallback
  const getImageSrc = (imageSrc) => {
    if (!imageSrc) return "";
    return imageSrc.replace(/\.(png|jpg|jpeg)$/i, ".webp");
  };

  return (
    <picture>
      {/* WebP format for modern browsers */}
      <source srcSet={srcSet ? srcSet.webp : getImageSrc(src)} type="image/webp" sizes={sizes} />
      
      {/* Fallback to original format */}
      <img
        src={src}
        alt={alt}
        className={`${className} ${isLoaded ? "loaded" : "loading"}`}
        loading={loading}
        onLoad={handleLoad}
        onError={handleError}
        width={width}
        height={height}
        style={{
          opacity: isLoaded ? 1 : 0.7,
          transition: "opacity 0.3s ease-in-out",
          ...style,
        }}
      />
    </picture>
  );
}

OptimizedImage.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  className: PropTypes.string,
  srcSet: PropTypes.shape({
    webp: PropTypes.string,
  }),
  sizes: PropTypes.string,
  loading: PropTypes.oneOf(["lazy", "eager"]),
  onLoad: PropTypes.func,
  onError: PropTypes.func,
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  style: PropTypes.object,
};

export default OptimizedImage;
