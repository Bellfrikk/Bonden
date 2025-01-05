
class Treskeskjer extends MaskinRedskapMal {
  grafikk: {
    karosseri : GrafikkDelKlipp,
  }

  constructor (ny:TreskeskjerData, rute:Posisjon){
    super(ny, rute)
    this.grafikk = {
        karosseri : ny.grafikk.karosseri,
    }
  }
}

interface TreskeskjerData extends MaskinRedskapData {
  grafikk: {
      karosseri : GrafikkDelKlipp,
  };
}

const treskeskjer1:TreskeskjerData = {
  navn: 'treskeSkjer1',
  type: 'framFeste',
  pos: {
    dor: { dx: 0, dy: 0},
    framKrok: { dx: 0, dy: 0},
    bakKrok: { dx: 0, dy: 0},
    lossePunkt: {},
  },
  krasj: {
    framSider: [['fv', 'fh']], bakSider: [['bh', 'bv']], andreSider: [['bh', 'fh'], ['bv', 'fv']],losseSider:[],
    punkt: {
      bh: { dx: 0, dy: 12 },
      fh: { dx: 17, dy: 21 },
      fv: { dx: 17, dy: -21 },
      bv: { dx: 0, dy: -21 }
    },
  },
  arbeid: {
    type: 'treskeskjer',
    punkt: [
      { x: -11, y: -21, type: 'type1' },
      { x: -11, y: -15, type: 'type1' },
      { x: -11, y: -9, type: 'type1' },
      { x: -11, y: -4, type: 'type2' },
      { x: -11, y: 0, type: 'type2' },
      { x: -11, y: 4, type: 'type2' },
      { x: -11, y: 9, type: 'type1' },
      { x: -11, y: 15, type: 'type1' },
      { x: -11, y: 21, type: 'type1' }
    ],
    type1: { blirTil:'kornHausta', last: { type: 'korn', mengde: 1 } },
    type2: { blirTil:'halm', last: { type: 'korn', mengde: 1 } },
  },
  grafikk: {
      karosseri: { skalVise:true, tegneRekkefolge: 'under', midt: { x: 0.5, y: 0.5 }, pos: { x: 10, y: 0 }, str: { x: 17, y: 44 }, retning: 0, klippPos: { x: 140, y: 227 }, animasjonKlipp:{
        Xstart: 140,
        Ystart: 227,
        Xhopp: 17,
        Yhopp: 0,
        Xmaks: 174,
        Ymaks: 227,
        repitisjonar: 'evig',
        status: 0
      }},
},
  svingFartVedArbeid: 0.5,
  fart: { aktiv: 0, maks: 0, friksjon: 0, aks: 0, landskap: 0, arbeid: -0.5, krasj: 0, tyngde: 0.5},
  last: {
    valgtLast: 'korn', mottar:[], leverer:[],
    laster:{
      korn: { visNiva: false, maks: 0, lastTilDoning: true,
        mottak:{plass:'', mengde:1, evigLager:false},
        levering: {punkt:'', mengde:1, evigLager:false}},
    },
  },
  butikk: { type: 'redskap', bilde: 'bildenavn', tittel: '', pris: 0 },
  funksjonane: {},
}