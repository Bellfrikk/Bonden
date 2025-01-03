"use strict";
class Tilhengar extends MaskinRedskapMal {
    constructor(ny, rute) {
        super(ny, rute);
        this.grafikk = {
            karosseri: ny.grafikk.karosseri,
            dekkVB: ny.grafikk.dekkVB,
            dekkHB: ny.grafikk.dekkHB,
            //dekkVF : ny.grafikk.dekkVF,
            //dekkHF : ny.grafikk.dekkHF,
            kornLast: ny.grafikk.kornLast
        };
    }
}
const tilhengarBekkEikeland = {
    navn: 'Bekk-Eikeland-Mini',
    type: 'tilhengar',
    pos: {
        bakKrok: { dx: 0, dy: 0 },
        framKrok: { dx: 30, dy: 0 },
        dor: { dx: 0, dy: 0 },
        lossePunkt: {
            korn: { dx: -24, dy: 0 }, //kanskje feil, kopiert frå tilhenger 2
        }
    },
    krasj: {
        framSider: [['fv', 'fh']], bakSider: [['bh', 'bv']], andreSider: [['bh', 'fh'], ['bv', 'fv'], ['bv', 'krok'], ['krok', 'bh']],
        losseSider: [['bh', 'fh'], ['fv', 'fh'], ['bv', 'fv'], ['bv', 'bh']],
        punkt: {
            bh: { dx: 10, dy: -10 },
            fh: { dx: 23, dy: -10 },
            fv: { dx: 23, dy: 10 },
            bv: { dx: 10, dy: 10 },
            krok: { dx: 30, dy: 0 }
        }
    },
    grafikk: {
        dekkVB: { skalVise: true, tegneRekkefolge: 'under', midt: { x: 0.5, y: 0.5 }, pos: { x: 0, y: -10 }, str: { x: 6, y: 3 }, retning: 0, klippPos: { x: 0, y: 60 }, animasjonDekk: { px: 0, minX: 0, maksX: 3 } },
        dekkHB: { skalVise: true, tegneRekkefolge: 'under', midt: { x: 0.5, y: 0.5 }, pos: { x: 0, y: 10 }, str: { x: 6, y: 3 }, retning: 0, klippPos: { x: 0, y: 63 }, animasjonDekk: { px: 0, minX: 0, maksX: 3 } },
        karosseri: { skalVise: true, tegneRekkefolge: 'under', midt: { x: 0.5, y: 0.5 }, pos: { x: 10, y: 0 }, str: { x: 40, y: 21 }, retning: 0, klippPos: { x: 0, y: 70 } },
        kornLast: { skalVise: false, tegneRekkefolge: 'under', midt: { x: 0.5, y: 0.5 }, pos: { x: 8, y: -0.5 }, str: { x: 0, y: 0 }, retning: 0, klippPos: { x: 88, y: 70 }, animasjonLast: { startX: 1, maksX: 38, startY: 1, maksY: 19 } }
    },
    arbeid: { type: 'ingen', punkt: [{ x: 0, y: 0, type: 'type1' }], type1: null, type2: null
    },
    fart: { aktiv: 0, maks: 0, friksjon: 0, aks: 0, landskap: 0, arbeid: 0, krasj: 0, tyngde: 1 },
    last: {
        valgtLast: null, mottar: ['korn', 'palle', 'grasball'], leverer: [],
        laster: {
            korn: { maks: 300, lastTilDoning: false, visNiva: true, mottak: { plass: '', mengde: 1, evigLager: false }, levering: { punkt: '', mengde: 1, evigLager: false } },
            palle: { maks: 1, lastTilDoning: false, visNiva: true, mottak: { plass: '', mengde: 1, evigLager: false }, levering: { punkt: '', mengde: 1, evigLager: false } },
            grasball: { maks: 1, lastTilDoning: false, visNiva: true, mottak: { plass: '', mengde: 1, evigLager: false }, levering: { punkt: '', mengde: 1, evigLager: false } }
        }
    },
    svingFartVedArbeid: 0, //arbeider aldri
    butikk: { type: 'redskap', bilde: 'butikkPlog0', tittel: 'MULD 0', pris: 20000 },
    funksjonane: {
        ting: (denne) => {
            if (denne.type !== 'tilhengar')
                return;
            animerDekk(denne.grafikk.dekkHB.animasjonDekk, denne.grafikk.dekkHB.klippPos, denne.pos.midt);
        }
    }
};
//______________________tilhengar2
const tilhengarFossEikeland = {
    navn: 'Foss-Eikelnd-Karmhenger',
    type: 'tilhengar',
    pos: {
        framKrok: { dx: 33, dy: 0 },
        bakKrok: { dx: 0, dy: 0 },
        dor: { dx: 0, dy: 0 },
        lossePunkt: {
            korn: { dx: -24, dy: 0 },
        }
    },
    krasj: {
        framSider: [['fv', 'fh']], bakSider: [['bh', 'bv']], andreSider: [['bh', 'fh'], ['bv', 'fv'], ['bv', 'krok'], ['krok', 'bh']],
        losseSider: [['bh', 'fh'], ['fv', 'fh'], ['bv', 'fv'], ['bv', 'bh']],
        punkt: {
            bh: { dx: -12, dy: -12 },
            fh: { dx: 33, dy: -12 },
            fv: { dx: 33, dy: 12 },
            bv: { dx: -12, dy: 12 },
            krok: { dx: 33, dy: 0 }
        }
    },
    grafikk: {
        //dekkVF: { skalVise:true, tegneRekkefolge: 'under', midt: { x: 0.5, y: 0.5 }, pos: { x:  5, y: -12 }, str: { x: 8, y: 3 },   retning: 0, klippPos: { x: 0, y: 60 }, animasjonDekk: {px:0 ,minX:0, maksX:3 } },
        dekkVB: { skalVise: true, tegneRekkefolge: 'under', midt: { x: 0.5, y: 0.5 }, pos: { x: -5, y: -12 }, str: { x: 8, y: 3 }, retning: 0, klippPos: { x: 0, y: 60 }, animasjonDekk: { px: 0, minX: 0, maksX: 3 } },
        //dekkHF: { skalVise:true, tegneRekkefolge: 'under', midt: { x: 0.5, y: 0.5 }, pos: { x:  5, y:  12 }, str: { x: 8, y: 3 },   retning: 0, klippPos: { x: 0, y: 63 }, animasjonDekk: {px:0 ,minX:0, maksX:3 } },
        dekkHB: { skalVise: true, tegneRekkefolge: 'under', midt: { x: 0.5, y: 0.5 }, pos: { x: -5, y: 12 }, str: { x: 8, y: 3 }, retning: 0, klippPos: { x: 0, y: 63 }, animasjonDekk: { px: 0, minX: 0, maksX: 3 } },
        karosseri: { skalVise: true, tegneRekkefolge: 'under', midt: { x: 0.5, y: 0.5 }, pos: { x: 12, y: 0 }, str: { x: 45, y: 23 }, retning: 0, klippPos: { x: 41, y: 69 } },
        kornLast: { skalVise: true, tegneRekkefolge: 'under', midt: { x: 0.5, y: 0.5 }, pos: { x: 8, y: -0.5 }, str: { x: 0, y: 0 }, retning: 0, klippPos: { x: 88, y: 70 }, animasjonLast: { startX: 4, maksX: 33, startY: 4, maksY: 16 } },
    },
    arbeid: { type: 'ingen', punkt: [{ x: 0, y: 0, type: 'type1' }], type1: null, type2: null },
    fart: { aktiv: 0, maks: 0, friksjon: 0, aks: 0, landskap: 0, arbeid: 0, krasj: 0, tyngde: 1 },
    last: {
        valgtLast: null, mottar: ['korn', 'palle', 'grasball'], leverer: [],
        laster: {
            korn: { maks: 500, lastTilDoning: false, visNiva: true, mottak: { plass: '', mengde: 1, evigLager: false }, levering: { punkt: '', mengde: 1, evigLager: false } },
            palle: { maks: 2, lastTilDoning: false, visNiva: true, mottak: { plass: '', mengde: 1, evigLager: false }, levering: { punkt: '', mengde: 1, evigLager: false } },
            grasball: { maks: 2, lastTilDoning: false, visNiva: true, mottak: { plass: '', mengde: 1, evigLager: false }, levering: { punkt: '', mengde: 1, evigLager: false } }
        }
    },
    svingFartVedArbeid: 0,
    butikk: { type: 'redskap', bilde: 'butikkPlog0', tittel: 'MULD 0', pris: 20000 },
    funksjonane: {
        doningFlytta: (denne) => {
            if (denne.type !== 'tilhengar')
                return;
            animerDekk(denne.grafikk.dekkHB.animasjonDekk, denne.grafikk.dekkHB.klippPos, denne.pos.midt);
            animerDekk(denne.grafikk.dekkVB.animasjonDekk, denne.grafikk.dekkVB.klippPos, denne.pos.midt);
        },
    },
};
