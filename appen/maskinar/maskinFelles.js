"use strict";
const straffeFartVedTomForDrivstoff = 0.3;
const hengerFesteMargin = 5;
const maksTilhengerSving = 50;
const listerMaskin = {
    butikkList: ['samaskin0', 'tilhengar1', 'tilhengar2', 'plog5', 'slamaskin3bak', 'slamaskin3fram', 'treskeSkjer1', 'ballemaskin1'],
    doninger: ['traktor0', 'skurtreskar1', 'ferrari'],
};
function lagKrasjSider(data, krasjPunkt) {
    return data.map(denne => [krasjPunkt[denne[0]], krasjPunkt[denne[1]]]);
}
class MaskinMal {
    constructor(ny, rute) {
        this.navn = ny.navn;
        this.type = ny.type;
        this.redskap = { fram: null, bak: null };
        this.retning = { aktiv: 0, tmp: 0 };
        this.rute = { tilSjekk: [], x: rute.x, y: rute.y };
        this.pos = {
            midt: { x: rute.x * pixel.ruteLengde, y: rute.y * pixel.ruteLengde, tx: rute.x * pixel.ruteLengde, ty: rute.y * pixel.ruteLengde, fx: 0, fy: 0 },
            framKrok: { x: 0, y: 0, tx: 0, ty: 0, dx: ny.pos.framKrok.dx, dy: ny.pos.framKrok.dy },
            bakKrok: { x: 0, y: 0, tx: 0, ty: 0, dx: ny.pos.bakKrok.dx, dy: ny.pos.bakKrok.dy },
            dor: { x: 0, y: 0, tx: 0, ty: 0, dx: ny.pos.dor.dx, dy: ny.pos.dor.dy },
            lossePunkt: {}
        };
        for (let key in ny.pos.lossePunkt) {
            this.pos.lossePunkt[key] = { x: 0, y: 0, tx: 0, ty: 0, dx: ny.pos.lossePunkt[key].dx, dy: ny.pos.lossePunkt[key].dy };
        }
        this.krasj = {
            framSider: [],
            bakSider: [],
            andreSider: [],
            losseSider: [],
            punkt: {}
        };
        for (let key in ny.krasj.punkt) {
            this.krasj.punkt[key] = { x: 0, y: 0, tx: 0, ty: 0, dx: ny.krasj.punkt[key].dx, dy: ny.krasj.punkt[key].dy };
        }
        this.krasj.framSider = lagKrasjSider(ny.krasj.framSider, this.krasj.punkt);
        this.krasj.bakSider = lagKrasjSider(ny.krasj.bakSider, this.krasj.punkt);
        this.krasj.andreSider = lagKrasjSider(ny.krasj.andreSider, this.krasj.punkt);
        this.krasj.losseSider = ny.krasj.losseSider === null ? null : lagKrasjSider(ny.krasj.losseSider, this.krasj.punkt);
        this.fart = ny.fart;
        this.arbeid = { type: ny.arbeid.type,
            aktiv: false,
            punkt: ny.arbeid.punkt,
            type1: ny.arbeid.type1,
            type2: ny.arbeid.type2,
        };
        this.last = { valgtLast: null, mottar: ny.last.mottar, leverer: ny.last.leverer, lastData: ny.last.lastData };
        if (ny.last.valgtLast !== null) {
            this.last.valgtLast = this.last.lastData[ny.last.valgtLast];
        }
        this.butikk = ny.butikk;
        this.funksjonane = ny.funksjonane;
    }
}
//===================================================
class MaskinKjoretoyMal extends MaskinMal {
    constructor(ny, rute) {
        super(ny, rute);
        this.sving = { fram: 'beint', bak: 'beint', fart: ny.sving.fart };
    }
}
//===================================================
class MaskinRedskapMal extends MaskinMal {
    constructor(ny, rute) {
        super(ny, rute);
        this.svingFartVedArbeid = ny.svingFartVedArbeid;
    }
}
