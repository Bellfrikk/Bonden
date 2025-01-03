"use strict";
function lagEiLast(krasj, data) {
    return {
        niva: 0, maks: data.maks, visNiva: data.visNiva, lastTilDoning: data.lastTilDoning,
        mottak: { plass: data.mottak.plass === null ? null : krasj.losseSider, losserFra: null, mengde: 0, evigLager: false },
        levering: { punkt: data.mottak.plass === null ? null : krasj.punkt[data.levering.punkt], losserTil: null, mengde: 0, evigLager: false }
    };
}
;
;
;
;
;
;
;
;
;
;
function lagKrasjSider(data, krasjPunkt) {
    return data.map(denne => [krasjPunkt[denne[0]], krasjPunkt[denne[1]]]);
}
class BaseMal {
    constructor(ny, rute) {
        this.navn = ny.navn;
        this.type = ny.type;
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
        this.last = { valgtLast: null, mottar: ny.last.mottar, leverer: ny.last.leverer, laster: {} };
        for (let key in ny.last.laster) {
            this.last.laster[key] = lagEiLast(this.krasj, ny.last.laster[key]);
        }
        if (ny.last.valgtLast !== null) {
            this.last.valgtLast = this.last.laster[ny.last.valgtLast];
        }
        this.butikk = ny.butikk;
        this.funksjonane = {};
        for (let key in ny.funksjonane) {
            this.funksjonane[key] = ny.funksjonane[key];
        }
    }
}
function teinTingEllerMaskin(detteLerret, bilde, denne, tmpDel) {
    //flytt fokus til midt av maskin og roter riktig
    detteLerret.translate(denne.pos.midt.x, denne.pos.midt.y); //flytt fokus tilmidtpunkt
    detteLerret.rotate(denne.retning.aktiv * Math.PI / 180); //roter verden lik som doning
    //teiner doning
    detteLerret.translate(tmpDel.pos.x, tmpDel.pos.y); //flytt fokus tilmidtpunkt av del
    if (tmpDel.retning !== 0) {
        detteLerret.rotate((tmpDel.retning * Math.PI) / 180);
    } //roter verden likt som del
    detteLerret.drawImage(bilde, tmpDel.klippPos.x, tmpDel.klippPos.y, // velg utsnitt av doningtegning 
    tmpDel.str.x, tmpDel.str.y, //bredde og høyde på utsnitt
    -tmpDel.str.x * tmpDel.midt.x, -tmpDel.str.y * tmpDel.midt.x, //posisjon av tegning
    tmpDel.str.x, tmpDel.str.y);
    if (tmpDel.retning !== null) {
        detteLerret.rotate(-(tmpDel.retning * Math.PI) / 180);
    } //roter verden liks som del
    detteLerret.translate(-tmpDel.pos.x, -tmpDel.pos.y); //flytt fokus talbake fra del
    detteLerret.rotate((denne.retning.aktiv * Math.PI / 180) * -1); //flytt fokus tilbake
    detteLerret.translate(-denne.pos.midt.x, -denne.pos.midt.y); //roter tilbake 
}
