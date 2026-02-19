import { LogoImage } from "layouts/logo/logo.style";

// Shared types and utilities for product variants
export interface Variant {
  id: string | number;
  title: string;
  price?: number | string;
  sale_price?: number | string;
  availableQty?: number;
  image?: string;
  gallery?: any[];
  color_code?: string;
  type?: 'color' | 'size' | 'text';
  [key: string]: any;
}

export interface VariantGroup {
  name: string;
  displayName: string;
  variants: Variant[];
  type?: 'color' | 'text' | 'image';
}

export const getVariantTypeFromTitle = (title: string): 'color' | 'size' => {
  const lowerTitle = title.toLowerCase().trim();
  if (lowerTitle.startsWith('size:')) return 'size';
  if (lowerTitle.startsWith('color:')) return 'color';
  return 'color'; // default to color
};

export const cleanVariantTitle = (title: string): string => {
  return title.replace(/^(size|color):\s*/i, '').trim();
};

export const getColorHexCode = (colorName: string): string => {
  const colorMap: Record<string, string> = {
    red: '#ff0000',
    blue: '#0000ff',
    green: '#008000',
    yellow: '#ffff00',
    black: '#000000',
    white: '#ffffff',
    purple: '#800080',
    pink: '#ffc0cb',
    orange: '#ffa500',
    gray: '#808080',
    brown: '#6d3f03ff',
  };
  return colorMap[colorName.toLowerCase()] || colorName || '#cccccc';
};

export const getImageUrl = (imgUrl: string | undefined) => {
  if (!imgUrl) return null;
  let cleanedUrl = imgUrl.replace(/\\/g, '');
  if (cleanedUrl.includes('storage/app/public')) {
    cleanedUrl = cleanedUrl.replace('storage/app/public', 'storage');
  }
  return {
    src: cleanedUrl,
  };
};

export const groupVariants = (variants: Variant[]): VariantGroup[] => {
  const groups: VariantGroup[] = [];
  const variantsByType: Record<string, Variant[]> = {
    color: [],
    size: []
  };

  variants?.forEach(variant => {
    const type = getVariantTypeFromTitle(variant.title);
    variantsByType[type].push({
      ...variant,
      title: cleanVariantTitle(variant.title),
      type
    });
  });

  if (variantsByType.color.length > 0) {
    groups.push({
      name: 'color',
      displayName: 'Color',
      variants: variantsByType.color,
      type: 'color'
    });
  }

  if (variantsByType.size.length > 0) {
    groups.push({
      name: 'size',
      displayName: 'Size',
      variants: variantsByType.size,
      type: 'text'
    });
  }

  return groups;
};

export const getEffectivePrice = (selectedVariants: Record<string, Variant>, product: any): number => {
  for (const groupName in selectedVariants) {
    const variant = selectedVariants[groupName];
    if (variant?.sale_price !== undefined) return parseFloat(variant.sale_price.toString());
    if (variant?.price !== undefined) return parseFloat(variant.price.toString());
  }
  return parseFloat(product.sale_price?.toString() || product.price?.toString() || '0');
};

export const getEffectiveOriginalPrice = (selectedVariants: Record<string, Variant>, product: any): number => {
  for (const groupName in selectedVariants) {
    const variant = selectedVariants[groupName];
    if (variant?.price !== undefined) return parseFloat(variant.price.toString());
  }
  return parseFloat(product.price?.toString() || '0');
};

export const getAvailableQty = (selectedVariants: Record<string, Variant>, product: any): number => {
  for (const groupName in selectedVariants) {
    const variant = selectedVariants[groupName];
    if (variant?.availableQty !== undefined) return variant.availableQty;
  }
  return product.availableQty || 0;
};

export const getCartData = (product: any, selectedVariants: Record<string, Variant>) => {
  const variantIds = Object.values(selectedVariants)
    .map(v => v.id)
    .sort()
    .join('-');
  
  const displayImage = getDisplayImage(product, selectedVariants);
  
  return {
    ...product,
    id: `${product.id}-${variantIds}`,
    variants: selectedVariants,
    price: getEffectiveOriginalPrice(selectedVariants, product),
    sale_price: getEffectivePrice(selectedVariants, product),
    availableQty: getAvailableQty(selectedVariants, product),
    image: displayImage.src,
    gallery: product.gallery?.length > 0 ? product.gallery : [{
      url: displayImage.src,
      id: 1,
      name: 'default',
      size: 56430
    }],
    variantInfo: Object.values(selectedVariants)
      .map(v => v.title)
      .join(' / ')
  };
};

export const getDisplayImage = (product: any, selectedVariants: Record<string, Variant>) => {
  for (const groupName in selectedVariants) {
    const variant = selectedVariants[groupName];
    if (variant?.image) {
      const variantImg = getImageUrl(variant.image);
      if (variantImg) return variantImg;
    }
    if (variant?.gallery?.[0]?.url) {
      const galleryImg = getImageUrl(variant.gallery[0].url);
      if (galleryImg) return galleryImg;
    }
  }

  if (product.image) {
    const mainImg = getImageUrl(product.image);
    if (mainImg) return mainImg;
  }

  return {
    src: LogoImage,
  };
};