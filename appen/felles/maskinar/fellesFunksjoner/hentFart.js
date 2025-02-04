"use strict";
function sjekkAtFartIkkjeErOverMaks(fart, bonde) {
    console.log('maks aktiv ' + doning.fart.aktiv + 'maks: ' + doning.fart.maks + ' fart landskap: ' + doning.fart.landskap + ' arb: ' + doning.fart.arbeid + ' krasj: ' + doning.fart.krasj);
    let toppFart = bonde ? fart.maks : fart.maks + fart.landskap + fart.arbeid - fart.krasj;
    if (fart.aktiv > toppFart)
        return toppFart;
    else if (fart.aktiv < -toppFart)
        return -toppFart;
    else
        return fart.aktiv;
}
//module.exports = sjekkAtFartIkkjeErOverMaks;
function sjekkOmFartSkalRundasTilNull(fart) {
    // sett fart til null ved låge verdiar og nullar krasj friksjon
    console.log('runde aktiv ' + doning.fart.aktiv + 'maks: ' + doning.fart.maks + ' fart landskap: ' + doning.fart.landskap + ' arb: ' + doning.fart.arbeid + ' krasj: ' + doning.fart.krasj);
    if (fart.aktiv <= (fart.friksjon + fart.krasj) && fart.aktiv >= -(fart.friksjon + fart.krasj)) {
        return 0;
        fart.krasj = 0;
    }
    else {
        return fart.aktiv;
    }
    console.log('etter aktiv ' + doning.fart.aktiv + 'maks: ' + doning.fart.maks + ' fart landskap: ' + doning.fart.landskap + ' arb: ' + doning.fart.arbeid + ' krasj: ' + doning.fart.krasj);
}
//module.exports = sjekkOmFartSkalRundasTilNull;
function sjekkOmTomForDrivstoff(fartAktiv, drivstoffNiva, bonde) {
    //returner straffe fart ved tom for drivstoff og aktivfart ikkje allerede er under straffefart
    if (!bonde && drivstoffNiva <= 0 && fartAktiv > straffeFartVedTomForDrivstoff)
        return straffeFartVedTomForDrivstoff;
    if (!bonde && drivstoffNiva <= 0 && fartAktiv < -straffeFartVedTomForDrivstoff)
        return -straffeFartVedTomForDrivstoff;
    return fartAktiv;
}
//module.exports = sjekkOmTomForDrivstoff;
function hentFart(bonde, fart, drivstoffNiva) {
    fart.aktiv = sjekkAtFartIkkjeErOverMaks(fart, bonde);
    fart.aktiv = sjekkOmFartSkalRundasTilNull(fart);
    fart.aktiv = sjekkOmTomForDrivstoff(fart.aktiv, drivstoffNiva, bonde);
    return fart.aktiv;
}
//module.exports = hentFartTest;
