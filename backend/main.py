from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles

from backend.database import engine, Base
from backend.routes import ticket_routes, auth_routes

# CREAR APP PRIMERO
app = FastAPI()

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# STATIC (para PDF / QR)
app.mount("/static", StaticFiles(directory="."), name="static")

# CREAR TABLAS
Base.metadata.create_all(bind=engine)

# RUTAS (UNA SOLA VEZ)
app.include_router(ticket_routes.router, prefix="/api")
app.include_router(auth_routes.router, prefix="/api")