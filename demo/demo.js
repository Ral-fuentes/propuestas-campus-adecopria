/* Motor común de las demos interactivas del Campus ADECOPRIA.
   Simulación en el navegador: no hay servidor ni se guardan datos reales.
   Cada opción define window.THEME (portada, chrome y vistas del curso) antes de cargar este archivo. */
(function () {
  'use strict';
  const T = window.THEME;

  // ---------- Curso y usuaria de ejemplo ----------
  const C = {
    name: 'Transformación digital para la productividad',
    code: 'AF1', group: 'AF1G1', modalidad: 'Virtual', horas: 40,
    objetivo: 'Aplicar herramientas digitales y de inteligencia artificial para mejorar la productividad en el trabajo diario.',
    resultados: ['Organiza el trabajo colaborativo con herramientas en la nube.',
      'Automatiza tareas repetitivas con apoyo de la inteligencia artificial.',
      'Diseña un plan de mejora aplicado a su puesto de trabajo.'],
    modules: [
      { title: 'Fundamentos de la transformación digital', badge: 'Pionero digital', acts: [
        { t: 'video', sena: true, title: 'Video de bienvenida del programa (SENA)' },
        { t: 'decl', title: 'Registro inicial: recibido del material' },
        { t: 'read', title: 'Lectura: ¿qué es la transformación digital?' },
        { t: 'video', title: 'Video: la transformación digital en la práctica' },
        { t: 'quiz', title: 'Actividad de repaso', q: '¿Cuál es el primer paso de una transformación digital?',
          opts: ['Comprar software nuevo', 'Identificar un proceso que se pueda mejorar', 'Reemplazar al equipo de trabajo'], ok: 1 }] },
      { title: 'Trabajo colaborativo en la nube', badge: 'Colaborador', acts: [
        { t: 'read', title: 'Lectura: documentos compartidos y versiones' },
        { t: 'video', title: 'Video: organiza tu equipo con calendario y tareas' },
        { t: 'forum', title: 'Foro: ¿qué tarea de tu trabajo digitalizarías primero?' }] },
      { title: 'Inteligencia artificial aplicada', badge: 'Explorador IA', acts: [
        { t: 'read', title: 'Lectura: qué puede (y qué no) hacer la IA' },
        { t: 'quiz', title: 'Actividad de repaso', q: '¿Qué debes hacer siempre con una respuesta generada por IA?',
          opts: ['Copiarla tal cual', 'Revisarla y validarla antes de usarla', 'Compartirla sin leerla'], ok: 1 },
        { t: 'task', title: 'Evidencia: automatiza una tarea con IA' }] },
      { title: 'Proyecto aplicado', badge: 'Transformador', acts: [
        { t: 'read', title: 'Guía del proyecto final' },
        { t: 'task', title: 'Evidencia final: plan de mejora' },
        { t: 'survey', title: 'Encuesta de satisfacción' }] }
    ]
  };
  const READ = [
    'La transformación digital no empieza por la tecnología sino por las personas y los procesos. Identificar una tarea que hoy se hace a mano y consume tiempo es el primer paso para mejorarla con herramientas digitales.',
    'Trabajar sobre un mismo documento en la nube evita enviar versiones por correo. Cada cambio queda registrado y se puede volver a una versión anterior cuando haga falta.',
    'La inteligencia artificial generativa ayuda a redactar, resumir y ordenar información, pero puede equivocarse. Toda respuesta debe revisarse antes de usarla en el trabajo.',
    'En el proyecto final aplicarás lo aprendido a una tarea real de tu puesto: cómo se hace hoy, qué herramienta usarías y qué mejora esperas.'
  ];
  const AI = {
    resumen: m => `Ideas clave del Módulo ${m + 1}: ${C.modules[m].title}\n\n` + [
      '1. El cambio empieza por un proceso concreto, no por comprar tecnología.\n2. Hay que medir cuánto tiempo toma hoy la tarea.\n3. Las personas del equipo deben participar desde el inicio.',
      '1. Un solo documento compartido reemplaza las versiones por correo.\n2. El historial permite recuperar cambios anteriores.\n3. Calendario y tareas compartidas ordenan el trabajo del equipo.',
      '1. La IA sirve para redactar, resumir y organizar información.\n2. Puede equivocarse: siempre hay que revisar sus respuestas.\n3. No se deben compartir datos personales o confidenciales con ella.',
      '1. Elige una tarea real de tu puesto de trabajo.\n2. Describe cómo se hace hoy y qué herramienta usarías.\n3. Define cómo medirás la mejora.'][m],
    explicar: () => 'Imagina que cada semana armas a mano un informe con los datos de tres compañeros. Con una hoja compartida en la nube, cada uno escribe su parte y el informe queda listo al instante. Eso es digitalizar un proceso: menos pasos manuales y menos errores.'
  };
  const U = { nombres: 'Laura', apellidos: 'Gómez', tipodoc: 'Cédula de ciudadanía', doc: '1023456789', email: 'laura.gomez@ejemplo.com', tel: '300 000 0000' };
  const DEPTOS = ['Amazonas', 'Antioquia', 'Arauca', 'Archipiélago de San Andrés, Providencia y Santa Catalina', 'Atlántico', 'Bogotá D.C.', 'Bolívar', 'Boyacá', 'Caldas', 'Caquetá', 'Casanare', 'Cauca', 'Cesar', 'Chocó', 'Córdoba', 'Cundinamarca', 'Guainía', 'Guaviare', 'Huila', 'La Guajira', 'Magdalena', 'Meta', 'Nariño', 'Norte de Santander', 'Putumayo', 'Quindío', 'Risaralda', 'Santander', 'Sucre', 'Tolima', 'Valle del Cauca', 'Vaupés', 'Vichada'];

  const svg = p => `<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${p}</svg>`;
  const ICON = {
    check: svg('<path d="M5 12l5 5L20 7"/>'), lock: svg('<rect x="5" y="11" width="14" height="10" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/>'),
    play: '<svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true"><path d="M8 5v14l11-7z"/></svg>',
    video: svg('<rect x="3" y="6" width="13" height="12" rx="2"/><path d="M16 10l5-3v10l-5-3"/>'), spark: svg('<path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8z"/>'),
    book: svg('<path d="M4 5a2 2 0 0 1 2-2h14v16H6a2 2 0 0 0-2 2z"/><path d="M4 19V5"/>'), award: svg('<circle cx="12" cy="9" r="6"/><path d="M8.5 14L7 22l5-3 5 3-1.5-8"/>'),
    clock: svg('<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>'), file: svg('<path d="M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"/><path d="M14 3v6h6"/>'),
    left: svg('<path d="M15 6l-6 6 6 6"/>'), right: svg('<path d="M9 6l6 6-6 6"/>'), help: svg('<circle cx="12" cy="12" r="9"/><path d="M9.5 9a2.5 2.5 0 1 1 3.5 2.3c-.6.3-1 .9-1 1.7M12 17h.01"/>')
  };

  // ---------- Estado ----------
  const KEY = 'demo-adecopria-v2-' + T.id;   // v2: se agregó el video de bienvenida SENA
  const fresh = () => ({ view: 'portada', pol: {}, perfil: null, done: {}, unlockedAt: { 0: Date.now() }, cur: null, live: null, xp: 0,
    badges: [], modal: null, quiz: {}, forum: {}, file: {}, decl: null, rating: 0, aiUsed: false, aiInline: null, seenCourse: false, certSeen: false, tourMin: false });
  let S;
  try { S = JSON.parse(localStorage.getItem(KEY)) || fresh(); } catch (e) { S = fresh(); }
  S.playing = null;
  const save = () => { try { localStorage.setItem(KEY, JSON.stringify(S)); } catch (e) { /* sin almacenamiento: la demo sigue en memoria */ } };

  // ---------- Utilidades ----------
  const esc = s => String(s == null ? '' : s).replace(/[&<>"']/g, ch => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[ch]));
  const addBD = (ts, n) => { const d = new Date(ts); let k = 0; while (k < n) { d.setDate(d.getDate() + 1); if (d.getDay() % 6) k++; } return d; };
  const fmt = d => new Date(d).toLocaleDateString('es-CO', { weekday: 'long', day: 'numeric', month: 'long' });
  const fmtLong = d => new Date(d).toLocaleDateString('es-CO', { day: 'numeric', month: 'long', year: 'numeric' });
  const fmtFull = d => new Date(d).toLocaleString('es-CO', { day: 'numeric', month: 'long', hour: 'numeric', minute: '2-digit' });
  const TOTAL = C.modules.reduce((n, m) => n + m.acts.length, 0);
  const isDone = (m, a) => !!S.done[m + '-' + a];
  const modCount = m => C.modules[m].acts.filter((x, a) => isDone(m, a)).length;
  const modDone = m => modCount(m) === C.modules[m].acts.length;
  const unlocked = m => m === 0 || modDone(m - 1);
  const allDone = () => C.modules.every((x, m) => modDone(m));
  const progress = () => Math.round(Object.keys(S.done).length / TOTAL * 100);
  const deadline = m => addBD(S.unlockedAt[m] || Date.now(), 8);
  const daysLeft = m => { let n = 0; const d = new Date(); const end = deadline(m); while (d < end) { d.setDate(d.getDate() + 1); if (d.getDay() % 6) n++; } return n; };
  const currentModule = () => { const i = C.modules.findIndex((x, m) => !modDone(m)); return i === -1 ? C.modules.length - 1 : i; };
  const firstPendingIn = m => { const i = C.modules[m].acts.findIndex((x, a) => !isDone(m, a)); return i === -1 ? 0 : i; };
  const firstPending = () => { const m = currentModule(); return { m, a: firstPendingIn(m) }; };
  const nextPendingInModule = m => { const i = C.modules[m].acts.findIndex((x, a) => !isDone(m, a)); return i === -1 ? null : { m, a: i }; };
  const nextAfter = p => { if (!p) return null; if (p.a + 1 < C.modules[p.m].acts.length) return { m: p.m, a: p.a + 1 };
    return p.m + 1 < C.modules.length && unlocked(p.m + 1) ? { m: p.m + 1, a: 0 } : null; };
  const prevBefore = p => { if (!p) return null; if (p.a > 0) return { m: p.m, a: p.a - 1 };
    return p.m > 0 ? { m: p.m - 1, a: C.modules[p.m - 1].acts.length - 1 } : null; };
  const liveDate = () => addBD(Date.now(), 2);
  const level = () => 1 + Math.floor(S.xp / 200);

  // ---------- Vistas comunes ----------
  const POL = [
    ['datos', 'Política de tratamiento de datos personales', 'Autorizo el tratamiento de mis datos personales conforme a la Ley 1581 de 2012, para los fines de la formación y los reportes al SENA y a la interventoría.'],
    ['imagen', 'Autorización de uso de imagen', 'Autorizo la grabación de mi imagen y voz en las sesiones en vivo, con fines formativos y de verificación del convenio.'],
    ['gratuidad', 'Declaración de gratuidad', 'Declaro que no he pagado por esta formación y que sé que nadie está autorizado para cobrarla.']];
  const ro = (l, v) => `<label class="dv-label">${l}<input class="dv-input" value="${esc(v)}" readonly title="Solo la administración puede modificarlo"></label>`;
  const sel = (id, l, opts, v) => `<label class="dv-label">${l}<select class="dv-select" id="${id}"><option value="">Elige…</option>${opts.map(o => `<option ${v === o ? 'selected' : ''}>${o}</option>`).join('')}</select></label>`;

  const VIEWS = {
    politicas: () => `<div class="dv-narrow"><div class="dv-card dv-stack">
      <span class="dv-kicker">Primer ingreso · paso 1 de 2</span><h1 class="dv-h1">Antes de empezar</h1>
      <p class="dv-muted" style="margin:0">Estas autorizaciones las exige el SENA. La plataforma guarda la fecha y la hora de cada aceptación como evidencia.</p>
      ${POL.map(([id, t, d]) => `<label class="dv-check"><input type="checkbox" id="pol-${id}"><span><strong>${t}</strong><br><span class="dv-muted">${d}</span></span></label>`).join('')}
      <div class="dv-row"><button class="dv-btn dv-btn-pri" data-act="acceptPolicies">Aceptar y continuar</button><span class="dv-muted" style="font-size:13px">Textos de ejemplo, pendientes de revisión jurídica.</span></div></div></div>`,

    perfil: () => { const p = S.perfil || {}; return `<div class="dv-narrow"><div class="dv-card dv-stack">
      <span class="dv-kicker">Primer ingreso · paso 2 de 2</span><h1 class="dv-h1">Completa tu perfil</h1>
      <p class="dv-muted" style="margin:0">Estos datos alimentan los reportes que exige el SENA (formato F2.1). Los datos de identidad los carga la administración.</p>
      <div class="dv-grid2">${ro('Tipo de documento', U.tipodoc)}${ro('Número de documento', U.doc)}${ro('Nombres', U.nombres)}${ro('Apellidos', U.apellidos)}
        ${ro('Correo electrónico', U.email)}<label class="dv-label">Teléfono de contacto<input class="dv-input" id="pf-tel" value="${esc(p.tel || U.tel)}"></label>
        <label class="dv-label">Departamento de domicilio *<select class="dv-select" id="pf-depto"><option value="">Elige…</option>${DEPTOS.map(d => `<option ${p.depto === d ? 'selected' : ''}>${d}</option>`).join('')}</select></label>
        <label class="dv-label">Municipio de domicilio *<input class="dv-input" id="pf-muni" placeholder="Ej. Medellín" value="${esc(p.muni || '')}"></label></div>
      <div class="dv-row"><span class="dv-h2">Caracterización</span><span class="dv-chip">Opcional</span></div>
      <p class="dv-muted" style="margin:-8px 0 0;font-size:14px">Solo la ven tú, la administración, la interventoría y el SENA. Puedes elegir "Prefiero no responder".</p>
      <div class="dv-grid2">${sel('pf-etnia', 'Pertenencia étnica', ['Ninguna', 'Indígena', 'Negro(a), afrocolombiano(a) o afrodescendiente', 'Raizal', 'Palenquero(a)', 'Rrom o gitano(a)', 'Prefiero no responder'], p.etnia)}
        ${sel('pf-disc', 'Persona con discapacidad', ['No', 'Sí', 'Prefiero no responder'], p.disc)}${sel('pf-vict', 'Víctima del conflicto armado', ['No', 'Sí', 'Prefiero no responder'], p.vict)}</div>
      <div class="dv-row"><button class="dv-btn dv-btn-pri" data-act="saveProfile">Guardar y continuar</button></div></div></div>`; },

    inicio: () => { const pct = progress(), m = currentModule(); return `<div class="dv-wrap dv-stack">
      <div><span class="dv-kicker">Mis formaciones</span><h1 class="dv-h1">Hola, ${U.nombres}</h1></div>
      <div class="dv-dash">
        <article class="dv-card dv-stack"><div class="dv-row"><span class="dv-chip">Curso de ejemplo</span><span class="dv-muted">${C.modalidad} · ${C.horas} horas</span></div>
          <h2 class="dv-h2">${C.name}</h2>
          <div class="dv-row"><div class="dv-bar" style="flex:1"><span style="width:${pct}%"></span></div><strong>${pct}%</strong></div>
          <p class="dv-muted" style="margin:0">${allDone() ? '¡Formación culminada! Tu certificado está disponible.' : `Módulo ${m + 1} de ${C.modules.length} · plazo hasta el ${fmt(deadline(m))}`}</p>
          <div class="dv-row"><button class="dv-btn dv-btn-pri" data-act="openCourse">${pct ? 'Continuar' : 'Entrar a la formación'}</button>${allDone() ? `<button class="dv-btn" data-act="cert">${ICON.award} Ver certificado</button>` : ''}</div></article>
        <div class="dv-stack"><article class="dv-card dv-stack"><span class="dv-kicker">Próxima sesión en vivo</span><strong>Hora de dudas con el capacitador</strong>
          <span class="dv-muted">${fmt(liveDate())} · 6:00 p. m. · Google Meet</span><button class="dv-btn" data-act="live">${ICON.video} Unirse con Meet</button></article>
          <article class="dv-card dv-stack" style="gap:8px"><span class="dv-chip dv-chip-ok" style="align-self:flex-start">${ICON.check} Formación gratuita</span>
            <span style="font-size:14.5px">Las acciones de formación de la convocatoria DSNFT-0001-FCE-2026 son gratuitas para los trabajadores beneficiarios y están cofinanciadas por el SENA. Nadie está autorizado para cobrarlas.</span></article>
          <article class="dv-card dv-stack" style="gap:6px"><span class="dv-kicker">Centro de Atención al Usuario</span><span style="font-size:14.5px">[correo CAU] · WhatsApp [número]</span><span class="dv-muted" style="font-size:14px">Lun a vie [horario] · Sáb [horario]</span></article></div>
      </div></div>`; },

    certificado: () => { const fin = Math.max(...Object.values(S.done)); return `<div class="dv-wrap dv-stack">
      <div class="dv-row dv-noprint"><button class="dv-btn" data-act="openCourse">${ICON.left} Volver a la formación</button><button class="dv-btn dv-btn-pri" data-act="print">Descargar PDF</button></div>
      <section class="dv-cert"><div class="dv-cert-in"><span class="dv-kicker" style="color:#8a6d00">Constancia de culminación · ejemplo</span>
        <p>Se hace constar que</p><h1>${U.nombres} ${U.apellidos}</h1><p>${U.tipodoc} ${U.doc}</p><p>culminó la acción de formación</p><h2>${C.name}</h2>
        <p>${C.modalidad} · ${C.horas} horas · Código ${C.code} · Grupo ${C.group}</p><p style="color:#5b6570">Fecha: ${fmtLong(fin)}</p>
        <div class="dv-cert-logos"><span class="dv-ph" style="color:#5b6570;border-color:#9aa5b1">[Logo ADECOPRIA]</span><span class="dv-ph" style="color:#5b6570;border-color:#9aa5b1">[Cobranding SENA]</span><img src="../logo.png" alt="Grupo AE Advanced Education"></div></div></section>
      <p class="dv-muted dv-noprint">El formato final lo definen el convenio y el SENA (pliego de condiciones, numeral 3.4.6).</p></div>`; }
  };

  // Contenido interactivo de una actividad (lo usan las tres opciones).
  function activity(m, a) {
    const x = C.modules[m].acts[a], k = m + '-' + a, done = isDone(m, a), d = `data-m="${m}" data-a="${a}"`;
    const label = { decl: 'Registro', read: 'Lectura', video: 'Video', quiz: 'Repaso · sin nota', forum: 'Foro', task: 'Evidencia', survey: 'Encuesta' }[x.t];
    let body = '';
    if (x.t === 'decl') body = done ? `<div class="dv-okbox">${ICON.check} Registro firmado el ${fmtFull(S.decl)}</div>`
      : `<p style="margin:0">Confirma que recibiste el material de formación. Este registro lo exige el SENA y queda guardado con fecha y hora.</p>
         <label class="dv-check"><input type="checkbox" id="decl-ok"><span>Declaro que recibí el material de formación: guía del participante, recursos digitales y acceso a la plataforma.</span></label>
         <div class="dv-row"><button class="dv-btn dv-btn-pri" data-act="decl" ${d}>Firmar registro</button></div>`;
    if (x.t === 'read') body = `<p style="margin:0;font-size:17px">${READ[m]}</p><p class="dv-muted" style="margin:0">Contenido de ejemplo. En la plataforma real aquí van el texto, las infografías y los recursos del capacitador, con referencias en estilo APA.</p>`
      + (done ? '' : `<div class="dv-row"><button class="dv-btn dv-btn-pri" data-act="complete" ${d}>Marcar como completada</button></div>`);
    if (x.t === 'video') { const playing = S.playing === k;
      body = `<div class="dv-player ${playing ? 'playing' : ''}">${done ? `<span class="dv-okbadge">${ICON.check} Visto</span>` : `<button class="dv-play" data-act="play" ${d} aria-label="Reproducir video" ${playing ? 'disabled' : ''}>${ICON.play}</button>`}<span class="prog"></span></div>
        <p class="dv-muted" style="margin:0">${playing ? 'Reproduciendo… (simulado)' : x.sena ? 'Video oficial del programa, suministrado por el SENA. Es obligatorio al iniciar cada grupo (Anexo 12, numeral 2.8.1).' : 'Recurso educativo digital en HD, con subtítulos en español.'}</p>`; }
    if (x.t === 'quiz') { const ans = S.quiz[k], ok = ans === x.ok;
      body = `<p style="margin:0"><strong>${x.q}</strong></p><div class="dv-stack" style="gap:10px">${x.opts.map((o, i) => `<button class="dv-opt ${ans === i ? (i === x.ok ? 'right' : 'wrong') : ''}" data-act="answer" ${d} data-i="${i}" ${done ? 'disabled' : ''}>${o}</button>`).join('')}</div>`
        + (done || ans === undefined ? '' : ok ? `<div class="dv-okbox">${ICON.check} ¡Correcto! Esta actividad no tiene nota: es para repasar.</div><div class="dv-row"><button class="dv-btn dv-btn-pri" data-act="complete" ${d}>Continuar</button></div>`
          : '<div class="dv-warnbox">Casi. Vuelve a intentarlo: la retroalimentación te ayuda a repasar sin afectar tu nota.</div>'); }
    if (x.t === 'forum') body = done ? `<div class="dv-post"><strong>${U.nombres} ${U.apellidos}</strong><p>${esc(S.forum[k])}</p><span class="dv-muted" style="font-size:14px">Publicado · el capacitador y tus compañeros pueden responder</span></div>`
      : `<p style="margin:0">Comparte tu respuesta con el grupo. El capacitador la revisará.</p><textarea class="dv-textarea" id="forum-text" rows="4" placeholder="Escribe tu aporte…"></textarea>
         <div class="dv-row"><button class="dv-btn dv-btn-pri" data-act="forum" ${d}>Publicar en el foro</button></div>`;
    if (x.t === 'task') { const f = S.file[k];
      body = done ? `<div class="dv-okbox">${ICON.check} Evidencia enviada: ${esc(f)} · ${fmtFull(S.done[k])}</div><p class="dv-muted" style="margin:0">El capacitador la calificará y verás la nota en Calificaciones.</p>`
        : `<p style="margin:0">Sube tu evidencia en PDF, Word o imagen, desde el computador o el celular.</p>
           <div class="dv-row"><button class="dv-btn" data-act="pickFile" ${d}>${ICON.file} ${f ? 'Cambiar archivo' : 'Seleccionar archivo'}</button>${f ? `<span class="dv-chip">${esc(f)}</span>` : ''}</div>
           <div class="dv-row"><button class="dv-btn dv-btn-pri" data-act="sendTask" ${d}>Enviar evidencia</button></div>`; }
    if (x.t === 'survey') body = done ? `<div class="dv-okbox">${ICON.check} ¡Gracias! Tu opinión ayuda a mejorar la formación.</div>`
      : `<p style="margin:0"><strong>¿Qué tan útil fue esta formación para tu trabajo?</strong> (1 = poco, 5 = mucho)</p>
         <div class="dv-row">${[1, 2, 3, 4, 5].map(i => `<button class="dv-rate ${S.rating === i ? 'on' : ''}" data-act="rate" data-i="${i}" aria-label="${i} de 5">${i}</button>`).join('')}</div>
         <div class="dv-row"><button class="dv-btn dv-btn-pri" data-act="sendSurvey" ${d}>Enviar</button></div>`;
    const nav = done && !T.hideActNav ? `<div class="dv-row">${nextAfter({ m, a }) ? `<button class="dv-btn dv-btn-pri" data-act="next">Siguiente actividad ${ICON.right}</button>` : ''}<button class="dv-btn" data-act="openCourse">Volver al curso</button></div>` : '';
    return `<div class="dv-stack"><div class="dv-row"><span class="dv-chip">${label}</span>${done ? `<span class="dv-chip dv-chip-ok">${ICON.check} Completada</span>` : ''}</div>
      <h1 class="dv-h1">${x.title}</h1>${body}${nav}</div>`;
  }

  function modal() {
    const md = S.modal; if (!md) return '';
    let h = '';
    if (md.type === 'modulo') { const n = md.m + 1;
      h = `<div class="dv-celebrate">${ICON.award}</div><h2 class="dv-h1">¡Módulo ${n} completado!</h2>
        ${T.badges ? `<p style="margin:0">Ganaste la insignia <strong>${C.modules[md.m].badge}</strong> y subiste al nivel ${level()}.</p>` : ''}
        <p style="margin:0">Se desbloqueó el <strong>Módulo ${n + 1}: ${C.modules[n].title}</strong>. Tienes hasta el <strong>${fmt(deadline(n))}</strong> para terminarlo (8 días hábiles).</p>
        <div class="dv-row"><button class="dv-btn dv-btn-pri" data-act="close">Continuar</button></div>`; }
    if (md.type === 'final') h = `<div class="dv-celebrate">${ICON.award}</div><h2 class="dv-h1">¡Culminaste la formación!</h2>
        <p style="margin:0">Completaste los ${C.modules.length} módulos. Tu constancia ya está disponible.</p>
        <div class="dv-row"><button class="dv-btn dv-btn-pri" data-act="cert">${ICON.award} Ver certificado</button><button class="dv-btn" data-act="close">Cerrar</button></div>`;
    if (md.type === 'live') h = `<span class="dv-kicker">Sesión en vivo</span><h2 class="dv-h1">Hora de dudas con el capacitador</h2>
        <p style="margin:0">En la plataforma real este botón abre <strong>Google Meet</strong> con tu cuenta.</p>
        <div class="dv-okbox">${ICON.check} Asistencia registrada automáticamente: ${fmtFull(S.live)}</div>
        <p class="dv-muted" style="margin:0">Al terminar, la grabación queda en Drive y enlazada en el curso para consultarla cuando quieras. La asistencia alimenta el reporte para la interventoría.</p>
        <div class="dv-row"><button class="dv-btn dv-btn-pri" data-act="close">Entendido</button></div>`;
    if (md.type === 'ia') h = `<span class="dv-kicker">${ICON.spark} Asistente con IA</span><h2 class="dv-h1">${md.kind === 'resumen' ? 'Resumen del módulo' : 'Explicación con un ejemplo'}</h2>
        <div id="ia-out" class="dv-ia" data-text="${esc(md.text)}"></div>
        <p class="dv-muted" style="margin:0;font-size:13.5px">Respuesta de ejemplo. En la plataforma la genera Gemini a partir del contenido del módulo. La IA apoya el estudio: no califica ni reemplaza al capacitador (Anexo 14).</p>
        <div class="dv-row"><button class="dv-btn dv-btn-pri" data-act="close">Cerrar</button></div>`;
    if (md.type === 'about') h = `<span class="dv-kicker">Sobre la formación</span><h2 class="dv-h1">${C.name}</h2>
        <button class="dv-player" data-act="soon" aria-label="Video de presentación del capacitador">${ICON.play}<span style="font-weight:600">Video de presentación del capacitador</span></button>
        <p style="margin:0"><strong>Video de bienvenida del programa (SENA):</strong> primera actividad del Módulo 1, obligatoria al iniciar cada grupo.</p>
        <p style="margin:0"><strong>Objetivo:</strong> ${C.objetivo}</p><p style="margin:0"><strong>Duración:</strong> ${C.horas} horas · ${C.modules.length} módulos de máximo 8 días hábiles cada uno.</p>
        <div><strong>Resultados de aprendizaje</strong><ul style="margin:6px 0 0;padding-left:20px">${C.resultados.map(r => `<li>${r}</li>`).join('')}</ul></div>
        <div class="dv-row">${['Introducción', 'Índice de contenido', 'Glosario', 'Material complementario', 'Referencias'].map(x => `<button class="dv-chip" style="border:0;cursor:pointer" data-act="soon">${x}</button>`).join('')}</div>
        <div class="dv-row"><button class="dv-btn dv-btn-pri" data-act="close">Cerrar</button></div>`;
    return `<div class="dv-backdrop" data-act="closeBg"><div class="dv-card dv-modal dv-stack" role="dialog" aria-modal="true">${h}</div></div>`;
  }

  // ---------- Recorrido guiado ----------
  function steps() {
    return [
      { t: 'Inicio de sesión', h: 'Pulsa "Ingresar" o "Continuar con Google". No hace falta escribir nada.', done: S.view !== 'portada' || !!S.pol.at },
      { t: 'Autorizaciones del primer ingreso', h: 'Marca las tres autorizaciones que exige el SENA.', done: !!S.pol.at },
      { t: 'Perfil y caracterización', h: 'Elige departamento y escribe el municipio. La caracterización es opcional.', done: !!S.perfil },
      { t: 'Entrar a la formación', h: 'En "Mis formaciones", entra al curso de ejemplo.', done: S.seenCourse },
      { t: 'Bienvenida SENA y Módulo 1', h: 'Mira el video de bienvenida del SENA, firma el recibido del material y completa las actividades.', done: modDone(0) },
      { t: 'Desbloqueo del Módulo 2', h: 'Al terminar el Módulo 1 se abre el 2 con su plazo. Haz una actividad del Módulo 2.', done: modCount(1) > 0 },
      { t: 'Sesión en vivo', h: 'Pulsa "Unirse con Meet": la asistencia queda registrada.', done: !!S.live },
      { t: 'Asistente con IA', h: 'Pide un resumen del módulo o una explicación.', done: S.aiUsed },
      { t: 'Certificado', h: 'Completa los 4 módulos (o usa "Avanzar rápido") y abre la constancia.', done: S.certSeen }
    ];
  }
  function tour() {
    const st = steps(), cur = st.findIndex(s => !s.done), n = cur === -1 ? st.length : cur;
    if (S.tourMin) return `<button class="dv-tour-min" data-act="tour">Recorrido · paso ${Math.min(n + 1, st.length)} de ${st.length}</button>`;
    return `<aside class="dv-tour ${S.view === 'portada' ? 'left' : ''}" aria-label="Recorrido de la demo"><div class="dv-tour-h"><strong>Recorrido · ${T.name}</strong><button class="dv-x" data-act="tour" aria-label="Minimizar recorrido">–</button></div>
      <ol>${st.map((s, i) => `<li class="${s.done ? 'ok' : ''} ${i === cur ? 'now' : ''}"><span class="n">${s.done ? ICON.check : i + 1}</span><span><b>${s.t}</b>${i === cur ? `<br><span class="h">${s.h}</span>` : ''}</span></li>`).join('')}</ol>
      ${cur === -1 ? '<p style="margin:10px 0 0;color:#8fd19e;font-weight:600">¡Recorrido completo! Puedes reiniciar o probar otra opción.</p>' : ''}
      <div class="dv-tour-b"><button data-act="fast" title="Completa el módulo actual">Avanzar rápido</button><button data-act="reset">Reiniciar</button></div>
      <a class="dv-tour-back" href="../index.html">← Volver a las propuestas</a></aside>`;
  }

  // ---------- Acciones ----------
  let toastTimer;
  function toast(msg) {
    const host = document.getElementById('dv-toast-host');
    clearTimeout(toastTimer);
    host.innerHTML = msg ? `<div class="dv-toast" role="status">${msg}</div>` : '';
    if (msg) toastTimer = setTimeout(() => { host.innerHTML = ''; }, 3200);
  }
  function go(v) { S.view = v; S.modal = null; save(); render(); window.scrollTo(0, 0); }
  function openAct(m, a) {
    if (!unlocked(m)) return toast(`El Módulo ${m + 1} se habilita al completar el Módulo ${m}.`);
    S.cur = { m, a }; S.seenCourse = true; S.view = T.activityView || 'actividad'; S.modal = null; save(); render(); window.scrollTo(0, 0);
  }
  function onModuleDone(m) {
    if (!S.badges.includes(m)) S.badges.push(m);
    if (m + 1 < C.modules.length) { S.unlockedAt[m + 1] = S.unlockedAt[m + 1] || Date.now(); S.modal = { type: 'modulo', m }; }
    else S.modal = { type: 'final' };
  }
  function complete(m, a, msg) {
    const k = m + '-' + a, was = modDone(m);
    if (!S.done[k]) { S.done[k] = Date.now(); S.xp += 50; }
    if (!was && modDone(m)) onModuleDone(m);
    const n = T.afterComplete ? T.afterComplete(m, a, ctx()) : nextPendingInModule(m);
    if (n) { S.cur = n; S.view = T.activityView || 'actividad'; } else { S.cur = null; S.view = 'curso'; }
    save(); render(); window.scrollTo(0, 0);
    toast((T.badges ? '+50 XP · ' : '') + (msg || 'Actividad completada.'));
  }
  const val = id => (document.getElementById(id) || {}).value || '';
  const ACT = {
    login() { go(S.pol.at ? (S.perfil ? 'inicio' : 'perfil') : 'politicas'); },
    google() { ACT.login(); toast('En la plataforma real se abre la ventana de inicio de sesión de Google.'); },
    acceptPolicies() {
      if (!POL.every(([id]) => document.getElementById('pol-' + id).checked)) return toast('Debes aceptar las tres autorizaciones para continuar.');
      S.pol = { at: Date.now() }; go('perfil'); toast('Autorizaciones registradas con fecha y hora.');
    },
    saveProfile() {
      const p = { tel: val('pf-tel'), depto: val('pf-depto'), muni: val('pf-muni').trim(), etnia: val('pf-etnia'), disc: val('pf-disc'), vict: val('pf-vict') };
      if (!p.depto || !p.muni) return toast('Completa el departamento y el municipio.');
      S.perfil = p; go('inicio'); toast('Perfil guardado.');
    },
    go(m, a, el) { go(el.dataset.to); },
    openCourse() { S.seenCourse = true; if (T.activityView === 'curso') S.cur = S.cur || (allDone() ? null : firstPending()); go('curso'); },
    openModule(m) { if (!unlocked(m)) return toast(`El Módulo ${m + 1} se habilita al completar el Módulo ${m}.`); openAct(m, firstPendingIn(m)); },
    openAct(m, a) { openAct(m, a); },
    complete(m, a) { complete(m, a); },
    decl(m, a) { if (!document.getElementById('decl-ok').checked) return toast('Marca la casilla para firmar el registro.'); S.decl = Date.now(); complete(m, a, 'Registro firmado con fecha y hora.'); },
    play(m, a) { if (S.playing) return; S.playing = m + '-' + a; render(); setTimeout(() => { S.playing = null; complete(m, a, 'Video visto.'); }, 2600); },
    answer(m, a, el) { S.quiz[m + '-' + a] = +el.dataset.i; save(); render(); },
    forum(m, a) { const t = val('forum-text').trim(); if (t.length < 5) return toast('Escribe tu aporte antes de publicar.'); S.forum[m + '-' + a] = t; complete(m, a, 'Aporte publicado en el foro.'); },
    pickFile(m, a) { S.file[m + '-' + a] = `evidencia_${U.apellidos.toLowerCase()}_modulo${m + 1}.pdf`; save(); render(); },
    sendTask(m, a) { if (!S.file[m + '-' + a]) return toast('Primero selecciona el archivo.'); complete(m, a, 'Evidencia enviada al capacitador.'); },
    rate(m, a, el) { S.rating = +el.dataset.i; render(); },
    sendSurvey(m, a) { if (!S.rating) return toast('Elige una calificación de 1 a 5.'); complete(m, a, '¡Gracias por tu opinión!'); },
    next() { const n = nextAfter(S.cur); if (n) openAct(n.m, n.a); else go('curso'); },
    prev() { const p = prevBefore(S.cur); if (p) openAct(p.m, p.a); },
    live() { S.live = S.live || Date.now(); S.modal = { type: 'live' }; save(); render(); },
    ai(m, a, el) {
      const kind = el.dataset.kind || 'resumen', mod = S.cur ? S.cur.m : currentModule(), text = AI[kind](mod);
      S.aiUsed = true;
      if (T.inlineAI) S.aiInline = { kind, text }; else S.modal = { type: 'ia', kind, text };
      save(); render();
    },
    about() { S.modal = { type: 'about' }; render(); },
    cert() { if (!allDone()) return toast('La constancia se habilita al completar los 4 módulos. Usa "Avanzar rápido" en el recorrido.'); S.certSeen = true; go('certificado'); },
    print() { window.print(); },
    close() { S.modal = null; save(); render(); },
    closeBg(m, a, el, e) { if (e.target === el) ACT.close(); },
    soon() { toast('Esta sección no está incluida en la demo.'); },
    tour() { S.tourMin = !S.tourMin; save(); render(); },
    fast() {
      if (!S.pol.at) S.pol = { at: Date.now() };
      if (!S.perfil) S.perfil = { depto: 'Antioquia', muni: 'Medellín', tel: U.tel };
      S.seenCourse = true;
      if (allDone()) { S.certSeen = true; return go('certificado'); }
      const m = currentModule(), was = modDone(m);
      C.modules[m].acts.forEach((x, a) => { const k = m + '-' + a;
        if (!S.done[k]) { if (x.t === 'decl') S.decl = S.decl || Date.now(); if (x.t === 'task') S.file[k] = `evidencia_modulo${m + 1}.pdf`; if (x.t === 'forum') S.forum[k] = 'Aporte de ejemplo.'; S.done[k] = Date.now(); S.xp += 50; } });
      if (!was) onModuleDone(m);
      S.cur = T.activityView === 'curso' && !allDone() ? firstPending() : null; S.view = 'curso';
      save(); render(); window.scrollTo(0, 0);
    },
    reset() { S = fresh(); save(); render(); window.scrollTo(0, 0); toast('Demo reiniciada.'); }
  };

  // ---------- Render ----------
  const ctx = () => ({ S, C, U, ICON, esc, fmt, fmtFull, progress, isDone, modDone, modCount, unlocked, deadline, daysLeft, currentModule,
    firstPending, nextAfter, prevBefore, allDone, activity, liveDate, level });
  let lastTyped = '';
  function render() {
    const c = ctx(), app = document.getElementById('app');
    let main;
    if (S.view === 'portada') main = `<div class="dv-fixedwrap" id="fx"><div class="dv-fixed">${document.getElementById('tpl-portada').innerHTML}</div></div>`;
    else { const v = (T.views && T.views[S.view]) || VIEWS[S.view] || VIEWS.inicio; main = T.chrome(c, v(c)); }
    app.innerHTML = main + tour() + modal();
    fit();
    const out = document.getElementById('ia-out');
    if (out) { const text = out.dataset.text || '';
      if (text === lastTyped) out.textContent = text;
      else { lastTyped = text; let i = 0; const t = setInterval(() => { i += 3; out.textContent = text.slice(0, i); if (i >= text.length) clearInterval(t); }, 16); } }
  }
  function fit() {
    const fx = document.getElementById('fx'); if (!fx) return;
    const k = Math.min(1, window.innerWidth / 1440);
    fx.firstElementChild.style.transform = `scale(${k})`; fx.style.height = (900 * k) + 'px';
  }
  document.addEventListener('click', e => {
    const a = e.target.closest('a[href="#"]'); if (a) e.preventDefault();
    const el = e.target.closest('[data-act]'); if (!el) return;
    const fn = ACT[el.dataset.act]; if (!fn) return;
    if (el.dataset.act !== 'closeBg') e.preventDefault();
    fn(+el.dataset.m, +el.dataset.a, el, e);
  });
  document.addEventListener('submit', e => e.preventDefault());
  window.addEventListener('resize', fit);
  render();
})();
