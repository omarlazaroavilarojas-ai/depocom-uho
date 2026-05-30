# DepoCom UHO  
Sistema de Gestión del Depósito de Equipos y Piezas de Cómputo  
Universidad de Holguín (UHO) – Cuba

DepoCom UHO es un sistema diseñado para gestionar el ciclo de vida completo de los medios informáticos dados de baja en la Universidad de Holguín. Abarca desde la solicitud inicial de baja, pasando por aprobaciones, revisión técnica, traslado a Economía, recepción en el Depósito, despiece, almacenamiento de piezas reutilizables e instalación en otros equipos, hasta la generación de reportes y trazabilidad completa.

---

## 📌 Objetivo General

Centralizar y automatizar la gestión del Depósito de Equipos y Piezas de Cómputo de la UHO, garantizando trazabilidad, control, seguridad y eficiencia en los procesos institucionales.

---

## 🧩 Módulos del Sistema

- **Solicitudes de Baja**  
  Creación, importación desde Excel, validación y aprobación en cadena.

- **Inventario del Depósito**  
  Registro de equipos recibidos, checklist de entrega y trazabilidad.

- **Despiece de Equipos**  
  Extracción de piezas con aprobación del Jefe de Soporte Técnico.

- **Almacén de Piezas**  
  Inventario de piezas reutilizables con campos configurables por tipo.

- **Instalación de Piezas**  
  Solicitud, aprobación e instalación en equipos de cualquier departamento.

- **Traslados**  
  Movimiento de equipos desde el Depósito hacia otras áreas.

- **Reportes y Trazabilidad**  
  Historial completo de equipos y piezas, exportable a PDF y Excel.

---

## 👥 Roles del Sistema

- Administrador del Sistema  
- Jefe de Departamento  
- Jefe de Área  
- Técnico de Soporte  
- Jefe de Soporte Técnico  
- Jefe de Economía  
- Consultor

Cada rol posee permisos específicos según la matriz definida en la documentación técnica.

---

## 🏗️ Arquitectura y Stack Tecnológico

| Capa | Tecnología | Justificación |
|------|------------|---------------|
| **Backend** | Laravel (PHP) | Robusto, modular, soporte OAuth2, API REST |
| **Frontend** | Vue.js | Interfaz moderna, rápida y responsiva |
| **Base de Datos** | PostgreSQL | Soporte JSONB para campos dinámicos |
| **Despliegue** | Docker + Docker Compose | Entorno reproducible y portable |
| **Autenticación** | OAuth2 / OpenID Connect | Integración con auth.uho.edu.cu |
| **Documentación API** | Swagger / OpenAPI 3.0 | Endpoints documentados |

---

## 📁 Estructura del Proyecto

depocom-uho/
├─ backend/                # API REST (Laravel)
├─ frontend/               # Interfaz web (Vue.js)
├─ docs/                   # Documentación técnica y de usuario
│  ├─ api/
│  ├─ manual_usuario.md
│  └─ manual_instalacion.md
├─ docker/                 # Configuración de Nginx y PostgreSQL
│  ├─ nginx.conf
│  └─ db-init.sql
├─ docker-compose.yml
├─ .env.example
├─ .gitignore
└─ README.md


---

## ⚙️ Requisitos Previos

- Git  
- Docker y Docker Compose  
- Node.js (solo si trabajas en frontend fuera de Docker)  
- PHP + Composer (solo si trabajas en backend fuera de Docker)

---

## 🚀 Puesta en Marcha con Docker 

1. Clonar el repositorio:

```bash
git clone https://github.com/tu-usuario/depocom-uho.git
cd depocom-uho

##Copiar archivo de entorno
cp .env.example .env

##Levantar los servicios
docker-compose up --build

