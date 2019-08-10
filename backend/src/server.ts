import express from "express";
import { signup, login } from "./user";
import { startMatchmaking, getMatchStatus } from "./matchmaking";
import Redis from "redis";
import BodyParser from "body-parser";
import Cors from "cors";
// import Bluebird from "bluebird";

// let dbClient = Bluebird.promisifyAll(Redis.createClient());

let dbClient: Redis.RedisClient = Redis.createClient();

// A constant port number to serve our website on
const PORT = 8080;
// Create a new server with express
const App = express();
App.use(Cors());
App.use(BodyParser.urlencoded({
  extended: false
}));
App.use(BodyParser.json());

// Set up a new route, on '/', i.e. http://localhost:8080/
App.get("/", (request, response) => {
  // Send back a one line response
  response.send("Hello world, it's me!");
});

App.post("/user/login", async (req, res) => {
  res.send(await login(req, res, dbClient));
});

App.post("/user/signup", async (req,res) => {
  res.send(await signup(req, res, dbClient));
});

App.post("/matchmaking/start", async (req,res) => {
  res.send(await startMatchmaking(req, res, dbClient));
});

App.post("/matchmaking/status", async (req,res) => {
  res.send(await getMatchStatus(req, res, dbClient));
});

// This part should go last!
// Now that we've registered all the routes for our
// Sever, we start it listening on the port below.
App.listen(PORT, err => {
  // Check if the server failed to start
  if (err) {
    return console.error(err);
  }

  // Startup message
  console.log(`Server listening on http://localhost:${PORT}`)
});
