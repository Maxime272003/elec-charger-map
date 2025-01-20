@echo off
for %%f in (services\*.py) do start cmd /k python "%%f"
start cmd /k python client_rest.py