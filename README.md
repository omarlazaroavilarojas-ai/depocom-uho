# DepoCom UHO

### Sistema de Gestión del Depósito de Equipos y Piezas de Cómputo
**Universidad de Holguín (UHO) – Cuba**

DepoCom UHO es un sistema diseñado para gestionar el ciclo de vida completo de los medios informáticos dados de baja en la Universidad de Holguín. Abarca desde la solicitud inicial de baja, pasando por aprobaciones, revisión técnica, traslado a Economía, recepción en el Depósito, despiece, almacenamiento de piezas reutilizables e instalación en otros equipos, hasta la generación de reportes y trazabilidad completa.

---

## 📌 Objetivo General
Centralizar y automatizar la gestión del Depósito de Equipos y Piezas de Cómputo de la UHO, garantizando trazabilidad, control, seguridad y eficiencia en los procesos institucionales.

---

## 🧩 Módulos del Sistema

* **Solicitudes de Baja:** Creación, validación y aprobación en cadena de equipos.
* **Inventario del Depósito:** Registro de equipos recibidos, checklist de entrega y trazabilidad.
* **Despiece de Equipos:** Extracción de piezas con aprobación del Jefe de Soporte Técnico.
* **Almacén de Piezas:** Inventario de piezas reutilizables con campos configurables por tipo.
* **Instalación de Piezas:** Solicitud, aprobación e instalación en equipos de cualquier departamento.
* **Traslados:** Movimiento de equipos desde el Depósito hacia otras áreas.
* **Reportes y Trazabilidad:** Historial completo de equipos y piezas interactivo.

---

## 👥 Roles del Sistema
* Administrador del Sistema
* Jefe de Departamento
* Jefe de Área
* Técnico de Soporte
* Jefe de Soporte Técnico
* Jefe de Economía
* Consultor

*Cada rol posee permisos específicos según la matriz definida en la documentación técnica.*

---

## 🏗️ Arquitectura y Stack Tecnológico

| Capa | Tecnología | Justificación |
| :--- | :--- | :--- |
| **Backend** | Node.js (Express) | Servidor API rápido, ligero y eficiente para la gestión de rutas. |
| **Frontend** | HTML5 / CSS3 / JavaScript | Interfaz interactiva, responsiva y adaptada al diseño institucional azul. |
| **Base de Datos** | Persistencia en Memoria (RAM) | Estructura optimizada para simulación en tiempo real y pruebas ágiles. |
| **Despliegue** | Docker + Docker Compose | Entorno reproducible, aislado y portable. |

---

## 📁 Estructura del Proyecto

```text
depocom-uho/
├─ backend/               # Servidor API y Lógica del Sistema (Node.js)
│  ├─ public/             # Interfaz Web Interactiva (HTML, CSS, JS)
│  ├─ index.js            # Punto de entrada del servidor Express
│  └─ package.json        # Dependencias del backend
├─ Dockerfile             # Receta de construcción de la imagen Docker
├─ docker-compose.yml     # Gestión del contenedor de la aplicación
├─ .env.example           # Plantilla de variables de entorno
└─ README.md              # Documentación principal del proyecto

⚙️ Requisitos Previos
Git

Docker y Docker Compose

Node.js (Solo si se ejecuta fuera de Docker)

🚀 Puesta en Marcha con Docker
Para levantar el sistema completo con un solo comando de manera aislada, ejecute en su terminal:
# 1. Clonar el repositorio
git clone [https://github.com/tu-usuario/depocom-uho.git](https://github.com/tu-usuario/depocom-uho.git)
cd depocom-uho

# 2. Copiar archivo de entorno
cp .env.example .env

# 3. Levantar los servicios
docker compose up --build
Una vez finalizado el despliegue, abra su navegador web e ingrese a:
👉 http://localhost:5000