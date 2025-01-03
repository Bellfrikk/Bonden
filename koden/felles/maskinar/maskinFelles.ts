const straffeFartVedTomForDrivstoff = 0.3;
const hengerFesteMargin = 5;
const maksTilhengerSving = 50

const listerMaskin = {
  butikkList: ['samaskin0', 'tilhengar1', 'tilhengar2', 'plog5', 'slamaskin3bak', 'slamaskin3fram', 'treskeSkjer1', 'ballemaskin1'],
    doninger: ['traktor0', 'skurtreskar1', 'ferrari'],
  }

type Maskin = Kjoretoy|Redskap;
type Kjoretoy = Bonde|Traktor|Skurtreskar;
type Redskap = Plog|Samaskin|Tilhengar|Slamaskin|Ballemaskin;//|TreskeSkjer
type FartMaskinMal = { aktiv: number, maks: number, friksjon: number, aks: number, landskap: number, arbeid: number, krasj: number, tyngde:number};



function velgValgtLast(denneDoningLast:LastMal, nyLastData: EiLast) {
  denneDoningLast.valgtLast = nyLastData;
}

class MaskinMal extends BaseMal{
  redskap: {fram:Redskap|null, bak:Redskap|null};
  fart: FartMaskinMal;
  arbeid:{
    type:ArbeidsTypar,
    aktiv: boolean;
    punkt: ArbeidsPunktMal[],
    type1: ArbeidsTypeMal | null,
    type2: ArbeidsTypeMal | null
  };

  constructor (ny:MaskinMalData, rute:Posisjon){
    super(ny,rute)
    this.redskap = {fram:null, bak:null};
    this.fart = ny.fart;
    this.arbeid = {type:ny.arbeid.type,
      aktiv: false,
      punkt: ny.arbeid.punkt,
      type1: ny.arbeid.type1,
      type2: ny.arbeid.type2,
    }
  }
}

interface MaskinMalData extends BaseMalData {
  fart: { aktiv: number, maks: number, friksjon: number, aks: number, landskap: number, arbeid: number, krasj: number, tyngde:number },
  arbeid:{type:ArbeidsTypar,
    punkt: ArbeidsPunktMal[],
    type1: ArbeidsTypeMal | null,
    type2: ArbeidsTypeMal | null,
  },   
}


//===================================================

class MaskinKjoretoyMal extends MaskinMal{
  sving: { fram:'beint'|'venstre'|'hogre' , bak: 'beint'|'venstre'|'hogre', fart: 'fart'|number };

  constructor (ny:MaskinKjoretoyData,rute:Posisjon){
    super(ny,rute)
    this.sving = {fram: 'beint', bak: 'beint', fart: ny.sving.fart};
  }
}

interface MaskinKjoretoyData extends MaskinMalData {
  sving: {fart:number|'fart'};
}

//===================================================

class MaskinRedskapMal extends MaskinMal{
  svingFartVedArbeid: number;

  constructor (ny:MaskinRedskapData,rute:Posisjon){
    super(ny,rute)
    this.svingFartVedArbeid = ny.svingFartVedArbeid;
  }
}

interface MaskinRedskapData extends MaskinMalData {
  svingFartVedArbeid:number;//fastfart ved aktiv arbeid
}