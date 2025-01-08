"use strict";
class Samaskin extends MaskinRedskapMal {
    constructor(ny, rute) {
        super(ny, rute);
        this.grafikk = {
            dekk: ny.grafikk.dekk,
            karosseri: ny.grafikk.karosseri,
            lastVenstre: ny.grafikk.lastVenstre,
            lastHogre: ny.grafikk.lastHogre
        };
    }
}
const samaskin0 = {
    navn: 'Somento-EX',
    type: 'bakFeste',
    pos: {
        dor: { dx: 0, dy: 0 },
        framKrok: { dx: 0, dy: 0 },
        bakKrok: { dx: 0, dy: 0 },
        lossePunkt: null
    },
    grafikk: {
        dekk: { skalVise: true, tegneRekkefolge: 'under', midt: { x: 0.5, y: 0.5 }, pos: { x: -9, y: 0 }, str: { x: 2, y: 29 }, retning: 0, klippPos: { x: 0, y: 98 }, animasjonDekk: { px: 0, minX: 0, maksX: 3 } }, //anim hoppe3??
        karosseri: { skalVise: true, tegneRekkefolge: 'under', midt: { x: 0.5, y: 0.5 }, pos: { x: -4, y: 0 }, str: { x: 8, y: 29 }, retning: 0, klippPos: { x: 4, y: 98 } },
        lastVenstre: { skalVise: true, tegneRekkefolge: 'under', midt: { x: 0.5, y: 0.5 }, pos: { x: -4, y: -7 }, str: { x: 2, y: 5 }, retning: 0, klippPos: { x: 16, y: 128 }, animasjonLast: { startX: 5, maksX: 5, startY: 5, maksY: 13 } },
        lastHogre: { skalVise: true, tegneRekkefolge: 'under', midt: { x: 0.5, y: 0.5 }, pos: { x: -4, y: 7 }, str: { x: 2, y: 5 }, retning: 0, klippPos: { x: 16, y: 128 }, animasjonLast: { startX: 5, maksX: 5, startY: 5, maksY: 13 } },
    },
    krasj: {
        framSider: [], bakSider: [['bh', 'bv']], andreSider: [['fv', 'fh'], ['bh', 'fh'], ['bv', 'fv']],
        losseSider: [['fv', 'fh'], ['fh', 'bh'], ['bh', 'bv'], ['bv', 'fv']],
        punkt: {
            bh: { dx: -10, dy: -13 },
            fh: { dx: 0, dy: -13 },
            fv: { dx: 0, dy: 13 },
            bv: { dx: -10, dy: 13 },
        },
    },
    arbeid: {
        type: 'samaskin',
        punkt: [
            { x: 11, y: -13, type: 'type1' },
            { x: 11, y: -10, type: 'type1' },
            { x: 11, y: -7, type: 'type1' },
            { x: 11, y: -4, type: 'type1' },
            { x: 11, y: -1, type: 'type1' },
            { x: 11, y: 1, type: 'type1' },
            { x: 11, y: 4, type: 'type1' },
            { x: 11, y: 7, type: 'type1' },
            { x: 11, y: 10, type: 'type1' },
            { x: 11, y: 13, type: 'type1' }
        ],
        type1: {
            blirTil: 'kornSadd', last: { type: 'fro', mengde: -1 },
        },
        type2: null,
    },
    svingFartVedArbeid: 0.5,
    fart: { aktiv: 0, maks: 0, friksjon: 0, aks: 0, landskap: 0, arbeid: -0.5, krasj: 0, tyngde: 1 },
    last: {
        valgtLast: 'fro', mottar: ['fro'], leverer: [], laster: {
            fro: {
                maks: 500, visNiva: true, lastTilDoning: false,
                mottak: { plass: 'lossePlass', mengde: 1, evigLager: false },
                levering: { punkt: '', mengde: 0, evigLager: false }
            }
        }
    },
    butikk: { type: 'redskap', bilde: 'butikkSamaskin0', tittel: 'SÅMASKIN R', pris: 20000 },
    funksjonane: {
        doningFlytta: (denne) => {
            if (denne.type !== 'samaskin')
                return;
            animerDekk(denne.grafikk.dekk.animasjonDekk, denne.grafikk.dekk.klippPos, denne.pos.midt);
        },
        lastAnimasjonLoop: (denne, lastType) => {
            if (denne.type !== 'samaskin')
                return;
            if (denne.last.valgtLast !== null) {
                oppdaterLastStrAnimasjon(denne, denne.grafikk.lastVenstre, denne.last.valgtLast);
                oppdaterLastStrAnimasjon(denne, denne.grafikk.lastHogre, denne.last.valgtLast);
            }
        },
        froLevering: (denne) => {
            if (denne.last.laster.fro === null) {
                return;
            }
            if (denne.last.laster.fro.mottak.losserFra !== null &&
                denne.last.laster.fro.mottak.plass !== null &&
                denne.last.laster.fro.niva >= 0) {
                if (oppdaterLast(denne, denne.last.laster.fro.mottak.plass, 'fro', 2)) {
                    flagg.push('froLevering');
                }
            }
        },
        velgFro: (denne) => {
            if (denne.arbeid.type1 === null)
                return;
            if (denne.arbeid.type1.blirTil === 'kornSadd') {
                denne.arbeid.type1.blirTil = 'grasSadd';
                denne.grafikk.lastVenstre.klippPos.y = 141;
                denne.grafikk.lastHogre.klippPos.y = 141;
            }
            else {
                denne.arbeid.type1.blirTil = 'kornSadd';
                denne.grafikk.lastVenstre.klippPos.y = 128;
                denne.grafikk.lastHogre.klippPos.y = 128;
            }
        },
    },
};
