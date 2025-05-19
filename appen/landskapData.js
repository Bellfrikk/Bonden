"use strict";
let pixel = { ruter: [50, 40], ruteLengde: 40, jordeLengde: 8, start: { x: 0, y: 0 }, }; //jordelengde må stemme med antall jorder
const orginalLandskap = {
    veiSving: { utsnitt: [{ x: 0, y: 0 }], krasj: null, retning: [0], fart: 0, arbeid: null, butikk: { overskrift: 'Grusvei', underskrift: 'Sving', info: '', pris: 10 } },
    veiXkryss: { utsnitt: [{ x: 60, y: 0 }], krasj: null, retning: [0], fart: 0, arbeid: null, butikk: { overskrift: 'Grusvei', underskrift: 'X kryss', info: '', pris: 10 } },
    veiTkryss: { utsnitt: [{ x: 80, y: 0 }], krasj: null, retning: [0], fart: 0, arbeid: null, butikk: { overskrift: 'Grusvei', underskrift: 'T kryss', info: '', pris: 10 } },
    veiBein: { utsnitt: [{ x: 120, y: 0 }], krasj: null, retning: [0], fart: 0, arbeid: null, butikk: { overskrift: 'Grusvei', underskrift: 'Beint', info: '', pris: 10 } },
    grus: { utsnitt: [{ x: 160, y: 0 }], krasj: null, retning: [0], fart: -0.2, arbeid: null, butikk: { overskrift: 'Grus', underskrift: 'Frå bjerkreim', info: '', pris: 10 } },
    asfalt: { utsnitt: [{ x: 41, y: 80 }], krasj: null, retning: [0], fart: 0, arbeid: null, butikk: { overskrift: 'Asfalt', underskrift: 'AG16', info: '', pris: 20 } },
    skog: { utsnitt: [{ x: 0, y: 80 }], krasj: { b: 10, f: 10, v: 10, h: 10 }, retning: [90, 180, 270, 360], fart: 0, arbeid: null, butikk: { overskrift: 'Skog', underskrift: 'Ferdig vokse', info: '', pris: 10 } },
    vatn: { utsnitt: [{ x: 200, y: 0 }], krasj: { b: 0, f: 10, v: 0, h: 0 }, retning: [0], fart: 0, arbeid: null, butikk: { overskrift: 'Vatn', underskrift: 'Bløtt', info: '', pris: 10 } },
    eng: { utsnitt: [{ x: 0, y: 40 }, { x: 40, y: 40 }, { x: 80, y: 40 }, { x: 120, y: 40 }, { x: 160, y: 40 }, { x: 200, y: 40 }], krasj: null, retning: [0], fart: -0.2, arbeid: { aktivertAv: ['gravemaskin'] }, butikk: { overskrift: 'Eng', underskrift: 'Eng..', info: '', pris: 10 } },
    jorde: { utsnitt: [{ x: 0, y: 40 }], krasj: null, retning: [0], fart: -0.2, arbeid: { aktivertAv: null }, butikk: { overskrift: 'Jorde', underskrift: 'Ferdig drenert', info: '', pris: 50 } },
};
const listerLandskap = {
    landskap: ['eng', 'grus', 'vatn'],
    jorde: ['dyrka', 'ployd', 'grasKlart', 'kornKlart'],
    vei: ['veiBeint', 'veiSving', 'veiTkryss', 'veiXkryss'],
};
const orginalJorde = {
    vekseintervall: 0.2, //i sekund
    antallJordeRuter: 5, // må stemme med pixel.jordeLengde somnå  er 8, 8*5=40 som er rutelengde
    dyrka: { utsnitt: [{ x: 26, y: 1 }, { x: 34, y: 1 }, { x: 42, y: 1 }], butikk: { overskrift: 'dyrka', underskrift: 'Fin', info: 'Kul', pris: 100 }, arbeid: { aktivertAv: ['gravemaskin', 'plog'] }, veksing: null },
    ployd: { utsnitt: [{ x: 1, y: 1 }, { x: 9, y: 1 }, { x: 17, y: 1 }], butikk: { overskrift: 'ployd', underskrift: 'Fin', info: 'Kul', pris: 100 }, arbeid: { aktivertAv: ['gravemaskin', 'plog', 'samaskin'] }, veksing: null },
    kornSadd: { utsnitt: [{ x: 1, y: 9 }, { x: 9, y: 9 }, { x: 17, y: 9 }], butikk: { overskrift: 'kornSadd', underskrift: 'Fin', info: 'Kul', pris: 100 }, arbeid: { aktivertAv: ['gravemaskin', 'plog'] }, veksing: { bliTil: 'kornVeks', tid: 0, vekseTid: 30, avling: 0 } },
    kornVeks: { utsnitt: [{ x: 1, y: 17 }, { x: 9, y: 17 }, { x: 17, y: 17 }], butikk: { overskrift: 'kornVeks', underskrift: 'Fin', info: 'Kul', pris: 100 }, arbeid: { aktivertAv: ['gravemaskin', 'plog'] }, veksing: { bliTil: 'kornModent', tid: 0, vekseTid: 30, avling: 0 } },
    kornModent: { utsnitt: [{ x: 1, y: 26 }, { x: 9, y: 26 }, { x: 17, y: 26 }], butikk: { overskrift: 'kornModent', underskrift: 'Fin', info: 'Kul', pris: 100 }, arbeid: { aktivertAv: ['gravemaskin', 'plog'] }, veksing: { bliTil: 'kornKlart', tid: 0, vekseTid: 30, avling: 0 } },
    kornSproyta: { utsnitt: [{ x: 1, y: 34 }, { x: 9, y: 34 }, { x: 17, y: 34 }], butikk: { overskrift: 'kornSproyta', underskrift: 'Fin', info: 'Kul', pris: 100 }, arbeid: { aktivertAv: ['gravemaskin', 'plog'] }, veksing: null },
    kornKlart: { utsnitt: [{ x: 1, y: 42 }, { x: 9, y: 42 }, { x: 17, y: 42 }], butikk: { overskrift: 'kornKlart', underskrift: 'Fin', info: 'Kul', pris: 100 }, arbeid: { aktivertAv: ['gravemaskin', 'plog', 'treskeSkjer'] }, veksing: null },
    kornDarlig: { utsnitt: [{ x: 1, y: 0 }, { x: 9, y: 49 }, { x: 17, y: 49 }], butikk: { overskrift: 'kornDarlig', underskrift: 'Fin', info: 'Kul', pris: 100 }, arbeid: { aktivertAv: ['gravemaskin', 'plog', 'treskeSkjer'] }, veksing: null },
    kornHausta: { utsnitt: [{ x: 1, y: 57 }, { x: 9, y: 57 }, { x: 17, y: 57 }], butikk: { overskrift: 'kornHausta', underskrift: 'Fin', info: 'Kul', pris: 100 }, arbeid: { aktivertAv: ['gravemaskin', 'plog'] }, veksing: null },
    halm: { utsnitt: [{ x: 1, y: 49 }, { x: 9, y: 49 }, { x: 17, y: 49 }], butikk: { overskrift: 'halm', underskrift: 'Fin', info: 'Kul', pris: 100 }, arbeid: { aktivertAv: ['gravemaskin', 'plog', 'ballemaskin'] }, veksing: null },
    grasSadd: { utsnitt: [{ x: 26, y: 9 }, { x: 34, y: 9 }, { x: 42, y: 9 }], butikk: { overskrift: 'grasSadd', underskrift: 'Fin', info: 'Kul', pris: 100 }, arbeid: { aktivertAv: ['gravemaskin', 'plog'] }, veksing: { bliTil: 'grasVeks', tid: 0, vekseTid: 30, avling: 0 } },
    grasVeks: { utsnitt: [{ x: 26, y: 17 }, { x: 34, y: 17 }, { x: 42, y: 17 }], butikk: { overskrift: 'grasVeks', underskrift: 'Fin', info: 'Kul', pris: 100 }, arbeid: { aktivertAv: ['gravemaskin', 'plog'] }, veksing: { bliTil: 'grasModent', tid: 0, vekseTid: 30, avling: 0 } },
    grasModent: { utsnitt: [{ x: 26, y: 25 }, { x: 34, y: 25 }, { x: 42, y: 25 }], butikk: { overskrift: 'grasModent', underskrift: 'Fin', info: 'Kul', pris: 100 }, arbeid: { aktivertAv: ['gravemaskin', 'plog'] }, veksing: { bliTil: 'grasKlart', tid: 0, vekseTid: 30, avling: 0 } },
    grasKlart: { utsnitt: [{ x: 26, y: 33 }, { x: 34, y: 33 }, { x: 42, y: 33 }], butikk: { overskrift: 'grasKlart', underskrift: 'Fin', info: 'Kul', pris: 100 }, arbeid: { aktivertAv: ['gravemaskin', 'plog', 'slamaskin'] }, veksing: null },
    grasSlatt: { utsnitt: [{ x: 26, y: 41 }, { x: 34, y: 41 }, { x: 42, y: 41 }], butikk: { overskrift: 'grasSlatt', underskrift: 'Fin', info: 'Kul', pris: 100 }, arbeid: { aktivertAv: ['gravemaskin', 'plog', 'ballemaskin'] }, veksing: null },
    grasHausta: { utsnitt: [{ x: 26, y: 49 }, { x: 34, y: 49 }, { x: 42, y: 49 }], butikk: { overskrift: 'grasHausta', underskrift: 'Fin', info: 'Kul', pris: 100 }, arbeid: { aktivertAv: ['gravemaskin', 'plog'] }, veksing: null }
};
