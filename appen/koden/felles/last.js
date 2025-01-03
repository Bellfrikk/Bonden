"use strict";
//====================================================== Last ======================================================================
/**fyll drivstoff
 * @param {object} losseDoning
 * @param {number} mengde
 */
function fyllDrivstoff(losseDoning, mengde) {
    if (!sjekkOmPlass(losseDoning, 'drivstoff', mengde)) {
        return;
    }
    if (!oppdaterPeng(pris.drivstoff * mengde)) {
        return;
    }
    losseDoning.last.laster.drivstoff.niva += mengde;
    flagg.push('topplinjeEndra', 'drivstoffMottaking');
}
/**Juster last ved bruk eller lossing.
 * @param {object} losseDoning
 * @param {object} lossePlass
 * @param {string} lastType(korn, gras, drivstoff...)
 * @param {number} mengde Positiv mengde betyr TIL doning, negativ FRÅ doning.
 * @returns true når last er utført
 */
function oppdaterLast(losseDoning, mottakPlass, lastType, mengde) {
    //sjekk om plass i losse doning og plass
    if (sjekkOmPlass(losseDoning, lastType, mengde) === false) {
        return false;
    }
    if (sjekkOmPlass(mottakPlass, lastType, -mengde) === false) {
        return false;
    } //inverter mengde for lossePlass
    // sjekk kor last fra og loss
    let lastPlass = mottakPlass.last.laster[lastType].lastTilDoning ? doning : mottakPlass; //sjekk kor lasta er plassert redskap/doning
    lastPlass.last.laster[lastType].niva += mengde;
    aktiverDenneFunksjonane('lastAnimasjon', mottakPlass, lastType);
    flagg.push('lastErEndra');
    // sjekk om det skal lossast fra losseplass og loss
    if (mottakPlass === null || mottakPlass.last.laster[lastType].mottak.evigLager) {
        return true;
    }
    lastPlass = mottakPlass.last.laster[lastType].lastTilDoning ? doning : mottakPlass; //sjekk kor lasta er plassert redskap/doning
    lastPlass.last.laster[lastType].niva += -mengde; //inverter mengde for lossePlass
    aktiverDenneFunksjonane('lastAnimasjon', mottakPlass, lastType);
    return true;
}
function sjekkOmPlass(denne, lastType, mengde) {
    if (mengde === null) {
        return true;
    } //ikkje sjekk nivå dersom den ikkje bruker last
    let lastPlass = denne.last.laster[lastType].lastTilDoning ? doning : denne; //sjekk kor lasta er plassert redskap/doning
    if (lastPlass.last.laster[lastType].mottak.evigLager) {
        return true;
    }
    if (mengde < 0 && (lastPlass.last.laster[lastType].niva + mengde) >= 0) {
        return true;
    }
    if (mengde > 0 && (lastPlass.last.laster[lastType].niva + mengde) <= lastPlass.last.laster[lastType].maks) {
        return true;
    }
    return false;
}
function oppdaterValgtLast(denne, hendelse) {
    if (hendelse === 'velgFro') {
        aktiverDoningFunksjonane('velgFro');
        flagg.push('teinMaskinar');
    }
}
function sjekkOmLossing() {
    //sjekk om lossing frå aktive doning og redskap
    if (doning.last.mottar !== null) {
        sjekkIAktiveRuter(doning);
    }
    ;
    if (doning.redskap.fram !== null && doning.redskap.fram.last.mottar !== null) {
        sjekkIAktiveRuter(doning.redskap.fram);
    }
    ;
    if (doning.redskap.bak !== null && doning.redskap.bak.last.mottar !== null) {
        sjekkIAktiveRuter(doning.redskap.bak);
    }
    ;
    //sjekk om lossing mot ting som er i aktive liste /nærheten
    function sjekkIAktiveRuter(denneDoning) {
        for (let b = 0; b < doning.rute.tilSjekk.length; b++) { //sjekk gjennom alle ting i aktiv liste
            let denneMottak = doning.rute.tilSjekk[b];
            for (let a = 0; a < denneDoning.last.leverer.length; a++) { //sjekk gjennom alle lossepunkt til doning eller redskap
                let last = denneDoning.last.leverer[a];
                const erPaPlass = sjekkOmLossepunktErPaPlass(denneMottak, denneDoning, last);
                if (erPaPlass) {
                    if (last === 'korn') {
                        flagg.push('kornLevering');
                    }
                    if (last === 'fro') {
                        flagg.push('froLevering');
                    }
                    denneDoning.last.laster[last].levering.losserTil = denneMottak;
                }
                else if (erPaPlass && !denneMottak.last.leverer.includes(last)) {
                    if (last === 'drivstoff') {
                        flagg.push('drivstoffMottaking');
                    }
                    denneDoning.last.laster[last].mottak.losserFra = denneMottak;
                }
            }
        }
    }
}
/**
 * sjekk om lossepunkt er plassert på rute
 * return true visst det er match
 */
function sjekkOmLossepunktErPaPlass(mottakar, leverar, denneLast) {
    if (!mottakar.last.laster.denneLast) {
        return false;
    }
    let mottakPlass = mottakar.last.laster[denneLast].mottak.plass;
    if (mottakPlass !== null && mottakar.last.mottar.includes(denneLast) && leverar.last.laster[denneLast].levering.punkt !== null) {
        oppdaterLossePunktPos(leverar, leverar.last.laster[denneLast].levering.punkt);
        for (let s = 0; s < mottakPlass.length; s++) {
            if (linjeSjekk(leverar.pos.midt, leverar.pos.lossePunkt[denneLast], mottakPlass[s][0], mottakPlass[s][1])) { //sjekk om linje frå denne midt til denne lossePunkt krysse ei linje til losseplassen sine sider. gir ture ved treff
                return true;
            }
        }
    }
    return false;
    function oppdaterLossePunktPos(maskin, punkt) {
        punkt.x = maskin.pos.midt.x + (punkt.dx * Math.cos((Math.PI / 180) * maskin.retning.tmp)) + (punkt.dy * Math.sin((Math.PI / 180) * maskin.retning.tmp));
        punkt.y = maskin.pos.midt.y + (punkt.dx * Math.sin((Math.PI / 180) * maskin.retning.tmp)) + (punkt.dy * Math.cos((Math.PI / 180) * maskin.retning.tmp));
    }
}
/**================================================== oppdaterPeng ======================================================================
 * @param {number} pris positive tal
 * @returns true visst du har råd
 */
function oppdaterPeng(pris) {
    //test
    if (pris > peng) {
        alert("For lite mengar");
        return false;
    }
    else {
        peng -= pris;
        return true;
    }
    flagg.push('topplinjeEndra');
}
