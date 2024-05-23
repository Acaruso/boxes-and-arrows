function userFunction(logger) {
    class BadVersionSvc {
        constructor(bad) {
            this.bad = bad - 1;
        }

        isBadVersion(n) {
            if (n >= this.bad) {
                return true;
            } else {
                return false;
            }
        }
    }

    class LogSvc {
        constructor(n, bad) {
            this.n = n;
            this.bad = bad - 1;
            this.id = logger.newNode("", null);

            this.arr = [];
            for (let i = 0; i < this.n; i++) {
                if (i < this.bad) {
                    this.arr[i] = "f";
                } else {
                    this.arr[i] = "t";
                }
            }
        }

        pushString(str) {
            logger.pushString(str, this.id);
        }

        pushArray(l, m, r) {
            const labels = [["l", l], ["m", m], ["r", r]];
            logger.pushArray(this.arr, this.id, { labels });
        }
    }

    function firstBadVersion(badVersionSvc, logSvc, n) {
        let cur = -1;

        function f(l, r) {
            if (l > r) {
                logSvc.pushArray(l, 0, r);
                return -1;
            }

            let m = Math.floor((l + r) / 2);

            logSvc.pushArray(l, m, r);

            mVer = badVersionSvc.isBadVersion(m);

            if (mVer === true) {
                // search left side
                cur = m;
                logSvc.pushString(`\ncur = ${m}`);
                f(l, m - 1);
            } else {
                // search right side
                f(m + 1, r);
            }
        }

        f(0, n - 1);

        return cur + 1;
    }

    function test1() {
        const n = 15;
        const bad = 9;
        // const bad = 11;

        const badVersionSvc = new BadVersionSvc(bad);

        const logSvc = new LogSvc(n, bad);

        // logSvc.pushString("begin\n");

        const res = firstBadVersion(badVersionSvc, logSvc, n);
    }

    test1();
}
