import React, { useState, useCallback } from "react";
import PropTypes from "prop-types";

/**
 * Generate a WebP src from the given image source.
 * Returns the original src unchanged for SVGs and any format that is not
 * png/jpg/jpeg, so that no incorrect MIME type is emitted for those files.
 * @param {string} imageSrc - Original image source path
 * @returns {string} WebP source path, or original src when conversion is not applicable
 */
const getImageSrc = (imageSrc) => {
  if (!imageSrc) return "";
  if (!/\.(png|jpg|jpeg)$/i.test(imageSrc)) return imageSrc;
  return imageSrc.replace(/\.(png|jpg|jpeg)$/i, ".webp");
};

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

  const handleLoad = useCallback(() => {
    setIsLoaded(true);
    onLoad?.();
  }, [onLoad]);

  const handleError = useCallback(() => {
    onError?.();
  }, [onError]);

  const webpSrc = srcSet ? srcSet.webp : getImageSrc(src);
  const hasWebp = webpSrc !== src;

  return (
    <picture>
      {/* WebP format for modern browsers — only when a WebP alternative exists */}
      {hasWebp && (
        <source srcSet={webpSrc} type="image/webp" sizes={sizes} />
      )}

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
