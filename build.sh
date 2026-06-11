#!/bin/bash
echo "🚀 Building TACTIC FPS Multi-language"

# Compilar TypeScript
npx tsc game.ts --outFile dist/game.js --target ES2020

# Compilar WASM C++
emcc collision.cpp -o dist/collision.js -s WASM=1 -s EXPORTED_FUNCTIONS='["_checkCollisionWASM"]' -s EXTRA_EXPORTED_RUNTIME_METHODS='["ccall"]'

# Compilar Rust WASM
cd rust_pathfinding && wasm-pack build --target web --out-dir ../dist/pkg && cd ..

# Copiar HTML/CSS
cp index.html style.css dist/

# Minificar JS final
npx uglifyjs dist/game.js -o dist/game.min.js

echo "✅ Build concluído em ./dist"