@echo off
start cmd /k "cd backend && python app.py"
start cmd /k "cd backend/services && python service_soap.py"
start cmd /k "cd frontend && npm start"