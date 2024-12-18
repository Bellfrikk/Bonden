"use strict";
class Slamaskin extends MaskinRedskapMal {
    constructor(ny, rute) {
        super(ny, rute);
        this.grafikk = {
            karosseri: ny.grafikk.karosseri
        };
    }
}
const slamaskin3bak = {
    navn: 'Slåmaskin bak',
    type: 'bakFeste',
    pos: {
        dor: { dx: 0, dy: 0 },
        framKrok: { dx: 0, dy: 0 },
        bakKrok: { dx: 0, dy: 0 },
        lossePunkt: null
    },
    grafikk: {
        karosseri: { skalVise: true, retning: 0, tegneRekkefolge: 'under', midt: { x: 0.5, y: 0.5 }, pos: { x: -5, y: 0 }, str: { x: 10, y: 36 }, klippPos: { x: 0, y: 171 }, animasjonStrY: { str: 34, tid: 100, status: 0 } },
    },
    krasj: {
        framSider: [], bakSider: [['vbh', 'vbm'], ['vbm', 'vbv'],], andreSider: [['vfv', 'vfh'], ['vbh', 'vfh'], ['vbv', 'vfv']], losseSider: [],
        //aktivSider: { framSider: [['afv', 'afh']], bakSider: [['abhh', 'abhv'], ['abhv', 'abm'], ['abm', 'abvh'], ['abvh', 'abvv']], andreSider: [['abhh', 'afh'], ['abvv', 'afv']] },
        punkt: {
            vbh: { dx: -10, dy: 12 },
            vbm: { dx: -10, dy: 0 },
            vbv: { dx: -10, dy: -12 },
            vfh: { dx: -1, dy: -13 },
            vfv: { dx: -1, dy: 13 },
            abhh: { dx: -10, dy: 30 },
            abhv: { dx: -10, dy: 13 },
            abm: { dx: -10, dy: 0 },
            abvh: { dx: -10, dy: -13 },
            abvv: { dx: -10, dy: -30 },
            afh: { dx: -1, dy: -13 },
            afv: { dx: -1, dy: 13 },
        },
    },
    arbeid: {
        type: 'slamaskin',
        punkt: [
            { x: 8, y: -29, type: 'type1' },
            { x: 8, y: -26, type: 'type1' },
            { x: 8, y: -23, type: 'type2' },
            { x: 8, y: -20, type: 'type2' },
            { x: 8, y: -17, type: 'type1' },
            { x: 8, y: -14, type: 'type1' },
            { x: 8, y: 14, type: 'type1' },
            { x: 8, y: 17, type: 'type1' },
            { x: 8, y: 20, type: 'type2' },
            { x: 8, y: 23, type: 'type2' },
            { x: 8, y: 26, type: 'type1' },
            { x: 8, y: 29, type: 'type1' }
        ],
        type1: { blirTil: 'grasHausta', last: { type: 'gras', mengde: 1 } },
        type2: { blirTil: 'grasSlatt', last: { type: 'gras', mengde: -3 } },
    },
    svingFartVedArbeid: 0.5,
    fart: { aktiv: 0, maks: 0, friksjon: 0, aks: 0, landskap: 0, arbeid: -0.2, krasj: 0, tyngde: 1.5 },
    last: {
        valgtLast: null, mottar: [], leverer: [], lastData: {
            gras: {
                niva: 0, maks: 100, visNiva: false, lastTilDoning: false,
                mottak: { plass: null, mengde: 1, losserFra: null, evigLager: false },
                levering: { punkt: null, mengde: 1, losserTil: null, evigLager: false }
            }
        }
    },
    butikk: { type: 'redskap', bilde: 'butikkSlamaskin3bak', tittel: 'SÅMASKIN R', pris: 20000 },
    funksjonane: [
        [
            'redskapFramAktivert', function (denne) {
                if (animerStorrelse(denne.grafikk.karosseri, denne.grafikk.karosseri.animasjonStrY, 'y', (denne.arbeid.aktiv ? 1 : -1), true)) {
                    flagg.push('aktivertRedskapbak');
                }
                if (denne.arbeid.aktiv) {
                    denne.krasj.framSider = lagKrasjSider([['afv', 'afh']], denne.krasj.punkt);
                    denne.krasj.bakSider = lagKrasjSider(([['abhh', 'abhv'], ['abhv', 'abm'], ['abm', 'abvh'], ['abvh', 'abvv']]), denne.krasj.punkt);
                    denne.krasj.andreSider = lagKrasjSider(([['abhh', 'afh'], ['abvv', 'afv']]), denne.krasj.punkt);
                }
                else {
                    denne.krasj.framSider = [];
                    denne.krasj.bakSider = lagKrasjSider(([['vbh', 'vbm'], ['vbm', 'vbv']]), denne.krasj.punkt);
                    denne.krasj.andreSider = lagKrasjSider(([['vfv', 'vfh'], ['vbh', 'vfh'], ['vbv', 'vfv']]), denne.krasj.punkt);
                }
            }
        ]
    ],
};
//______________________Slåmaskin 3fram
const slamaskin3fram = {
    navn: 'Klaas-Framslaget',
    type: 'framFeste',
    pos: {
        dor: { dx: 0, dy: 0 },
        framKrok: { dx: 0, dy: 0 },
        bakKrok: { dx: 0, dy: 0 },
        lossePunkt: null
    },
    krasj: {
        framSider: [['fv', 'fh']],
        bakSider: [],
        andreSider: [['bh', 'bv'], ['fh', 'bh'], ['bv', 'fv']],
        losseSider: [],
        punkt: {
            bh: { dx: 0, dy: 11 },
            bv: { dx: 0, dy: -11 },
            fh: { dx: 12, dy: 11 },
            fv: { dx: 12, dy: -11 },
        },
    },
    arbeid: {
        type: 'slamaskin',
        punkt: [
            { x: -5, y: -9, type: 'type1' },
            { x: -5, y: -6, type: 'type1' },
            { x: -5, y: -3, type: 'type2' },
            { x: -5, y: 0, type: 'type2' },
            { x: -5, y: 3, type: 'type2' },
            { x: -5, y: 6, type: 'type1' },
            { x: -5, y: 9, type: 'type1' }
        ],
        type1: { blirTil: 'grasHausta', last: { type: 'gras', mengde: 1 } },
        type2: { blirTil: 'grasSlatt', last: { type: 'gras', mengde: -3 } },
    },
    grafikk: {
        karosseri: { skalVise: true, retning: 0, tegneRekkefolge: 'under', midt: { x: 0.5, y: 0.5 }, pos: { x: 6, y: 0 }, str: { x: 12, y: 23 }, klippPos: { x: 11, y: 183 }, animasjonStrY: { str: 34, tid: 100, status: 0 } },
    },
    svingFartVedArbeid: 0.5,
    fart: { aktiv: 0, maks: 0, friksjon: 0, aks: 0, landskap: 0, arbeid: -0.2, krasj: 0, tyngde: 1 },
    last: {
        valgtLast: null, mottar: [], leverer: [], lastData: {
            gras: {
                niva: 0, maks: 100, visNiva: false, lastTilDoning: false,
                mottak: { plass: null, mengde: 1, losserFra: null, evigLager: false },
                levering: { punkt: null, mengde: 1, losserTil: null, evigLager: false }
            }
        }
    },
    butikk: { type: 'redskap', bilde: 'butikkSlamaskin3bak', tittel: 'SÅMASKIN R', pris: 20000 },
    funksjonane: [],
};
