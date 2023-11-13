"use strict";

let flagg = {
  doningFlytta:true,
  nyRute:false, 
  nyRutetype:false, 
  nyDoning:false, 
  nyTing:true,
  nyRedskap: {fram: false, bak: false}, 
  aktivertRedskap: {fram: false, bak: false},
//  nyLast:{ fram:false,bak:false},
  animasjon:false,
  topplinjeEndra: false
  }

let tid = 0;
let maskinar = { ramme: document.createElement('canvas'), liste: [] };
maskinar.lerret = maskinar.ramme.getContext("2d");
let doning = {};
let aktiv = { rute: [] };
let krasjTingen = '';
let krasjRetning = '';
console.log('H23');
let aktivSkjerm = { verden: true, butikk: false };

skjerm.bredde = Math.abs(document.body.getBoundingClientRect().width)+1;
skjerm.hoyde = Math.abs(document.body.getBoundingClientRect().height)+1;
skjerm.hoydeTopplinje = 40;
skjerm.hoydeKnappar = (knappar.liste.length * knappar.str) < skjerm.bredde ? knappar.str + knappar.marg : 2 * (knappar.str + knappar.marg);
skjerm.hoydeLandskap = skjerm.hoyde - skjerm.hoydeTopplinje - skjerm.hoydeKnappar;
skjerm.startHoydeKnappar = skjerm.hoyde - skjerm.hoydeKnappar;
skjerm.hoydeButikk = skjerm.hoyde - skjerm.hoydeTopplinje;
skjerm.hogre = pixel.ruteLengde * pixel.ruter[0];
skjerm.botn = pixel.ruteLengde * pixel.ruter[1];

function lagVerden() {
  lagVeksing();//må lagast før landskap
  lagLandskap();
  oppdaterLandskap();
  lagMaskin('bonde');
  doning = maskinar['ting0'];
  nyPosisjonDoningOgRedskap()
  oppdaterPeng(0);
  lagButikk();
  oppdaterKnappar()
  oppdaterTopplinje()
  styring();
  const styringsLoopId = setInterval(styringsloop, 10);
  bildeKontroller();
}
//====================================================== system lokke ======================================================================
function styringsloop() {
  if (aktivSkjerm.verden) {
    koblingskarantene.sjekk();
    bevegelse();
    sjekkOmKnapparErAktivert();
    oppdaterKnappar();
    sjekkFlagg();
  }
}
function bevegelse() {
  //--------------------------------------------justering av fart-----------------------------------------
  if (knappar.fram.trykkAktivet) {
    oppdaterFart('framKnapp', null);
  } else if (knappar.bak.trykkAktivet) {
    oppdaterFart('bakKnapp', null);
  } else if (doning.fart.aktiv !== 0) {
    oppdaterFart('trill', null);
  }
  //--------------------------------------------oppdater sving--------------------------------------------
  if (knappar.venstre.trykkAktivet) {
    doning.sving.fram = 'venstre';
    doning.sving.bak = 'hogre';
    flagg.animasjon = true;
  } else if (knappar.hogre.trykkAktivet) {
    doning.sving.fram = 'hogre';
    doning.sving.bak = 'venstre';
    flagg.animasjon = true;
  } else {
    if(doning.sving.fram !== 'beint' || doning.sving.bak !== 'beint'){ flagg.animasjon = true; }
    doning.sving.fram = 'beint';
    doning.sving.bak = 'beint';
  }

  //-------- flytt doning,
  if ((knappar.fram.trykkAktivet || knappar.bak.trykkAktivet || Math.abs(doning.fart.aktiv) < 0.2)) {
    if (knappar.fram.trykkAktivet || doning.fart.aktiv > 0) {
      krasjTingen = kanDoningFlyttast(doning.sving.fram);
      krasjRetning = 'fram';
    } else if (knappar.bak.trykkAktivet || doning.fart.aktiv < 0) {
      krasjTingen = kanDoningFlyttast(doning.sving.bak);
      krasjRetning = 'bak';
    }
    if (krasjTingen === 'ok') {
      flyttDoning();
    } else { //visst doning krasja
      doningBytteSjekk(krasjTingen);      // sjekk om bonde skal gå inn i doning
      redskapKoblingSjekk(krasjTingen);
      if (krasjTingen.navn === 'butikk') {
        velgSkjerm('butikk');
      }
    }
  } else {
    // sjekk om doning kan svinge sjølv om den ikkje går framover
    if (doning.sving.fart !== 'fart' && doning.sving.fram !== 'beint') {
      nyRetningDoning(doning.sving.fram);
      oppdaterTingPoisjonar(doning, doning.tmp, 'maskin');
      lagreOppdaterteTingPosisjonar(doning, doning.tmp);
    };
  }
}
//====================================================== flagg =================================================================
function sjekkFlagg() {
  if(flagg.animasjon){
    oppdaterSvingAnimasjon()
    teinAlleMaskinar(); 
    flagg.animasjon = false;
  }
  if(flagg.doningFlytta) {
  erDoningPaNyRute();
  oppdaterAnimasjon(doning);
  oppdaterAnimasjon(doning.redskap.fram);
  oppdaterAnimasjon(doning.redskap.bak);
  arbeidPaRute()
  flyttKart(doning.pos.midt.fx, doning.pos.midt.fy);
  koblingskarantene.avstand[0] += doning.pos.fx;
  koblingskarantene.avstand[1] += doning.pos.fy;
  teinAlleMaskinar(); 
  flagg.doningFlytta = false;
  }
  if(flagg.nyRute) {
    oppdaterDrivstoff("bruk");
    oppdaterRuterTilSjekk();
    flagg.nyRute = false;
  } 
  if(flagg.nyRutetype) {
    oppdaterRuterTilSjekk();
    console.log('H136');
    oppdaterFart();
    flagg.nyRutetype = false;
  }

if(flagg.nyDoning) {
  oppdaterFart();
    flagg.nyDoning = false;
  }
if(flagg.nyTing) {
   teinAlleTing();
    flagg.nyTing = false;
  }  

  if(flagg.nyRedskap.fram) {
    oppdaterFart('arbeid');
    flagg.nyRedskap.fram = false;
  } 
  if(flagg.nyRedskap.bak) {
    oppdaterFart('arbeid');
    flagg.nyRedskap.bak = false;
  } 
  if(flagg.aktivertRedskap.fram) {
    oppdaterFart('arbeid');
    flagg.aktivertRedskap.fram = false;
  } 
  if(flagg.aktivertRedskap.bak) {
    oppdaterFart('arbeid');
    flagg.aktivertRedskap.bak = false;
  }
  //if(flagg.nyLast.fram) {
  //  flagg.nyLast.fram = false;
  //}
  //if(flagg.nyLast.bak) {
  //  flagg.nyLast.bak = false;
  //}
  if(flagg.topplinjeEndra) {
    oppdaterTopplinje()
    flagg.topplinjeEndra = false;
  }
  if(flagg.nyJorde) {

    flagg.nyJorde = false;
  }
}
//===================================================== velgSkjerm =================================================================
function velgSkjerm(valgtSkjerm) {
  if (valgtSkjerm === 'butikk') {
    aktivSkjerm.verden = true;
    aktivSkjerm.butikk = false;
  }
  else if (valgtSkjerm === 'verden') {
    aktivSkjerm.butikk = true;
    aktivSkjerm.verden = false;
    oppdaterButikk();
    butikkStyring();
  }
}

//------------------------------------------BILDE KONTROLLER---------------------------
skjerm.ramme = document.getElementById('skjermID');
skjerm.lerret = skjerm.ramme.getContext('2d');

function bildeKontroller() {
  if (aktivSkjerm.verden) {
    
    skjerm.ramme.width = skjerm.ramme.offsetWidth;
    skjerm.ramme.height = skjerm.ramme.offsetHeight;
  
    skjerm.lerret.drawImage( topplinje.ramme, 0, 0, skjerm.bredde, skjerm.hoydeTopplinje, 0, 0, skjerm.bredde, skjerm.hoydeTopplinje );
    skjerm.lerret.drawImage( landskap.ramme, pixel.start.x, pixel.start.y, skjerm.bredde/zoom, skjerm.hoydeLandskap/zoom, 0, skjerm.hoydeTopplinje, skjerm.bredde, skjerm.hoydeLandskap );
    skjerm.lerret.drawImage( ting.ramme,     pixel.start.x, pixel.start.y, skjerm.bredde/zoom, skjerm.hoydeLandskap/zoom, 0, skjerm.hoydeTopplinje, skjerm.bredde, skjerm.hoydeLandskap );
    skjerm.lerret.drawImage( maskinar.ramme, pixel.start.x, pixel.start.y, skjerm.bredde/zoom, skjerm.hoydeLandskap/zoom, 0, skjerm.hoydeTopplinje, skjerm.bredde, skjerm.hoydeLandskap );
    skjerm.lerret.drawImage( knappar.ramme,  0, 0, skjerm.bredde, skjerm.hoydeKnappar, 0, skjerm.startHoydeKnappar, skjerm.bredde, skjerm.hoydeKnappar );


  } else if (aktivSkjerm.butikk) {

  }
  requestAnimationFrame(bildeKontroller);
}


/* Plan
drive in butikk
- lage gjerde
- lage prisar
- fylle på butikk ved opning av butikk
- markere kjøpte ting
pløye osv jorde
- sjekke om er på rute
- sjekke om rett redskap og last
pløye retningsvis
- definere retning
gå inn og ut av traktor-OK
- knappar???
fylle redskap med frø osv
- auto fylling??
- av fylling?
- flytting av frø
kjøpe meir land
hyre arbeidar
- knapp???
- animasjon
- pris
bygge bygg
- plasserng
- butikk
- animasjon
- bilde
drive med dyr
- bygg?
- kva dyr
- kor kjøpe
- foring??
dyrke
hogge skog?
- kva maskin
. animasjon
bedre grafikk
bedre animasjon på hjul
*/