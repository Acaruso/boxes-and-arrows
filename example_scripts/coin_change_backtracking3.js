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

            let curRes = { found: false, numCoins: MAX_INT };

            if (amount === 0) {
                curRes = { found: true, numCoins: 0 };
                logReturn(JSON.stringify(curRes), id);
                return curRes;
            }

            if (i < coins.length && amount > 0) {
                const curCoin = coins[i];
                const maxNumCurCoins = Math.floor(amount / curCoin);

                for (let numCurCoins = 0; numCurCoins <= maxNumCurCoins; numCurCoins++) {
                    if (numCurCoins * curCoin <= amount) {
                        const res = helper({
                            i: i + 1,
                            amount: amount - (numCurCoins * curCoin),
                            parentId: id,
                            coinsUsed: { ...coinsUsed },
                        });

                        append(`helper(${i + 1}, ${amount - (numCurCoins * curCoin)})`, id);
                        append("-> " + JSON.stringify(res) + " \n ", id);

                        curRes
                        if (res.found) {
                            if (res.numCoins + numCurCoins < curRes.numCoins) {
                                curRes.numCoins = res.numCoins + numCurCoins;
                            }
                            curRes.found = true;
                        }
                    }
                }

                if (curRes.found === false) {
                    logReturn(JSON.stringify(curRes), id);
                    return { found: false, numCoins: 0 };
                } else {
                    logReturn(JSON.stringify(curRes), id);
                    return curRes;
                }
            }

            logReturn(JSON.stringify(curRes), id);
            return curRes;
        }

        return helper({
            i: 0,
            amount: amount,
            parentId: null,
            coinsUsed: {},
        });
    }

    const coins = [1, 2];
    const amount = 10;

    // const coins = [1, 2, 3];
    // const amount = 5;

    const res = coinChange(coins, amount);
    console.log('res: ' + res.numCoins);
}
