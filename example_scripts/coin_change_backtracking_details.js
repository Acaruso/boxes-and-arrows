// https://leetcode.com/problems/coin-change/

// You are given an integer array `coins` representing coins of different denominations and an integer `amount` representing a total amount of money.

// Return the fewest number of coins that you need to make up that amount. If that amount of money cannot be made up by any combination of the coins, return -1.

// You may assume that you have an infinite number of each kind of coin.

function userFunction(logger) {
    function logEntrypoint(i, amount, parentId) {
        let str = `helper(i: ${i}, amount: ${amount})\n`
        const id = logger.newNode(str, parentId);
        return id;
    }

    function logReturn(val, id) {
        logger.pushStringDetails("\n \n-> " + val, id);
    }

    function append(val, id) {
        logger.pushStringDetails("\n" + val, id);
    }

    const MAX_INT = Number.MAX_SAFE_INTEGER;

    function coinChange(coins, amount) {

        function helper({ i, amount, parentId }) {
            const id = logEntrypoint(i, amount, parentId);

            let res = { found: false, numCoins: 0, coinsUsed: {} };

            if (amount === 0) {
                res.found = true;
                logReturn(JSON.stringify(res), id);
                return res;
            } else if (i >= coins.length) {
                logReturn(JSON.stringify(res), id);
                return res;
            } else {
                const curCoin = coins[i];
                append(`curCoin: ${curCoin}\n`, id);
                let curMin = MAX_INT;
                let curCoinsUsed = {};

                const maxNumCurCoins = Math.floor(amount / curCoin);

                for (let numCurCoins = 0; numCurCoins <= maxNumCurCoins; numCurCoins++) {
                    append(`used ${numCurCoins}x ${curCoin} coins`, id);
                    append(`new amount: ${amount - (numCurCoins * curCoin)}`, id)
                    const recurRes = helper({
                        i: i + 1,
                        amount: amount - (numCurCoins * curCoin),
                        parentId: id,
                    });

                    append(
                        `helper(i: ${i + 1}, amount: ${amount - (numCurCoins * curCoin)})`,
                        id
                    );
                    append("-> " + JSON.stringify(recurRes) + " \n ", id);

                    if (recurRes.found === true) {
                        res.found = true;
                        if (recurRes.numCoins + numCurCoins < curMin) {
                            curMin = recurRes.numCoins + numCurCoins;

                            curCoinsUsed = { ...recurRes.coinsUsed };

                            if (numCurCoins > 0) {
                                curCoinsUsed[curCoin] = numCurCoins;
                            }
                        }
                    }
                }

                res.numCoins = curMin;
                res.coinsUsed = { ...curCoinsUsed };
                logReturn(JSON.stringify(res), id);
                return res;
            }
        }

        return helper({
            i: 0,
            amount: amount,
            parentId: null,
        });
    }

    // const coins = [1, 2];
    // const amount = 10;

    // const coins = [1, 2, 10];
    // const amount = 10;

    // const coins = [1, 2, 3];
    // const amount = 10;

    // const coins = [1, 2, 3];
    // const amount = 6;

    const coins = [1, 2, 3];
    const amount = 5;

    const res = coinChange(coins, amount);
    console.log('res: ' + res.numCoins);
    console.log(res.coinsUsed);
}
