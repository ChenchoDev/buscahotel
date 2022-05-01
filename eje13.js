//*********FORMULARIO****************
//Variables
let region = document.querySelector('#region')
let adulto = document.querySelector('#adulto')
let child = document.querySelector('#child')
let checkin = document.querySelector('#checkin')
let checkout = document.querySelector('#checkout')
let price = document.querySelector('#price')
let error = document.querySelector('#error')
let buscar = document.querySelector('#buscar')
buscar.className = 'btn btn-dark'
let resultado = document.querySelector('#resultado')
resultado.className = 'row row-cols-auto'
let tabla = document.querySelector('#tabla')

let td = document.querySelector('#td')


buscar.addEventListener('click', fvalida)

function fvalida() {
    console.log(region.value)
    console.log(child.value)
    console.log(checkin.value)
    console.log(checkout.value)

    if (region.value == '') {
        error.textContent = 'Campo requerido'
        error.className = 'alert alert-danger'
        region.className = 'invalid'
        region.focus();
        return false;
    } else {
        error.textContent = ''
        error.className = ''
        region.className = 'valid'
    }

    if (adulto.value == '') {
        adulto.value = 1
    }

    if (child.value == '') {
        child.value = 0
    }

    if (checkin.value == "") {
        error.textContent = 'La fecha de llegada es requerida'
        error.className = 'alert alert-danger'
        checkin.className = 'invalid'
        return false;
    } else {
        error.textContent = ''
        error.className = ''
        checkin.className = 'valid'
    }

    if (checkout.value == '') {
        error.textContent = 'La fecha de salida es requerida'
        error.className = 'alert alert-danger'
        checkout.className = 'invalid'
        return false;
    } else {
        error.textContent = ''
        error.className = ''
        checkout.className = 'valid'
    }

    fbuscaid();

}



function fbuscaid() {
    let url = 'https://booking-com.p.rapidapi.com/v1/hotels/locations?locale=es&name=' + region.value
    fetch(url, {
        method: 'GET',
        headers: {
            'X-RapidAPI-Host': 'booking-com.p.rapidapi.com',
            'X-RapidAPI-Key': '00aa47d390msh1eb31d1d90a8f7cp1ee233jsn31e9c519e447'
        }
    })

    .then(response => {
        return response.json();
    })

    .then(datos => {
        console.log(datos);
        fmostrarDatos(datos);
    })

    .catch(err => {
        console.error(err)
    });
}

function fmostrarDatos(datos) {
    resultado.innerHTML = ''

    const tabla = document.createElement('table');
    tabla.className = 'table table-hover'
    const thead = document.createElement('thead');
    const fila = document.createElement('tr');

    const imagen = document.createElement('th');
    imagen.textContent = ' Imagen ';
    const pais = document.createElement('th');
    pais.textContent = 'Pais';
    const etiqueta = document.createElement('th');
    etiqueta.textContent = 'Etiqueta';
    const tipoDestino = document.createElement('th');
    tipoDestino.textContent = 'Tipo destino';
    const numHoteles = document.createElement('th');
    numHoteles.textContent = 'Numero de hoteles';
    const verHoteles = document.createElement('th');
    verHoteles.textContent = 'Ver hoteles';

    fila.append(tipoDestino, imagen, pais, etiqueta, numHoteles);
    thead.append(fila);
    tabla.append(thead);
    resultado.append(tabla);

    for (let i in datos) {

        const f = document.createElement('tr');


        const fimagen = document.createElement('td');
        let img = document.createElement('img')
        img.src = datos[i].image_url
        fimagen.append(img)

        const fpais = document.createElement('td');
        fpais.textContent = datos[i].country

        const fetiqueta = document.createElement('td');
        fetiqueta.textContent = datos[i].label

        const fdestino = document.createElement('td');
        fdestino.textContent = datos[i].dest_type

        const fnumhoteles = document.createElement('td');
        fnumhoteles.textContent = datos[i].nr_hotels

        const fhoteles = document.createElement('td');


        const btnHoteles = document.createElement('input');
        btnHoteles.type = 'button';
        btnHoteles.value = 'Ver Hoteles'
        btnHoteles.className = 'btn btn-outline-info'
        btnHoteles.addEventListener('click', fdetalle);
        btnHoteles.id = datos[i].dest_id;

        fhoteles.append(btnHoteles);
        f.append(fdestino, fimagen, fpais, fetiqueta, fnumhoteles, fhoteles);
        tabla.append(f);
    }
}

function fdetalle(e) {
    console.log(e.target.id)
    console.log(e.target.parentNode.parentNode.firstChild.textContent)

    let url = 'https://booking-com.p.rapidapi.com/v1/hotels/search?checkout_date=' + checkout.value + '&units=metric&dest_id=' + e.target.id + '&dest_type=' + e.target.parentNode.parentNode.firstChild.textContent + '&locale=es&adults_number=' + adulto.value + '&order_by=popularity&filter_by_currency=EUR&checkin_date=' + checkin.value + '&room_number=1&children_number=2&page_number=0&children_ages=5%2C0&categories_filter_ids=class%3A%3A2%2Cclass%3A%3A4%2Cfree_cancellation%3A%3A1&include_adjacency=true'
    fetch(url, {
        method: 'GET',
        headers: {
            'X-RapidAPI-Host': 'booking-com.p.rapidapi.com',
            'X-RapidAPI-Key': '00aa47d390msh1eb31d1d90a8f7cp1ee233jsn31e9c519e447'
        }
    })

    .then(response => {
        return response.json();
    })

    .then(datos => {
        console.log(datos);
        fmostrarHoteles(datos);
    })

    .catch(err => {
        console.error(err)
    });
}

function fmostrarHoteles(datos) {
    resultado.innerHTML = ''
    for (let i of datos.result) {
        //console.log(i.hotel_name)
        let contenth = document.createElement('div')
        contenth.className = 'text-center'

        let col = document.createElement('div')
        col.className = 'col'

        let hotel = document.createElement('div')
        hotel.className = "card"
        hotel.style = 'width: 18rem;'

        contenth.append(col)
        col.append(hotel)
        resultado.append(contenth)

        let img = document.createElement('img')
        img.src = i.max_photo_url
        img.className = 'card-img-top'

        let nombreh = document.createElement('h3')
        nombreh.textContent = i.hotel_name

        let direccion = document.createElement('h5')
        direccion.textContent = i.address

        let city = document.createElement('h6')
        city.append('(' + i.city + ')')

        let price = document.createElement('p')
        price.append('Precio: ' + i.composite_price_breakdown.all_inclusive_amount.value + i.currency_code + '/noche')

        let visit = document.createElement('a')
        visit.href = i.url
        visit.textContent = 'Reservar'
        visit.target = '_blank'
        visit.className = 'btn btn-outline-primary'

        let descripcion = document.createElement('a')
        descripcion.id = i.hotel_id
        descripcion.textContent = 'Descripción'
        descripcion.className = 'btn btn-outline-primary'
        descripcion.addEventListener('click', fdescripcion)

        let review = document.createElement('a')
        review.href = '#'
        review.textContent = 'Review score: ' + i.review_score + ' "' + i.review_score_word + '"'
        review.id = i.hotel_id
            //review.addEventListener('click', freview)




        hotel.append(img, nombreh, direccion, city, price, review, descripcion, visit)

    }
}

function fdescripcion(e) {
    console.log(e.target.id)
    let url = 'https://booking-com.p.rapidapi.com/v1/hotels/description?hotel_id=' + e.target.id + '&locale=es'
    fetch(url, {
        method: 'GET',
        headers: {
            'X-RapidAPI-Host': 'booking-com.p.rapidapi.com',
            'X-RapidAPI-Key': '00aa47d390msh1eb31d1d90a8f7cp1ee233jsn31e9c519e447'
        }
    })

    .then(response => {
        return response.json();
    })

    .then(datos => {
        console.log(datos);
        fmostrarDescripcion(datos);
    })

    .catch(err => {
        console.error(err)
    });
}

function fmostrarDescripcion(datos) {
    alert(datos.description)
}

function freview(e) {
    console.log(e.target.id)
    let url = 'https://booking-com.p.rapidapi.com/v1/hotels/reviews?sort_type=SORT_MOST_RELEVANT&locale=es&hotel_id=' + e.target.id + '&language_filter=es%2Cen-gb&page_number=0&customer_type=solo_traveller%2Creview_category_group_of_friends'
    fetch(url, {
        method: 'GET',
        headers: {
            'X-RapidAPI-Host': 'booking-com.p.rapidapi.com',
            'X-RapidAPI-Key': '00aa47d390msh1eb31d1d90a8f7cp1ee233jsn31e9c519e447'
        }
    })

    .then(response => {
        return response.json();
    })

    .then(datos => {
        console.log(datos.result);
        fmostrarReview(datos);
    })

    .catch(err => {
        console.error(err)
    });
}

function fmostrarReview(datos) {

    for (let i of datos.result) {
        alert(`Fecha: ` + i.date +
            ` Titulo:` + i.title +
            ' Pros: ' + i.pros +
            ' Contras: ' + i.cons)
    }
}