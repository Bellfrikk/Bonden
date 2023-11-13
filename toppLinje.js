
"use strict";

let topplinje = {
  ramme: document.createElement('canvas'), 

  ikonStr: 30,
  margin: 4,
  delbredde: 0,
  strek: [50, 12],
  strekMargin: 1,
  gronn: "#008800", gul: "#888800", rod: "#880000",
  liste: ['peng', 'drivstoff', 'framLast', 'bakLast'],
  peng: { aktiv: true, type: 'tekst', ikon: 'ikonPeng', niva: peng },
  drivstoff: { aktiv: true, niva: 0, ikon: 'ikonDrivstoff' },
  framLast: { aktiv: true, niva: 0, ikon: 'ikonLast' },
  bakLast: { aktiv: true, niva: 0, ikon: 'ikonLast' }
}  
topplinje.lerret = topplinje.ramme.getContext("2d");


function oppdaterTopplinje() {
  topplinje.ramme.height = skjerm.hoydeTopplinje;
  topplinje.ramme.width = skjerm.bredde;
  topplinje.delbredde = topplinje.ramme.width / topplinje.liste.length;


  //bakgrunn
  topplinje.lerret.moveTo(0, 0);
  topplinje.lerret.beginPath();
  topplinje.lerret.rect(0, 0, skjerm.bredde, skjerm.hoydeTopplinje);
  topplinje.lerret.fillStyle = '#000';
  topplinje.lerret.fill();

  teinNiva('peng', 0, peng)
  if (doning.drivstoff.niva !== null) { teinNiva('drivstoff', 1, doning.drivstoff.niva) }
  if (doning.redskap.fram !== null && doning.redskap.fram.last.niva !== null) { teinNiva('framLast', 2, doning.redskap.fram.last.niva) }
  if (doning.redskap.bak !== null && doning.redskap.bak.last.niva !== null) { teinNiva('bakLast', 3, doning.redskap.bak.last.niva) }
}

function teinNiva(ting, nr, niva) {
  //ikon
  topplinje.lerret.beginPath();
  topplinje.lerret.drawImage(document.getElementById(
    topplinje[ting].ikon), //ikon
    (topplinje.delbredde * nr) + topplinje.margin, //start X
    topplinje.margin, //start Y
    topplinje.ikonStr, //bredde
    topplinje.ikonStr); // hoyde
  //tekst
  topplinje.lerret.font = "20px Comic Sans MS";
  topplinje.lerret.fillStyle = '#FFF';
  topplinje.lerret.fillText(
      niva, //tekst
    (topplinje.delbredde * nr) + topplinje.margin + topplinje.ikonStr + topplinje.margin, //start X
    28);// start Y  
}

/*
/---strek
    } else if (topplinje[ting].type === 'strek') {
      topplinje.lerret.beginPath();
      topplinje.lerret.fillStyle = '#FFF';
      topplinje.lerret.rect(
        (topplinje.delbredde * nr) + topplinje.margin + topplinje.ikonStr + topplinje.margin - 1, //start X
        skjerm.hoydeTopplinje - topplinje.strek[1] * 1.5 - 1, //start Y
        topplinje.strek[0] + 2, // bredde
        topplinje.strek[1] + 2);// hoyde
        topplinje.lerret.fill();

      topplinje.lerret.beginPath();
      topplinje.lerret.fillStyle = '#222';
      topplinje.lerret.rect(
        (topplinje.delbredde * nr) + topplinje.margin + topplinje.ikonStr + topplinje.margin, // start X
        skjerm.hoydeTopplinje - topplinje.strek[1] * 1.5, // stert Y
        topplinje.strek[0], // bredde
        topplinje.strek[1]);// hoyde
        topplinje.lerret.fill();

      topplinje.lerret.beginPath();
      topplinje.lerret.fillStyle = '#722';
      topplinje.lerret.rect(
        (topplinje.delbredde * nr) + topplinje.margin + topplinje.ikonStr + topplinje.margin, // start X
        skjerm.hoydeTopplinje - topplinje.strek[1] * 1.5, // stert Y
        topplinje[ting].niva, // bredde
        topplinje.strek[1]);// hoyde
        topplinje.lerret.fill();
    }*/