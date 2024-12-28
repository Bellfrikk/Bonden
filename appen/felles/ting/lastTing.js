"use strict";
class Last extends TingMal {
    constructor(ny, rute) {
        super(ny, rute);
        this.grafikk = ny.grafikk;
    }
}
const fro = {
    navn: 'fro',
    type: 'last',
    pos: {
        bakKrok: { dx: 0, dy: 0 }, framKrok: { dx: 0, dy: 0 }, dor: { dx: 0, dy: 0 },
        lossePunkt: { fro: { dx: 0, dy: 0 } }
    },
    fart: { krasj: 0, friksjon: 0.5, tyngde: 0.1 },
    krasj: {
        framSider: [], bakSider: [], andreSider: [['nv', 'ov'], ['ov', 'oh'], ['oh', 'nh'], ['nv', 'nh']],
        losseSider: [],
        punkt: {
            nv: { dx: -16, dy: 8 },
            ov: { dx: -16, dy: -8 },
            oh: { dx: 16, dy: -8 },
            nh: { dx: 16, dy: 8 }
        }
    },
    grafikk: {
        sekk0: { skalVise: true, tegneRekkefolge: 'under', midt: { x: 0.5, y: 0.5 }, pos: { x: 0, y: 0 }, str: { x: 28, y: 20 }, retning: 0, klippPos: { x: 0, y: 0 } }, //palle med sekk
        sekk1: { skalVise: true, tegneRekkefolge: 'under', midt: { x: 0.5, y: 0.5 }, pos: { x: 7, y: -4 }, str: { x: 12, y: 8 }, retning: 0, klippPos: { x: 15, y: 11 } }, //bare sekk
        sekk2: { skalVise: true, tegneRekkefolge: 'under', midt: { x: 0.5, y: 0.5 }, pos: { x: -6, y: -4 }, str: { x: 12, y: 8 }, retning: 0, klippPos: { x: 15, y: 11 } }, //bare sekk
        sekk3: { skalVise: true, tegneRekkefolge: 'under', midt: { x: 0.5, y: 0.5 }, pos: { x: -6, y: 5 }, str: { x: 12, y: 8 }, retning: 0, klippPos: { x: 15, y: 11 } }, //bare sekk
    },
    last: {
        valgtLast: 'fro', mottar: [], leverer: ['fro'], laster: {
            fro: {
                maks: 3000, visNiva: false, lastTilDoning: false,
                mottak: { plass: '', mengde: 1, evigLager: false },
                levering: { punkt: 'fro', mengde: 1, evigLager: false }
            }
        }
    },
    funksjonane: [
        ['lastAnimasjon', function (denne) {
                let sekkar = Math.ceil(denne.last.laster.fro.niva * 4 / denne.last.laster.fro.maks);
                if (denne.last.laster.fro.niva === 0) {
                    slettTing(denne); //slette tingen si den er tom
                    denne.grafikk.sekk0.skalVise = (sekkar > 0) ? true : false;
                    denne.grafikk.sekk1.skalVise = (sekkar > 1) ? true : false;
                    denne.grafikk.sekk2.skalVise = (sekkar > 2) ? true : false;
                    denne.grafikk.sekk3.skalVise = (sekkar > 3) ? true : false;
                }
                flagg.push('teinTing');
            }],
    ],
    butikk: {
        type: "ingen",
        bilde: "",
        tittel: "",
        pris: 0
    }
};
