function userFunction(logger) {
    const str = JSON.stringify;

    function fnStr(arr, perm) {
        const arr2 = arr.filter(x => x.flag === true).map(x => x.value);
        return `inner(${str(arr2)}, ${str(perm)})`;
    }

    function permStr(perm) {
        return `perm: ${str(perm)}`;
    }

    function perms(arr_) {
        let arr = arr_.map(elt => { return { value: elt, flag: true }});
        const n = arr.length;
        let out = [];

        function inner(arr, perm, parentId) {
            const id = logger.newNode(fnStr(arr, perm) + "\n", parentId);

            if (perm.length === n) {
                out.push([...perm]);
                logger.pushLine(`out.push([...${str(perm)}])`, id);
            } else {
                for (const arrElt of arr) {
                    if (arrElt.flag === false) {
                        continue;
                    } else {
                        arrElt.flag = false;
                        // logger.pushLine(`remove ${arrElt.value} from arr`, id);
                        perm.push(arrElt.value);
                        // logger.pushLine(`perm.push(${arrElt.value})`, id);
                        logger.pushLine(fnStr(arr, perm), id);
                        inner(arr, perm, id);
                        perm.pop();
                        // logger.pushLine(`perm.pop()`, id);
                        // logger.pushLine(`add ${arrElt.value} to arr\n`, id);
                        arrElt.flag = true;
                    }
                }
            }
        }

        inner(arr, [], null);
        return out;
    }

    const arr = [1, 2, 3];
    const res = perms(arr);
    console.log(res);
}
