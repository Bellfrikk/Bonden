
let tingListe:string[] = [];
const tingBilde = document.getElementById('bildeTing')! as HTMLCanvasElement;
let ting: Record<string,Ting> = {};

function lagTing(klasse:any, modell:any,rute:Posisjon) {
  const id = modell.type + tingListe.filter(tingen => tingen.includes(modell.type)).length;
  ting[id] = new klasse(modell, rute) 
  tingListe.push(id);
  flagg.push('teinTing');
  oppdaterPoisjonar(ting[id] ,'direkte');
}

function slettTing (denne:Ting) {
  flagg.push('teinTing');

}


function teinAlleTing() {
  ramme.ting.height = skjerm.botn;
  ramme.ting.width = skjerm.hogre;
  let tegneliste:[Ting,GrafikkDelBase][] = [];
  for ( let denneTingNavn in ting) {
    let denneTing = ting[denneTingNavn];
    for ( let denneDelNavn in denneTing.grafikk) {
      let denneDel:GrafikkDelBase = denneTing.grafikk[denneDelNavn as keyof typeof denneTing.grafikk];
      if ( denneDel.skalVise) {
        if ( denneDel.tegneRekkefolge === 'over' ) {
          tegneliste.push([denneTing,denneDel]);
        } else if ( denneDel.tegneRekkefolge === 'under' ) {
          tegneliste.unshift([denneTing,denneDel]);
        }
      }
    }
  }
  tegneliste.forEach( del => {teinTingEllerMaskin(lerret.ting, tingBilde, del[0],del[1])});
}

