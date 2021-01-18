const httpServer = require("http").createServer();
const io = require("socket.io")(httpServer);
const debug = require("debug")("artillery-test");

io.on("connection", (socket) => {
  debug(`connect ${socket.id}`);

  socket.on("join-group", (group, cb) => {
    debug(`join-group ${group}`);
    socket.join(`GROUP_${group}_1`);
    socket.join(`GROUP_${group}_2`);
    socket.join(`GROUP_${group}_3`);
    cb && cb();
  });

  socket.on("broadcast", () => {
    debug("broadcast");
    io.to("GROUP_A_1").to("GROUP_A_2").to("GROUP_A_3").emit("only-group-A", "hello");
  })

  socket.on("disconnect", (data) => {
    debug(`disconnect ${socket.id}`);
  });
});

httpServer.listen(3000);
