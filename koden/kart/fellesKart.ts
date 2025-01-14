type Kart = {
  startPeng:number;
  antalRuter: {x:number, y:number};
  storrelseRuter: {x:number, y:number};
  landskap: LandskapTypeData;
  ting:     any[],
  maskinar: any[],
}

type LandskapTypeData = Record<string,LandskapType>;