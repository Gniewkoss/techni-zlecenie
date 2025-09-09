import { MongoClient, ServerApiVersion } from "mongodb";

const uri =
  "mongodb+srv://gniewko_db_techni:techniZleceni3%3F%21@techni-zlecenie.q9ropdc.mongodb.net/?retryWrites=true&w=majority&appName=techni-zlecenie";
let client;
let clientPromise;

if (!global._mongoClientPromise) {
  client = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    },
  });
  global._mongoClientPromise = client.connect();
}
clientPromise = global._mongoClientPromise;

export default clientPromise;
