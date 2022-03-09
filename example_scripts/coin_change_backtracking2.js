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

    const MAX_INT = Number.MAX_SAFE_INTEGER;

    function helper(i, coins, amount, parentId) {
        const id = logEntrypoint(i, coins, amount, parentId);

        if (i >= coins.length) {
            logReturn(-1, id);
            return -1;
        }
        if (amount === 0) {
            logReturn(0, id);
            return 0;
        }

        const curCoin = coins[i];
        const maxNumCurCoins = Math.floor(amount / curCoin);
        let minNumCoins = MAX_INT

        let logStr = "";

        for (let numCurCoins = 0; numCurCoins <= maxNumCurCoins; numCurCoins++) {
            // if it's possible to use quantity:numCurCoins of curCoin:
            // if (numCurCoins * curCoin <= amount && i + 1 < coins.length) {
            if (numCurCoins * curCoin <= amount) {
                const res = helper(
                    i + 1,
                    coins,
                    amount - (numCurCoins * curCoin),
                    id
                );

                logger.appendToNode(`\nres:${res} = helper(...)`, id);

                if (res !== -1) {
                    // res + numCurCoins is the number of total coins used going down this path
                    if (res + numCurCoins < minNumCoins) {
                        logStr = `\nused quant:${numCurCoins} of coin:${curCoin}`;
                        minNumCoins = res + numCurCoins;
                    }
                }
            }
        }

        if (minNumCoins === MAX_INT) {
            logger.appendToNode("\n" + "impossible to use curCoin", id);
            logReturn(-1, id);
            return -1;
        } else {
            // minCost must have been set
            logger.appendToNode(logStr, id);
            logReturn(minNumCoins, id);
            return minNumCoins
        }
    }

    function coinChange(coins, amount) {
        return helper(0, coins, amount, null)
    }

    const coins = [1, 2];
    const amount = 10;

    const res = coinChange(coins, amount);
    console.log('res: ' + res);
}
