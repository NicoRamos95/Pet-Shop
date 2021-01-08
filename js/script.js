fetch('https://apipetshop.herokuapp.com/api/articulos')
.then(respuesta => respuesta.json())
.then(data => { var data = data.response
        datos(data)}
);

function datos(data){
    var tarjetas = document.getElementById('tarjeta');
    if (document.getElementById('juguetes')) {
        var arr = data.filter(jueguetes => jueguetes.tipo == "Juguete")
        tarjeta(arr, tarjetas, arr.length)
    }
    else if (document.getElementById('medicamentos')) {
        var arr = data.filter(medicamentos => medicamentos.tipo == "Medicamento")
        tarjeta(arr, tarjetas, arr.length)
    }
    if (document.getElementById('inicio')) {
        var promo = data.filter(stock => stock.stock < 5)
        tarjeta(promo, tarjetas, 3)
    }
    if (localStorage.getItem('carrito')) {
        carrito = JSON.parse(localStorage.getItem('carrito'))
        pintarCarrito()
    }
}

const items = document.getElementById('items')
const footer = document.getElementById('footer')
const templateFooter = document.getElementById('template-footer').content
const templateCarrito = document.getElementById('template-carrito').content
const fragment = document.createDocumentFragment()

let carrito = {}

items.addEventListener('click', e => {
    btnAccion(e)
})


function tarjeta(data, id, cantidad) {
    var tarjeta = id
    console.log(data)
    for (var i=0; i < cantidad; i++) {
        
        // Estructura
        var card = document.createElement('div');
        card.classList.add('card', 'col-sm-3');
        card.innerHTML = `
            <div class="card-body cara titulo">
                <h5 class="card-title">${data[i].nombre}</h5>
                <a type="button" data-bs-toggle="modal" data-bs-target="#exampleModal">
                    <img class="img-fluid img-card" src="${data[i].imagen}" id="${data[i]._id}">
                </a>
                <h6 class="card-text stock">${data[i].stock <= 5 ? `Ultimas unidades` : " "}</h6>
                <p class="card-text m-2"><span>${data[i].precio}</span>$</p>
                <button class="btn btn-danger agregar-carrito" onclick="toast()" id="${data[i]._id}">Comprar</button>
            </div>`
        tarjeta.appendChild(card);
                    
        var cajas = document.getElementById(`${data[i]._id}`)
        cajas.addEventListener('click', (e) => {
            const idcaja = e.target.id
            data.map(item => {
                if (item._id == idcaja) {
                    document.getElementById('exampleModalLabel').innerHTML = `${item.nombre}`
                    document.getElementById('textoModal').innerHTML = `${item.descripcion}`
                }    
            })
        })
    }
    tarjeta.addEventListener('click', (e) => (comprarProducto(e)));   
}

function comprarProducto(e) {
    e.preventDefault();    
    if (e.target.classList.contains('agregar-carrito')) {
        crearCarrito(e.target.parentElement)
    }
}

function crearCarrito(objeto) {
    const producto = {
        id: objeto.querySelector('.agregar-carrito').id,
        title: objeto.querySelector('h5').textContent,
        precio: objeto.querySelector('span').textContent,
        img: objeto.querySelector('img').src,
        cantidad: 1
    }
    if (carrito.hasOwnProperty(producto.id)) {
        producto.cantidad = carrito[producto.id].cantidad + 1
    }
    carrito[producto.id] = {...producto}
    pintarCarrito()

}
function pintarCarrito() {
    items.innerHTML = ''
    Object.values(carrito).forEach(producto => {
        templateCarrito.querySelector('th').textContent = producto.title
        templateCarrito.querySelectorAll('td img' )[0].src = producto.img
        templateCarrito.querySelectorAll('td')[1].textContent = producto.cantidad
        templateCarrito.querySelector('.btn-info').dataset.id = producto.id
        templateCarrito.querySelector('.btn-danger').dataset.id = producto.id
        templateCarrito.querySelector('span').textContent = producto.cantidad * producto.precio

        const clone =templateCarrito.cloneNode(true)
        fragment.appendChild(clone)
    })
    items.appendChild(fragment)
    pintarFooter()

    localStorage.setItem('carrito',JSON.stringify(carrito))
}

function pintarFooter() {
    footer.innerHTML = ''
    if (Object.keys(carrito).length === 0) {
        footer.innerHTML = '<th scope="row" colspan="5">Carrito Vacio</th>'
        return
    }
    const nCantidad = Object.values(carrito).reduce((acc, {cantidad}) => acc + cantidad, 0)
    const nPrecio = Object.values(carrito).reduce((acc, {cantidad, precio}) => acc + cantidad * precio, 0)

    templateFooter.querySelectorAll('td')[0].textContent = nCantidad
    templateFooter.querySelector('span').textContent = nPrecio

    const clone = templateFooter.cloneNode(true)
    fragment.appendChild(clone)
    footer.appendChild(fragment)

    const btnVaciar = document.getElementById('vaciar-carrito')
    btnVaciar.addEventListener('click', () => {
        carrito = {}
        pintarCarrito()
    })
}

function btnAccion(e) {
    if (e.target.classList.contains('btn-info')) {
        const producto = carrito[e.target.dataset.id]
        producto.cantidad++
        carrito[e.target.dataset.id] = {...producto}
        pintarCarrito()
    }
    if (e.target.classList.contains('btn-danger')) {
        const producto = carrito[e.target.dataset.id]
        producto.cantidad--
        if (producto.cantidad == 0) {
            delete carrito[e.target.dataset.id]
        }
        pintarCarrito()
    }
}


function toast() {
    var toast = document.getElementById("snackbar");
    toast.className = "show";
    setTimeout(function(){ toast.className = toast.className.replace("show", ""); }, 1500);
  }

function openNav() {
    document.getElementById("mySidenav").style.width = "100%";
  }
function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
}

(function () {
    'use strict'
  
    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    var forms = document.querySelectorAll('.needs-validation')
  
    // Loop over them and prevent submission
    Array.prototype.slice.call(forms)
      .forEach(function (form) {
        form.addEventListener('submit', function (event) {
          if (!form.checkValidity()) {
            event.preventDefault()
            event.stopPropagation()
            console.log("aca")
          }
  
          form.classList.add('was-validated')
        }, false)
      })
  })()