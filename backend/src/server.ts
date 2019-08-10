import express from "express";
import { signup, login } from "./user";
import { startMatchmaking, getMatchStatus } from "./matchmaking";
import { getChallenge } from "./challenge";
import { makeSubmission } from "./submission";
import Redis from "redis";
import BodyParser from "body-parser";
import Cors from "cors";
import { PATH_MATCHMAKING_START, PATH_MATCH_STATUS, PATH_GET_CHALLENGE, PATH_MAKE_SUBMISSION, PATH_LOGIN, PATH_SIGNUP } from "../../shared";

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

App.post(PATH_LOGIN, async (req, res) => {
  res.send(await login(req, res, dbClient));
});

App.post(PATH_SIGNUP, async (req,res) => {
  res.send(await signup(req, res, dbClient));
});

App.post(PATH_MATCHMAKING_START, async (req,res) => {
  res.send(await startMatchmaking(req, res, dbClient));
});

App.post(PATH_MATCH_STATUS, async (req,res) => {
  res.send(await getMatchStatus(req, res, dbClient));
});

App.post(PATH_GET_CHALLENGE, async (req,res) => {
  res.send(await getChallenge(req, res, dbClient));
});

App.post(PATH_MAKE_SUBMISSION, async (req,res) => {
  res.send(await makeSubmission(req, res, dbClient));
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
