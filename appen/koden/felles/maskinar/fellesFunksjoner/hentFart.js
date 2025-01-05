"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sjekkAtFartIkkjeErOverMaks = sjekkAtFartIkkjeErOverMaks;
exports.sjekkOmFartSkalRundasTilNull = sjekkOmFartSkalRundasTilNull;
exports.sjekkOmTomForDrivstoff = sjekkOmTomForDrivstoff;
exports.hentFart = hentFart;
function sjekkAtFartIkkjeErOverMaks(fart) {
    let toppFart = fart.maks + fart.landskap + fart.arbeid - fart.krasj;
    return (fart.aktiv > toppFart) ? toppFart : -toppFart;
}
function sjekkOmFartSkalRundasTilNull(fart) {
    // sett fart til null ved låge verdiar og nullar krasj friksjon
    if (fart.aktiv <= (fart.friksjon + fart.krasj) && fart.aktiv >= -(fart.friksjon + fart.krasj)) {
        return 0;
        fart.krasj = 0;
    }
    else {
        return fart.aktiv;
    }
}
function sjekkOmTomForDrivstoff(fart, last) {
    //returner straffe fart ved tom for drivstoff og aktivfart ikkje allerede er under straffefart
    return (last.leverer.includes('drivstoff') && last.laster.drivstoff.niva <= 0 && fart.aktiv > straffeFartVedTomForDrivstoff) ? straffeFartVedTomForDrivstoff : fart.aktiv;
}
function hentFart(fart, last) {
    fart.aktiv = sjekkAtFartIkkjeErOverMaks(fart);
    fart.aktiv = sjekkOmFartSkalRundasTilNull(fart);
    fart.aktiv = sjekkOmTomForDrivstoff(fart, last);
    return fart.aktiv;
}
