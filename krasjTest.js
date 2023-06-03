//====================================================== krasjtest ======================================================================
const sjekkAvstand = 40;

function krasjtest() {
  //------------------------------------------sjekk om doning kjører ut av kart-------------------------------------------------------------
  if (ting[aktiv.doning].posX < 2 || ting[aktiv.doning].posX > (pixel.ruterX - 3) || ting[aktiv.doning].posY < 2 || ting[aktiv.doning].posY > (pixel.ruterY - 3)) {
    if (kantKrasjTest(framBak, pixel.venstre, pixel.hogre, pixel.top, pixel.botn) === false) {
      return false;
    }
  }
  //------------------------------------------sjekk om doning krasjer i ting -------------------------------------------------------------
  for (t = 0; t < ting.liste.length; t++) {
    tmpTing = ting[ting.liste[t]].navn;
    if (tmpTing !== aktiv.doning && tmpTing !== ting[aktiv.doning].aktivRedskap) {// ikkje sjekk mot aktiv doning og redskap
      // grovsjekk avstand til ting her
      /*  if (Math.abs(ting[aktiv.doning].tmp.doning.pxX - ting[tmpTing].pxX) < sjekkAvstand && Math.abs(ting[aktiv.doning].tmp.doning.pxY - ting[tmpTing].pxY) < sjekkAvstand) {
          return false;
          // Lag nøye krasjtest til ting her---------------------------
        }*/

      console.log('Krasjtest av ting: ' + tmpTing);
      if ((tingKrasjTest(tmpTing)) === false) {
        return false;
      }
    }
  }
  return true;
}

//--------------------------------------------- kant av verden kjasj test ------------------------------------------
function kantKrasjTest( venstre, hogre, top, botn ) {
  if ( fart.aktiv > 0 ) {
    if (//Framover sjekk doning
      ting[aktiv.doning].tmp.doning.fvX < venstre || //sjekk om doning kjører utfor venstre
      ting[aktiv.doning].tmp.doning.fhX < venstre || //sjekk om doning kjører utfor venstre
      ting[aktiv.doning].tmp.doning.fvX > hogre || //sjekk om doning kjører utfor høgre
      ting[aktiv.doning].tmp.doning.fhX > hogre || //sjekk om doning kjører utfor høgre
      ting[aktiv.doning].tmp.doning.fvY < top || // //sjekk om doning kjører utfor topp
      ting[aktiv.doning].tmp.doning.fhY < top || // //sjekk om doning kjører utfor topp
      ting[aktiv.doning].tmp.doning.fvY > botn || //sjekk om doning kjører utfor botn
      ting[aktiv.doning].tmp.doning.fhY > botn //sjekk om doning kjører utfor botn
    ) {
      return false;
      console.log('krasj framover mot vegg');
    }
  } else if ( fart.aktiv < 0 ) {

    if (//bakover sjekk doning uten redskap
      ting[aktiv.doning].tmp.doning.bvX < venstre || //sjekk om doning kjører utfor venstre
      ting[aktiv.doning].tmp.doning.bhX < venstre || //sjekk om doning kjører utfor venstre
      ting[aktiv.doning].tmp.doning.bvX > hogre || //sjekk om doning kjører utfor høgre
      ting[aktiv.doning].tmp.doning.bhX > hogre || //sjekk om doning kjører utfor høgre
      ting[aktiv.doning].tmp.doning.bvY < top || // //sjekk om doning kjører utfor topp
      ting[aktiv.doning].tmp.doning.bhY < top || // //sjekk om doning kjører utfor topp
      ting[aktiv.doning].tmp.doning.bvY > botn || //sjekk om doning kjører utfor botn
      ting[aktiv.doning].tmp.doning.bhY > botn //sjekk om doning kjører utfor botn
    ) {
      return false;
      console.log('krasj vakover doning i vegg');
    }
    if (ting[aktiv.doning].aktivRedskap !== null) {
      if (// bakoversjekk redskap
        ting[aktiv.doning].tmp.redskap.bvX < venstre || //sjekk om doning kjører utfor venstre
        ting[aktiv.doning].tmp.redskap.bhX < venstre || //sjekk om doning kjører utfor venstre
        ting[aktiv.doning].tmp.redskap.bvX > hogre || //+ pixel.startX || //sjekk om doning kjører utfor høgre
        ting[aktiv.doning].tmp.redskap.bhX > hogre || //+ pixel.startX || //sjekk om doning kjører utfor høgre
        ting[aktiv.doning].tmp.redskap.bvY < top || // //sjekk om doning kjører utfor topp
        ting[aktiv.doning].tmp.redskap.bhY < top || // //sjekk om doning kjører utfor topp
        ting[aktiv.doning].tmp.redskap.bvY > botn || // + pixel.startY || //sjekk om doning kjører utfor botn
        ting[aktiv.doning].tmp.redskap.bhY > botn  // + pixel.startY //sjekk om doning kjører utfor botn
      ) {
        return false;
        console.log('krasj i vegg bakover redskap');
      }
    }
  }
  return true;
}

//--------------------------------------------------- krasj i ting test -----------------------------------------
function tingKrasjTest( denne ) {
  let A, B, C, D;
  if ( fart.aktiv < 0 ) {
    A = { x: ting[aktiv.doning].fvX, y: ting[aktiv.doning].fvY };
    B = { x: ting[aktiv.doning].fhX, y: ting[aktiv.doning].fhY };
  } else {
    if (aktiv.redskap === null) {
      A = { x: ting[aktiv.doning].bvX, y: ting[aktiv.doning].bvY };
      B = { x: ting[aktiv.doning].bhX, y: ting[aktiv.doning].bhY };
    } else {
      A = { x: ting[aktiv.redskap].bvX, y: ting[aktiv.redskap].bvY };
      B = { x: ting[aktiv.redskap].bhX, y: ting[aktiv.redskap].bhY };
    }
  }
  C = { x: ting[denne].fvX, y: ting[denne].fvY };
  D = { x: ting[denne].fhX, y: ting[denne].fhY };
  if (linjeSjekk(A, B, C, D)) { return false; }

  C = { x: ting[denne].bvX, y: ting[denne].bvY };
  D = { x: ting[denne].bhX, y: ting[denne].bhY };
  if (linjeSjekk(A, B, C, D)) { return false; }

  C = { x: ting[denne].fvX, y: ting[denne].fvY };
  D = { x: ting[denne].bvX, y: ting[denne].bvY };
  if (linjeSjekk(A, B, C, D)) { return false; }

  C = { x: ting[denne].fhX, y: ting[denne].fhY };
  D = { x: ting[denne].bhX, y: ting[denne].bhY };
  if (linjeSjekk(A, B, C, D)) { return false; }

  // const M ={
  //   x: linjeKryss(A.x, B.x, t),
  //   y: linjeKryss(A.y, B.y, t)
  // }

  function linjeKryss(A, B, t) {
    return A + (B - A) * t;
  }
  function linjeSjekk(A, B, C, D) {

    const tTopp = (D.x - C.x) * (A.y - C.y) - (D.y - C.y) * (A.x - C.x);
    const uTopp = (C.y - A.y) * (A.x - B.x) - (C.x - A.x) * (A.y - B.y);
    const botn = (D.y - C.y) * (B.x - A.x) - (D.x - C.x) * (B.y - A.y);

    if (botn !== 0) {
      let t = tTopp / botn;
      let u = uTopp / botn;
      if (t >= 0 && t <= 1 && u >= 0 && u <= 1) {
        console.log('b ' + linjeKryss(A.x, B.x, t));
        console.log('a ' + linjeKryss(A.y, B.y, t));
        console.log('avstand: ' + t);
        return true;
      }
    }
  }
}

//-------------------------------------------sjekk om traktor svinger for kraftig og krasjer i tilhenger--------------------------------------------
function krasjITilhengerTest() {
  var vD = ting[aktiv.doning].tmp.doning.retning;
  var vR = ting[aktiv.doning].tmp.redskap.retning;
  if (vD > vR) {
    if ((vD - vR) > tilhengerSvingradius && (vD - vR) < (360 - tilhengerSvingradius)) {
      return false;
    }
  } else {
    if ((vR - vD) > tilhengerSvingradius && (vR - vD) < (360 - tilhengerSvingradius)) {
      return false;
    }
  }
  return true;
}
