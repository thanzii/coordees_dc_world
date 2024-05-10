import { ApolloServer } from "@apollo/server";
import { userTypeDefs } from "./typeDefs/userTypedefs.js";
import { userResolvers } from "./resolvers/userResolvers.js";
import { db } from "./db/connection.js";
import { technicianResolvers } from "./resolvers/technicianResolvers.js";
import { technicianTypedefs } from "./typeDefs/technicianTypedefs.js";
import { expressMiddleware } from "@apollo/server/express4";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import express from "express";
import http from "http";
import cors from "cors";
import { Server } from "socket.io";
import graphqlUploadExpress from "graphql-upload/graphqlUploadExpress.mjs";
import { filterResolvers } from "./resolvers/filterResolvers.js";
import { filterTypedefs } from "./typeDefs/filterTypedefs.js";

const app = express();

const httpServer = http.createServer(app);

const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE"],
    credentials: true,
  },
});

app.set("io", io);

const server = new ApolloServer({
  typeDefs: [userTypeDefs, technicianTypedefs, filterTypedefs],
  resolvers: [userResolvers, technicianResolvers, filterResolvers],
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  introspection: true,
});

await server.start();

app.use(
  "/",
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE"],
    credentials: true,
  }),
  express.json({ limit: "1000mb" }),
  express.urlencoded({ extended: true, limit: "1000mb" }),
  graphqlUploadExpress({ maxFileSize: 1000, maxFiles: 10 }),
  expressMiddleware(server, {
    context: async ({ req }) => {
      const [rows] = await db.query("SELECT * FROM users");
      return { rows, io: req.app.get("io"), db };
    },
  })
);

await new Promise((resolve) => httpServer.listen({ port: 4000 }, resolve));
console.log(`🚀 Server ready at http://localhost:4000/`);
