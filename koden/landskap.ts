const landskapBilde = document.getElementById('landskap')! as HTMLCanvasElement;
const jordeBilde = document.getElementById('jorde')! as HTMLCanvasElement;
let krasjlisteLandskap:string[] = [];
let landskap:Record<string,Landskap> = { };
let jorde:Record<string,JordeVeks|JordeIkkjeVeks> = { };
type JordeVekseListe = {typar:JordeVeksType[]} & {[key in JordeVeksType]:JordeVeks[]};
let jordeVekseListe:JordeVekseListe = { typar: ['grasSadd','grasVeks','grasModent','kornSadd','kornVeks','kornModent'], grasSadd:[],grasVeks:[],grasModent:[],kornSadd:[],kornVeks:[],kornModent:[]} 
ramme.jorde.height = skjerm.botn;
ramme.jorde.width = skjerm.hogre;
type Kart = {
  startPeng:number;
  antalRuter: {x:number, y:number};
  storrelseRuter: {x:number, y:number};
  landskap: LandskapTypeData;
  ting:     any[],
  maskinar: any[],
}
type LandskapDataRute = {sort:LandskapType, vekseType:JordeVeksType|null, retning:number, utsnitt:number, rutenr:Posisjon,pos:Posisjon, str:{x:number,y:number}}

type LandskapTypeData = Record<string,LandskapDataRute>;

//====================================================== lage heile landskapet ======================================================================
function lagLandskap(kart:Kart) {
for (let y = 0; y < kart.antalRuter.y; y++) {
  for (let x = 0; x < kart.antalRuter.x; x++) {
    let id = 'x' + x + 'y' + y;
    let type = kart.landskap[id].sort as LandskapType;
    landskap[id] = new Landskap(id, kart.landskap[id]);
    if(type === 'jorde') { lagJorde(x,y)}
    if(orginalLandskap[type].krasj !== null) { krasjlisteLandskap.push(id)}
  }
}
}
function lagJorde(x:number,y:number) {
  for (let y2 = 0; y2 < orginalJorde.antallJordeRuter; y2++) {
    for (let x2 = 0; x2 < orginalJorde.antallJordeRuter; x2++) {
      let id = 'x' + (x * orginalJorde.antallJordeRuter + x2) + 'y' + (y * orginalJorde.antallJordeRuter + y2);
      jorde[id] = new JordeIkkjeVeks('dyrka', x, y, x2, y2, id, 0);
    }
  }
}
//====================================================== nyttLandskap ======================================================================
class Landskap{
  rute: Rute;
  type: 'landskap';
  sort: LandskapType;
  pos: {x:number,y:number};
  bredde:number;
  hoyde:number;
  utsnitt: {x:number, y:number};
  retning: number;
  fart: number;
  arbeid: null|{aktivertAv:string[]|null};

  constructor(id:string, data:LandskapDataRute) {
  this.rute = {tilSjekk:[],x:data.rutenr.x,y:data.rutenr.y};
  this.type = 'landskap';
  this.sort = data.sort;
  this.pos = {x: data.rutenr.x * pixel.ruteLengde, y: data.rutenr.y * pixel.ruteLengde};
  this.bredde = pixel.ruteLengde;
  this.hoyde = pixel.ruteLengde;
  this.utsnitt = orginalLandskap[data.sort].utsnitt[data.utsnitt];
  this.retning = data.retning;
  this.fart = orginalLandskap[data.sort].fart;
  this.arbeid = orginalLandskap[data.sort].arbeid;

  //Legg hindringer i krasj liste og lag hitboks
  if (orginalLandskap[data.sort].krasj !== null) {

  }
}
}

//====================================================== nyttJorde ======================================================================
class JordeMal{
  rute: [x:number, y:number];
  pos: {x:number,y:number};
  bredde:number;
  hoyde:number;
  retning:number;
  utsnitt: {x:number, y:number};
  arbeid: {aktivertAv:string[]};
  constructor(sort:JordeVeksType|JordeIkkjeVeksType, x:number, y:number,x2:number, y2:number, id:string, retning:number) {
    this.rute = [x * 10 + x2, y * 10 + y2];
    this.pos = {
      x: (x * pixel.ruteLengde) + (x2 * pixel.ruteLengde / orginalJorde.antallJordeRuter),
      y: (y * pixel.ruteLengde) + (y2 * pixel.ruteLengde / orginalJorde.antallJordeRuter)
    };
    this.bredde = pixel.ruteLengde / orginalJorde.antallJordeRuter;
    this.hoyde  = pixel.ruteLengde / orginalJorde.antallJordeRuter;
    this.retning = retning;
    this.utsnitt = {x:0, y:0};
    this.arbeid = orginalJorde[sort].arbeid;
  }
}
class JordeVeks extends JordeMal {
  veksing: { bliTil: JordeVeksType|JordeIkkjeVeksType, tid: number, vekseTid: number, avling: number };   
  sort:JordeVeksType;
  constructor(sort:JordeVeksType, x:number, y:number,x2:number, y2:number, id:string, retning:number) {
    super(sort, x, y,x2, y2, id, retning)
    this.veksing = orginalJorde[sort].veksing;
    this.sort = sort;
    nyJordeSort(this, sort, retning);
  }
}
class JordeIkkjeVeks extends JordeMal {
  veksing: null;
  sort:JordeIkkjeVeksType;

  constructor(sort:JordeIkkjeVeksType, x:number, y:number,x2:number, y2:number, id:string, retning:number) {
    super(sort, x, y,x2, y2, id, retning)
    this.veksing = orginalJorde[sort].veksing;
    this.sort = sort;

    nyJordeSort(this, sort, retning);
  }
}
//---------------------------------------------- nyJordesort -------------------------------------
function nyJordeSort(rute:JordeVeks|JordeIkkjeVeks, sort:JordeVeksType|JordeIkkjeVeksType, retning:number) {
  rute.sort = sort;
  rute.retning = retning;
  rute.utsnitt = orginalJorde[sort].utsnitt[Math.floor(Math.random() * orginalJorde[sort].utsnitt.length)];
  rute.arbeid = orginalJorde[sort].arbeid;
  rute.veksing = orginalJorde[sort].veksing;
  if(rute.veksing !== null){ startVeksing(rute) }
  teinRute(rute, jordeBilde);
}


//====================================================== tein Landskap og jorde ======================================================================
function oppdaterLandskap() {
  ramme.landskap.height = skjerm.botn;
  ramme.landskap.width = skjerm.hogre;

  Object.keys(landskap).forEach((nr) => {
    teinRute(landskap[nr], landskapBilde);
  });
  Object.keys(jorde).forEach((nr) => {
    teinRute(jorde[nr], jordeBilde);
  });
}

function teinRute(denne:Landskap|JordeVeks|JordeIkkjeVeks, bakgrunn: CanvasImageSource) {
    // lage eit midpunkt ved omderiningspunkt
    let midtpunkt = {x:0,y:0};
    if (denne.retning !== 0) {//bAre roter om nødvending
      lerret.landskap.save();//Lagre oppsettfør rotering
      lerret.landskap.beginPath();
      lerret.landskap.rect(denne.pos.x, denne.pos.y, denne.bredde, denne.hoyde);//Veg utsnitt som skal kunne tegnes på
      lerret.landskap.clip();//sett at bare gjeldende områte kan tegnast på

      midtpunkt.x = denne.pos.x + denne.bredde / 2;
      midtpunkt.y = denne.pos.y + denne.hoyde / 2;
      lerret.landskap.translate(midtpunkt.x, midtpunkt.y);//flytt fokus tilmidtpunkt
      lerret.landskap.rotate(denne.retning * Math.PI / 180);//roter verden liks som rute retning
      lerret.landskap.translate(midtpunkt.x * -1, midtpunkt.y * -1);//flytt fokus til start}
    } 
    // tein rute
    lerret.landskap.drawImage(
      bakgrunn,
      denne.utsnitt.x, denne.utsnitt.y,
      denne.bredde, denne.hoyde,
      denne.pos.x, denne.pos.y,
      denne.bredde, denne.hoyde
    );
    if (denne.retning !== 0) { 
      lerret.landskap.restore()//tilbakesiller alt til slik det var ved save()
    }
}






//====================================================== veksing ======================================================================
function lagVeksing() {
  jordeVekseListe.typar.forEach(x => {
    jordeVekseListe[x] = [];
  });
  setInterval(veksingLoop, orginalJorde.vekseintervall * 1000);
}
function startVeksing(denne:JordeVeks) {
  jordeVekseListe[denne.sort].push(denne);// legg jorde til i liste som skal vekse
  denne.veksing.tid = tid + denne.veksing.vekseTid; //* ((Math.random()/9)+0.9));// sett tildspunkt for når jorde er ferdig vokse +- 10%
}
function veksingLoop() {
  tid += orginalJorde.vekseintervall;
  jordeVekseListe.typar.forEach(sort => {//sjekk alle vekselister om dei er ferdig vokse
    if (jordeVekseListe[sort].length < 1) { return; }// sjekk om lista er tom

    let aktivJorde = jordeVekseListe[sort][0];
    if (aktivJorde.veksing === null) {
      jordeVekseListe[sort].shift()//fjern ruta fra vekse lista om den ikkje lenger veks.
      return;
    }
    if (aktivJorde.veksing.tid < tid) {// sjekk om den første ruta i lista nå er ferdig vekst
      nyJordeSort(aktivJorde, aktivJorde.veksing.bliTil, aktivJorde.retning);//endre ruta
      jordeVekseListe[sort].shift()//fjern ruta fra vekse lista, når den har vokse
    }
  });
}


