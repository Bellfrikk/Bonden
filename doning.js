const orginalTing = [//navner navn på bilde, x/y er plassering på garden, pixelbredde/høyde er utsnitt i tegning, høyde og bredde er ca 3 ganger pixel
  //{ navn: 'bonde',        arbeid: 'bonde', type: 'doning', x: 1, y: 9,  krokX: 0,  krokY: 0, pixelBredde: 24, pixelHoyde: 13, bildeBak: 80, bildeFram: 0,  bildeVenstre: 330 bildeHogre: 315 maksAnimasj30: 0, fart: 1, fartArbeid: null, drivstoffMaks: null, lastMaks:null }, // bonde
  { navn: 'traktor0', arbeid: 'traktor', type: 'doning', x: 2, y: 2, krokX: 20, krokY: 0, pixelBredde: 24, pixelHoyde: 14, bildeBak: 20, bildeFram: 60, bildeVenstre: 30, bildeHogre: 30, maksAnimasjon: 2, fart: 2, fartArbeid: null, drivstoffMaks: 300, lastMaks: null }, // traktor0
  //{ navn: 'skurtreskar0', arbeid: 'skurtreskar', type: 'doning', x: 0, y: 10, krokX: 0,  krokY: 0, pixelBredde: 24, pixelHoyde: 13, bildeBak: 80, bildeFram: 0,  bildeVenstre: 30, bildeHogre: 30, maksAnimasjon: 0, fart: 3, fartArbeid: null, drivstoffMaks: 500,  lastMaks:8 }, // skurtreskar0
  //{ navn: 'gravemaskin0', arbeid: 'gravemasin', type: 'doning', x: 3, y: 10, krokX: 0,  krokY: 0, pixelBredde: 24, pixelHoyde: 13, bildeBak: 80, bildeFram: 0,  bildeVenstre: 30, bildeHogre: 30, maksAnimasjon: 0, fart: 1, fartArbeid: null, drivstoffMaks: null, lastMaks:null } // gravemaskin0
  { navn: 'ballemaskin0', arbeid: 'ballemaskin', type: 'tilhengar', x: 5, y: 5, krokX: -60, krokY: 0, pixelBredde: 19, pixelHoyde: 14, bildeBak: 20, bildeFram: 60, bildeVenstre: 30, bildeHogre: 30, maksAnimasjon: 11, fart: -0.2, fartArbeid: -0.7, drivstoffMaks: null, lastMaks: 3 }, // ballemaskin0 
  { navn: 'plog0', arbeid: 'plog', type: 'trepunktFeste', x: 1, y: 6, krokX: 0, krokY: 0, pixelBredde: 19, pixelHoyde: 10, bildeBak: 57, bildeFram: 0, bildeVenstre: 20, bildeHogre: 20, maksAnimasjon: 0, fart: -0.1, fartArbeid: -1, drivstoffMaks: null, lastMaks: null }, // plog0 
  { navn: 'samaskin0', arbeid: 'samaskin', type: 'trepunktFeste', x: 1, y: 7, krokX: 0, krokY: 0, pixelBredde: 12, pixelHoyde: 18, bildeBak: 36, bildeFram: 0, bildeVenstre: 30, bildeHogre: 30, maksAnimasjon: 2, fart: -0.1, fartArbeid: -0.5, drivstoffMaks: null, lastMaks: 7 }, // samaskin0 
  { navn: 'froSekkGras', arbeid: null, type: null, x: 19, y: 7, krokX: 0, krokY: 0, pixelBredde: 14, pixelHoyde: 20, bildeBak: 10, bildeFram: 10, bildeVenstre: 7, bildeHogre: 7, maksAnimasjon: null, fart: null, fartArbeid: null, drivstoffMaks: null, lastMaks: 2 }, // før sekk Gras
  { navn: 'froSekkKorn', arbeid: null, type: null, x: 19, y: 9, krokX: 0, krokY: 0, pixelBredde: 14, pixelHoyde: 20, bildeBak: 10, bildeFram: 10, bildeVenstre: 7, bildeHogre: 7, maksAnimasjon: null, fart: null, fartArbeid: null, drivstoffMaks: null, lastMaks: 2 }, // før sekk Korn
];

const hengerFesteMargin = 10;
const tilhengerSvingradius = 50;
const korSjapptDoningenSvinge = 1;

//𝗻𝘆 𝘁𝗶𝗻𝗴⁡​
function nyTing(x) {
  this.navn = orginalTing[x].navn;
  this.type = orginalTing[x].type;
  this.posX = orginalTing[x].x;//posisjon i sjakksystem
  this.posY = orginalTing[x].y;
  this.pxX = this.posX * pixel.ruteLengde;//posisjon i pixel
  this.pxY = this.posY * pixel.ruteLengde;
  this.aktivRute = "landskap" + (this.posX + 100) + this.posY;
  this.bildeBak = orginalTing[x].bildeBak;
  this.bildeFram = orginalTing[x].bildeFram;
  this.bildeVenstre = orginalTing[x].bildeVenstre;
  this.bildeHogre = orginalTing[x].bildeHogre;
  this.pixelBredde = orginalTing[x].pixelBredde;
  this.pixelHoyde = orginalTing[x].pixelHoyde;
  this.krokX = orginalTing[x].krokX;
  this.krokY = orginalTing[x].krokY;
  this.henger = orginalTing[x].henger;
  this.arbeid = orginalTing[x].arbeid;
  this.drivstoffMaks = orginalTing[x].drivstoffMaks;
  this.drivstoff = orginalTing[x].drivstoffMaks / 2;
  this.lastMaks = orginalTing[x].lastMaks;
  this.last = this.lastMaks;
  this.lastType = null;
  this.bildePosXsving = 0;
  this.bildePosYanimasjon = 0;
  this.animasjonForsinkelse = 0;
  this.maksAnimasjon = orginalTing[x].maksAnimasjon;
  this.retning = 0;
  this.fart = orginalTing[x].fart;
  this.fartArbeid = orginalTing[x].fartArbeid;
  this.synlig = true;
  this.kjore = 0;//kan vær -1, 0, 1
  this.aktivBakgrunn = orginalTing[x].navn;
  this.aktivRedskap = null;
  this.klarTilKoblingRedskap = null;
  this.fvX = Number;
  this.fvY = Number;
  this.fhX = Number;
  this.fhY = Number;
  this.bhX = Number;
  this.bhY = Number;
  this.bvX = Number;
  this.bvY = Number;
  this.krX = Number;
  this.krY = Number;
  this.tmp = { doning: {}, redskap: {} };

  //𝗸𝗷𝗼𝗿𝗶𝗻𝗴⁡
  // ------------------------------------------ flytt funkjson-----------------------------------------------
  if (this.type === 'doning') {

    this.flytt = function flytt(framBak, sving, svingBilde) {
      nyRetningDoining(this, sving);
      if (this.kjøre !== 0) {
        nyPosisjonDoningOgRedskap(this, framBak);
        if ((ting[aktiv.doning].aktivRedskap !== null) && (ting[aktiv.redskap].type === 'tilhengar') && sving !== 'beint') {
          if (krasjITilhengerTest() !== true) {
            if (framBak === -1) {
              this.tmp.doning.retning = this.retning;
              nyPosisjonDoningOgRedskap(this, framBak);
            } else {

            }
          }
        }
      }
      const krasj = krasjtest(framBak);
      if (krasj) { lagreOppdaterteTingPosisjonar(this, this.tmp.doning); }
      if (krasj && this.aktivRedskap !== null) { lagreOppdaterteTingPosisjonar(ting[this.aktivRedskap], this.tmp.redskap); }
      if (krasj) { flyttKart(this); }
      if (this.aktivRedskap === null) { redskapKoblingSjekk(); }// Sjekker om doning kan koblast til redskap
      oppdaterAktivRute(this);// Oppdater aktiv rute 
      oppdaterAnimasjon(this, svingBilde, krasj, framBak);
    }
  }
  this.tein = function tein() {
    teinTing(this);
  }
}
//====================================================== flytting av kart ====================================================================== 
function flyttKart(denne) {   //flytt verden visst doning nærmar ser kanten
  if (!(denne.pxX < pixel.verdenX / 2 || denne.pxX > pixel.hogre - pixel.verdenX / 2)) { //doning nær kant, flytt bare doning
    pixel.startX -= denne.tmp.doning.flyttX;
  }
  if (!(denne.pxY < pixel.verdenY / 2 || denne.pxY > pixel.botn - pixel.verdenY / 2)) { //doning nær kant, flytt bare doning
    pixel.startY -= denne.tmp.doning.flyttY;
  }
}

//====================================================== oppdater animasjon ====================================================================== 

function oppdaterAnimasjon(denne, svingBilde, krasj, framBak) {
  denne.kjore = krasj ? framBak : 0; //oppdater kjøre status til animasjon
  // ------------------------------------------oppdater sving animasjon-------------------------------
  if (svingBilde === 'beint') {
    denne.bildePosXsving = 0;//0 betyr beint
  } else if (svingBilde === 'venstre') {
    denne.bildePosXsving = 1;// 1 betyr venstre
  } else if (svingBilde === 'hogre') {
    denne.bildePosXsving = 2;//2 betyr hørge      
  }
  //---------------------------------------------- hjul animasjon ----------------------------------
  if (denne.kjore !== 0) {//Roterer bildeanimasjon når doning kjøre 0 > 1 > 2
    denne.animasjonForsinkelse += denne.fart;
    if (denne.animasjonForsinkelse >= 10) {
      denne.bildePosYanimasjon -= framBak;
      if (denne.bildePosYanimasjon > denne.maksAnimasjon) {
        denne.bildePosYanimasjon = 0;
      } else if (denne.bildePosYanimasjon < 0) {
        denne.bildePosYanimasjon = denne.maksAnimasjon;
      }
      denne.animasjonForsinkelse = 0;
    }
  }
}

//====================================================== oppdater aktiv rute ====================================================================== 
function oppdaterAktivRute(denne) {
  denne.posX = Math.floor(denne.pxX / pixel.ruteLengde);
  denne.posY = Math.floor((denne.pxY - toppLinjeHoyde) / pixel.ruteLengde);
  denne.aktivRute = "landskap" + (denne.posX + 100) + denne.posY;
  if (denne.aktivRedskap !== null) {
    ting[denne.aktivRedskap].posX = Math.floor(ting[denne.aktivRedskap].pxX / pixel.ruteLengde);
    ting[denne.aktivRedskap].posY = Math.floor((ting[denne.aktivRedskap].pxY - toppLinjeHoyde) / pixel.ruteLengde);
    ting[denne.aktivRedskap].aktivRute = "landskap" + (ting[denne.aktivRedskap].posX + 100) + ting[denne.aktivRedskap].posY;
  }
}


//====================================================== nyRetningDoining ====================================================================== 
function nyRetningDoining(denne, sving) {
  denne.tmp.doning.retning = denne.retning;
  //## Ny retning doning
  if (sving !== null) {//endrer retning kun om retning parameret er satt
    if (sving === 'venstre') {
      if (denne.retning < 1) {
        denne.tmp.doning.retning = 359;
      } else {
        denne.tmp.doning.retning -= korSjapptDoningenSvinge;
      }
    } else if (sving === 'hogre') {
      if (denne.retning > 359) {
        denne.tmp.doning.retning = 0;
      } else {
        denne.tmp.doning.retning += korSjapptDoningenSvinge;
      }
    }
  }
}
//====================================================== ny Posisjon Doining og posisjon + retning redskap====================================================================== 
function nyPosisjonDoningOgRedskap(denne, framBak) {// ny posiajonn doning
  denne.tmp.doning.flyttX = (fart.aktiv * Math.cos(Math.PI / 180 * denne.tmp.doning.retning) * framBak);
  denne.tmp.doning.flyttY = (fart.aktiv * Math.sin(Math.PI / 180 * denne.tmp.doning.retning) * framBak);
  denne.tmp.doning.pxX = denne.pxX - denne.tmp.doning.flyttX;
  denne.tmp.doning.pxY = denne.pxY - denne.tmp.doning.flyttY;

  // finn hjørene og krok punkt doning
  oppdaterTingPoisjonar(denne, denne.tmp.doning)


  if (denne.aktivRedskap !== null) {// ny retning tepunkts redskap
    if (ting[denne.aktivRedskap].type === 'trepunktFeste') {
      denne.tmp.redskap.retning = denne.tmp.doning.retning;

    } else if (ting[denne.aktivRedskap].type === 'tilhengar') { //ny retning tilhenger redskap
      let xx = denne.tmp.doning.krX - ting[denne.aktivRedskap].pxX;
      let yy = denne.tmp.doning.krY - ting[denne.aktivRedskap].pxY;
      denne.tmp.redskap.retning = Math.atan2(yy, xx) * 180 / Math.PI;// gir ein vinkel frå 0 til 180 til -180 til -0
      if (denne.tmp.redskap.retning < 0) {
        denne.tmp.redskap.retning = 360 - denne.tmp.redskap.retning * -1;// konverterer negatin vinkel til 180 -360
      }
    }

    if (ting[denne.aktivRedskap].type === 'trepunktFeste') {// ny posisjon trepunkts redskap
      denne.tmp.redskap.pxX = denne.tmp.doning.krX;
      denne.tmp.redskap.pxY = denne.tmp.doning.krY;

    } else if (ting[denne.aktivRedskap].type === 'tilhengar') {//ny posisjon tilhenger redskap
      denne.tmp.redskap.pxX = denne.tmp.doning.krX + (ting[denne.aktivRedskap].bildeFram * -1 * Math.cos(Math.PI / 180 * denne.tmp.redskap.retning));// + (Math.sin(Math.PI / 180 * denne.tmp.redskap.retning)));
      denne.tmp.redskap.pxY = denne.tmp.doning.krY + (ting[denne.aktivRedskap].bildeFram * -1 * Math.sin(Math.PI / 180 * denne.tmp.redskap.retning));// + (-1 * Math.cos(Math.PI / 180 * denne.tmp.redskap.retning)));
    }

    // finn hjørene og krok punkt redskap
    oppdaterTingPoisjonar(denne, denne.tmp.redskap);
  }
}
//====================================================== tein ====================================================================== 
function teinTing(denne) {
  if (document.getElementById(denne.aktivBakgrunn) instanceof HTMLImageElement) {//sjekker at bilde er tilgjendelig
    // lage eit midpunkt ved omderiningspunktet på doning
    let midtpunktX = denne.pxX - pixel.startX;
    let midtpunktY = denne.pxY - pixel.startY;
    verden.translate(midtpunktX, midtpunktY);//flytt fokus tilmidtpunkt
    verden.rotate(denne.retning * Math.PI / 180);//roter verden liks som doning
    verden.translate(midtpunktX * -1, midtpunktY * -1);//flytt fokus til start


    //teiner doning
    verden.drawImage(document.getElementById(denne.aktivBakgrunn),
      denne.bildePosXsving * denne.pixelBredde, denne.bildePosYanimasjon * denne.pixelHoyde, // velg utsnitt av doningtegning alt etter sving og animasjon
      denne.pixelBredde, denne.pixelHoyde, //bredde og høyde på utsnitt
      midtpunktX - denne.bildeBak, midtpunktY - denne.bildeVenstre,//posisjon av tegning
      denne.bildeFram + denne.bildeBak, denne.bildeVenstre + denne.bildeHogre);// bredde og høyde på tegning
    verden.translate(midtpunktX, midtpunktY);//flytt fokus tilmidtpunkt
    verden.rotate(denne.retning * Math.PI / 180 * -1);// roter verden tilbake
    verden.translate(midtpunktX * -1, midtpunktY * -1);//flytt fokus til start


    oppdaterTingPoisjonar(denne, denne);


    //  verden.lineWidth = 2;//krasje ramme
    //  verden.strokeStyle = "#FFF";
    //  verden.beginPath();
    //  verden.moveTo(denne.fvX - pixel.startX, denne.fvY - pixel.startY);
    //  verden.lineTo(denne.fhX - pixel.startX, denne.fhY - pixel.startY);
    //  verden.strokeStyle = "red";
    //  verden.stroke();
    //  verden.beginPath();//midpunkt prikk
    //  verden.moveTo(denne.fhX - pixel.startX, denne.fhY - pixel.startY);
    //  verden.lineTo(denne.bhX - pixel.startX, denne.bhY - pixel.startY);
    //  verden.lineTo(denne.bvX - pixel.startX, denne.bvY - pixel.startY);
    //  verden.lineTo(denne.fvX - pixel.startX, denne.fvY - pixel.startY);
    //  verden.strokeStyle = "white";
    //  verden.stroke();
    //  verden.beginPath();//midpunkt prikk
    //  verden.strokeStyle = "black";
    //  verden.arc(denne.midtX - pixel.startX, denne.midtY - pixel.startY, 5, 0, 360);
    //  verden.stroke();
    //  verden.beginPath();//krokprikk
    //  verden.strokeStyle = "red";
    //  verden.arc(denne.krX - pixel.startX, denne.krY - pixel.startY, 3, 0, 360);
    //  verden.stroke();

  } else {
    console.error(denne.navn + ' har ikkje bilde: ' + denne.aktivBakgrunn);
  }
}


//====================================================== oppdaterTingPoisjonar ======================================================================

function oppdaterTingPoisjonar(denne, denneTmp) {
  denneTmp.fvX = denneTmp.pxX + (denne.bildeFram * Math.cos(Math.PI / 180 * denneTmp.retning)) + (denne.bildeVenstre * Math.sin(Math.PI / 180 * denneTmp.retning));
  denneTmp.fvY = denneTmp.pxY + (denne.bildeFram * Math.sin(Math.PI / 180 * denneTmp.retning)) + (denne.bildeVenstre * -1 * Math.cos(Math.PI / 180 * denneTmp.retning));
  denneTmp.fhX = denneTmp.pxX + (denne.bildeFram * Math.cos(Math.PI / 180 * denneTmp.retning)) + (denne.bildeHogre * -1 * Math.sin(Math.PI / 180 * denneTmp.retning));
  denneTmp.fhY = denneTmp.pxY + (denne.bildeFram * Math.sin(Math.PI / 180 * denneTmp.retning)) + (denne.bildeHogre * Math.cos(Math.PI / 180 * denneTmp.retning));
  denneTmp.bhX = denneTmp.pxX + (denne.bildeBak * -1 * Math.cos(Math.PI / 180 * denneTmp.retning)) + (denne.bildeHogre * -1 * Math.sin(Math.PI / 180 * denneTmp.retning));
  denneTmp.bhY = denneTmp.pxY + (denne.bildeBak * -1 * Math.sin(Math.PI / 180 * denneTmp.retning)) + (denne.bildeHogre * Math.cos(Math.PI / 180 * denneTmp.retning));
  denneTmp.bvX = denneTmp.pxX + (denne.bildeBak * -1 * Math.cos(Math.PI / 180 * denneTmp.retning)) + (denne.bildeVenstre * Math.sin(Math.PI / 180 * denneTmp.retning));
  denneTmp.bvY = denneTmp.pxY + (denne.bildeBak * -1 * Math.sin(Math.PI / 180 * denneTmp.retning)) + (denne.bildeVenstre * -1 * Math.cos(Math.PI / 180 * denneTmp.retning));
  denneTmp.krX = denneTmp.pxX + (denne.krokX * -1 * Math.cos(Math.PI / 180 * denneTmp.retning)) + (denne.krokY * Math.sin(Math.PI / 180 * denneTmp.retning));
  denneTmp.krY = denneTmp.pxY + (denne.krokX * -1 * Math.sin(Math.PI / 180 * denneTmp.retning)) + (denne.krokY * -1 * Math.cos(Math.PI / 180 * denneTmp.retning));
}
//====================================================== lagreOppdaterTingPoisjonar ======================================================================

function lagreOppdaterteTingPosisjonar(denne, denneTmp) {
  denne.retning = denneTmp.retning;
  denne.pxX = denneTmp.pxX;
  denne.pxY = denneTmp.pxY;
  denne.fvX = denneTmp.fvX;
  denne.fvY = denneTmp.fvY;
  denne.fhX = denneTmp.fhX;
  denne.fhY = denneTmp.fhY;
  denne.bhX = denneTmp.bhX;
  denne.bhY = denneTmp.bhY;
  denne.bvX = denneTmp.bvX;
  denne.bvY = denneTmp.bvY;
  denne.krX = denneTmp.krX;
  denne.krY = denneTmp.krY;
}


//====================================================== redskapKoblingSjekk ======================================================================

function redskapKoblingSjekk() {    //sjekker om doning kan koblast til redskap funkjson
  for (x = 0; x < ting.liste.length; x++) {
    if (ting[ting.liste[x]].type === 'trepunktFeste' || ting[ting.liste[x]].type === 'tilhengar') {
      var dx = ting[aktiv.doning].krX;
      var dy = ting[aktiv.doning].krY;
      var rx = ting[ting.liste[x]].krX;
      var ry = ting[ting.liste[x]].krY;
      //Visst redksap er på krokplass
      if (((rx - hengerFesteMargin < dx) && (rx + hengerFesteMargin > dx)) && ((ry - hengerFesteMargin < dy) && (ry + hengerFesteMargin > dy))) {//sjekker om redskap er på kroken til doning
        ting[aktiv.doning].klarTilKoblingRedskap = ting[ting.liste[x]].navn;//registrer denne redskap som klar til påkobling
        knapp('aktiver', 'redskapKoblingKnapp', 'redskapKobling()', null);
        //visst redskap ikkje er på krokplass
      } else if (ting[ting.liste[x]].navn === ting[aktiv.doning].klarTilKoblingRedskap) {
        ting[aktiv.doning].klarTilKoblingRedskap = null;//fjerner redskap frå klar til kobling
        knapp('deaktiver', 'redskapKoblingKnapp', null, null);
      }
    }
  }
}

//====================================================== redskapKobling ======================================================================

function redskapKobling() {
  //kobler AV redskap
  if (ting[aktiv.doning].aktivRedskap === ting[aktiv.doning].klarTilKoblingRedskap) {
    ting[aktiv.doning].aktivRedskap = null;
    aktiv.redskap = null;
    knapp('aktiver', 'redskapKoblingKnapp', null, false)
    oppdaterFart('redskap', 0);
    oppdaterFart('arbeid', 0);
    oppdaterLast('lastNivaAv')
  } else {
    //kobler PÅ redskap
    ting[aktiv.doning].aktivRedskap = ting[aktiv.doning].klarTilKoblingRedskap;
    aktiv.redskap = ting[aktiv.doning].klarTilKoblingRedskap;
    knapp('aktiver', 'redskapKoblingKnapp', 'redskapKobling()', true)
    oppdaterFart('redskap', ting[ting[aktiv.doning].aktivRedskap].fart);
    oppdaterLast('lastNivaPa')
  }
}

