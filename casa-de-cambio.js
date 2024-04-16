const BASE_URL = 'https://open.er-api.com/v6';

function obtenerCambios(base = 'EUR', fecha = 'latest') {
    return fetch(`${BASE_URL}/${fecha}/${base}`)
      .then((r) => r.json())
      .then((r) => r.rates);
}

function obtenerMonedas() {
   return obtenerCambios().then((r) => Object.keys(r));
}

function cargar() {
   obtenerMonedas().then((r) => {
      mostrarMonedas(r);
   });
}

function actualizar() {
   obtenerCambios(obtenerMonedaSeleccionada(), fecha = 'latest').then((r) => {
      mostrarCambios(r);
   });

}

function mostrarMonedas(monedas) {
   Object.values(monedas).forEach((r) => {
      const div = document.getElementById('monedas');
      const boton = document.createElement('a');
      boton.textContent = r;
      boton.dataset.moneda = r;
      boton.classList.add('list-group-item');
      boton.addEventListener('click', () => {
         $botonActivo = document.querySelector('.list-group-item.active');
         if ($botonActivo) {
            $botonActivo.classList.remove('active');
         }
         boton.classList.add('active');

         actualizar();
      });
      div.appendChild(boton);
   });
}

function mostrarCambios(cambios) {
   const $cambio = document.querySelector('#cambio tbody')
   $cambio.innerHTML = '';

   Object.keys(cambios).forEach((moneda) => {
      const tr = document.createElement('tr'); 
      const td = document.createElement('td');
      td.textContent = moneda;
      const td2 = document.createElement('td');
      td2.textContent = cambios[moneda];
      tr.appendChild(td);
      tr.appendChild(td2);
      $cambio.appendChild(tr);
   });
}

function obtenerMonedaSeleccionada() {
   $botonActivo = document.querySelector('.list-group-item.active');
   if ($botonActivo) {
      return $botonActivo.dataset.moneda;
   }
}

cargar();

//function mostrarCambios(cambios) {
//   const columnaCambios = document.getElementById('cambios');
//   if (columnaCambios.firstElementChild) {
//      columnaCambios.innerHTML = '';
//   }
//
//   cambiosKeys(cambios);
//   cambiosValues(cambios);
//}

//function cambiosValues(cambios) {
//   const ul = document.createElement('ul');
//   ul.classList.add('col', 'list-group');
//   Object.values(cambios).forEach((r) => {
//      const li = document.createElement('li');
//      li.textContent = r;
//      li.classList.add('list-group-item');
//      ul.appendChild(li);
//   });
//   
//   const columnaCambios = document.getElementById('cambios');
//   columnaCambios.appendChild(ul);
//}