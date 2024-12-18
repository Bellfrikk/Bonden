class Bygg extends TingMal {
  grafikk : Record<string, GrafikkDelBase >;
  constructor(ny:ByggData, rute:Posisjon) {
    super(ny,rute);
    this.grafikk = ny.grafikk;
  }
}

interface ByggData extends TingDataMal {
  grafikk: Record<string, GrafikkDelBase >;
}


const butikkBygg:ByggData = {
  navn: 'butikk',
  type: 'bygg',
  retning: { aktiv: 180 },
  pos: { midt: { dx: 0, dy: 0},    lossePunkt:{} },
  fart: { krasj: 0, friksjon: 0.5, tyngde:1000 },
  krasj: {
    framSider: [], bakSider: [], andreSider: [['nv', 'ov'], ['ov', 'oh'], ['oh', 'nh'], ['utstikkh', 'utstikkv']], losseSider:null,
    punkt: {
      nv:      {dx: -40, dy:  19 },
      ov:      {dx: -40, dy: -33 },
      oh:      {dx:  40, dy: -33 },
      nh:      {dx:  40, dy:  19 },
      utstikkh:{dx:  16, dy:  33 },
      utstikkv:{dx: -16, dy:  33 }
    }
  },
  grafikk: {
      butikken: { skalVise:true, tegneRekkefolge: 'under', midt: { x: 0.5, y: 0.5 }, pos: { x: 0, y: 0 }, str: { x: 87, y: 75 }, retning:0, klippPos: { x: 0, y: 42 } },
  },
  last: { valgtLast:null, mottar:[], leverer:[], lastData:{} },
  butikk: { type: "ingen", bilde: "", tittel: "", pris: 0 },
  funksjonane: []
}

const bensinstasjon:ByggData = {
    navn: 'BenzStasjon',
    type: 'bygg',
    retning: { aktiv: 0},
    pos: { midt: { dx: 0, dy: 0},    lossePunkt:{} },
    fart: { krasj: 0, friksjon: 10, tyngde:1000 },
    krasj: {
      framSider: [], bakSider: [], andreSider: [['nv', 'ov'], ['ov', 'oh'], ['oh', 'nh']], losseSider:null,
      punkt: {
        nv:      {dx: -16, dy:  8 },
        ov:      {dx: -16, dy: -8 },
        oh:      {dx:  16, dy: -8 },
        nh:      {dx:  16, dy:  8 },
        pumpe:   {dx:  16, dy:  6 },
      }
    },
    grafikk: {
      pumpe: { skalVise:true, tegneRekkefolge: 'under', midt: { x: 0.5, y: 0.5 }, pos: { x: 0, y: 0 }, str: { x: 32, y: 16 }, retning:0, klippPos: { x: 0, y: 25 } },
  },
  last: { valgtLast:null, mottar:[], leverer:[], lastData:{
    drivstoff:{
      niva:1, maks:2, visNiva:false, lastTilDoning: false,
      mottak:  {plass:null, losserFra:null, mengde:0, evigLager:false},
      levering:{punkt:'pumpe', losserTil:null, mengde:1, evigLager:true}
    }
  } },
    butikk: { type: "ingen", bilde: "", tittel: "", pris: 0 },
    funksjonane: []
}


const kornSilo:ByggData = {
  navn: 'kornSilo',
  type: 'bygg',
  retning: { aktiv: 0 },
  pos: { midt: { dx: 0, dy: 0 }, lossePunkt: {} },
  fart: { krasj: 0, friksjon: 10, tyngde: 1000 },
  krasj: {
    framSider: [], bakSider: [], andreSider: [['nv', 'ov'], ['ov', 'oh'], ['oh', 'nh']],
    losseSider: [['lossenv', 'losseov'], ['losseov', 'losseoh'], ['losseoh', 'lossenh'], ['lossenv', 'lossenh']],
    punkt: {
      nv: { dx: -26, dy: 17 },
      ov: { dx: -26, dy: -17 },
      oh: { dx: 18, dy: -17 },
      nh: { dx: 18, dy: 17 },
      lossenv: { dx: 18, dy: 16 },
      losseov: { dx: 18, dy: -16 },
      losseoh: { dx: 26, dy: -16 },
      lossenh: { dx: 26, dy: 16 }
    }
  },
  grafikk: {
      silo: { skalVise:true, tegneRekkefolge: 'under', midt: { x: 0.5, y: 0.5 }, pos: { x: 0, y: 0 }, str: { x: 53, y: 34 }, retning: 0, klippPos: { x: 36, y: 0 } },
  },
  last: {
    valgtLast: 'korn', mottar: ['korn'], leverer: [], lastData: {
      korn: {
        niva: 0, maks: 0, visNiva: false, lastTilDoning: false,
        mottak: { plass: 'losseSider', losserFra: null, mengde: 1, evigLager: true },
        levering: { punkt: null, losserTil: null, mengde: 1, evigLager: false }
      }
    }
  },
  funksjonane: [],
  butikk: {
    type: "ingen",
    bilde: "",
    tittel: "",
    pris: 0
  }
}

const tre:ByggData = {
  navn: 'tre',
  type: 'bygg',
  retning: { aktiv: 0 },
  pos: { midt: { dx: 0, dy: 0 }, lossePunkt: {} },
  fart: { krasj: 0, friksjon: 10, tyngde: 1000 },
  krasj: {
    framSider: [], bakSider: [], andreSider: [['nv', 'ov'], ['ov', 'oh'], ['oh', 'nh']],
    losseSider: [],
    punkt: {
      nv: { dx: -10, dy: 10 },
      ov: { dx: -10, dy: -10 },
      oh: { dx:  10, dy: -10 },
      nh: { dx:  10, dy: 10 },
    }
  },
  grafikk: {
      tre: {skalVise:true, tegneRekkefolge: 'under',  midt: { x: 0.5, y: 0.5 }, pos: { x: 0, y: 0 }, str: { x: 20, y: 20 }, retning: 0, klippPos: { x: 86, y: 0 } },
  },
  last: {
    valgtLast: null, mottar: [], leverer: [], lastData: {
      korn: {
        niva: 0, maks: 0, visNiva: false, lastTilDoning: false,
        mottak: { plass: null, losserFra: null, mengde: 1, evigLager: true },
        levering: { punkt: null, losserTil: null, mengde: 1, evigLager: false }
      }
    }
  },
  funksjonane: [],
  butikk: {
    type: "ingen",
    bilde: "",
    tittel: "",
    pris: 0
  }
}
