import { sjekkAtFartIkkjeErOverMaks, sjekkOmFartSkalRundasTilNull, sjekkOmTomForDrivstoff, hentFart } from '../../../felles/maskinar/fellesFunksjoner/hentFart';

test ('sjekk at samla fart ikkje er over maks for denne doningen', () => {
  const fart = { maks: 100, landskap: 10, arbeid: 5, krasj: 0 };
  expect(sjekkAtFartIkkjeErOverMaks(fart)).toBe(115);
});

test ('sjekk om fart skal rundast til null nå den er under friksjonsveidiane', () => {
  const skalBliNull = {aktiv: 1, friksjon: 0.1, krasj: 0.1};
  const skalIkkjeBliNull = {aktiv: 1, friksjon: 0.1, krasj: 0.1};
  expect(sjekkOmFartSkalRundasTilNull(skalBliNull)).toBe(0);
  expect(sjekkOmFartSkalRundasTilNull(skalIkkjeBliNull)).toBe(1);
});

test ('sjekk at fart bli redusert når drivstoffet er tomt', () => {
  const lastFull = {leverer: ['drivstoff'], laster: {drivstoff: {niva: 10}}};
  const lastTom = {leverer: ['drivstoff'], laster: {drivstoff: {niva: 0}}};
  const lastNegativ = {leverer: ['drivstoff'], laster: {drivstoff: {niva: -10}}};
  const fart = {aktiv: 100};
  expect(sjekkOmTomForDrivstoff(fart, last)).toBe(100);
  expect(sjekkOmTomForDrivstoff(fart, lastTom)).toBe(straffeFartVedTomForDrivstoff);
  expect(sjekkOmTomForDrivstoff(fart, lastNegativ)).toBe(straffeFartVedTomForDrivstoff);
  });

test ('sjekk at rett fart blir henta', () => {
  const fartOverMaks = { aktiv:130, maks: 100, landskap: 10, arbeid: 5, friksjon: 0.1, krasj: 0};
  const fartUnderMaks = { aktiv:30, maks: 100, landskap: 10, arbeid: 5, friksjon: 0.1, krasj: 0};
  const fartCaNull = { aktiv:0.2, maks: 100, landskap: 0, arbeid: 0, friksjon: 0.1, krasj: 0.3 };

  const lastFull = {leverer: ['drivstoff'], laster: {drivstoff: {niva: 10}}};
  const lastTom = {leverer: ['drivstoff'], laster: {drivstoff: {niva: 0}}};

  expect(hentFart(fartOverMaks, lastFull)).toBe(100);
  expect(hentFart(fartUnderMaks, lastFull)).toBe(15);
  expect(hentFart(fartCaNull, lastFull)).toBe(0);
  expect(hentFart(fartOverMaks, lastTom)).toBe(straffeFartVedTomForDrivstoff);
  expect(hentFart(fartCaNull, lastTom)).toBe(0);

});

