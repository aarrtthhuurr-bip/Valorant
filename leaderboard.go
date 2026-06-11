package main

import (
    "encoding/json"
    "fmt"
    "log"
    "net/http"
    "sort"
    "sync"
    "time"
)

type Entry struct {
    Name      string `json:"name"`
    Score     int    `json:"score"`
    Timestamp int64  `json:"ts"`
}

var (
    leaderboard []Entry
    mu          sync.RWMutex
    maxSize     = 100
)

func addScoreHandler(w http.ResponseWriter, r *http.Request) {
    name := r.URL.Query().Get("name")
    scoreStr := r.URL.Query().Get("score")
    if name == "" || scoreStr == "" {
        http.Error(w, "missing params", 400)
        return
    }
    var score int
    fmt.Sscanf(scoreStr, "%d", &score)

    mu.Lock()
    defer mu.Unlock()
    leaderboard = append(leaderboard, Entry{Name: name, Score: score, Timestamp: time.Now().Unix()})
    sort.Slice(leaderboard, func(i, j int) bool {
        if leaderboard[i].Score == leaderboard[j].Score {
            return leaderboard[i].Timestamp < leaderboard[j].Timestamp
        }
        return leaderboard[i].Score > leaderboard[j].Score
    })
    if len(leaderboard) > maxSize {
        leaderboard = leaderboard[:maxSize]
    }
    w.WriteHeader(http.StatusOK)
}

func getLeaderboardHandler(w http.ResponseWriter, r *http.Request) {
    mu.RLock()
    defer mu.RUnlock()
    w.Header().Set("Content-Type", "application/json")
    json.NewEncoder(w).Encode(leaderboard)
}

func main() {
    http.HandleFunc("/add", addScoreHandler)
    http.HandleFunc("/top", getLeaderboardHandler)
    log.Println("Leaderboard server on :8080")
    log.Fatal(http.ListenAndServe(":8080", nil))
}