"use strict";
class TingMal extends BaseMal {
    constructor(ny, rute) {
        super(ny, rute);
        this.fart = ny.fart;
    }
}
const orginalFro = {
    korn: { navn: 'korn', blirTil: 'kornSadd' },
    gras: { navn: 'gras', blirTil: 'grasSadd' },
    halm: { navn: 'halm', blirTil: null }
};
