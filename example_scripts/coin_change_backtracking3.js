// https://leetcode.com/problems/coin-change/

// You are given an integer array `coins` representing coins of different denominations and an integer `amount` representing a total amount of money.

// Return the fewest number of coins that you need to make up that amount. If that amount of money cannot be made up by any combination of the coins, return -1.

// You may assume that you have an infinite number of each kind of coin.

function userFunction(logger) {
    function logEntrypoint(i, amount, parentId) {
        let str = `helper(${i}, ${amount})\n`
        const id = logger.newNode(str, parentId);
        return id;
    }

    function logReturn(val, id) {
        logger.appendToNode("\n \n-> " + val, id);
    }

    function append(val, id) {
        logger.appendToNode("\n" + val, id);
    }

    const MAX_INT = Number.MAX_SAFE_INTEGER;

    function coinChange(coins, amount) {

        function helper({ i, amount, parentId, coinsUsed }) {
            const id = logEntrypoint(i, amount, parentId);

            let res = { found: false, numCoins: MAX_INT, coinsUsed: { ...coinsUsed } };

            if (amount === 0) {
                res.found = true;
                res.numCoins = 0;
                logReturn(JSON.stringify(res), id);
                return res;
            } else if (i >= coins.length) {
                logReturn(JSON.stringify(res), id);
                return res;
            } else {
                const curCoin = coins[i];
                let curCoinsUsed = {};
                const maxNumCurCoins = Math.floor(amount / curCoin);

                for (let numCurCoins = 0; numCurCoins <= maxNumCurCoins; numCurCoins++) {
                    const recurRes = helper({
                        i: i + 1,
                        amount: amount - (numCurCoins * curCoin),
                        parentId: id,
                        coinsUsed: { ...coinsUsed },
                    });

                    append(`helper(${i + 1}, ${amount - (numCurCoins * curCoin)})`, id);
                    append("-> " + JSON.stringify(recurRes) + " \n ", id);

                    if (recurRes.found === true) {
                        res.found = true;

                        if (recurRes.numCoins + numCurCoins < res.numCoins) {
                            curCoinsUsed = {};
                            curCoinsUsed[curCoin] = numCurCoins
                            console.log('coinsUsed')
                            console.log(curCoinsUsed)
                        }

                        // res.numCoins represents the current minimum we've seen
                        res.numCoins = Math.min(res.numCoins, recurRes.numCoins + numCurCoins);
                    }
                }

                res.coinsUsed = {
                    ...res.coinsUsed,
                    ...curCoinsUsed
                };

                logReturn(JSON.stringify(res), id);
                return res;
            }
        }

        return helper({
            i: 0,
            amount: amount,
            parentId: null,
            coinsUsed: {},
        });
    }

    // const coins = [1, 2, 3];
    // const amount = 10;

    const coins = [1, 2, 3];
    const amount = 6;

    const res = coinChange(coins, amount);
    console.log('res: ' + res.numCoins);
}
