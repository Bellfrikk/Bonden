"use strict";
let topplinje = {
    ikonStr: 30,
    margin: 4,
    delbredde: 0,
    strek: [50, 12],
    strekMargin: 1,
    gronn: "#008800", gul: "#888800", rod: "#880000",
    liste: ['peng', 'drivstoff', 'framLast', 'doningLast', 'bakLast'],
    peng: { aktiv: true, type: 'tekst', ikon: 'ikonPeng', niva: peng },
    drivstoff: { aktiv: true, niva: 0, ikon: 'ikonDrivstoff' },
    framLast: { aktiv: true, niva: 0, ikon: 'ikonLast' },
    doningLast: { aktiv: true, niva: 0, ikon: 'ikonLast' },
    bakLast: { aktiv: true, niva: 0, ikon: 'ikonLast' }
};
function oppdaterTopplinje() {
    ramme.topplinje.height = skjerm.hoydeTopplinje;
    ramme.topplinje.width = skjerm.bredde;
    topplinje.delbredde = ramme.topplinje.width / topplinje.liste.length;
    //bakgrunn
    lerret.topplinje.moveTo(0, 0);
    lerret.topplinje.beginPath();
    lerret.topplinje.rect(0, 0, skjerm.bredde, skjerm.hoydeTopplinje);
    lerret.topplinje.fillStyle = '#000';
    lerret.topplinje.fill();
    teinNiva('peng', 0, peng);
    if (doning.last.mottar.includes('drivstoff')) {
        teinNiva('drivstoff', 1, doning.last.laster.drivstoff.niva);
    }
    if (doning.redskap.fram !== null && doning.redskap.fram.last.valgtLast !== null && doning.redskap.fram.last.valgtLast.visNiva) {
        teinNiva('framLast', 2, doning.redskap.fram.last.valgtLast.niva);
    }
    if (doning.last.valgtLast !== undefined && doning.last.valgtLast !== null && doning.last.valgtLast.visNiva) {
        teinNiva('doningLast', 3, doning.last.valgtLast.niva);
    }
    if (doning.redskap.bak !== null && doning.redskap.bak.last.valgtLast !== null && doning.redskap.bak.last.valgtLast.visNiva) {
        teinNiva('bakLast', 4, doning.redskap.bak.last.valgtLast.niva);
    }
}
function teinNiva(ting, nr, niva) {
    //ikon
    lerret.topplinje.beginPath();
    lerret.topplinje.drawImage(document.getElementById(topplinje[ting].ikon), //ikon
    (topplinje.delbredde * nr) + topplinje.margin, //start X
    topplinje.margin, //start Y
    topplinje.ikonStr, //bredde
    topplinje.ikonStr); // hoyde
    //tekst
    lerret.topplinje.font = "20px Rubik Mono One";
    let farge = '#FFF';
    if (ting === 'drivstoff' && niva < 20) {
        farge = '#F00';
    }
    lerret.topplinje.fillStyle = farge;
    lerret.topplinje.fillText(Math.floor(niva), //tekst
    (topplinje.delbredde * nr) + topplinje.margin + topplinje.ikonStr + topplinje.margin, //start X
    28); // start Y  
}
