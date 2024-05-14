const http = require("http");
const WebSocketServer = require("websocket").server;

let connection = null;

const httpServer = http.createServer((req, res) => {
  console.log("Request received");

  res.end("Request received by HTTP server");
});

const webSocket = new WebSocketServer({
  httpServer: httpServer,
});

webSocket.on("request", (req) => {
  connection = req.accept(null, req.origin);

  connection.on("close", () => console.log("Connection closed"));
  connection.on("message", (message) => {
    console.log(`${message.utf8Data}`);
  });

  sendEveryFiveSeconds();

  connection.sendUTF("Hello! Message from server");
});

httpServer.listen(3000, () => {
  console.log("Server listening on port 3000");
});

function sendEveryFiveSeconds() {
  setInterval(() => {
    connection.send(`Message from server : ${new Date()}`);
  }, 1000);
}
