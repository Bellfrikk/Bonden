
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
  


*/