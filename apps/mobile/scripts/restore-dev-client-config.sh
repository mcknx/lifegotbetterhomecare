#!/bin/bash

# Check if backup exists
if [ ! -d ".dev-client-backup" ]; then
    echo "No dev client backup found"
    exit 1
fi

# Restore dev client related files
cp .dev-client-backup/app.json app.json 2>/dev/null || true
cp .dev-client-backup/eas.json eas.json 2>/dev/null || true

# Install dev client
npm install expo-dev-client
