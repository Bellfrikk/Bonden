type Ting = Bygg|Last;

class TingMal extends BaseMal{
  fart: { krasj: number, friksjon: number, tyngde: number };
  constructor (ny:TingDataMal, rute:Posisjon){
    super(ny,rute)
    this.fart = ny.fart;
  }
}

interface TingDataMal extends BaseMalData {
fart: { krasj: number, friksjon: number, tyngde: number };
}
const listerTing = {
  fro:['fro'],
  gjodsel:[''],
  bygg:['butikkBygg','bensinstasjon','kornSilo','tre']
}
const orginalFro = {
  korn: { navn: 'korn', blirTil: 'kornSadd' },
  gras: { navn: 'gras', blirTil: 'grasSadd' },
  halm: { navn: 'halm', blirTil: null }
  }