type ArbeidsPunktMal = { x: number, y: number, type: 'type1'|'type2' };
type ArbeidsTypeMal = { blirTil: JordeVeksType|JordeIkkjeVeksType, last: { type: LastTypar|null, mengde: number } };
type LastMal = { valgtLast:null|EiLast, mottar:LastTypar[], leverer:LastTypar[], laster: Record<string,EiLast> }
type lasterMal = { valgtLast:null|LastTypar, mottar:LastTypar[], leverer:LastTypar[], laster: Record<string,EiLastData> }

type EiLast = {
  niva:number, maks:number, visNiva:boolean, lastTilDoning: boolean,
  mottak:  {plass:PosisjonMal[][]|null, losserFra:Maskin|Ting|null, mengde:number, evigLager:boolean},
  levering:{punkt:PosisjonMal|null, losserTil:Maskin|Ting|null, mengde:number, evigLager:boolean}
};
type EiLastData = { maks:number, visNiva:boolean, lastTilDoning: boolean,
  mottak:  {plass:string, mengde:number, evigLager:boolean},
  levering:{punkt:string, mengde:number, evigLager:boolean}
};
type LastTypar = 'drivstoff'|'gras'|'korn'|'fro'|'ball'|'palle'|'grasball';

function lagEiLast(krasj: KrasjMal, data:EiLastData,):EiLast {
  return {
    niva:0, maks:data.maks, visNiva:data.visNiva, lastTilDoning: data.lastTilDoning,
    mottak: {plass:data.mottak.plass === null ? null : krasj.losseSider , losserFra:null, mengde:0, evigLager:false},
    levering:{punkt:data.mottak.plass === null ? null : krasj.punkt[data.levering.punkt] , losserTil:null, mengde:0, evigLager:false}
  }
}


type Posisjon = { x: number, y: number };
type PosisjonMidtMal = { x: number, y: number, tx: number, ty: number, fx: number, fy: number };
type PosisjonMal = { x: number, y: number, tx: number, ty: number, dx: number, dy: number };
type Tilsjekk = Maskin|Ting;
type Rute = {tilSjekk:Tilsjekk[], x:number, y:number};
type ArbeidsTypar = 'ingen'|'traktor'|'skurteskar'|'plog'|'samaskin'|'slamaskin'|'ballemaskin'|'treskeskjer';

type GrafikkDelBase = {
  skalVise:boolean,
  tegneRekkefolge: 'over'|'under',
  midt:Posisjon, 
  pos: Posisjon, 
  str: Posisjon, 
  retning: number,
  klippPos: Posisjon
};
type AnimasjonBevegelse = { flytt: number, maksX: number };
type AnimasjonDekk      = { px:number, minX:number, maksX:number};
type AnimasjonRetning   = { retning:number, tid:number, status:number};
type AnimasjonSving     = { venstre: number, hogre: number, beint: number};
type AnimasjonPos       = { x: number, y: number, tid: number, status: number};
type AnimasjonKlipp     = { Xstart: number, Ystart: number, Xhopp: number, Yhopp: number, Xmaks: number, Ymaks: number, repitisjonar: 'evig'|number, status:number};
type AnimasjonLast      = { startX: number, maksX: number, startY:number, maksY: number};
type AnimasjonStr       = { str: number, tid:number, status: number};

interface GrafikkDelBevegelse    extends GrafikkDelBase  { animasjonBevegelse: AnimasjonBevegelse};
interface GrafikkDelDekk         extends GrafikkDelBase  { animasjonDekk:      AnimasjonDekk     };
interface GrafikkDelDekkMedSving extends GrafikkDelDekk  { animasjonSving:     AnimasjonSving    };
interface GrafikkDelRetning      extends GrafikkDelBase  { animasjonRetning:   AnimasjonRetning  };
interface GrafikkDelSving        extends GrafikkDelBase  { animasjonSving:     AnimasjonSving    };
interface GrafikkDelPos          extends GrafikkDelBase  { animasjonPos:       AnimasjonPos      };
interface GrafikkDelKlipp        extends GrafikkDelBase  { animasjonKlipp:     AnimasjonKlipp    };
interface GrafikkDelStrY         extends GrafikkDelBase  { animasjonStrY:      AnimasjonStr      };
interface GrafikkDelStrX         extends GrafikkDelBase  { animasjonStrX:      AnimasjonStr      };
interface GrafikkDelLast         extends GrafikkDelBase  { animasjonLast:      AnimasjonLast     };

type KrasjPunkt = Record<string,PosisjonMal>
type KrasjMal = {
  framSider: PosisjonMal[][], 
  bakSider: PosisjonMal[][], 
  andreSider: PosisjonMal[][],
  losseSider: PosisjonMal[][]|null,
  punkt: KrasjPunkt;
};
function lagKrasjSider(data: string[][], krasjPunkt: KrasjPunkt): PosisjonMal[][] {
  return data.map(denne => [krasjPunkt[denne[0]], krasjPunkt[denne[1]]]);
}

type EinFunksjon = (denne: Maskin|Ting, data:any) => void;



class BaseMal {
  navn: string; 
  type: string;
  retning: {aktiv:number, tmp:number}; 
  rute: Rute; 
  pos: {
    midt: PosisjonMidtMal;
    bakKrok: PosisjonMal;
    framKrok: PosisjonMal;
    dor: PosisjonMal;
    lossePunkt:Record<string,PosisjonMal>;
  };
  krasj: KrasjMal;
  last:LastMal;
  funksjonane: Record<string, null|EinFunksjon>;
  butikk: { type:'ingen'|'kjoretoy'|'redskap'|'ting', bilde: string, tittel: string, pris: number }

  constructor (ny:BaseMalData, rute:Posisjon){
    this.navn = ny.navn;
    this.type = ny.type;
    this.retning = { aktiv: 0, tmp: 0 };
    this.rute = { tilSjekk: [], x: rute.x, y: rute.y };
    this.pos = { 
      midt: {x: rute.x * pixel.ruteLengde, y: rute.y * pixel.ruteLengde,tx: rute.x * pixel.ruteLengde,ty: rute.y * pixel.ruteLengde,fx:0,fy:0},
      framKrok:{x:0,y:0,tx:0,ty:0,dx:ny.pos.framKrok.dx,dy:ny.pos.framKrok.dy},
      bakKrok: {x:0,y:0,tx:0,ty:0,dx:ny.pos.bakKrok.dx,dy:ny.pos.bakKrok.dy},
      dor:     {x:0,y:0,tx:0,ty:0,dx:ny.pos.dor.dx,dy:ny.pos.dor.dy},
      lossePunkt: {}
    };
    for (let key in ny.pos.lossePunkt) {
      this.pos.lossePunkt[key] = { x: 0, y: 0, tx: 0, ty: 0, dx: ny.pos.lossePunkt[key].dx, dy: ny.pos.lossePunkt[key].dy };
    }   

    this.krasj = {
      framSider:  [],
      bakSider:   [],
      andreSider: [],
      losseSider: [],
      punkt:{}
    };
    for (let key in ny.krasj.punkt) {
      this.krasj.punkt[key] = { x: 0, y: 0, tx: 0, ty: 0, dx: ny.krasj.punkt[key].dx, dy: ny.krasj.punkt[key].dy };
    }  
    this.krasj.framSider = lagKrasjSider(ny.krasj.framSider, this.krasj.punkt);
    this.krasj.bakSider = lagKrasjSider(ny.krasj.bakSider, this.krasj.punkt);
    this.krasj.andreSider = lagKrasjSider(ny.krasj.andreSider, this.krasj.punkt);
    this.krasj.losseSider = ny.krasj.losseSider === null ? null : lagKrasjSider(ny.krasj.losseSider, this.krasj.punkt);

    this.last = { valgtLast:null, mottar:ny.last.mottar,leverer:ny.last.leverer, laster:{}}
    for (let key in ny.last.laster) {
      this.last.laster[key] = lagEiLast(this.krasj, ny.last.laster[key]);
    } 
    if(ny.last.valgtLast !== null) {this.last.valgtLast = this.last.laster[ny.last.valgtLast];}
    this.butikk = ny.butikk;
    this.funksjonane = {};
    for (let key in ny.funksjonane) {
      this.funksjonane[key] = ny.funksjonane[key];
    } 
  }
}


interface BaseMalData {
  navn: string; 
    type: string;
    pos: {
      bakKrok: { dx: number, dy: number };
      framKrok:{ dx: number, dy: number };
      dor: { dx: number, dy: number };
      lossePunkt: null|Record<string,{dx:number,dy:number}>
    };
    krasj: {
      framSider: string[][], 
      bakSider: string[][], 
      andreSider: string[][],
      losseSider: string[][]|null,
      punkt: Record<string,{dx:number,dy:number}>
    };
    last: lasterMal,
    butikk: { type: 'ingen'|'kjoretoy'|'redskap'|'ting', bilde: string, tittel: string, pris: number },
    funksjonane: Record<string, EinFunksjon>;    
  }

function teinTingEllerMaskin(detteLerret:CanvasRenderingContext2D,bilde:HTMLCanvasElement, denne:Maskin|Ting,tmpDel:GrafikkDelBase) {
  //flytt fokus til midt av maskin og roter riktig
  detteLerret.translate(denne.pos.midt.x, denne.pos.midt.y); //flytt fokus tilmidtpunkt
  detteLerret.rotate(denne.retning.aktiv * Math.PI / 180); //roter verden lik som doning
  //teiner doning
    detteLerret.translate(tmpDel.pos.x, tmpDel.pos.y); //flytt fokus tilmidtpunkt av del
    if(tmpDel.retning !== 0){ 
      detteLerret.rotate((tmpDel.retning * Math.PI) / 180);
    } //roter verden likt som del
    detteLerret.drawImage(bilde,
      tmpDel.klippPos.x, tmpDel.klippPos.y, // velg utsnitt av doningtegning 
      tmpDel.str.x, tmpDel.str.y, //bredde og høyde på utsnitt
      -tmpDel.str.x * tmpDel.midt.x, -tmpDel.str.y * tmpDel.midt.x, //posisjon av tegning
      tmpDel.str.x, tmpDel.str.y,// bredde og høyde på tegning
      ); 
    if(tmpDel.retning !== null){ detteLerret.rotate(-(tmpDel.retning * Math.PI) / 180); }//roter verden liks som del
    detteLerret.translate(-tmpDel.pos.x, -tmpDel.pos.y); //flytt fokus talbake fra del
  
  detteLerret.rotate((denne.retning.aktiv * Math.PI / 180) * -1);   //flytt fokus tilbake
  detteLerret.translate(-denne.pos.midt.x, -denne.pos.midt.y); //roter tilbake 
  
}
