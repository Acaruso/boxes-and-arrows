// https://leetcode.com/problems/coin-change/

// You are given an integer array `coins` representing coins of different denominations and an integer `amount` representing a total amount of money.

// Return the fewest number of coins that you need to make up that amount. If that amount of money cannot be made up by any combination of the coins, return -1.

// You may assume that you have an infinite number of each kind of coin.

function userFunction(logger) {
    function logEntrypoint(i, coins, amount, parentId) {
        var curCoinStr = "";

        if (i < coins.length) {
            curCoinStr = coins[i];
        } else {
            curCoinStr = "no coin";
        }

        str = "i: " + i + "\ncurCoin: " + curCoinStr + "\namount: " + amount;
        var id = logger.newNode(str, parentId);
        return id;
    }

    function logReturn(val, id) {
        logger.appendToNode("\n-> " + val, id);
    }

    var MAX_INT = Number.MAX_SAFE_INTEGER;

    function helper(i, coins, amount, parentId) {
        var id = logEntrypoint(i, coins, amount, parentId);

        if (amount === 0) {
            logReturn(0, id);
            return 0;
        }

        if (i < coins.length && amount > 0) {
            var curCoin = coins[i];
            var maxNumCoins = Math.floor(amount / curCoin);
            var minCost = MAX_INT

            for (var numCoins = 0; numCoins <= maxNumCoins; numCoins++) {
                if (numCoins * curCoin <= amount) {
                    res = helper(i + 1, coins, amount - (numCoins * curCoin), id);

                    if (res !== -1) {
                        minCost = Math.min(minCost, res + numCoins);
                    }
                }
            }

            if (minCost === MAX_INT) {
                logReturn(-1, id);
                return -1;
            } else {
                logReturn(minCost, id);
                return minCost
            }
        }

        logReturn(-1, id);
        return -1;
    }

    function coinChange(coins, amount) {
        return helper(0, coins, amount, null)
    }

    var coins = [1, 2, 3];
    var amount = 5;

    // var coins = [186,419,83,408];
    // var amount = 6249;

    var res = coinChange(coins, amount);
    console.log('res: ' + res);
}
