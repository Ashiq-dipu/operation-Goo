@echo off
title Operation GO - Local Web Server
color 0A
cls
echo ========================================================
echo         OPERATION GO - LOCAL SERVER LAUNCHER
echo ========================================================
echo.
echo Starting local node server on port 3000...
echo.

cd /d "%~dp0"

start "" "http://localhost:3000"

node server.js

pause
