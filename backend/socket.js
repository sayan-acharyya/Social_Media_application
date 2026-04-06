import http from "http";
import express from "express";
import { Server } from "socket.io";

const app = express();

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: process.env.FRONTEND_URL,
        credentials: true,
        methods: ["GET", "POST", "PUT", "DELETE", "PATCH"]
    }
});
const userSocketMap = {}; // userId: [socketId1, socketId2]

io.on("connection", (socket) => {
    const userId = socket.handshake.query.userId;

    if (userId) {
        if (!userSocketMap[userId]) {
            userSocketMap[userId] = [];
        }
        userSocketMap[userId].push(socket.id);
    }

    io.emit('getOnlineUsers', Object.keys(userSocketMap));

    socket.on('disconnect', () => {
        if (userId) {
            userSocketMap[userId] = userSocketMap[userId].filter(id => id !== socket.id);

            if (userSocketMap[userId].length === 0) {
                delete userSocketMap[userId];
            }
        }

        io.emit('getOnlineUsers', Object.keys(userSocketMap));
    });
});


export { app, io, server }