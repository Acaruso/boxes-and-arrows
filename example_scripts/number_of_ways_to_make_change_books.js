function userFunction(logger) {
    function coins(amount) {
        const arr = [25, 10, 5, 1];

        function inner(amount, i, parentId) {
            const id = logger.newNode(`amount: ${amount}\ncurCoin: ${arr[i]}\n`, parentId);

            if (amount === 0 || i === arr.length - 1) {
                logger.pushLine("-> 1", id);
                return 1;
            }

            const curCoin = arr[i];
            const maxNumCoins = Math.floor(amount / curCoin);
            let numWays = 0;

            for (let numCoins = 0; numCoins <= maxNumCoins; numCoins++) {
                let amountRemaining = amount - (numCoins * curCoin);
                const res = inner(amountRemaining, i + 1, id);
                logger.pushLine(`inner(amount: ${amountRemaining}, curCoin: ${arr[i + 1]}) -> ${res}`, id);
                numWays = numWays + res;
            }

            logger.pushLine(`\n-> ${numWays}`, id);
            return numWays;
        }

        return inner(amount, 0, null);
    }

    // testcases:
    // 100 -> 242
    // 25 -> 13

    const res = coins(25);
    console.log(res);
}

// function userFunction(logger) {
//     function coins(amount) {
//         const arr = [25, 10, 5, 1];
//         let cache = {};

//         function inner(amount, i, parentId) {
//             const id = logger.newNode(`amount: ${amount}\ncurCoin: ${arr[i]}\n`, parentId);

//             const key = `${amount}:${i}`;

//             if (amount === 0 || i === arr.length - 1) {
//                 logger.pushLine("-> 1", id);
//                 return 1;
//             } else if (key in cache) {
//                 logger.pushLine(`-> cache[${key}] = ${cache[key]}`, id);
//                 console.log(`-> cache[${key}] = ${cache[key]}`);
//                 return cache[key];
//             }

//             const curCoin = arr[i];
//             const maxNumCoins = Math.floor(amount / curCoin);
//             let numWays = 0;

//             for (let numCoins = 0; numCoins <= maxNumCoins; numCoins++) {
//                 let amountRemaining = amount - (numCoins * curCoin);
//                 const res = inner(amountRemaining, i + 1, id);
//                 logger.pushLine(`inner(amount: ${amountRemaining}, curCoin: ${arr[i + 1]}) -> ${res}`, id);
//                 numWays = numWays + res;
//             }

//             cache[key] = numWays;

//             logger.pushLine(`\n-> ${numWays}`, id);
//             return numWays;
//         }

//         return inner(amount, 0, null);
//     }

//     // testcases:
//     // 100 -> 242
//     // 25 -> 13

//     const res = coins(100);
//     console.log(res);
// }
