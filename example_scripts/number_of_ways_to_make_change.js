function userFunction(logger) {

    // inital solution:

    // function coins(n, arr) {
    //     let count = 0;

    //     function inner(amount, i, parentId) {
    //         const id = logger.newNode(`inner(${amount}, ${i})\n`, parentId);

    //         const curCoin = arr[i];
    //         logger.pushLine(`curCoin: ${curCoin}\n`, id);
    //         const maxNumCoins = Math.floor(amount / curCoin);

    //         for (let numCoins = 0; numCoins <= maxNumCoins; numCoins++) {
    //             if (amount - (numCoins * curCoin) === 0) {
    //                 logger.pushLine("count++", id);
    //                 count++;
    //             } else if (i + 1 < arr.length) {
    //                 logger.pushLine(`inner(${amount - (numCoins * curCoin)}, ${i + 1})`, id);
    //                 inner(amount - (numCoins * curCoin), i + 1, id);
    //             }
    //         }
    //     }

    //     inner(n, 0, null);

    //     return count;
    // }



    // refactored to check conditions at beginning of fn call rather than before making fn call:

    // function coins(n, arr) {
    //     let count = 0;

    //     function inner(amount, i, parentId) {
    //         const id = logger.newNode(`inner(${amount}, ${i})\n`, parentId);

    //         if (amount === 0) {
    //             logger.pushLine(`count++`, id);
    //             count++;
    //             return;
    //         } else if (i >= arr.length) {
    //             return;
    //         }

    //         const curCoin = arr[i];
    //         logger.pushLine(`curCoin: ${curCoin}\n`, id);
    //         const maxNumCoins = Math.floor(amount / curCoin);

    //         for (let numCoins = 0; numCoins <= maxNumCoins; numCoins++) {
    //             logger.pushLine(`numCoins: ${numCoins}`, id);
    //             logger.pushLine(`inner(${amount - (numCoins * curCoin)}, ${i + 1})`, id);
    //             // logger.pushLine("test", id);
    //             inner(amount - (numCoins * curCoin), i + 1, id);
    //         }
    //     }

    //     inner(n, 0, null);

    //     return count;
    // }



    // refactored to make it more easy to memoize:

    // function coins(n, arr) {
    //     function inner(amount, i, parentId) {
    //         const id = logger.newNode(`inner(${amount}, ${i})\n`, parentId);

    //         if (amount === 0) {
    //             logger.pushLine(`count++`, id);
    //             return 1;
    //         } else if (i >= arr.length) {
    //             return 0;
    //         }

    //         const curCoin = arr[i];
    //         logger.pushLine(`curCoin: ${curCoin}\n`, id);
    //         const maxNumCoins = Math.floor(amount / curCoin);
    //         let numWays = 0;

    //         for (let numCoins = 0; numCoins <= maxNumCoins; numCoins++) {
    //             logger.pushLine(`numCoins: ${numCoins}`, id);
    //             logger.pushLine(`inner(${amount - (numCoins * curCoin)}, ${i + 1})`, id);
    //             numWays += inner(amount - (numCoins * curCoin), i + 1, id);
    //         }

    //         return numWays;
    //     }

    //     return inner(n, 0, null);
    // }



    // actually add memoization:

    // function coins(n, arr) {
    //     let cache = {};

    //     function inner(amount, i, parentId) {
    //         const id = logger.newNode(`inner(amount: ${amount}, curCoin: ${getCurCoin(i)})\n`, parentId);

    //         const key = `${amount}:${i}`;

    //         if (amount === 0) {
    //             logger.pushLine(`-> 1`, id);
    //             return 1;
    //         } else if (i >= arr.length) {
    //             logger.pushLine(`-> 0`, id);
    //             return 0;
    //         } else if (key in cache) {
    //             logger.pushLine(`cache[${key}] = ${cache[key]}`, id);
    //             logger.pushLine(`-> ${cache[key]}`, id);
    //             return cache[key];
    //         }
            
    //         const curCoin = arr[i];
    //         const maxNumCoins = Math.floor(amount / curCoin);
    //         let numWays = 0;

    //         for (let numCoins = 0; numCoins <= maxNumCoins; numCoins++) {
    //             logger.pushLine(`numCoins: ${numCoins}`, id);
    //             let res = inner(amount - (numCoins * curCoin), i + 1, id);
    //             logger.pushLine(`inner(amount: ${amount - (numCoins * curCoin)}, curCoin: ${getCurCoin(i + 1)}) -> ${res}\n`, id);
    //             numWays += res;
    //         }

    //         cache[key] = numWays;
    //         logger.pushLine(`-> ${numWays}`, id);
    //         return numWays;
    //     }

    //     return inner(n, 0, null);
    // }



    function coins(n, arr) {
        let cache = {};

        function inner(amount, i, parentId) {
            const id = logger.newNode(`inner(amount: ${amount}, curCoin: ${getCurCoin(i)})\n`, parentId);

            const key = `${amount}:${i}`;

            if (key in cache) {
                logger.pushLineDetails(`cache[${key}] = ${cache[key]}`, id);
                logger.pushLineDetails(`-> ${cache[key]}`, id);
                console.log(`cache[${key}] = ${cache[key]}`);
                return cache[key];
            }

            const curCoin = arr[i];

            if (curCoin === 1) {
                logger.pushLineDetails(`-> 1`, id);
                return 1;
            }
            
            const maxNumCoins = Math.floor(amount / curCoin);
            let numWays = 0;

            for (let numCoins = 0; numCoins <= maxNumCoins; numCoins++) {
                const newAmount = amount - (numCoins * curCoin);
                const newI = i + 1;
                logger.pushLineDetails(`numCoins: ${numCoins}`, id);
                logger.pushLineDetails(`newAmount: ${newAmount}`, id);

                if (newAmount === 0) {
                    logger.pushLineDetails(`numWays += 1`, id);
                    numWays += 1;
                } else if (newI < arr.length) {
                    const res = inner(newAmount, newI, id);
                    logger.pushLineDetails(`inner(amount: ${newAmount}, curCoin: ${getCurCoin(newI)}) -> ${res}\n`, id);
                    numWays += res;
                }
            }

            cache[key] = numWays;
            logger.pushLineDetails(`\n-> ${numWays}`, id);
            return numWays;
        }

        return inner(n, 0, null);
    }

    function getCurCoin(i) {
        return i < arr.length ? arr[i] : null;
    }

    // testcases:
    // 100 -> 242
    // 25 -> 13

    const arr = [25, 10, 5, 1];
    const res = coins(30, arr);

    // const arr = [3, 2, 1];
    // const res = coins(5, arr);

    console.log(res);
}
