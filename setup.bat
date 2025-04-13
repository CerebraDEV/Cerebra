@echo off
echo Starting CEREBRA project setup...

REM Check if Node.js is installed
where node >nul 2>nul
if %ERRORLEVEL% neq 0 (
    echo Node.js is not installed. Please install Node.js 18+ and try again.
    exit /b 1
)

REM Check if npm is installed
where npm >nul 2>nul
if %ERRORLEVEL% neq 0 (
    echo npm is not installed. Please install npm and try again.
    exit /b 1
)

REM Check if PostgreSQL is installed
where psql >nul 2>nul
if %ERRORLEVEL% neq 0 (
    echo PostgreSQL is not installed. Please install PostgreSQL and try again.
    exit /b 1
)

REM Install dependencies
echo Installing dependencies...
call npm install

REM Create .env file from example
echo Creating .env file...
copy .env.example .env

REM Generate Prisma client
echo Generating Prisma client...
call npx prisma generate

REM Run database migrations
echo Running database migrations...
call npx prisma migrate dev --name init

REM Build the project
echo Building the project...
call npm run build

REM Start the development server
echo Starting the development server...
echo CEREBRA is now running at http://localhost:3000
call npm run dev 