const PORT = 3000;
const url = "ws://localhost:" + PORT;
const wsServer = new WebSocket(url);
const gameTiles = document.getElementsByClassName("game-tile");

console.log(gameTiles)

function sendInput() {
  const data = {
    test: "test"
  };

  wsServer.send(JSON.stringify(data));
}

gameTiles.addEventListener("click", (event) => {
  sendInput();
});

gameTiles.addEventListener

wsServer.onmessage = (wsRequest) => {
  console.log(wsRequest);
  const { data } = wsRequest;
  console.log(data);
  displayNewMessage(JSON.parse(data));
};

