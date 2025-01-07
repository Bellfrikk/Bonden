class Ballemaskin extends MaskinRedskapMal {
  
  grafikk: {
    [key: string]: {
      skalVise: boolean;
      tegneRekkefolge: string;
      midt: { x: number; y: number };
      pos: { x: number; y: number };
      str: { x: number; y: number };
      klippPos: { x: number; y: number };
      animasjon: any;
    };
  };

  constructor(ny: BallemaskinData, rute: Posisjon) {
    super(ny, rute);
    this.grafikk = {
      dekkVF: { skalVise: true, tegneRekkefolge: 'under', midt: { x: 0.5, y: 0.5 }, pos: { x: 6, y: -18 }, str: { x: 10, y: 3 }, klippPos: { x: 0, y: 266 }, animasjon: { dekk: { px: 0, minX: 0, maksX: 3 } } },
      dekkHF: { skalVise: true, tegneRekkefolge: 'under', midt: { x: 0.5, y: 0.5 }, pos: { x: 6, y: 18 }, str: { x: 10, y: 3 }, klippPos: { x: 0, y: 264 }, animasjon: { dekk: { px: 0, minX: 0, maksX: 3 } } },
      dekkVB: { skalVise: true, tegneRekkefolge: 'under', midt: { x: 0.5, y: 0.5 }, pos: { x: -6, y: -18 }, str: { x: 10, y: 3 }, klippPos: { x: 0, y: 266 }, animasjon: { dekk: { px: 0, minX: 0, maksX: 3 } } },
      dekkHB: { skalVise: true, tegneRekkefolge: 'under', midt: { x: 0.5, y: 0.5 }, pos: { x: -6, y: 18 }, str: { x: 10, y: 3 }, klippPos: { x: 0, y: 264 }, animasjon: { dekk: { px: 0, minX: 0, maksX: 3 } } },
      minidekkV: { skalVise: true, tegneRekkefolge: 'under', midt: { x: 0.5, y: 0.5 }, pos: { x: 27, y: -18 }, str: { x: 5, y: 3 }, klippPos: { x: 0, y: 266 }, animasjon: { dekk: { px: 0, minX: 0, maksX: 3 } } },
      minidekkH: { skalVise: true, tegneRekkefolge: 'under', midt: { x: 0.5, y: 0.5 }, pos: { x: 27, y: 18 }, str: { x: 5, y: 3 }, klippPos: { x: 0, y: 264 }, animasjon: { dekk: { px: 0, minX: 0, maksX: 3 } } },
      karosseri: { skalVise: true, tegneRekkefolge: 'under', midt: { x: 0.5, y: 0.5 }, pos: { x: 11, y: 0 }, str: { x: 71, y: 32 }, klippPos: { x: 12, y: 342 }, animasjon: {} },
      presseBall: { skalVise: true, tegneRekkefolge: 'under', midt: { x: 0.5, y: 0.5 }, pos: { x: 1, y: 0 }, str: { x: 2, y: 12 }, klippPos: { x: 23, y: 376 }, animasjon: { gras: { startX: 2, maksX: 12, startY: 12, maksY: 12 }, pos: { x: -18, y: 0, tid: 80, status: 0 }, klipp: { Xstart: 23, Ystart: 376, Xhopp: 1, Yhopp: 0, Xmaks: 26, Ymaks: 376, repitisjonar: 'evig', status: 0 } } },
      pakkeBall: { skalVise: true, tegneRekkefolge: 'under', midt: { x: 0.5, y: 0.5 }, pos: { x: -17, y: 0 }, str: { x: 0, y: 0 }, klippPos: { x: 14, y: 376 }, animasjon: { pos: { x: -17, y: 0, tid: 50, status: 0 }, klipp: { Xstart: 14, Ystart: 376, Xhopp: 1, Yhopp: 0, Xmaks: 0, Ymaks: 0, repitisjonar: 17, status: 0 } } },
      pakkearm: { skalVise: true, tegneRekkefolge: 'under', midt: { x: 0.5, y: 0.5 }, pos: { x: -19, y: 0 }, str: { x: 10, y: 25 }, klippPos: { x: 0, y: 346 }, animasjon: { retning: { retning: 900, tid: 900, status: 0 } } },
    };
  }
}

interface BallemaskinData extends MaskinRedskapData {
  grafikk: {
    [key: string]: {
      skalVise: boolean;
      tegneRekkefolge: string;
      midt: { x: number; y: number };
      pos: { x: number; y: number };
      str: { x: number; y: number };
      klippPos: { x: number; y: number };
      animasjon: any;
    };
  };
}

const ballemaskin1: BallemaskinData = {
  navn: 'Ballepressa',
  type: 'tilhengar',
  pos: {
    dor: { dx: 0, dy: 0},
    framKrok: { dx: 42, dy: 0},
    bakKrok: { dx: 0, dy: 0},
    lossePunkt: {
      ball: { dx: -39, dy: 0}
    }
  },
  krasj: {
    framSider:  [['fv', 'krok'], ['krok', 'fh'],], 
    bakSider:   [['dekkVB', 'bv'], ['bv', 'bh'], ['bh', 'dekkHB']], 
    andreSider: [['dekkVB', 'fv'], ['dekkHB', 'fv']],
    losseSider: [],
    punkt: {
      fv:     {dx:30,  dy: -20},
      krok:   {dx:42,  dy:   0},
      fh:     {dx:30,  dy:  20},
      dekkVB: {dx:-12, dy: -20},
      dekkHB: {dx:-12, dy:  20},
      bv:     {dx:-22, dy: -10},
      bh:     {dx:-22, dy:  10}
    },
  },
  grafikk: {
      dekkVF: { skalVise:true, tegneRekkefolge: 'under',  midt: { x: 0.5, y: 0.5 }, pos: { x: 6, y: -18 }, str: { x: 10, y: 3 }, klippPos: { x: 0, y: 266 }, animasjon: { dekk: { px: 0, minX: 0, maksX: 3 } } },
      dekkHF: { skalVise:true, tegneRekkefolge: 'under',  midt: { x: 0.5, y: 0.5 }, pos: { x: 6, y: 18 }, str: { x: 10, y: 3 }, klippPos: { x: 0, y: 264 }, animasjon: { dekk: { px: 0, minX: 0, maksX: 3 } } },
      dekkVB: { skalVise:true, tegneRekkefolge: 'under',  midt: { x: 0.5, y: 0.5 }, pos: { x: -6, y: -18 }, str: { x: 10, y: 3 }, klippPos: { x: 0, y: 266 }, animasjon: { dekk: { px: 0, minX: 0, maksX: 3 } } },
      dekkHB: { skalVise:true, tegneRekkefolge: 'under',  midt: { x: 0.5, y: 0.5 }, pos: { x: -6, y: 18 }, str: { x: 10, y: 3 }, klippPos: { x: 0, y: 264 }, animasjon: { dekk: { px: 0, minX: 0, maksX: 3 } } },
      minidekkV: { skalVise:true, tegneRekkefolge: 'under',  midt: { x: 0.5, y: 0.5 }, pos: { x: 27, y: -18 }, str: { x: 5, y: 3 }, klippPos: { x: 0, y: 266 }, animasjon: { dekk: { px: 0, minX: 0, maksX: 3 } } },
      minidekkH: { skalVise:true, tegneRekkefolge: 'under',  midt: { x: 0.5, y: 0.5 }, pos: { x: 27, y: 18 }, str: { x: 5, y: 3 }, klippPos: { x: 0, y: 264 }, animasjon: { dekk: { px: 0, minX: 0, maksX: 3 } } },
      karosseri: { skalVise:true, tegneRekkefolge: 'under',  midt: { x: 0.5, y: 0.5 }, pos: { x: 11, y: 0 }, str: { x: 71, y: 32 }, klippPos: { x: 12, y: 342 }, animasjon: {} },
      presseBall: { skalVise:true, tegneRekkefolge: 'under',  midt: { x: 0.5, y: 0.5 }, pos: { x: 1, y: 0 }, str: { x: 2, y: 12 }, klippPos: { x: 23, y: 376 }, animasjon: { gras: { startX: 2, maksX: 12, startY: 12, maksY: 12 }, pos: { x: -18, y: 0, tid: 80, status: 0 }, klipp: { Xstart: 23, Ystart: 376, Xhopp: 1, Yhopp: 0, Xmaks: 26, Ymaks: 376, repitisjonar: 'evig', status: 0 } } },
      pakkeBall: { skalVise:true, tegneRekkefolge: 'under',  midt: { x: 0.5, y: 0.5 }, pos: { x: -17, y: 0 }, str: { x: 0, y: 0 }, klippPos: { x: 14, y: 376 }, animasjon: { pos: { x: -17, y: 0, tid: 50, status: 0 }, klipp: { Xstart: 14, Ystart: 376, Xhopp: 1, Yhopp: 0, Xmaks: 0, Ymaks: 0, repitisjonar: 17, status: 0 } } },
      pakkearm: { skalVise:true, tegneRekkefolge: 'under',  midt: { x: 0.5, y: 0.5 }, pos: { x: -19, y: 0 }, str: { x: 10, y: 25 }, klippPos: { x: 0, y: 346 }, animasjon: { retning: { retning: 900, tid: 900, status: 0 } } },
  },
  svingFartVedArbeid: 0.5,
  fart: { aktiv: 0, maks: 0, friksjon: 0, aks: 0, landskap: 0, arbeid: -0.3, krasj: 0 ,tyngde: 4},
  last: { valgtLast: 'gras',  mottar:['gras'], leverer:[], 
    laster: {
      gras: { maks: 300, visNiva:false, lastTilDoning: false,
        mottak:{ plass:'', mengde:-1, evigLager:false},
        levering: { punkt:'', mengde:-1, evigLager:false},
      },
    },
  },
  arbeid: {
    type: 'ballemaskin',
    punkt: [
      { x: 27, y: -15, type: 'type1' },
      { x: 27, y: -12, type: 'type1' },
      { x: 27, y: - 9, type: 'type1' },
      { x: 27, y: - 6, type: 'type1' },
      { x: 27, y: - 3, type: 'type1' },
      { x: 27, y: 0, type: 'type1' },
      { x: 27, y: 3, type: 'type1' },
      { x: 27, y: 6, type: 'type1' },
      { x: 27, y: 9, type: 'type1' },
      { x: 27, y: 12, type: 'type1' },
      { x: 27, y: 15, type: 'type1' }
    ],
    type1: {blirTil: 'grasHausta', last: { type: 'gras', mengde: 1 } },
    type2: null,
  }, 
  butikk: { type: 'kjoretoy', bilde: 'butikkTraktor0', tittel: 'ingen', pris: 20000 },
  funksjonane: {
    doningFlytta: (denne:any) => {
      animerDekk(denne.grafikk['dekkVB'].animasjon.dekk, denne.grafikk['dekkVB'].klippPos, denne.pos.midt);
      animerDekk(denne.grafikk['dekkHB'].animasjon.dekk, denne.grafikk['dekkHB'].klippPos, denne.pos.midt);
      animerDekk(denne.grafikk['dekkVF'].animasjon.dekk, denne.grafikk['dekkVF'].klippPos, denne.pos.midt);
      animerDekk(denne.grafikk['dekkHF'].animasjon.dekk, denne.grafikk['dekkHF'].klippPos, denne.pos.midt);    
      animerDekk(denne.grafikk['minidekkV'].animasjon.dekk, denne.grafikk['minidekkV'].klippPos, denne.pos.midt);
      animerDekk(denne.grafikk['minidekkH'].animasjon.dekk, denne.grafikk['minidekkH'].klippPos, denne.pos.midt);
    },
    lastErEndra: (denne:any) => {
      //presseBall
      animerKlipp(denne.grafikk['presseBall'], 1, false)
      oppdaterLastStrAnimasjon(denne, denne.grafikk.presseBall, denne.last.gras);
      if (denne.last.pakkeBall && denne.grafikk.pakkearm.animasjon.retning && denne.last.pakkeBall.niva != 0) {//Pakkearm snurrer visst det er ein pakkeBall
        animerRetning(denne.grafikk['pakkearm'], 1, false)
        denne.grafikk.pakkearm.animasjon.retning.status = 0;//gjer at den snurrer evig
        animerKlipp(denne.grafikk['presseBall'], 1, false)
      }
      if (denne.last.gras && denne.last.presseBall && denne.last.gras.niva === denne.last.gras.maks) {
        denne.last.presseBall.niva = 1;
        flagg.push('lastAnimasjonLoop')
      }
    },
    lastAnimasjonLoop: (denne:any) => {
      // Flytte ballar
      if (doning.fart.aktiv > 0.2) {//Doning må stå stille for å sleppe av ball
        flagg.push('lastAnimasjonLoop')
        return;
      }
      if(!denne.last.gras || !denne.last.pakkeBall || !denne.last.presseBall){return};
      if ( denne.last.gras.niva === denne.last.gras.maks) {
        if(denne.last.presseBall.niva > 0){
          if(!animerPosisjon(denne.grafikk['presseBall'], 1, true)){
            denne.last.gras.niva = 0;// sett grasniva til 0 slik at plukkinga kan starte igjen
            denne.last.presseBall.niva = 0;
            denne.grafikk.presseBall.pos.x = 0;
            denne.grafikk.presseBall.str.x = 0;
            denne.grafikk.presseBall.str.y = 0;
            denne.last.pakkeBall.niva = 1;
            denne.grafikk.pakkeBall.str.x = 12;
            denne.grafikk.pakkeBall.str.y = 12;
          }
        }
        if(denne.grafikk.pakkeBall.animasjon.klipp && denne.last.pakkeBall.niva > 0){
          if(!animerPosisjon(denne.grafikk['pakkeBall'], 1, true)) {
            //nyTing('siloBall', 'siloBall' + ting.length, {x:denne.pos.midt.x + denne.grafikk.pakkeBall.pos.x, y:denne.pos.midt.y + denne.grafikk.pakkeBall.pos.y})
            denne.grafikk.pakkeBall.pos.x = -17;
            denne.grafikk.pakkeBall.animasjon.klipp.status = 0;//tilbakestiller klipp til grøn ball
          }
          flagg.push('lastAnimasjonLoop')
        }
      
      }
    },
  },
}