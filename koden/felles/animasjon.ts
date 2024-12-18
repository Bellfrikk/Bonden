"use strict";
//====================================================== ANIMASJON ======================================================================



function animerDekk(denneAnim: AnimasjonDekk, denneKlipp:Posisjon, dennePosMidt:PosisjonMidtMal ) {
  denneKlipp.x += Math.hypot(dennePosMidt.fx, dennePosMidt.fy);
  if (denneKlipp.x > denneAnim.maksX) {
    denneKlipp.x = denneAnim.minX;
  } else if (denneKlipp.x < denneAnim.minX) {
    denneKlipp.x = denneAnim.maksX;
  }
}
function animerSving(svingRetning:'beint'|'hogre'|'venstre', del:GrafikkDelSving) {
  del.retning = del.animasjonSving[svingRetning];
}

function animerKlipp(grafikkDel: GrafikkDelKlipp, retning: number, nullstill: boolean) {
  const denneAnim = grafikkDel.animasjonKlipp;
  const denneKlipp = grafikkDel.klippPos;
  if (denneAnim.repitisjonar === 'evig') {
    if (retning === 1) {
      denneKlipp.x = (denneKlipp.x + denneAnim.Xhopp > denneAnim.Xmaks) ? denneAnim.Xstart : denneKlipp.x + denneAnim.Xhopp;
      denneKlipp.y = (denneKlipp.y + denneAnim.Yhopp > denneAnim.Ymaks) ? denneAnim.Ystart : denneKlipp.y + denneAnim.Yhopp;
    } else {
      denneKlipp.x = (denneKlipp.x - denneAnim.Xhopp < denneAnim.Xstart) ? denneAnim.Xmaks : denneKlipp.x - denneAnim.Xhopp;
      denneKlipp.y = (denneKlipp.y - denneAnim.Yhopp < denneAnim.Ystart) ? denneAnim.Ymaks : denneKlipp.y - denneAnim.Yhopp;
    }
  } else if (denneAnim.status < denneAnim.repitisjonar) {
    denneKlipp.x += (denneAnim.Xhopp * retning);
    denneKlipp.y += (denneAnim.Yhopp * retning);
  } else {
    if (nullstill) { denneAnim.status = 0; }
    return false;
  }
  denneAnim.status++;
  return true;
}

function animerStorrelse(grafikkDel: GrafikkDelStrX|GrafikkDelStrY, anim: AnimasjonStr, xy: 'x' | 'y', vei: number, nullstill: boolean) {
  if ((vei > 0 && anim.status >= anim.tid) || (vei < 0 && anim.status <= 0)) {
    if (nullstill) { anim.status = 0; }
    return false;
  } else {
    grafikkDel.str[xy] += anim.str / anim.tid * vei;
    grafikkDel.klippPos[xy] -= anim.str / anim.tid * vei / 2;
    anim.status += vei;
    flagg.push('teinMaskinar');
    return true;
  }
}

function animerPosisjon( grafikkDel: GrafikkDelPos, vei: 1 | -1, nullstill: boolean) {
  const anim = grafikkDel.animasjonPos;
  if ((vei > 0 && anim.status >= anim.tid) || (vei < 0 && anim.status <= 0)) {
    if (nullstill) { anim.status = 0; }
    return false;
  } else {
    grafikkDel.pos.x += anim.x / anim.tid * vei;
    grafikkDel.pos.y += anim.y / anim.tid * vei;
    anim.status += vei;
    flagg.push('teinMaskinar');
    return true;
  }
}

function animerRetning(grafikkDel: GrafikkDelRetning, vei: number, nullstill: boolean):boolean {
  const anim = grafikkDel.animasjonRetning;
  if ((vei > 0 && anim.status >= anim.tid) || (vei < 0 && anim.status <= 0)) {
    if (nullstill) { anim.status = 0; }
    return false;
  } else {
    grafikkDel.retning += anim.retning / anim.tid * vei;
    anim.status += vei;
    flagg.push('teinMaskinar');
    return true;
  }
}

function oppdaterLastStrAnimasjon(denne: Maskin, del: GrafikkDelLast, last: EiLast) {
    del.str.y = (last.niva === 0) ? 0 : Math.floor((last.niva + del.animasjonLast.startY) / last.maks * del.animasjonLast.maksY);
    del.str.x = (last.niva === 0) ? 0 : Math.floor((last.niva + del.animasjonLast.startX) / last.maks * del.animasjonLast.maksX);
    flagg.push('teinMaskinar');
}

function oppdaterLastKlippAnimasjon(grafikkDeler: AnimasjonKlipp[], last: EiLast) {
    grafikkDeler.forEach(del => {
        del.status = Math.floor((last.niva / last.maks * del.Xmaks) - 1);
        flagg.push('teinMaskinar');
    });  
}