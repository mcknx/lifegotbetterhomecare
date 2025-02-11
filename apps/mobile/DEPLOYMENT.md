# restore eas.json

cp .dev-client-backup/app.json . && cp .dev-client-backup/eas.json .

# run build

eas build --platform ios --profile production

# submit to ios

eas submit -p ios