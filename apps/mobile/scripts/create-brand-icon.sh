#!/bin/bash

# Required dependencies: ImageMagick

# Get the absolute path to the mobile directory
MOBILE_DIR="$(cd "$(dirname "$0")/.." && pwd)"
cd "$MOBILE_DIR" || exit 1

# Export brand color for use in generate-icons.sh
export BRAND_COLOR="#2563EB"

# Source logo and output paths
SOURCE_LOGO="$MOBILE_DIR/assets/logo_with_title.png"
OUTPUT_ICON="$MOBILE_DIR/assets/icon.png"
OUTPUT_ADAPTIVE_ICON="$MOBILE_DIR/assets/adaptive-icon.png"
OUTPUT_1024="$MOBILE_DIR/assets/icon_1024x1024.png"

# Create directory if it doesn't exist
mkdir -p "$MOBILE_DIR/assets/ios/AppIcon.appiconset"

# Create the base icon with padding and background
magick "$SOURCE_LOGO" \
  -resize 80% \
  -background "$BRAND_COLOR" \
  -gravity center \
  -extent 1024x1024 \
  "$OUTPUT_1024"

# Copy for other icon files
cp "$OUTPUT_1024" "$OUTPUT_ICON"
cp "$OUTPUT_1024" "$OUTPUT_ADAPTIVE_ICON"

# Generate iOS icons
"$MOBILE_DIR/scripts/generate-icons.sh"

echo "App icons have been generated successfully!"
