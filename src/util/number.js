export function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

// from: https://javascript.ru/php/number_format
export function formatNumber(number, decimals, decimalsPoint, thousandsSeparator) {
    let i, j, kw, kd, km;
    if (isNaN(decimals = Math.abs(decimals))) {
        decimals = 2;
    }
    if (decimalsPoint === undefined) {
        decimalsPoint = ",";
    }
    if (thousandsSeparator === undefined) {
        thousandsSeparator = ".";
    }
    i = parseInt(number = (+number || 0).toFixed(decimals)) + "";
    if ((j = i.length) > 3) {
        j = j % 3;
    } else {
        j = 0;
    }
    km = (j ? i.substr(0, j) + thousandsSeparator : "");
    kw = i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + thousandsSeparator);
    kd = (decimals ? decimalsPoint + Math.abs(number - i).toFixed(decimals).replace(/-/, 0).slice(2) : "");
    return km + kw + kd;
}

