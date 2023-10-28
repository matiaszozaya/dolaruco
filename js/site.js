// Last Prices URL
var apiURL = 'https://dolarapi.com/v1/dolares';

// Global variables
var progress = 100;
var counter = 60;

// Fetch function
function getDolares() {
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

        $("#solidarioCompra").text("AR$ " + dolares.Oficial.compra);
        $("#solidarioVenta").text("AR$ " + dolares["Solidario (Turista)"].venta);
        $("#solidarioUpdate").text(dolares["Solidario (Turista)"].fechaActualizacion + " - " + dolares["Solidario (Turista)"].horaActualizacion);

        $("#mayoristaCompra").text("AR$ " + dolares.Mayorista.compra);
        $("#mayoristaVenta").text("AR$ " + dolares.Mayorista.venta);
        $("#mayoristaUpdate").text(dolares.Mayorista.fechaActualizacion + " - " + dolares.Mayorista.horaActualizacion);

        $(".spinner-border").addClass("d-none");
        $("#cards-wrapper").removeClass("d-none");

        console.log(dolares);
        console.log(counter);
    });
};
getDolares();

// Progress Bar & Fetch Reload
setInterval(function() {
    if(counter == 0) {
        progress = 100;
        counter = 60;
        getDolares()
    } else {
        $("#counter").text(counter);
        progress = progress -1.66;
        counter--;
    };

    $(".progress-bar").css("width", `${progress}` + "%");
    $(".progress-bar").attr("aria-valuenow", `${progress}`);
}, 1000);

// Keep Year Updated on Footer
$("#year").text(new Date().getFullYear());

// MAIN Height calc
$("main").css("min-height", "calc(100% - " + ($("header").height() + $("footer").height()) + "px)");

$(document).ready(function () {
    $(window).on("resize", function () {
        $("main").css("min-height", "calc(100% - " + ($("header").height() + $("footer").height()) + "px)");
    });
});