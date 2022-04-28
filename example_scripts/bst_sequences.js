function userFunction(logger) {

    function pushAll(source, dest) {
        for (const x of source) {
            dest.push(x);
        }
    }

    function bstSequences(node) {
        let result = [];

        if (node == null) {
            console.log("null");
            result.push([]);
            return result;
        }

        console.log(node.data);

        let prefix = [];
        prefix.push(node.data);

        let leftSeq = bstSequences(node.left);
        let rightSeq = bstSequences(node.right);

        for (let left of leftSeq) {
            for (let right of rightSeq) {
                let weaved = [];
                // weaveLists(left, right, weaved, prefix);
                weaveLists(left, right, result, prefix);
                console.log(`weaved: ${weaved}`);
                // pushAll(weaved, result);
            }
        }

        return result;
    }

    function weaveLists(first, second, results, prefix) {
        if (first.length === 0 || second.length === 0) {
            let result = [...prefix];
            pushAll(first, result);
            pushAll(second, result);
            results.push(result);
            return;
        }

        let headFirst = first.shift();
        prefix.push(headFirst);
        weaveLists(first, second, results, prefix);
        prefix.pop();
        // first.push(headFirst);
        first.unshift(headFirst);

        let headSecond = second.shift();
        prefix.push(headSecond);
        weaveLists(first, second, results, prefix);
        prefix.pop();
        // second.push(headSecond);
        second.unshift(headSecond);
    }

    // let root = {
    //     data: 10,
    //     left: {
    //         data: 2,
    //         left: {
    //             data: 1,
    //             left: null,
    //             right: null
    //         },
    //         right: {
    //             data: 3,
    //             left: null,
    //             right: null
    //         }
    //     },
    //     right: {
    //         data: 11,
    //         left: null,
    //         right: null
    //     }
    // };

    // let root = {
    //     data: 1,
    //     left: {
    //         data: 2,
    //         left: {
    //             data: 4,
    //             left: null,
    //             right: null
    //         },
    //         right: {
    //             data: 5,
    //             left: null,
    //             right: null
    //         }
    //     },
    //     right: {
    //         data: 3,
    //         left: null,
    //         right: null
    //     }
    // };

    let root = {
        data: 10,
        left: {
            data: 5,
            left: {
                data: 2,
                left: null,
                right: null
            },
            right: {
                data: 4,
                left: null,
                right: null
            }
        },
        right: {
            data: 20,
            left: null,
            right: {
                data: 30,
                left: null,
                right: null
            }
        }
    };

    let res = bstSequences(root);

    for (const elt of res) {
        console.log(JSON.stringify(elt));
    }
}






