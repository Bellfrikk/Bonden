"use strict";
function lagreKartLokalt(kartData, filnavn) {
    const dataStr = JSON.stringify(kartData);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filnavn;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}
function lagreTilLocalStorage(kartData, nøkkel) {
    const dataStr = JSON.stringify(kartData);
    localStorage.setItem(nøkkel, dataStr);
}
