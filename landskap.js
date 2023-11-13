"use strict";
let landskap = { ramme: document.createElement('canvas'), erEndra: true, liste: [], hindring: [] };
landskap.lerret = landskap.ramme.getContext("2d");
let jorde = { ramme: document.createElement('canvas'), liste: [], vekseListe: {} };
jorde.lerret = jorde.ramme.getContext("2d");
jorde.ramme.height = skjerm.botn;
jorde.ramme.width = skjerm.hogre;


//====================================================== lage heile landskapet ======================================================================
function lagLandskap() {

  let nr = 0;
  //lag landskap
  for (let y = 0; y < kart.length; y++) {
    for (let x = 0; x < kart[y].length; x++, nr++) {
      //lag vanlige ruter
      var id = 'x' + x + 'y' + y;
      landskap[id] = new nyttLandskap(kart[y][x], x, y, id);
      //lag jorde
      if (kart[y][x] === 'jorde') {
        for (let y2 = 0; y2 < orginalJorde.antallJordeRuter; y2++) {
          for (let x2 = 0; x2 < orginalJorde.antallJordeRuter; x2++) {
            var id = 'x' + (x * orginalJorde.antallJordeRuter + x2) + 'y' + (y * orginalJorde.antallJordeRuter + y2);
            jorde[id] = new nyttJorde(x, y, x2, y2, id, 'orginal');
            jorde.liste.push(id);
          }
        }
      } else {
        landskap.liste.push(id);
      }
    }
  }
}
//====================================================== nyttLandskap ======================================================================

function nyttLandskap(type, x, y, id) {
  this.rute = [x, y];
  this.px = [];
  this.px[0] = x * pixel.ruteLengde;
  this.px[1] = y * pixel.ruteLengde;
  this.bredde = pixel.ruteLengde;
  this.hoyde = pixel.ruteLengde;

  if (type === 'veiHN' || type === 'veiVN' || type === 'veiOH' || type === 'veiVO' || type === 'veiVHN' || type === 'veiVOH' || type === 'veiOHN' || type === 'veiVON' || type === 'veiVOHN' || type === 'veiVH' || type === 'veiON') {
    nyRuteType(this, 'vei', 'orginal');
    this.aktivBakgrunn = type;
  } else {
    nyRuteType(this, type, 'orginal');
  }
  //Legg hindringer i krasj liste og lag hitboks
  if (orginalLandskap[this.type].hindring) {
    landskap.hindring.push(id);
    if (this.type === 'vatn') {
      this.pos = {
        fv: [this.px[0] + pixel.ruteLengde * 0.6, this.px[1]],
        fh: [this.px[0] + pixel.ruteLengde * 0.6, this.px[1] + pixel.ruteLengde],
        bh: [this.px[0], this.px[1] + pixel.ruteLengde],
        bv: [this.px[0], this.px[1]],
        rute: [x, y]
      }
    } else {
      this.pos = {
        fv: [this.px[0] + pixel.ruteLengde, this.px[1]],
        fh: [this.px[0] + pixel.ruteLengde, this.px[1] + pixel.ruteLengde],
        bh: [this.px[0], this.px[1] + pixel.ruteLengde],
        bv: [this.px[0], this.px[1]],
        rute: [x, y]
      }
    }
  }
}
//---------------------------------nyRuteType-----------------------------------
function nyRuteType(rute, type, retning) {
  rute.type = type;

  if (type === 'vei' || type === 'jorde') {
    rute.aktivBakgrunn = null;
  } else {
    rute.aktivBakgrunn = orginalLandskap[type].bakgrunn[Math.floor(Math.random() * orginalLandskap[type].bakgrunn.length)];
  }// visst type er vei så settet bakgrunn for seg
  rute.retning = (retning === 'orginal') ? orginalLandskap[type].retning[Math.floor(Math.random() * orginalLandskap[type].retning.length) - 1] : retning;// visst retnin g er 'orginal' så hent retning fra data, ellers bruk retning fra parameter
  rute.fart = orginalLandskap[type].fart;
  rute.arbeid = orginalLandskap[type].arbeid;
}



//====================================================== tein Landskap ======================================================================
function oppdaterLandskap() {
  landskap.ramme.height = skjerm.botn;
  landskap.ramme.width = skjerm.hogre;

  landskap.liste.forEach((ting, nr) => {
    teinRute(landskap[landskap.liste[nr]]);
  });
  jorde.liste.forEach((ting, nr) => {
    teinRute(jorde[jorde.liste[nr]]);
  });
  landskap.erEndra = false;


}


function teinRute(denne) {
  if (document.getElementById(denne.aktivBakgrunn) instanceof HTMLImageElement) {//sjekker at bilde er tilgjendelig
    // lage eit midpunkt ved omderiningspunkt
    let midtpunkt = [];
    if (denne.retning !== 0) {//bAre roter om nødvending
      midtpunkt[0] = denne.px[0] + denne.bredde / 2;
      midtpunkt[1] = denne.px[1] + denne.hoyde / 2;
      landskap.lerret.translate(midtpunkt[0], midtpunkt[1]);//flytt fokus tilmidtpunkt
      landskap.lerret.rotate(denne.retning * Math.PI / 180);//roter verden liks som rute retning
      landskap.lerret.translate(midtpunkt[0] * -1, midtpunkt[1] * -1);//flytt fokus til start}
    } 
    // tein rute
    landskap.lerret.drawImage(
      document.getElementById(denne.aktivBakgrunn),
      denne.px[0],
      denne.px[1],
      denne.bredde,
      denne.hoyde
    );
    if (denne.retning !== 0) { //roterer verden tilbake om nødvending
      landskap.lerret.translate(midtpunkt[0], midtpunkt[1]);//flytt fokus tilmidtpunkt
      landskap.lerret.rotate(denne.retning * Math.PI / 180 * -1);// roter verden tilbake
      landskap.lerret.translate(midtpunkt[0] * -1, midtpunkt[1] * -1);//flytt fokus til start
    }
  } else {
    console.error(denne.type + ' har ikkje bilde: ' + denne.aktivBakgrunn);
  }
}

//====================================================== nyttJorde ======================================================================
function nyttJorde(x, y, x2, y2, id, retning) {
  this.rute = [x * 10 + x2, y * 10 + y2];
  this.px = [];
  this.px[0] = (x * pixel.ruteLengde) + (x2 * pixel.ruteLengde / orginalJorde.antallJordeRuter);
  this.px[1] = (y * pixel.ruteLengde) + (y2 * pixel.ruteLengde / orginalJorde.antallJordeRuter);
  this.bredde = pixel.ruteLengde / orginalJorde.antallJordeRuter;
  this.hoyde = pixel.ruteLengde / orginalJorde.antallJordeRuter;
 // nyJordeType(this, 'dyrka', 'orginal');
 nyJordeType(this, 'ployd', 'orginal');

  flagg.nyJorde = true;
}
//---------------------------------------------- nyJordeType -------------------------------------
function nyJordeType(rute, type, retning) {
  rute.type = type;
  rute.aktivBakgrunn = orginalJorde[type].bakgrunn[Math.floor(Math.random() * orginalJorde[type].bakgrunn.length)];
  rute.arbeid = orginalJorde[type].arbeid;
  rute.veksing = orginalJorde[type].veksing;
  startVeksing(rute)
  teinRute(rute);
  flagg.nyJorde = true;

}




//====================================================== veksing ======================================================================
function lagVeksing() {
  orginalJorde.vekseListe.forEach(x => {
    jorde.vekseListe[x] = [];
  });
  setInterval(veksingLoop, orginalJorde.vekseintervall * 1000);
}
function startVeksing(denne) {
  if (denne.veksing === null) { return; }
  jorde.vekseListe[denne.type].push(denne);// legg jorde til i liste som skal vekse
  denne.veksing.tid = tid + denne.veksing.vekseTid;// sett tildspunkt for når jorde er ferdig vokse
}
function veksingLoop() {
  tid += orginalJorde.vekseintervall;
  orginalJorde.vekseListe.forEach(type => {//sjekk alle vekselister om dei er ferdig vokse
    if (jorde.vekseListe[type].length < 1) { return; }// sjekk om lista er tom

    let aktivJorde = jorde.vekseListe[type][0];
    if (aktivJorde.veksing !== null && aktivJorde.veksing.tid < tid) {// sjekk om den første ruta i lista nå er ferdig vekst
      nyJordeType(aktivJorde, aktivJorde.veksing.bliTil, aktivJorde.retning);//endre ruta
    }
    jorde.vekseListe[type].shift()//fjern ruta fra vekse lista, også om den ikkje lenger veks.

  });
}


//====================================================== arbeid ======================================================================

function arbeidPaRute() {
  if (doning.fart.aktiv < 0) {//Jobbe bare framover
    return;
  }
  if (doning.redskap.fram !== null && doning.redskap.fram.arbeid.aktiv) {//Sjekk om redskap er på
    sjekkOmRedskapArbeide(doning.redskap.fram);
  }
  if (doning.redskap.bak !== null && doning.redskap.bak.arbeid.aktiv) {//Sjekk om redskap er på
    sjekkOmRedskapArbeide(doning.redskap.bak);
  }

  function sjekkOmRedskapArbeide(denne) {
    let jordeBit = { px: [0, 0], rute: [0, 0], tmp: null };

    denne.bilde.arbeidspunkt.forEach(punkt => {
      let jordeBit = { px: [0, 0], rute: [0, 0], tmp: null };
      jordeBit.px[0] = denne.pos.px[0] - (punkt[0] * Math.cos(Math.PI / 180 * denne.retning.aktiv)) + (punkt[1] * Math.sin(Math.PI / 180 * denne.retning.aktiv));
      jordeBit.px[1] = denne.pos.px[1] - (punkt[0] * Math.sin(Math.PI / 180 * denne.retning.aktiv)) + (punkt[1] * -1 * Math.cos(Math.PI / 180 * denne.retning.aktiv));
      jordeBit.rute[0] = Math.floor(jordeBit.px[0] / (pixel.ruteLengde / orginalJorde.antallJordeRuter));
      jordeBit.rute[1] = Math.floor(jordeBit.px[1] / (pixel.ruteLengde / orginalJorde.antallJordeRuter));

      jordeBit.tmp = jorde['x' + jordeBit.rute[0] + 'y' + jordeBit.rute[1]];

      if (jordeBit.tmp !== undefined) {//Sjekk om jordebit finnst
        if (jordeBit.tmp.arbeid.aktivertAv.includes(denne.arbeid.type)) {
          if (denne.arbeid.type === 'plog') {
            arbeidPlog(jordeBit.tmp);
          } else if (denne.arbeid.type === 'samaskin') {
            arbeidSamaskin(jordeBit.tmp, denne);
          } else if (denne.arbeid.type === 'skurtreskar') {
            arbeidSkurtreskar(jordeBit.tmp, denne, punkt[3]); 
          }
        }
      }
    });
  }
}


//----------------------- arbeidPlog-------------------------
function arbeidPlog(denneJorde) {
  nyJordeType(denneJorde, 'ployd', vassLoddRett(doning.retning.aktiv));
}
//----------------------- arbeidSamaskin-------------------------
function arbeidSamaskin(denneJorde, denneRedskap) {
  if (denneRedskap.last.niva <= 0) { return; }
  nyJordeType(denneJorde, denneRedskap.last.blirTil[denneRedskap.last.type], vassLoddRett(doning.retning.aktiv));
  oppdaterLast(denneRedskap, 'bruk');
}
//----------------------- arbeidSkurtreskar-------------------------
function arbeidSkurtreskar(denneJorde, denneRedskap, side) {
  if (denneRedskap.last.niva >= doning.last.maks) { return; }
  oppdaterLast(doning, 'haust');
  flagg.topplinjeEndra;
  nyJordeType(denneJorde, side === 'midt' ? 'halm' : 'kornHausta', vassLoddRett(doning.retning.aktiv));

  oppdaterLast(doning, 'haust');
}