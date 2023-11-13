knappar.ramme = document.createElement('canvas');
knappar.lerret = knappar.ramme.getContext('2d');
knappar.ramme.height = skjerm.hoydeKnappar;
knappar.ramme.width = skjerm.bredde;
function oppdaterKnappar () {
  knappar.ramme.height = skjerm.hoydeKnappar;
  knappar.ramme.width = skjerm.bredde;
  teinKnappar();
}

function sjekkOmKnapparErAktivert () {
    //-------------------andre knappar aktivering ---------------
    if (knappar.utAvDoning.vis && knappar.utAvDoning.trykkAktivet) {
      utAvDoning();
      knappar.utAvDoning.trykkAktivet = false;
    } else if (knappar.koblingRedskapFram.vis && knappar.koblingRedskapFram.trykkAktivet) {
      knappar.koblingRedskapFram.trykkAktivet = false;
      redskapKobling('fram')
    } else if (knappar.koblingRedskapBak.vis && knappar.koblingRedskapBak.trykkAktivet) {
      knappar.koblingRedskapBak.trykkAktivet = false;
      redskapKobling('bak')
    } else if (knappar.aktiverRedskapFram.vis && knappar.aktiverRedskapFram.trykkAktivet) {
      knappar.aktiverRedskapFram.trykkAktivet = false;
      aktiverRedskap('fram')
    } else if (knappar.aktiverRedskapBak.vis && knappar.aktiverRedskapBak.trykkAktivet) {
      knappar.aktiverRedskapBak.trykkAktivet = false;
      aktiverRedskap('bak')
    }}

// 𝘀𝘁𝘆𝗿𝗶𝗻𝗴​⁡ tastatur
function styring() {
    document.addEventListener('keydown', function (knapp) {
      knapp.preventDefault();
      if (knapp.key === 'ArrowUp' || knapp.key === 'w') {
        knappar.fram.trykkAktivet = true;
      } else if (knapp.key === 'ArrowDown' || knapp.key === 's') {
        knappar.bak.trykkAktivet = true;
      } else if (knapp.key === 'ArrowLeft' || knapp.key === 'a') {
        knappar.venstre.trykkAktivet = true;
      } else if (knapp.key === 'ArrowRight' || knapp.key === 'd') {
        knappar.hogre.trykkAktivet = true;
      } else if (knapp.key === 'f') {
        knappar.koblingRedskapFram.trykkAktivet = true;
      } else if (knapp.key === 'r') {
        knappar.koblingRedskapBak.trykkAktivet = true;
      } else if (knapp.key === 'g') {
        knappar.aktiverRedskapFram.trykkAktivet = true;
      } else if (knapp.key === 't') {
        knappar.aktiverRedskapBak.trykkAktivet = true;
      } else if (knapp.key === 'e') {
        knappar.utAvDoning.trykkAktivet = true;
      } else if (knapp.key === 'q') {
        knappar.aktiverRedskap.trykkAktivet = true;
      }
      ting.erEndra = true;
      flagg.animasjon = true;
    });
    document.addEventListener('keyup', function tastSlepp(knapp) {
      knapp.preventDefault();
      if (knapp.key === 'ArrowUp' || knapp.key === 'w') {
        knappar.fram.trykkAktivet = false;
      } else if (knapp.key === 'ArrowDown' || knapp.key === 's') {
        knappar.bak.trykkAktivet = false;
      } else if (knapp.key === 'ArrowLeft' || knapp.key === 'a') {
        knappar.venstre.trykkAktivet = false;
      } else if (knapp.key === 'ArrowRight' || knapp.key === 'd') {
        knappar.hogre.trykkAktivet = false;
      }
      ting.erEndra = true;
      flagg.animasjon = true;

    });
  
    skjerm.ramme.addEventListener("touchstart", (e) => { e.preventDefault(); klikkMus(e, 'touch', true) }, false);
    skjerm.ramme.addEventListener("touchend", (e) => { e.preventDefault(); klikkMus(e, 'touch', false) }, false);
    skjerm.ramme.addEventListener("mousedown", (e) => { e.preventDefault(); klikkMus(e, 'mus', true) }, false);
    skjerm.ramme.addEventListener("mouseup", (e) => { e.preventDefault(); klikkMus(e, 'mus', false) }, false);
    skjerm.ramme.addEventListener("mouseleave", (e) => { e.preventDefault(); klikkMus(e, 'mus', false) }, false);
  }
  
  //--------------------------------------KNAPPAR------------------------------------
  
  function klikkMus(pos, type, trykk) {
    ting.erEndra = true;
  
    if (type === 'mus') {
      sjekkKnappar([pos.clientX, pos.clientY], trykk);
    } else {
      //let tmpTouch = [...pos.touches];
      //for(let a=0; a<tmpTouch.length;a++) {
      //  sjekkKnappar( [pos.touches[a].clientX, pos.touches[a].clientY] , trykk);
      //}
      let tmpTouch = [...pos.changedTouches];
      for (let a = 0; a < tmpTouch.length; a++) {
        sjekkKnappar([pos.changedTouches[a].clientX, pos.changedTouches[a].clientY], trykk);
      }
    }
  }
  
  function sjekkKnappar(mus, trykk) {
    mus[1] -= skjerm.startHoydeKnappar;
    if (aktivSkjerm.verden) {
      for (let k = 0; k < knappar.liste.length; k++) {
        if (knappar[knappar.liste[k]].vis === false) { continue; }//ikkje sjekk knappar som ikkje er aktive
        if ((mus[0] > knappar[knappar.liste[k]].v && mus[0] < knappar[knappar.liste[k]].h) && (mus[1] > knappar[knappar.liste[k]].t && mus[1] < knappar[knappar.liste[k]].b)) {
          knappar[knappar.liste[k]].trykkAktivet = trykk;
        }
      }
    } else if (aktivSkjerm.butikk) {
      for (let k = 0; k < butikkKnappar.length; k++) {
        if ((mus[0] > butikkKnappar[k].v && mus[0] < butikkKnappar[k].h) && (mus[1] > butikkKnappar[k].t && mus[1] < butikkKnappar[k].b)) {
        }
      }
    }
  }
  
  function teinKnappar() {
    knappar.utAvDoning.vis = doning.type === 'bonde' ? false : true;
    knappar.koblingRedskapFram.vis = doning.redskap.fram === null ? false : true;
    knappar.aktiverRedskapFram.vis = doning.redskap.fram === null ? false : true;
    knappar.koblingRedskapBak.vis = doning.redskap.bak === null ? false : true;
    knappar.aktiverRedskapBak.vis = doning.redskap.bak === null ? false : true;
  
    knappar.lerret.beginPath();
    knappar.lerret.fillStyle = '#000';
    knappar.lerret.fillRect(0, 0, skjerm.bredde, skjerm.startHoydeKnappar);
    if ((knappar.liste.length * knappar.str) > skjerm.bredde) {//to linjer med knappar
      knappar.fram.v = (knappar.marg + knappar.str * 0);
      knappar.bak.v = (knappar.marg + knappar.str * 1);
      knappar.koblingRedskapFram.v = (knappar.marg + knappar.str * 0);
      knappar.aktiverRedskapFram.v = (knappar.marg + knappar.str * 1);
      knappar.utAvDoning.v = (knappar.marg + knappar.str * 2);
      knappar.koblingRedskapBak.v = skjerm.bredde - (knappar.marg + knappar.str * 2);
      knappar.aktiverRedskapBak.v = skjerm.bredde - (knappar.marg + knappar.str * 1);
      knappar.venstre.v = skjerm.bredde - (knappar.marg + knappar.str * 2);
      knappar.hogre.v = skjerm.bredde - (knappar.marg + knappar.str * 1);
  
      knappar.fram.t = knappar.marg / 2 + knappar.str;
      knappar.bak.t = knappar.marg / 2 + knappar.str;
      knappar.koblingRedskapFram.t = knappar.marg / 2;
      knappar.aktiverRedskapFram.t = knappar.marg / 2;
      knappar.utAvDoning.t = knappar.marg / 2;
      knappar.koblingRedskapBak.t = knappar.marg / 2;
      knappar.aktiverRedskapBak.t = knappar.marg / 2;
      knappar.venstre.t = knappar.marg / 2 + knappar.str;
      knappar.hogre.t = knappar.marg / 2 + knappar.str;
  
    } else {//1 linje med knappar
      knappar.fram.v = (knappar.marg + knappar.str * 0);
      knappar.bak.v = (knappar.marg + knappar.str * 1);
      knappar.utAvDoning.v = (knappar.marg + knappar.str * 2);
      knappar.aktiverRedskapFram.v = (knappar.marg + knappar.str * 3);
      knappar.koblingRedskapFram.v = (knappar.marg + knappar.str * 4);
      knappar.koblingRedskapBak.v = (knappar.marg + knappar.str * 5);
      knappar.aktiverRedskapBak.v = (knappar.marg + knappar.str * 6);
      knappar.venstre.v = skjerm.bredde - ((knappar.marg + knappar.str) * 2);
      knappar.hogre.v = skjerm.bredde - ((knappar.marg + knappar.str) * 1);
  
      knappar.fram.t = knappar.marg / 2;
      knappar.bak.t = knappar.marg / 2;
      knappar.koblingRedskapFram.t = knappar.marg / 2;
      knappar.aktiverRedskapFram.t = knappar.marg / 2;
      knappar.utAvDoning.t = knappar.marg / 2;
      knappar.koblingRedskapBak.t = knappar.marg / 2;
      knappar.aktiverRedskapBak.t = knappar.marg / 2;
      knappar.venstre.t = knappar.marg / 2;
      knappar.hogre.t = knappar.marg / 2;
  
    }
    for (let k = 0; k < knappar.liste.length; k++) {
      let tmpKnapp = knappar[knappar.liste[k]];
      if (tmpKnapp.vis) {
        tmpKnapp.b = tmpKnapp.t + knappar.str;
        tmpKnapp.h = tmpKnapp.v + knappar.str;
  
        knappar.lerret.drawImage(document.getElementById('knappar'),
          tmpKnapp.ikonNr * knappar.ikonStr, 0,
          knappar.ikonStr, knappar.ikonStr,
          tmpKnapp.v, tmpKnapp.t,
          knappar.str, knappar.str);
      }
    }
  }