let flagg:Flagg[] = ['doningFlytta','tingFlytta'];
let tid = 0;
let kart:Kart;
let aktiv = { };
let krasjTingen:Maskin|Ting|'ok';
let doning:Kjoretoy;
let aktivSkjerm = { verden: true, butikk: false };

function start(){
  settStorrelse()
  kart = {...logginn()};
  peng = kart.startPeng;
  lagVerden(kart)
  styring();
  const styringsLoopId = setInterval(styringsloop, 10);
  bildeKontroller();
}

function logginn(){
  //logg inn eller velg nytt kart
  return kart1;
}
function lagVerden(kart:Kart) {
  lagVeksing();//må lagast før landskap
  lagLandskap(kart.landskap);
  oppdaterLandskap();
  kart.maskinar.forEach(denne => {
    lagMaskin(denne[0],denne[1],denne[2]);
  });
  kart.ting.forEach((denne) => {
    lagTing(denne[0],denne[1],denne[2]);
  });

  doning = maskinar[bonden] as Kjoretoy;
  nyPosisjonDoningOgRedskap()
  oppdaterPeng(0);
  oppdaterKnappar()
  oppdaterTopplinje()
}
//====================================================== system lokke
function styringsloop() {
  if (aktivSkjerm.verden) {
    bevegelse();
    sjekkOmKnapparErAktivert();
    oppdaterKnappar();
    sjekkFlagg();
   // autoLossing()
  }
}
function bevegelse() {
  //--------------------------------------------justering av fart
  if (knappar.fram.trykkAktivert) {
    oppdaterFart('framKnapp');
  } else if (knappar.bak.trykkAktivert) {
    oppdaterFart('bakKnapp');
  } else if (doning.fart.aktiv !== 0) {
    oppdaterFart('trill');
  }
  //--------------------------------------------oppdater sving
  if (knappar.venstre.trykkAktivert) {
    doning.sving.fram = 'venstre';
    doning.sving.bak = 'hogre';
    flagg.push('sving');
  } else if (knappar.hogre.trykkAktivert) {
    doning.sving.fram = 'hogre';
    doning.sving.bak = 'venstre';
    flagg.push('sving');
  } else {
    if (doning.sving.fram !== 'beint' || doning.sving.bak !== 'beint') { flagg.push('sving'); }
    doning.sving.fram = 'beint';
    doning.sving.bak = 'beint';
  }

  //-------- flytt doning,
  if(Math.abs(doning.fart.aktiv) > 0.2 ) {
    let framBak:'fram'|'bak' = doning.fart.aktiv > 0 ? 'fram':'bak';
    let krasjTing;
    lagFlyttePosTilDoning(framBak);
    if (framBak === 'bak' && krasjITilhengerTest() === "krasj") { return; }
    let svar = krasjtestDoning(doning, framBak);
  
    if (svar[0] === 'ok') { flyttDoning(); }
    if (svar[0] === 'krasj') { 
      krasjTingen = svar[1]; 
      if(doningBytteSjekk(krasjTingen as Kjoretoy)){return;}   //sjekk om bonde skal gå inn i doning
      if(redskapKoblingSjekk(krasjTingen as Redskap)){return;} 
      //--Flytting av Krasjting
      //flyttKrasjTingen(krasjTingen);
    }
  } else {
    // sjekk om doning kan svinge sjølv om den ikkje går framover
    if (doning.sving.fart !== 'fart' && doning.sving.fram !== 'beint') {
      nyRetningDoning(doning.sving.fram);
      oppdaterPoisjonar(doning, 'direkte');
      flagg.push('doningFlytta');
      flagg.push('sving');
    };
  }
}
//====================================================== flytting av krasjTing ======================================================================

/**
 * @description flytter ting som doning krasjer i like langt som doning flyttar seg.
 * @param {object} krasjTingen 
 *
function flyttKrasjTingen(krasjTingen) {
  let tilSjekk = [krasjTingen];
  let erFlytta = [];
  while(tilSjekk.length>0){
    erFlytta.push(tilSjekk[0]);
    let sjekk = sjekkOmDenneKrajse(erFlytta[0]);
    if( sjekk === 'stopp' ){ //Ikkje mulig å flytta på tingen, avbryt heile krasjen
      break; 
    }else if( sjekk === 'krasj'){// krasja, sjekk om neste ting kan flyttast
      tilSjekk.splice(0,1);//fjern frå sjekkelista
      continue;//sjekk neste
    }else if( sjekk === 'ok'){// flytta seg uten krasj, lagre heile kjedekolisjonen
      erFlytta.forEach(ting => {
        lagreOppdaterteTingPosisjonar(ting);
        flagg.push('doningFlytta','tingFlytta');
      });
    }

  }
  function sjekkOmDenneKrajse(krasjTingen:Maskin|Ting){
    if(krasjTingen.fart.tyngde === 1000){ return 'stopp';}//krajer i fast ting
    if(oppdaterFart('krasj', krasjTingen) ){ return 'stopp';}// friksjon stopper doning
    krasjTingen.pos.midt.x -= doning.pos.midt.fx* 1.1;
    krasjTingen.pos.midt.y -= doning.pos.midt.fy* 1.1;
    oppdaterPoisjonar(krasjTingen, 'tmp');
    let nyKrasjTing = krasjtestAndreTing(krasjTingen);
    if(nyKrasjTing[0] === 'krasj'){ 
      tilSjekk.push(nyKrasjTing[1]); //ved krajs legg krasjting i tilsjekk lista
      return 'krasj';
    } else if(nyKrasjTing[0] === 'ok'){
      return 'ok';
    }
  }
}*/
//====================================================== flagg 
function sjekkFlagg() {
  if (flagg.length === 0) return;
  let flaggTMP = flagg;
  flagg = [];

  if (flaggTMP.includes('teinMaskinar')) {
    teinAlleMaskinar();
  }
  if (flaggTMP.includes('teinTing')) {
    teinAlleTing();
  }
  if (flaggTMP.includes('doningFlytta')) {//Doning har fått ny posisjon, ingen krasj
    erDoningPaNyRute(doning);
    koblingskarantene('fjerning',doning)
    arbeidPaRute()
    sjekkOmLossing()
    flyttKart();
    aktiverDoningFunksjonane( 'doningFlytta' )
    teinAlleMaskinar();
  }
  if (flaggTMP.includes('sving')) {
    aktiverDoningFunksjonane( 'sving' )
  }
  if (flaggTMP.includes('nyRute')) {
    oppdaterRuterTilSjekk(doning);
    if(doning.last.leverer.includes('drivstoff')) { doning.last.laster.drivstoff.niva-- ; }
    flagg.push('topplinjeEndra');
  }
  if (flaggTMP.includes('nyRutetype')) {
    oppdaterRuterTilSjekk(doning);
    oppdaterFart('landskap');
  }
  if (flaggTMP.includes('nyDoning')) {
    oppdaterFart('landskap');
    oppdaterFart('arbeid');
    flagg.push('topplinjeEndra');
  }
  if (flaggTMP.includes('tingFlytta')) {
    teinAlleTing();
  }
  if (flaggTMP.includes('nyRedskapFram')) {
    oppdaterFart('arbeid');
    flagg.push('topplinjeEndra');
  }
  if (flaggTMP.includes('nyRedskapBak')) {
    oppdaterFart('arbeid');
    flagg.push('topplinjeEndra');
  }
  if (flaggTMP.includes('aktivertRedskapfram')) {
    oppdaterFart('arbeid');
    aktiverDoningFunksjonane('redskapFramAktivert')  
  }
  if (flaggTMP.includes('aktivertRedskapbak')) {
    oppdaterFart('arbeid');
    aktiverDoningFunksjonane('redskapBakAktivert')  
  }
  if (flaggTMP.includes('topplinjeEndra')) {
    oppdaterTopplinje()
  }
  if (flaggTMP.includes('kornLevering')) {
    aktiverDoningFunksjonane('kornLevering')  
  }
  if (flaggTMP.includes("drivstoffMottaking")) {
    aktiverDoningFunksjonane('drivstoffLevering')  
  }
  if (flaggTMP.includes('froLevering')) {
    aktiverDoningFunksjonane('froLevering')  
  }
  if (flaggTMP.includes('lastErEndra')) {
    flagg.push('topplinjeEndra');
    aktiverDoningFunksjonane('lastErEndra')  
  }
  if (flaggTMP.includes('lastAnimasjonLoop')) {
    aktiverDoningFunksjonane('lastAnimasjonLoop')  
  }
}
//===================================================== aktiverDoningFunksjonane
function aktiverDoningFunksjonane( flagg:string ) {
  aktiverDenneFunksjonane(flagg, doning);
  if(doning.redskap.fram !== null) {aktiverDenneFunksjonane(flagg, doning.redskap.fram); };
  if(doning.redskap.bak  !== null) {aktiverDenneFunksjonane(flagg, doning.redskap.bak); };
}
/**
 * @description Aktiverer eventuelle funksjonar i doning som har dette flagg
 */
function aktiverDenneFunksjonane(flagg:string, denne:Maskin|Ting, data?:any):void{
  if(denne.funksjonane[flagg]){
    denne.funksjonane[flagg](denne, data);
  }
}
//===================================================== velgSkjerm
function velgSkjerm(valgtSkjerm:'butikk'|'verden') {
  if (valgtSkjerm === 'butikk') {
    aktivSkjerm.verden = true;
    aktivSkjerm.butikk = false;
  }
  else if (valgtSkjerm === 'verden') {
    aktivSkjerm.butikk = true;
    aktivSkjerm.verden = false;
    oppdaterButikk();
  }
}

//------------------------------------------BILDE KONTROLLER


function bildeKontroller() {
  if (aktivSkjerm.verden) {

    ramme.skjerm.width = ramme.skjerm.offsetWidth;
    ramme.skjerm.height = ramme.skjerm.offsetHeight;

    lerret.skjerm.drawImage(ramme.topplinje, 0, 0, skjerm.bredde, skjerm.hoydeTopplinje, 0, 0, skjerm.bredde, skjerm.hoydeTopplinje);
    lerret.skjerm.drawImage(ramme.landskap, pixel.start.x, pixel.start.y, skjerm.bredde / zoom, skjerm.hoydeLandskap / zoom, 0, skjerm.hoydeTopplinje, skjerm.bredde, skjerm.hoydeLandskap);
    lerret.skjerm.drawImage(ramme.ting, pixel.start.x, pixel.start.y, skjerm.bredde / zoom, skjerm.hoydeLandskap / zoom, 0, skjerm.hoydeTopplinje, skjerm.bredde, skjerm.hoydeLandskap);
    lerret.skjerm.drawImage(ramme.maskinar, pixel.start.x, pixel.start.y, skjerm.bredde / zoom, skjerm.hoydeLandskap / zoom, 0, skjerm.hoydeTopplinje, skjerm.bredde, skjerm.hoydeLandskap);
    lerret.skjerm.drawImage(ramme.knappar, 0, 0, skjerm.bredde, skjerm.hoydeKnappar, 0, skjerm.startHoydeKnappar, skjerm.bredde, skjerm.hoydeKnappar);


  } else if (aktivSkjerm.butikk) {

  }
  requestAnimationFrame(bildeKontroller);
}

//====================================================== Zoom ======================================================================

//-------vassLoddRett--------returnerer 0 eller 90 basert på retning variabel
function vassLoddRett(retning:number) {
  if ((retning >= 0 && retning < 45) ||
    (retning > 135 && retning < 225) ||
    (retning > 315 && retning <= 360)) {
    return 0;
  } else {
    return 90;
  }
}
//====================================================== lerretStorleik ======================================================================
/*
function lerretStorleik(ramme:Rammer, topp:number, botn:number, venstre:number, hogre:number, bredde:number, hoyde:number) {
  ramme.style.position = 'absolute';
  if (topp !== null) { ramme.style.top = topp + 'px'; }
  if (botn !== null) { ramme.style.bottom = botn + 'px'; }
  if (venstre !== null) { ramme.style.left = venstre + 'px'; }
  if (hogre !== null) { ramme.style.right = hogre + 'px'; }
  if (bredde !== null) { ramme.style.width = bredde + 'px'; }
  if (hoyde !== null) { ramme.style.height = hoyde + 'px'; }
}
*/
function settStorrelse(){
  skjerm.bredde = Math.abs(document.body.getBoundingClientRect().width) + 1;
  skjerm.hoyde = Math.abs(document.body.getBoundingClientRect().height) + 1;
  skjerm.hoydeTopplinje = 40;
  skjerm.hoydeKnappar = (knappar.liste.length * knappar.str) < skjerm.bredde ? knappar.str + knappar.marg : 2 * (knappar.str + knappar.marg);
  skjerm.hoydeLandskap = skjerm.hoyde - skjerm.hoydeTopplinje - skjerm.hoydeKnappar;
  skjerm.startHoydeKnappar = skjerm.hoyde - skjerm.hoydeKnappar;
  skjerm.hoydeButikk = skjerm.hoyde - skjerm.hoydeTopplinje;
  skjerm.hogre = pixel.ruteLengde * pixel.ruter[0];
  skjerm.botn = pixel.ruteLengde * pixel.ruter[1];
}