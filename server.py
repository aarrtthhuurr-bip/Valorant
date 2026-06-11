import asyncio
import json
import uuid
from fastapi import FastAPI, WebSocket, WebSocketDisconnect
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()
app.add_middleware(CORSMiddleware, allow_origins=["*"])

class ConnectionManager:
    def __init__(self):
        self.active_connections: dict[str, WebSocket] = {}
        self.rooms: dict[str, list[str]] = {}

    async def connect(self, websocket: WebSocket, room: str, player_id: str):
        await websocket.accept()
        self.active_connections[player_id] = websocket
        if room not in self.rooms:
            self.rooms[room] = []
        self.rooms[room].append(player_id)
        # Notificar outros na sala
        await self.broadcast(room, {"type": "join", "playerId": player_id})

    def disconnect(self, player_id: str, room: str):
        if player_id in self.active_connections:
            del self.active_connections[player_id]
        if room in self.rooms and player_id in self.rooms[room]:
            self.rooms[room].remove(player_id)

    async def broadcast(self, room: str, message: dict):
        if room not in self.rooms:
            return
        for pid in self.rooms[room]:
            if pid in self.active_connections:
                await self.active_connections[pid].send_json(message)

manager = ConnectionManager()

@app.websocket("/ws/{room}/{player_id}")
async def websocket_endpoint(websocket: WebSocket, room: str, player_id: str):
    await manager.connect(websocket, room, player_id)
    try:
        while True:
            data = await websocket.receive_text()
            msg = json.loads(data)
            # Encaminhar mensagem para outros na sala
            await manager.broadcast(room, {
                "type": "game_update",
                "playerId": player_id,
                "data": msg
            })
    except WebSocketDisconnect:
        manager.disconnect(player_id, room)
        await manager.broadcast(room, {"type": "leave", "playerId": player_id})

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)