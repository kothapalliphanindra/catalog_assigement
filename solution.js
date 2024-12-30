const fs = require('fs');

function decodeValue(base, value) {
    return BigInt(parseInt(value, parseInt(base)));
}

function calculateConstantTerm(points) {
    const n = points.length;
    let secret = BigInt(0);

    for (let i = 0; i < n; i++) {
        let xi = points[i][0];
        let yi = points[i][1];

        let li = BigInt(1);
        for (let j = 0; j < n; j++) {
            if (i !== j) {
                li *= BigInt(-points[j][0]) * BigInt(1) / BigInt(xi - points[j][0]);
            }
        }
        secret += li * yi;
    }
    return secret;
}

function processInput(filePath) {
    const data = JSON.parse(fs.readFileSync(filePath));

    const n = data.keys.n;
    const k = data.keys.k;

    let points = [];

    for (let i = 1; i <= n; i++) {
        if (data[i]) { 
            const base = data[i].base;
            const value = data[i].value;
            const x = parseInt(i);
            const y = decodeValue(base, value);
            points.push([BigInt(x), y]);
        }
    }


    const secretC = calculateConstantTerm(points.slice(0, k));
    
    return secretC;
}


const secretC1 = processInput('testcase1.json');
const secretC2 = processInput('testcase2.json');

console.log(`The constant term c from input1 is: ${secretC1}`);
console.log(`The constant term c from input2 is: ${secretC2}`);





