const n = 16;

function toString(x) {
    let str = "";
    let bit = 1;

    for (let i = 0; i < n; i++) {
        if ((x & bit) !== 0) {
            str = "1" + str;
        } else {
            str = "0" + str;
        }
        bit = bit << 1;
    }

    return str;
}

function fromString(str) {
    let x = 0;
    let bit = 1;
    for (let i = str.length - 1; i >= 0; i--) {
        if (str[i] === "1") {
            x = x | bit;
        }
        bit = bit << 1;
    }
    return x;
}

function log(s, x) {
    console.log(`${s}: \n${toString(x)}`)
}

function getNextLargest(x) {
    let numTrailingZeros = 0;
    let numOnes = 0;
    let bit = 1;

    while ((x & bit) === 0) {
        numTrailingZeros++;
        bit = bit << 1;
    }

    while ((x & bit) !== 0) {
        numOnes++;
        bit = bit << 1;
    }

    if (bit === (1 << n)) {
        return -1;
    }

    x = x | bit;

    x = x & ~(bit - 1);

    let mask = ((1 << (numOnes - 1)) - 1);

    x = x | mask;

    return x;
}

function getNextSmallest(x) {
    let numTrailingOnes = 0;
    let numZeros = 0;
    let bit = 1;

    while ((x & bit) !== 0) {
        numTrailingOnes++;
        bit = bit << 1;
    }

    while ((x & bit) === 0) {
        numZeros++;
        bit = bit << 1;
    }

    if (bit === (1 << n)) {
        return -1;
    }

    x = x & ~bit;

    x = x & ~(bit - 1);

    let mask = ((1 << (numTrailingOnes + 1)) - 1) << (numZeros - 1);

    x = x | mask;

    return x;
}

let x = fromString("0010011110000011");
let nextSmallest = getNextSmallest(x);
log("x", x);
console.log("nextSmallest:");
console.log(toString(nextSmallest));

console.log("");

let x2 = fromString("0011011001111100");
let nextLargest = getNextLargest(x2);

log("x2", x2);
console.log("nextLargest:");
console.log(toString(nextLargest));
