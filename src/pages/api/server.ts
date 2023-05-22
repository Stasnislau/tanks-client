const app = require("express")();
const server = require("http").createServer(app);
const PORT = process.env.PORT || 3001;
const io = require("socket.io")(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});
let i = 1;
setInterval(() => {
  io.emit("server-client", `message ${i++}`);
}, 500);
io.on("connection", (socket: any) => {
  // socket.emit("server-client", "hello client");
});

server.listen(PORT, () => {
  console.log(`listening on port: ${PORT}`);
});
