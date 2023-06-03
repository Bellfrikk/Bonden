let drivstoffAutoFyllingLoop;
//====================================================== oppdaterDrivstoff ======================================================================
function oppdaterDrivstoff(hendelse) {
  var denne = ting[aktiv.doning];

  if (hendelse === "bruk") {
    denne.drivstoff--;
  } else if (hendelse === "aktiver") {
    knapp('aktiver', 'pumpeKnapp', 'oppdaterDrivstoff("startFylling")', false);
  } else if (hendelse === "deaktiver") {
    oppdaterDrivstoff('stoppFylling')
    knapp('deaktiver', 'pumpeKnapp', '', false);
  } else if (hendelse === "startFylling") {
    knapp("aktiver", "pumpeKnapp", 'oppdaterDrivstoff("stoppFylling")', true);

    drivstoffAutoFyllingLoop = setInterval(drivstoffAutoFylling, 50);
  } else if (hendelse === "fylling") {
    if (denne.drivstoff < denne.drivstoffMaks && oppdaterPeng(pris.drivstoff)) {
      denne.drivstoff++;
    }
  } else if (hendelse === "stoppFylling") {
    knapp("aktiver", "pumpeKnapp", 'oppdaterDrivstoff("startFylling")', false);
    clearInterval(drivstoffAutoFyllingLoop);
  }
  //sjekk om tom for drivstof
  if (denne.drivstoff <= 0) {
    denne.drivstoff = 0;
    oppdaterFart("tomTank");
  }
  //oppdater niva og farge pa linje for drivstoff
  niva.drivstoff = (denne.drivstoff / denne.drivstoffMaks) * nivaStrek.lengde;
  if (denne.drivstoff / denne.drivstoffMaks > 0.6) {
    nivaStrek.drivstoff = nivaStrek.gronn;
  } else if (denne.drivstoff / denne.drivstoffMaks > 0.3) {
    nivaStrek.drivstoff = nivaStrek.gul;
  } else {
    nivaStrek.drivstoff = nivaStrek.rod;
  }
  topplinje.tein();
}
function drivstoffAutoFylling() {
  oppdaterDrivstoff("fylling");
}

let lastAutoFyllingLoop;
//====================================================== oppdaterLast ======================================================================
function oppdaterLast(hendelse) {
  var denne = ting[aktiv.redskap];

  if (hendelse === "lastNivaPa") {
    if (denne.lastMaks !== null) {
      lastAktiv = true;
    }
  } else if (hendelse === "lastNivaAv") {
    lastAktiv = false;
  } else if (hendelse === "bruk") {
    denne.last--;
  } else if (hendelse === "aktiver") {
    knapp('aktiver', 'lastKnapp', 'oppdaterLast("startFylling")', false);
  } else if (hendelse === "deaktiver") {
    oppdaterLast('stoppFylling')
    knapp('deaktiver', 'lastKnapp', '', false);
  } else if (hendelse === "startFylling") {
    knapp("aktiver", "lastKnapp", 'oppdaterLast("stoppFylling")', true);

    lastAutoFyllingLoop = setInterval(lastAutoFylling, 50);
  } else if (hendelse === "fylling") {
    if (denne.last < denne.lastMaks) {
      denne.last++;
    }
  } else if (hendelse === "stoppFylling") {
    knapp("aktiver", "lastKnapp", 'oppdaterLast("startFylling")', false);
    clearInterval(drivstoffAutoFyllingLoop);
  }
  //sjekk om tom for drivstof
  // if (denne.last <= 0) {
  //   denne.last = 0;
  //   console.log('tom last');
  // }
  //oppdater nivå og farge på linje for drivstoff
  if (aktiv.redskap !== null) {
    niva.last = (denne.last / denne.lastMaks) * nivaStrek.lengde;
    if (denne.last / denne.lastMaks > 0.6) {
      nivaStrek.last = nivaStrek.gronn;
    } else if (denne.last / denne.lastMaks > 0.3) {
      nivaStrek.last = nivaStrek.gul;
    } else {
      nivaStrek.last = nivaStrek.rod;
    }
    topplinje.tein();
  }
}
function lastAutoFylling() {
  oppdaterLast("fylling");
}
//====================================================== oppdaterFart ======================================================================
function oppdaterFart(hendelse, nyFart) {

  if (flytting.fram) { flytting.framBak = flytting.framBak < flytting.toppfart ? flytting.framBak += flytting.akselerasjon : flytting.maksfart; }
  else if (flytting.bak) { flytting.framBak = flytting.framBak < flytting.toppfart*-1 ? flytting.framBak -= flytting.akselerasjon : flytting.maksfart*-1; }
  else { flytting.framBak = flytting.frambak < 0 ?  flytting.frambak -= flytting.friksjon : flytting.frambak += flytting.friksjon; }


  if (typeof nyFart == 'number') {
    if (typeof hendelse == 'string') {
      if (hendelse === "tomTank") {
        fart.tomTank = true;
      } else if (hendelse === "ikkjeTomTank") {
        fart.tomTank = false;
      } else if (hendelse === "landskap") {
        fart.landskap = nyFart;
      } else if (hendelse === "doning") {
        fart.doning = nyFart;
      } else if (hendelse === "redskap") {
        fart.redskap = nyFart;
      } else if (hendelse === "arbeid") {
        fart.arbeid = nyFart;
      }
      if (fart.tomTank) {
        fart.aktiv = 1;
      } else {
        fart.aktiv = fart.doning + fart.redskap + fart.landskap + fart.arbeid;
        console.log( "fart: aktiv " + fart.aktiv + " doning: " + fart.doning + " redskap: " + fart.redskap + " landskap" + fart.landskap + " arbeid" + fart.arbeid );
      }
      topplinje.tein();
    } else {
      console.log('FEIL FEIL FEIL: oppdaterFart - hendelse er ikkje gyldig string. ntfart:' + nyFart);
    }
  } else {
    console.log('FEIL FEIL FEIL: oppdaterFart - nyFart er ikkje gyldig nummer. Hendelse:' + hendelse);
  }
}

//====================================================== oppdaterArbeid ======================================================================
function oppdaterArbeid() {
  console.log("oppdatere arbeid");
}

//====================================================== oppdaterPeng ======================================================================
function oppdaterPeng(pris) {
  if (pris > peng) {
    alert("For lite mengar");
    return false;
  } else {
    peng -= pris;
    return true;
  }
}

//====================================================== sjekkOmByttaRute ======================================================================
let aktivHandlingRute = {doning: null, redskap:null};
function sjekkOmByttaRute() {
  let doning = ting[aktiv.doning];
  let doningLand = landskap[doning.aktivRute];
  // legg inn verdi om den er tom som ved oppstart
  if (aktivHandlingRute.doning === null) {
    aktivHandlingRute.doning = doning.aktivRute;
  }
  //sjekk om doning er på ny rute
  if (aktivHandlingRute.doning !== doning.aktivRute) {
    oppdaterDrivstoff("bruk");

    //stopp bensinfylling om doning var på bensinstasjonen før flytting
    if (landskap[aktivHandlingRute.doning].navn === 'bensinstasjon') {
      oppdaterDrivstoff('deaktiver')
    }
    //sjekk om doning er på ny type rute
    if (
      landskap[aktivHandlingRute.doning].navn !==
      doningLand.navn) {
      oppdaterFart('landskap', orginalLandskap[doningLand.navn].fart);
      if (doningLand.navn === 'bensinstasjon') {
        oppdaterDrivstoff('aktiver');
      }
    }
    aktivHandlingRute.doning = doning.aktivRute;//oppdater aktiv rute
  }

  //sjekk om det finnst redskap
  if (doning.aktivRedskap !== null) {
    let redskap = ting[aktiv.redskap];
    let redskapLand = orginalLandskap[landskap[redskap.aktivRute].navn];

    // legg inn verdi om den er tom som ved oppstart
    if (aktivHandlingRute.redskap === null) {
      aktivHandlingRute.redskap = redskap.aktivRute;
    }
    //sjekk om redskap er på ny rute
    if (aktivHandlingRute.redskap !== redskap.aktivRute) {
      //sjekk om redskap er på ny type rute
      // if (landskap[aktivHandlingRute.redskap].navn !== redskapLand.navn) {
      //rask type handling
      if (redskapLand.handling === 'rask') {
        if (redskapLand.aktivertAv === redskap.arbeid) {
          //aktiv redskap matcher med jorde
          oppdaterFart('arbeid', redskap.fartArbeid);
          nyRuteType(landskap[redskap.aktivRute], redskapLand.bliTil);
          console.log('raskt arbeid');
        } else {
          oppdaterFart('arbeid', 0);
        }
      }
    }
    aktivHandlingRute.redskap = redskap.aktivRute;//oppdater aktiv rute
    // }
  }
}
//====================================================== knapp ======================================================================

function knapp(hendelse, knapp, klikkFunksjon, aktiv) {
  if (hendelse === "aktiver") {
    document.getElementById(knapp).setAttribute("class", "aktivKnapp");
    document.getElementById(knapp).setAttribute("onclick", klikkFunksjon);
  } else if (hendelse === "deaktiver") {
    document.getElementById(knapp).setAttribute("class", "passivKnapp");
    document.getElementById(knapp).removeAttribute("onclick");
  }
  if (aktiv === true) {
    document.getElementById(knapp).style.borderColor = "#2d2";
  } else if (aktiv === false) {
    document.getElementById(knapp).style.borderColor = "#933";
  }
}
