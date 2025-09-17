const express = require("express");
const { createServer } = require("http");
const { Server } = require("socket.io");

const app = express();
const httpServer = createServer(app);

const corsOptions = {
  origin: "http://localhost:9999",
  methods: ["GET", "POST"],
  credentials: true,
};

const io = new Server(httpServer, {
  cors: corsOptions,
});

// Basic express route for health check
app.get("/health", (req, res) => {
  res.json({
    status: "OK",
    message: "Socket.IO CORS Demo Server",
    timestamp: new Date().toISOString(),
  });
});

// Socket.IO connection handling
io.on(
  "connection",
  (socket) => {
    console.log("🔌 Client connected:", socket.id);
    console.log("Client handshake origin:", socket.handshake.headers.origin);

    // Send welcome message
    socket.emit("welcome", {
      message: "Welcome to Socket.IO CORS Demo!",
      socketId: socket.id,
      timestamp: new Date().toISOString(),
    });

    // Handle custom events
    socket.on("ping", (data) => {
      console.log("📨 Received ping from client:", data);
      socket.emit("pong", {
        message: "Pong from server!",
        originalData: data,
        timestamp: new Date().toISOString(),
      });
    });

    socket.on("disconnect", (reason) => {
      console.log("🔌 Client disconnected:", socket.id, "Reason:", reason);
    });
  },
  {
    cors: corsOptions,
  }
);

const PORT = 8000;
httpServer.listen(PORT, () => {
  console.log("🚀 Socket.IO CORS Demo Server running on port", PORT);
  console.log(
    "🏥 Health check available at: http://localhost:" + PORT + "/health"
  );
});
