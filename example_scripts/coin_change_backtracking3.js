// https://leetcode.com/problems/coin-change/

// You are given an integer array `coins` representing coins of different denominations and an integer `amount` representing a total amount of money.

// Return the fewest number of coins that you need to make up that amount. If that amount of money cannot be made up by any combination of the coins, return -1.

// You may assume that you have an infinite number of each kind of coin.

function userFunction(logger) {
    function logEntrypoint(i, coins, amount, parentId) {
        let curCoinStr = "";

        if (i < coins.length) {
            curCoinStr = coins[i];
        } else {
            curCoinStr = "no coin";
        }

        let str = "";
        str += "i: " + i;
        str += "\ncurCoin: " + curCoinStr;
        str += "\namount: " + amount;
        const id = logger.newNode(str, parentId);

        return id;
    }

    function logReturn(val, id) {
        logger.appendToNode("\n-> " + val, id);
    }

    function append(val, id) {
        logger.appendToNode("\n" + val, id);
    }

    const MAX_INT = Number.MAX_SAFE_INTEGER;

    function helper({ i, coins, amount, parentId }) {
        const id = logEntrypoint(i, coins, amount, parentId);

        if (amount === 0) {
            logReturn(`{ found: true, numCoins: 0 }`, id);
            return { found: true, numCoins: 0 };
        }

        if (i < coins.length && amount > 0) {
            const curCoin = coins[i];
            const maxNumCurCoins = Math.floor(amount / curCoin);

            let curRes = { found: false, numCoins: MAX_INT };

            for (let numCurCoins = 0; numCurCoins <= maxNumCurCoins; numCurCoins++) {
                if (numCurCoins * curCoin <= amount) {
                    const res = helper({
                        i: i + 1,
                        coins: coins,
                        amount: amount - (numCurCoins * curCoin),
                        parentId: id,
                    });

                    append(JSON.stringify(res), id);

                    if (res.found) {
                        curRes.numCoins = Math.min(
                            curRes.numCoins,
                            res.numCoins + numCurCoins
                        );
                        curRes.found = true;
                    }
                }
            }

            // logger.appendToNode(`\nminNumCoins:${minNumCoins}`, id);

            if (curRes.found === false) {
                logReturn(JSON.stringify(curRes), id);
                return { found: false, numCoins: 0 };
            } else {
                logReturn(JSON.stringify(curRes), id);
                return curRes;
            }
        }

        logReturn("{ found: false, numCoins: 0 }", id);
        return { found: false, numCoins: 0 };
    }

    function coinChange(coins, amount) {
        return helper({
            i: 0,
            coins: coins,
            amount: amount,
            parentId: null,
        });
    }

    const coins = [1, 2];
    const amount = 10;

    // const coins = [1, 2, 3];
    // const amount = 5;

    const res = coinChange(coins, amount);
    console.log('res: ' + res.numCoins);
}
