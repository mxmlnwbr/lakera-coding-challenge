# Lakera AI Content Classification

This project provides a web application for AI-powered content classification. It consists of a Python backend using FastAPI and a Next.js frontend. The system analyzes text input and classifies it according to various content moderation categories.

## Project Structure

The project is organized into two main components:

### Backend

- **Technology**: Python with FastAPI
- **Model**: KoalaAI/Text-Moderation from Hugging Face
- **Features**:
  - CORS configured for frontend integration
  - Returns classification results with labels and confidence scores

### Frontend

- **Technology**: Next.js with React
- **Features**:
  - Modern UI with responsive design
  - Real-time text classification
  - Displays classification results with category names and confidence scores

## Getting Started

### Prerequisites

- Python 3.8+ with [uv](https://github.com/astral-sh/uv) package manager
- Node.js with [pnpm](https://pnpm.io/) package manager

### Quick Start

The easiest way to run the application is using the provided startup script:

```bash
# Make the script executable (if needed)
chmod +x start.sh

# Run the application
./start.sh
```

This script will:
1. Start the backend server at http://127.0.0.1:8000
2. Install frontend dependencies
3. Start the frontend development server at http://localhost:3000

### Manual Setup

If you prefer to run the components separately:

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

## Usage

1. Open your browser and navigate to http://localhost:3000
2. Enter text in the input field
3. Click "Classify Content"
4. View the classification results showing categories and confidence scores

## Classification Categories

The system classifies content into the following categories:

| Label | Category | Description |
|-------|----------|-------------|
| S     | sexual   | Content meant to arouse sexual excitement |
| H     | hate     | Content that expresses or promotes hate based on protected attributes |
| V     | violence | Content that promotes or glorifies violence |
| HR    | harassment | Content that may be used to torment individuals |
| SH    | self-harm | Content that promotes acts of self-harm |
| S3    | sexual/minors | Sexual content involving minors |
| H2    | hate/threatening | Hateful content with threats of violence |
| V2    | violence/graphic | Violent content with graphic detail |
| OK    | OK | Not offensive content |

## License

This project is part of the Lakera coding challenge.
