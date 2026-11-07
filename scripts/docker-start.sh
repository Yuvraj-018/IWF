#!/bin/bash
# ==============================================================================
# ISLAH Welfare Foundation - Docker Production Startup Script (Bash)
# ==============================================================================

set -e

echo "🚀 Starting ISLAH Welfare Foundation Multi-Container Stack..."

# Check if Docker daemon is running
if ! docker info > /dev/null 2>&1; then
    echo "❌ Docker is not running. Please start the Docker daemon first."
    exit 1
fi

echo "📦 Building and launching containers (MongoDB, Backend, CMS, Client)..."
docker compose up --build -d

echo ""
echo "✨ All ISLAH containers are up and running!"
echo "--------------------------------------------------------"
echo "🌐 Public Client Web App:   http://localhost:3000"
echo "🛠️ Admin & Media CMS:       http://localhost:3001"
echo "⚙️ Backend REST API:        http://localhost:5000/api"
echo "🗄️ MongoDB Service:         localhost:27017"
echo "--------------------------------------------------------"
echo "View logs with: docker compose logs -f"
