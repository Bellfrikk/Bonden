let pixel = { ruter: [50, 40], ruteLengde: 40, jordeLengde: 8, start: { x: 0, y: 0 }, };//jordelengde må stemme med antall jorder
type LandskapType = 'eng'|'vatn'|'skog'|'grus'|'asfalt'|'jorde'|'veiVOHN'|'veiVH'|'veiON'|'veiVO'|'veiVN'|'veiOH'|'veiHN'|'veiVHN'|'veiVOH'|'veiOHN'|'veiVON';
type JordeIkkjeVeksType = 'dyrka'|'ployd'|'grasKlart'|'grasSlatt'|'grasHausta'|'kornKlart'|'kornHausta'|'kornDarlig'|'kornSproyta'|'halm'; 
type JordeVeksType = 'grasSadd'|'grasVeks'|'grasModent'|'kornSadd'|'kornVeks'|'kornModent'; 
type JordeEllerLandskapType = JordeVeks | JordeIkkjeVeks | LandskapType;

type OrginalLandskap = { [key in LandskapType]: { utsnitt: { x: number; y: number; }[]; krasj: null | { b: number; f: number; v: number; h: number; }, retning:number[], fart: number; arbeid: null | { aktivertAv: null | string[]; }; };};
const orginalLandskap:OrginalLandskap = {
  veiHN  : { utsnitt: [{ x: 0, y: 0 }], krasj: null, retning: [0], fart: 0, arbeid: null },
  veiOH  : { utsnitt: [{ x: 0, y: 0 }], krasj: null, retning: [270], fart: 0, arbeid: null },
  veiOHN : { utsnitt: [{ x: 80, y: 0 }], krasj: null, retning: [270], fart: 0, arbeid: null },
  veiON  : { utsnitt: [{ x: 120, y: 0 }], krasj: null, retning: [90], fart: 0, arbeid: null },
  veiVH  : { utsnitt: [{ x: 120, y: 0 }], krasj: null, retning: [0], fart: 0, arbeid: null },
  veiVHN : { utsnitt: [{ x: 80, y: 0 }], krasj: null, retning: [0], fart: 0, arbeid: null },
  veiVN  : { utsnitt: [{ x: 0, y: 0 }], krasj: null, retning: [90], fart: 0, arbeid: null },
  veiVO  : { utsnitt: [{ x: 0, y: 0 }], krasj: null, retning: [180], fart: 0, arbeid: null },
  veiVOH : { utsnitt: [{ x: 80, y: 0 }], krasj: null, retning: [180], fart: 0, arbeid: null },
  veiVOHN:{ utsnitt: [{ x: 40, y: 0 }], krasj: null, retning: [0], fart: 0, arbeid: null },
  veiVON : { utsnitt: [{ x: 80, y: 0 }], krasj: null, retning: [90], fart: 0, arbeid: null },
  grus   : { utsnitt: [{ x: 160, y: 0 }], krasj: null, retning: [0], fart: -0.2, arbeid: null },
  asfalt : { utsnitt: [{ x: 41, y: 80 }], krasj: null, retning: [0], fart: 0, arbeid: null },
  skog:   { utsnitt: [{ x:   0, y: 80 }], krasj: { b: 10, f: 10, v: 10, h: 10 }, retning: [90, 180, 270, 360], fart: 0, arbeid: null },
  vatn:   { utsnitt: [{ x: 200, y:  0 }], krasj: { b: 0, f: 10, v: 0, h: 0 }, retning: [0], fart: 0, arbeid: null },
  eng:    { utsnitt: [{ x:   0, y: 40 }, { x: 40, y: 40 }, { x: 80, y: 40 }, { x: 120, y: 40 }, { x: 160, y: 40 }, { x: 200, y: 40 }], krasj: null, retning: [0], fart: -2, arbeid: { aktivertAv: ['gravemaskin'] } },
  jorde:  { utsnitt: [{ x:   0, y: 40 }], krasj: null, retning: [0], fart: -2, arbeid: { aktivertAv: null } }
};
type OrginalJorde = {vekseintervall:number, antallJordeRuter:number} &
  {[key in JordeIkkjeVeksType]:{
    utsnitt:{x:number,y: number}[], 
    arbeid: { aktivertAv: string[] }, 
    veksing:null
  }} &
  {[key in JordeVeksType]:{
    utsnitt:{x:number,y: number}[], 
    arbeid: { aktivertAv: string[] }, 
    veksing: { bliTil: JordeVeksType | JordeIkkjeVeksType, tid: number, vekseTid: number, avling: number }
  }};

const orginalJorde:OrginalJorde = {
  vekseintervall: 0.2,//i sekund
  antallJordeRuter: 5,// må stemme med pixel.jordeLengde somnå  er 8, 8*5=40 som er rutelengde
  dyrka:       {utsnitt:[{x:26,y: 1},{x:34,y: 1},{x:42,y: 1}], arbeid: { aktivertAv: ['gravemaskin', 'plog'] }, veksing:null},
  ployd:       {utsnitt:[{x: 1,y: 1},{x: 9,y: 1},{x:17,y: 1}], arbeid: { aktivertAv: ['gravemaskin', 'plog', 'samaskin'] }, veksing:null},
  kornSadd:    {utsnitt:[{x: 1,y: 9},{x: 9,y: 9},{x:17,y: 9}], arbeid: { aktivertAv: ['gravemaskin', 'plog'] }, veksing: { bliTil: 'kornVeks', tid: 0, vekseTid: 30, avling: 0 } },
  kornVeks:    {utsnitt:[{x: 1,y:17},{x: 9,y:17},{x:17,y:17}], arbeid: { aktivertAv: ['gravemaskin', 'plog'] }, veksing: { bliTil: 'kornModent', tid: 0, vekseTid: 30, avling: 0 } },
  kornModent:  {utsnitt:[{x: 1,y:26},{x: 9,y:26},{x:17,y:26}], arbeid: { aktivertAv: ['gravemaskin', 'plog'] }, veksing: { bliTil: 'kornKlart', tid: 0, vekseTid: 30, avling: 0 } },
  kornSproyta: {utsnitt:[{x: 1,y:34},{x: 9,y:34},{x:17,y:34}], arbeid: { aktivertAv: ['gravemaskin', 'plog'] }, veksing:null},
  kornKlart:   {utsnitt:[{x: 1,y:42},{x: 9,y:42},{x:17,y:42}], arbeid: { aktivertAv: ['gravemaskin', 'plog', 'treskeSkjer'] }, veksing:null},
  kornDarlig:  {utsnitt:[{x: 1,y: 0},{x: 9,y:49},{x:17,y:49}], arbeid: { aktivertAv: ['gravemaskin', 'plog', 'treskeSkjer'] }, veksing:null},
  kornHausta:  {utsnitt:[{x: 1,y:57},{x: 9,y:57},{x:17,y:57}], arbeid: { aktivertAv: ['gravemaskin', 'plog'] }, veksing:null},
  halm:        {utsnitt:[{x: 1,y:49},{x: 9,y:49},{x:17,y:49}], arbeid: { aktivertAv: ['gravemaskin', 'plog', 'ballemaskin'] }, veksing:null},
  grasSadd:    {utsnitt:[{x:26,y: 9},{x:34,y: 9},{x:42,y: 9}], arbeid: { aktivertAv: ['gravemaskin', 'plog'] }, veksing: { bliTil: 'grasVeks', tid: 0, vekseTid: 30, avling: 0 } },
  grasVeks:    {utsnitt:[{x:26,y:17},{x:34,y:17},{x:42,y:17}], arbeid: { aktivertAv: ['gravemaskin', 'plog'] }, veksing: { bliTil: 'grasModent', tid: 0, vekseTid: 30, avling: 0 } },
  grasModent:  {utsnitt:[{x:26,y:25},{x:34,y:25},{x:42,y:25}], arbeid: { aktivertAv: ['gravemaskin', 'plog'] }, veksing: { bliTil: 'grasKlart', tid: 0, vekseTid: 30, avling: 0 } }, 
  grasKlart:   {utsnitt:[{x:26,y:33},{x:34,y:33},{x:42,y:33}], arbeid: { aktivertAv: ['gravemaskin', 'plog', 'slamaskin'] }, veksing:null},
  grasSlatt:   {utsnitt:[{x:26,y:41},{x:34,y:41},{x:42,y:41}], arbeid: { aktivertAv: ['gravemaskin', 'plog', 'ballemaskin'] }, veksing:null},
  grasHausta:  {utsnitt:[{x:26,y:49},{x:34,y:49},{x:42,y:49}], arbeid: { aktivertAv: ['gravemaskin', 'plog'] }, veksing:null}
};