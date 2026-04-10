from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from backend.database import SessionLocal
from backend.models.usuario import Usuario
from pydantic import BaseModel

router = APIRouter()

# -------- DB --------
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# -------- SCHEMAS --------
class LoginData(BaseModel):
    username: str
    password: str

class UserUpdate(BaseModel):
    id: int
    rol: str

# -------- LOGIN --------
@router.post("/login")
def login(data: LoginData, db: Session = Depends(get_db)):
    user = db.query(Usuario).filter(
        Usuario.username == data.username,
        Usuario.password == data.password
    ).first()

    if not user:
        raise HTTPException(status_code=401, detail="Credenciales incorrectas")

    return {
        "token": "fake-jwt",
        "rol": user.rol
    }

# -------- REGISTER --------
@router.post("/register")
def register(data: LoginData, db: Session = Depends(get_db)):
    existe = db.query(Usuario).filter(
        Usuario.username == data.username
    ).first()

    if existe:
        raise HTTPException(status_code=400, detail="Usuario ya existe")

    user = Usuario(
        username=data.username,
        password=data.password,
        rol="user"
    )

    db.add(user)
    db.commit()

    return {"msg": "Usuario creado"}

# -------- CRUD USUARIOS --------
@router.get("/usuarios")
def obtener_usuarios(db: Session = Depends(get_db)):
    return db.query(Usuario).all()

@router.post("/usuarios")
def crear_usuario(data: LoginData, db: Session = Depends(get_db)):
    user = Usuario(
        username=data.username,
        password=data.password,
        rol="user"
    )

    db.add(user)
    db.commit()

    return {"msg": "Usuario creado"}

@router.put("/usuarios")
def actualizar_usuario(data: UserUpdate, db: Session = Depends(get_db)):
    user = db.query(Usuario).filter(Usuario.id == data.id).first()

    if not user:
        raise HTTPException(status_code=404)

    user.rol = data.rol
    db.commit()

    return {"msg": "Actualizado"}

@router.delete("/usuarios/{id}")
def eliminar_usuario(id: int, db: Session = Depends(get_db)):
    user = db.query(Usuario).filter(Usuario.id == id).first()

    if not user:
        raise HTTPException(status_code=404)

    db.delete(user)
    db.commit()

    return {"msg": "Eliminado"}