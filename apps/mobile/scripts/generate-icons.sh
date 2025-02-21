#!/bin/bash

# Get the absolute path to the mobile directory
MOBILE_DIR="$(cd "$(dirname "$0")/.." && pwd)"
cd "$MOBILE_DIR" || exit 1

# Source logo path
SOURCE_LOGO="$MOBILE_DIR/assets/icon_1024x1024.png"

# Create assets directory if it doesn't exist
mkdir -p "$MOBILE_DIR/assets/ios/AppIcon.appiconset"

# iOS icon sizes
declare -a IOS_SIZES=(
  "20x20"
  "29x29"
  "40x40"
  "58x58"
  "60x60"
  "76x76"
  "80x80"
  "87x87"
  "120x120"
  "152x152"
  "167x167"
  "180x180"
  "1024x1024"
)

# Generate iOS icons
for size in "${IOS_SIZES[@]}"
do
  magick "$SOURCE_LOGO" -resize "$size^" -gravity center -extent "$size" -background "$BRAND_COLOR" -alpha remove -alpha off "$MOBILE_DIR/assets/ios/AppIcon.appiconset/icon_${size}.png"
done

# Create Contents.json for iOS
cat > "$MOBILE_DIR/assets/ios/AppIcon.appiconset/Contents.json" << 'EOL'
{
  "images": [
    {
      "filename": "icon_40x40.png",
      "idiom": "iphone",
      "scale": "2x",
      "size": "20x20"
    },
    {
      "filename": "icon_60x60.png",
      "idiom": "iphone",
      "scale": "3x",
      "size": "20x20"
    },
    {
      "filename": "icon_58x58.png",
      "idiom": "iphone",
      "scale": "2x",
      "size": "29x29"
    },
    {
      "filename": "icon_87x87.png",
      "idiom": "iphone",
      "scale": "3x",
      "size": "29x29"
    },
    {
      "filename": "icon_80x80.png",
      "idiom": "iphone",
      "scale": "2x",
      "size": "40x40"
    },
    {
      "filename": "icon_120x120.png",
      "idiom": "iphone",
      "scale": "3x",
      "size": "40x40"
    },
    {
      "filename": "icon_120x120.png",
      "idiom": "iphone",
      "scale": "2x",
      "size": "60x60"
    },
    {
      "filename": "icon_180x180.png",
      "idiom": "iphone",
      "scale": "3x",
      "size": "60x60"
    },
    {
      "filename": "icon_20x20.png",
      "idiom": "ipad",
      "scale": "1x",
      "size": "20x20"
    },
    {
      "filename": "icon_40x40.png",
      "idiom": "ipad",
      "scale": "2x",
      "size": "20x20"
    },
    {
      "filename": "icon_29x29.png",
      "idiom": "ipad",
      "scale": "1x",
      "size": "29x29"
    },
    {
      "filename": "icon_58x58.png",
      "idiom": "ipad",
      "scale": "2x",
      "size": "29x29"
    },
    {
      "filename": "icon_40x40.png",
      "idiom": "ipad",
      "scale": "1x",
      "size": "40x40"
    },
    {
      "filename": "icon_80x80.png",
      "idiom": "ipad",
      "scale": "2x",
      "size": "40x40"
    },
    {
      "filename": "icon_76x76.png",
      "idiom": "ipad",
      "scale": "1x",
      "size": "76x76"
    },
    {
      "filename": "icon_152x152.png",
      "idiom": "ipad",
      "scale": "2x",
      "size": "76x76"
    },
    {
      "filename": "icon_167x167.png",
      "idiom": "ipad",
      "scale": "2x",
      "size": "83.5x83.5"
    },
    {
      "filename": "icon_1024x1024.png",
      "idiom": "ios-marketing",
      "scale": "1x",
      "size": "1024x1024"
    }
  ],
  "info": {
    "author": "xcode",
    "version": 1
  }
}
EOL

# Also generate the main app icon and adaptive icon
magick "$SOURCE_LOGO" -resize "1024x1024^" -gravity center -extent 1024x1024 -background white -alpha remove -alpha off "../assets/icon.png"
magick "$SOURCE_LOGO" -resize "1024x1024^" -gravity center -extent 1024x1024 -background white -alpha remove -alpha off "../assets/adaptive-icon.png"
magick "$SOURCE_LOGO" -resize "1242x2436" -background white -alpha remove -alpha off "../assets/splash.png"

echo "App icons generated successfully!"
