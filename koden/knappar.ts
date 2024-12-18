ramme.knappar.height = skjerm.hoydeKnappar;
ramme.knappar.width = skjerm.bredde;
function oppdaterKnappar () {
  ramme.knappar.height = skjerm.hoydeKnappar;
  ramme.knappar.width = skjerm.bredde;
  teinKnappar();
}

function sjekkOmKnapparErAktivert () {
  //-------------------andre knappar aktivering ---------------
  if (knappar.utAvDoning.vis && knappar.utAvDoning.trykkAktivert) {
    utAvDoning();
    knappar.utAvDoning.trykkAktivert = false;
  } else if (knappar.koblingRedskapFram.vis && knappar.koblingRedskapFram.trykkAktivert) {
    knappar.koblingRedskapFram.trykkAktivert = false;
    redskapKobling('fram')
  } else if (knappar.koblingRedskapBak.vis && knappar.koblingRedskapBak.trykkAktivert) {
    knappar.koblingRedskapBak.trykkAktivert = false;
    redskapKobling('bak')
  } else if (knappar.aktiverRedskapFram.vis && knappar.aktiverRedskapFram.trykkAktivert) {
    knappar.aktiverRedskapFram.trykkAktivert = false;
    aktiverRedskap('fram')
  } else if (knappar.aktiverRedskapBak.vis && knappar.aktiverRedskapBak.trykkAktivert) {
    knappar.aktiverRedskapBak.trykkAktivert = false;
    aktiverRedskap('bak')
  } else if (knappar.velgFro.vis && knappar.velgFro.trykkAktivert) {
    knappar.velgFro.trykkAktivert = false;
    if(doning.redskap.bak !== null){oppdaterValgtLast(doning.redskap.bak, 'velgFro') }
  }
}

// 𝘀𝘁𝘆𝗿𝗶𝗻𝗴​⁡ tastatur
function styring() {
    document.addEventListener('keydown', function (knapp) {
      knapp.preventDefault();
      if (knapp.key === 'ArrowUp' || knapp.key === 'w') {
        knappar.fram.trykkAktivert = true;
        knappar.bak.trykkAktivert = false;
      } else if (knapp.key === 'ArrowDown' || knapp.key === 's') {
        knappar.bak.trykkAktivert = true;
        knappar.fram.trykkAktivert = false;
      } else if (knapp.key === 'ArrowLeft' || knapp.key === 'a') {
        knappar.venstre.trykkAktivert = true;
        knappar.hogre.trykkAktivert = false;
      } else if (knapp.key === 'ArrowRight' || knapp.key === 'd') {
        knappar.hogre.trykkAktivert = true;
        knappar.venstre.trykkAktivert = false;
      } else if (knapp.key === 'f') {
        knappar.koblingRedskapFram.trykkAktivert = true;
      } else if (knapp.key === 'r') {
        knappar.koblingRedskapBak.trykkAktivert = true;
      } else if (knapp.key === 'g') {
        knappar.aktiverRedskapFram.trykkAktivert = true;
      } else if (knapp.key === 't') {
        knappar.aktiverRedskapBak.trykkAktivert = true;
      } else if (knapp.key === 'e') {
        knappar.utAvDoning.trykkAktivert = true;
      } 
      flagg.push('animasjon');
    });
    document.addEventListener('keyup', function tastSlepp(knapp) {
      knapp.preventDefault();
      if (knapp.key === 'ArrowUp' || knapp.key === 'w') {
        knappar.fram.trykkAktivert = false;
      } else if (knapp.key === 'ArrowDown' || knapp.key === 's') {
        knappar.bak.trykkAktivert = false;
      } else if (knapp.key === 'ArrowLeft' || knapp.key === 'a') {
        knappar.venstre.trykkAktivert = false;
      } else if (knapp.key === 'ArrowRight' || knapp.key === 'd') {
        knappar.hogre.trykkAktivert = false;
      }
      flagg.push('animasjon');

    });
  
    ramme.skjerm.addEventListener("touchstart", (e) => { e.preventDefault(); klikkMus(e, 'touch', true) }, false);
    ramme.skjerm.addEventListener("touchend", (e) => { e.preventDefault(); klikkMus(e, 'touch', false) }, false);
    ramme.skjerm.addEventListener("mousedown", (e) => { e.preventDefault(); klikkMus(e, 'mus', true) }, false);
    ramme.skjerm.addEventListener("mouseup", (e) => { e.preventDefault(); klikkMus(e, 'mus', false) }, false);
    ramme.skjerm.addEventListener("mouseleave", (e) => { e.preventDefault(); klikkMus(e, 'mus', false) }, false);
  }
  
  //--------------------------------------KNAPPAR------------------------------------
  
  function klikkMus(pos:any, type:'mus'|'touch', trykk:boolean) {
  
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
  
  function sjekkKnappar(mus:any, trykk:boolean) {
    mus[1] -= skjerm.startHoydeKnappar;
    if (aktivSkjerm.verden) {
      for (let k = 0; k < knappar.liste.length; k++) {
        if (knappar[knappar.liste[k]].vis === false) { continue; }//ikkje sjekk knappar som ikkje er aktive
        if ((mus[0] > knappar[knappar.liste[k]].v && mus[0] < knappar[knappar.liste[k]].h) && (mus[1] > knappar[knappar.liste[k]].t && mus[1] < knappar[knappar.liste[k]].b)) {
          knappar[knappar.liste[k]].trykkAktivert = trykk;
          console.log(knappar.liste[k]+' aktivert '+ knappar[knappar.liste[k]].trykkAktivert);

        }
      }
    }
    // else if (aktivSkjerm.butikk) {
    //  for (let k = 0; k < butikkKnappar.length; k++) {
    //    if ((mus[0] > butikkKnappar[k].v && mus[0] < butikkKnappar[k].h) && (mus[1] > butikkKnappar[k].t && mus[1] < butikkKnappar[k].b)) {
    //    }
    //  }
    //}
  }
  
  function teinKnappar() {
    knappar.utAvDoning.vis = doning.type === 'bonde' ? false : true;
    knappar.velgFro.vis = (doning.redskap.bak !== null && doning.redskap.bak.arbeid.type === 'samaskin') ? true : false,
    knappar.koblingRedskapFram.vis = doning.redskap.fram === null ? false : true;
    knappar.aktiverRedskapFram.vis = doning.redskap.fram === null ? false : true;
    knappar.koblingRedskapBak.vis = doning.redskap.bak === null ? false : true;
    knappar.aktiverRedskapBak.vis = doning.redskap.bak === null ? false : true;
  
    lerret.knappar.beginPath();
    lerret.knappar.fillStyle = '#000';
    lerret.knappar.fillRect(0, 0, skjerm.bredde, skjerm.startHoydeKnappar);
    if ((knappar.liste.length * knappar.str) > skjerm.bredde) {//to linjer med knappar
      knappar.fram.v = (knappar.marg + knappar.str * 0);
      knappar.bak.v = (knappar.marg + knappar.str * 0);
      knappar.koblingRedskapFram.v = (knappar.marg + knappar.str * 2);
      knappar.aktiverRedskapFram.v = (knappar.marg + knappar.str * 1);
      knappar.utAvDoning.v = (knappar.marg + knappar.str * 3);
      knappar.velgFro.v = (knappar.marg + knappar.str * 4);
      knappar.koblingRedskapBak.v = skjerm.bredde - (knappar.marg + knappar.str * 2);
      knappar.aktiverRedskapBak.v = skjerm.bredde - (knappar.marg + knappar.str * 1);
      knappar.venstre.v = skjerm.bredde - (knappar.marg + knappar.str * 2);
      knappar.hogre.v = skjerm.bredde - (knappar.marg + knappar.str * 1);
  
      knappar.fram.t = knappar.marg / 2;
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
      knappar.velgFro.v = (knappar.marg + knappar.str * 7);
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
  
        lerret.knappar.drawImage(document.getElementById('knappar') as CanvasImageSource,
          tmpKnapp.ikonNr * knappar.ikonStr, 0,
          knappar.ikonStr, knappar.ikonStr,
          tmpKnapp.v, tmpKnapp.t,
          knappar.str, knappar.str);
      }
    }
  }

  //====================================================== knapp ======================================================================

function endreKnapp(hendelse:'vis'|'fjern'|'visAktiv'|'visPassiv', knapp:KnapparTypar) {

  if (hendelse === "vis") {
    knappar[knapp].vis = true;
  } else if (hendelse === "fjern") {
    knappar[knapp].vis = false;

  } else if (hendelse === "visAktiv") {
    knappar[knapp].visAktiv = true;
  } else if (hendelse === "visPassiv") {
    knappar[knapp].visAktiv = false;
  }

}