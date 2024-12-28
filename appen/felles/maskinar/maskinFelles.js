"use strict";
const straffeFartVedTomForDrivstoff = 0.3;
const hengerFesteMargin = 5;
const maksTilhengerSving = 50;
const listerMaskin = {
    butikkList: ['samaskin0', 'tilhengar1', 'tilhengar2', 'plog5', 'slamaskin3bak', 'slamaskin3fram', 'treskeSkjer1', 'ballemaskin1'],
    doninger: ['traktor0', 'skurtreskar1', 'ferrari'],
};
function velgValgtLast(denneDoningLast, nyLastData) {
    denneDoningLast.valgtLast = nyLastData;
}
class MaskinMal extends BaseMal {
    constructor(ny, rute) {
        super(ny, rute);
        this.redskap = { fram: null, bak: null };
        this.fart = ny.fart;
        this.arbeid = { type: ny.arbeid.type,
            aktiv: false,
            punkt: ny.arbeid.punkt,
            type1: ny.arbeid.type1,
            type2: ny.arbeid.type2,
        };
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
