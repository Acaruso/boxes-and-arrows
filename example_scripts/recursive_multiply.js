function userFunction(logger) {
    // without memoization:

    // function mult(a, b) {
    //     let bigger = a > b ? a : b;
    //     let smaller = a <= b ? a : b;
    //     return helper(smaller, bigger, null);
    // }

    // function helper(smaller, bigger, parentId) {
    //     const id = logger.newNode(`mult(${smaller}, ${bigger})\n`, parentId);

    //     if (smaller === 0) {
    //         logger.pushLine(`-> 0`, id);
    //         return 0;
    //     } else if (smaller === 1) {
    //         logger.pushLine(`-> ${bigger}`, id);
    //         return bigger;
    //     } else {
    //         let halfOfSmaller = smaller >> 1;

    //         let side1 = helper(halfOfSmaller, bigger, id);
    //         logger.pushLine(`mult(${halfOfSmaller}, ${bigger}) -> ${side1}`, id);

    //         let side2 = side1;

    //         if ((smaller % 2) === 1) {
    //             side2 = helper(smaller - halfOfSmaller, bigger, id);
    //             logger.pushLine(`mult(${smaller - halfOfSmaller}, ${bigger}) -> ${side2}`, id);
    //         }

    //         logger.pushLine(`\n-> ${side1} + ${side2} = ${side1 + side2}`, id);
    //         return side1 + side2;
    //     }
    // }

    // const res = mult(9, 11);
    // console.log(`res: ${res}`);



    // with memoization:

    // function mult(a, b) {
    //     let bigger = a > b ? a : b;
    //     let smaller = a <= b ? a : b;

    //     let cache = new Array(smaller + 1).fill(-1);

    //     function helper(smaller, bigger, parentId) {
    //         const id = logger.newNode(`mult(${smaller}, ${bigger})\n`, parentId);

    //         if (smaller === 0) {
    //             logger.pushLine(`-> 0`, id);
    //             return 0;
    //         } else if (smaller === 1) {
    //             logger.pushLine(`-> ${bigger}`, id);
    //             return bigger;
    //         } else if (cache[smaller] !== -1) {
    //             logger.pushLine(`-> cache[${smaller}] = ${cache[smaller]}`, id);
    //             return cache[smaller];
    //         } else {
    //             let halfOfSmaller = smaller >> 1;
    //             // logger.pushLine(`halfOfSmaller: ${halfOfSmaller}`, id);

    //             let side1 = helper(halfOfSmaller, bigger, id);
    //             logger.pushLine(`mult(${halfOfSmaller}, ${bigger}) -> ${side1}`, id);

    //             let side2 = side1;

    //             if ((smaller % 2) === 1) {
    //                 side2 = helper(smaller - halfOfSmaller, bigger, id);
    //                 logger.pushLine(`mult(${smaller - halfOfSmaller}, ${bigger}) -> ${side2}`, id);
    //             }

    //             cache[smaller] = side1 + side2;
    //             logger.pushLine(`cache[${smaller}] = ${side1} + ${side2}`, id);
    //             logger.pushLine(`\n-> ${side1} + ${side2} = ${side1 + side2}`, id);
    //             return side1 + side2;
    //         }
    //     }

    //     return helper(smaller, bigger, null);
    // }



    // final:

    function mult(a, b) {
        let bigger = a > b ? a : b;
        let smaller = a <= b ? a : b;

        function inner(smaller, bigger, parentId) {
            const id = logger.newNode(`mult(${smaller}, ${bigger})\n`, parentId);

            if (smaller === 0) {
                logger.pushLine(`-> 0`, id);
                return 0;
            } else if (smaller === 1) {
                logger.pushLine(`-> ${bigger}`, id);
                return bigger;
            } else {
                let halfOfSmaller = smaller >> 1;

                let halfProd = inner(halfOfSmaller, bigger, id);

                logger.pushLine(`inner(${halfOfSmaller}, ${bigger}) -> ${halfProd}`, id);

                if (smaller % 2 === 0) {
                    logger.pushLine(`\n-> ${halfProd} + ${halfProd} = ${halfProd + halfProd}`, id);
                    return halfProd + halfProd;
                } else {
                    logger.pushLine(`\n-> ${halfProd} + ${halfProd} + ${bigger} = ${halfProd + halfProd + bigger}`, id);
                    return halfProd + halfProd + bigger;
                }
            }
        }

        return inner(bigger, smaller, null);
    }

    const res = mult(9, 11);
    console.log(`res: ${res}`);
}






