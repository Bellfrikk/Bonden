"use strict";
;
;
;
;
;
;
;
;
;
;
function teinTingEllerMaskin(detteLerret, bilde, denne, tmpDel) {
    //flytt fokus til midt av maskin og roter riktig
    detteLerret.translate(denne.pos.midt.x, denne.pos.midt.y); //flytt fokus tilmidtpunkt
    detteLerret.rotate(denne.retning.aktiv * Math.PI / 180); //roter verden lik som doning
    //teiner doning
    detteLerret.translate(tmpDel.pos.x, tmpDel.pos.y); //flytt fokus tilmidtpunkt av del
    if (tmpDel.retning !== 0) {
        detteLerret.rotate((tmpDel.retning * Math.PI) / 180);
    } //roter verden likt som del
    detteLerret.drawImage(bilde, tmpDel.klippPos.x, tmpDel.klippPos.y, // velg utsnitt av doningtegning 
    tmpDel.str.x, tmpDel.str.y, //bredde og høyde på utsnitt
    -tmpDel.str.x * tmpDel.midt.x, -tmpDel.str.y * tmpDel.midt.x, //posisjon av tegning
    tmpDel.str.x, tmpDel.str.y);
    if (tmpDel.retning !== null) {
        detteLerret.rotate(-(tmpDel.retning * Math.PI) / 180);
    } //roter verden liks som del
    detteLerret.translate(-tmpDel.pos.x, -tmpDel.pos.y); //flytt fokus talbake fra del
    detteLerret.rotate((denne.retning.aktiv * Math.PI / 180) * -1); //flytt fokus tilbake
    detteLerret.translate(-denne.pos.midt.x, -denne.pos.midt.y); //roter tilbake 
}
