const PORT = 3000;
const url = "ws://localhost:" + PORT;
const wsServer = new WebSocket(url);
const displayChatsDiv = document.getElementsByClassName("game-tile");

const newMessageInput = document.getElementById("message");
const authorInput = document.getElementById("author");
function sendMessage() {
  const data = {
    
  };

  wsServer.send(JSON.stringify(data));
}
const sendMessageButton = document.getElementById("submit");
sendMessageButton.addEventListener("click", (event) => {
  event.preventDefault();
  sendMessage();
});

wsServer.onmessage = (wsRequest) => {
  console.log(wsRequest);
  const { data } = wsRequest;
  // console.log(data);
  displayNewMessage(JSON.parse(data));
};

function displayNewMessage(data) {
  let newP = document.createElement("p");
  newP.innerText = `Message from: ${data.author}\n${data.newMessage}`;
  displayChatsDiv.appendChild(newP);
}
