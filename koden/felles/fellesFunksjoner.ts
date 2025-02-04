"use strict";


//====================================================== oppdaterFart ======================================================================

type oppdaterFartHendelsar = 'framKnapp'|"bakKnapp"|"trill"|"landskap"|"arbeid"|'krasj';
function oppdaterFart(hendelse:oppdaterFartHendelsar, krasjting?:Maskin|Ting) {
  //----justering av fart----
  if (hendelse === "framKnapp") {
    doning.fart.aktiv += doning.fart.aks;
  } else if (hendelse === "bakKnapp") {
    doning.fart.aktiv -= doning.fart.aks;
  } else if (hendelse === "trill") {
    if (Math.abs(doning.fart.aktiv) < (doning.fart.friksjon + doning.fart.krasj)) {
      doning.fart.aktiv = 0;
    } else if (doning.fart.aktiv > 0) {
      doning.fart.aktiv -= (doning.fart.friksjon + doning.fart.krasj);
    } else {
      doning.fart.aktiv += (doning.fart.friksjon + doning.fart.krasj);
    }
    //----oppdatering av fart----
  } else if (hendelse === "landskap") {//oppdater begrensing av toppfart pga landskap
    doning.fart.landskap = (landskap['x' + doning.rute.x + 'y' + doning.rute.y].fart);//friksjon fra landskap
  } else if (hendelse === "arbeid") {//oppdater begrensing av toppfart pga arbeid
    doning.fart.arbeid = 0;
    if (doning.redskap.fram !== null) { doning.fart.arbeid += doning.redskap.fram.arbeid.aktiv ? doning.redskap.fram.fart.arbeid : 0; }
    if (doning.redskap.bak !== null) { doning.fart.arbeid += doning.redskap.bak.arbeid.aktiv ? doning.redskap.bak.fart.arbeid : 0; }
  } else if(hendelse === 'krasj' && krasjting !== undefined){//oppdater friksjon pga krasj
    doning.fart.krasj +=  (krasjting.fart.tyngde / (doning.fart.tyngde + Math.abs(doning.fart.tyngde * doning.fart.aktiv)));
    console.log('krasj ' + (krasjting.fart.tyngde / doning.fart.tyngde) + ' - tyngde ' + (doning.fart.tyngde * doning.fart.aktiv));
    return (doning.fart.krasj >= doning.fart.aktiv + doning.fart.aks) ? true : false; //svarer true visst doning ikkje kan flytte seg
  }
  console.log('oppdater aktiv ' + doning.fart.aktiv + 'maks: '+ doning.fart.maks +' fart landskap: '+ doning.fart.landskap +' arb: ' + doning.fart.arbeid +' krasj: ' + doning.fart.krasj);

}

//====================================================== posisjon ======================================================================
/**
 * @param {object} denne maskin ellet ting som skal ha ny krasj punkt og rute pos
 * @param {string} lagrePlass 'tmp' eller 'direkte'
 */
function oppdaterPoisjonar(denne:Maskin|Ting, lagrePlass:'tmp'|'direkte') {
  //oppdater alle krasjpunkt
    if(lagrePlass === 'direkte'){    Object.keys(denne.krasj.punkt).forEach(punktet => { oppdaterPos(denne, denne.krasj.punkt[punktet]);    });
    }else if( lagrePlass === 'tmp'){ Object.keys(denne.krasj.punkt).forEach(punktet => { oppdaterTmpPos(denne, denne.krasj.punkt[punktet]); }); }
  // oppdater rute pos
  oppdaterRutePos(denne);
}

function oppdaterPos(denne:Maskin|Ting, punkt:PosisjonMal){
  punkt.x = denne.pos.midt.x +  (punkt.dx * Math.cos((Math.PI / 180) * denne.retning.tmp)) +  (punkt.dy * Math.sin((Math.PI / 180) * denne.retning.tmp));
  punkt.y = denne.pos.midt.y +  (punkt.dx * Math.sin((Math.PI / 180) * denne.retning.tmp)) +  (punkt.dy * Math.cos((Math.PI / 180) * denne.retning.tmp)); 
}
function oppdaterTmpPos(denne:Maskin|Ting, punkt:PosisjonMal){
  punkt.tx = denne.pos.midt.x +  (punkt.dx * Math.cos((Math.PI / 180) * denne.retning.tmp)) +  (punkt.dy * Math.sin((Math.PI / 180) * denne.retning.tmp));
  punkt.ty = denne.pos.midt.y +  (punkt.dx * Math.sin((Math.PI / 180) * denne.retning.tmp)) +  (punkt.dy * Math.cos((Math.PI / 180) * denne.retning.tmp)); 
}
function lagreOppdaterteTingPosisjonar(denne:Maskin|Ting) {
  Object.keys(denne.krasj.punkt).forEach(punktet => { 
    denne.krasj.punkt[punktet].x = denne.krasj.punkt[punktet].tx; 
    denne.krasj.punkt[punktet].y = denne.krasj.punkt[punktet].ty; 
  });
  denne.retning.aktiv = denne.retning.tmp;
  denne.pos.midt.x = denne.pos.midt.tx;         
  denne.pos.midt.y = denne.pos.midt.ty;
  if(denne.type === 'ting'){return;} // ting har ikkje det som er under her
  denne.pos.dor.x = denne.pos.dor.tx;           
  denne.pos.dor.y = denne.pos.dor.ty;
  denne.pos.framKrok.x = denne.pos.framKrok.tx; 
  denne.pos.framKrok.y = denne.pos.framKrok.ty;
  denne.pos.bakKrok.x = denne.pos.bakKrok.tx;   
  denne.pos.bakKrok.y = denne.pos.bakKrok.ty;
}
function oppdaterRutePos(denne:Maskin|Ting) {
  denne.rute.x = Math.floor(denne.pos.midt.x / pixel.ruteLengde);
  denne.rute.y = Math.floor(denne.pos.midt.y / pixel.ruteLengde);
  if (denne.rute.x < 0 || denne.rute.y< 0) {
    console.log("FEIL FEIL FEIL - rutnenummer er for lågt");
    return;
  }
}
//====================================================== oppdaterRuterTilSjekk ======================================================================
function oppdaterRuterTilSjekk(denne:Maskin) {
  denne.rute.tilSjekk = [];
  for (let t = 1; t < maskinaListe.length; t++) {
    sjekkRute(maskinar[maskinaListe[t]]);
  }
  for (let t = 0; t < tingListe.length; t++) {
    sjekkRute(ting[tingListe[t]]);
  }
  function sjekkRute(tmpTing:Maskin|Ting) {
    if (erInnaforSjekk(doning.rute, tmpTing.rute, 3)) { denne.rute.tilSjekk.push(tmpTing); }
  }
}
//--------------------------------------------------- krasj i ting test -----------------------------------------
/*
 function krasjtestAndreTing(tingA:Ting ):'ok'|['krasj',Ting] {
  for (let a = 0; a < tingA.rute.tilSjekk.length; a++) {
   if(krasjTest( tingA.rute.tilSjekk[a],tingA,tingB)[0] === 'krasj') { return ['krasj', tingB];}
  }
  return "ok";
}
*/
//gå jøna alle krasjsider på doning og redskap

function krasjTest(tingASide:PosisjonMal[][], tingB:KrasjMal){
  let A:PosisjonMal, B:PosisjonMal, C:PosisjonMal, D:PosisjonMal;
  for(let side=0; side < tingASide.length; side++){
    A = tingASide[side][0];
    B = tingASide[side][1];
    let tmpAlleSider: PosisjonMal[][] = [];
    if(tingB.framSider.length > 0  ){ tingB.framSider.forEach(sideX => {tmpAlleSider.push(sideX)} )}
    if(tingB.bakSider.length > 0   ){ tingB.bakSider.forEach(sideX => {tmpAlleSider.push(sideX)} )} 
    if(tingB.andreSider.length > 0 ){ tingB.andreSider.forEach(sideX => {tmpAlleSider.push(sideX)} )}
    if(tmpAlleSider.length === 0){ return ['ok'];}
    for ( let side in tmpAlleSider) {
        C = tmpAlleSider[side][0];
        D = tmpAlleSider[side][1];
        if (linjeSjekk(A, B, C, D)) { 
          return ['krasj'];
        } 
    }
  } // Dette er noko smart som eg ikkje huske heilt. const M ={ x: linjeKryss(A[0], B[0], t), y: linjeKryss(A[1], B[1], t)  }    function linjeKryss(A, B, t) { return A + (B - A) * t; }
  return ['ok'];
} 

function linjeSjekk(A:{x:number, y:number}, B:{x:number, y:number}, C:{x:number, y:number}, D:{x:number, y:number}) {
  const tTopp = (D.x - C.x) * (A.y - C.y) - (D.y - C.y) * (A.x - C.x);
  const uTopp = (C.y - A.y) * (A.x - B.x) - (C.x - A.x) * (A.y - B.y);
  const botn = (D.y - C.y) * (B.x - A.x) - (D.x - C.x) * (B.y - A.y);

  if (botn !== 0) {
    let t = tTopp / botn;
    let u = uTopp / botn;
    if (t >= 0 && t <= 1 && u >= 0 && u <= 1) {
      return true; //fant krasj
    } 
  } 
}
//====================================================== arbeid ======================================================================
//Sjekker om arbeidspunkt på redskap skal gjere noko
//Type 1 er basisoppgåva, slå ploge osv.
//Type 2 er om det skal leggas igjen gras osv på ei rute, den gjer då type 1 oppgava i tilleg til type2 om det er samla nok gras osv, visst ikkje gjer den type 1
function arbeidPaRute() {
  if (doning.fart.aktiv < 0) {//Jobbe bare framover
    return;
  }
  if (doning.redskap.fram !== null && doning.redskap.fram.arbeid.aktiv) {//Sjekk om redskap er på
    sjekkOmRedskapArbeide(doning.redskap.fram);
  }
  if (doning.redskap.bak !== null && doning.redskap.bak.arbeid.aktiv) {//Sjekk om redskap er på
    sjekkOmRedskapArbeide(doning.redskap.bak);
  }
  function sjekkOmRedskapArbeide(denne:Redskap) {
    denne.arbeid.punkt.forEach(punkt => {
      let jordeBit = finnRuteSomArbeidspunktJobbePa(denne, punkt);
      if(!sjekkOmRuteOgArbeidStemmer(jordeBit, denne.arbeid.type)){return;}
       lagNyRuteTypeVisstDetErPlassILass(denne, jordeBit, denne.arbeid.type1!)      
      if (punkt.type === 'type2'){
        lagNyRuteTypeVisstDetErPlassILass(denne, jordeBit, denne.arbeid.type2!)
       }
    });
  }
}
function finnRuteSomArbeidspunktJobbePa(denne:Maskin|Ting, punkt:ArbeidsPunktMal):JordeVeks {
  let jordeBit = { pos: { x: 0, y: 0 }, rute: { x: 0, y: 0 }, tmp: jorde['x1y1'] };
  jordeBit.pos.x = denne.pos.midt.x - (punkt.x * Math.cos(Math.PI / 180 * denne.retning.aktiv)) + (punkt.y * Math.sin(Math.PI / 180 * denne.retning.aktiv));
  jordeBit.pos.y = denne.pos.midt.y - (punkt.x * Math.sin(Math.PI / 180 * denne.retning.aktiv)) + (punkt.y * -1 * Math.cos(Math.PI / 180 * denne.retning.aktiv));
  jordeBit.rute.x = Math.floor(jordeBit.pos.x / (pixel.ruteLengde / orginalJorde.antallJordeRuter));
  jordeBit.rute.y = Math.floor(jordeBit.pos.y / (pixel.ruteLengde / orginalJorde.antallJordeRuter));
  jordeBit.tmp = jorde['x' + jordeBit.rute.x + 'y' + jordeBit.rute.y];
  return jordeBit.tmp as JordeVeks;
}

function sjekkOmRuteOgArbeidStemmer (jordeBit:JordeVeks, arbeidstype:ArbeidsTypar):boolean{
  if (jordeBit === undefined){return false;}
  if (jordeBit.arbeid.aktivertAv.includes(arbeidstype)) {return true;}//sjekk at redskap er på rett type jorde
  else{ return false;}
}
function lagNyRuteTypeVisstDetErPlassILass(denne: Maskin|Ting, jordeBit:JordeVeks,arbeidsType:ArbeidsTypeMal){
  if (arbeidsType.last.type === null || sjekkOmPlass(denne, arbeidsType.last.type, -arbeidsType.last.mengde) ){
      nyJordeSort(jordeBit, arbeidsType.blirTil, denne.retning.aktiv);//vassLoddRett(denne.retning.aktiv));
}
}
function erInnaforSjekk (tingPos:PosisjonMidtMal|Rute, plassPos:PosisjonMidtMal|Rute, margin:number){

  if(tingPos.x >= plassPos.x- margin &&
     tingPos.x <= plassPos.x+ margin &&
     tingPos.y >= plassPos.y- margin &&
     tingPos.y <= plassPos.y+ margin){
    return true;
  } else{
    return false;
  }
}