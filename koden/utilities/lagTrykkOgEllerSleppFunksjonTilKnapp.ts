
/**
 * Legger til eventlitener for trykk og/eller slepp på en knapp.
 * @param {HTMLElement} ting - Knappen som skal ha eventlitener.
 * @param {Function} trykkFunksjon - Funksjon som skal kjøres når knappen trykkes.
 * @param {Function} sleppFunksjon - Funksjon som skal kjøres når knappen slippes.
 * @returns {void} - Returnerer ingenting.
 */

function leggtilTrykkOgSleppHandling(ting: HTMLElement, trykkFunksjon: (() => void) | null, sleppFunksjon: (() => void) | null): void {
  if (!ting) {
    console.error("Funksjonen leggtilTrykkOgSleppHandling tar kun inn et HTMLElement som første argument.");
    return;
  } else if (trykkFunksjon === null && sleppFunksjon === null) {
    console.error(`Funksjonen leggtilTrykkOgSleppHandling lager ingen events for: ${ting}`);
    return;
  }
  if (trykkFunksjon !== null && typeof trykkFunksjon === 'function') {
    ting.addEventListener('mousedown', function (e) { e.preventDefault(); trykkFunksjon(); });
    ting.addEventListener('touchstart', function (e) { e.preventDefault(); trykkFunksjon(); });
  }

  if (sleppFunksjon !== null && typeof sleppFunksjon === 'function') {
    ting.addEventListener('mouseup', function (e) { e.preventDefault(); sleppFunksjon(); });
    ting.addEventListener('mouseout', function (e) { e.preventDefault(); sleppFunksjon(); });
    ting.addEventListener('mouseleave', function (e) { e.preventDefault(); sleppFunksjon(); });
    ting.addEventListener('touchend', function (e) { e.preventDefault(); sleppFunksjon(); });
    ting.addEventListener('touchcancel', function (e) { e.preventDefault(); sleppFunksjon(); });
  }
}