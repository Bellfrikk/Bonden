"use strict";
let tingListe = [];
const tingBilde = document.getElementById('bildeTing');
let ting = {};
function lagTing(klasse, modell, rute) {
    const id = modell.type + tingListe.filter(tingen => tingen.includes(modell.type)).length;
    ting[id] = new klasse(modell, rute);
    tingListe.push(id);
    flagg.push('teinTing');
    oppdaterPoisjonar(ting[id], 'direkte');
}
function slettTing(denne) {
    flagg.push('teinTing');
}
function teinAlleTing() {
    ramme.ting.height = skjerm.botn;
    ramme.ting.width = skjerm.hogre;
    let tegneliste = [];
    for (let denneTingNavn in ting) {
        let denneTing = ting[denneTingNavn];
        for (let denneDelNavn in denneTing.grafikk) {
            let denneDel = denneTing.grafikk[denneDelNavn];
            if (denneDel.skalVise) {
                if (denneDel.tegneRekkefolge === 'over') {
                    tegneliste.push([denneTing, denneDel]);
                }
                else if (denneDel.tegneRekkefolge === 'under') {
                    tegneliste.unshift([denneTing, denneDel]);
                }
            }
        }
    }
    tegneliste.forEach(del => { teinTingEllerMaskin(lerret.ting, tingBilde, del[0], del[1]); });
}
