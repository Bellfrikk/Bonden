"use strict";

let drivstoffAutoFyllingLoop;
let bensinsStasjonsRute;
//====================================================== oppdaterDrivstoff ======================================================================
function oppdaterDrivstoff(hendelse) {
  if(doning.type === 'bonde') { return;}
  if (hendelse === "bruk") {
    doning.drivstoff.niva--;
  } else if (hendelse === "deaktiver") {
    oppdaterDrivstoff('stoppFylling')
  } else if (hendelse === "startFylling") {
    bensinsStasjonsRute = doning.pos.rute;
    drivstoffAutoFyllingLoop = setInterval(drivstoffAutoFylling, 50);
  } else if (hendelse === "fylling") {
    if (doning.drivstoff.niva < doning.drivstoff.maks && oppdaterPeng(pris.drivstoff)) {
      doning.drivstoff.niva++;
    }
  } else if (hendelse === "stoppFylling") {
    clearInterval(drivstoffAutoFyllingLoop);
  } else {
    console.log('FEIL FEIL FEIL Drivstoff - hendelse finst ikkje.');
  }

  //sjekk om tom for drivstof
  if (doning.drivstoff.niva <= 0) {
    doning.fart.aktiv = doning.fart.maks * 0.3;
  }
  /*
  //oppdater nivå og farge på linje for drivstoff
  niva.drivstoff = (doning.drivstoff.niva / doning.drivstoff.maks) * nivaStrek.lengde;
  if (doning.drivstoff.niva / doning.drivstoff.maks > 0.6) {
    nivaStrek.drivstoff = nivaStrek.gronn;
  } else if (doning.drivstoff.niva / doning.drivstoff.maks > 0.3) {
    nivaStrek.drivstoff = nivaStrek.gul;
  } else {
    nivaStrek.drivstoff = nivaStrek.rod;
  } */
  flagg.topplinjeEndra = true;
}
function drivstoffAutoFylling() {
  const bensinpos = 0;// fiks
  if ( doning.pos.rute[0] !== bensinsStasjonsRute[0] || doning.pos.rute[1] !== bensinsStasjonsRute[1] ) {
    oppdaterDrivstoff( 'deaktiver');
  }else {
    oppdaterDrivstoff( "fylling");
  }
}

let lastAutoFyllingLoop;
//====================================================== oppdaterLast ======================================================================
function oppdaterLast(denne, hendelse, lastFra) {

  if (hendelse === "bruk") {
    denne.last.niva--;
    if(denne.last.niva === 0) {denne.last.type = null;}
    oppdaterLastAnimasjon(denne);
  } else if (hendelse === "haust") {
      if(denne.last.niva + 1 >= denne.last.maks) { 
       return false 
      } else {
        denne.last.niva++;
        oppdaterLastAnimasjon(denne);
        return true;
      }
  } else if (hendelse === "startFylling") {
    if(denne.last.mottar.includes(lastFra.last.type) && ///kva for redskap gjelder dette
    (denne.last.type === lastFra.last.type || denne.last.type === null)) {
      lastAutoFyllingLoop = setInterval(lastAutoFylling(denne, lastFra), 50);
      denne.last.type = lastFra.last.type;
    }
  } else if (hendelse === "fylling") {
    if ((denne.last.niva < denne.last.maks) && (lastFra.last.niva > 0)) {
      denne.last.niva++;
      lastFra.last.niva--;
      oppdaterLastAnimasjon(denne);
    }
  } else if (hendelse === "stoppFylling") {
    clearInterval(drivstoffAutoFyllingLoop);
    return;
  }

flagg.topplinjeEndra = true;  
}
function lastAutoFylling(denne, lastFra) {
  oppdaterLast(denne, "fylling", lastFra);
  oppdaterLastAnimasjon(denne);
}
//====================================================== oppdaterFart ======================================================================
// doning fart = aks - landskap friksjon og redskap friksjon
function oppdaterFart( hendelse) {
    //----justering av fart----
  if ( hendelse === "framKnapp") { 
    doning.fart.aktiv +=  doning.fart.aks; 
  }else if (hendelse === "bakKnapp" ) { 
    doning.fart.aktiv -= doning.fart.aks; 
  }else if (hendelse === "trill" ) { 
    doning.fart.aktiv += doning.fart.aktiv > 0 ? -doning.fart.friksjon : doning.fart.friksjon; 
    //----oppdatering av fart----
  }else if (hendelse === "landskap" ) {
  doning.fart.landskap = (landskap['x' + doning.pos.rute[0] + 'y' + doning.pos.rute[1]].fart);//friksjon fra landskap
  }else if (hendelse === "arbeid" ) {
    doning.fart.arbeid = 0;
    if(doning.redskap.fram !== null) {doning.fart.arbeid += doning.redskap.fram.arbeid.aktiv  ? doning.redskap.fram.fart.arbeid : doning.redskap.fram.fart.vanlig;}
    if(doning.redskap.bak !== null) {doning.fart.arbeid += doning.redskap.bak.arbeid.aktiv  ? doning.redskap.bak.fart.arbeid : doning.redskap.bak.fart.vanlig;}
    //----hent fart----
  }else if (hendelse === "hentFart" ) {
    //sjekk at farten ikke er over maks
    let samlaFart = doning.fart.maks + doning.fart.landskap + doning.fart.arbeid;
    if (doning.fart.aktiv > samlaFart) {
      doning.fart.aktiv = samlaFart;
    }else if (doning.fart.aktiv < -samlaFart) {
      doning.fart.aktiv = -samlaFart;
    }
    // sett fart til null ved låge verdiar
    if (doning.fart.aktiv <= doning.fart.friksjon && doning.fart.aktiv >=  -doning.fart.friksjon) {
      doning.fart.aktiv = 0;
    }
    return doning.fart.aktiv;
  }
}

//====================================================== oppdaterPeng ======================================================================
function oppdaterPeng(pris) {

//test
  if (pris > peng) {
    alert("For lite mengar");
    return false;
  } else {
    peng -= pris;
    return true;
  }
  flagg.topplinjeEndra = true;
}

//====================================================== knapp ======================================================================

function endreKnapp(hendelse, knapp) {

  if (hendelse === "vis") {
    knappar[knapp].vis = true;  
  } else if (hendelse === "fjern") {
    knappar[knapp].vis = false;  

  } else if (hendelse === "visAktiv") {
    knappar[knapp].visAktiv = true;  
  } else if (hendelse === "visPassiv") {
    knappar[knapp].visAktiv = false;  
  }

}
//====================================================== Zoom ======================================================================

function oppdaterZoom(denne) {
}
//-------vassLoddRett--------returnerer 0 eller 90 basert på retning variabel
function vassLoddRett(retning) {
  if((retning >= 0 && retning < 45)   ||
     (retning > 135 && retning < 225) ||
     (retning > 315 && retning <= 360)) {
      return 0;
     } else {
      return 90;
     }
}
//====================================================== lerretStorleik ======================================================================

function lerretStorleik(ramme, topp, botn, venstre, hogre, bredde, hoyde) {
  ramme.style.position = 'absolute';
  if (topp !== null) { ramme.style.top = topp + 'px'; }
  if (botn !== null) { ramme.style.bottom = botn + 'px'; }
  if (venstre !== null) { ramme.style.left = venstre + 'px'; }
  if (hogre !== null) { ramme.style.right = hogre + 'px'; }
  if (bredde !== null) { ramme.style.width = bredde + 'px'; }
  if (hoyde !== null) { ramme.style.height = hoyde + 'px'; }
}