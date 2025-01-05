export function sjekkAtFartIkkjeErOverMaks (fart:FartMaskinMal):number {
    let toppFart = fart.maks + fart.landskap + fart.arbeid - fart.krasj;
    return (fart.aktiv > toppFart) ? toppFart : -toppFart;
}

export function sjekkOmFartSkalRundasTilNull (fart:FartMaskinMal){
   // sett fart til null ved låge verdiar og nullar krasj friksjon
  if (fart.aktiv <= (fart.friksjon + fart.krasj) && fart.aktiv >= -(fart.friksjon + fart.krasj)) {
    return 0;
    fart.krasj = 0;
  } else{
    return fart.aktiv;
  }
}
export function sjekkOmTomForDrivstoff (fart:FartMaskinMal, last:LastMal):number{
  //returner straffe fart ved tom for drivstoff og aktivfart ikkje allerede er under straffefart
  return (last.leverer.includes('drivstoff') && last.laster.drivstoff.niva <= 0 && fart.aktiv > straffeFartVedTomForDrivstoff) ? straffeFartVedTomForDrivstoff : fart.aktiv;
}
export function hentFart (fart:FartMaskinMal, last:LastMal):number {
  fart.aktiv = sjekkAtFartIkkjeErOverMaks(fart);
  fart.aktiv = sjekkOmFartSkalRundasTilNull(fart);
  fart.aktiv = sjekkOmTomForDrivstoff(fart,last);
  return fart.aktiv;
}