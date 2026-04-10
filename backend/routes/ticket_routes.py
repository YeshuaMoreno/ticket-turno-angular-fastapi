from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from backend.database import SessionLocal
from backend.models.municipio import Municipio
from backend.models.ticket import Ticket
from backend.schemas.ticket_schema import TicketCreate
from backend.services.ticket_service import TicketFactory
from backend.services.qr_service import generar_qr
from backend.services.pdf_service import generar_pdf
from pydantic import BaseModel

router = APIRouter()

# -------- DB --------
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# -------- MUNICIPIOS --------
@router.get("/municipios")
def obtener_municipios(db: Session = Depends(get_db)):
    return db.query(Municipio).all()

@router.post("/municipios")
def crear_municipio(nombre: str, db: Session = Depends(get_db)):
    nuevo = Municipio(nombre=nombre)
    db.add(nuevo)
    db.commit()
    return nuevo

@router.put("/municipios/{id}")
def actualizar_municipio(id: int, nombre: str, db: Session = Depends(get_db)):
    m = db.query(Municipio).filter(Municipio.id == id).first()

    if not m:
        raise HTTPException(status_code=404)

    m.nombre = nombre
    db.commit()

    return {"msg": "ok"}

@router.delete("/municipios/{id}")
def eliminar_municipio(id: int, db: Session = Depends(get_db)):
    m = db.query(Municipio).filter(Municipio.id == id).first()

    if not m:
        raise HTTPException(status_code=404)

    db.delete(m)
    db.commit()

    return {"msg": "ok"}

# -------- TICKETS --------
class TicketUpdate(BaseModel):
    curp: str
    turno: int
    nombre: str

@router.post("/tickets")
def crear_ticket(data: TicketCreate, db: Session = Depends(get_db)):

    ticket = TicketFactory.crear_ticket(
        db,
        data.nombre,
        data.curp,
        data.municipio_id
    )

    generar_qr(ticket.curp, f"qr_{ticket.id}.png")
    generar_pdf(ticket, f"qr_{ticket.id}.png", f"ticket_{ticket.id}.pdf")

    return {
        "mensaje": "Ticket generado",
        "turno": ticket.turno,
        "pdf": f"/static/ticket_{ticket.id}.pdf"  
    }

@router.get("/tickets")
def obtener_tickets(db: Session = Depends(get_db)):
    return db.query(Ticket).all()

@router.delete("/tickets/{id}")
def eliminar_ticket(id: int, db: Session = Depends(get_db)):
    ticket = db.query(Ticket).filter(Ticket.id == id).first()

    if not ticket:
        raise HTTPException(status_code=404)

    db.delete(ticket)
    db.commit()

    return {"msg": "ok"}

@router.put("/tickets/status/{id}")
def cambiar_estatus(id: int, estatus: str, db: Session = Depends(get_db)):
    ticket = db.query(Ticket).filter(Ticket.id == id).first()

    if not ticket:
        raise HTTPException(status_code=404)

    ticket.estatus = estatus
    db.commit()

    return {"msg": "ok"}

@router.put("/tickets/update")
def actualizar_ticket(data: TicketUpdate, db: Session = Depends(get_db)):

    ticket = db.query(Ticket).filter(
        Ticket.curp == data.curp,
        Ticket.turno == data.turno
    ).first()

    if not ticket:
        raise HTTPException(status_code=404, detail="No encontrado")

    ticket.nombre = data.nombre
    db.commit()

    return {"msg": "Actualizado"}

# -------- dashboard --------

@router.get("/dashboard")
def dashboard(municipio_id: int = None, db: Session = Depends(get_db)):

    query = db.query(Ticket)

    if municipio_id:
        query = query.filter(Ticket.municipio_id == municipio_id)

    total = query.count()

    pendientes = query.filter(Ticket.estatus == "Pendiente").count()
    resueltos = query.filter(Ticket.estatus == "Resuelto").count()

    return {
        "total": total,
        "pendientes": pendientes,
        "resueltos": resueltos
    }