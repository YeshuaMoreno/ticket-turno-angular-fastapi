from sqlalchemy import Column, Integer, String
from backend.database import Base
from sqlalchemy import Column, Integer, String

class Usuario(Base):
    __tablename__ = "usuarios"

    id = Column(Integer, primary_key=True, index=True)
    username = Column(String)
    password = Column(String)
    rol = Column(String, default="user")