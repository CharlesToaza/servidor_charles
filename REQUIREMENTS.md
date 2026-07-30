# Project Requirements - Servidor Charles

## Overview
To-Do List application with Flask backend and static HTML/JS frontend, deployed via Docker on VPS.

## Tech Stack
- **Backend**: Python 3.11, Flask 3.0.3
- **Database**: PostgreSQL 15
- **Frontend**: HTML5, Vanilla JavaScript, CSS3
- **WSGI Server**: Gunicorn 22.0.0
- **Deployment**: Docker, Docker Compose
- **CI/CD**: GitHub Actions

## Backend Requirements
- Flask web framework with CORS support
- PostgreSQL database connection using psycopg3
- Environment variables for database configuration
- REST API endpoints:
  - GET /api/tasks - List all tasks (with optional filter ?q=text)
  - POST /api/tasks - Create new task
  - PUT /api/tasks/<id> - Update task
  - DELETE /api/tasks/<id> - Delete task
  - GET /api/health - Health check endpoint

## Database Schema
- Table: tasks
  - id (serial, primary key)
  - title (varchar, not null)
  - completed (boolean, default false)
  - fecha_limite (date, nullable)
  - created_at (timestamp, default now)

## Frontend Requirements
- Single page application
- Real-time task filtering
- Add, edit, delete tasks
- Mark tasks as completed
- Responsive design

## Security Requirements
- CORS enabled for API
- Environment variables for sensitive data
- Database credentials not hardcoded
- HTTPS in production
- Input validation on all endpoints

## Deployment Requirements
- Docker containerization
- Docker Compose for orchestration
- PostgreSQL as separate container
- Health checks for database
- Auto-restart on failure
- GitHub Actions for CI/CD
- Automated deployment to VPS on push to main branch

## Environment Variables
- DB_HOST (default: localhost)
- DB_NAME (default: bd_server)
- DB_USER (default: daniel_user)
- DB_PASSWORD (required)
- DB_PORT (default: 5432)
