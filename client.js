const io = require("socket.io-client");
const socket = io("http://localhost:3000");
const group = process.env.GROUP || "B";

socket.on("connect", () => {
  console.log("connected");
  socket.emit("join-group", group, () => {
    console.log(`group ${group} joined`);
  });
});

socket.on("only-group-A", () => {
  console.log("should not happen");
});
