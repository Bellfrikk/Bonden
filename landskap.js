// DATA
const kart = [
    ['grus', 'grus', 'grus', 'grus', 'veiSvingNedH', 'veiHorisontal', 'veiHorisontal', 'veiHorisontal', 'veiHorisontal', 'veiHorisontal', 'veiHorisontal', 'veiKryssNed', 'veiHorisontal', 'veiHorisontal', 'veiHorisontal', 'veiHorisontal', 'veiHorisontal', 'veiHorisontal', 'veiHorisontal', 'veiSvingNedV'],
    ['grus', 'grus', 'grus', 'bensinstasjon', 'veiVertikal', 'eng', 'eng', 'eng', 'eng', 'eng', 'eng', 'veiVertikal', 'eng', 'eng', 'eng', 'eng', 'eng', 'eng', 'butikk', 'veiVertikal'],
    ['grus', 'grus', 'grus', 'grus', 'veiVertikal', 'eng', 'eng', 'eng', 'eng', 'eng', 'eng', 'veiVertikal', 'eng', 'eng', 'eng', 'eng', 'eng', 'eng', 'eng', 'veiVertikal'],
    ['grus', 'grus', 'grus', 'grus', 'veiVertikal', 'eng', 'eng', 'eng', 'eng', 'eng', 'eng', 'veiVertikal', 'eng', 'eng', 'eng', 'eng', 'eng', 'eng', 'eng', 'veiVertikal'],
    ['grus', 'grus', 'grus', 'grus', 'veiVertikal', 'eng', 'eng', 'eng', 'eng', 'eng', 'eng', 'veiVertikal', 'eng', 'eng', 'eng', 'eng', 'eng', 'eng', 'eng', 'veiVertikal'],
    ['grus', 'grus', 'grus', 'grus', 'veiKryssH', 'veiHorisontal', 'veiHorisontal', 'veiHorisontal', 'veiHorisontal', 'veiKryssNed', 'veiHorisontal', 'veiKryssOpp', 'veiHorisontal', 'veiHorisontal', 'veiHorisontal', 'veiHorisontal', 'veiHorisontal', 'veiHorisontal', 'veiHorisontal', 'veiKryssV'],
    ['grus', 'grus', 'grus', 'grus', 'veiVertikal', 'dyrke3', 'dyrke3', 'dyrke3', 'dyrke3', 'veiVertikal', 'eng', 'eng', 'eng', 'eng', 'eng', 'eng', 'eng', 'eng', 'eng', 'veiVertikal'],
    ['grus', 'grus', 'grus', 'grus', 'veiVertikal', 'dyrke3', 'dyrke3', 'dyrke3', 'dyrke3', 'veiVertikal', 'eng', 'eng', 'eng', 'eng', 'eng', 'eng', 'eng', 'eng', 'eng', 'veiVertikal'],
    ['grus', 'grus', 'grus', 'grus', 'veiVertikal', 'dyrke3', 'dyrke3', 'dyrke3', 'dyrke3', 'veiVertikal', 'eng', 'eng', 'eng', 'eng', 'eng', 'eng', 'eng', 'eng', 'eng', 'veiVertikal'],
    ['grus', 'grus', 'grus', 'grus', 'veiVertikal', 'dyrke3', 'dyrke3', 'dyrke3', 'dyrke3', 'veiVertikal', 'eng', 'eng', 'eng', 'eng', 'eng', 'eng', 'eng', 'eng', 'eng', 'veiVertikal'],
    ['grus', 'grus', 'grus', 'grus', 'veiVertikal', 'dyrke3', 'dyrke3', 'dyrke3', 'dyrke3', 'veiVertikal', 'eng', 'eng', 'eng', 'eng', 'eng', 'eng', 'eng', 'eng', 'eng', 'veiVertikal'],
    ['veiSvingNedH', 'veiHorisontal', 'veiHorisontal', 'veiHorisontal', 'veiKryssOpp', 'veiHorisontal', 'veiHorisontal', 'veiHorisontal', 'veiHorisontal', 'veiKryss', 'veiHorisontal', 'veiHorisontal', 'veiHorisontal', 'veiHorisontal', 'veiHorisontal', 'veiHorisontal', 'veiHorisontal', 'veiHorisontal', 'veiHorisontal', 'veiKryssV'],
    ['veiVertikal', 'eng', 'eng', 'eng', 'eng', 'eng', 'eng', 'eng', 'eng', 'veiVertikal', 'eng', 'eng', 'eng', 'eng', 'eng', 'eng', 'eng', 'eng', 'eng', 'veiVertikal'],
    ['veiVertikal', 'eng', 'eng', 'eng', 'eng', 'eng', 'eng', 'eng', 'eng', 'veiVertikal', 'eng', 'eng', 'eng', 'eng', 'eng', 'eng', 'eng', 'eng', 'eng', 'veiVertikal'],
    ['veiVertikal', 'eng', 'eng', 'eng', 'eng', 'eng', 'eng', 'eng', 'eng', 'veiVertikal', 'eng', 'eng', 'eng', 'eng', 'eng', 'eng', 'eng', 'eng', 'eng', 'veiVertikal'],
    ['veiVertikal', 'eng', 'eng', 'eng', 'eng', 'eng', 'eng', 'eng', 'eng', 'veiVertikal', 'eng', 'eng', 'eng', 'eng', 'eng', 'eng', 'eng', 'eng', 'eng', 'veiVertikal'],
    ['veiVertikal', 'eng', 'eng', 'eng', 'eng', 'eng', 'eng', 'eng', 'eng', 'veiVertikal', 'eng', 'eng', 'eng', 'eng', 'eng', 'eng', 'eng', 'eng', 'eng', 'veiVertikal'],
    ['veiVertikal', 'eng', 'eng', 'eng', 'eng', 'eng', 'eng', 'eng', 'eng', 'veiVertikal', 'eng', 'eng', 'eng', 'eng', 'eng', 'eng', 'eng', 'eng', 'eng', 'veiVertikal'],
    ['veiSvingOppH', 'veiHorisontal', 'veiHorisontal', 'veiHorisontal', 'veiHorisontal', 'veiHorisontal', 'veiHorisontal', 'veiHorisontal', 'veiHorisontal', 'veiKryssOpp', 'veiHorisontal', 'veiHorisontal', 'veiHorisontal', 'veiHorisontal', 'veiHorisontal', 'veiHorisontal', 'veiHorisontal', 'veiHorisontal', 'veiHorisontal', 'veiSvingOppV']
  ]
  const orginalLandskap = {
    vei: { fart: 0, handling: null },
    grus: { bakgrunn: 'grus', fart: -0.2, handling: null },
    bensinstasjon: { bakgrunn: 'bensinstasjon',  fart: 0, handling: 'bensinstasjon', aktivertAv: null, bliTil: null, bilTilTid: null, pris: 0, avling: 0 },
    butikk: { bakgrunn: 'butikk', fart: 0, fartAktiv: -1, handling: null, aktivertAv: null, bliTil: null, bilTilTid: null, pris: 0, avling: 0 },
    eng: { bakgrunn: 'eng' + Math.floor(Math.random() * 4) , fart: -0.4, fartAktiv: -1, handling: 'dyrke', aktivertAv: null, bliTil: null, bilTilTid: null, pris: 0, avling: 0 },
    dyrke0: { bakgrunn: 'dyrke0', fart:-0.2, fartAktiv: -1, handling: 'sein', aktivertAv: 'gravemaskin',bliTil: 'dyrke1', bliTilTid: 30, pris: 0, avling: 0 },
    dyrke1: { bakgrunn: 'dyrke1', fart:-0.2, fartAktiv: -1, handling: 'sein', aktivertAv: 'gravemaskin',bliTil: 'dyrke2', bliTilTid: 30, pris: 0, avling: 0 },
    dyrke2: { bakgrunn: 'dyrke2', fart:-0.2, fartAktiv: -1, handling: 'sein', aktivertAv: 'gravemaskin',bliTil: 'dtrke3', bliTilTid: 30, pris: 0, avling: 0 },
    dyrke3: { bakgrunn: 'dyrke3', fart:-0.2, fartAktiv: -1, handling: 'rask', aktivertAv: 'plog',bliTil: 'ployd', bliTilTid: null, pris: 0, avling: 0 },
    ployd: { bakgrunn: 'ployd', fart:-0.2, fartAktiv: -1, handling: 'rask', aktivertAv: 'samaskin', bliTil: null, bliTilTid: null, pris: 0, avling: 0   },
    kornSadd: { bakgrunn: 'kornSadd', fart:-0.2, fartAktiv: -1, handling: null, aktivertAv: null, bliTil: 'kornVeks', bliTilTid: 30, pris: 0, avling: 0 },
    kornVeks: { bakgrunn: 'kornVeks', fart:-0.2, fartAktiv: -1, handling: null, aktivertAv: null, bliTil: 'kornModent', bliTilTid: 30, pris: 0, avling: 0 },
    kornModent: { bakgrunn: 'kornModent', fart:-0.2, fartAktiv: -1, handling: null, aktivertAv: null, bliTil: 'kornKlart', bliTilTid: 30, pris: 0, avling: 0 },
    kornSproyta: { bakgrunn: 'kornSproyta', fart:-0.2, fartAktiv: -1, handling: null, aktivertAv: null, bliTil: 'kornKlart', bliTilTid: null, pris: 0, avling: 0 },
    kornKlart: { bakgrunn: 'kornKlart', fart:-0.2, fartAktiv: -1, handling: null, aktivertAv: 'skurtreskar', bliTil: 'kornHausta', bliTilTid: null, pris: 100, avling: 4 },
    kornDarlig: { bakgrunn: 'kornDarlig', fart:-0.2, fartAktiv: -1, handling: null, aktivertAv: 'skurtreskar', bliTil: 'kornHausta', bliTilTid: null, pris: 70, avling: 3 },
    kornHausta: { bakgrunn: 'kornHausta', fart:-0.2, fartAktiv: -1, handling: null, aktivertAv: 'plog', bliTil: 'ployd', bliTilTid: null, pris: 0, avling: 0 },
    grasSadd: { bakgrunn: 'grasSadd', fart:-0.2, fartAktiv: -1, handling: null, aktivertAv: null, bliTil: 'grasVeks', bliTilTid: 30, pris: 0, avling: 0 },
    grasVeks: { bakgrunn: 'grasVeks', fart:-0.2, fartAktiv: -1, handling: null, aktivertAv: null, bliTil: 'grasKlart', bliTilTid: 30, pris: 0, avling: 0 },
    grasKlart: { bakgrunn: 'grasKlart', fart:-0.2, fartAktiv: -1, handling: 'slagras', aktivertAv: 'slamaskin', bliTil: 'grasSlatt', bliTilTid: null, pris: 0, avling: 0 },
    grasSlattHor: { bakgrunn: 'grasSlattHor', fart:-0.2, fartAktiv: -1, handling: null, aktivertAv: 'ballemaskin', bliTil: 'grasHausta', bliTilTid: null, pris: 0, avling: 0 },
    grasSlattVer: { bakgrunn: 'grasSlattVer', fart:-0.2, fartAktiv: -1, handling: null, aktivertAv: 'ballemaskin', bliTil: 'grasHausta', bliTilTid: null, pris: 0, avling: 0 },
    grasHausta: { bakgrunn: 'grasHausta', fart:-0.2, fartAktiv: -1, handling: null, aktivertAv: 'plog', bliTil: 'ployd', bliTilTid: null, pris: 0, avling: 0 }

  }

//𝗻𝘆𝘁𝘁 𝗹𝗮𝗻𝗱𝘀𝗸𝗮𝗽⁡
function lagLandskap() {
  let nr = 0;
  //lag landskap
  for (y = 0; y < kart.length; y++) {
    for (x = 0; x < kart[y].length; x++, nr++) {
      var navn = 'landskap' + (x + 100) + y;
      landskap[navn] = new nyttLandskap(kart[y][x], x, y);
      landskap.liste.push(navn);
    }
  }
}
function nyttLandskap(navn, x, y) {
  this.posX = x;
  this.posY = y;
  this.pxX = x * pixel.ruteLengde;
  this.pxY = y * pixel.ruteLengde + pixel.top;
  this.bredde = pixel.ruteLengde;
  this.hoyde = pixel.ruteLengde;
  this.aktivRute;
  //basis ruter
  if (
    navn === 'veiSvingNedH' ||
    navn === 'veiSvingNedV' ||
    navn === 'veiSvingOppH' ||
    navn === 'veiSvingOppV' ||
    navn === 'veiKryssNed' ||
    navn === 'veiKryssOpp' ||
    navn === 'veiKryssH' ||
    navn === 'veiKryssV' ||
    navn === 'veiKryss' ||
    navn === 'veiHorisontal' ||
    navn === 'veiVertikal'
  ) {
    this.navn = 'vei';
    this.aktivBakgrunn = navn;
  } else {
    nyRuteType( this, navn)
  }

  this.tein = () => {
    if (
      document.getElementById(this.aktivBakgrunn) instanceof HTMLImageElement
    ) {
      //sjekker at bilde er tilgjendelig
      verden.drawImage(
        document.getElementById(this.aktivBakgrunn),
        this.pxX - pixel.startX,
        this.pxY - pixel.startY,
        pixel.ruteLengde,
        pixel.ruteLengde
      );
    } else {
      console.error(this.navn + ' har ikkje bilde: ' + this.aktivBakgrunn);
    }
  };
}
//====================================================== nyRuteType ======================================================================
function nyRuteType( rute, navn ) {
  rute.navn = navn;
  rute.aktivBakgrunn = orginalLandskap[navn].bakgrunn;
}