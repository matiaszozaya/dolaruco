// Last Prices URL
var apiURL = 'https://api.bluelytics.com.ar/v2/latest';
// How many days to fetch
var days = '10';
// Past Prices URL
var pastPricesURL = 'https://api.bluelytics.com.ar/v2/evolution.json?days=' + days;

async function getDolar(todayURL, yesterdayURL) {
    // Last Prices Fetch
    const response1 = await fetch(todayURL);
    var todayData = await response1.json();

    // Historic Prices Fetch
    const response2 = await fetch(yesterdayURL);
    var pastData = await response2.json();

    // Last Price Info Load
    $("#blueC").html("<span class='text-danger'>" + todayData.blue.value_buy + " (Compra)</span>");
    $("#blueV").html("<span class='text-success'>" + todayData.blue.value_sell + " (Venta)</span>");
    $("#blueAvg").html(todayData.blue.value_avg);

    // Last Update Date
    var lastDate = new Date(todayData.last_update).toLocaleDateString('es-AR');
    var lastTime = new Date(todayData.last_update).toLocaleTimeString('es-AR');
    $("#lastUpdate").html(`<i class="fas fa-calendar mx-2"></i>` + lastDate + `<i class="fas fa-clock mx-2"></i>` + lastTime);

    // Price % Variation Span
    var pVariationAvg = document.getElementById('priceAvgVariation');
    
    // Last Prices
    var priceTodayBuy = todayData.blue.value_buy;
    var priceTodaySell = todayData.blue.value_sell;
    var priceTodayAvg = (priceTodayBuy + priceTodaySell) / 2;

    // Yesterday Prices
    var priceYesterdayBuy = pastData[3].value_sell;
    var priceYesterdaySell = pastData[3].value_sell;
    var priceYesterdayAvg = (priceYesterdayBuy + priceYesterdaySell) / 2;

    // Price % Variation Calculation
    var avgVariation = (priceTodayAvg - priceYesterdayAvg) / priceTodayAvg * 100;
    avgVariation = avgVariation.toFixed(2);

    // Price % Variation Print
    if (priceYesterdayAvg == priceTodayAvg) {
        pVariationAvg.innerHTML = `<i class="fas fa-minus-circle mr-2"></i> ` + avgVariation + "%";
        $("#priceAvgVariation").addClass("text-muted");
        console.log("Yesterday Avg: $" + priceYesterdayAvg);
        console.log("Today Avg: $" + priceTodayAvg);
    } else if (priceYesterdayAvg < priceTodayAvg) {
        pVariationAvg.innerHTML = `<i class="fas fa-chevron-circle-up mr-2"></i> ` + avgVariation + "%";
        $("#priceAvgVariation").addClass("text-success");
        console.log("Yesterday Avg: $" + priceYesterdayAvg);
        console.log("Today Avg: $" + priceTodayAvg);
    } else if (priceYesterdayAvg > priceTodayAvg) {
        pVariationAvg.innerHTML = `<i class="fas fa-chevron-circle-down mr-2"></i> ` + avgVariation + "%";
        $("#priceAvgVariation").addClass("text-danger");
        console.log("Yesterday Avg: $" + priceYesterdayAvg);
        console.log("Today Avg: $" + priceTodayAvg);
    }

    // Transaction Modal Prices Select
    $("#tModalBuyValue").attr("value", todayData.blue.value_buy);
    $("#tModalBuyValue").html("AR$" + todayData.blue.value_buy + " (Compra)");

    $("#tModalAverageValue").attr("value", todayData.blue.value_avg);
    $("#tModalAverageValue").html("AR$" + todayData.blue.value_avg + " (Promedio)");

    $("#tModalSellValue").attr("value", todayData.blue.value_sell);
    $("#tModalSellValue").html("AR$" + todayData.blue.value_sell + " (Venta)");
}

getDolar(apiURL, pastPricesURL)
    .then((data) => {
        // Spinner hiding
        $(".spinner-border").addClass("d-none");
        $(".spinner-grow").addClass("d-none");
        $("#blueAvgContainer").removeClass("d-none");
    });

// Transaction Calculator
function tCalc (amount, price) {
    amount = $('#buyUsdAmount').val();
    price = $('#buyUsdPrice').val();
    var result = (amount * price).toLocaleString();

    if (amount != null && amount >= 1) {
        $("#buyResult").html(`Deberás pagar <span class="text-primary">ARS$ ${result}</span> por los <span class="text-success">USD$ ${amount}</span>`);
    } else {
        $("#buyResult").html(`<span class="text-danger">Datos incorrectos.</span> Inténtelo nuevamente.`);
    }
};