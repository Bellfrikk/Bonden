class Bil extends MaskinKjoretoyMal {
  grafikk: {
      karosseri : GrafikkDelBase,
  }

  constructor (ny:BilData, rute:Posisjon){
    super(ny, rute)
    this.grafikk = {
        karosseri : ny.grafikk.karosseri,
    }
    this.last.laster.drivstoff.niva = ny.last.laster.drivstoff.maks;
  }
}

interface BilData extends MaskinKjoretoyData {
  grafikk: {
      karosseri : GrafikkDelBase,
  };
}


const ferrari:BilData = {
    navn: 'ferrari',
    type: 'doning',
    pos: {
      dor: { dx: -12, dy: 12},
      framKrok: { dx: 30, dy: 0},
      bakKrok: { dx: -8, dy: 0},
      lossePunkt: { drivstoff: { dx: 35, dy: 0} }
    },
    krasj: {
      framSider: [['fv', 'fh']], bakSider: [['bh', 'bv']], andreSider: [['bh', 'fh'], ['bv', 'fv']],losseSider:[],
      punkt: {
        bh: { dx: -8, dy: -13 },
        fh: { dx: 27, dy: -11 },
        fv: { dx: 27, dy: 11 },
        bv: { dx: -8, dy: 13 },
      }
    },
    grafikk: {
        karosseri: { skalVise:true, tegneRekkefolge: 'under',  midt: { x: 0.5, y: 0.5 }, pos: { x: 16, y: 0 }, str: { x: 53, y: 26 }, klippPos: { x: 0, y: 400 }, retning: 0 }
      },
      sving: { fart: 'fart'},
      arbeid: {type: 'traktor',punkt: [],type1: null,type2: null },
    fart: { aktiv: 0, maks: 3, friksjon: 0.4, aks: 0.5, landskap: 0, arbeid: 0, krasj: 0,tyngde: 1.5},
    last: { valgtLast:'drivstoff', mottar:['drivstoff'], leverer:[], 
      laster:{
        drivstoff: { visNiva: true, maks: 3000, lastTilDoning: false,
          mottak:{plass:'drivstoff', mengde:10, evigLager:false},
          levering:{punkt:'', mengde:0, evigLager:false}
        }
      }
    },
    butikk: { type: 'kjoretoy', bilde: 'butikkFerrarri', tittel: 'Ferrarri', pris: 200000 },
    funksjonane: {
      drivstoffMottaking: (denne:any) => {
        if(denne.last.laster.drivstoff){
          fyllDrivstoff(denne, denne.last.laster.drivstoff.mottak.mengde)
        }
      }
    }
  }