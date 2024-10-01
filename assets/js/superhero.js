let btnBuscar = document.getElementById("buscarHero");
const apiKey = "e6f1095ed7d29af290c2b26b6a33a179";

btnBuscar.addEventListener("click", function(){
    let idHero = document.getElementById("idHero").value;
    if (!isNaN(idHero) && idHero > 0 && idHero.trim() != '') {
        numIdHero(idHero);
    } else {
        alert('Ingrese solo números');
    }
});

async function numIdHero(idHero) {
    try {
        const respuesta= await fetch('https://www.superheroapi.com/api.php/'+ apiKey +'/'+ idHero,);
        const datosHero = await respuesta.json();
        if (datosHero.respuesta === 'error') {
           console.log('Error al consultar la API: ' + datosHero.error);
        } else {
            mostrarInfoHero(datosHero);
        }
    } catch (error) {
        alert('Error al consultar la API: ' + error);
    }
}

function mostrarInfoHero(datosHero) {
    const hero = datosHero;
    const html = `
    <div class="container">
            <h5">SuperHero Encontrado</h5>
            <div class="card mb-3" style="max-width: 780px;">
                <div class="row g-0">
                    <div class="col-md-4">
                        <img src="${hero.image.url}" class="img-fluid rounded-start" alt="...">
                    </div>
                    <div class="col-md-8">
                        <div class="card-body">
                            <h5 class="card-title">nombre: ${hero.name}</h5>
                            <p class="card-text">Conexiones:${hero.connections["group-affiliation"]} </p>
                            <p class="card-text"><small class="text-body-secondary">Publicado por: ${hero.biography.publisher}</small></p>
                            <hr>
                            <p class="card-text"><small class="text-body-secondary">Ocupación: ${hero.work.occupation}</small></p>
                            <hr>
                            <p class="card-text"><small class="text-body-secondary">Primera Aparición:: ${hero.biography["first-appearance"]}</small></p>
                            <hr>
                            <p class="card-text"><small class="text-body-secondary">Altura: ${hero.appearance.height}</small></p>
                            <hr>
                            <p class="card-text"><small class="text-body-secondary">Peso: ${hero.appearance.weight}</small></p>
                            <hr>
                            <p class="card-text"><small class="text-body-secondary">Alianzas: ${hero.biography.aliases}</small></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
    document.getElementById('infoHero').innerHTML = html;
    MostrarGrafico(hero);
}

function MostrarGrafico(hero) {
    var chart = new CanvasJS.Chart("chartContainer", {
        theme: "light2", // "light1", "light2", "dark1", "dark2"
        exportEnabled: true,
        animationEnabled: true,
        title: {
            text: "Estadísticas de Poder para " + hero.name
        },
        data: [{
            type: "pie",
            startAngle: 25,
            toolTipContent: "<b>{label}</b>: {y}%",
            showInLegend: "true",
            legendText: "{label}",
            indexLabelFontSize: 16,
            indexLabel: "{label} - {y}%",
            dataPoints: [
                { label: "Fuerza", y: hero.powerstats.strength },
                { label: "Velocidad", y: hero.powerstats.speed },
                { label: "Durabilidad", y: hero.powerstats.durability },
                { label: "Inteligencia", y: hero.powerstats.intelligence },
                { label: "Poder", y: hero.powerstats.power }
            ]
        }]
    });
    chart.render();
}