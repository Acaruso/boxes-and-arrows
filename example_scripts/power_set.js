function userFunction(logger) {

    // function powerSet(arr) {
    //     function inner(index, parentId) {
    //         const id = logger.newNode(`inner(${index})\n`, parentId);

    //         let allSubsets = [];

    //         if (index === arr.length) {
    //             allSubsets.push([]);
    //             logger.pushLine("allSubsets.push([])", id);
    //         } else {
    //             allSubsets = inner(index + 1, id);

    //             logger.pushLine(`inner(${index + 1}) -> ${JSON.stringify(allSubsets)}\n`, id);

    //             const bound = allSubsets.length;
    //             for (let i = 0; i < bound; i++) {
    //                 let cur = allSubsets[i];
    //                 allSubsets.push(
    //                     [...cur, arr[index]]
    //                 );
    //             }
    //         }

    //         logger.pushLine(`return ${JSON.stringify(allSubsets)}`, id);
    //         return allSubsets;
    //     }

    //     return inner(0, null);
    // }

    function logOutArray(out, id) {
        // let newOut = [];
        // for (const elt of out) {
        //     let s = elt.join("");
        //     if (s === "") {
        //         s = "[]";
        //     }
        //     newOut.push(s);
        // }
        // logger.pushArray(newOut, id);

        logger.pushLine(`${JSON.stringify(out)}\n`, id);
    }

    function powerSet(arr) {
        const id = logger.newNode("", null);

        let out = [[]];

        logOutArray(out, id);
    
        for (let i = 0; i < arr.length; i++) {
            logger.pushLine("-----------------------------------------\n", id);
            // logger.pushArray(arr, id, { labels: [["i", i]]});
            logger.pushLine(`arr[i]: ${arr[i]}\n`, id);
            const bound = out.length;
            for (let j = 0; j < bound; j++) {
                let cur = out[j];
                out.push(
                    [...cur, arr[i]]
                );
                logOutArray(out, id);
            }
        }
    
        return out;
    }
    
    const arr = [0, 1, 2];
    const res = powerSet(arr);
    console.log(res);
}