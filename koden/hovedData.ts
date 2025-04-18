let flagg: Flagg[] = ["doningFlytta", "tingFlytta"];
let tid = 0;
let pause:boolean = false;
let kart: Kart;
let aktiv = {};
let krasjTingen: Maskin | Ting | "ok";
let doning: Kjoretoy;
interface Rammer {
  skjerm: HTMLCanvasElement;
  topplinje: HTMLCanvasElement;
  knappar: HTMLCanvasElement;
  landskap: HTMLCanvasElement;
  jorde: HTMLCanvasElement;
  maskinar: HTMLCanvasElement;
  ting: HTMLCanvasElement;
  butikk: HTMLCanvasElement;
}
interface Lerret {
  skjerm: CanvasRenderingContext2D;
  topplinje: CanvasRenderingContext2D;
  knappar: CanvasRenderingContext2D;
  landskap: CanvasRenderingContext2D;
  jorde: CanvasRenderingContext2D;
  maskinar: CanvasRenderingContext2D;
  ting: CanvasRenderingContext2D;
  butikk: CanvasRenderingContext2D;
}
type Flagg = "nyRutetype"| "animasjon"| "teinMaskinar"| "teinTing"| "doningFlytta"| "sving"| "nyRute"| "nyRuteinterface"| "nyDoning"| "tingFlytta"| "nyRedskapFram"| "nyRedskapBak"| "aktivertRedskapfram"| "aktivertRedskapbak"| "topplinjeEndra"| "kornLevering"| "drivstoffMottaking"| "froLevering"| "lastErEndra"| "lastAnimasjonLoop";


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

