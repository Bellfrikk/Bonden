"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const hentFart_1 = require("../../../../felles/maskinar/fellesFunksjoner/hentFart");
test('sjekk at samla fart ikkje er over maks for denne doningen', () => {
    const fart = { aktiv: 100, friksjon: 0.1, maks: 100, landskap: 10, arbeid: 5, krasj: 0, aks: 0.1, tyngde: 0.1 };
    expect((0, hentFart_1.sjekkAtFartIkkjeErOverMaks)(fart)).toBe(115);
});
test('sjekk om fart skal rundast til null nå den er under friksjonsveidiane', () => {
    const skalBliNull = { aktiv: 0.1, friksjon: 0.1, krasj: 0.1, maks: 100, landskap: 10, arbeid: 5, aks: 0.1, tyngde: 0.1 };
    const skalIkkjeBliNull = { aktiv: 1, friksjon: 0.1, krasj: 0.1, maks: 100, landskap: 10, arbeid: 5, aks: 0.1, tyngde: 0.1 };
    expect((0, hentFart_1.sjekkOmFartSkalRundasTilNull)(skalBliNull)).toBe(0);
    expect((0, hentFart_1.sjekkOmFartSkalRundasTilNull)(skalIkkjeBliNull)).toBe(1);
});
test('sjekk at fart bli redusert når drivstoffet er tomt', () => {
    const lastFull = { leverer: ['drivstoff'], mottar: [], laster: { drivstoff: { niva: 10 } } };
    const lastTom = { leverer: ['drivstoff'], mottar: [], laster: { drivstoff: { niva: 0 } } };
    const lastNegativ = { leverer: ['drivstoff'], mottar: [], laster: { drivstoff: { niva: -10 } } };
    const fart = { aktiv: 100, friksjon: 0.1, krasj: 0.1, maks: 100, landskap: 10, arbeid: 5, aks: 0.1, tyngde: 0.1 };
    expect((0, hentFart_1.sjekkOmTomForDrivstoff)(fart, lastFull)).toBe(100);
    expect((0, hentFart_1.sjekkOmTomForDrivstoff)(fart, lastTom)).toBe(straffeFartVedTomForDrivstoff);
    expect((0, hentFart_1.sjekkOmTomForDrivstoff)(fart, lastNegativ)).toBe(straffeFartVedTomForDrivstoff);
});
test('sjekk at rett fart blir henta', () => {
    const fartOverMaks = { aktiv: 130, maks: 100, landskap: 10, arbeid: 5, friksjon: 0.1, krasj: 0 };
    const fartUnderMaks = { aktiv: 30, maks: 100, landskap: 10, arbeid: 5, friksjon: 0.1, krasj: 0 };
    const fartCaNull = { aktiv: 0.2, maks: 100, landskap: 0, arbeid: 0, friksjon: 0.1, krasj: 0.3 };
    const lastFull = { leverer: ['drivstoff'], laster: { drivstoff: { niva: 10 } } };
    const lastTom = { leverer: ['drivstoff'], laster: { drivstoff: { niva: 0 } } };
    expect((0, hentFart_1.hentFart)(fartOverMaks, lastFull)).toBe(100);
    expect((0, hentFart_1.hentFart)(fartUnderMaks, lastFull)).toBe(15);
    expect((0, hentFart_1.hentFart)(fartCaNull, lastFull)).toBe(0);
    expect((0, hentFart_1.hentFart)(fartOverMaks, lastTom)).toBe(straffeFartVedTomForDrivstoff);
    expect((0, hentFart_1.hentFart)(fartCaNull, lastTom)).toBe(0);
});
