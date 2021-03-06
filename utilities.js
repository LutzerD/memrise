import { Dimensions, Platform, PixelRatio } from "react-native";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

const scale = SCREEN_WIDTH / 300;
export function normalizeFont(size) {
  return Math.round(PixelRatio.roundToNearestPixel(size * scale)) - 2;
}
