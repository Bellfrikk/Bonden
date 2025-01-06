function sjekkAtFartIkkjeErOverMaks (fart:FartMaskinMal):number {
    let toppFart = fart.maks + fart.landskap + fart.arbeid - fart.krasj;
    return (fart.aktiv > toppFart) ? toppFart : -toppFart;
}

function sjekkOmFartSkalRundasTilNull (fart:FartMaskinMal){
   // sett fart til null ved låge verdiar og nullar krasj friksjon
  if (fart.aktiv <= (fart.friksjon + fart.krasj) && fart.aktiv >= -(fart.friksjon + fart.krasj)) {
    return 0;
    fart.krasj = 0;
  } else{
    return fart.aktiv;
  }
}
function sjekkOmTomForDrivstoff (fartAktiv:number, drivstoffNiva:number):number{
  //returner straffe fart ved tom for drivstoff og aktivfart ikkje allerede er under straffefart
  return (drivstoffNiva <= 0 && fartAktiv > straffeFartVedTomForDrivstoff) ? straffeFartVedTomForDrivstoff : fartAktiv;
}
function hentFart (fart:FartMaskinMal, drivstoffNiva:number):number {
  fart.aktiv = sjekkAtFartIkkjeErOverMaks(fart);
  fart.aktiv = sjekkOmFartSkalRundasTilNull(fart);
  fart.aktiv = sjekkOmTomForDrivstoff(fart.aktiv,drivstoffNiva);
  return fart.aktiv;
}
