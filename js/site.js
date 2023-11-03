// Keep Year Updated on Footer
$("#year").text(new Date().getFullYear());

// MAIN Height Calc
$("main").css("min-height", "calc(100% - " + ($("header").height() + $("footer").height()) + "px)");

// Document Ready
$(document).ready(function () {
    // MAIN Height Calc on Window Resize
    $(window).on("resize", function () {
        $("main").css("min-height", "calc(100% - " + ($("header").height() + $("footer").height()) + "px)");
    });
});

// Last Prices API URL
var apiURL = 'https://dolarapi.com/v1/dolares';
var apiCriptoURL = 'https://criptoya.com/api/binance/usdt/ars/1';

// Fetch function
function getDolares() {
    //Dolares Fiat
    let dolares = {};

    fetch(apiURL)
        .then(response => response.json())
        .then(data => {
            data.forEach(x => {
                dolares[x.nombre] = {};
                dolares[x.nombre].compra = x.compra;
                dolares[x.nombre].venta = x.venta;
                dolares[x.nombre].fechaActualizacion = new Date(x.fechaActualizacion).toLocaleDateString("es-AR");
                dolares[x.nombre].horaActualizacion = new Date(x.fechaActualizacion).toLocaleTimeString("es-AR");
            });

            //DOM Values Load
            $("#blueCompra").text("AR$ " + dolares.Blue.compra);
            $("#blueVenta").text("AR$ " + dolares.Blue.venta);
            $("#blueUpdate").text(dolares.Blue.fechaActualizacion + " - " + dolares.Blue.horaActualizacion);

            $("#oficialCompra").text("AR$ " + dolares.Oficial.compra);
            $("#oficialVenta").text("AR$ " + dolares.Oficial.venta);
            $("#oficialUpdate").text(dolares.Oficial.fechaActualizacion + " - " + dolares.Oficial.horaActualizacion);

            $("#bolsaCompra").text("AR$ " + dolares.Bolsa.compra);
            $("#bolsaVenta").text("AR$ " + dolares.Bolsa.venta);
            $("#bolsaUpdate").text(dolares.Bolsa.fechaActualizacion + " - " + dolares.Bolsa.horaActualizacion);

            $("#cclCompra").text("AR$ " + dolares["Contado con liquidación"].compra);
            $("#cclVenta").text("AR$ " + dolares["Contado con liquidación"].venta);
            $("#cclUpdate").text(dolares["Contado con liquidación"].fechaActualizacion + " - " + dolares["Contado con liquidación"].horaActualizacion);

            $("#mayoristaCompra").text("AR$ " + dolares.Mayorista.compra);
            $("#mayoristaVenta").text("AR$ " + dolares.Mayorista.venta);
            $("#mayoristaUpdate").text(dolares.Mayorista.fechaActualizacion + " - " + dolares.Mayorista.horaActualizacion);

            $("#main-spinner").addClass("d-none");
            $("#cards-wrapper").removeClass("d-none");

            console.log(dolares);
            console.log(counter);
        });
    
    // Dolares Crypto
    fetch(apiCriptoURL)
        .then(response => response.json())
        .then(data => {
            $("#criptoCompra").text("ARS$ " + data["totalBid"].toFixed(2));
            $("#criptoVenta").text("ARS$ " + data["totalAsk"].toFixed(2));
            $("#criptoUpdate").text(new Date().toLocaleDateString() + " - " + new Date().toLocaleTimeString() + " (Binance)");
        });
};
getDolares();

// Historical Values Chart
function getHistoricalValues() {
    fetch("https://api.bluelytics.com.ar/v2/evolution.json?days=180")
        .then(response => response.json())
        .then(data => {
            let dates = [];
            let values = [];
            let blueValues = data.filter(x => x.source == "Blue");

            blueValues.forEach(x => {
                dates.push(new Date(x["date"]).toLocaleDateString());
                values.push(x["value_sell"]);
            });

            dates.reverse();
            values.reverse();

            // Chart
            const dataLine = {
                type: 'line',
                data: {
                    labels: dates,
                    datasets: [
                        {
                            label: 'Dolar Blue - ARS$',
                            data: values,
                        },
                    ],
                },
            };

            new mdb.Chart(document.getElementById('dollar-blue-chart'), dataLine);

            $("#chart-spinner").addClass("d-none");
            $("#dollar-blue-chart").removeClass("d-none");
        });
};
getHistoricalValues();

// Progress Bar & Fetch Reload

var progress = 100;
var counter = 60;

setInterval(function () {
    if (counter == 0) {
        progress = 100;
        counter = 60;
        getDolares()
    } else {
        $("#counter").text(counter);
        progress = progress - 1.66;
        counter--;
    };

    $(".progress-bar").css("width", `${progress}` + "%");
    $(".progress-bar").attr("aria-valuenow", `${progress}`);
}, 1000);