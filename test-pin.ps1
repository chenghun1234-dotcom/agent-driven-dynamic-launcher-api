# Test adding a pin
$body = @{
    label = "중요 문서"
    icon_url = "https://cdn.jsdelivr.net/npm/simple-icons@v13/icons/googledrive.svg"
    action = "https://drive.google.com"
} | ConvertTo-Json

Write-Host "Testing POST /v1/launcher/pin..."
$response = Invoke-WebRequest -Uri "https://agent-driven-dynamic-launcher-api.chenghun1234.workers.dev/v1/launcher/pin" `
    -Method Post `
    -ContentType "application/json" `
    -Body $body

Write-Host "Response:"
$response.Content

Write-Host "`nTesting GET /v1/launcher/pins..."
$pinsResponse = Invoke-WebRequest -Uri "https://agent-driven-dynamic-launcher-api.chenghun1234.workers.dev/v1/launcher/pins" `
    -Method Get

Write-Host "Pins Response:"
$pinsResponse.Content
