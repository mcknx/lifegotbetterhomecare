#!/bin/bash

# Create backup directory if it doesn't exist
mkdir -p .dev-client-backup

# Save current dev client related files
cp app.json .dev-client-backup/app.json 2>/dev/null || true
cp eas.json .dev-client-backup/eas.json 2>/dev/null || true

# Reset to basic configuration
cp .dev-client-backup/basic-app.json app.json 2>/dev/null || true
rm eas.json 2>/dev/null || true

# Remove dev client from package.json
npm uninstall expo-dev-client
