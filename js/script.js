const form = document.getElementById('orderForm');
const confirmation = document.getElementById('confirmation');
const copyBtn = document.getElementById('copyBtn');
let latestSummary = '';
document.getElementById('year').textContent = new Date().getFullYear();
const dateInput = document.getElementById('date');
const now = new Date();
const localDate = new Date(now.getTime() - now.getTimezoneOffset()*60000).toISOString().slice(0,10);
dateInput.min = localDate;
dateInput.value = localDate;
document.getElementById('time').value = String(now.getHours()).padStart(2,'0') + ':' + String(Math.ceil(now.getMinutes()/5)*5 % 60).padStart(2,'0');
form.addEventListener('submit', function(event) {
  event.preventDefault();
  if (!form.reportValidity()) return;
  const d = new FormData(form);
  latestSummary = [
    'SOLICITUD DE PEDIDO — LA SAGRADA',
    'Nombre: ' + d.get('name'),
    'Teléfono: ' + d.get('phone'),
    'Cantidad: ' + d.get('quantity'),
    'Solicitud: ' + d.get('kind'),
    'Fecha: ' + d.get('date'),
    'Hora: ' + d.get('time'),
    'Modalidad: ' + d.get('delivery'),
    'Dirección: ' + (d.get('address') || 'No indicada'),
    'Detalles: ' + (d.get('notes') || 'Sin detalles'),
    '',
    'Pendiente de confirmar precio y disponibilidad.'
  ].join('\n');
  confirmation.textContent = 'Solicitud preparada. Aún no se ha enviado al negocio.\n\n' + latestSummary + '\n\nCopia este resumen y envíalo al contacto oficial del negocio para confirmar tu pedido.';
  confirmation.classList.add('show');
  copyBtn.style.display = 'block';
  confirmation.scrollIntoView({behavior:'smooth', block:'nearest'});
});
copyBtn.addEventListener('click', async function(){
  try { await navigator.clipboard.writeText(latestSummary); copyBtn.textContent = '¡Resumen copiado!'; }
  catch(e) { const area=document.createElement('textarea'); area.value=latestSummary; document.body.appendChild(area); area.select(); document.execCommand('copy'); area.remove(); copyBtn.textContent='¡Resumen copiado!'; }
});
