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
    losseDoning.last.lastData.drivstoff.niva += mengde;
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
    let lastPlass = mottakPlass.last.lastData[lastType].lastTilDoning ? doning : mottakPlass; //sjekk kor lasta er plassert redskap/doning
    lastPlass.last.lastData[lastType].niva += mengde;
    aktiverDenneFunksjonane('lastAnimasjon', mottakPlass, lastType);
    flagg.push('lastErEndra');
    // sjekk om det skal lossast fra losseplass og loss
    if (mottakPlass === null || mottakPlass.last.lastData[lastType].mottak.evigLager) {
        return true;
    }
    lastPlass = mottakPlass.last.lastData[lastType].lastTilDoning ? doning : mottakPlass; //sjekk kor lasta er plassert redskap/doning
    lastPlass.last.lastData[lastType].niva += -mengde; //inverter mengde for lossePlass
    aktiverDenneFunksjonane('lastAnimasjon', mottakPlass, lastType);
    return true;
}
function sjekkOmPlass(denne, lastType, mengde) {
    if (mengde === null) {
        return true;
    } //ikkje sjekk nivå dersom den ikkje bruker last
    let lastPlass = denne.last.lastData[lastType].lastTilDoning ? doning : denne; //sjekk kor lasta er plassert redskap/doning
    if (lastPlass.last.lastData[lastType].mottak.evigLager) {
        return true;
    }
    if (mengde < 0 && (lastPlass.last.lastData[lastType].niva + mengde) >= 0) {
        return true;
    }
    if (mengde > 0 && (lastPlass.last.lastData[lastType].niva + mengde) <= lastPlass.last.lastData[lastType].maks) {
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
                if (erPaPlass && !denneMottak.last.mottar.includes(last)) {
                    if (last === 'korn') {
                        flagg.push('kornLevering');
                    }
                    if (last === 'fro') {
                        flagg.push('froLevering');
                    }
                    denneDoning.last.lastData[last].levering.losserTil = denneMottak;
                }
                else if (erPaPlass && !denneMottak.last.leverer.includes(last)) {
                    if (last === 'drivstoff') {
                        flagg.push('drivstoffMottaking');
                    }
                    denneDoning.last.lastData[last].mottak.losserFra = denneMottak;
                }
            }
        }
    }
}
/**
 * sjekk om lossepunkt er plassert på rute
 * return true visst det er match
 */
function sjekkOmLossepunktErPaPlass(mottakar, leverar, last) {
    oppdaterLossePunktPos(leverar, last);
    if (mottakar.krasj.losseSider === null) {
        return;
    }
    for (let s = 0; s < mottakar.krasj.losseSider.length; s++) {
        if (linjeSjekk(leverar.pos.midt, leverar.pos.lossePunkt[last], mottakar.krasj.losseSider[s][0], mottakar.krasj.losseSider[s][1])) { //sjekk om linje frå denne midt til denne lossePunkt krysse ei linje til losseplassen sine sider. gir ture ved treff
            return true;
        }
    }
    return false;
    function oppdaterLossePunktPos(maskin, punkt) {
        maskin.pos.lossePunkt[punkt].x = maskin.pos.midt.x + (maskin.pos.lossePunkt[punkt].dx * Math.cos((Math.PI / 180) * maskin.retning.tmp)) + (maskin.pos.lossePunkt[punkt].dy * Math.sin((Math.PI / 180) * maskin.retning.tmp));
        maskin.pos.lossePunkt[punkt].y = maskin.pos.midt.y + (maskin.pos.lossePunkt[punkt].dx * Math.sin((Math.PI / 180) * maskin.retning.tmp)) + (maskin.pos.lossePunkt[punkt].dy * Math.cos((Math.PI / 180) * maskin.retning.tmp));
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
