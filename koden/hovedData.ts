let skjerm = {
  bredde: 0,
  hoyde: 0,
  hoydeTopplinje: 0,
  startHoydeLandskap: 0,
  hoydeLandskap: 0,
  hoydeButikk: 0,
  startHoydeKnappar: 0,
  hoydeKnappar: 0,
  hogre: 0,
  botn: 0,
};

let ramme: Rammer = {
  skjerm: document.getElementById("skjermID") as HTMLCanvasElement,
  topplinje: document.createElement("canvas"),
  knappar: document.createElement("canvas"),
  landskap: document.createElement("canvas"),
  jorde: document.createElement("canvas"),
  maskinar: document.createElement("canvas"),
  ting: document.createElement("canvas"),
  butikk: document.createElement("canvas"),
};

let lerret: Lerret = {
  skjerm: ramme.skjerm.getContext("2d")!,
  topplinje: ramme.topplinje.getContext("2d")!,
  knappar: ramme.knappar.getContext("2d")!,
  landskap: ramme.landskap.getContext("2d")!,
  jorde: ramme.jorde.getContext("2d")!,
  maskinar: ramme.maskinar.getContext("2d")!,
  ting: ramme.ting.getContext("2d")!,
  butikk: ramme.butikk.getContext("2d")!,
};

let zoom = 1;
const koblingsKaranteneMargin = 30;
const pris = { drivstoff: 1, korn: -2 };
let peng = 10000;
let knappar: Knappar = {
  str: 50,
  min: 50,
  maks: 80,
  marg: 10,
  ikonStr: 39,
  etasjer: 0,
  liste: [
    "fram",
    "bak",
    "utAvDoning",
    "velgFro",
    "aktiverRedskapFram",
    "koblingRedskapFram",
    "koblingRedskapBak",
    "aktiverRedskapBak",
    "venstre",
    "hogre",
  ],
  fram: {
    vis: true,
    visAktiv: true,
    trykkAktivert: false,
    plasseringSide: "venstreOppe",
    plasseringNr: 1,
    ikonNr: 1,
    v: 0,
    t: 0,
    h: 0,
    b: 0,
  },
  bak: {
    vis: true,
    visAktiv: true,
    trykkAktivert: false,
    plasseringSide: "venstreNere",
    plasseringNr: 2,
    ikonNr: 0,
    v: 0,
    t: 0,
    h: 0,
    b: 0,
  },
  utAvDoning: {
    vis: false,
    visAktiv: false,
    trykkAktivert: false,
    plasseringSide: "midtNere",
    plasseringNr: 3,
    ikonNr: 4,
    v: 0,
    t: 0,
    h: 0,
    b: 0,
  },
  aktiverRedskapFram: {
    vis: false,
    visAktiv: false,
    trykkAktivert: false,
    plasseringSide: "venstreOppe",
    plasseringNr: 2,
    ikonNr: 7,
    v: 0,
    t: 0,
    h: 0,
    b: 0,
  },
  koblingRedskapFram: {
    vis: false,
    visAktiv: false,
    trykkAktivert: false,
    plasseringSide: "venstreOppe",
    plasseringNr: 3,
    ikonNr: 5,
    v: 0,
    t: 0,
    h: 0,
    b: 0,
  },
  koblingRedskapBak: {
    vis: false,
    visAktiv: false,
    trykkAktivert: false,
    plasseringSide: "hogreOppe",
    plasseringNr: 2,
    ikonNr: 6,
    v: 0,
    t: 0,
    h: 0,
    b: 0,
  },
  aktiverRedskapBak: {
    vis: false,
    visAktiv: false,
    trykkAktivert: false,
    plasseringSide: "hogreOppe",
    plasseringNr: 1,
    ikonNr: 7,
    v: 0,
    t: 0,
    h: 0,
    b: 0,
  },
  venstre: {
    vis: true,
    visAktiv: true,
    trykkAktivert: false,
    plasseringSide: "hogreNere",
    plasseringNr: 2,
    ikonNr: 2,
    v: 0,
    t: 0,
    h: 0,
    b: 0,
  },
  hogre: {
    vis: true,
    visAktiv: true,
    trykkAktivert: false,
    plasseringSide: "hogreNere",
    plasseringNr: 1,
    ikonNr: 3,
    v: 0,
    t: 0,
    h: 0,
    b: 0,
  },
  velgFro: {
    vis: false,
    visAktiv: false,
    trykkAktivert: false,
    plasseringSide: "venstreOppe",
    plasseringNr: 7,
    ikonNr: 12,
    v: 0,
    t: 0,
    h: 0,
    b: 0,
  },
};
/*
function settStorrelse(){
  skjerm.bredde = Math.abs(document.body.getBoundingClientRect().width) + 1;
  skjerm.hoyde = Math.abs(document.body.getBoundingClientRect().height) + 1;
  skjerm.hoydeTopplinje = 40;
  skjerm.hoydeKnappar = (knappar.liste.length * knappar.str) < skjerm.bredde ? knappar.str + knappar.marg : 2 * (knappar.str + knappar.marg);
  skjerm.hoydeLandskap = skjerm.hoyde - skjerm.hoydeTopplinje - skjerm.hoydeKnappar;
  skjerm.startHoydeKnappar = skjerm.hoyde - skjerm.hoydeKnappar;
  skjerm.hoydeButikk = skjerm.hoyde - skjerm.hoydeTopplinje;
  skjerm.hogre = pixel.ruteLengde * pixel.ruter[0];
  skjerm.botn = pixel.ruteLengde * pixel.ruter[1];
  }
  */