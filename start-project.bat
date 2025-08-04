@echo off
echo Starting HackFest 2025 MERN Stack Application...
echo.

echo Starting Backend Server...
cd server
start "Backend Server" cmd /k "npm install && npm run dev"

echo.
echo Starting Frontend Development Server...
cd ../client
start "Frontend Server" cmd /k "npm install && npm run dev"

echo.
echo Both servers are starting...
echo Backend will be available at: http://localhost:5000
echo Frontend will be available at: http://localhost:5173
echo.
echo Press any key to exit this window...
pause > nul 