
"use strict";

const hengerFesteMargin = 30;
const maksTilhengerSving = 50;
let koblingskarantene = { ting: null, avstand: [0, 0] };

function lagMaskin(ny) {
  let id = "ting" + maskinar.liste.length;
  maskinar[id] = new nyMaskin(ny, id);
  maskinar.liste.push(id);
}

//𝗻𝘆 𝘁𝗶𝗻𝗴⁡​
function nyMaskin(x, id) {
  //last inn data
  this.kjopt = true;
  this.id = id;
  this.navn = orginalMaskin[x].navn;
  this.rute = orginalMaskin[x].rute;
  this.grafikk = orginalMaskin[x].grafikk;
  this.pos = orginalMaskin[x].pos;
  this.krasj = orginalMaskin[x].krasj;
  this.type = orginalMaskin[x].type;
  this.sving = orginalMaskin[x].sving;
  this.fart = orginalMaskin[x].fart;
  this.drivstoff = orginalMaskin[x].drivstoff;
  this.last = orginalMaskin[x].last;
  this.arbeid = orginalMaskin[x].arbeid;
  //oppdater posisjon fra rutekoordinat til pixel
  this.pos.midt.x = this.rute.x* pixel.ruteLengde;
  this.pos.midt.y = this.rute.y* pixel.ruteLengde;
  // lag variablar
  this.animasjon = { forsinkelse: 0, sekvens: 0 };
  this.redskap = { fram: null, bak: null };
  this.klarTilKoblingRedskap = { fram: null, bak: null };
  this.tmp = { pos: { ...this.pos, flytt: [0, 0] } };
}
//====================================================== flytting av doning ======================================================================

function kanDoningFlyttast(sving) {
  nyRetningDoning(sving);
  nyPosisjonDoningOgRedskap();
  if (doning.fart.aktiv <= 0 && krasjITilhengerTest() === "krasj") {
    return doning.redskap.bak;
  }

  return krasjtest();
}

function flyttDoning() {
  lagreOppdaterteTingPosisjonar(doning, doning.tmp);
  if (doning.redskap.fram !== null) {
    lagreOppdaterteTingPosisjonar(doning.redskap.fram, doning.redskap.fram.tmp);
  }
  if (doning.redskap.bak !== null) {
    lagreOppdaterteTingPosisjonar(doning.redskap.bak, doning.redskap.bak.tmp);
  }
  flagg.doningFlytta = true;
  return true;
}
//====================================================== flytting av kart ======================================================================
function flyttKart(flytt) {
  //flytt verden visst doning nærmar ser kanten
  if (
    !(
      doning.pos.midt.x < skjerm.bredde / 2 ||
      doning.pos.midt.x > skjerm.hogre - skjerm.bredde / 2
    )
  ) {
    pixel.start.x -= pos.midt.fx;
    landskap.erEndra = true;
  }
  if (
    !(
      doning.pos.midt.y < skjerm.hoydeLandskap / 2 ||
      doning.pos.midt.y >
        skjerm.botn - skjerm.hoydeKnappar - skjerm.hoydeLandskap / 2
    )
  ) {
    pixel.start.y -= pos.midt.fy;
    landskap.erEndra = true;
  }
}

//====================================================== oppdater animasjon ======================================================================
function oppdaterAnimasjon(denne) {
  if (denne === null) {
    return;
  }
  if (doning.fart.aktiv !== 0) {
    doning.animasjon.forsinkelse += doning.fart.aktiv;//auk med fart for at animasjon aukar med fart
    if (doning.animasjon.forsinkelse >= 5) {// nå forsinkelse nå terskelen, animer
      doning.bilde.array.forEach((ting) => {
        ting.animAktiv += doning.fart.aktiv < 0 ? 1 : -1;//auk eller mink alt etter kjøreretning
        if (ting.animAktiv > ting.animFart) {//gå til null
          ting.animAktiv = 0;
        } else if (ting.animAktiv < 0) {//gå til maks
          ting.animAktiv = ting.animFart;
        }
      });
      flagg.animasjon = true;
    }
  }
}
// ------------------------------------------oppdater sving animasjon-------------------------------
function oppdaterSvingAnimasjon() {
  doning.bilde.array.forEach(ting => {
    if(ting.retning !== null){
      ting.retning.aktiv = ting.retning[ doning.sving.fram ];//henter retning beint, venstre eller hogre
    }
  });
  flagg.animasjon = true;
}
// ------------------------------------------oppdater sving animasjon-------------------------------
function oppdaterLastAnimasjon(denne) {
  if ( denne === null || denne.last.type === null ||denne.bilde.lastMaksAnim === 0 ) { return;  } //sjekk om redskap og last og animasjon finns
  //Roter last animasjon likt som svinganimasjon. Rekn ut kor mange "prosent" av last igjen og juster animasjon der etter.
  denne.bilde.svingAnim = denne.bilde.startLastAnim[denne.last.type] +  Math.floor( (denne.last.niva *
        (denne.bilde.maksLastAnim[denne.last.type] -
          denne.bilde.startLastAnim[denne.last.type])) /
        denne.last.maks +
        0.99
    ); // legg til 0.99 for at den skal dele lasta likt, men likevel bli tom til slutt
  flagg.animasjon = true;
}

//====================================================== erDoningPaNyRute ======================================================================
// ------------------------------------------oppdaterDoningRute-------------------------------
function erDoningPaNyRute() {
  let tmpRute = {x:doning.rute.x, y:doning.rute.y}
  doning.rute.x = Math.floor(doning.pos.midt.x / pixel.ruteLengde);
  doning.rute.y = Math.floor(doning.pos.midt.y / pixel.ruteLengde);
  if (doning.rute.x < 0 || doning.rute.y< 0) {
    console.log("FEIL FEIL FEIL - rutnenummer er for lågt");
    return;
  }

  if (tmpRute.x !== doning.rute.x || tmpRute.y !== doning.rute.y){
    if (
      landskap["x" + doning.rute.x+ "y" + doning.rute.y].navn !==
      landskap["x" + tmpRute[0] + "y" + tmpRute.x].navn
    ) {
      flagg.nyRute = true;
      flagg.nyRutetype = true;
    } else {
      flagg.nyRute = true;
    }
  } else {
    return false;
  }
}

//====================================================== nyRetningDoning ======================================================================
function nyRetningDoning(sving) {
  if (krasjITilhengerTest() === "krasj") {
    return;
  } // ikkje sving om du krasje i tilhengaren

  doning.retnig.tmp = doning.retnig.aktiv;
  //sjekk om redskap er aktivert
  let tmpSving = doning.sving.fart === "fart" ? Math.abs(doning.fart.aktiv) * 0.6 : doning.sving.fart; // bruk fast sving fart eller fart som svingfart
  if (doning.redskap.fram !== null && doning.redskap.fram.arbeid.aktiv) {
    // bruk redskap i arbeid svingfart om redskap er aktivert
    tmpSving = doning.redskap.fram.sving.fart;
  }
  if (doning.redskap.bak !== null && doning.redskap.bak.arbeid.aktiv) {
    tmpSving = tmpSving > doning.redskap.bak.sving.fart ? doning.redskap.bak.sving.fart : tmpSving; // overskriv frarten om denne farten er mindre
  }

  //## Ny retning doning
  if (sving === "venstre") {
    doning.retnig.tmp -= tmpSving;
    if (doning.retnig.aktiv < 0) {
      doning.retnig.tmp += 360;
    }
  } else if (sving === "hogre") {
    doning.retnig.tmp += tmpSving;
    if (doning.retnig.aktiv > 359) {
      doning.retnig.tmp -= 360;
    }
  }
}

//====================================================== ny Posisjon Doining og posisjon + retning redskap======================================================================
function nyPosisjonDoningOgRedskap() {
  // ny posiajonn doning
  let fart = oppdaterFart("hentFart", 0);
  doning.rmidt.fx =
    -fart * Math.cos((Math.PI / 180) * doning.retnig.tmp);
  doning.rmidt.fy =
    -fart * Math.sin((Math.PI / 180) * doning.retnig.tmp);
  doning.tmp.pos.px = [
    doning.pos.midt.x - doning.rmidt.fx,
    doning.pos.midt.y - doning.rmidt.fy,
  ]; //Må ver sånn

  // finn hjørene og krok punkt doning
  oppdaterTingPoisjonar(doning, doning.tmp, "maskin");
  posRedskap(doning.redskap.fram, doning.pos.framKrok, doning.tmp.pos.framKrok);
  posRedskap(doning.redskap.bak, doning.pos.bakKrok, doning.tmp.pos.bakKrok);

  function posRedskap(denneRedskap, denneKrok, denneTmpKrok) {
    if (denneRedskap !== null) {
      // ny retning trepunkts redskap
      if (
        denneRedskap.type === "bakFeste" ||
        denneRedskap.type === "framFeste"
      ) {
        denneRedskap.tmp.pos.retning = doning.retnig.tmp;
      } else if (denneRedskap.type === "tilhengar") {
        //ny retning tilhenger redskap
        let xx = denneKrok.x - denneRedskap.pos.midt.x;
        let yy = denneKrok.y - denneRedskap.pos.midt.y;
        denneRedskap.tmp.pos.retning = (Math.atan2(yy, xx) * 180) / Math.PI; // gir ein vinkel frå 0 til 180 til -180 til -0
        if (denneRedskap.retning.tmp < 0) {
          denneRedskap.retning.tmp = 360 - denneRedskap.tmp.pos.retning * -1; // konverterer negatin vinkel til 180 -360
        }
      }

      if (
        denneRedskap.type === "bakFeste" ||
        denneRedskap.type === "framFeste"
      ) {
        // ny posisjon trepunkts redskap
        denneRedskap.pos.midt.x = denneTmpKrok.x;
        denneRedskap.pos.midt.y = denneTmpKrok.y;
      } else if (doning.redskap.bak.type === "tilhengar") {
        //ny posisjon tilhenger redskap
        denneRedskap.tmp.pos.midt.x =
          denneTmpKrok.x +
          denneRedskap.bilde.pxFram *
            -1 *
            Math.cos((Math.PI / 180) * denneRedskap.tmp.pos.retning); // + (Math.sin(Math.PI / 180 * doning.redskap.tmp.retning));
        denneRedskap.tmp.pos.midt.y =
          denneTmpKrok[1] +
          denneRedskap.bilde.pxFram *
            -1 *
            Math.sin((Math.PI / 180) * denneRedskap.tmp.pos.retning); // + (-1 * Math.cos(Math.PI / 180 * doning.redskap.tmp.retning));
      }

      // finn hjørene og krok punkt redskap
      oppdaterTingPoisjonar(denneRedskap, denneRedskap.tmp, "maskin");
    }
  }
}

//====================================================== oppdaterRuterTilSjekk ======================================================================
function oppdaterRuterTilSjekk() {
  aktiv.rute = [];
  for (let t = 1; t < maskinar.liste.length; t++) {
    sjekkRute(maskinar[maskinar.liste[t]]);
  }
  for (let t = 0; t < ting.liste.length; t++) {
    sjekkRute(ting[ting.liste[t]]);
  }
  for (let t = 1; t < landskap.hindring.length; t++) {
    sjekkRute(landskap[landskap.hindring[t]]);
  }
  function sjekkRute(tmpTing) {
    if (
      tmpTing.rute.x>= doning.rute.x- 3 &&
      tmpTing.rute.x<= doning.rute.x+ 3 &&
      tmpTing.rute.y>= doning.rute.y- 3 &&
      tmpTing.rute.y<= doning.rute.y+ 3
    ) {
      aktiv.rute.push(tmpTing);
    }
  }
  //console.log('Aktiv rute: ' + aktiv.rute);
}

//====================================================== krasjtest ======================================================================
//const sjekkAvstand = 40;

function krasjtest() {
  //------------------------------------------sjekk om doning krasjer i ting -------------------------------------------------------------
  for (let t = 0; t < aktiv.rute.length; t++) {
    let tmpTing = aktiv.rute[t];
    if (
      tmpTing !== doning && //ikkje sjekk mot seg sjølv
      (doning.redskap.fram === null || tmpTing !== doning.redskap.fram) && //ikkje sjekk mot redskap framme
      (doning.redskap.bak === null || tmpTing !== doning.redskap.bak) && //ikkje sjekk mot redskap bak
      tmpTing !== koblingskarantene.ting
    ) {
      // ikkje sjekk mot doning i karantene
      if (tingKrasjTest(doning.fart.aktiv, tmpTing) === "krasj") {
        return tmpTing;
      }
    }
  }
  return "ok";
}

//--------------------------------------------------- krasj i ting test -----------------------------------------
function tingKrasjTest(fart, tmpTing) {
  let A, B, C, D;
  if (fart > 0) {
    //kjøre fram, sjekk front
    if (doning.redskap.fram === null) {
      A = doning.pos.fv;
      B = doning.pos.fh;
    } else {
      A = doning.redskap.fram.pos.fv;
      B = doning.redskap.fram.pos.fh;
    }
  } else {
    //kjøre bak, sjekk bak
    if (doning.redskap.bak === null) {
      A = doning.pos.bv;
      B = doning.pos.bh;
    } else {
      A = doning.redskap.bak.pos.bv;
      B = doning.redskap.bak.pos.bh;
    }
  } //kjasj mot front?
  C = tmpTing.pos.fv;
  D = tmpTing.pos.fh;
  if (linjeSjekk(A, B, C, D)) {
    return "krasj";
  }
  //krasj mot bak?
  C = tmpTing.pos.bv;
  D = tmpTing.pos.bh;
  if (linjeSjekk(A, B, C, D)) {
    return "krasj";
  }
  // kjasj mot venstre?
  C = tmpTing.pos.fv;
  D = tmpTing.pos.bv;
  if (linjeSjekk(A, B, C, D)) {
    return "krasj";
  }
  //krasj mot hogre ?
  C = tmpTing.pos.fh;
  D = tmpTing.pos.bh;
  if (linjeSjekk(A, B, C, D)) {
    return "krasj";
  }

  // const M ={
  //   x: linjeKryss(A[0], B[0], t),
  //   y: linjeKryss(A[1], B[1], t)
  // }

  function linjeKryss(A, B, t) {
    return A + (B - A) * t;
  }
  function linjeSjekk(A, B, C, D) {
    const tTopp = (D[0] - C[0]) * (A[1] - C[1]) - (D[1] - C[1]) * (A[0] - C[0]);
    const uTopp = (C[1] - A[1]) * (A[0] - B[0]) - (C[0] - A[0]) * (A[1] - B[1]);
    const botn = (D[1] - C[1]) * (B[0] - A[0]) - (D[0] - C[0]) * (B[1] - A[1]);

    if (botn !== 0) {
      let t = tTopp / botn;
      let u = uTopp / botn;
      if (t >= 0 && t <= 1 && u >= 0 && u <= 1) {
        return true; //fant krasj
      }
    }
  }
}

//-------------------------------------------sjekk om traktor svinger for kraftig og krasjer i tilhenger--------------------------------------------
function krasjITilhengerTest() {
  if (doning.redskap.bak !== null && doning.redskap.bak.type === "tilhengar") {
    let aktuellRadius = Math.abs(
      doning.retnig.tmp - doning.redskap.bak.tmp.pos.retning
    );
    if (
      aktuellRadius > maksTilhengerSving &&
      aktuellRadius < 360 - maksTilhengerSving
    ) {
      return "krasj";
    }
  }
}

//====================================================== tein ======================================================================

function teinAlleMaskinar() {
  maskinar.ramme.height = skjerm.botn;
  maskinar.ramme.width = skjerm.hogre;
  if (doning.type === "bonde") {
    teinMaskin(maskinar[maskinar.liste[0]]);
  }
  for (let x = 1; x < maskinar.liste.length; x++) {
    teinMaskin(maskinar[maskinar.liste[x]]);
  }
}
function teinMaskin(denne) {
  if (document.getElementById(denne.navn) instanceof HTMLImageElement) {
    //sjekker at bilde er tilgjendelig
    // lage eit midpunkt ved omderiningspunktet på doning
    let midtpunkt = [];
    midtpunkt[0] = denne.pos.midt.x;
    midtpunkt[1] = denne.pos.midt.y;
    maskinar.lerret.translate(midtpunkt[0], midtpunkt[1]); //flytt fokus tilmidtpunkt
    maskinar.lerret.rotate((denne.pos.retning * Math.PI) / 180); //roter verden liks som doning
    maskinar.lerret.translate(midtpunkt[0] * -1, midtpunkt[1] * -1); //flytt fokus til start

    //teiner doning
    maskinar.lerret.drawImage(
      document.getElementById(denne.navn),
      denne.bilde.svingAnim * denne.bilde.bredde,
      denne.bilde.kjoreAnim * denne.bilde.hoyde, // velg utsnitt av doningtegning alt etter sving og animasjon
      denne.bilde.bredde,
      denne.bilde.hoyde, //bredde og høyde på utsnitt
      midtpunkt[0] - denne.bilde.pxBak,
      midtpunkt[1] - denne.bilde.pxV, //posisjon av tegning
      denne.bilde.pxFram + denne.bilde.pxBak,
      denne.bilde.pxV + denne.bilde.pxH
    ); // bredde og høyde på tegning
    maskinar.lerret.translate(midtpunkt[0], midtpunkt[1]); //flytt fokus tilmidtpunkt
    maskinar.lerret.rotate(((denne.pos.retning * Math.PI) / 180) * -1); // roter verden tilbake
    maskinar.lerret.translate(midtpunkt[0] * -1, midtpunkt[1] * -1); //flytt fokus til start

    oppdaterTingPoisjonar(denne, denne, "maskin");
  } else {
    console.error(denne.navn + " har ikkje bilde: " + denne.aktivBakgrunn);
  }
}
//====================================================== oppdaterTingPoisjonar ======================================================================

function oppdaterTingPoisjonar(denne, denneTmp, type) {
  //ikkje doning!!men denne
  let pxFram = type === "maskin" ? denne.bilde.pxFram : denne.pos.bredde / 2; // maskin eller ting?
  let pxBak = type === "maskin" ? denne.bilde.pxBak : denne.pos.bredde / 2; // maskin eller ting?
  let pxV = type === "maskin" ? denne.bilde.pxV : denne.pos.hoyde / 2; // maskin eller ting?
  let pxH = type === "maskin" ? denne.bilde.pxH : denne.pos.hoyde / 2; // maskin eller ting?

  denneTmp.pos.fv[0] =
    denneTmp.pos.midt.x +
    pxFram * Math.cos((Math.PI / 180) * denneTmp.pos.retning) +
    pxV * Math.sin((Math.PI / 180) * denneTmp.pos.retning);
  denneTmp.pos.fv[1] =
    denneTmp.pos.midt.y +
    pxFram * Math.sin((Math.PI / 180) * denneTmp.pos.retning) +
    pxV * -1 * Math.cos((Math.PI / 180) * denneTmp.pos.retning);
  denneTmp.pos.fh[0] =
    denneTmp.pos.midt.x +
    pxFram * Math.cos((Math.PI / 180) * denneTmp.pos.retning) +
    pxH * -1 * Math.sin((Math.PI / 180) * denneTmp.pos.retning);
  denneTmp.pos.fh[1] =
    denneTmp.pos.midt.y +
    pxFram * Math.sin((Math.PI / 180) * denneTmp.pos.retning) +
    pxH * Math.cos((Math.PI / 180) * denneTmp.pos.retning);
  denneTmp.pos.bh[0] =
    denneTmp.pos.midt.x +
    pxBak * -1 * Math.cos((Math.PI / 180) * denneTmp.pos.retning) +
    pxH * -1 * Math.sin((Math.PI / 180) * denneTmp.pos.retning);
  denneTmp.pos.bh[1] =
    denneTmp.pos.midt.y +
    pxBak * -1 * Math.sin((Math.PI / 180) * denneTmp.pos.retning) +
    pxH * Math.cos((Math.PI / 180) * denneTmp.pos.retning);
  denneTmp.pos.bv[0] =
    denneTmp.pos.midt.x +
    pxBak * -1 * Math.cos((Math.PI / 180) * denneTmp.pos.retning) +
    pxV * Math.sin((Math.PI / 180) * denneTmp.pos.retning);
  denneTmp.pos.bv[1] =
    denneTmp.pos.midt.y +
    pxBak * -1 * Math.sin((Math.PI / 180) * denneTmp.pos.retning) +
    pxV * -1 * Math.cos((Math.PI / 180) * denneTmp.pos.retning);
  if (type === "maskin") {
    denneTmp.pos.framKrok[0] =
      denneTmp.pos.midt.x +
      denne.bilde.pxFramKrok[0] *
        -1 *
        Math.cos((Math.PI / 180) * denneTmp.pos.retning) +
      denne.bilde.pxFramKrok[1] *
        Math.sin((Math.PI / 180) * denneTmp.pos.retning);
    denneTmp.pos.framKrok[1] =
      denneTmp.pos.midt.y +
      denne.bilde.pxFramKrok[0] *
        -1 *
        Math.sin((Math.PI / 180) * denneTmp.pos.retning) +
      denne.bilde.pxFramKrok[1] *
        -1 *
        Math.cos((Math.PI / 180) * denneTmp.pos.retning);
    denneTmp.pos.bakKrok[0] =
      denneTmp.pos.midt.x +
      denne.bilde.pxBakKrok[0] *
        -1 *
        Math.cos((Math.PI / 180) * denneTmp.pos.retning) +
      denne.bilde.pxBakKrok[1] *
        Math.sin((Math.PI / 180) * denneTmp.pos.retning);
    denneTmp.pos.bakKrok[1] =
      denneTmp.pos.midt.y +
      denne.bilde.pxBakKrok[0] *
        -1 *
        Math.sin((Math.PI / 180) * denneTmp.pos.retning) +
      denne.bilde.pxBakKrok[1] *
        -1 *
        Math.cos((Math.PI / 180) * denneTmp.pos.retning);
  }
}
//====================================================== lagreOppdaterTingPoisjonar ======================================================================

function lagreOppdaterteTingPosisjonar(denne, denneTmp) {
  denne.pos.retning = denneTmp.pos.retning;
  denne.pos.px = denneTmp.pos.px;
  denne.pos.fv = denneTmp.pos.fv;
  denne.pos.fh = denneTmp.pos.fh;
  denne.pos.bh = denneTmp.pos.bh;
  denne.pos.bv = denneTmp.pos.bv;
  denne.pos.framKrok = denneTmp.pos.framKrok;
  denne.pos.bakKrok = denneTmp.pos.bakKrok;

  ting.erEndra = true;
}

//====================================================== redskapKoblingSjekk ======================================================================

function redskapKoblingSjekk(denne) {
  //sjekker om doning kan koblast til redskap funkjson
  if (
    koblingskarantene.ting !== null ||
    denne.kjopt !== true ||
    (doning.arbeid.type !== "traktor" && doning.arbeid.type !== "skurtreskar")
  ) {
    return;
  }
  if (doning.redskap.fram === null && denne.type === "framFeste") {
    var dx = doning.pos.framKrok[0];
    var dy = doning.pos.framKrok[1];
    var rx = denne.pos.bakKrok[0];
    var ry = denne.pos.bakKrok[1];
    var aktivKrok = "fram";
  } else if (
    doning.redskap.bak === null &&
    (denne.type === "bakFeste" || denne.type === "tilhengar")
  ) {
    var dx = doning.pos.bakKrok[0];
    var dy = doning.pos.bakKrok[1];
    var rx = denne.pos.framKrok[0];
    var ry = denne.pos.framKrok[1];
    var aktivKrok = "bak";
  }
  //Visst redskap er på krokplass
  if (
    rx - hengerFesteMargin < dx &&
    rx + hengerFesteMargin > dx &&
    ry - hengerFesteMargin < dy &&
    ry + hengerFesteMargin > dy
  ) {
    //sjekker om redskap er på kroken til doning
    doning.redskap[aktivKrok] = denne; // kobler redsap på doning
    flagg.nyRedskap[aktivKrok] = true;
  } else if (denne === doning.klarTilKoblingRedskap[aktivKrok]) {
    doning.klarTilKoblingRedskap[aktivKrok] = null; //fjerner redskap frå klar til kobling
  }
}

//====================================================== redskapKobling ======================================================================

function redskapKobling(denne) {
  if (doning.redskap[denne] === null) {
    return;
  }
  //kobler AV redskap
  if (doning.redskap[denne].arbeid.aktiv) {
    aktiverRedskap(denne);
  }
  doning.redskap[denne].arbeid.aktiv = false;
  //oppdater rutenr til redskap
  doning.redskap[denne].rute.x= Math.floor(
    doning.redskap[denne].pos.midt.x / pixel.ruteLengde
  );
  doning.redskap[denne].rute.y= Math.floor(
    doning.redskap[denne].pos.midt.y / pixel.ruteLengde
  );

  koblingskarantene.sett(doning.redskap[denne]); // gjer at den ikkje kobler seg rett på igjen

  doning.redskap[denne] = null; //kobler av redskap

  flagg.nyRedskap[denne] = true;
}
//====================================================== aktiverRedskap ======================================================================
function aktiverRedskap(denne) {
  //deaktiver
  if (doning.redskap[denne] === null) {
    return;
  }
  if (doning.redskap[denne].arbeid.aktiv) {
    doning.redskap[denne].arbeid.aktiv = false;
    oppdaterLast(doning.redskap[denne], "stoppFylling", null); // stopper fylling i tilfelle den er aktiv
    //aktiver
  } else {
    doning.redskap[denne].arbeid.aktiv = true;
  }
  flagg.aktivertRedskap[denne] = true;
}
//====================================================== doningBytteSjekk ======================================================================
function doningBytteSjekk(denne) {
  if (
    koblingskarantene.ting !== denne &&
    doning.type === "bonde" &&
    denne.type === "doning" &&
    denne.kjopt
  ) {
    //går inn i doning
    maskinar["ting0"].pos.px[(0, 0)]; //fjerner bonde
    doning = denne;
    flagg.nyDoning = true;
  }
}
//====================================================== doningBytte ======================================================================
function utAvDoning() {
  if (doning !== maskinar["ting0"]) {
    koblingskarantene.sett(doning);
    maskinar["ting0"].pos.px = [
      doning.pos.midt.x +
        doning.bilde.pxDor[0] * Math.cos((Math.PI / 180) * doning.retnig.aktiv) +
        doning.bilde.pxDor[1] * Math.sin((Math.PI / 180) * doning.retnig.aktiv),
      doning.pos.midt.y +
        doning.bilde.pxDor[0] * Math.sin((Math.PI / 180) * doning.retnig.aktiv) +
        doning.bilde.pxDor[1] *
          -1 *
          Math.cos((Math.PI / 180) * doning.retnig.aktiv),
    ];
    let tmpFlytt = [
      maskinar["ting0"].pos.midt.x - doning.pos.midt.x,
      maskinar["ting0"].pos.midt.y - doning.pos.midt.y,
    ];
    doning = maskinar["ting0"];
    flyttKart(tmpFlytt);
    // flagg.nyDoning = true;
  }
}

koblingskarantene.sett = (denne) => {
  koblingskarantene.ting = denne;
  koblingskarantene.avstand = [0, 0];
};

koblingskarantene.sjekk = () => {
  if (koblingskarantene.ting === null) {
    return;
  }
  if (
    Math.abs(koblingskarantene.avstand[0]) > koblingsKaranteneMargin ||
    Math.abs(koblingskarantene.avstand[1]) > koblingsKaranteneMargin
  ) {
    koblingskarantene.ting = null;
    console.log("koblingskarantene nulla");
  }
};
