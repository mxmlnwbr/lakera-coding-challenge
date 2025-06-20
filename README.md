# Lakera AI Content Classification

A web application for AI-powered content classification using FastAPI (backend) and Next.js (frontend). The system analyzes text input and classifies it according to various content moderation categories.

## Quick Start

### Option 1: Using the start.sh script (Recommended)

```bash
# Make the script executable (if needed)
chmod +x start.sh

# Run the application
./start.sh
```

This script will:
- Start the backend server at http://127.0.0.1:8000
- Install frontend dependencies
- Start the frontend development server

**Access the application at: http://localhost:3000**

### Option 2: Manual Setup

#### Backend
```bash
cd backend
uv sync  # Install dependencies from lock file
uv run main.py  # Start the backend server
```

#### Frontend
```bash
cd frontend
pnpm install  # Install dependencies
pnpm dev  # Start the development server
```

## Features

- Text classification using KoalaAI/Text-Moderation model
- Modern, responsive UI
- Real-time content analysis
- API latency testing functionality

## Usage

1. Navigate to http://localhost:3000
2. Enter text in the input field
3. Click "Classify Content" to analyze the text
4. View the classification results with confidence scores
5. Use "Test API Latency" to evaluate backend performance

## Classification Categories

| Label | Category | Description |
|-------|----------|--------------|
| S     | sexual   | Content meant to arouse sexual excitement |
| H     | hate     | Content that expresses or promotes hate based on protected attributes |
| V     | violence | Content that promotes or glorifies violence |
| HR    | harassment | Content that may be used to torment individuals |
| SH    | self-harm | Content that promotes acts of self-harm |
| S3    | sexual/minors | Sexual content involving minors |
| H2    | hate/threatening | Hateful content with threats of violence |
| V2    | violence/graphic | Violent content with graphic detail |
| OK    | OK | Not offensive content |

## Prerequisites

- Python 3.8+ with [uv](https://github.com/astral-sh/uv) package manager
- Node.js with [pnpm](https://pnpm.io/) package manager

## General Information

This project is part of the [Lakera Coding Challenge](https://you.ashbyhq.com/lakera.ai/assignment/c36545cb-e4a5-47c9-a7bf-282319b2892e).
