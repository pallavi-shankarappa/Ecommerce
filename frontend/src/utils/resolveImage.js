import { assets } from "../assets/assets";

/**
 * Resolves product image URL.
 * Supports:
 * 1. Cloudinary URLs (starting with http)
 * 2. Local assets (filenames matching keys in assets.js or served from backend /uploads)
 */
export const resolveProductImage = (imageName, backendUrl) => {
  if (!imageName) return assets.placeholder || "";

  // If it's a full URL (Cloudinary), return as is
  if (imageName.startsWith("http")) {
    return imageName;
  }

  // If it's a local filename, check if it exists in imported assets
  const localAsset = assets[imageName.split(".")[0]]; // matches p_img1 from p_img1.png
  if (localAsset) {
    return localAsset;
  }

  // Fallback to backend uploads folder
  return `${backendUrl}/uploads/${imageName}`;
};
