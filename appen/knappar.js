"use strict";
//Lag ikon på nivå 3 knappar
//lag veg ting funksjon
//lag infoboks
//lag kjøp funksjon
//lag bygg funksjon
let knapparBilde = document.getElementById('knappar');
oppdaterKnappar();
function oppdaterKnappar() {
    ramme.knappar.height = skjerm.hoydeKnappar;
    ramme.knappar.width = skjerm.bredde;
}
// Lag knappar
function lagKnappar() {
    lagKnappRad('styringModus');
    lagKnappRad('butikkModus');
    lagKnappRad('verdenModus');
    lagKnappRad('landskap');
    lagKnappRad('jorde');
    lagKnappRad('vei');
    lagKnappRad('maskinarModus');
    lagKnappRad('traktor');
    lagKnappRad('skurtreskar');
    lagKnappRad('plog');
    lagKnappRad('samaskin');
    lagKnappRad('slamaskin');
    lagKnappRad('ballemaskin');
    lagKnappRad('balleklype');
    lagKnappRad('tilhengar');
    lagKnappRad('anna');
    lagKnappRad('tingModus');
    lagKnappRad('bygg');
    lagKnappRad('fro');
    lagKnappRad('gjodsel');
    knappModus.knappLinje.styringModus.forEach(knapp => lagKnapp(knapp, 'styringModus'));
    knappModus.knappLinje.butikkModus.forEach(knapp => lagKnapp(knapp, 'butikkModus'));
    knappModus.knappLinje.verdenModus.forEach(knapp => lagKnapp(knapp, 'verdenModus'));
    knappModus.knappLinje.maskinarModus.forEach(knapp => lagKnapp(knapp, 'maskinarModus'));
    knappModus.knappLinje.tingModus.forEach(knapp => lagKnapp(knapp, 'tingModus'));
    listerLandskap.jorde.forEach(denne => laginfovindu(denne, jordeBilde, orginalJorde[denne].butikk));
}
function lagKnappRad(id) {
    let knappeRamme = document.createElement('div');
    knappeRamme.id = id;
    knappeRamme.style.position = 'absolute';
    knappeRamme.style.bottom = '0px';
    knappeRamme.style.width = '100vw';
    knappeRamme.style.height = knapparData.ikonStr + 'px';
    knappeRamme.style.zIndex = '5';
    knappeRamme.style.display = 'flex';
    knappeRamme.style.justifyContent = 'left';
    if (aktivKnappModus !== id) {
        knappeRamme.style.display = 'none';
        knappeRamme.style.zIndex = '0';
    }
    document.body.appendChild(knappeRamme);
}
function lagKnapp(knapp, ramme) {
    let knappeRamme = document.getElementById(ramme);
    let nyKnapp = document.createElement('button');
    nyKnapp.id = knapp;
    if (knapparBilde) {
        nyKnapp.style.backgroundImage = `url(${knapparBilde.src})`;
    }
    nyKnapp.style.backgroundRepeat = 'no-repeat';
    nyKnapp.style.height = knapparData.ikonStr + 'px';
    nyKnapp.style.width = knapparData.ikonStr + 'px';
    if (knapp === 'venstre' || knapp === 'hogre')
        nyKnapp.style.justifyItems = 'right';
    nyKnapp.style.backgroundPositionX = '-' + (knappar[knapp].ikonNr * knapparData.ikonStr) + 'px';
    if (knappeRamme)
        knappeRamme.appendChild(nyKnapp);
    leggtilTrykkOgSleppHandling(nyKnapp, knappar[knapp].handling.trykk, knappar[knapp].handling.slepp);
}
function laginfovindu(denne, denneBilde, denneTekst) {
    let infovindu = document.createElement('div');
    infovindu.id = denne;
    infovindu.style.position = 'absolute';
    infovindu.style.bottom = skjerm.hoydeKnappar + 'px';
    infovindu.style.width = '100vw';
    infovindu.style.height = knapparData.ikonStr + 'px';
    infovindu.style.display = 'flex';
    infovindu.style.justifyContent = 'left';
    // infovindu.style.display = 'none';
    // infovindu.style.zIndex = '0';
    document.body.appendChild(infovindu);
    //infobilde
    let bilde = document.createElement('img');
    if (denneBilde) {
        bilde.src = denneBilde.src;
    }
    bilde.style.height = knapparData.infovinduStr + 'px';
    bilde.style.width = knapparData.infovinduStr + 'px';
    if (infovindu)
        infovindu.appendChild(bilde);
    //info tekstboks
    let tekstBoks = document.createElement('div');
    infovindu.style.height = 'auto';
    infovindu.style.width = '100%';
    infovindu.style.display = 'flex';
    infovindu.style.flexDirection = 'column';
    infovindu.style.justifyContent = 'left';
    // infovindu.style.display = 'none';
    //overskrift
    let tekst = document.createElement('p');
    tekst.innerHTML = '<b>${denneTekst.oversktift}</b><br>${denneTekst.underskrift}<br>${denneTekst.info}<br>Pris: ${denneTekst.underskrift}';
    // infovindu.appendChild(infovindu);
    //Kjøp knapp
    document.body.appendChild(infovindu);
    //  leggtilTrykkOgSleppHandling(nyKnapp,knappar[knapp].handling.trykk,knappar[knapp].handling.slepp);
}
function endreKnappModus(nyModus) {
    oppdaterKnappLinje('none');
    aktivKnappModus = nyModus;
    oppdaterKnappLinje('');
}
function oppdaterKnappLinje(nyStatus) {
    let linje = document.getElementById(aktivKnappModus);
    if (linje)
        linje.style.display = nyStatus;
}
function visFjernKnapp(knapp, vis) {
    knappar[knapp].vis = vis;
    document.getElementById(knapp).style.display = vis ? '' : 'none';
}
// Knapp styring--------------------------------------------------------------------------------------------
function sjekkEinKnapp(knapp) {
    if (knapp.vis && knapp.trykkAktivert) {
        knapp.trykkAktivert = false;
        return true;
    }
    return false;
}
// 𝘀𝘁𝘆𝗿𝗶𝗻𝗴​⁡ tastatur
function styring() {
    document.addEventListener('keydown', function (knapp) {
        knapp.preventDefault();
        if (knapp.key === 'ArrowUp' || knapp.key === 'w') {
            pilTrykk('fram');
            pilSlepp('bak');
            knappar.bak.trykkAktivert = false;
        }
        else if (knapp.key === 'ArrowDown' || knapp.key === 's') {
            pilTrykk('bak');
            pilSlepp('fram');
            knappar.fram.trykkAktivert = false;
        }
        else if (knapp.key === 'ArrowLeft' || knapp.key === 'a') {
            pilTrykk('venstre');
            pilSlepp('hogre');
            knappar.hogre.trykkAktivert = false;
        }
        else if (knapp.key === 'ArrowRight' || knapp.key === 'd') {
            pilTrykk('hogre');
            pilSlepp('venstre');
            knappar.venstre.trykkAktivert = false;
        }
        else if (knapp.key === 'f') {
            pilTrykk('koblingRedskapFram');
        }
        else if (knapp.key === 'r') {
            pilTrykk('koblingRedskapBak');
        }
        else if (knapp.key === 'g') {
            pilTrykk('aktiverRedskapFram');
        }
        else if (knapp.key === 't') {
            pilTrykk('aktiverRedskapBak');
        }
        else if (knapp.key === 'e') {
            pilTrykk('utAvDoning');
        }
        flagg.push('animasjon');
    });
    document.addEventListener('keyup', function tastSlepp(knapp) {
        knapp.preventDefault();
        if (knapp.key === 'ArrowUp' || knapp.key === 'w')
            pilSlepp('fram');
        else if (knapp.key === 'ArrowDown' || knapp.key === 's')
            pilSlepp('bak');
        else if (knapp.key === 'ArrowLeft' || knapp.key === 'a')
            pilSlepp('venstre');
        else if (knapp.key === 'ArrowRight' || knapp.key === 'd')
            pilSlepp('hogre');
        flagg.push('animasjon');
    });
}
function velgFro() { if (doning.redskap.bak !== null) {
    oppdaterValgtLast(doning.redskap.bak, 'velgFro');
} }
function aktiverKnapp(knapp) {
    console.log('aktiver ' + knapp);
}
function pilTrykk(knapp) {
    console.log('trykk ' + knapp);
    knappar[knapp].trykkAktivert = true;
    if (knapp === 'fram')
        pilSlepp('bak');
    if (knapp === 'bak')
        pilSlepp('fram');
    if (knapp === 'venstre')
        pilSlepp('hogre');
    if (knapp === 'hogre')
        pilSlepp('venstre');
}
function pilSlepp(knapp) {
    console.log('trykk ' + knapp);
    knappar[knapp].trykkAktivert = false;
}
//====================================================== knapp ======================================================================
function endreKnapp(hendelse, knapp) {
    if (hendelse === "vis") {
        visFjernKnapp(knapp, true);
    }
    else if (hendelse === "fjern") {
        visFjernKnapp(knapp, false);
    }
    else if (hendelse === "visAktiv") {
        knappar[knapp].visAktiv = true;
    }
    else if (hendelse === "visPassiv") {
        knappar[knapp].visAktiv = false;
    }
}
//-------------------Knapp data
let knapparData = {
    str: 50,
    min: 50,
    maks: 80,
    marg: 10,
    ikonStr: 40,
    infovinduStr: 80,
};
//const knappLinjeKnappar:KnapparTypar[] = ['styring','butikk','landskap','jorde','vei','traktor','skurtreskar','plog','samaskin','slamaskin','ballemaskin','balleklype','fro','gjodsel'];
let knappModus = {
    knappLinje: {
        styringModus: ['fram', 'bak', 'utAvDoning', 'butikk', 'venstre', 'hogre'],
        butikkModus: ['styring', 'verden', 'maskinar', 'ting'],
        verdenModus: ['butikk', 'landskap', 'jorde', 'vei'],
        maskinarModus: ['butikk', 'traktor', 'skurtreskar', 'plog', 'samaskin', 'slamaskin', 'ballemaskin', 'balleklype', 'tilhengar', 'anna'],
        tingModus: ['butikk', 'bygg', 'fro', 'gjodsel']
    },
};
let aktivKnappModus = 'styringModus';
let knappar = {
    fram: {
        vis: false,
        visAktiv: true,
        trykkAktivert: false,
        ikonNr: 1,
        handling: {
            trykk: () => pilTrykk('fram'),
            slepp: () => pilSlepp('fram'),
        }
    },
    bak: {
        vis: false,
        visAktiv: true,
        trykkAktivert: false,
        ikonNr: 0,
        handling: {
            trykk: () => pilTrykk('bak'),
            slepp: () => pilSlepp('bak'),
        }
    },
    utAvDoning: {
        vis: false,
        visAktiv: false,
        trykkAktivert: false,
        ikonNr: 4,
        handling: {
            trykk: () => utAvDoning(),
            slepp: null,
        }
    },
    butikk: {
        vis: false,
        visAktiv: false,
        trykkAktivert: false,
        ikonNr: 16,
        handling: {
            trykk: () => endreKnappModus('butikkModus'),
            slepp: null,
        }
    },
    koblingRedskapFram: {
        vis: false,
        visAktiv: false,
        trykkAktivert: false,
        ikonNr: 5,
        handling: {
            trykk: () => redskapKobling('fram'),
            slepp: null,
        }
    },
    aktiverRedskapFram: {
        vis: false,
        visAktiv: false,
        trykkAktivert: false,
        ikonNr: 7,
        handling: {
            trykk: () => aktiverRedskap('fram'),
            slepp: null,
        }
    },
    koblingRedskapBak: {
        vis: false,
        visAktiv: false,
        trykkAktivert: false,
        ikonNr: 6,
        handling: {
            trykk: () => redskapKobling('bak'),
            slepp: null,
        }
    },
    aktiverRedskapBak: {
        vis: false,
        visAktiv: false,
        trykkAktivert: false,
        ikonNr: 7,
        handling: {
            trykk: () => aktiverRedskap('bak'),
            slepp: null,
        }
    },
    velgFro: {
        vis: false,
        visAktiv: false,
        trykkAktivert: false,
        ikonNr: 12,
        handling: {
            trykk: () => velgFro(),
            slepp: null,
        }
    },
    venstre: {
        vis: false,
        visAktiv: true,
        trykkAktivert: false,
        ikonNr: 2,
        handling: {
            trykk: () => pilTrykk('venstre'),
            slepp: () => pilSlepp('venstre'),
        }
    },
    hogre: {
        vis: false,
        visAktiv: true,
        trykkAktivert: false,
        ikonNr: 3,
        handling: {
            trykk: () => pilTrykk('hogre'),
            slepp: () => pilSlepp('hogre'),
        }
    },
    //menyknappar
    styring: {
        vis: false,
        visAktiv: false,
        trykkAktivert: false,
        ikonNr: 13,
        handling: {
            trykk: () => endreKnappModus('styringModus'),
            slepp: null,
        }
    },
    verden: {
        vis: false,
        visAktiv: false,
        trykkAktivert: false,
        ikonNr: 13,
        handling: {
            trykk: () => endreKnappModus('verdenModus'),
            slepp: null,
        }
    },
    maskinar: {
        vis: false,
        visAktiv: false,
        trykkAktivert: false,
        ikonNr: 17,
        handling: {
            trykk: () => endreKnappModus('maskinarModus'),
            slepp: null,
        }
    },
    ting: {
        vis: false,
        visAktiv: false,
        trykkAktivert: false,
        ikonNr: 16,
        handling: {
            trykk: () => endreKnappModus('tingModus'),
            slepp: null,
        }
    },
    //Landskap undermeny
    landskap: {
        vis: false,
        visAktiv: false,
        trykkAktivert: false,
        ikonNr: 13,
        handling: {
            trykk: () => endreKnappModus('landskap'),
            slepp: null,
        }
    },
    jorde: {
        vis: false,
        visAktiv: false,
        trykkAktivert: false,
        ikonNr: 15,
        handling: {
            trykk: () => endreKnappModus('jorde'),
            slepp: null,
        }
    },
    vei: {
        vis: false,
        visAktiv: false,
        trykkAktivert: false,
        ikonNr: 14,
        handling: {
            trykk: () => endreKnappModus('vei'),
            slepp: null,
        }
    },
    //Landskap ting
    eng: {
        vis: false,
        visAktiv: false,
        trykkAktivert: false,
        ikonNr: 11,
        handling: {
            trykk: () => aktiverKnapp('eng'),
            slepp: null,
        }
    },
    grus: {
        vis: false,
        visAktiv: false,
        trykkAktivert: false,
        ikonNr: 11,
        handling: {
            trykk: () => aktiverKnapp('grus'),
            slepp: null,
        }
    },
    vatn: {
        vis: false,
        visAktiv: false,
        trykkAktivert: false,
        ikonNr: 12,
        handling: {
            trykk: () => aktiverKnapp('vatn'),
            slepp: null,
        }
    },
    //Vei ting
    veiBeint: {
        vis: false,
        visAktiv: false,
        trykkAktivert: false,
        ikonNr: 12,
        handling: {
            trykk: () => aktiverKnapp('veiBeint'),
            slepp: null,
        }
    },
    veiSving: {
        vis: false,
        visAktiv: false,
        trykkAktivert: false,
        ikonNr: 12,
        handling: {
            trykk: () => aktiverKnapp('veiSving'),
            slepp: null,
        }
    },
    veiTkryss: {
        vis: false,
        visAktiv: false,
        trykkAktivert: false,
        ikonNr: 12,
        handling: {
            trykk: () => aktiverKnapp('veiTkryss'),
            slepp: null,
        }
    },
    veiXkryss: {
        vis: false,
        visAktiv: false,
        trykkAktivert: false,
        ikonNr: 12,
        handling: {
            trykk: () => aktiverKnapp('veiXkryss'),
            slepp: null,
        }
    },
    //Maskinar undermeny
    traktor: {
        vis: false,
        visAktiv: false,
        trykkAktivert: false,
        ikonNr: 12,
        handling: {
            trykk: () => endreKnappModus('traktor'),
            slepp: null,
        }
    },
    skurtreskar: {
        vis: false,
        visAktiv: false,
        trykkAktivert: false,
        ikonNr: 12,
        handling: {
            trykk: () => endreKnappModus('skurtreskar'),
            slepp: null,
        }
    },
    plog: {
        vis: false,
        visAktiv: false,
        trykkAktivert: false,
        ikonNr: 12,
        handling: {
            trykk: () => endreKnappModus('plog'),
            slepp: null,
        }
    },
    samaskin: {
        vis: false,
        visAktiv: false,
        trykkAktivert: false,
        ikonNr: 12,
        handling: {
            trykk: () => endreKnappModus('samaskin'),
            slepp: null,
        }
    },
    slamaskin: {
        vis: false,
        visAktiv: false,
        trykkAktivert: false,
        ikonNr: 12,
        handling: {
            trykk: () => endreKnappModus('slamaskin'),
            slepp: null,
        }
    },
    ballemaskin: {
        vis: false,
        visAktiv: false,
        trykkAktivert: false,
        ikonNr: 12,
        handling: {
            trykk: () => endreKnappModus('ballemaskin'),
            slepp: null,
        }
    },
    tilhengar: {
        vis: false,
        visAktiv: false,
        trykkAktivert: false,
        ikonNr: 12,
        handling: {
            trykk: () => endreKnappModus('tilhengar'),
            slepp: null,
        }
    },
    balleklype: {
        vis: false,
        visAktiv: false,
        trykkAktivert: false,
        ikonNr: 12,
        handling: {
            trykk: () => endreKnappModus('balleklype'),
            slepp: null,
        }
    },
    anna: {
        vis: false,
        visAktiv: false,
        trykkAktivert: false,
        ikonNr: 12,
        handling: {
            trykk: () => endreKnappModus('anna'),
            slepp: null,
        }
    },
    //ting undermeny
    bygg: {
        vis: false,
        visAktiv: false,
        trykkAktivert: false,
        ikonNr: 16,
        handling: {
            trykk: () => endreKnappModus('bygg'),
            slepp: null,
        }
    },
    fro: {
        vis: false,
        visAktiv: false,
        trykkAktivert: false,
        ikonNr: 5,
        handling: {
            trykk: () => endreKnappModus('fro'),
            slepp: null,
        }
    },
    gjodsel: {
        vis: false,
        visAktiv: false,
        trykkAktivert: false,
        ikonNr: 3,
        handling: {
            trykk: () => endreKnappModus('gjodsel'),
            slepp: null,
        }
    }
};
