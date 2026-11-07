# ==============================================================================
# ISLAH Welfare Foundation - Docker Production Startup Script (PowerShell)
# ==============================================================================

Write-Host "🚀 Starting ISLAH Welfare Foundation Multi-Container Stack..." -ForegroundColor Cyan

# Check if Docker is running
docker info > $null 2>&1
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Docker is not running. Please start Docker Desktop first." -ForegroundColor Red
    exit 1
}

Write-Host "📦 Building and launching containers (MongoDB, Backend, CMS, Client)..." -ForegroundColor Yellow
docker compose up --build -d

if ($LASTEXITCODE -eq 0) {
    Write-Host "`n✨ All ISLAH containers are up and running!" -ForegroundColor Green
    Write-Host "--------------------------------------------------------" -ForegroundColor Gray
    Write-Host "🌐 Public Client Web App:   http://localhost:3000" -ForegroundColor Cyan
    Write-Host "🛠️ Admin & Media CMS:       http://localhost:3001" -ForegroundColor Cyan
    Write-Host "⚙️ Backend REST API:        http://localhost:5000/api" -ForegroundColor Cyan
    Write-Host "🗄️ MongoDB Service:         localhost:27017" -ForegroundColor Cyan
    Write-Host "--------------------------------------------------------" -ForegroundColor Gray
    Write-Host "View logs with: docker compose logs -f" -ForegroundColor White
} else {
    Write-Host "❌ Failed to start Docker containers." -ForegroundColor Red
}
