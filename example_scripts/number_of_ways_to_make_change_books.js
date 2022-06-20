function userFunction(logger) {
    function coins(amount, arr) {
        function inner(amount, index, parentId) {
            const id = logger.newNode(`inner(${amount}, ${index})\n`, parentId);

            if (index >= arr.length - 1) {
                logger.pushLine("-> 1", id);
                return 1;
            }

            const curCoin = arr[index];
            logger.pushLine(`curCoin: ${curCoin}\n`, id);
            const maxNumCoins = Math.floor(amount / curCoin);
            let numWays = 0;

            for (let numCoins = 0; numCoins <= maxNumCoins; numCoins++) {
                let amountRemaining = amount - (curCoin * numCoins);
                const res = inner(amountRemaining, index + 1, id);
                logger.pushLine(`inner(${amountRemaining}, ${index + 1}) -> ${res}`, id);
                numWays = numWays + res;
            }

            logger.pushLine(`-> ${numWays}`, id);
            return numWays;
        }

        const outerRes = inner(amount, 0, null);
        return outerRes;
    }

    // testcases:
    // 100 -> 242
    // 25 -> 13

    const arr = [25, 10, 5, 1];
    const res = coins(25, arr);
    console.log(res);
}
