fetch('./js/data.json')
.then(respuesta => respuesta.json())
.then(data => { var data = data.response
    tarjeta(data)}
);

function tarjeta(data) {
    var tarjeta = document.getElementById('tarjeta');
    console.log(data)
    for (var i=0; i < cantidad; i++) {
        
         // Estructura
        var card = document.createElement('div');
        card.classList.add('card', 'col-sm-3');

        // Body
        var cardBodyF = document.createElement('div');
        cardBodyF.classList.add('card-body','cara');
            
        // Titulo
        var title = document.createElement('h5');
        title.classList.add('card-title');
        title.innerHTML = data[i].nombre

        //descripcion
        var desc = document.createElement('p')
        desc.classList.add('card-text')
        desc.innerHTML = data[i].descripcion

        // Imagen
        var imagen = document.createElement('img');
        imagen.classList.add('img-fluid','img-card');
        imagen.setAttribute('src', data[i].imagen);
        imagen.setAttribute('id', data[i]._id);

        // Link img
        var link = document.createElement('a')
        link.setAttribute('type', 'button')
        link.setAttribute('data-bs-toggle', 'modal')
        link.setAttribute('data-bs-target', '#exampleModal')

        // Stock
        var stock = document.createElement('h6');
        stock.classList.add('card-text','stock')
        stock.innerHTML = data[i].stock <= 5 ? `Ultimas unidades` : ""

        // Precio
        var precio = document.createElement('p');
        precio.classList.add('card-text','m-2');
        precio.innerHTML = "$" ;
        var precioN = document.createElement('span')
        precioN.innerHTML = data[i].precio

        // Boton
        var boton = document.createElement('button');
        boton.classList.add('btn', 'btn-danger','agregar-carrito');
        boton.textContent = 'Comprar';
        boton.setAttribute('onclick' , 'toast()')
        boton.setAttribute('id', data[i]._id)

        // Insertamos
        cardBodyF.appendChild(stock);
        cardBodyF.appendChild(link);
        link.appendChild(imagen)
        cardBodyF.appendChild(title);
        cardBodyF.appendChild(precio);
        precio.appendChild(precioN)
        cardBodyF.appendChild(boton);
        card.appendChild(cardBodyF);
        tarjeta.appendChild(card);
                    
        var cajas = document.getElementById(`${data[i]._id}`)
        cajas.addEventListener('click', (e) => {
            const idcaja = e.target.id
            console.log(idcaja)
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