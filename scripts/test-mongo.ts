import { MongoMemoryServer } from "mongodb-memory-server";

async function main() {
  console.log("Starting MongoMemoryServer...");
  const mongod = await MongoMemoryServer.create({
    instance: {
      port: 27017,
      dbName: "aurelia_school",
    },
  });
  const uri = mongod.getUri();
  console.log("MongoMemoryServer started at:", uri);
  // Keep alive
  setInterval(() => {}, 1000);
}

main().catch((err) => {
  console.error("Failed to start MongoMemoryServer:", err);
  process.exit(1);
});
