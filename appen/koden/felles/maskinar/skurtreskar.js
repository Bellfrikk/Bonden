"use strict";
class Skurtreskar extends MaskinKjoretoyMal {
    constructor(ny, rute) {
        super(ny, rute);
        this.grafikk = {
            dekkVB: ny.grafikk.dekkVB,
            dekkHB: ny.grafikk.dekkHB,
            dekkVF: ny.grafikk.dekkVF,
            dekkHF: ny.grafikk.dekkHF,
            karosseri: ny.grafikk.karosseri,
            royr: ny.grafikk.royr,
        };
        this.last.laster.drivstoff.niva = ny.last.laster.drivstoff.maks;
    }
}
const skurtreskar1 = {
    navn: 'New-Holland-Traditional',
    type: 'doning',
    retning: { aktiv: 0, tmp: 0 },
    startRute: { tilSjekk: [], x: 6, y: 2 },
    pos: {
        dor: { dx: -12, dy: 12 },
        framKrok: { dx: 12, dy: 0 },
        bakKrok: { dx: -52, dy: 0 },
        lossePunkt: {
            korn: { dx: -24, dy: -38 },
            drivstoff: { dx: 24, dy: -38 }
        }
    },
    krasj: {
        framSider: [['dekkVF', 'dekkHF']],
        bakSider: [['bh', 'bv']],
        andreSider: [['dekkVB', 'dekkVF'], ['dekkHB', 'dekkHF']],
        losseSider: [[]],
        punkt: {
            dekkVF: { dx: 11, dy: -22 },
            dekkHF: { dx: 11, dy: 22 },
            dekkVB: { dx: -47, dy: -17 },
            dekkHB: { dx: 47, dy: 17 },
            bv: { dx: -52, dy: -11 },
            bh: { dx: -52, dy: 11 },
            royrfeste: { dx: -24, dy: -10 },
            royrtupp: { dx: -24, dy: -38 }
        }
    },
    grafikk: {
        dekkVF: { skalVise: true, tegneRekkefolge: 'under', midt: { x: 0.5, y: 0.5 }, pos: { x: 0, y: -18 }, str: { x: 20, y: 8 }, retning: 0, klippPos: { x: 0, y: 255 }, animasjonDekk: { px: 0, minX: 0, maksX: 3 } },
        dekkHF: { skalVise: true, tegneRekkefolge: 'under', midt: { x: 0.5, y: 0.5 }, pos: { x: 0, y: 18 }, str: { x: 20, y: 8 }, retning: 0, klippPos: { x: 0, y: 255 }, animasjonDekk: { px: 0, minX: 0, maksX: 3 } },
        dekkVB: { skalVise: true, tegneRekkefolge: 'under', midt: { x: 0.5, y: 0.5 }, pos: { x: -39, y: -15 }, str: { x: 10, y: 5 }, retning: 0, klippPos: { x: 0, y: 264 }, animasjonDekk: { px: 0, minX: 0, maksX: 3 }, animasjonSving: { venstre: 30, hogre: -23, beint: 0 } },
        dekkHB: { skalVise: true, tegneRekkefolge: 'under', midt: { x: 0.5, y: 0.5 }, pos: { x: -39, y: 15 }, str: { x: 10, y: 5 }, retning: 0, klippPos: { x: 0, y: 264 }, animasjonDekk: { px: 0, minX: 0, maksX: 3 }, animasjonSving: { venstre: 23, hogre: -30, beint: 0 } },
        karosseri: { skalVise: true, tegneRekkefolge: 'under', midt: { x: 0.5, y: 0.5 }, pos: { x: -19, y: 0 }, str: { x: 63, y: 28 }, retning: 0, klippPos: { x: 0, y: 226 } },
        royr: { skalVise: true, tegneRekkefolge: 'under', midt: { x: 0, y: 0.5 }, pos: { x: -15, y: -7 }, str: { x: 33, y: 6 }, retning: 180, klippPos: { x: 30, y: 255 }, animasjonRetning: { retning: 90, tid: 100, status: 0 } },
    },
    fart: { aktiv: 0, maks: 1, friksjon: 0.2, aks: 0.3, landskap: 0, arbeid: 0, krasj: 0, tyngde: 6 },
    sving: { fart: 'fart' },
    last: { valgtLast: 'korn', mottar: ['drivstoff'], leverer: ['drivstoff', 'korn'],
        laster: {
            drivstoff: { maks: 500, visNiva: true, lastTilDoning: false,
                mottak: { plass: 'drivstoff', mengde: 1, evigLager: false },
                levering: { punkt: '', mengde: 1, evigLager: false } },
            korn: { maks: 500, visNiva: true, lastTilDoning: true,
                mottak: { plass: 'drivstoff', mengde: 1, evigLager: false },
                levering: { punkt: '', mengde: -1, evigLager: false } },
        },
    },
    arbeid: { type: 'traktor', punkt: [], type1: null, type2: null },
    butikk: { type: 'kjoretoy', bilde: 'butikkTraktor0', tittel: 'ingen', pris: 20000 },
    funksjonane: {
        doningFlytta: (denne) => {
            animerDekk(denne.grafikk['dekkVB'].animasjonDekk, denne.grafikk['dekkVB'].klippPos, denne.pos.midt);
            animerDekk(denne.grafikk['dekkHB'].animasjonDekk, denne.grafikk['dekkHB'].klippPos, denne.pos.midt);
            animerDekk(denne.grafikk['dekkVF'].animasjonDekk, denne.grafikk['dekkVF'].klippPos, denne.pos.midt);
            animerDekk(denne.grafikk['dekkHF'].animasjonDekk, denne.grafikk['dekkHF'].klippPos, denne.pos.midt);
        },
        sving: (denne) => {
            animerSving(denne.sving.fram, denne.grafikk.dekkVB);
            animerSving(denne.sving.fram, denne.grafikk.dekkHB);
            flagg.push('teinMaskinar');
        },
        drivstoffMottaking: (denne) => {
            if (denne.last.laster.drivstoff) {
                fyllDrivstoff(denne, denne.last.laster.drivstoff.mottak.mengde);
            }
        },
        kornLevering: (denne) => {
            if (!denne.last.laster.korn) {
                return;
            }
            if (denne.last.laster.korn.levering.losserTil && denne.last.laster.korn.niva > 0) {
                if (denne.grafikk.royr.animasjonRetning.status === denne.grafikk.royr.animasjonRetning.retning) { //røyr er heilt ute
                    oppdaterLast(denne, denne.last.laster.korn.levering.losserTil, 'korn', -1);
                }
                flagg.push('kornLevering');
            }
        },
    }
};
