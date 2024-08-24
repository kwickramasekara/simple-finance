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
