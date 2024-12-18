type Ting = Bygg|Last;

class TingMal {
  navn: string; 
  type: 'bygg'|'last';
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

  fart: { friksjon: number, krasj: number, tyngde:number };
  last: LastMal;
  funksjonane: null|[string,(denne: Ting, data:any) => void][];
  butikk: { type:'ingen'|'kjoretoy'|'redskap'|'ting', bilde: string, tittel: string, pris: number }

  constructor (ny:TingDataMal, rute:Posisjon){
    this.navn = ny.navn;
    this.type = ny.type;
    this.retning = { aktiv: ny.retning.aktiv, tmp:0 };
    this.rute = { tilSjekk: [], x: rute.x, y: rute.y };
    this.pos = { 
      midt: {x: rute.x * pixel.ruteLengde, y: rute.y * pixel.ruteLengde,tx: rute.x * pixel.ruteLengde,ty: rute.y * pixel.ruteLengde,fx:0,fy:0},
      lossePunkt:{}, 
      framKrok:{x: 0, y: 0,tx: 0,ty: 0,dx: 0,dy: 0 }, 
      bakKrok: {x: 0, y: 0,tx: 0,ty: 0,dx: 0,dy: 0 }, 
      dor:     {x: 0, y: 0,tx: 0,ty: 0,dx: 0,dy: 0 }
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
    function lagKrasjSider(data: string[][], krasjPunkt: KrasjPunkt): PosisjonMal[][] {
      return data.map(pos => [krasjPunkt[pos[0]], krasjPunkt[pos[1]]]);
    }
    this.krasj.framSider = lagKrasjSider(ny.krasj.framSider, this.krasj.punkt);
    this.krasj.bakSider = lagKrasjSider(ny.krasj.bakSider, this.krasj.punkt);
    this.krasj.andreSider = lagKrasjSider(ny.krasj.andreSider, this.krasj.punkt);
    this.krasj.losseSider = ny.krasj.losseSider === null ? null : lagKrasjSider(ny.krasj.losseSider, this.krasj.punkt);
    this.fart = ny.fart;
    this.last = { valgtLast:null, mottar:ny.last.mottar,leverer:ny.last.leverer, lastData:ny.last.lastData}
    if(ny.last.valgtLast !== null) {this.last.valgtLast = this.last.lastData[ny.last.valgtLast];}
       this.butikk = ny.butikk;
    this.funksjonane = ny.funksjonane;
  }
}

interface TingDataMal {
  navn: string;
  type: 'bygg'|'last';
  retning: {aktiv:number};
  pos: {
    midt: {dx:number,dy:number},
    lossePunkt: Record<string,{dx:number,dy:number}>
  };
  krasj: {
    framSider:   string[][], 
    bakSider:    string[][], 
    andreSider:  string[][],
    losseSider: null|string[][],
    punkt: Record<string,{dx:number,dy:number}>
  };
  fart: { friksjon: number, krasj: number, tyngde:number },
  last: LastDataMal,
  butikk: { type: 'ingen'|'ting', bilde: string, tittel: string, pris: number },
  funksjonane: [string,(denne: any) => void][];      
}

const orginalFro = {
  korn: { navn: 'korn', blirTil: 'kornSadd' },
  gras: { navn: 'gras', blirTil: 'grasSadd' },
  halm: { navn: 'halm', blirTil: null }
  }