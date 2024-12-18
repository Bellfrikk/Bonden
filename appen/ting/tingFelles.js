"use strict";
class TingMal {
    constructor(ny, rute) {
        this.navn = ny.navn;
        this.type = ny.type;
        this.retning = { aktiv: ny.retning.aktiv, tmp: 0 };
        this.rute = { tilSjekk: [], x: rute.x, y: rute.y };
        this.pos = {
            midt: { x: rute.x * pixel.ruteLengde, y: rute.y * pixel.ruteLengde, tx: rute.x * pixel.ruteLengde, ty: rute.y * pixel.ruteLengde, fx: 0, fy: 0 },
            lossePunkt: {},
            framKrok: { x: 0, y: 0, tx: 0, ty: 0, dx: 0, dy: 0 },
            bakKrok: { x: 0, y: 0, tx: 0, ty: 0, dx: 0, dy: 0 },
            dor: { x: 0, y: 0, tx: 0, ty: 0, dx: 0, dy: 0 }
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
        function lagKrasjSider(data, krasjPunkt) {
            return data.map(pos => [krasjPunkt[pos[0]], krasjPunkt[pos[1]]]);
        }
        this.krasj.framSider = lagKrasjSider(ny.krasj.framSider, this.krasj.punkt);
        this.krasj.bakSider = lagKrasjSider(ny.krasj.bakSider, this.krasj.punkt);
        this.krasj.andreSider = lagKrasjSider(ny.krasj.andreSider, this.krasj.punkt);
        this.krasj.losseSider = ny.krasj.losseSider === null ? null : lagKrasjSider(ny.krasj.losseSider, this.krasj.punkt);
        this.fart = ny.fart;
        this.last = { valgtLast: null, mottar: ny.last.mottar, leverer: ny.last.leverer, lastData: ny.last.lastData };
        if (ny.last.valgtLast !== null) {
            this.last.valgtLast = this.last.lastData[ny.last.valgtLast];
        }
        this.butikk = ny.butikk;
        this.funksjonane = ny.funksjonane;
    }
}
const orginalFro = {
    korn: { navn: 'korn', blirTil: 'kornSadd' },
    gras: { navn: 'gras', blirTil: 'grasSadd' },
    halm: { navn: 'halm', blirTil: null }
};
