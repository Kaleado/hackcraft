import express from "express";
import mockLogin from "mockLogin";

// A constant port number to serve our website on
const PORT = 8080;
// Create a new server with express
const App = express();

// Set up a new route, on '/', i.e. http://localhost:8080/
App.get("/", (request, response) => {
  // Send back a one line response
  response.send("Hello world, it's me!");
});

App.post("/mocklogin", mockLogin);


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