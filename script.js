var chart1 = Highcharts.chart('container1', {
    title: {
        text: 'Money Market'
    },
    xAxis: {
        title: {
            text: 'Real Money Balances'
        }
    },
    yAxis: {
        title: {
            text: 'Real Interest Rate'
        }
    },
    series: [{
        name: 'Real Money Supply',
        data: []
    }, {
        name: 'Real Money Demand',
        data: []
    }],

});


var initial_aC = 200;
var initial_T = 100;

var initial_aI = 200;
var initial_M = 1000;
var initial_G = 100;
var initial_P = 2;

var initial_aD = 100;
var initial_mpc = 0.75;
var initial_sLY = 1;
var initial_sLr = 100;
var initial_sIr = 25;





var chart1 = Highcharts.chart('container1', {
    title: {
        text: 'Money Market'
    },
    xAxis: {
        title: {
            text: 'Real Money Balances'
        }
    },
    yAxis: {
        title: {
            text: 'Real Interest Rate'
        }
    },
    series: [{
        name: 'Real Money Supply',
        data: [],
        lineWidth: 5,
    }, {
        name: 'Real Money Demand',
        data: [],
        lineWidth: 5,
    }]
});

var chart2 = Highcharts.chart('container2', {
    title: {
        text: 'Keynesian Cross'
    },
    xAxis: {
        title: {
            text: 'Real Output'
        }
    },
    yAxis: {
        title: {
            text: 'Planned Expenditure'
        }
    },
    series: [{
        name: 'Planned Expenditure',
        data: [],
        lineWidth: 5,
    }, {
        name: 'Actual Expenditure',
        data: [],
        lineWidth: 5,
    }]
});

var chart3 = Highcharts.chart('container3', {
    title: {
        text: 'IS-LM'
    },
    xAxis: {
        title: {
            text: 'Real Output'
        }
    },
    yAxis: {
        title: {
            text: 'Real interest rate'
        }
    },
    series: [{
        name: 'IS',
        data: [],
        lineWidth: 5,
    }, {
        name: 'LM',
        data: [],
        lineWidth: 5,
    }]
});









function money_supply(M, P) {
    var data_ms = [];

    for (var i = 0; i <= 40; i += 1) {  // here i is real interest rate
        const mp = M / P;
        data_ms.push([mp, i]);
    }

    return data_ms;
}

function money_demand(sLr, sLY, aD, mpc, T, aI, sIr, M, P, aC, G) {
    var data_md = [];
    var equation = mpc + "*(x-" + T + ")+" + aI + "-" + sIr + "*(" + sLY + "*x+" + aD + "-(" + M + "/" + P + "))/" + sLr + "+" + aC + "+" + G + "-x";
    var f = nerdamer.solveEquations(equation, 'x');

    // Calculate md for various values of i
    for (var i = 0; i <= 40; i += 0.1) {
        var md = sLY * f - sLr * i + aD;
        data_md.push([md, i]);
    }

    // Loop until md reaches 2000, with i fixed at 0
    for (var md = (sLY * f + aD); md <= 3000; md++) {
        data_md.push([md, 0]);
    }



    return data_md;
}

function planned_expenditure(mpc, T, aC, aI, G, sLY, aD, M, P, sLr, sIr) {
    var data_pe = [];

    for (var i = 0; i <= 3000; i += 1) {  // here i is output
        data_pe.push([i, mpc * (i - T) + aC - sIr * Math.max(0, (sLY * i + aD - M / P) / sLr) + aI + G]);
    }

    return data_pe;
}

function actual_expenditure() {
    var data_ae = [];
    for (var i = 0; i <= 3000; i += 1) {
        data_ae.push([i, i]);
    }

    return data_ae;
}

function isis(mpc, T, aC, G, sIr, aI) {
    var data_is = [];
    for (var i = 0; i <= 2500; i += 1) {  // here i is output
        var isisis = (- i + mpc * (i - T) + aC + aI + G) / sIr;
        data_is.push([i, isisis]);
    }

    return data_is;
}


function lmlm(sLY, aD, M, P, sLr) {
    var data_lm = [];
    for (var i = 0; i <= 2500; i += 1) {
        var lmlmlm = Math.max(0, (sLY * i + aD - M / P) / sLr);
        data_lm.push([i, lmlmlm]);
    }
    return data_lm;
}


function openNewPage() {
    window.open("details_page.html", "_blank");
}

function updateChart() {
    var M = parseFloat(document.getElementById("M").value);
    var P = parseFloat(document.getElementById("P").value);

    var sLY = parseFloat(document.getElementById("sLY").value);
    var sLr = parseFloat(document.getElementById("sLr").value);
    var aD = parseFloat(document.getElementById("aD").value);
    var mpc = parseFloat(document.getElementById("mpc").value);
    var T = parseFloat(document.getElementById("T").value);
    var aC = parseFloat(document.getElementById("aC").value);

    var aI = parseFloat(document.getElementById("aI").value);
    var G = parseFloat(document.getElementById("G").value);
    var sIr = parseFloat(document.getElementById("sIr").value);
    var data_ms = money_supply(M, P);
    var data_md = money_demand(sLr, sLY, aD, mpc, T, aI, sIr, M, P, aC, G);
    var data_pe = planned_expenditure(mpc, T, aC, aI, G, sLY, aD, M, P, sLr, sIr);
    var data_ae = actual_expenditure();
    var data_is = isis(mpc, T, aC, G, sIr, aI);
    var data_lm = lmlm(sLY, aD, M, P, sLr);


    data_ms = data_ms.map(point => [round(point[0], 2), round(point[1], 2)]);
    data_md = data_md.map(point => [round(point[0], 2), round(point[1], 2)]);
    data_pe = data_pe.map(point => [round(point[0], 2), round(point[1], 2)]);
    data_ae = data_ae.map(point => [round(point[0], 2), round(point[1], 2)]);
    data_is = data_is.map(point => [round(point[0], 2), round(point[1], 2)]);
    data_lm = data_lm.map(point => [round(point[0], 2), round(point[1], 2)]);

    chart1.series[0].setData(data_ms);
    chart1.series[1].setData(data_md);
    chart2.series[0].setData(data_pe);
    chart2.series[1].setData(data_ae);
    chart3.series[0].setData(data_is);
    chart3.series[1].setData(data_lm);












    function roundToDecimalPlaces(number, decimalPlaces) {
        const multiplier = Math.pow(10, decimalPlaces);
        return Math.round(number * multiplier) / multiplier;
    }


    var equation = mpc + "*(x-" + T + ")+" + aI + "-" + sIr + "*(" + sLY + "*x+" + aD + "-(" + M + "/" + P + "))/" + sLr + "+" + aC + "+" + G + "-x";
    var f = nerdamer.solveEquations(equation);
    var resultContainer = document.getElementById("intersectionKC");


    var equationmm = M + "/" + P + "-" + sLY + "*" + f[0] + "+" + sLr + "*x-" + aD;
    var f1 = nerdamer.solveEquations(equationmm);
    var resultContainer1 = document.getElementById("intersectionMM");



    if (f1[0].valueOf() < 0) {
        equation = mpc + "*(x-" + T + ")+" + aI + "+" + aC + "+" + G + "-x";
        f = nerdamer.solveEquations(equation);
        resultContainer = document.getElementById("intersectionKC");
    }


    resultContainer1.innerHTML = `<strong>Equilibrium Real Output:&nbsp;&nbsp;</strong> ${roundToDecimalPlaces(f[0].text('decimals'), 3)}&nbsp;
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<strong>
                    Equilibrium Real Interest Rate:&nbsp;&nbsp;</strong>${f1[0].valueOf() < 0 ? 0 : roundToDecimalPlaces(f1[0].text('decimals'), 3)}`;




}

document.getElementById("M").value = initial_M;
document.getElementById("P").value = initial_P;

document.getElementById("sLY").value = initial_sLY;
document.getElementById("sLr").value = initial_sLr;
document.getElementById("aD").value = initial_aD;
document.getElementById("mpc").value = initial_mpc;
document.getElementById("T").value = initial_T;
document.getElementById("aC").value = initial_aC;

document.getElementById("aI").value = initial_aI;
document.getElementById("G").value = initial_G;
document.getElementById("sIr").value = initial_sIr;

updateChart();

function round(number, decimals) {
    return Number(number.toFixed(decimals));
}
