type ArbeidsPunktMal = { x: number, y: number, type: 'type1'|'type2' };
type ArbeidsTypeMal = { blirTil: JordeVeksType|JordeIkkjeVeksType, last: { type: LastTypar|null, mengde: number } };
type LastMal = { valgtLast:null|EiLast, mottar:LastTypar[], leverer:LastTypar[], lastData: Record<string,EiLast> }
type LastDataMal = { valgtLast:null|LastTypar, mottar:LastTypar[], leverer:LastTypar[], lastData: Record<string,EiLast> }

type EiLast = {
  niva:number, maks:number, visNiva:boolean, lastTilDoning: boolean,
  mottak:  {plass:Maskin|Ting|null, losserFra:Maskin|Ting|null, mengde:number, evigLager:boolean},
  levering:{punkt:Maskin|Ting|null, losserTil:Maskin|Ting|null, mengde:number, evigLager:boolean}
};
type LastTypar = 'drivstoff'|'gras'|'korn'|'fro'|'ball'|'palle'|'grasball';

type Posisjon = { x: number, y: number };
type PosisjonMidtMal = { x: number, y: number, tx: number, ty: number, fx: number, fy: number };
type PosisjonMal = { x: number, y: number, tx: number, ty: number, dx: number, dy: number };
type Tilsjekk = Maskin|Ting;
type Rute = {tilSjekk:Tilsjekk[], x:number, y:number};
type ArbeidsTypar = 'ingen'|'traktor'|'skurteskar'|'plog'|'samaskin'|'slamaskin';

type GrafikkDelBase = {
  skalVise:boolean,
  tegneRekkefolge: 'over'|'under',
  midt:Posisjon, 
  pos: Posisjon, 
  str: Posisjon, 
  retning: number,
  klippPos: Posisjon
};
type AnimasjonBevegelse = { flytt: number, maksX: number };
type AnimasjonDekk      = { px:number, minX:number, maksX:number};
type AnimasjonRetning   = { retning:number, tid:number, status:number};
type AnimasjonSving     = { venstre: number, hogre: number, beint: number};
type AnimasjonPos       = { x: number, y: number, tid: number, status: number};
type AnimasjonKlipp     = { Xstart: number, Ystart: number, Xhopp: number, Yhopp: number, Xmaks: number, Ymaks: number, repitisjonar: 'evig'|number, status:number};
type AnimasjonLast      = { startX: number, maksX: number, startY:number, maksY: number};
type AnimasjonStr       = { str: number, tid:number, status: number};

interface GrafikkDelBevegelse    extends GrafikkDelBase  { animasjonBevegelse: AnimasjonBevegelse};
interface GrafikkDelDekk         extends GrafikkDelBase  { animasjonDekk:      AnimasjonDekk     };
interface GrafikkDelDekkMedSving extends GrafikkDelDekk  { animasjonSving:     AnimasjonSving    };
interface GrafikkDelRetning      extends GrafikkDelBase  { animasjonRetning:   AnimasjonRetning  };
interface GrafikkDelSving        extends GrafikkDelBase  { animasjonSving:     AnimasjonSving    };
interface GrafikkDelPos          extends GrafikkDelBase  { animasjonPos:       AnimasjonPos      };
interface GrafikkDelKlipp        extends GrafikkDelBase  { animasjonKlipp:     AnimasjonKlipp    };
interface GrafikkDelStrY         extends GrafikkDelBase  { animasjonStrY:      AnimasjonStr      };
interface GrafikkDelStrX         extends GrafikkDelBase  { animasjonStrX:      AnimasjonStr      };
interface GrafikkDelLast         extends GrafikkDelBase  { animasjonLast:      AnimasjonLast     };

type KrasjPunkt = Record<string,PosisjonMal>
type KrasjMal = {
  framSider: PosisjonMal[][], 
  bakSider: PosisjonMal[][], 
  andreSider: PosisjonMal[][],
  losseSider: PosisjonMal[][]|null,
  punkt: KrasjPunkt;
};




function teinTingEllerMaskin(detteLerret:CanvasRenderingContext2D,bilde:HTMLCanvasElement, denne:Maskin|Ting,tmpDel:GrafikkDelBase) {
  //flytt fokus til midt av maskin og roter riktig
  detteLerret.translate(denne.pos.midt.x, denne.pos.midt.y); //flytt fokus tilmidtpunkt
  detteLerret.rotate(denne.retning.aktiv * Math.PI / 180); //roter verden lik som doning
  //teiner doning
    detteLerret.translate(tmpDel.pos.x, tmpDel.pos.y); //flytt fokus tilmidtpunkt av del
    if(tmpDel.retning !== 0){ 
      detteLerret.rotate((tmpDel.retning * Math.PI) / 180);
    } //roter verden likt som del
    detteLerret.drawImage(bilde,
      tmpDel.klippPos.x, tmpDel.klippPos.y, // velg utsnitt av doningtegning 
      tmpDel.str.x, tmpDel.str.y, //bredde og høyde på utsnitt
      -tmpDel.str.x * tmpDel.midt.x, -tmpDel.str.y * tmpDel.midt.x, //posisjon av tegning
      tmpDel.str.x, tmpDel.str.y,// bredde og høyde på tegning
      ); 
    if(tmpDel.retning !== null){ detteLerret.rotate(-(tmpDel.retning * Math.PI) / 180); }//roter verden liks som del
    detteLerret.translate(-tmpDel.pos.x, -tmpDel.pos.y); //flytt fokus talbake fra del
  
  detteLerret.rotate((denne.retning.aktiv * Math.PI / 180) * -1);   //flytt fokus tilbake
  detteLerret.translate(-denne.pos.midt.x, -denne.pos.midt.y); //roter tilbake 
  
}
