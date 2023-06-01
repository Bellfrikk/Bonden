const toppLinjeHoyde = 40;
const toppLinjeIkon = 30;
const pixel = {
  ruterX: 20,
  ruterY: 19,
  ruteLengde: 80,
  top: 0,
  venstre: 0,
  hogre: 0,
  botn: 0,
  startX: 0,
  startY: 0,
  verdenX: 0,
  verdenY: 0,
};
pixel.top = toppLinjeHoyde;
pixel.hogre = pixel.ruteLengde * pixel.ruterX;
pixel.botn = pixel.top + pixel.ruteLengde * pixel.ruterY;
let ting = { liste: [] };
let aktiv = { doning: "traktor0", redskap: null };
let landskap = { liste: [] };
let fart = { aktiv: 2, doning: 2, redskap: 0, landskap: 0, arbeid: 0, tomTank: false };

const pris = { drivstoff: 1 };
let aktivHandlingRute = {doning: null, redskap:null};
const lerret = document.getElementById("verdenID");

const verden = lerret.getContext("2d");

function oppsett() {
  //kjorer ved oppstart og endring av storrelse pa vindu
  pixel.verdenX = document
    .getElementById("verdenID")
    .getBoundingClientRect().width;
  pixel.verdenY = document
    .getElementById("verdenID")
    .getBoundingClientRect().height;
  pixel.hogre = pixel.ruteLengde * pixel.ruterX;
  pixel.botn = pixel.top + pixel.ruteLengde * pixel.ruterY;
  oppdaterPeng(0);
}

function lagVerden() {
  lagLandskap();
  //lag ting
  for (x = 0; x < orginalTing.length; x++) {
    ting[orginalTing[x].navn] = new nyTing(x);
    ting.liste.push(orginalTing[x].navn);
  } //lag topplinje
  topplinje = new nyTopplinje();
  oppdaterVerden();
  styring();
}

function oppdaterVerden() {
  //endre ystørrelse til 100% samtidig somd et tømmer lerretet
  lerret.width = lerret.offsetWidth; 
  lerret.height = lerret.offsetHeight; 
  // tein landskap
  for (nr = 0; nr < landskap.liste.length; nr++) {
    landskap[landskap.liste[nr]].tein();
  }
  //tein ting
  for (x = 0; x < orginalTing.length; x++) {
    ting[orginalTing[x].navn].tein();
  }
  //tein topplinje
  topplinje.tein();
}