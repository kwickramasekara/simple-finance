# Simple Finance

The home of your personal finance.

## Database sync

Use Appwrite CLI sync database documents. Requires `appwrite-cli` and `jq`.

1. `brew install jq`
2. `npm install appwrite-cli`
3. `npx appwrite client --selfSigned true --endpoint <url>/v1`
4. `npx appwrite login --email <email> --password <password>`
5. `npx appwrite init project`
6. `appwrite databases listDocuments --databaseId <dbID> --collectionId <collectionid> --json | jq '.documents[] | del(.["$id"], .["$createdAt"], .["$updatedAt"], .["$permissions"], .["$databaseId"], .["$collectionId"])' > data.json`
7. `npx appwrite databases createDocument --databaseId <dbId> --collectionId <collectionid> --documentId <uniqueId> --data <stringifiedJSONObject>`

## Gotchas

### Safari local development

Auth does not work on Safari with localhost due to how it handles cookies. Set an `/etc/hosts` entry to `127.0.0.1 sf-local.keithw.me` and then run `npm run dev-safari` task. This makes sure the appwrite server and the frontend are on the same domain (requirement for oAuth cookies with Safari). Safari also requires the app to be on HTTPS, so the `dev-safari` task uses a self-signed certificate.
