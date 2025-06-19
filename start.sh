#!/bin/bash

# Get the absolute path to the project directory
PROJECT_DIR="$(cd "$(dirname "$0")" && pwd)"

# Start backend
echo "Starting backend..."
cd "$PROJECT_DIR/backend"
uv run main.py &

# Start frontend
echo "Starting frontend..."
cd "$PROJECT_DIR/frontend"
pnpm install
pnpm dev
