//type LandskapDataRute = {type:LandskapType, vekseType:JordeVeksType|null, retning:number, rutenr:{x:number,y:number},pos:Posisjon, str:{x:number,y:number}}
type NyttKart = {startPeng: number, antalRuter:{x:number,y:number}, storrelseRuter:{x:number,y:number},landskap:Record<string,LandskapDataRute>,ting: [],maskinar:[]}
const verktoyKnappar:LandskapType[] = ['veiSving','veiXkryss','veiTkryss','veiBein', 'grus', 'asfalt', 'skog', 'vatn', 'eng', 'jorde']
let nyttKart: NyttKart = {startPeng: 0, antalRuter: {x: 10, y: 10}, storrelseRuter: {x: 50, y: 50}, landskap: {}, ting: [], maskinar: []};

const rammeKart = document.getElementById('lagKartSkjerm')! as HTMLCanvasElement;
const lerretKart = rammeKart.getContext("2d")!;
const landskapBildeKart = document.getElementById('landskap')! as HTMLCanvasElement;
const jordeBildeKart = document.getElementById('jorde')! as HTMLCanvasElement;  
rammeKart.style.width  = nyttKart.storrelseRuter.x * nyttKart.antalRuter.x + 'px';
rammeKart.style.height = nyttKart.storrelseRuter.y * nyttKart.antalRuter.y + 'px';


function startLagKart(){
  for(let y = 0; y < nyttKart.antalRuter.y; y++){
    for(let x = 0; x < nyttKart.antalRuter.x; x++){
        nyttKart.landskap['ruteX'+x+'Y'+y] = {type:'skog', vekseType:null, retning:0,rutenr:{x:x,y:y}, pos:{x:nyttKart.storrelseRuter.x * x, y:nyttKart.storrelseRuter.y * y}, str:{x:40,y:40}}
    }
  }

  const verktoyLinje = document.getElementById("verktoyLinje");
  verktoyKnappar.forEach(type => {
  const knapp = document.createElement("button");
  knapp.id = type;
  knapp.innerText =type;
  knapp.className = 'knapp';
  knapp.onclick = () => velgVerktoy(type, knapp);
  verktoyLinje!.appendChild(knapp);
    });
  teinAlt()
}

function teinAlt(){
  for( let rute in nyttKart.landskap){
    teinTingEllerMaskin(lerretKart, landskapBildeKart, nyttKart.landskap[rute])
  }
}

function teinTingEllerMaskin(detteLerret:CanvasRenderingContext2D,bilde:HTMLCanvasElement, denne:LandskapDataRute) {
  //flytt fokus til midt av maskin og roter riktig
  detteLerret.translate(denne.pos.x, denne.pos.y); //flytt fokus tilmidtpunkt
  detteLerret.rotate(denne.retning * Math.PI / 180); //roter verden lik som doning
  //teiner doning

    detteLerret.drawImage(bilde,
      orginalLandskap[denne.type].utsnitt[0].x, orginalLandskap[denne.type].utsnitt[0].y, // velg utsnitt av doningtegning 
      denne.str.x, denne.str.y, //bredde og høyde på utsnitt
      denne.str.x * 0.5, denne.str.y * 0.5, //posisjon av tegning
      denne.str.x, denne.str.y,// bredde og høyde på tegning
      );   
  detteLerret.rotate((denne.retning * Math.PI / 180) * -1);   //flytt fokus tilbake
  detteLerret.translate(-denne.pos.x, -denne.pos.y); //roter tilbake 
}


let aktivType:LandskapType = 'eng'; 
let aktivKnapp:HTMLButtonElement|null = null;

function velgVerktoy(type:LandskapType, knapp:HTMLButtonElement){
aktivType = type;
if(aktivKnapp !== null) aktivKnapp.className = 'knapp';
aktivKnapp = knapp;
aktivKnapp.className = 'knapp knappValgt';
}

function klikkRute(div:HTMLDivElement, denneRute: keyof NyttKart['landskap']){
  nyttKart.landskap[denneRute].type = aktivType;
  nyttKart.landskap[denneRute].retning += 90; 
  div.style.backgroundPosition = orginalLandskap[aktivType].utsnitt[0].x + 'px ' + orginalLandskap[aktivType].utsnitt[0].y + 'px';
  div.style.transform = 'rotate(' + nyttKart.landskap[denneRute].retning + 'deg)';
}
