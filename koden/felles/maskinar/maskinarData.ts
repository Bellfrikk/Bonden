
/*
 //Ferrari
ferrari: {
    navn: 'ferrari',
    type: 'doning',
    retning: { aktiv: 0, tmp: 0 },
    startRute: { x: 25, y: 3 },
    pos: {
      midt:{x:0,y:0},dor: { dx: -12, dy: 12},
      framKrok: { dx: 30, dy: 0},
      bakKrok: { dx: -8, dy: 0},
      lossePunkt: { drivstoff: { dx: 35, dy: 0, x: 0, y: 0, tx: 0, ty: 0 } }
    },
    krasj: {
      framSider: [['fv', 'fh']], bakSider: [['bh', 'bv']], andreSider: [['bh', 'fh'], ['bv', 'fv']],
      punkt: {
        bh: { dx: -8, dy: -13, x: 0, y: 0, tx: 0, ty: 0 },
        fh: { dx: 27, dy: -11, x: 0, y: 0, tx: 0, ty: 0 },
        fv: { dx: 27, dy: 11, x: 0, y: 0, tx: 0, ty: 0 },
        bv: { dx: -8, dy: 13, x: 0, y: 0, tx: 0, ty: 0 },
      }
    },
    grafikk: {
        karosseri: { skalVise:true, tegneRekkefolge: 'under',  midt: { x: 0.5, y: 0.5 }, pos: { x: 16, y: 0 }, str: { x: 53, y: 26 }, klippPos: { x: 0, y: 400 }, animasjon: { dekk: { px: 0, minX: 0, maksX: 3 } }, retning: null }
      
      },

    fart: { aktiv: 0, maks: 3, friksjon: 0.4, aks: 0.5, landskap: 0, arbeid: 0, krasj: 0 },//aks må ver større enn friksjon
    tyngde: 1.5,
    sving: {fart: 'fart' },
    last: {
      lossePlass: null, lossePunkter: ['drivstoff'], valgtLast: null,
      drivstoff: { visNiva: true, niva: 3000, maks: 3000, lossePunkt: 'drivstoff', mengde: 10, lossePunktAktiv: false, aktivLossePlass: null },
    },
    arbeid: { type: 'traktor', aktiv: false },
    butikk: { type: 'doning', bilde: 'butikkTraktor0', tittel: 'BLÅTASS GL2', pris: 20000 },
    funksjonane: [
      'drivstoffMottaking', function (denne:Maskin) {
        if(denne.last.drivstoff){
          fyllDrivstoff(denne, denne.last.drivstoff.mengde)
        }
      }
    ],
  },
  
//______________________ treskeSkjer 1
treskeSkjer1: {
    navn: 'treskeSkjer1',
    type: 'framFeste',
    retning: { aktiv: 0, tmp: 0 },
    startRute: { tilSjekk: [], x: 7, y: 2 },
    pos: {
      midt:{x:0,y:0},dor: { dx: 0, dy: 0},
      framKrok: { dx: 0, dy: 0},
      bakKrok: { dx: 0, dy: 0}
    },
    krasj: {
      framSider: [['fv', 'fh']], bakSider: [['bh', 'bv']], andreSider: [['bh', 'fh'], ['bv', 'fv']],
      punkt: {
        bh: { dx: 0, dy: 12, x: 0, y: 0, tx: 0, ty: 0 },
        fh: { dx: 17, dy: 21, x: 0, y: 0, tx: 0, ty: 0 },
        fv: { dx: 17, dy: -21, x: 0, y: 0, tx: 0, ty: 0 },
        bv: { dx: 0, dy: -21, x: 0, y: 0, tx: 0, ty: 0 }
      },
    },
    arbeid: {
      type: 'treskeSkjer', aktiv: false,
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
      type1: { blirTil: { aktivType: 'korn', korn: 'kornHausta' }, last: { type: 'korn', mengde: 1 } },
      type2: { blirTil: { aktivType: 'halm', halm: 'halm' }, last: { type: 'korn', mengde: 1 } },
    },
    grafikk: {
        karosseri: { skalVise:true, tegneRekkefolge: 'under', midt: { x: 0.5, y: 0.5 }, pos: { x: 10, y: 0 }, str: { x: 17, y: 44 }, retning: 0, klippPos: { x: 140, y: 227 } },//, { x: 157, y: 227 }, { x: 174, y: 227 }] }
    
  },
    sving: { fart: 0.5 },
    fart: { aktiv: 0, maks: 0, friksjon: 0, aks: 0, landskap: 0, arbeid: -0.5, krasj: 0 },
    tyngde: 0.5,
    last: {
      valgtLast: 'korn', lossePlass: null, lossePunkter: null, drivstoff: null,
      korn: { lastPlassering: 'doning', visNiva: false, niva: null, maks: null, lossePunkt: null, mengde: 1 },
    },
    butikk: { type: 'redskap/maskin/ting', bilde: 'bildenavn', tittel: '', pris: 0 },
    funksjonane: null,
  },
}

*/