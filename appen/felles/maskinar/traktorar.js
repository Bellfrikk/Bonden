"use strict";
class Traktor extends MaskinKjoretoyMal {
    constructor(ny, rute) {
        super(ny, rute);
        this.grafikk = {
            dekkVB: ny.grafikk.dekkVB,
            dekkHB: ny.grafikk.dekkHB,
            dekkVF: ny.grafikk.dekkVF,
            dekkHF: ny.grafikk.dekkHF,
            karosseri: ny.grafikk.karosseri,
        };
        this.last.laster.drivstoff.niva = ny.last.laster.drivstoff.maks;
    }
}
const traktorDexta = {
    navn: 'New Holland Dexta',
    type: 'traktor',
    pos: {
        dor: { dx: -12, dy: 12 },
        framKrok: { dx: 30, dy: 0 },
        bakKrok: { dx: -8, dy: 0 },
        lossePunkt: { drivstoff: { dx: 0, dy: -20 } }
    },
    krasj: {
        framSider: [['fv', 'fh']], bakSider: [['bh', 'bv']], andreSider: [['bh', 'fh'], ['bv', 'fv']], losseSider: null,
        punkt: {
            bh: { dx: -13, dy: 15 },
            fh: { dx: 13, dy: 15 },
            bv: { dx: -13, dy: -15 },
            fv: { dx: 13, dy: -15 },
        }
    },
    grafikk: {
        dekkVB: { skalVise: true, tegneRekkefolge: 'under', midt: { x: 0.5, y: 0.5 }, pos: { x: 0, y: -12 }, str: { x: 15, y: 5 }, klippPos: { x: 0, y: 60 }, retning: 0, animasjonDekk: { px: 0, minX: 0, maksX: 3 } },
        dekkHB: { skalVise: true, tegneRekkefolge: 'under', midt: { x: 0.5, y: 0.5 }, pos: { x: 0, y: 12 }, str: { x: 15, y: 5 }, klippPos: { x: 0, y: 60 }, retning: 0, animasjonDekk: { px: 0, minX: 0, maksX: 3 } },
        dekkVF: { skalVise: true, tegneRekkefolge: 'under', midt: { x: 0.5, y: 0.5 }, pos: { x: 22, y: -8 }, str: { x: 10, y: 4 }, klippPos: { x: 0, y: 61 }, retning: 0, animasjonDekk: { px: 0, minX: 0, maksX: 3 }, animasjonSving: { venstre: -36, hogre: 29, beint: 0 } },
        dekkHF: { skalVise: true, tegneRekkefolge: 'under', midt: { x: 0.5, y: 0.5 }, pos: { x: 22, y: 8 }, str: { x: 10, y: 4 }, klippPos: { x: 0, y: 61 }, retning: 0, animasjonDekk: { px: 0, minX: 0, maksX: 3 }, animasjonSving: { venstre: -29, hogre: 36, beint: 0 } },
        karosseri: { skalVise: true, tegneRekkefolge: 'under', midt: { x: 0.5, y: 0.5 }, pos: { x: 10, y: 0 }, str: { x: 37, y: 25 }, klippPos: { x: 0, y: 35 }, retning: 0 }
    },
    fart: { aktiv: 0, maks: 1.1, friksjon: 0.2, aks: 0.3, landskap: 0, arbeid: 0, krasj: 0, tyngde: 4 }, //aks må ver større enn friksjon
    sving: { fart: 'fart' },
    last: {
        valgtLast: 'drivstoff', mottar: ['drivstoff'], leverer: ['drivstoff'],
        laster: { drivstoff: { maks: 300, visNiva: true, lastTilDoning: false,
                mottak: { plass: 'drivstoff', mengde: 1, evigLager: false },
                levering: { punkt: '', mengde: 1, evigLager: false } } }
    },
    arbeid: {
        type: 'traktor',
        punkt: [],
        type1: null,
        type2: null
    },
    butikk: { type: 'kjoretoy', bilde: 'butikkTraktor0', tittel: 'BLÅTASS GL2', pris: 20000 },
    funksjonane: {
        doningFlytta: (denne) => {
            if (denne.type !== 'traktor')
                return;
            animerDekk(denne.grafikk['dekkVB'].animasjonDekk, denne.grafikk['dekkVB'].klippPos, denne.pos.midt);
            animerDekk(denne.grafikk['dekkHB'].animasjonDekk, denne.grafikk['dekkHB'].klippPos, denne.pos.midt);
            animerDekk(denne.grafikk['dekkVF'].animasjonDekk, denne.grafikk['dekkVF'].klippPos, denne.pos.midt);
            animerDekk(denne.grafikk['dekkHF'].animasjonDekk, denne.grafikk['dekkHF'].klippPos, denne.pos.midt);
        },
        sving: (denne) => {
            if (denne.type !== 'traktor')
                return;
            animerSving(denne.sving.fram, denne.grafikk.dekkVF);
            animerSving(denne.sving.fram, denne.grafikk.dekkHF);
            flagg.push('teinMaskinar');
        },
        drivstoffMottaking: (denne) => {
            if (denne.type !== 'traktor')
                return;
            fyllDrivstoff(denne, denne.last.laster.drivstoff.mottak.mengde);
        }
    }
};
