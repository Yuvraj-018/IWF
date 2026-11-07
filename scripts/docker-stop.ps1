# ==============================================================================
# ISLAH Welfare Foundation - Docker Stop Script (PowerShell)
# ==============================================================================

Write-Host "🛑 Stopping ISLAH Welfare Foundation containers..." -ForegroundColor Yellow
docker compose down

Write-Host "✅ All containers stopped cleanly." -ForegroundColor Green
