"use strict";
ramme.knappar.height = skjerm.hoydeKnappar;
ramme.knappar.width = skjerm.bredde;
function oppdaterKnappar() {
    ramme.knappar.height = skjerm.hoydeKnappar;
    ramme.knappar.width = skjerm.bredde;
    teinKnappar();
}
function sjekkOmKnapparErAktivert() {
    //-------------------andre knappar aktivering ---------------
    if (knappar.utAvDoning.vis && knappar.utAvDoning.trykkAktivert) {
        utAvDoning();
        knappar.utAvDoning.trykkAktivert = false;
    }
    else if (knappar.koblingRedskapFram.vis && knappar.koblingRedskapFram.trykkAktivert) {
        knappar.koblingRedskapFram.trykkAktivert = false;
        redskapKobling('fram');
    }
    else if (knappar.koblingRedskapBak.vis && knappar.koblingRedskapBak.trykkAktivert) {
        knappar.koblingRedskapBak.trykkAktivert = false;
        redskapKobling('bak');
    }
    else if (knappar.aktiverRedskapFram.vis && knappar.aktiverRedskapFram.trykkAktivert) {
        knappar.aktiverRedskapFram.trykkAktivert = false;
        aktiverRedskap('fram');
    }
    else if (knappar.aktiverRedskapBak.vis && knappar.aktiverRedskapBak.trykkAktivert) {
        knappar.aktiverRedskapBak.trykkAktivert = false;
        aktiverRedskap('bak');
    }
    else if (knappar.velgFro.vis && knappar.velgFro.trykkAktivert) {
        knappar.velgFro.trykkAktivert = false;
        if (doning.redskap.bak !== null) {
            oppdaterValgtLast(doning.redskap.bak, 'velgFro');
        }
    }
}
// 𝘀𝘁𝘆𝗿𝗶𝗻𝗴​⁡ tastatur
function styring() {
    document.addEventListener('keydown', function (knapp) {
        knapp.preventDefault();
        if (knapp.key === 'ArrowUp' || knapp.key === 'w') {
            knappar.fram.trykkAktivert = true;
            knappar.bak.trykkAktivert = false;
        }
        else if (knapp.key === 'ArrowDown' || knapp.key === 's') {
            knappar.bak.trykkAktivert = true;
            knappar.fram.trykkAktivert = false;
        }
        else if (knapp.key === 'ArrowLeft' || knapp.key === 'a') {
            knappar.venstre.trykkAktivert = true;
            knappar.hogre.trykkAktivert = false;
        }
        else if (knapp.key === 'ArrowRight' || knapp.key === 'd') {
            knappar.hogre.trykkAktivert = true;
            knappar.venstre.trykkAktivert = false;
        }
        else if (knapp.key === 'f') {
            knappar.koblingRedskapFram.trykkAktivert = true;
        }
        else if (knapp.key === 'r') {
            knappar.koblingRedskapBak.trykkAktivert = true;
        }
        else if (knapp.key === 'g') {
            knappar.aktiverRedskapFram.trykkAktivert = true;
        }
        else if (knapp.key === 't') {
            knappar.aktiverRedskapBak.trykkAktivert = true;
        }
        else if (knapp.key === 'e') {
            knappar.utAvDoning.trykkAktivert = true;
        }
        flagg.push('animasjon');
    });
    document.addEventListener('keyup', function tastSlepp(knapp) {
        knapp.preventDefault();
        if (knapp.key === 'ArrowUp' || knapp.key === 'w') {
            knappar.fram.trykkAktivert = false;
        }
        else if (knapp.key === 'ArrowDown' || knapp.key === 's') {
            knappar.bak.trykkAktivert = false;
        }
        else if (knapp.key === 'ArrowLeft' || knapp.key === 'a') {
            knappar.venstre.trykkAktivert = false;
        }
        else if (knapp.key === 'ArrowRight' || knapp.key === 'd') {
            knappar.hogre.trykkAktivert = false;
        }
        flagg.push('animasjon');
    });
    ramme.skjerm.addEventListener("touchstart", (e) => { e.preventDefault(); klikkMus(e, 'touch', true); }, false);
    ramme.skjerm.addEventListener("touchend", (e) => { e.preventDefault(); klikkMus(e, 'touch', false); }, false);
    ramme.skjerm.addEventListener("mousedown", (e) => { e.preventDefault(); klikkMus(e, 'mus', true); }, false);
    ramme.skjerm.addEventListener("mouseup", (e) => { e.preventDefault(); klikkMus(e, 'mus', false); }, false);
    ramme.skjerm.addEventListener("mouseleave", (e) => { e.preventDefault(); klikkMus(e, 'mus', false); }, false);
}
//--------------------------------------KNAPPAR------------------------------------
function klikkMus(pos, type, trykk) {
    if (type === 'mus') {
        sjekkKnappar([pos.clientX, pos.clientY], trykk);
    }
    else {
        //let tmpTouch = [...pos.touches];
        //for(let a=0; a<tmpTouch.length;a++) {
        //  sjekkKnappar( [pos.touches[a].clientX, pos.touches[a].clientY] , trykk);
        //}
        let tmpTouch = [...pos.changedTouches];
        for (let a = 0; a < tmpTouch.length; a++) {
            sjekkKnappar([pos.changedTouches[a].clientX, pos.changedTouches[a].clientY], trykk);
        }
    }
}
function sjekkKnappar(mus, trykk) {
    mus[1] -= skjerm.startHoydeKnappar;
    if (aktivSkjerm.verden) {
        for (let k = 0; k < knappar.aktivListe.length; k++) {
            if (knappar[knappar.aktivListe[k]].vis === false) {
                continue;
            } //ikkje sjekk knappar som ikkje er aktive
            if ((mus[0] > knappar[knappar.aktivListe[k]].v && mus[0] < knappar[knappar.aktivListe[k]].h) && (mus[1] > knappar[knappar.aktivListe[k]].t && mus[1] < knappar[knappar.aktivListe[k]].b)) {
                knappar[knappar.aktivListe[k]].trykkAktivert = trykk;
                console.log(knappar.aktivListe[k] + ' aktivert ' + knappar[knappar.aktivListe[k]].trykkAktivert);
            }
        }
    }
    // else if (aktivSkjerm.butikk) {
    //  for (let k = 0; k < butikkKnappar.length; k++) {
    //    if ((mus[0] > butikkKnappar[k].v && mus[0] < butikkKnappar[k].h) && (mus[1] > butikkKnappar[k].t && mus[1] < butikkKnappar[k].b)) {
    //    }
    //  }
    //}
}
function teinKnappar() {
    sjekkOmKnapparSkalVise();
    lerret.knappar.beginPath();
    lerret.knappar.fillStyle = '#000';
    lerret.knappar.fillRect(0, 0, skjerm.bredde, skjerm.startHoydeKnappar);
    if ((knappar.aktivListe.length * knappar.str) > skjerm.bredde) { //to linjer med knappar
        knappar.fram.v = (knappar.marg + knappar.str * 0);
        knappar.bak.v = (knappar.marg + knappar.str * 0);
        knappar.koblingRedskapFram.v = (knappar.marg + knappar.str * 2);
        knappar.aktiverRedskapFram.v = (knappar.marg + knappar.str * 1);
        knappar.utAvDoning.v = (knappar.marg + knappar.str * 3);
        knappar.velgFro.v = (knappar.marg + knappar.str * 4);
        knappar.koblingRedskapBak.v = skjerm.bredde - (knappar.marg + knappar.str * 2);
        knappar.aktiverRedskapBak.v = skjerm.bredde - (knappar.marg + knappar.str * 1);
        knappar.venstre.v = skjerm.bredde - (knappar.marg + knappar.str * 2);
        knappar.hogre.v = skjerm.bredde - (knappar.marg + knappar.str * 1);
        knappar.fram.t = knappar.marg / 2;
        knappar.bak.t = knappar.marg / 2 + knappar.str;
        knappar.koblingRedskapFram.t = knappar.marg / 2;
        knappar.aktiverRedskapFram.t = knappar.marg / 2;
        knappar.utAvDoning.t = knappar.marg / 2;
        knappar.koblingRedskapBak.t = knappar.marg / 2;
        knappar.aktiverRedskapBak.t = knappar.marg / 2;
        knappar.venstre.t = knappar.marg / 2 + knappar.str;
        knappar.hogre.t = knappar.marg / 2 + knappar.str;
    }
    else { //1 linje med knappar
        knappar.fram.v = (knappar.marg + knappar.str * 0);
        knappar.bak.v = (knappar.marg + knappar.str * 1);
        knappar.utAvDoning.v = (knappar.marg + knappar.str * 2);
        knappar.aktiverRedskapFram.v = (knappar.marg + knappar.str * 3);
        knappar.koblingRedskapFram.v = (knappar.marg + knappar.str * 4);
        knappar.koblingRedskapBak.v = (knappar.marg + knappar.str * 5);
        knappar.aktiverRedskapBak.v = (knappar.marg + knappar.str * 6);
        knappar.velgFro.v = (knappar.marg + knappar.str * 7);
        knappar.venstre.v = skjerm.bredde - ((knappar.marg + knappar.str) * 2);
        knappar.hogre.v = skjerm.bredde - ((knappar.marg + knappar.str) * 1);
        knappar.fram.t = knappar.marg / 2;
        knappar.bak.t = knappar.marg / 2;
        knappar.koblingRedskapFram.t = knappar.marg / 2;
        knappar.aktiverRedskapFram.t = knappar.marg / 2;
        knappar.utAvDoning.t = knappar.marg / 2;
        knappar.koblingRedskapBak.t = knappar.marg / 2;
        knappar.aktiverRedskapBak.t = knappar.marg / 2;
        knappar.venstre.t = knappar.marg / 2;
        knappar.hogre.t = knappar.marg / 2;
    }
    for (let k = 0; k < knappar.aktivListe.length; k++) {
        let tmpKnapp = knappar[knappar.aktivListe[k]];
        if (tmpKnapp.vis) {
            tmpKnapp.b = tmpKnapp.t + knappar.str;
            tmpKnapp.h = tmpKnapp.v + knappar.str;
            lerret.knappar.drawImage(document.getElementById('knappar'), tmpKnapp.ikonNr * knappar.ikonStr, 0, knappar.ikonStr, knappar.ikonStr, tmpKnapp.v, tmpKnapp.t, knappar.str, knappar.str);
        }
    }
}
//====================================================== knapp ======================================================================
function endreKnapp(hendelse, knapp) {
    if (hendelse === "vis") {
        knappar[knapp].vis = true;
    }
    else if (hendelse === "fjern") {
        knappar[knapp].vis = false;
    }
    else if (hendelse === "visAktiv") {
        knappar[knapp].visAktiv = true;
    }
    else if (hendelse === "visPassiv") {
        knappar[knapp].visAktiv = false;
    }
}
function sjekkOmKnapparSkalVise() {
    if (aktivSkjerm.verden) {
        knappar.utAvDoning.vis = doning.type === 'bonde' ? false : true;
        knappar.velgFro.vis = (doning.redskap.bak !== null && doning.redskap.bak.arbeid.type === 'samaskin') ? true : false,
            knappar.koblingRedskapFram.vis = doning.redskap.fram === null ? false : true;
        knappar.aktiverRedskapFram.vis = doning.redskap.fram === null ? false : true;
        knappar.koblingRedskapBak.vis = doning.redskap.bak === null ? false : true;
        knappar.aktiverRedskapBak.vis = doning.redskap.bak === null ? false : true;
        knappar.fram.vis = true;
        knappar.bak.vis = true;
        knappar.venstre.vis = true;
        knappar.hogre.vis = true;
        knappar.eng.vis = false;
        knappar.grus.vis = false;
        knappar.jorde.vis = false;
        knappar.veiBeint.vis = false;
        knappar.veiSving.vis = false;
        knappar.veiTkryss.vis = false;
        knappar.veiXkryss.vis = false;
        knappar.vatn.vis = false;
    }
    else if (aktivSkjerm.lagNyVerden) {
        knappar.utAvDoning.vis = false;
        knappar.velgFro.vis = false;
        knappar.koblingRedskapFram.vis = false;
        knappar.aktiverRedskapFram.vis = false;
        knappar.koblingRedskapBak.vis = false;
        knappar.aktiverRedskapBak.vis = false;
        knappar.fram.vis = false;
        knappar.bak.vis = false;
        knappar.venstre.vis = false;
        knappar.hogre.vis = false;
        knappar.eng.vis = true;
        knappar.grus.vis = true;
        knappar.jorde.vis = true;
        knappar.veiBeint.vis = true;
        knappar.veiSving.vis = true;
        knappar.veiTkryss.vis = true;
        knappar.veiXkryss.vis = true;
        knappar.vatn.vis = true;
    }
}
//-------------------Knapp data
let knappar = {
    str: 50,
    min: 50,
    maks: 80,
    marg: 10,
    ikonStr: 39,
    etasjer: 0,
    aktivListe: [
        "fram",
        "bak",
        "utAvDoning",
        "velgFro",
        "aktiverRedskapFram",
        "koblingRedskapFram",
        "koblingRedskapBak",
        "aktiverRedskapBak",
        "venstre",
        "hogre",
        "eng",
        "grus",
        "jorde",
        "veiBeint",
        "veiSving",
        "veiTkryss",
        "veiXkryss",
        "vatn",
    ],
    spelListe: [
        "fram",
        "bak",
        "utAvDoning",
        "velgFro",
        "aktiverRedskapFram",
        "koblingRedskapFram",
        "koblingRedskapBak",
        "aktiverRedskapBak",
        "venstre",
        "hogre",
    ],
    lagVerdenListe: [
        "eng",
        "grus",
        "jorde",
        "veiBeint",
        "veiSving",
        "veiTkryss",
        "veiXkryss",
        "vatn",
    ],
    fram: {
        vis: false,
        visAktiv: true,
        trykkAktivert: false,
        plasseringSide: "venstreOppe",
        plasseringNr: 1,
        ikonNr: 1,
        v: 0,
        t: 0,
        h: 0,
        b: 0,
    },
    bak: {
        vis: false,
        visAktiv: true,
        trykkAktivert: false,
        plasseringSide: "venstreNere",
        plasseringNr: 2,
        ikonNr: 0,
        v: 0,
        t: 0,
        h: 0,
        b: 0,
    },
    utAvDoning: {
        vis: false,
        visAktiv: false,
        trykkAktivert: false,
        plasseringSide: "midtNere",
        plasseringNr: 3,
        ikonNr: 4,
        v: 0,
        t: 0,
        h: 0,
        b: 0,
    },
    aktiverRedskapFram: {
        vis: false,
        visAktiv: false,
        trykkAktivert: false,
        plasseringSide: "venstreOppe",
        plasseringNr: 2,
        ikonNr: 7,
        v: 0,
        t: 0,
        h: 0,
        b: 0,
    },
    koblingRedskapFram: {
        vis: false,
        visAktiv: false,
        trykkAktivert: false,
        plasseringSide: "venstreOppe",
        plasseringNr: 3,
        ikonNr: 5,
        v: 0,
        t: 0,
        h: 0,
        b: 0,
    },
    koblingRedskapBak: {
        vis: false,
        visAktiv: false,
        trykkAktivert: false,
        plasseringSide: "hogreOppe",
        plasseringNr: 2,
        ikonNr: 6,
        v: 0,
        t: 0,
        h: 0,
        b: 0,
    },
    aktiverRedskapBak: {
        vis: false,
        visAktiv: false,
        trykkAktivert: false,
        plasseringSide: "hogreOppe",
        plasseringNr: 1,
        ikonNr: 7,
        v: 0,
        t: 0,
        h: 0,
        b: 0,
    },
    venstre: {
        vis: false,
        visAktiv: true,
        trykkAktivert: false,
        plasseringSide: "hogreNere",
        plasseringNr: 2,
        ikonNr: 2,
        v: 0,
        t: 0,
        h: 0,
        b: 0,
    },
    hogre: {
        vis: false,
        visAktiv: true,
        trykkAktivert: false,
        plasseringSide: "hogreNere",
        plasseringNr: 1,
        ikonNr: 3,
        v: 0,
        t: 0,
        h: 0,
        b: 0,
    },
    velgFro: {
        vis: false,
        visAktiv: false,
        trykkAktivert: false,
        plasseringSide: "venstreOppe",
        plasseringNr: 7,
        ikonNr: 12,
        v: 0,
        t: 0,
        h: 0,
        b: 0,
    },
    eng: {
        vis: false,
        visAktiv: false,
        trykkAktivert: false,
        plasseringSide: "venstreOppe",
        plasseringNr: 0,
        ikonNr: 5,
        v: 0,
        t: 0,
        h: 0,
        b: 0,
    },
    grus: {
        vis: false,
        visAktiv: false,
        trykkAktivert: false,
        plasseringSide: "venstreOppe",
        plasseringNr: 1,
        ikonNr: 5,
        v: 0,
        t: 0,
        h: 0,
        b: 0,
    },
    jorde: {
        vis: false,
        visAktiv: false,
        trykkAktivert: false,
        plasseringSide: "venstreOppe",
        plasseringNr: 2,
        ikonNr: 5,
        v: 0,
        t: 0,
        h: 0,
        b: 0,
    },
    veiBeint: {
        vis: false,
        visAktiv: false,
        trykkAktivert: false,
        plasseringSide: "venstreOppe",
        plasseringNr: 3,
        ikonNr: 5,
        v: 0,
        t: 0,
        h: 0,
        b: 0,
    },
    veiSving: {
        vis: false,
        visAktiv: false,
        trykkAktivert: false,
        plasseringSide: "venstreOppe",
        plasseringNr: 4,
        ikonNr: 5,
        v: 0,
        t: 0,
        h: 0,
        b: 0,
    },
    veiTkryss: {
        vis: false,
        visAktiv: false,
        trykkAktivert: false,
        plasseringSide: "venstreOppe",
        plasseringNr: 5,
        ikonNr: 5,
        v: 0,
        t: 0,
        h: 0,
        b: 0,
    },
    veiXkryss: {
        vis: false,
        visAktiv: false,
        trykkAktivert: false,
        plasseringSide: "venstreOppe",
        plasseringNr: 6,
        ikonNr: 5,
        v: 0,
        t: 0,
        h: 0,
        b: 0,
    },
    vatn: {
        vis: false,
        visAktiv: false,
        trykkAktivert: false,
        plasseringSide: "venstreOppe",
        plasseringNr: 7,
        ikonNr: 5,
        v: 0,
        t: 0,
        h: 0,
        b: 0,
    },
};
