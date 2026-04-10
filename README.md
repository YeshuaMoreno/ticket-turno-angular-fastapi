<<<<<<< HEAD
#  Sistema Web - Ticket de Turno

Proyecto desarrollado para el **Examen Parcial 2** de Desarrollo Web.

##  Tecnologías utilizadas

### Frontend

* Angular
* Tailwind CSS
* Chart.js

### Backend

* FastAPI
* SQLAlchemy (ORM)
* MySQL

---

##  Arquitectura

* Patrón MVC (Angular + API REST)
* Backend desacoplado (FastAPI)
* Consumo mediante HTTPClient

---

##  Funcionalidades

###  Usuario

* Crear ticket
* Generar PDF con QR
* Modificar ticket con CURP + turno

###  Administrador

* Login con captcha
* CRUD completo de tickets
* Cambiar estatus (Pendiente / Resuelto)
* Búsqueda por nombre o CURP
* Dashboard con gráficas

---

## Dashboard

* Total de tickets
* Pendientes
* Resueltos
* Gráfica dinámica (Chart.js)

---

##  Generación de PDF

Cada ticket incluye:

* Nombre
* CURP
* Turno
* Código QR

---

## API REST

Endpoints principales:

* GET /api/tickets
* POST /api/tickets
* PUT /api/tickets
* DELETE /api/tickets/{id}
* GET /api/dashboard

---

## Cómo ejecutar

### Backend

```bash
uvicorn backend.main:app --reload
```

### Frontend

```bash
npm install
ng serve
```

---

## Autor

Roberto Moreno
Ingeniería en Sistemas Computacionales
=======
\# Ticket de Turno



Sistema web desarrollado con Angular + FastAPI



\## Funcionalidades

\- Login con captcha

\- Roles (admin / user)

\- CRUD de tickets

\- CRUD de municipios

\- Dashboard con gráficas

\- Generación de PDF con QR



\## Tecnologías

\- Angular

\- FastAPI

\- SQLAlchemy (ORM)

\- MySQL



\## Arquitectura

\- Cliente-Servidor

\- API REST



\## Patrón de diseño

\- Factory (TicketFactory)

>>>>>>> 5c48f55 (README agregado)
