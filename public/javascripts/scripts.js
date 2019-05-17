const app = document.getElementById('root');

const container = document.createElement('div');
container.setAttribute('class', 'container');
app.appendChild(container);

const container2 = document.createElement('div');
container2.setAttribute('class', 'container');
app.appendChild(container2);

const container3 = document.createElement('div');
container3.setAttribute('class', 'container');
app.appendChild(container3);

const container4 = document.createElement('div');
container4.setAttribute('class', 'container');
container4.id = "container4";
app.appendChild(container4);

var request = new XMLHttpRequest();
request.open('GET', 'https://api.mercadolibre.com/sites', true);
request.onload = function () {
    var data = JSON.parse(this.response);
    if (request.status >= 200 && request.status < 400) {

        var siteList = document.createElement("select");
        siteList.id = "siteSelect";
        siteList.onchange = function () {
            getCategories(siteList.value)
        }
        const p1 = document.createElement('p');
        p1.textContent = "Seleccione Site";
        container.appendChild(p1);

        container.appendChild(siteList);

        var categoryList = document.createElement("select");
        categoryList.id = "categorySelect";

        const p2 = document.createElement('p');
        p2.textContent = "Seleccione Categoria";
        container.appendChild(p2);

        container.appendChild(categoryList);

        const p3 = document.createElement('p');
        p3.textContent = "Seleccione Filas ";
        container2.appendChild(p3);

        var fila = document.createElement("select");
        for (var i = 3; i < 6; i++) {
            var option = document.createElement("option");
            option.value = i;
            option.text = i;
            fila.appendChild(option);
        }


        container2.appendChild(fila);

        const p4 = document.createElement('p');
        p4.textContent = "Seleccione Columna ";
        container2.appendChild(p4);

        var colum = document.createElement("select");
        for (var i = 3; i < 6; i++) {
            var option = document.createElement("option");
            option.value = i;
            option.text = i;
            colum.appendChild(option);
        }

        container2.appendChild(colum);

        data.forEach(site => {
            if (site.id != 'MPT' && site.id != 'MCU')
        {
            var option = document.createElement("option");
            option.value = site.id;
            option.text = site.name;
            siteList.appendChild(option);
        }
        });

        const boton = document.createElement('button');
        boton.textContent = "Enviar Consulta";
        container3.appendChild(boton);
        //
        boton.onclick = function(){
            const list = document.getElementById("container4");
            while(list.firstChild){
                list.removeChild(list.firstChild);
            }
            let request3 = new XMLHttpRequest();
            if (categoryList.value == 'sin' ){
                var url = "https://api.mercadolibre.com/trends/" + siteList.value;
            }
            else{
                var url = "https://api.mercadolibre.com/trends/" + siteList.value + "/" + categoryList.value;
            }
            var col = colum.value;
            var fil = fila.value;
            console.log(categoryList.value)
            request3.open('GET', url, true);
            request3.onload = function () {
                var data = JSON.parse(this.response);
                if (request3.status >= 200 && request3.status < 400) {
                    var i = 1;
                    var valor = col*fil;
                    data.forEach(trend => {
                        if (i <= valor ){
                            const card = document.createElement('div');
                            card.setAttribute('class', 'card');
                            const h1 = document.createElement('h1');
                            h1.textContent = trend.keyword;

                            container4.appendChild(card);
                            card.appendChild(h1);
                            i = i + 1;
                        }

                    });
                }

            }

            request3.send();
        }

    } else {
        const errorMessage = document.createElement('marquee');
        errorMessage.textContent = "No funciona!";
        app.appendChild(errorMessage);
    }
}

request.send();

function getCategories(id) {
    let request = new XMLHttpRequest();
    var url = 'https://api.mercadolibre.com/sites/' + id;
    console.log(url)
    request.open('GET', url, true);
    request.onload = function () {
        var data = JSON.parse(this.response);
        if (request.status >= 200 && request.status < 400) {

            const list = document.getElementById("categorySelect");
            while(list.firstChild){
                list.removeChild(list.firstChild);
            }
            var option = document.createElement("option");
            option.value = "sin";
            option.text = "";
            list.appendChild(option);

            data.categories.forEach(category => {
                var option = document.createElement("option");
                option.value = category.id;
                option.text = category.name;
                list.appendChild(option);
        });

        }
    }
    request.send();
}


