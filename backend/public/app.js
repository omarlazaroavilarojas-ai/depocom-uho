const API_URL = "/api";

document.addEventListener('DOMContentLoaded', () => {
  const navItems = document.querySelectorAll('.nav-item');

  navItems.forEach(item => {
    item.addEventListener('click', (e) => {
      navItems.forEach(nav => nav.classList.remove('on'));
      const btn = e.currentTarget;
      btn.classList.add('on');
      
      const target = btn.getAttribute('data-target');
      cargarVista(target);
    });
  });

  // Cargar Dashboard por defecto
  cargarVista('dashboard');
});

async function cargarVista(vista) {
  const mainContent = document.getElementById('main-content');
  mainContent.innerHTML = `<h2 class="view-title">Cargando módulo...</h2>`;

  try {
    // 1. VISTA: DASHBOARD
    if (vista === 'dashboard') {
      const res = await fetch(`${API_URL}/dashboard/stats`);
      const stats = await res.json();
      
      mainContent.innerHTML = `
        <h2 class="view-title">Panel Principal</h2>
        <p class="view-subtitle">Estado en tiempo real del depósito de recursos informáticos.</p>
        <div class="stats-grid">
          <div class="card"><div class="card-icon">??</div><div class="card-num">${stats.solicitudesContador}</div><div class="card-label">Solicitudes de Baja</div></div>
          <div class="card"><div class="card-icon">??</div><div class="card-num">${stats.equiposContador}</div><div class="card-label">Equipos en Depósito</div></div>
          <div class="card"><div class="card-icon">??</div><div class="card-num">${stats.despiecesContador}</div><div class="card-label">Procesos de Despiece</div></div>
          <div class="card"><div class="card-icon">??</div><div class="card-num">${stats.piezasContador}</div><div class="card-label">Piezas en Almacén</div></div>
        </div>
      `;
    }

    // 2. VISTA: SOLICITUDES
    else if (vista === 'solicitudes') {
      const res = await fetch(`${API_URL}/solicitudes`);
      const datos = await res.json();
      
      let filas = datos.map(s => `<tr><td><b>${s.id}</b></td><td>${s.equipo}</td><td>${s.motivo}</td><td><span class="badge-pending">${s.estado}</span></td></tr>`).join('');
      
      mainContent.innerHTML = `
        <h2 class="view-title">Solicitudes de Baja Técnica</h2>
        <div class="layout-grid">
          <div class="card">
            <h3>Listado Oficial</h3>
            <table class="data-table">
              <thead><tr><th>ID</th><th>Equipo</th><th>Motivo</th><th>Estado</th></tr></thead>
              <tbody>${filas || '<tr><td colspan="4">No hay registros</td></tr>'}</tbody>
            </table>
          </div>
          <div class="card">
            <h3>Registrar Solicitud</h3>
            <form id="form-datos">
              <label>Equipo / Recurso</label><input type="text" id="campo-1" required placeholder="Ej: Monitor Sede Central">
              <label>Causa del Fallo</label><textarea id="campo-2" required placeholder="Detalles técnicos..."></textarea>
              <button type="submit" class="btn-submit">?? Guardar Solicitud</button>
            </form>
          </div>
        </div>
      `;

      EstablecerFormulario('solicitudes', ['equipo', 'motivo']);
    }

    // 3. VISTA: DEPÓSITO
    else if (vista === 'deposito') {
      const res = await fetch(`${API_URL}/deposito`);
      const datos = await res.json();
      
      let filas = datos.map(e => `<tr><td><b>${e.id}</b></td><td>${e.tipo}</td><td>${e.marca}</td><td>${e.inventario}</td><td>${e.estado}</td></tr>`).join('');
      
      mainContent.innerHTML = `
        <h2 class="view-title">Inventario de Equipos en Depósito</h2>
        <div class="layout-grid">
          <div class="card">
            <h3>Equipos Ingresados</h3>
            <table class="data-table">
              <thead><tr><th>ID</th><th>Tipo</th><th>Marca</th><th>No. Inventario</th><th>Estado</th></tr></thead>
              <tbody>${filas}</tbody>
            </table>
          </div>
          <div class="card">
            <h3>Ingresar Equipo</h3>
            <form id="form-datos">
              <label>Tipo de Equipo</label><input type="text" id="campo-1" required placeholder="Ej: Computadora de Escritorio">
              <label>Marca</label><input type="text" id="campo-2" required placeholder="Ej: ASUS">
              <label>Número de Inventario UHO</label><input type="text" id="campo-3" required placeholder="Ej: UHO-2054">
              <label>Estado Inicial</label>
              <select id="campo-4"><option>Para Despiece</option><option>Listo para Baja</option></select>
              <button type="submit" class="btn-submit">?? Registrar Ingreso</button>
            </form>
          </div>
        </div>
      `;
      EstablecerFormulario('deposito', ['tipo', 'marca', 'inventario', 'estado']);
    }

    // 4. VISTA: DESPIECE
    else if (vista === 'despiece') {
      const res = await fetch(`${API_URL}/despiece`);
      const datos = await res.json();
      
      let filas = datos.map(d => `<tr><td><b>${d.id}</b></td><td>${d.equipo}</td><td>${d.piezasExtraidas}</td><td>${d.tecnico}</td></tr>`).join('');
      
      mainContent.innerHTML = `
        <h2 class="view-title">Taller de Despiece de Equipos</h2>
        <div class="layout-grid">
          <div class="card">
            <h3>Procesos Realizados</h3>
            <table class="data-table">
              <thead><tr><th>ID</th><th>Equipo Despiezado</th><th>Piezas Recuperadas</th><th>Técnico</th></tr></thead>
              <tbody>${filas}</tbody>
            </table>
          </div>
          <div class="card">
            <h3>Iniciar Despiece</h3>
            <form id="form-datos">
              <label>Equipo a Despiezar</label><input type="text" id="campo-1" required placeholder="Ej: PC HP Inventario UHO-0543">
              <label>Piezas Útiles Extraídas</label><textarea id="campo-2" required placeholder="Ej: 1x RAM DDR3 4GB, 1x Fuente 400W"></textarea>
              <button type="submit" class="btn-submit">?? Confirmar Despiece</button>
            </form>
          </div>
        </div>
      `;
      EstablecerFormulario('despiece', ['equipo', 'piezasExtraidas']);
    }

    // 5. VISTA: ALMACÉN PIEZAS
    else if (vista === 'almacen') {
      const res = await fetch(`${API_URL}/almacen`);
      const datos = await res.json();
      
      let filas = datos.map(p => `<tr><td><b>${p.id}</b></td><td>${p.tipo}</td><td>${p.estado}</td><td>${p.ubicacion}</td></tr>`).join('');
      
      mainContent.innerHTML = `
        <h2 class="view-title">Almacén de Piezas Recuperadas</h2>
        <div class="layout-grid">
          <div class="card">
            <h3>Stock Disponible</h3>
            <table class="data-table">
              <thead><tr><th>ID</th><th>Componente</th><th>Estado Técnico</th><th>Ubicación</th></tr></thead>
              <tbody>${filas}</tbody>
            </table>
          </div>
          <div class="card">
            <h3>Añadir Pieza al Inventario</h3>
            <form id="form-datos">
              <label>Descripción del Componente</label><input type="text" id="campo-1" required placeholder="Ej: SSD Kingston 240GB">
              <label>Estado</label><select id="campo-2"><option>Recuperado</option><option>Defectuoso</option></select>
              <label>Ubicación en Estante</label><input type="text" id="campo-3" required placeholder="Ej: Estante B-3">
              <button type="submit" class="btn-submit">?? Guardar en Almacén</button>
            </form>
          </div>
        </div>
      `;
      EstablecerFormulario('almacen', ['tipo', 'estado', 'ubicacion']);
    }

    // 6. VISTA: CONFIGURACIÓN / ADMINISTRACIÓN
    else if (vista === 'administracion') {
      mainContent.innerHTML = `
        <h2 class="view-title">Configuración del Sistema</h2>
        <p class="view-subtitle">Control de nomencladores y variables globales de la Universidad de Holguín.</p>
        <div class="card" style="max-width: 600px;">
          <h3>Información del Entorno</h3>
          <p style="margin: 10px 0;"><b>Sede Principal:</b> Sede Central (Oscar Lucero Moya)</p>
          <p style="margin: 10px 0;"><b>Conexión institucional:</b> Integrado con auth.uho.edu.cu (Simulado)</p>
          <span style="background:#e8f5ee; color:#1a7a4a; padding:6px 12px; border-radius:4px; font-size:12px; display:inline-block; margin-top:10px;">?? Base de Datos Local en Memoria Activa y Sincronizada</span>
        </div>
      `;
    }

  } catch (error) {
    mainContent.innerHTML = `<div class="card" style="color:red; font-weight:bold;">? Error al conectar con el servidor Node.js</div>`;
  }
}

// Función genérica para enviar formularios de cualquier pestaña a Node.js
function EstablecerFormulario(endpoint, campos) {
  const form = document.getElementById('form-datos');
  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    let bodyData = {};
    
    campos.forEach((campo, index) => {
      const elemento = document.getElementById(`campo-${index + 1}`);
      if (elemento) bodyData[campo] = elemento.value;
    });

    await fetch(`${API_URL}/${endpoint}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(bodyData)
    });

    cargarVista(endpoint); // Recarga la pestaña actual con los nuevos datos pintados
  });
}