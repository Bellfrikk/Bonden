"use strict";
const bonden = 'bonde0';
let koblingskaranteneTing = null;
let maskinar = {};
let maskinaListe = [];
const maskinbilde = document.getElementById('maskinar');
function lagMaskin(klasse, modell, rute) {
    const id = modell.type + maskinaListe.filter(ting => ting.includes(modell.type)).length;
    maskinar[id] = new klasse(modell, rute);
    maskinaListe.push(id);
    oppdaterPoisjonar(maskinar[id], 'direkte');
}
//====================================================== flytting av doning ======================================================================
function lagFlyttePosTilDoning(framBak) {
    nyRetningDoning(doning.sving[framBak]);
    nyPosisjonDoningOgRedskap();
}
function flyttDoning() {
    lagreOppdaterteTingPosisjonar(doning);
    if (doning.redskap.fram !== null) {
        lagreOppdaterteTingPosisjonar(doning.redskap.fram);
    }
    if (doning.redskap.bak !== null) {
        lagreOppdaterteTingPosisjonar(doning.redskap.bak);
    }
    flagg.push('doningFlytta');
    return true;
}
//====================================================== nyRetningDoning ======================================================================
function nyRetningDoning(sving) {
    if (krasjITilhengerTest() === "krasj") {
        return;
    } // ikkje sving om du krasje i tilhengaren
    doning.retning.tmp = doning.retning.aktiv;
    //sjekk om redskap er aktivert
    let tmpSving = (doning.sving.fart === "fart") ? Math.abs(doning.fart.aktiv) * 0.6 : doning.sving.fart; // bruk fast sving fart eller fart som svingfart
    if (doning.redskap.fram !== null && doning.redskap.fram.arbeid.aktiv) {
        // bruk redskap i arbeid svingfart om redskap er aktivert
        tmpSving = doning.redskap.fram.svingFartVedArbeid;
    }
    if (doning.redskap.bak !== null && doning.redskap.bak.arbeid.aktiv) {
        tmpSving = (tmpSving > doning.redskap.bak.svingFartVedArbeid) ? doning.redskap.bak.svingFartVedArbeid : tmpSving; // overskriv frarten om denne farten er mindre
    }
    //## Ny retning doning
    if (sving === "venstre") {
        doning.retning.tmp -= tmpSving;
        if (doning.retning.aktiv < 0) {
            doning.retning.tmp += 360;
        }
    }
    else if (sving === "hogre") {
        doning.retning.tmp += tmpSving;
        if (doning.retning.aktiv > 359) {
            doning.retning.tmp -= 360;
        }
    }
}
//====================================================== tein ======================================================================
function teinAlleMaskinar() {
    ramme.maskinar.height = skjerm.botn;
    ramme.maskinar.width = skjerm.hogre;
    let tegneliste = [];
    for (let denneMaskinNavn in maskinar) {
        let denneMaskin = maskinar[denneMaskinNavn];
        for (let denneDelNavn in denneMaskin.grafikk) {
            let denneDel = denneMaskin.grafikk[denneDelNavn];
            if (denneDel.skalVise) {
                if (denneDel.tegneRekkefolge === 'over') {
                    tegneliste.push([denneMaskin, denneDel]);
                }
                else if (denneDel.tegneRekkefolge === 'under') {
                    tegneliste.unshift([denneMaskin, denneDel]);
                }
            }
        }
    }
    tegneliste.forEach(del => { teinTingEllerMaskin(lerret.maskinar, maskinbilde, del[0], del[1]); }); //ligg i fellesMaskinarTingLandskap
}
//====================================================== ny Posisjon Doning og posisjon + retning redskap======================================================================
function nyPosisjonDoningOgRedskap() {
    // ny posiajonn doning
    let fart = hentFart();
    doning.pos.midt.fx = -fart * Math.cos((Math.PI / 180) * doning.retning.tmp);
    doning.pos.midt.fy = -fart * Math.sin((Math.PI / 180) * doning.retning.tmp);
    doning.pos.midt.tx = doning.pos.midt.x - doning.pos.midt.fx,
        doning.pos.midt.ty = doning.pos.midt.y - doning.pos.midt.fy;
    // finn hjørene og krok punkt doning
    oppdaterPoisjonar(doning, 'tmp');
    oppdaterTmpPos(doning, doning.pos.framKrok);
    posRedskap(doning.redskap.fram, doning.pos.framKrok);
    oppdaterTmpPos(doning, doning.pos.bakKrok);
    posRedskap(doning.redskap.bak, doning.pos.bakKrok);
    function posRedskap(denneRedskap, denneDoningKrok) {
        if (denneRedskap === null) {
            return;
        }
        // ny retning trepunkts redskap
        if (denneRedskap.type === "bakFeste" || denneRedskap.type === "framFeste") {
            denneRedskap.retning.tmp = doning.retning.aktiv;
        }
        else if (denneRedskap.type === "tilhengar") {
            //ny retning tilhenger redskap, rekner ut vinkel frå tihengeraksel til doning krok
            denneRedskap.retning.tmp = Math.atan2(denneDoningKrok.ty - denneRedskap.pos.midt.y, denneDoningKrok.tx - denneRedskap.pos.midt.x) * 180 / Math.PI; // gir ein vinkel frå 0 til 180 til -180 til -0
            if (denneRedskap.retning.tmp < 0) {
                denneRedskap.retning.tmp = 360 - denneRedskap.retning.tmp * -1; // konverterer negatin vinkel til 180 -360
            }
        }
        if (denneRedskap.type === "bakFeste" || denneRedskap.type === "framFeste") {
            // ny posisjon trepunkts redskap
            denneRedskap.pos.midt.tx = denneDoningKrok.tx;
            denneRedskap.pos.midt.ty = denneDoningKrok.ty;
        }
        else if (doning.redskap.bak !== null && doning.redskap.bak.type === "tilhengar") {
            //ny posisjon tilhenger redskap
            denneRedskap.pos.midt.tx = denneDoningKrok.tx + denneRedskap.pos.framKrok.dx * -1 * Math.cos((Math.PI / 180) * denneRedskap.retning.tmp);
            denneRedskap.pos.midt.ty = denneDoningKrok.ty + denneRedskap.pos.framKrok.dx * -1 * Math.sin((Math.PI / 180) * denneRedskap.retning.tmp);
        }
        // finn hjørene og krok punkt redskap
        oppdaterPoisjonar(denneRedskap, 'tmp');
    }
}
//cos gir 1/0g 0/90g -1/180g 0/270g 
//sin gir 0/0g 1/90g 0/180g -1/270g
//====================================================== krasjtestDoning ======================================================================
function krasjtestDoning(denne, framBak) {
    for (let t = 0; t < denne.rute.tilSjekk.length; t++) {
        let tmpTing = denne.rute.tilSjekk[t];
        if (tmpTing !== doning && //ikkje sjekk mot seg sjølv
            (doning.redskap.fram === null || tmpTing !== doning.redskap.fram) && //ikkje sjekk mot redskap framme
            (doning.redskap.bak === null || tmpTing !== doning.redskap.bak) //ikkje sjekk mot redskap bak
        ) {
            if (doning.type === 'bonde' && koblingskarantene('sjekk', tmpTing)) {
                return (['ok']);
            } // ikkje sjekk mot ting i karantene viss du er bonde
            if (framBak === 'fram' && denne.redskap.fram === null && krasjTest(denne.krasj.framSider, tmpTing.krasj)[0] === 'krasj') {
                return ['krasj', tmpTing];
            }
            else if (framBak === 'fram' && denne.redskap.fram !== null && krasjTest(denne.redskap.fram.krasj.framSider, tmpTing.krasj)[0] === 'krasj') {
                return ['krasj', tmpTing];
            }
            else if (framBak === 'bak' && denne.redskap.bak === null && krasjTest(denne.krasj.bakSider, tmpTing.krasj)[0] === 'krasj') {
                return ['krasj', tmpTing];
            }
            else if (framBak === 'bak' && denne.redskap.bak !== null && krasjTest(denne.redskap.bak.krasj.bakSider, tmpTing.krasj)[0] === 'krasj') {
                return ['krasj', tmpTing];
            }
        }
    }
    return ["ok"];
}
//-------------------------------------------sjekk om traktor svinger for kraftig og krasjer i tilhenger--------------------------------------------
function krasjITilhengerTest() {
    if (doning.redskap.bak !== null && doning.redskap.bak.type === "tilhengar") {
        let aktuellRadius = Math.abs(doning.retning.tmp - doning.redskap.bak.retning.tmp);
        if ((aktuellRadius > maksTilhengerSving) && (aktuellRadius < (360 - maksTilhengerSving))) {
            return "krasj";
        }
    }
}
//====================================================== flytting av kart ======================================================================
function flyttKart() {
    //flytt verden visst doning nærmar ser kanten
    if (doning.pos.midt.x > skjerm.bredde / zoom / 2 && doning.pos.midt.x < skjerm.hogre - skjerm.bredde / zoom / 2) {
        pixel.start.x -= doning.pos.midt.fx;
    }
    if (doning.pos.midt.y > skjerm.hoydeLandskap / zoom / 2 && doning.pos.midt.y < skjerm.botn - (skjerm.hoydeLandskap / zoom / 2)) {
        pixel.start.y -= doning.pos.midt.fy;
    }
}
function flyttKartVedResize() {
    //flytt verden når ein edrer størrelse på skjermen
    while (doning.pos.midt.x > skjerm.bredde / zoom / 2) {
        pixel.start.x--;
    }
    while (doning.pos.midt.x < skjerm.hogre - skjerm.bredde / zoom / 2) {
        pixel.start.x++;
    }
    while (doning.pos.midt.y > skjerm.hoydeLandskap / zoom / 2) {
        pixel.start.y--;
    }
    while (doning.pos.midt.y < skjerm.botn - (skjerm.hoydeLandskap / zoom / 2)) {
        pixel.start.y++;
    }
}
//====================================================== erDoningPaNyRute ======================================================================
function erDoningPaNyRute(denne) {
    let tmpRute = { x: denne.rute.x, y: denne.rute.y };
    oppdaterRutePos(denne);
    if (tmpRute.x !== denne.rute.x || tmpRute.y !== denne.rute.y) {
        if (landskap["x" + denne.rute.x + "y" + denne.rute.y].type !==
            landskap["x" + tmpRute.x + "y" + tmpRute.y].type) {
            flagg.push('nyRutetype');
        }
        flagg.push('nyRute');
    }
    else {
        return false;
    }
}
//====================================================== redskapKoblingSjekk ======================================================================
function redskapKoblingSjekk(denne) {
    //sjekker om doning kan koblast til redskap
    if (koblingskarantene('sjekk', denne) || !["traktor", "skurtreskar"].includes(doning.arbeid.type)) {
        return;
    }
    let posD, posR, aktivKrok;
    if (doning.redskap.fram === null && denne.type === "framFeste") {
        oppdaterPos(doning, doning.pos.framKrok);
        oppdaterPos(denne, denne.pos.bakKrok);
        posD = doning.pos.framKrok;
        posR = denne.pos.bakKrok;
        aktivKrok = "fram";
    }
    else if (doning.redskap.bak === null &&
        (denne.type === "bakFeste" || denne.type === "tilhengar")) {
        oppdaterPos(doning, doning.pos.bakKrok);
        oppdaterPos(denne, denne.pos.framKrok);
        posD = doning.pos.bakKrok;
        posR = denne.pos.framKrok;
        aktivKrok = "bak";
    }
    else {
        return;
    }
    //Visst redskap er på krokplass
    if (posR.x - hengerFesteMargin < posD.x &&
        posR.x + hengerFesteMargin > posD.x &&
        posR.y - hengerFesteMargin < posD.y &&
        posR.y + hengerFesteMargin > posD.y) {
        doning.redskap[aktivKrok] = denne; // kobler redsap på doning
        flagg.push(aktivKrok === "bak" ? "nyRedskapBak" : "nyRedskapFram");
        return true;
        //sjekker om redskap er på kroken til doning
    }
    //else if (denne === doning.klarTilKoblingRedskap[aktivKrok]) {
    //  doning.klarTilKoblingRedskap[aktivKrok] = null; //fjerner redskap frå klar til kobling
    //}
    return false;
}
//====================================================== redskapKobling ======================================================================
function redskapKobling(framEllerBak) {
    let denne = doning.redskap[framEllerBak];
    if (denne === null) {
        return;
    }
    //kobler AV redskap
    if (denne.arbeid.aktiv) {
        aktiverRedskap(framEllerBak);
    }
    denne.arbeid.aktiv = false;
    //oppdater rutenr til redskap
    oppdaterRutePos(denne);
    oppdaterPos(denne, denne.pos.framKrok);
    oppdaterPos(denne, denne.pos.bakKrok);
    koblingskarantene('sett', denne); // gjer at den ikkje kobler seg rett på igjen
    doning.redskap[framEllerBak] = null; //kobler av redskap
    flagg.push(framEllerBak === 'fram' ? 'nyRedskapFram' : 'nyRedskapBak');
}
//====================================================== aktiverRedskap ======================================================================
function aktiverRedskap(framEllerBak) {
    let denne = doning.redskap[framEllerBak];
    //deaktiver
    if (denne === null) {
        return;
    }
    if (denne.arbeid.aktiv) {
        denne.arbeid.aktiv = false;
        //aktiver
    }
    else {
        denne.arbeid.aktiv = true;
    }
    flagg.push(framEllerBak === 'fram' ? 'aktivertRedskapfram' : 'aktivertRedskapbak');
}
//====================================================== doningBytteSjekk ======================================================================
/**
 * @param {object} denne det som ein krasjer ein
 * @returns true visst det blir bytte
 */
function doningBytteSjekk(denne) {
    if (doning.type !== "bonde") {
        return false;
    }
    if (!koblingskarantene('sjekk', denne)) { //går inn i doning
        maskinar[bonden].pos.midt.x = 0;
        maskinar[bonden].pos.midt.y = 0; //fjerner bonde
        doning = denne;
        flagg.push('nyDoning');
        return true;
    }
    return false;
}
//====================================================== doningBytte ======================================================================
function utAvDoning() {
    if (doning.redskap.fram !== null) {
        oppdaterRutePos(doning.redskap.fram);
    }
    ;
    if (doning.redskap.bak !== null) {
        oppdaterRutePos(doning.redskap.bak);
    }
    ;
    if (doning !== maskinar[bonden]) {
        koblingskarantene('sett', doning);
        const punkt = doning.pos.dor;
        maskinar[bonden].pos.midt.x = doning.pos.midt.x + (punkt.dx * Math.cos((Math.PI / 180) * doning.retning.tmp)) + (punkt.dy * Math.sin((Math.PI / 180) * doning.retning.tmp));
        maskinar[bonden].pos.midt.y = doning.pos.midt.y + (punkt.dx * Math.sin((Math.PI / 180) * doning.retning.tmp)) + (punkt.dy * Math.cos((Math.PI / 180) * doning.retning.tmp));
        doning = maskinar[bonden];
        doning.pos.midt.fx = maskinar[bonden].pos.midt.x - doning.pos.midt.x;
        doning.pos.midt.fy = maskinar[bonden].pos.midt.y - doning.pos.midt.y;
        flyttKart();
    }
    flagg.push('nyDoning');
}
//-----------------------Karantene
/**
 * @description Når bonde gå ut av doning eller sett av redskap bli den sett i karantene,
 * bruk 'sett' til å plassere ting i karantene,
 * bruk 'sjekk' for å sjekke om ting er i karantene,
 * 'fjerning' blir brukt når doning har flytta seg for å sjå om ting er utafor markin og skal ut av karantene
 * @param {String} funkjson sett/sjekk/fjerning
 * @param {object} denne doning som skal flyttast eller koblast
 * @returns sjekk = true om ting er i karantene
 */
function koblingskarantene(funkjson, denne) {
    if (funkjson === 'sett') {
        koblingskaranteneTing = denne;
    }
    else if (funkjson === 'sjekk') {
        if (koblingskaranteneTing === denne) {
            return true;
        }
        else {
            return false;
        }
    }
    else if (funkjson === 'fjerning') {
        if (koblingskaranteneTing === null) {
            return false;
        }
        if (!erInnaforSjekk(denne.pos.midt, koblingskaranteneTing.pos.midt, koblingsKaranteneMargin)) {
            koblingskaranteneTing = null;
        }
    }
}
;
