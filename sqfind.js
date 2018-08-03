const getRandom = (i) => Math.round(Math.random(i) + 0.2);
const a = Array(100).fill().map(() => Array.from(Array(100), (x, i) => getRandom(i)));
console.log(a);
let pos = {i:0, j:0};

let maxArrayDimension = 0;

const checkSq = function(i1, i2, j1, j2) {
    if (i2 > a.length - 1 || j2 > a[0].length - 1)
        return false;
    let r = a[i2].slice(j1, j2+1);
    let c = a.map(m => m[j2]).slice(i1, i2+1);
    //console.log('row', r, r.every(m => m===1), 'col', c, c.every(m => m===1));
    //console.log('pos', a[i1], a[i1][j1], 'arguments', [...arguments].join(','));
    return (i2 < a.length && j2 < a[0].length) ?
        (a[i2].slice(j1, j2+1).every(m => m===1)) && a.map(m => m[j2]).slice(i1, i2+1).every(m => m===1) : false;
};

const getNext = function(i=0, j=0) {
    const l = a[0].length;
    let index = i*l + j;
    index += flattenArray.slice(index).findIndex(a => a === 1);
    return {i: index/l >> 0, j: index % l};
};

const flattenArray = a.reduce((acc, v) => [...acc, ...v]);

const getArrayDimension = function(pos) {
    let c = 1;
    while (checkSq(pos.i, pos.i+c, pos.j, pos.j+c)) {
        c++;
    }
    if (c > maxArrayDimension) {
        maxArrayDimension = c;
        console.log('new max dimension', maxArrayDimension, 'pos:', pos);
    }
    return c;
};

while (true) {
    pos = getNext(pos.i,pos.j);
    if (pos.i < 0 || pos.i >= a.length - 1)
        break;
    pos.j += getArrayDimension(pos);
    if (pos.j >= a[0].length) {
        pos.i++;
        if (pos.i + maxArrayDimension >= a.length)
            break;
        pos.j=0;
    }
}

console.log('max dimension', maxArrayDimension);