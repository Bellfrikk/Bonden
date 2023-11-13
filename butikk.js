"use strict";
let butikk = { ramme: document.createElement('canvas') };
butikk.lerret = landskap.ramme.getContext("2d");
butikk.ramme.height = skjerm.hoyde;
butikk.ramme.width = skjerm.bredde;
function lagButikk () {
  
  for(let b=0; b<orginalMaskin.butikkListe.doninger.length;b++) {
    lagMaskin(orginalMaskin.butikkListe.doninger[b]);
  }
  for(let b=0; b<orginalMaskin.butikkListe.redskap.length;b++) {
    lagMaskin(orginalMaskin.butikkListe.redskap[b]);
  }  
  for(let b=0; b<orginalTing.butikkListe.ting.length;b++) {
    lagTing(orginalTing.butikkListe.ting[b]);
  }
}  
let visRute = [0, 0, 0];
let visLinje = ['doninger', 'redskap', 'ting'];
let butikkKnappar = [ ];
  function oppdaterButikk() {

  lerret.width = lerret.offsetWidth; 
  lerret.height = lerret.offsetHeight; 

  //tein rute funksjon
  let bredde, hoyde, startX, startY, farge;

  function teinRute(startX, startY, bredde, hoyde, farge){
    butikk.lerret.beginPath();  
     butikk.lerret.rect( startX, startY , bredde, hoyde );
     butikk.lerret.fillStyle = farge;
     butikk.lerret.fill();
    }
  //bakgrunn
  bredde = lerret.offsetWidth ;
  hoyde = lerret.offsetHeight;
  startX =  0;
  startY =  0;
  farge = '#000000';
  teinRute(startX, startY, bredde, hoyde, farge);
  
  //butikkrute
  const butikkBredde = lerret.offsetWidth > lerret.offsetHeight/2 ? lerret.offsetHeight / 2 : lerret.offsetWidth;
  marg = 20;
  bredde = butikkBredde -marg -marg;
  hoyde = lerret.offsetHeight - marg*2;
  startX =  lerret.offsetWidth/2 - bredde/2;
  startY =  marg;
  farge = '#e65c00';
  teinRute(startX, startY, bredde, hoyde, farge);

  //kjøretøy,redskap,ting linjer
  const rute = {
  bakgrunnsFarge :'#FFF',
  tekstFarge: '#000',
  bredde : butikkBredde - marg*4,
  hoyde : (lerret.offsetHeight-marg*6)/3,
  startX: lerret.offsetWidth/2 - (butikkBredde - marg*4)/2,
  startY: {0: marg*2 , 
           1: marg*3 + (lerret.offsetHeight-marg*6)/3,
           2: marg*4 + (lerret.offsetHeight-marg*6)/3*2
          },
  knappBredde: 50
  }

  butikkKnappar = [ ];
  teinRuteInnhold( orginalMaskin[ orginalMaskin.butikkListe.doninger[ visRute[ 0 ] ] ] , 0, 'doninger');
  teinRuteInnhold( orginalMaskin[ orginalMaskin.butikkListe.redskap[ visRute[ 1 ] ] ] , 1, 'redskap');
  teinRuteInnhold( orginalMaskin[ orginalMaskin.butikkListe.ting[ visRute[ 2 ] ] ] , 2, 'ting');

  function teinRuteInnhold(ting, ruteNr, avd) {
    //neste knapp
    butikkKnappar.push({v:rute.startX - marg, t: rute.startY[ruteNr], h: rute.startX, b: rute.startY[ruteNr] + rute.hoyde, handling: 'forrige', rute: ruteNr ,avd: avd});
    //forrige knapp
    butikkKnappar.push({v:rute.startX + rute.bredde, t: rute.startY[ruteNr], h: rute.startX + rute.bredde + marg, b: rute.startY[ruteNr] + rute.hoyde, handling: 'neste', rute: ruteNr , avd: avd});
    // kjøp knapp
    butikkKnappar.push({v:rute.startX + rute.bredde/2 + 10, t: rute.startY[ruteNr] + 185 - 15, h: rute.startX + rute.bredde/2 + 20 + 50, b: rute.startY[ruteNr] + 185 + 5, handling: 'kjop', rute: ruteNr , avd: avd});

    teinRute(rute.startX, rute.startY[ruteNr], rute.bredde, rute.hoyde, rute.bakgrunnsFarge);
    teinRute(rute.startX + rute.bredde/2 +10, rute.startY[ruteNr] + 185 -15, 40, 20, 'yellow');

    butikk.lerret.fillStyle = rute.tekstFarge;
    butikk.lerret.font = "2.2vh Comic Sans MS";
    butikk.lerret.fillText(ting.butikk.tittel, rute.startX + 50, rute.startY[ruteNr] + 35);
    butikk.lerret.drawImage(document.getElementById(ting.butikk.bilde), rute.startX + 10, rute.startY[ruteNr] + 45, rute.bredde/2, rute.bredde/2);
    butikk.lerret.font = "1.5vh Comic Sans MS";
    butikk.lerret.fillText('Fart: ' + ting.fart.maks, rute.startX + rute.bredde/2 + 20, rute.startY[ruteNr] + 65);
    butikk.lerret.fillText('Drivstoff: ' + ting.drivstoff.maks, rute.startX + rute.bredde/2 + 20, rute.startY[ruteNr] + 95);
    butikk.lerret.fillText('Last: ' + ting.last.maks, rute.startX + rute.bredde/2 + 20, rute.startY[ruteNr] + 125);
    butikk.lerret.fillText('Pris: ' + ting.butikk.pris, rute.startX + rute.bredde/2 + 20, rute.startY[ruteNr] + 155);
    butikk.lerret.fillText('KJØP', rute.startX + rute.bredde/2 + 20, rute.startY[ruteNr] + 185);
  }
}  



function butikkKnapparHandling(k){
  if(butikkKnappar[k].handling === 'neste') {
    if(visRute[butikkKnappar[k].rute] >= orginalMaskin.butikkListe[butikkKnappar[k].avd].length-1) {
      visRute[butikkKnappar[k].rute] = 0;
    } else {
      visRute[butikkKnappar[k].rute]++;
    }

  } else if(butikkKnappar[k].handling === 'forrige') {
    if(visRute[butikkKnappar[k].rute] <= 0) {
      visRute[butikkKnappar[k].rute] = orginalMaskin.butikkListe[butikkKnappar[k].avd].length-1;
    } else {
      visRute[butikkKnappar[k].rute]--;
    }      
  } else if(butikkKnappar[k].handling === 'kjop') {
    console.log('Kjøp: ' + orginalMaskin.butikkListe[butikkKnappar[k].avd][butikkKnappar[k].rute]);
  }
  oppdaterButikk();
}