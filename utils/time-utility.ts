export const UNITS = [{
  short: 'w',
  milliseconds: 5 * 8 * 60 * 60 * 1000
}, {
  short: 'd',
  milliseconds: 8 * 60 * 60 * 1000
}, {
  short: 'h',
  milliseconds: 60 * 60 * 1000
}, {
  short: 'm',
  milliseconds: 60 * 1000
}];

export function formatDuration(timeSpan: number) {
  return UNITS.reduce((str, unit) => {
    const amount = timeSpan / unit.milliseconds;
    if (amount >= 1) {
      const fullUnits = Math.floor(amount);
      const formatted = `${str} ${fullUnits}${unit.short}`;
      timeSpan -= fullUnits * unit.milliseconds;
      return formatted;
    } else {
      return str;
    }
  }, '').trim();
}

export function parseDuration(formattedDuration: string) {
  const pattern = /[\d\.]+\s*[wdhm]/g;
  let timeSpan = 0;
  let result;
  while (result = pattern.exec(formattedDuration)) {
    const chunk = result[0].replace(/\s/g, '');
    let amount = Number(chunk.slice(0, -1));
    let unitShortName = chunk.slice(-1);
    timeSpan += amount * UNITS.find((unit) => unit.short === unitShortName).milliseconds;
  }
  return +timeSpan || null;
}

export function rasterize(timeData: {time: number, weight: number}[], timeFrame: number, 
        quantity: number, now = +new Date(), fill: number = 0, accumulate = false) {
  now = Math.floor(now / timeFrame) * timeFrame;
  let accumulatedValue = 0;
  if (accumulate) {
    timeData = timeData.slice().sort((a, b) => a.time < b.time ? -1 : a.time > b.time ? 1 : 0);
  }
  return timeData.reduce((rasterized: number[], tdata) => {
    accumulatedValue += tdata.weight;
    const index = Math.ceil((now - tdata.time) / timeFrame);
    if (index < quantity) {
      rasterized[index] = accumulate ? accumulatedValue : rasterized[index] || 0 + tdata.weight;
    }
    return rasterized;
  }, Array.from({length: quantity}).fill(fill)).reverse();
}