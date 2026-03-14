import { Dimensions, PixelRatio } from 'react-native';

const { width, height } = Dimensions.get('window');

/**
 * Width Percentage
 * wp(50) → 50% of screen width
 */
export const wp = (percentage) => {
    const value = (percentage * width) / 100;
    return PixelRatio.roundToNearestPixel(value);
};

/**
 * Height Percentage
 * hp(50) → 50% of screen height
 */
export const hp = (percentage) => {
    const value = (percentage * height) / 100;
    return PixelRatio.roundToNearestPixel(value);
};

/**
 * Responsive Font Size
 */
export const rf = (size) => {
    const scale = width / 375; // base iPhone width
    return PixelRatio.roundToNearestPixel(size * scale);
};
