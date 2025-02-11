# EAS Deployment Guide

## Configuration Changes Required

### 1. App Configuration (`app.json`)
```json
{
  "ios": {
    "bundleIdentifier": "com.mckn123.lifegotbetterhomecaremobile",
    "infoPlist": {
      "ITSAppUsesNonExemptEncryption": false
    }
  },
  "extra": {
    "eas": {
      "projectId": "2eb65121-5270-476c-ad96-853015b1ead8"
    }
  }
}
```

### 2. Development Client Setup
Install the required package:
```bash
npm install expo-dev-client@~3.3.12
```

## Deployment Steps

1. **Initial Setup**
   ```bash
   # Install dependencies
   npm install
   
   # Setup development client
   npm run mobile:setup-dev-client
   ```

2. **Build Development Client**
   ```bash
   # For iOS
   npm run mobile:build
   # or directly:
   cd apps/mobile && eas build --profile development --platform ios
   ```

3. **Running Development Build**
   ```bash
   # Start with development client
   npm run mobile:dev-client
   ```

## Important Notes

- The project uses two different configurations:
  - Regular Expo Go development (`npm run mobile:dev`)
  - Development client with custom native code (`npm run mobile:dev-client`)
  
- Scripts are provided to switch between these configurations:
  - `scripts/save-dev-client-config.sh`: Saves and removes dev client configuration
  - `scripts/restore-dev-client-config.sh`: Restores dev client configuration

## Configuration Files

### EAS Build Profile (`eas.json`)
```json
{
  "cli": {
    "version": ">= 7.3.0"
  },
  "build": {
    "development": {
      "developmentClient": true,
      "distribution": "internal"
    },
    "preview": {
      "distribution": "internal"
    },
    "production": {
      "autoIncrement": true
    }
  }
}
```

## Troubleshooting

1. If you see "No development build" error:
   - Run `npm run mobile:setup-dev-client`
   - Then rebuild using `npm run mobile:build`

2. If you need to switch back to Expo Go:
   - Run `npm run mobile:dev`
   - This automatically disables the development client
