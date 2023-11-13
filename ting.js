"use strict";
let ting = { ramme: document.createElement('canvas'), erEndra: true, liste: [] };
ting.lerret = ting.ramme.getContext("2d");

function lagTing(ny) {
  let id = 'ting' + ting.liste.length;
  ting[id] = new nyTing(ny, id);
  ting.liste.push(id);
}

//𝗻𝘆 𝘁𝗶𝗻𝗴⁡​
function nyTing(x, id) {
  //last inn data
  this.id = id;
  this.navn = orginalTing[x].navn;
  this.pos = orginalTing[x].pos;
  this.retning = orginalTing[x].retning;
  this.rute = orginalTing[x].rute;
  this.grafikk = orginalTing[x].grafikk;
  this.krasj = orginalTing[x].krasj;
  this.type = orginalTing[x].type;
  this.last = orginalTing[x].last;
  this.fart = orginalTing[x].fart;
  this.sving = orginalTing[x].sving;
  //oppdater posisjon fra rutekoordinat til pixel
  this.pos.midt.x = this.rute.x * pixel.ruteLengde;
  this.pos.midt.y = (this.rute.y * pixel.ruteLengde);
}

function teinAlleTing() {
  ting.ramme.height = skjerm.botn;
  ting.ramme.width = skjerm.hogre;
  for (let x = 0; x < ting.liste.length; x++) {
    teinTing(ting[ting.liste[x]])
  }
}
function teinTing(denne) {
  if (document.getElementById(denne.navn) instanceof HTMLImageElement) {//sjekker at bilde er tilgjendelig
    // lage eit midpunkt ved omderiningspunktet på ting

    ting.lerret.translate(denne.pos.midt.x, denne.pos.midt.y);//flytt fokus tilmidtpunkt
    ting.lerret.rotate(denne.pos.retning * Math.PI / 180);//roter verden liks som doning
    ting.lerret.translate(denne.pos.midt.x * -1, denne.pos.midt.y * -1);//flytt fokus til start


    //teiner ting
    ting.lerret.drawImage(document.getElementById(denne.navn),
      denne.pos.midt.x - denne.pos.bredde/2, denne.pos.midt.y - denne.pos.hoyde/2,//posisjon av tegning
      denne.pos.bredde, denne.pos.hoyde);// bredde og høyde på tegning
    
      ting.lerret.translate(denne.pos.midt.x, denne.pos.midt.y);//flytt fokus tilmidtpunkt
    ting.lerret.rotate(denne.pos.retning * Math.PI / 180 * -1);// roter verden tilbake
    ting.lerret.translate(denne.pos.midt.x * -1, denne.pos.midt.y * -1);//flytt fokus til start


    oppdaterTingPoisjonar(denne);

  } else {
    console.error(denne.navn + ' har ikkje bilde: ' + denne.aktivBakgrunn);
  }
}
//====================================================== oppdaterTingPoisjonar ======================================================================
function oppdaterTingPoisjonar(denne) {
  Object.keys(denne.krasj.punkt).forEach(punkt => { oppdaterTingPos(denne, denne.krasj.punkt[punkt])  });

  function oppdaterTingPos (denne, dette){
      dette.tx = denne.pos.midt.x + dette.dx * Math.cos((Math.PI / 180) * denne.retning.aktiv) + dette.dy * Math.sin((Math.PI / 180) * denne.retning.aktiv);
      dette.ty = denne.pos.midt.y + dette.dx * Math.sin((Math.PI / 180) * denne.retning.aktiv) + dette.dy * -1 * Math.cos((Math.PI / 180) * denne.retning.aktiv);
  }  
}