
//====================================================== styring =================================================================
// 𝘀𝘁𝘆𝗿𝗶𝗻𝗴​⁡
let flytting = {};
function styring() {
  window.addEventListener('resize', oppsett() );

  document.addEventListener('keydown', function (knapp) {
    knapp.preventDefault();
    if (knapp.key === 'ArrowUp' || knapp.key === 'w') {
      flytting['fram'] = true;
    } else if (knapp.key === 'ArrowDown' || knapp.key === 's') {
      flytting['bak'] = true;
    } else if (knapp.key === 'ArrowLeft' || knapp.key === 'a') {
      flytting['venstre'] = true;
    } else if (knapp.key === 'ArrowRight' || knapp.key === 'd') {
      flytting['hogre'] = true;
    } else if (knapp.key === 'r') {
      redskapKobling();
    }
  });
  document.addEventListener('keyup', function tastSlepp(knapp) {
    knapp.preventDefault();
    if (knapp.key === 'ArrowUp' || knapp.key === 'w') {
      flytting['fram'] = false;
    } else if (knapp.key === 'ArrowDown' || knapp.key === 's') {
      flytting['bak'] = false;
    } else if (knapp.key === 'ArrowLeft' || knapp.key === 'a') {
      flytting['venstre'] = false;
    } else if (knapp.key === 'ArrowRight' || knapp.key === 'd') {
      flytting['hogre'] = false;
    }
  });
  document.querySelector('#styringFram').addEventListener('mousedown', function skjermTrykkFram(knapp) { knapp.preventDefault(); flytting['fram'] = true; flytting['bak'] = false; }, false);
  document.querySelector('#styringFram').addEventListener('mouseup', function skjermSleppFram(knapp) { knapp.preventDefault(); flytting['fram'] = false; }, false);
  document.querySelector('#styringFram').addEventListener('mouseleave', function skjermSleppFram(knapp) { knapp.preventDefault(); flytting['fram'] = false; }, false);
  document.querySelector('#styringFram').addEventListener('touchstart', function skjermTrykkFram(knapp) { knapp.preventDefault(); flytting['fram'] = true; flytting['bak'] = false; }, false);
  document.querySelector('#styringFram').addEventListener('touchend', function skjermSleppFram(knapp) { knapp.preventDefault(); flytting['fram'] = false; }, false);
  document.querySelector('#styringBak').addEventListener('mousedown', function skjermTrykkBak(knapp) { knapp.preventDefault(); flytting['bak'] = true; flytting['fram'] = false; }, false);
  document.querySelector('#styringBak').addEventListener('mouseup', function skjermSleppBak(knapp) { knapp.preventDefault(); flytting['bak'] = false; }, false);
  document.querySelector('#styringBak').addEventListener('mouseleave', function skjermSleppBak(knapp) { knapp.preventDefault(); flytting['bak'] = false; }, false);
  document.querySelector('#styringBak').addEventListener('touchstart', function skjermTrykkBak(knapp) { knapp.preventDefault(); flytting['bak'] = true; flytting['fram'] = false; }, false);
  document.querySelector('#styringBak').addEventListener('touchend', function skjermSleppBak(knapp) { knapp.preventDefault(); flytting['bak'] = false; }, false);
  document.querySelector('#styringVenstre').addEventListener('mousedown', function skjermTrykkVenstre(knapp) { knapp.preventDefault(); flytting['venstre'] = true; flytting['hogre'] = false; }, false);
  document.querySelector('#styringVenstre').addEventListener('mouseup', function skjermSleppVenstre(knapp) { knapp.preventDefault(); flytting['venstre'] = false; }, false);
  document.querySelector('#styringVenstre').addEventListener('mouseleave', function skjermSleppVenstre(knapp) { knapp.preventDefault(); flytting['venstre'] = false; }, false);
  document.querySelector('#styringVenstre').addEventListener('touchstart', function skjermTrykkVenstre(knapp) { knapp.preventDefault(); flytting['venstre'] = true; flytting['hogre'] = false; }, false);
  document.querySelector('#styringVenstre').addEventListener('touchend', function skjermSleppVenstre(knapp) { knapp.preventDefault(); flytting['venstre'] = false; }, false);
  document.querySelector('#styringHogre').addEventListener('mousedown', function skjermTrykkHogre(knapp) { knapp.preventDefault(); flytting['hogre'] = true; flytting['venstre'] = false; }, false);
  document.querySelector('#styringHogre').addEventListener('mouseup', function skjermSleppHogre(knapp) { knapp.preventDefault(); flytting['hogre'] = false; }, false);
  document.querySelector('#styringHogre').addEventListener('mouseleave', function skjermSleppHogre(knapp) { knapp.preventDefault(); flytting['hogre'] = false; }, false);
  document.querySelector('#styringHogre').addEventListener('touchstart', function skjermTrykkHogre(knapp) { knapp.preventDefault(); flytting['hogre'] = true; flytting['venstre'] = false; }, false);
  document.querySelector('#styringHogre').addEventListener('touchend', function skjermSleppHogre(knapp) { knapp.preventDefault(); flytting['hogre'] = false; }, false);
  kontroller()
}

//system lokke
function kontroller() {//kjoring
  if(flytting.venstre) { flytting.sving = 'venstre';}
  else if(flytting.hogre) { flytting.sving = 'hogre';}
  else { flytting.sving = 'beint';}

  if (flytting.fram) { oppdaterFart( 'auk'); }
  else if (flytting.bak) { oppdaterFart( 'mink')}
  else { flytting.framBak = flytting.frambak < 0 ?  flytting.frambak -= flytting.friksjon : flytting.frambak += flytting.friksjon; }


  flytt( flytting.framBak, flytting.sving);

  window.requestAnimationFrame(kontroller);
}

function flytt(frambak, sving, svingBilde) {
  ting[aktiv.doning].flytt(frambak, sving, svingBilde);
  sjekkOmByttaRute();
  oppdaterVerden();
}