CREATE TABLE players (
    id SERIAL PRIMARY KEY,
    username VARCHAR(32) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE stats (
    player_id INT REFERENCES players(id) ON DELETE CASCADE,
    wins INT DEFAULT 0,
    kills INT DEFAULT 0,
    deaths INT DEFAULT 0,
    headshots INT DEFAULT 0,
    rounds_played INT DEFAULT 0,
    total_credits_earned INT DEFAULT 0,
    updated_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE match_history (
    id SERIAL PRIMARY KEY,
    player_id INT REFERENCES players(id),
    result VARCHAR(10), -- 'win' or 'loss'
    kills INT,
    deaths INT,
    timestamp TIMESTAMP DEFAULT NOW()
);

-- Índices para consultas rápidas
CREATE INDEX idx_stats_player ON stats(player_id);
CREATE INDEX idx_match_history_player ON match_history(player_id);