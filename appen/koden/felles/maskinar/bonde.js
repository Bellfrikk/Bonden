"use strict";
class Bonde extends MaskinKjoretoyMal {
    constructor(ny, rute) {
        super(ny, rute);
        this.grafikk = { bonden: ny.grafikk.bonden };
    }
}
const bondeMann = {
    navn: 'bondeMann',
    type: 'bonde',
    pos: {
        bakKrok: { dx: 0, dy: 0 },
        framKrok: { dx: 0, dy: 0 },
        dor: { dx: 0, dy: 0 },
        lossePunkt: { mat: { dx: 0, dy: 0 } },
    },
    krasj: {
        framSider: [['fv', 'fh']],
        bakSider: [['bh', 'bv']],
        andreSider: [['fv', 'bv'], ['fh', 'bh']],
        losseSider: null,
        punkt: {
            bh: { dx: -13, dy: 15 },
            fh: { dx: 13, dy: 15 },
            bv: { dx: -13, dy: -15 },
            fv: { dx: 13, dy: -15 },
        }
    },
    grafikk: {
        bonden: { skalVise: true, tegneRekkefolge: 'over', midt: { x: 0.5, y: 0.5 }, pos: { x: 0, y: 0 }, str: { x: 26, y: 30 }, retning: 0, klippPos: { x: 0, y: 0 }, animasjonBevegelse: { flytt: 0, maksX: 180 } }
    },
    fart: { aktiv: 0, maks: 1, friksjon: 0.2, aks: 0.5, landskap: 0, arbeid: 0, krasj: 0, tyngde: 1 }, // aks må ver større enn friksjon
    sving: { fart: 4 },
    arbeid: { type: "ingen", punkt: [], type1: null, type2: null },
    last: { mottar: [], leverer: [], valgtLast: null, laster: {
            mat: { maks: 5, visNiva: false, lastTilDoning: false,
                mottak: { plass: 'munn', mengde: 1, evigLager: false },
                levering: { punkt: '', mengde: 1, evigLager: false } }
        }
    },
    butikk: { type: 'ingen', bilde: '', tittel: '', pris: 0 },
    funksjonane: {
        doningFlytta: (denne) => {
            if (denne.type !== 'bonde')
                return;
            denne.grafikk.bonden.animasjonBevegelse.flytt += Math.abs(Math.hypot(denne.pos.midt.fx, denne.pos.midt.fy));
            if (denne.grafikk.bonden.animasjonBevegelse.flytt > 13) {
                denne.grafikk.bonden.klippPos.x = (denne.grafikk.bonden.klippPos.x >= denne.grafikk.bonden.animasjonBevegelse.maksX) ? 0 : denne.grafikk.bonden.klippPos.x + 26;
                denne.grafikk.bonden.animasjonBevegelse.flytt -= 13;
            }
        }
    }
};
