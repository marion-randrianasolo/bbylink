from flask import Flask, render_template, request
from flask_socketio import SocketIO, emit
import time
import threading

app = Flask(__name__)
socketio = SocketIO(app)

score = {"left": 0, "right": 0}

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/reset", methods=["POST"])
def reset():
    score["left"] = 0
    score["right"] = 0
    socketio.emit("score_update", score)
    return "", 204

def simulate_goals():
    while True:
        time.sleep(4)
        score["left"] += 1
        socketio.emit("score_update", score)
        time.sleep(2)
        score["right"] += 1
        socketio.emit("score_update", score)

if __name__ == "__main__":
    threading.Thread(target=simulate_goals, daemon=True).start()
    socketio.run(app, host="0.0.0.0", port=5000)
