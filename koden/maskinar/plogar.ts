
class Plog extends MaskinRedskapMal {
  grafikk: {
      karosseri: GrafikkDelBase,
      skjerPassiv: GrafikkDelBase,
      skjerAktiv: GrafikkDelKlipp,
  };

  constructor (ny:PlogData, rute:Posisjon){
    super(ny, rute)
    this.grafikk = {
        karosseri : ny.grafikk.karosseri,
        skjerPassiv: ny.grafikk.skjerPassiv,
        skjerAktiv: ny.grafikk.skjerAktiv,
    }
  }
}

interface PlogData extends MaskinRedskapData {
  grafikk: {
      karosseri: GrafikkDelBase,
      skjerPassiv: GrafikkDelBase,
      skjerAktiv: GrafikkDelKlipp,
  };
}

const plogKverneland:PlogData = {
  navn: 'Kvernelandplog-UX9',
  type: 'tilhengar',
  pos: {
    framKrok: { dx: 30, dy: 0 },
    bakKrok: { dx: 0, dy: 0 },
    dor: { dx: 0, dy: 0},
    lossePunkt: {}
  },
  grafikk: {
      karosseri:   { skalVise:true, tegneRekkefolge: 'under', midt: { x: 0.5, y: 0.5 }, pos: { x: 15, y: 0 }, str: { x: 30, y: 60 }, retning:0, klippPos: { x: 91, y: 282 } },
      skjerPassiv: { skalVise:true, tegneRekkefolge: 'under', midt: { x: 0.5, y: 0.5 }, pos: { x: -2, y: 0 }, str: { x: 4, y: 60 }, retning:0, klippPos: { x: 79, y: 282 } },
      skjerAktiv:  { skalVise:false,tegneRekkefolge: 'under', midt: { x: 0.5, y: 0.5 }, pos: { x: -2, y: 0 }, str: { x: 4, y: 60 }, retning:0, klippPos: { x: 83, y: 282 }, animasjonKlipp: {Xstart:75, Ystart:282, Xhopp:4, Yhopp:0, Xmaks:79, Ymaks:282, repitisjonar: 'evig', status:0} }
  },
  krasj: {
    framSider: [['fv', 'fh']], bakSider: [['bh', 'bv']], andreSider: [['bh', 'fh'], ['bv', 'fv'], ['bv', 'krok'], ['krok', 'bh']], losseSider:null,
    punkt: {
      bh:  { dx:  0, dy: -30},
      fh:  { dx: 12, dy: -30},
      fv:  { dx: 12, dy:  30},
      bv:  { dx:  0, dy:  30},
      krok:{ dx: 30, dy:   0}
    }
  },
  arbeid: {
    type: 'plog',
    punkt: [
      { x: 2, y: -27, type: 'type1' },
      { x: 2, y: -21, type: 'type1' },
      { x: 2, y: -15, type: 'type1' },
      { x: 2, y: -9, type: 'type1' },
      { x: 2, y: -3, type: 'type1' },
      { x: 2, y: 3, type: 'type1' },
      { x: 2, y: 9, type: 'type1' },
      { x: 2, y: 15, type: 'type1' },
      { x: 2, y: 21, type: 'type1' },
      { x: 2, y: 27, type: 'type1' }
    ],
    type1: { blirTil: 'ployd' , last: { type: null, mengde: 0 } },
    type2: null,
  },
  last:{valgtLast:null, mottar:[],leverer:[],
    lastData:{
      tull:{niva:0,maks:0,visNiva:false,lastTilDoning:false,mottak:{ plass:null, losserFra:null, mengde:0, evigLager:false},levering:{punkt:null, losserTil:null, mengde:0, evigLager:false}}
    },
  },
  fart: { aktiv: 0, maks: 0, friksjon: 0, aks: 0, landskap: 0, arbeid: -0.7, krasj: 0,tyngde:1.5 },
  svingFartVedArbeid:  0.5,
  butikk: { type: 'redskap', bilde: 'butikkPlog0', tittel: 'MULD 0', pris: 20000 },
  funksjonane: [
    ['redskapBakAktivert',function (denne:Plog) {
        denne.grafikk.skjerAktiv.skalVise  = denne.arbeid.aktiv ? true : false;
        denne.grafikk.skjerPassiv.skalVise = denne.arbeid.aktiv ? false : true;
    }]
  ],
}