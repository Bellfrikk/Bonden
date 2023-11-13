"use strict";

let zoom = 1.7;
const koblingsKaranteneMargin = 50;
let pixel = { ruter: [37,21], ruteLengde: Math.floor(40 * zoom), jordeLengde: Math.floor(8 * zoom), start: {x:0,y:0},};//jordelengde må stemme med antall jorder
let skjerm = {bredde: 0, hoyde:0, hoydeTopplinje: 0, startHoydeLandskap: 0, hoydeLandskap: 0, hoydeButikk: 0,startHoydeKnappar: 0,hoydeKnappar: 0,hogre: 0,botn: 0};
const pris = { drivstoff: 1 };
let peng = 10000;

let knappar = {
  str: 50, min: 50, maks: 80, marg: 10, ikonStr: 39, etasjer: 0,
  liste: ['fram', 'bak', 'utAvDoning', 'koblingRedskapFram', 'aktiverRedskapFram', 'koblingRedskapBak', 'aktiverRedskapBak','venstre', 'hogre', 'drivstoff', 'lastOppi', 'lastUtav'],
  fram:               { vis: true,  visAktiv: true,  trykkAktivet: false, plasseringSide: 'venstreNere', plasseringNr: 1, ikonNr: 1, v: 0, t: 0, h: 0, b: 0, },
  bak:                { vis: true,  visAktiv: true,  trykkAktivet: false, plasseringSide: 'venstreNere', plasseringNr: 2, ikonNr: 0, v: 0, t: 0, h: 0, b: 0, },
  utAvDoning:         { vis: false, visAktiv: false, trykkAktivet: false, plasseringSide: 'midtNere',    plasseringNr: 3, ikonNr: 4, v: 0, t: 0, h: 0, b: 0, },
  koblingRedskapFram: { vis: false, visAktiv: false, trykkAktivet: false, plasseringSide: 'venstreOppe', plasseringNr: 1, ikonNr: 5, v: 0, t: 0, h: 0, b: 0, },
  aktiverRedskapFram: { vis: false, visAktiv: false, trykkAktivet: false, plasseringSide: 'venstreOppe', plasseringNr: 2, ikonNr: 7, v: 0, t: 0, h: 0, b: 0, },
  koblingRedskapBak:  { vis: false, visAktiv: false, trykkAktivet: false, plasseringSide: 'hogreOppe',   plasseringNr: 2, ikonNr: 6, v: 0, t: 0, h: 0, b: 0, },
  aktiverRedskapBak:  { vis: false, visAktiv: false, trykkAktivet: false, plasseringSide: 'hogreOppe',   plasseringNr: 1, ikonNr: 7, v: 0, t: 0, h: 0, b: 0, },
  venstre:            { vis: true,  visAktiv: true,  trykkAktivet: false, plasseringSide: 'hogreNere',   plasseringNr: 2, ikonNr: 2, v: 0, t: 0, h: 0, b: 0, },
  hogre:              { vis: true,  visAktiv: true,  trykkAktivet: false, plasseringSide: 'hogreNere',   plasseringNr: 1, ikonNr: 3, v: 0, t: 0, h: 0, b: 0, },
  drivstoff:          { vis: false, visAktiv: false, trykkAktivet: false, plasseringSide: 'venstreOppe', plasseringNr: 3, ikonNr: 8, v: 0, t: 0, h: 0, b: 0, },
  lastOppi:           { vis: false, visAktiv: false, trykkAktivet: false, plasseringSide: 'venstreOppe', plasseringNr: 3, ikonNr: 9, v: 0, t: 0, h: 0, b: 0, },
  lastUtav:           { vis: false, visAktiv: false, trykkAktivet: false, plasseringSide: 'venstreOppe', plasseringNr: 3, ikonNr:10, v: 0, t: 0, h: 0, b: 0, }
};

const orginalMaskin = {
  butikkListe: {
    doninger: ['traktor0'],
    redskap: ['samaskin0'],
  },

  bonde : {
    navn: 'bonde',
    type: 'bonde',
    retning: {aktiv:0, tmp:0}, 
    rute: {x:2,y:2},
    pos: { midt: {x:0,y:0,tx:0,ty:0,fx:0, fy:0}, dor: {dx:0,dy:0,x:0,y:0,tx:0,ty:0}, framKrok: {dx:0,dy:0,x:0,y:0,tx:0,ty:0}, bakKrok: {dx:0,dy:0,x:0,y:0,tx:0,ty:0},},
    krasj: { 
      sider: { framSider:[['fv','fh']],bakSider:[['bh','bv']],andreSider:[['bh','fh'],['bv','fv']]},
      punkt:{
        bh:{dx:-8,dy:-15,x:0,y:0,tx:0,ty:0},
        fh:{dx: 8,dy:-15,x:0,y:0,tx:0,ty:0},
        bv:{dx:-8,dy: 15,x:0,y:0,tx:0,ty:0},
        fv:{dx: 8,dy: 15,x:0,y:0,tx:0,ty:0},
      }
    },
    grafikk:{
      fil:'bonden',
      aktivListe:['bonden'],
      animerVed:{kjore:['bonden'], svinge:null, arbeidKjore:null, arbeidAktiv:null},
      bonden:   { pos:{x:0,y:0}, str:{x:26,y:31}, animasjon: { fart:2, retning:null, aktiv:0}, klippPos:[{x:0,y:0},{x:0,y:32},{x:0,y:64},{x:0,y:96},{x:0,y:128},{x:0,y:160},{x:0,y:192},{x:0,y:224}]}
    },
    fart: { aktiv: 0, maks: 1.5, friksjon: 0.4, aks: 0.5, landskap: 0 , arbeid:0},
    sving: { fram: 'beint', bak: 'beint' , fart:4 },   
    drivstoff: { niva: null,  maks: null },   
    last: {niva: 0, type: null, maks: null, mottar: [null] },
    arbeid: { type: 'bonde' ,aktiv: false },
  },
  
  traktor0 : {
    navn: 'traktor0',
    type: 'doning',
    retning: {aktiv:0, tmp:0}, 
    rute: {x:2,y:3},
    pos: { midt: {x:0,y:0,tx:0,ty:0,fx:0, fy:0}, dor:{dx:-12,dy:12,x:0,y:0,tx:0,ty:0}, framKrok:{dx:30, dy:0,x:0,y:0,tx:0,ty:0}, bakKrok:{dx:-8, dy:0,x:0,y:0,tx:0,ty:0},},
    krasj: {
      sider: { framSider:[['fv','fh']],bakSider:[['bh','bv']],andreSider:[['bh','fh'],['bv','fv']]},
      punkt:{
        bh:{dx:-8, dy:-13,x:0,y:0,tx:0,ty:0},
        fh:{dx:27, dy:-11,x:0,y:0,tx:0,ty:0},
        fv:{dx:27, dy: 11,x:0,y:0,tx:0,ty:0},
        bv:{dx:-8, dy: 13,x:0,y:0,tx:0,ty:0}
      }
    },
    grafikk:{
      fil:'traktorar',
      aktivListe:['dekkVB','dekkHB','dekkVF','dekkHF','karosseri'],
      animerVed:{kjore:['dekkVB','dekkHB','dekkVF','dekkHF'], svinge:['dekkVF','dekkHF'], arbeidKjore:null, arbeidAktiv:null},
      dekkVB:   { pos:{x:0, y:-12},  str:{x:15, y:5}, animasjon: { fart:5, retning:null, aktiv:0}, klippPos:[{x:0,y:25},{x:1,y:25},{x:2,y:25}]},
      dekkHB:   { pos:{x:0, y:12},   str:{x:15, y:5}, animasjon: { fart:5, retning:null, aktiv:0}, klippPos:[{x:0,y:26},{x:1,y:26},{x:2,y:26}]}, 
      dekkVF:   { pos:{x:22, y:-8}, str:{x:10, y:4}, animasjon:{ fart:3, retning:{aktiv:0, venstre:45, hogre:-35, beint:0}, aktiv:0}, klippPos:[{x:0,y:25},{x:1,y:25},{x:2,y:25}] },
      dekkHF:   { pos:{x:22, y:8},  str:{x:10, y:4}, animasjon:{ fart:3, retning:{aktiv:0, venstre:35, hogre:-45, beint:0}, aktiv:0}, klippPos:[{x:0,y:25},{x:1,y:25},{x:2,y:25}] },
      karosseri:{ pos:{x:10, y:0}, str:{x:37, y:25},animasjon: { fart:5, retning:null, aktiv:0}, klippPos:[{x:0,y:0}]}
    },

    fart: { aktiv: 0, maks: 1.5, friksjon: 0.4, aks: 0.5, landskap: 0 , arbeid:0},
    sving: { fram: 'beint', bak: 'beint', fart: 'fart' },   
    drivstoff: { niva: 300,  maks: 300 },   
    last: {niva: 0,type: null, maks: null, mottar: [null]  },
    arbeid: { type: 'traktor' ,aktiv: false }, 
    butikk: { type:'doning', bilde: 'butikkTraktor0', tittel:'BLÅTASS GL2',pris: 20000 }
  }, 
  
  samaskin0 : {
    navn: 'samaskin0',
    type: 'bakFeste',
    retning: {aktiv:0, tmp:0}, 
    rute: {x:2,y:4},
    pos: { midt:{x:0,y:0,tx:0,ty:0,fx:0, fy:0}, dor: {dx:-12,dy:12,x:0,y:0,tx:0,ty:0},framKrok: {dx:30, dy:0, x:0,y:0,tx:0,ty:0},bakKrok: {dx:-8, dy:0, x:0,y:0,tx:0,ty:0}},
    krasj: {
      sider: { framSider:[['fv','fh']],bakSider:[['bh','bv']],andreSider:[['bh','fh'],['bv','fv']]},
      punkt:{
        bh:{dx:-8, dy:-13,x:0,y:0,tx:0,ty:0},
        fh:{dx:27, dy:-11,x:0,y:0,tx:0,ty:0},
        fv:{dx:27, dy: 11,x:0,y:0,tx:0,ty:0},
        bv:{dx:-8, dy: 13,x:0,y:0,tx:0,ty:0}
      }
    },
    grafikk:{
      fil:'samaskinar',
      aktivListe:['dekk','karosseri'],
      animerVed:{kjore:['dekk'], svinge:null, arbeidKjore:null, arbeidAktiv:null},
      dekk:       { pos:{x:-9,y: 0}, str:{x:2,y:29}, animasjon:{ fart:5, retning:null, aktiv:0 }, klippPos:[{x:0,y:0},{x:3,y:0}]},
      karosseri:  { pos:{x:-4,y: 0}, str:{x:8,y:29}, animasjon:{ fart:5, retning:null, aktiv:0 }, klippPos:[{x:4,y:0}]},
      kornVenstre:{ pos:{x:-4,y:-7}, str:{x:5,y:13}, animasjon:{ fart:5, retning:null, aktiv:3 }, klippPos:[{x:0,y:31},{x:6,y:31},{x:11,y:31},{x:16,y:31}]},
      kornHogre:  { pos:{x:-4,y: 7}, str:{x:5,y:13}, animasjon:{ fart:5, retning:null, aktiv:3 }, klippPos:[{x:0,y:31},{x:6,y:31},{x:11,y:31},{x:16,y:31}]},
      grasVenstre:{ pos:{x:-4,y:-7}, str:{x:5,y:13}, animasjon:{ fart:5, retning:null, aktiv:3 }, klippPos:[{x:0,y:43},{x:6,y:43},{x:11,y:43},{x:16,y:43}]},
      grasHogre:  { pos:{x:-4,y: 7}, str:{x:5,y:13}, animasjon:{ fart:5, retning:null, aktiv:3 }, klippPos:[{x:0,y:43},{x:6,y:43},{x:11,y:43},{x:16,y:43}]},
    },
    sving: { fart: 0.5 },   
    fart: { vanlig: 0, arbeid:-0.5},
    last: {niva: 100, maks: 100 , type:'kornfro', mottar: ['grasfro', 'kornfro'], blirTil: { grasfrø: 'grasSadd', kornfrø: 'kornSadd' } },
    arbeid: { type: 'samaskin' ,  aktiv: false },
    butikk: { type:'redskap', bilde: 'butikkSamaskin0', tittel:'SÅMASKIN R',pris: 20000 }
  }
};
/*
  skurtreskar1 : {
    navn: 'skurtreskar1', 
    type: 'doning',
    pos: {px: [0,0], retning: 0, rute: [3,6]},
    teinData:{
      aktivListe:['dekkVB','dekkHB','dekkVF','dekkHF','karosseri','royr'],
      animerVed:{kjore:['dekkVB','dekkHB','dekkVF','dekkHF'], svinge:['dekkVB','dekkHB'], arbeidKjore:null, arbeidAktiv:null},
      dekkVF:   {klipp:['dekkVF'], animasjon: { fart:5, retning:null, aktiv:0}},
      dekkHF:   {klipp:['dekkHF'], animasjon: { fart:5, retning:null, aktiv:0}},
      dekkVB:   {klipp:['dekkVB'], animasjon: { fart:5, retning:{aktiv:0, venstre:-45, hogre:35, beint:0}, aktiv:0}},
      dekkHB:   {klipp:['dekkHB'], animasjon: { fart:5, retning:{aktiv:0, venstre:-35, hogre:45, beint:0}, aktiv:0}},
      karosseri:{klipp:['karosseri'],animasjon: null},
      royr:     {klipp:['royr'],animasjon: null}
    },
    bildeData:{
     fil:'skurtreskarar',
     dekkVB:   {plassPos:[-48,-17],  str:[10,5], klippPos:[[0,25],[1,25],[2,25]]},//Har ikke lagt inn ennå
     dekkHB:   {plassPos:[8,9],   str:[15,5], klippPos:[[0,26],[1,26],[2,26]]},
     dekkVF:   {plassPos:[17,10], str:[10,4], klippPos:[[0,25],[1,25],[2,25]]},
     dekkHF:   {plassPos:[17,6],  str:[10,4], klippPos:[[0,25],[1,25],[2,25]]},
     karosseri:{plassPos:[12,13], str:[37,26],klippPos:[0,0]},
     royr:     {plassPos:[12,13], str:[37,26],klippPos:[0,0]},
    },
    punkt:{
      krasj: [[0,0,-8,-13],[0,0,27,-11],[0,0,27,11],[0,0,-8,13]],
      dor: [[0,0,-12,12]], 
      framKrok: [[0,0,30,0]],
      bakKrok: [[0,0,-8,0]]
    },
    fart: { aktiv: 0, maks: 1.5, friksjon: 0.4, aks: 0.5, landskap: 0 , arbeid:0},
    sving: { fram: 'beint', bak: 'beint' , fart: 'fart' },   
    drivstoff: { niva: 500,  maks: 500 },   
    last: {niva: 0, type: null, maks: 8 , mottar: [null] },
    arbeid: { type: 'traktor' , aktiv: false },
    butikk: { type:'doning', bilde: 'butikkSkurtreskar0',    tittel:'GOOGLETRESKER 1',pris: 20000 }
  },


traktor0 : {
  navn: 'traktor0',
  type: 'doning',
  pos: {px: [0,0], retning: 0, rute: [3,3], framKrok:[0,0], bakKrok:[0,0] ,fv:[0,0],fh:[0,0],bh:[0,0],bv:[0,0]},      
  bilde: { bredde: 37, hoyde: 26, svingAnim: 0, tidAnim: 0, kjoreAnim: 0, maksKjoreAnim: 5 ,pxDor: [10,25], pxFramKrok: [-35,0] ,pxBakKrok: [20,0], pxBak: 12, pxFram: 26, pxV: 13, pxH: 13},    
  fart: { aktiv: 0, maks: 1.5, friksjon: 0.4, aks: 0.5, landskap: 0 , arbeid:0},
  sving: { fram: 'beint', bak: 'beint', fart: 'fart' },   
  drivstoff: { niva: 300,  maks: 300 },   
  last: {niva: 0,type: null, maks: null, mottar: [null]  },
  arbeid: { type: 'traktor' ,aktiv: false }, 
  butikk: { type:'doning', bilde: 'butikkTraktor0', tittel:'BLÅTASS GL2',pris: 20000 }
},                                                                                                                                                                                          
traktor1 : {
  navn: 'traktor1',
  type: 'doning',
  pos: {px: [0,0], retning: 0, rute: [3,4], framKrok:[0,0], bakKrok:[0,0] ,fv:[0,0],fh:[0,0],bh:[0,0],bv:[0,0]},      
  bilde: { bredde: 48, hoyde: 32, svingAnim: 0, tidAnim: 0, kjoreAnim: 0, maksKjoreAnim: 5 ,pxDor: [30,45], pxFramKrok: [-45,0] ,pxBakKrok: [15,0], pxBak: 12, pxFram: 32, pxV: 17, pxH: 17},    
  fart: { aktiv: 0, maks: 2, friksjon: 0.6, aks: 0.7, landskap: 0 , arbeid:0},
  sving: { fram: 'beint', bak: 'beint', fart: 'fart' },   
  drivstoff: { niva: 400,  maks: 400 },
  last: {niva: 0,type: null, maks: null, mottar: [null]  },
  arbeid: { type: 'traktor' ,aktiv: false }, 
  butikk: { type:'doning', bilde: 'butikkTraktor0', tittel:'BLÅTASS GL2',pris: 20000 }
},
skurtreskar1 : {
  navn: 'skurtreskar1', 
  type: 'doning',
  pos: {px: [0,0], retning: 0, rute: [3,6], framKrok:[0,0], bakKrok:[0,0], fv:[0,0],fh:[0,0],bh:[0,0],bv:[0,0]}, 
  bilde: { bredde: 34, hoyde: 22, svingAnim: 0, tidAnim: 0, kjoreAnim: 0, maksKjoreAnim: 2, pxDor: [-5,35], pxFramKrok:[-20,0], pxBakKrok: [81,0], pxBak: 26, pxFram: 6,  pxV: 9, pxH: 9,},    
  fart: { aktiv: 0, maks: 1.5, friksjon: 0.4, aks: 0.5, landskap: 0 , arbeid:0},
  sving: { fram: 'beint', bak: 'beint' , fart: 'fart' },   
  drivstoff: { niva: 500,  maks: 500 },   
  last: {niva: 0, type: null, maks: 8 , mottar: [null] },
  arbeid: { type: 'traktor' , aktiv: false },
  butikk: { type:'doning', bilde: 'butikkSkurtreskar0',    tittel:'GOOGLETRESKER 1',pris: 20000 }
},
kornSkjer0: {
   navn: 'kornSkjer0',
   type: 'framFeste',
   pos: {px: [0,0], retning: 270, rute: [6,3], framKrok:[0,0], bakKrok:[0,0], fv:[0,0],fh:[0,0],bh:[0,0],bv:[0,0]}, 
   bilde: { bredde: 10, hoyde: 22, svingAnim: 0, tidAnim: 0, kjoreAnim: 0, maksKjoreAnim: 2, pxFramKrok: [0,0], pxBakKrok:[null,null], pxBak: 0, pxFram: 10,  pxV: 11, pxH: 11, arbeidspunkt:[[-6,10,'side'],[-6,5,'midt'],[-86,0,'midt'],[-6,-5,'midt'],[-8,-10,'side']]},    
   fart: { vanlig: 0, arbeid:-0.3},
   sving: { fart: 0.5 },   
   drivstoff: { niva: null,  maks: null },   
   last: {niva: 0, type: null, maks: null , mottar: [null] },
   arbeid: { type: 'skurtreskar' , aktiv: false },
   butikk: { type:'redskap', bilde: 'butikkKornSKjer0',    tittel:'Korn Skjer 2 meter',pris: 2000 }
},
kornSkjer1: {
  navn: 'kornSkjer1',
  type: 'framFeste',
  pos: {px: [0,0], retning: 270, rute: [8,3], framKrok:[0,0], bakKrok:[0,0], fv:[0,0],fh:[0,0],bh:[0,0],bv:[0,0]}, 
  bilde: { bredde: 10, hoyde: 28, svingAnim: 0, tidAnim: 0, kjoreAnim: 0, maksKjoreAnim: 2, pxFramKrok: [0,0], pxBakKrok:[null,null],  pxBak: 0, pxFram: 10,  pxV: 14, pxH: 14, arbeidspunkt:[[-6,13,'side'],[-6,8,'midt'],[-6,4,'midt'],[-6,0,],[-6,-4,'midt'],[6-8,'midt'],[-6,-13,'side']]},    
  fart: { vanlig: 0, arbeid:-0.6},
  sving: { fart: 0.5 },   
  drivstoff: { niva: null,  maks: null },   
  last: {niva: 0, type: null, maks: null , mottar: [null] },
  arbeid: { type: 'skurtreskar' , aktiv: false },
  butikk: { type:'redskap', bilde: 'butikkKornSKjer1',    tittel:'Korn Skjer 4 meter',pris: 4000 }
},
kornSkjer2: {
  navn: 'kornSkjer2',
  type: 'framFeste',
  pos: {px: [0,0], retning: 270, rute: [10,3], framKrok:[0,0], bakKrok:[0,0],fv:[0,0],fh:[0,0],bh:[0,0],bv:[0,0]}, 
  bilde: { bredde: 10, hoyde: 39, svingAnim: 0, tidAnim: 0, kjoreAnim: 0, maksKjoreAnim: 2 , pxFramKrok: [0,0], pxBakKrok:[null,null], pxBak: 0, pxFram: 10,  pxV: 19, pxH: 19, arbeidspunkt:[[-6,17,'side'],[-6,12,'side'],[-6,8,'midt'],[-6,4,'midt'],[-6,0,'midt'],[-6,-4,'midt'],[-6-8],'midt',[-6,-12,'side'],[-6,-17,'side']]},    
  fart: { vanlig: 0, arbeid:-1},
  sving: { fart: 0.5 },   
  drivstoff: { niva: null,  maks: null },   
  last: {niva: 0, type: null, maks: null , mottar: [null] },
  arbeid: { type: 'skurtreskar' , aktiv: false },
  butikk: { type:'redskap', bilde: 'butikkKornSKjer2',    tittel:'Korn Skjer 6 meter',pris: 6000 }
},
gravemaskin0 : {
  navn: 'gravemaskin0',
  type: 'doning',
  pos: {px: [0,0], retning: 180, rute: [3,15], framKrok:[0,0], bakKrok:[0,0],fv:[0,0],fh:[0,0],bh:[0,0],bv:[0,0]}, 
  bilde: { bredde: 30, hoyde: 15, svingAnim: 0, tidAnim: 0, kjoreAnim: 0, maksKjoreAnim: 2, pxDor: [0,15], pxFramKrok: [null,null], pxBakKrok:[9,0], pxBak: 10, pxFram: 20,  pxV: 8, pxH: 8},    
  fart: { aktiv: 0, maks: 1,    friksjon: 0.3, aks: 0.5, kraft: -10, landskap: 0 , arbeid:0},
  sving: { fram: 'beint', bak: 'beint' , fart: 2 },   
  drivstoff: { niva: 1000, maks: 1000 }, 
  last: {niva: null,type: null, maks: null , mottar: [null] },
  arbeid: { type: 'gravemaskin', aktiv: false },
  butikk: { type:'doning', bilde: 'butikkGravemaskin0',    tittel:'KABEL-SKO',pris: 20000 }
},
ballemaskin0 : {
  navn: 'ballemaskin0',
  type: 'tilhengar',
  pos: {px: [0,0], retning: 0, rute: [3,11], framKrok:[0,0], bakKrok:[0,0],fv:[0,0],fh:[0,0],bh:[0,0],bv:[0,0]}, 
  bilde: { bredde: 21, hoyde: 14, svingAnim: 0, tidAnim: 0, kjoreAnim: 0, maksKjoreAnim: 11 , pxFramKrok: [-60,0], pxBakKrok:[null,null], pxBak: 6, pxFram: 14, pxV: 7, pxH: 7 },   
  fart: { vanlig: -1, arbeid:-2},
  sving: { fart: 'fart' },   
  drivstoff: { niva: null, maks: null }, 
  last: {niva: 0,type: null, maks: 3 , mottar: [null] },
  arbeid: { type: 'ballemaskin', aktiv: false }, 
  butikk: { type:'redskap', bilde: 'butikkBallemaskin0',    tittel:'BOLLA PIGGSVIN',pris: 20000 }
},
plog0 : {
  navn: 'plog0',
  type: 'bakFeste',
  pos: {px: [0,0], retning: 0, rute: [3,9], framKrok:[0,0], bakKrok:[0,0] ,fv:[0,0],fh:[0,0],bh:[0,0],bv:[0,0]},         
  bilde: { bredde: 57, hoyde: 30, svingAnim: 0, tidAnim: 0, kjoreAnim: 0, maksKjoreAnim: 0, pxFramKrok: [0,0], pxBakKrok:[null,null], pxBak: 57, pxFram: 0, pxV: 15, pxH: 15, arbeidspunkt:[[12,19],[23,3],[49,-3]]},    
  fart: { vanlig: -0.5, arbeid:-0.9},
  sving: { fart: 0.5 },   
  drivstoff: { niva: null, maks: null }, 
  last: {niva: null, type: null, maks: null , mottar: [null] },
  arbeid: { type:'plog',  aktiv: false }, 
  butikk: { type:'redskap', bilde:'butikkPlog0', tittel:'MULD 0',pris: 20000 }
},
plog5 : {
  navn: 'plog5',
  type: 'tilhengar',
  pos: {px: [0,0], retning: 90, rute: [15,3], framKrok:[0,0], bakKrok:[0,0],fv:[0,0],fh:[0,0],bh:[0,0],bv:[0,0]},         
  bilde: { bredde: 29, hoyde: 60, svingAnim: 0, tidAnim: 0, kjoreAnim: 0, maksKjoreAnim: 0 , pxFramKrok: [-33,0], pxBakKrok:[null,null], pxBak: 5, pxFram: 15, pxV: 30, pxH: 30, arbeidspunkt:[[6,-50],[6,-38],[6,-26],[6,-14],[6,-2],[6,8],[6,20],[6,32],[6,44],[6,56]] },    
  fart: { vanlig: -0.5, arbeid:-1},
  sving: { fart: 0.5 },   
  drivstoff: { niva: null, maks: null }, 
  last: {niva: null, type: null, maks: null , mottar: [null] },
  arbeid: { type:'plog',  aktiv: false }, 
  butikk: { type:'redskap', bilde:'butikkPlog0', tittel:'MULD 0',pris: 20000 }
}*/


const orginalTing = {
  butikkListe: {
    ting: ['butikk']//['bensin', 'froSekkGras', 'froSekkKorn'],
  },
  liste: ['butikk'],
  butikk : {
    navn: 'butikk' , 
    pos: {midt: {dx:0,dy:0,x:3,y:3}},
    retning: {aktiv:90},
    rute:{x:3,y:3},  
    grafikk:{    
      fil:'butikk',
      aktivListe:['butikken'],
      animerVed:{},
      butikken:{pos:{x:-7,y:-10},  str:{x:14,y:20}, animasjon:{ fart:null, retning:null, aktiv:0}, klippPos:[{x:0,y:0}]},
    },
    krasj: {
      sider: { framSider:[['fv','fh']],bakSider:[['bh','bv']],andreSider:[['bh','fh'],['bv','fv']]},
      punkt:{
        bh:{x:0,y:0,tx:-7,ty:-10},
        fh:{x:0,y:0,tx:7,ty:-10},
        bv:{x:0,y:0,tx:7,ty:10},
        fv:{x:0,y:0,tx:-7,ty:10}
      }
    },
    type: null,
    last: { type: null, niva: null},
    butikk: { type:'ting', bilde: 'butikkFroSekkGras',tittel:'GRASFRØ',pris: 20000 },
    fart: { aktiv: 0, maks: 1.5, friksjon: 0.4, aks: 0.5, landskap: 0 , arbeid:0},
    sving: { fram: 'beint', bak: 'beint', fart: 'fart' }
  }
  /*,
  bensin : {
    navn: 'bensin' , 
    pos: {px: [0,0], retning: 0, rute: [4,2],  bredde: 33,hoyde: 17 ,fv:[0,0],fh:[0,0],bh:[0,0],bv:[0,0], krok:[0,0], pxKrok:[0,0]},     
    type: 'last',
    last: { type: 'drivstoff', niva: 'evig'},
    bilde: { bredde: 33, hoyde: 17, svingAnim: 0, tidAnim: 0, kjoreAnim: 0, maksKjoreAnim: null }, 
    butikk: { type:'ting', bilde: 'butikkFroSekkGras',tittel:'GRASFRØ',pris: 20000 } },
  froSekkGras : {
    navn: 'froSekkGras' , 
    pos: {px: [0,0], retning: 0, rute: [9,2],  bredde: 20,hoyde: 14 ,fv:[0,0],fh:[0,0],bh:[0,0],bv:[0,0], krok:[0,0], pxKrok:[0,0]},     
    type: 'last',
    last: { type: 'grasfrø', niva: 80},
    bilde: { bredde: 14, hoyde: 20, svingAnim: 0, tidAnim: 0, kjoreAnim: 0, maksKjoreAnim: null }, 
    butikk: { type:'ting', bilde: 'butikkFroSekkGras',tittel:'GRASFRØ',pris: 20000 } },
  froSekkKorn : {
    navn: 'froSekkKorn' , 
    pos: {px: [0,0], retning: 0, rute: [13,2],  bredde: 20,hoyde: 14 ,fv:[0,0],fh:[0,0],bh:[0,0],bv:[0,0], krok:[0,0], pxKrok:[0,0]},  
    type: 'last',            
    last: { type: 'kornfrø', niva: 80},
    bilde: { bredde: 14, hoyde: 20, svingAnim: 0, tidAnim: 0, kjoreAnim: 0, maksKjoreAnim: null }, 
    butikk: { type:'ting', bilde: 'butikkFroSekkKorn', tittel:'KORNFRØ',pris: 20000 } }  
    */
};




//------------------------- Landskap------------------------

const kart = [
  ['skog','skog' ,'skog' ,'skog' ,'skog'  ,'skog'  ,'skog'  ,'skog'  ,'skog'  ,'skog'  , 'skog'  ,'skog' ,'skog'  ,'skog' ,'skog' ,'skog' ,'skog' ,'skog' ,'skog' ,'skog' ,'skog'  ,'skog' ,'skog' ,'skog' ,'skog' ,'skog' ,'skog' ,'skog' ,'skog' ,'skog'  ,'skog' ,'skog' ,'skog'  ,'skog' ,'skog'  ,'skog' ,'skog'  ],
  ['vatn','grus' ,'grus' ,'grus' ,'grus'  ,'veiHN' ,'veiVH' ,'veiVH' ,'veiVH' ,'veiVH' , 'veiVH' ,'veiVH','veiVHN','veiVH','veiVH','veiVH','veiVH','veiVH','veiVH','veiVH','veiVHN','eng'  ,'eng'  ,'eng'  ,'eng'  ,'eng'  ,'eng'  ,'eng'  ,'eng'  ,'eng'   ,'eng'  ,'eng'  ,'eng'   ,'eng'  ,'eng'   ,'eng'  ,'skog'  ],
  ['vatn','grus' ,'grus' ,'grus' ,'grus'  ,'veiON' ,'eng'   ,'eng'   ,'eng'   ,'eng'   , 'eng'   ,'eng'  ,'veiON' ,'eng'  ,'eng'  ,'eng'  ,'eng'  ,'eng'  ,'eng'  ,'eng'  ,'veiON' ,'eng'  ,'eng'  ,'eng'  ,'eng'  ,'eng'  ,'eng'  ,'eng'  ,'eng'  ,'eng'   ,'eng'  ,'eng'  ,'eng'   ,'eng'  ,'eng'   ,'eng'  ,'skog'  ],
  ['vatn','grus' ,'grus' ,'grus' ,'grus'  ,'veiON' ,'eng'   ,'eng'   ,'eng'   ,'eng'   , 'eng'   ,'eng'  ,'veiON' ,'eng'  ,'eng'  ,'eng'  ,'eng'  ,'eng'  ,'eng'  ,'eng'  ,'veiON' ,'eng'  ,'eng'  ,'eng'  ,'eng'  ,'eng'  ,'eng'  ,'eng'  ,'eng'  ,'eng'   ,'eng'  ,'eng'  ,'eng'   ,'eng'  ,'eng'   ,'eng'  ,'skog'  ],
  ['vatn','grus' ,'grus' ,'grus' ,'grus'  ,'veiON' ,'eng'   ,'eng'   ,'eng'   ,'eng'   , 'eng'   ,'eng'  ,'veiON' ,'eng'  ,'eng'  ,'eng'  ,'eng'  ,'eng'  ,'eng'  ,'eng'  ,'veiON' ,'eng'  ,'eng'  ,'eng'  ,'eng'  ,'eng'  ,'eng'  ,'eng'  ,'eng'  ,'eng'   ,'eng'  ,'eng'  ,'eng'   ,'eng'  ,'eng'   ,'eng'  ,'skog'  ],
  ['vatn','grus' ,'grus' ,'grus' ,'grus'  ,'veiON' ,'eng'   ,'eng'   ,'eng'   ,'eng'   , 'eng'   ,'eng'  ,'veiON' ,'eng'  ,'eng'  ,'eng'  ,'eng'  ,'eng'  ,'eng'  ,'eng'  ,'veiOHN','veiVH','veiVH','veiVH','veiVH','veiVH','veiVH','veiVH','veiVH','veiVHN','eng'  ,'eng'  ,'eng'   ,'eng'  ,'eng'   ,'eng'  ,'skog'  ],
  ['vatn','grus' ,'grus' ,'grus' ,'grus'  ,'veiOHN','veiVH' ,'veiVH' ,'veiVH' ,'veiVH' , 'veiVHN','veiVH','veiVOH','veiVH','veiVH','veiVH','veiVH','veiVH','veiVH','veiVH','veiVON','eng'  ,'eng'  ,'eng'  ,'eng'  ,'eng'  ,'eng'  ,'eng'  ,'eng'  ,'veiOH' ,'veiVH','veiVH','veiVHN','eng'  ,'eng'   ,'eng'  ,'skog'  ],
  ['vatn','grus' ,'grus' ,'grus' ,'grus'  ,'veiON' ,'jorde' ,'jorde' ,'jorde' ,'jorde' , 'veiON' ,'jorde'  ,'jorde'   ,'jorde'  ,'jorde'  ,'jorde'  ,'jorde'  ,'jorde'  ,'jorde'  ,'jorde'  ,'veiON' ,'eng'  ,'eng'  ,'eng'  ,'eng'  ,'eng'  ,'eng'  ,'eng'  ,'eng'  ,'eng'   ,'grus' ,'grus' ,'grus'  ,'grus' ,'butikk','eng'  ,'skog'  ],
  ['vatn','grus' ,'grus' ,'grus' ,'grus'  ,'veiON' ,'jorde' ,'jorde' ,'jorde' ,'jorde' , 'veiON' ,'jorde'  ,'jorde'   ,'jorde'  ,'jorde'  ,'jorde'  ,'jorde'  ,'jorde'  ,'jorde'  ,'jorde'  ,'veiON' ,'eng'  ,'eng'  ,'eng'  ,'eng'  ,'eng'  ,'eng'  ,'eng'  ,'eng'  ,'eng'   ,'grus' ,'grus' ,'grus'  ,'grus' ,'grus'  ,'eng'  ,'skog'  ],
  ['vatn','grus' ,'grus' ,'grus' ,'grus'  ,'veiON' ,'jorde' ,'jorde' ,'jorde' ,'jorde' , 'veiON' ,'jorde'  ,'jorde'   ,'jorde'  ,'jorde'  ,'jorde'  ,'jorde'  ,'jorde'  ,'jorde'  ,'jorde'  ,'veiON' ,'eng'  ,'eng'  ,'eng'  ,'eng'  ,'eng'  ,'eng'  ,'eng'  ,'eng'  ,'eng'   ,'grus' ,'grus' ,'grus'  ,'grus' ,'grus'  ,'eng'  ,'skog'  ],
  ['vatn','grus' ,'grus' ,'grus' ,'grus'  ,'veiON' ,'jorde' ,'jorde' ,'jorde' ,'jorde' , 'veiON' ,'jorde'  ,'jorde'   ,'jorde'  ,'jorde'  ,'jorde'  ,'jorde'  ,'jorde'  ,'jorde'  ,'jorde'  ,'veiON' ,'eng'  ,'eng'  ,'eng'  ,'eng'  ,'eng'  ,'eng'  ,'eng'  ,'eng'  ,'eng'   ,'grus' ,'grus' ,'grus'  ,'grus' ,'grus'  ,'eng'  ,'skog'  ],
  ['vatn','grus' ,'grus' ,'grus' ,'grus'  ,'veiON' ,'jorde' ,'jorde' ,'jorde' ,'jorde' , 'veiON' ,'jorde'  ,'jorde'   ,'jorde'  ,'jorde'  ,'jorde'  ,'jorde'  ,'jorde'  ,'jorde'  ,'jorde'  ,'veiON' ,'eng'  ,'eng'  ,'eng'  ,'eng'  ,'eng'  ,'eng'  ,'eng'  ,'eng'  ,'eng'   ,'grus' ,'grus' ,'grus'  ,'grus' ,'grus'  ,'eng'  ,'skog'  ],
  ['vatn','veiHN','veiVH','veiVH','veiVH' ,'veiVOH','veiVH' ,'veiVH' ,'veiVH' ,'veiVH' ,'veiVOHN','veiVH','veiVH' ,'veiVH','veiVH','veiVH','veiVH','veiVH','veiVH','veiVH','veiVON','eng'  ,'eng'  ,'eng'  ,'eng'  ,'eng'  ,'eng'  ,'eng'  ,'eng'  ,'eng'   ,'grus' ,'grus' ,'grus'  ,'grus' ,'grus'  ,'eng'  ,'skog'  ],
  ['vatn','veiON','eng'  ,'eng'  ,'eng'   ,'eng'   ,'eng'   ,'eng'   ,'eng'   ,'eng'   , 'veiON' ,'eng'  ,'eng'   ,'eng'  ,'eng'  ,'eng'  ,'eng'  ,'eng'  ,'eng'  ,'eng'  ,'veiON' ,'eng'  ,'eng'  ,'eng'  ,'eng'  ,'eng'  ,'eng'  ,'eng'  ,'eng'  ,'eng'   ,'grus' ,'grus' ,'grus'  ,'grus' ,'grus'  ,'eng'  ,'skog'  ],
  ['vatn','veiON','eng'  ,'eng'  ,'eng'   ,'eng'   ,'eng'   ,'eng'   ,'eng'   ,'eng'   , 'veiON' ,'eng'  ,'eng'   ,'eng'  ,'eng'  ,'eng'  ,'eng'  ,'eng'  ,'eng'  ,'eng'  ,'veiON' ,'eng'  ,'eng'  ,'eng'  ,'eng'  ,'eng'  ,'eng'  ,'eng'  ,'eng'  ,'eng'   ,'grus' ,'grus' ,'grus'  ,'grus' ,'grus'  ,'eng'  ,'skog'  ],
  ['vatn','veiON','eng'  ,'eng'  ,'eng'   ,'eng'   ,'eng'   ,'eng'   ,'eng'   ,'eng'   , 'veiON' ,'eng'  ,'eng'   ,'eng'  ,'eng'  ,'eng'  ,'eng'  ,'eng'  ,'eng'  ,'eng'  ,'veiON' ,'eng'  ,'eng'  ,'eng'  ,'eng'  ,'eng'  ,'eng'  ,'eng'  ,'eng'  ,'eng'   ,'grus' ,'grus' ,'grus'  ,'grus' ,'grus'  ,'eng'  ,'skog'  ],
  ['vatn','veiON','eng'  ,'eng'  ,'eng'   ,'eng'   ,'eng'   ,'eng'   ,'eng'   ,'eng'   , 'veiON' ,'eng'  ,'eng'   ,'eng'  ,'eng'  ,'eng'  ,'eng'  ,'eng'  ,'eng'  ,'eng'  ,'veiON' ,'eng'  ,'eng'  ,'eng'  ,'eng'  ,'eng'  ,'eng'  ,'eng'  ,'eng'  ,'eng'   ,'grus' ,'grus' ,'grus'  ,'grus' ,'grus'  ,'eng'  ,'skog'  ],
  ['vatn','veiON','eng'  ,'eng'  ,'eng'   ,'eng'   ,'eng'   ,'eng'   ,'eng'   ,'eng'   , 'veiON' ,'eng'  ,'eng'   ,'eng'  ,'eng'  ,'eng'  ,'eng'  ,'eng'  ,'eng'  ,'eng'  ,'veiON' ,'eng'  ,'eng'  ,'eng'  ,'eng'  ,'eng'  ,'eng'  ,'eng'  ,'eng'  ,'eng'   ,'grus' ,'grus' ,'grus'  ,'grus' ,'grus'  ,'eng'  ,'skog'  ],
  ['vatn','veiON','eng'  ,'eng'  ,'eng'   ,'eng'   ,'eng'   ,'eng'   ,'eng'   ,'eng'   , 'veiON' ,'eng'  ,'eng'   ,'eng'  ,'eng'  ,'eng'  ,'eng'  ,'eng'  ,'eng'  ,'eng'  ,'veiON' ,'eng'  ,'eng'  ,'eng'  ,'eng'  ,'eng'  ,'eng'  ,'eng'  ,'eng'  ,'eng'   ,'grus' ,'grus' ,'grus'  ,'grus' ,'grus'  ,'eng'  ,'skog'  ],
  ['vatn','veiOH','veiVH','veiVH','veiVH' ,'veiVH' ,'veiVH' ,'veiVH' ,'veiVH' ,'veiVH' , 'veiVOH','veiVH','veiVH' ,'veiVH','veiVH','veiVH','veiVH','veiVH','veiVH','veiVH','veiVO' ,'eng'  ,'eng'  ,'eng'  ,'eng'  ,'eng'  ,'eng'  ,'eng'  ,'eng'  ,'eng'   ,'eng'  ,'eng'  ,'eng'   ,'eng'  ,'eng'   ,'eng'  ,'skog'  ],
  ['skog','skog' ,'skog' ,'skog' ,'skog'  ,'skog'  ,'skog'  ,'skog'  ,'skog'  ,'skog'  , 'skog'  ,'skog' ,'skog'  ,'skog' ,'skog' ,'skog' ,'skog' ,'skog' ,'skog' ,'skog' ,'skog'  ,'skog' ,'skog' ,'skog' ,'skog' ,'skog' ,'skog' ,'skog' ,'skog' ,'skog'  ,'skog' ,'skog' ,'skog'  ,'skog' ,'skog'  ,'skog' ,'skog'  ]
];
const orginalLandskap = {
  vei:           {                                             hindring: false, retning: [0], fart: 0  , arbeid: null},
  grus:          { bakgrunn: ['grus'  ],                       hindring: false, retning: [0], fart: -0.2  , arbeid: null},
  skog:          { bakgrunn: ['skog'  ],                       hindring: true,  retning: [90, 180, 270, 360], fart: 0 , arbeid: null},
  vatn:          { bakgrunn: ['vatn'  ],                       hindring: true,  retning: [0], fart: 0 , arbeid: null},
  bensin:        { bakgrunn: ['bensin'],                       hindring: false, retning: [90],fart: 0,     arbeid: { aktivertAv: ['doning']} },
  butikk:        { bakgrunn: ['butikk'],                       hindring: false, retning: [90],fart: 0,     arbeid: { aktivertAv: ['bonde']} },
  eng:           { bakgrunn: ['eng0', 'eng1', 'eng2', 'eng3'], hindring: false, retning: [0], fart: -2,    arbeid: { aktivertAv: ['gravemaskin']} },
  jorde:         { bakgrunn: null, hindring: false, retning: [0], fart: -2,    arbeid: { aktivertAv: null} }
};

const orginalJorde = {
  vekseintervall: 0.2,//i sekund
  antallJordeRuter: 5,// må stemme med pixel.jordeLengde somnå  er 8, 8*5=40 som er rutelengde
  vekseListe: ['kornSadd','kornVeks','kornModent','kornKlart','grasSadd','grasVeks'],
  dyrka:         { bakgrunn: ['dyrka'],      arbeid: { aktivertAv: ['gravemaskin', 'plog']                }, veksing:null },
  ployd:         { bakgrunn: ['ployd'],      arbeid: { aktivertAv: ['gravemaskin', 'plog', 'samaskin']    }, veksing:null },
  kornSadd:      { bakgrunn: ['kornSadd'],   arbeid: { aktivertAv: ['gravemaskin', 'plog']                }, veksing:{ bliTil: 'kornVeks',   tid:0, vekseTid: 30,   avling: 0 } },
  kornVeks:      { bakgrunn: ['kornVeks'],   arbeid: { aktivertAv: ['gravemaskin', 'plog']                }, veksing:{ bliTil: 'kornModent', tid:0, vekseTid: 30,   avling: 0 } },
  kornModent:    { bakgrunn: ['kornModent'], arbeid: { aktivertAv: ['gravemaskin', 'plog']                }, veksing:{ bliTil: 'kornKlart',  tid:0, vekseTid: 30,   avling: 0 } },
  kornSproyta:   { bakgrunn: ['kornSproyta'],arbeid: { aktivertAv: ['gravemaskin', 'plog']                }, veksing:null },
  kornKlart:     { bakgrunn: ['kornKlart'],  arbeid: { aktivertAv: ['gravemaskin', 'plog', 'skurtreskar'] }, veksing:null },
  kornDarlig:    { bakgrunn: ['kornDarlig'], arbeid: { aktivertAv: ['gravemaskin', 'plog', 'skurtreskar'] }, veksing:null },
  kornHausta:    { bakgrunn: ['kornHausta'], arbeid: { aktivertAv: ['gravemaskin', 'plog']                }, veksing:null},
  halm:          { bakgrunn: ['halm'],       arbeid: { aktivertAv: ['gravemaskin', 'plog', 'ballemaskin'] }, veksing:null },
  grasSadd:      { bakgrunn: ['grasSadd'],   arbeid: { aktivertAv: ['gravemaskin', 'plog']                }, veksing:{ bliTil: 'grasVeks',   tid:0, vekseTid: 30,   avling: 0 } },
  grasVeks:      { bakgrunn: ['grasVeks'],   arbeid: { aktivertAv: ['gravemaskin', 'plog']                }, veksing:{ bliTil: 'grasKlart',  tid:0, vekseTid: 30,   avling: 0 } },
  grasKlart:     { bakgrunn: ['grasKlart'],  arbeid: { aktivertAv: ['gravemaskin', 'plog', 'slamaskin']   }, veksing:null },
  grasSlatt:     { bakgrunn: ['grasSlatt'],  arbeid: { aktivertAv: ['gravemaskin', 'plog', 'ballemaskin'] }, veksing:null },
  grasHausta:    { bakgrunn: ['grasHausta'], arbeid: { aktivertAv: ['gravemaskin', 'plog', 'plog']        }, veksing:null }
};