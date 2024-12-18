interface Rammer {
  skjerm:HTMLCanvasElement;
  topplinje:HTMLCanvasElement;
  knappar:HTMLCanvasElement;
  landskap:HTMLCanvasElement;
  jorde:HTMLCanvasElement;
  maskinar:HTMLCanvasElement;
  ting:HTMLCanvasElement;
  butikk:HTMLCanvasElement;
}
interface Lerret {
  skjerm:CanvasRenderingContext2D;
  topplinje:CanvasRenderingContext2D;
  knappar:CanvasRenderingContext2D;
  landskap:CanvasRenderingContext2D;
  jorde:CanvasRenderingContext2D;
  maskinar:CanvasRenderingContext2D;
  ting:CanvasRenderingContext2D;
  butikk:CanvasRenderingContext2D;
}
type Flagg = 'nyRutetype'|'animasjon'|'teinMaskinar'|'teinTing'|'doningFlytta'|'sving'|'nyRute'|'nyRuteinterface'|'nyDoning'|'tingFlytta'|'nyRedskapFram'|'nyRedskapBak'|'aktivertRedskapfram'|'aktivertRedskapbak'|'topplinjeEndra'|'kornLevering'|'drivstoffMottaking'|'froLevering'|'lastErEndra'|'lastAnimasjonLoop';

type Knappar = {
  str: number, min: number, maks: number, marg: number, ikonStr: number, etasjer: number,
  liste: KnapparTypar[],
  fram: KnappMal,
  bak: KnappMal,
  utAvDoning: KnappMal,
  aktiverRedskapFram: KnappMal,         
  koblingRedskapFram: KnappMal,         
  koblingRedskapBak: KnappMal,
  aktiverRedskapBak: KnappMal,
  venstre: KnappMal,
  hogre: KnappMal,
  velgFro: KnappMal        
};
type KnapparTypar = 'fram'|'bak'|'utAvDoning'|'velgFro'|'aktiverRedskapFram'|'koblingRedskapFram'|'koblingRedskapBak'|'aktiverRedskapBak'|'venstre'|'hogre';
type KnappMal = { vis: boolean, visAktiv: boolean, trykkAktivert: boolean, plasseringSide: 'venstreOppe'|'venstreNere'|'midtNere'|'hogreOppe'|'hogreNere', plasseringNr: number, ikonNr: number,v: number, t: number, h: number, b: number, };
