
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
  

 
  
   //______________________ skurtreskar1
  skurtreskar1: {
    navn: 'New-Holland-Traditional',
    type: 'doning',
    retning: { aktiv: 0, tmp: 0 },
    startRute: { tilSjekk:[], x: 6, y: 2 },
    pos: {
      midt:{x:0,y:0},dor: { dx: -12, dy: 12},
      framKrok: { dx: 12, dy: 0},
      bakKrok: { dx: -52, dy: 0},
      lossePunkt: {
        korn: { dx: -24, dy: -38, x: 0, y: 0, tx: 0, ty: 0 },
        drivstoff: { dx: 24, dy: -38, x: 0, y: 0, tx: 0, ty: 0 }
      }
    },
    krasj: {
      framSider: [['dekkVF', 'dekkHF']], bakSider: [['bh', 'bv']], andreSider: [['dekkVB', 'dekkVF'], ['dekkHB', 'dekkHF']] ,
      punkt: {
        dekkVF: { dx: 11, dy: -22, x: 0, y: 0, tx: 0, ty: 0 },
        dekkHF: { dx: 11, dy: 22, x: 0, y: 0, tx: 0, ty: 0 },
        dekkVB: { dx: -47, dy: -17, x: 0, y: 0, tx: 0, ty: 0 },
        dekkHB: { dx: 47, dy: 17, x: 0, y: 0, tx: 0, ty: 0 },
        bv: { dx: -52, dy: -11, x: 0, y: 0, tx: 0, ty: 0 },
        bh: { dx: -52, dy: 11, x: 0, y: 0, tx: 0, ty: 0 },
        royrfeste: { dx: -24, dy: -10, x: 0, y: 0, tx: 0, ty: 0 },
        royrtupp: { dx: -24, dy: -38, x: 0, y: 0, tx: 0, ty: 0 }
      }
    },
    grafikk: {
      dekkVF:    { skalVise:true, tegneRekkefolge: 'under', midt: {x:0.5,y:0.5}, pos:{x:  0,y:-18},str:{x:20,y: 8}, klippPos: {x: 0,y:255}, animasjon: {dekk:{px:0, minX:0, maksX:3}}},
      dekkHF:    { skalVise:true, tegneRekkefolge: 'under', midt: {x:0.5,y:0.5}, pos:{x:  0,y: 18},str:{x:20,y: 8}, klippPos: {x: 0,y:255}, animasjon: {dekk:{px:0, minX:0, maksX:3}}},
      dekkVB:    { skalVise:true, tegneRekkefolge: 'under', midt: {x:0.5,y:0.5}, pos:{x:-39,y:-15},str:{x:10,y: 5}, retning: 0,    klippPos: {x: 0,y:264}, animasjon: {dekk:{px:0, minX:0, maksX:3}, sving:{venstre:30, hogre:-23, beint:0 }}},
      dekkHB:    { skalVise:true, tegneRekkefolge: 'under', midt: {x:0.5,y:0.5}, pos:{x:-39,y: 15},str:{x:10,y: 5}, retning: 0,    klippPos: {x: 0,y:264}, animasjon: {dekk:{px:0, minX:0, maksX:3}, sving:{venstre:23, hogre:-30, beint:0 }}},
      karosseri: { skalVise:true, tegneRekkefolge: 'under', midt: {x:0.5,y:0.5}, pos:{x:-19,y:  0},str:{x:63,y:28},animasjon:{}, klippPos: {x: 0,y:226}},
      royr:      { skalVise:true, tegneRekkefolge: 'under', midt: {x:  0,y:0.5}, pos:{x:-15,y:-7 },str:{x:33,y: 6}, retning: 180 , klippPos: {x:30,y:255}, animasjon:{ retning:{ retning:90, tid:100, status:0 }}},
     
     },
    fart: { aktiv: 0, maks: 1, friksjon: 0.2, aks: 0.3, landskap: 0, arbeid: 0, krasj:0},//aks må ver større enn friksjon
    tyngde: 6,
    sving: {fart: 'fart' },
    last: { valgtLast: 'korn', lossePlass: null, lossePunkter: ['drivstoff', 'korn'],
        drivstoff:{lastPlassering:'denne', visNiva: true, niva:500, maks: 500, lossePunkt:'drivstoff', mengde:1, lossePunktAktiv:false, aktivLossePlass:null },
        korn: {lastPlassering:'denne', visNiva: true , niva: 0 , maks: 500,  lossePunkt:'korn', mengde:-1, lossePunktAktiv:false, aktivLossePlass:null, lossearmUte:false },
        muligTypar: ['korn'],
    },
    arbeid: { type: 'traktor', aktiv: false },
    butikk: { type: 'doning', bilde: 'butikkTraktor0', tittel: 'ingen', pris: 20000 },
    funksjonane:[ 
      ['doningFlytta', function (denne:Maskin) {
        animerDekk(denne.grafikk['dekkVB'].animasjon.dekk, denne.grafikk['dekkVB'].klippPos, denne.pos.midt);
        animerDekk(denne.grafikk['dekkHB'].animasjon.dekk, denne.grafikk['dekkHB'].klippPos, denne.pos.midt);
        animerDekk(denne.grafikk['dekkVF'].animasjon.dekk, denne.grafikk['dekkVF'].klippPos, denne.pos.midt);
        animerDekk(denne.grafikk['dekkHF'].animasjon.dekk, denne.grafikk['dekkHF'].klippPos, denne.pos.midt);    
      }],
      ['sving', function (denne:Maskin) {
      animerSving( denne.sving.fram,denne.grafikk.dekkVF);
      animerSving( denne.sving.fram,denne.grafikk.dekkHF);
      flagg.push('teinMaskinar');
      }],
      ['drivstoffMottaking', function (denne:Maskin) {
        if(denne.last.drivstoff){
          fyllDrivstoff(denne, denne.last.drivstoff.mengde)
        }
      }],
      ['kornLevering', function (denne:Maskin) {
        if(!denne.last.korn){return;}
        if(denne.last.korn.lossePunktAktiv && denne.last.korn.niva > 0){
          if(!denne.last.korn.lossearmUte){
            if(!animerRetning(denne.grafikk['royr'].animasjon.retning,1, false)){ 
              denne.last.korn.lossearmUte = true;
            }
          }else{
            oppdaterLast(denne, denne.last.korn.aktivLossePlass, 'korn', -1 )
          }
          flagg.push('kornLevering');
        }else if(animerRetning(denne.grafikk['royr'].animasjon.retning,-1, false)){
          denne.last.korn.lossearmUte = false;
          flagg.push('kornLevering');
        }
      }],
    ]
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