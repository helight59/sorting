/* Generated from Java with JSweet 2.0.0-rc1 - http://www.jsweet.org */

export default class TimSort<T> {

    static MIN_MERGE: number = 32;

    /*private*/
    a: T[];

    /*private*/
    c: any;

    static MIN_GALLOP: number = 7;

    /*private*/
    minGallop: number = TimSort.MIN_GALLOP;

    static INITIAL_TMP_STORAGE_LENGTH: number = 256;

    /*private*/
    tmp: T[];

    /*private*/
    stackSize: number = 0;

    /*private*/
    runBase: number[];

    /*private*/
    runLen: number[];

    constructor(a: T[], c: any) {
        this.a = null;
        this.c = null;
        this.tmp = null;
        this.runBase = null;
        this.runLen = null;
        this.a = a;
        this.c = <any>(c);
        let len: number = a.length;
        let newArray: T[] = <T[]>new Array(len < 2 * TimSort.INITIAL_TMP_STORAGE_LENGTH ? len >>> 1 : TimSort.INITIAL_TMP_STORAGE_LENGTH);
        this.tmp = newArray;
        let stackLen: number = (len < 120 ? 5 : len < 1542 ? 10 : len < 119151 ? 19 : 40);
        this.runBase = (s => {
            let a = [];
            while (s-- > 0) a.push(0);
            return a;
        })(stackLen);
        this.runLen = (s => {
            let a = [];
            while (s-- > 0) a.push(0);
            return a;
        })(stackLen);
    }

    static sort$java_lang_Object_A$java_util_Comparator<T>(a: T[], c: any) {
        TimSort.sort$java_lang_Object_A$int$int$java_util_Comparator(a, 0, a.length, <any>(c));
    }

    public static sort$java_lang_Object_A$int$int$java_util_Comparator<T>(a: T[], lo: number, hi: number, c: any) {
        if (c == null) {
            /* sort */
            ((arr, start, end, f?: any) => ((arr1, arr2) => arr1.splice.apply(arr1, (<any[]>[start, arr2.length]).concat(arr2)))(a, a.slice(start, end).sort(f)))(a, lo, hi);
            return;
        }
        TimSort.rangeCheck(a.length, lo, hi);
        let nRemaining: number = hi - lo;
        if (nRemaining < 2) return;
        if (nRemaining < TimSort.MIN_MERGE) {
            let initRunLen: number = TimSort.countRunAndMakeAscending<any>(a, lo, hi, <any>(c));
            TimSort.binarySort<any>(a, lo, hi, lo + initRunLen, <any>(c));
            return;
        }
        let ts: TimSort<T> = <any>(new TimSort<any>(a, <any>(c)));
        let minRun: number = TimSort.minRunLength(nRemaining);
        do {
            let runLen: number = TimSort.countRunAndMakeAscending<any>(a, lo, hi, <any>(c));
            if (runLen < minRun) {
                let force: number = nRemaining <= minRun ? nRemaining : minRun;
                TimSort.binarySort<any>(a, lo, lo + force, lo + runLen, <any>(c));
                runLen = force;
            }
            ts.pushRun(lo, runLen);
            ts.mergeCollapse();
            lo += runLen;
            nRemaining -= runLen;
        } while ((nRemaining !== 0));
        if (!(lo === hi)) throw new Error("Assertion error line 156: assert lo == hi;");
        ;
        ts.mergeForceCollapse();
        if (!(ts.stackSize === 1)) throw new Error("Assertion error line 158: assert ts.stackSize == 1;");
        ;
    }

   static sort<T>(a?: any, lo?: any, hi?: any, c?: any): any {
        if (((a != null && a instanceof <any>Array && (a.length == 0 || a[0] == null || (a[0] != null))) || a === null) && ((typeof lo === 'number') || lo === null) && ((typeof hi === 'number') || hi === null) && ((c != null && (c instanceof Object)) || c === null)) {
            return <any>TimSort.sort$java_lang_Object_A$int$int$java_util_Comparator(a, lo, hi, c);
        } else if (((a != null && a instanceof <any>Array && (a.length == 0 || a[0] == null || (a[0] != null))) || a === null) && ((lo != null && (lo instanceof Object)) || lo === null) && hi === undefined && c === undefined) {
            return <any>TimSort.sort$java_lang_Object_A$java_util_Comparator(a, lo);
        } else {
            throw new Error('invalid overload');
        }
    }

    /*private*/
    static binarySort<T>(a: T[], lo: number, hi: number, start: number, c: any) {
        if (!(lo <= start && start <= hi)) throw new Error("Assertion error line 189: assert lo <= start && start <= hi;");
        ;
        if (start === lo) start++;
        for (; start < hi; start++) {
            let pivot: T = a[start];
            let left: number = lo;
            let right: number = start;
            if (!(left <= right)) throw new Error("Assertion error line 195: assert left <= right;");
            ;
            while ((left < right)) {
                let mid: number = (left + right) >>> 1;
                if (c(pivot, a[mid]) < 0) right = mid; else left = mid + 1;
            }
            ;
            if (!(left === right)) throw new Error("Assertion error line 200: assert left == right;");
            ;
            let n: number = start - left;
            switch ((n)) {
                case 2:
                    a[left + 2] = a[left + 1];
                case 1:
                    a[left + 1] = a[left];
                    break;
                default:
                    /* arraycopy */
                    ((srcPts, srcOff, dstPts, dstOff, size) => {
                        if (srcPts !== dstPts || dstOff >= srcOff + size) {
                            while (--size >= 0) dstPts[dstOff++] = srcPts[srcOff++];
                        } else {
                            let tmp = srcPts.slice(srcOff, srcOff + size);
                            for (let i = 0; i < size; i++) dstPts[dstOff++] = tmp[i];
                        }
                    })(a, left, a, left + 1, n);
            }
            a[left] = pivot;
        }
        ;
    }

    /*private*/
    static countRunAndMakeAscending<T>(a: T[], lo: number, hi: number, c: any): number {
        if (!(lo < hi)) throw new Error("Assertion error line 242: assert lo < hi;");
        ;
        let runHi: number = lo + 1;
        if (runHi === hi) return 1;
        if (c(a[runHi++], a[lo]) < 0) {
            while ((runHi < hi && c(a[runHi], a[runHi - 1]) < 0)) runHi++;
            TimSort.reverseRange(a, lo, runHi);
        } else {
            while ((runHi < hi && c(a[runHi], a[runHi - 1]) >= 0)) runHi++;
        }
        return runHi - lo;
    }

    /**
     * Reverse the specified range of the specified array.
     *
     * @param {Array} a the array in which a range is to be reversed
     * @param {number} lo the index of the first element in the range to be reversed
     * @param {number} hi the index after the last element in the range to be reversed
     * @private
     */

    /*private*/
    static reverseRange(a: any[], lo: number, hi: number) {
        hi--;
        while ((lo < hi)) {
            let t: any = a[lo];
            a[lo++] = a[hi];
            a[hi--] = t;
        }
        ;
    }

    /**
     * Returns the minimum acceptable run length for an array of the specified
     * length. Natural runs shorter than this will be extended with
     * {@link #binarySort}.
     *
     * Roughly speaking, the computation is:
     *
     * If n < MIN_MERGE, return n (it's too small to bother with fancy stuff).
     * Else if n is an exact power of 2, return MIN_MERGE/2.
     * Else return an int k, MIN_MERGE/2 <= k <= MIN_MERGE, such that n/k
     * is close to, but strictly less than, an exact power of 2.
     *
     * For the rationale, see listsort.txt.
     *
     * @param {number} n the length of the array to be sorted
     * @return {number} the length of the minimum run to be merged
     * @private
     */

    /*private*/
    static minRunLength(n: number): number {
        if (!(n >= 0)) throw new Error("Assertion error line 290: assert n >= 0;");
        ;
        let r: number = 0;
        while ((n >= TimSort.MIN_MERGE)) {
            r |= (n & 1);
            n >>= 1;
        }
        ;
        return n + r;
    }

    /**
     * Pushes the specified run onto the pending-run stack.
     *
     * @param {number} runBase index of the first element in the run
     * @param {number} runLen  the number of elements in the run
     * @private
     */

    /*private*/
    pushRun(runBase: number, runLen: number) {
        this.runBase[this.stackSize] = runBase;
        this.runLen[this.stackSize] = runLen;
        this.stackSize++;
    }

    /**
     * Examines the stack of runs waiting to be merged and merges adjacent runs
     * until the stack invariants are reestablished:
     *
     * 1. runLen[i - 3] > runLen[i - 2] + runLen[i - 1]
     * 2. runLen[i - 2] > runLen[i - 1]
     *
     * This method is called each time a new run is pushed onto the stack,
     * so the invariants are guaranteed to hold for i < stackSize upon
     * entry to the method.
     * @private
     */

    /*private*/
    mergeCollapse() {
        while ((this.stackSize > 1)) {
            let n: number = this.stackSize - 2;
            if (n > 0 && this.runLen[n - 1] <= this.runLen[n] + this.runLen[n + 1]) {
                if (this.runLen[n - 1] < this.runLen[n + 1]) n--;
                this.mergeAt(n);
            } else if (this.runLen[n] <= this.runLen[n + 1]) {
                this.mergeAt(n);
            } else {
                break;
            }
        }
        ;
    }

    /**
     * Merges all runs on the stack until only one remains.  This method is
     * called once, to complete the sort.
     * @private
     */

    /*private*/
    mergeForceCollapse() {
        while ((this.stackSize > 1)) {
            let n: number = this.stackSize - 2;
            if (n > 0 && this.runLen[n - 1] < this.runLen[n + 1]) n--;
            this.mergeAt(n);
        }
        ;
    }

    /**
     * Merges the two runs at stack indices i and i+1.  Run i must be
     * the penultimate or antepenultimate run on the stack.  In other words,
     * i must be equal to stackSize-2 or stackSize-3.
     *
     * @param {number} i stack index of the first of the two runs to merge
     * @private
     */

    /*private*/
    mergeAt(i: number) {
        if (!(this.stackSize >= 2)) throw new Error("Assertion error line 360: assert stackSize >= 2;");
        ;
        if (!(i >= 0)) throw new Error("Assertion error line 361: assert i >= 0;");
        ;
        if (!(i === this.stackSize - 2 || i === this.stackSize - 3)) throw new Error("Assertion error line 362: assert i == stackSize - 2 || i == stackSize - 3;");
        ;
        let base1: number = this.runBase[i];
        let len1: number = this.runLen[i];
        let base2: number = this.runBase[i + 1];
        let len2: number = this.runLen[i + 1];
        if (!(len1 > 0 && len2 > 0)) throw new Error("Assertion error line 367: assert len1 > 0 && len2 > 0;");
        ;
        if (!(base1 + len1 === base2)) throw new Error("Assertion error line 368: assert base1 + len1 == base2;");
        ;
        this.runLen[i] = len1 + len2;
        if (i === this.stackSize - 3) {
            this.runBase[i + 1] = this.runBase[i + 2];
            this.runLen[i + 1] = this.runLen[i + 2];
        }
        this.stackSize--;
        let k: number = TimSort.gallopRight<any>(this.a[base2], this.a, base1, len1, 0, <any>(this.c));
        if (!(k >= 0)) throw new Error("Assertion error line 376: assert k >= 0;");
        ;
        base1 += k;
        len1 -= k;
        if (len1 === 0) return;
        len2 = TimSort.gallopLeft<any>(this.a[base1 + len1 - 1], this.a, base2, len2, len2 - 1, <any>(this.c));
        if (!(len2 >= 0)) throw new Error("Assertion error line 381: assert len2 >= 0;");
        ;
        if (len2 === 0) return;
        if (len1 <= len2) this.mergeLo(base1, len1, base2, len2); else this.mergeHi(base1, len1, base2, len2);
    }

    /**
     * Locates the position at which to insert the specified key into the
     * specified sorted range; if the range contains an element equal to key,
     * returns the index of the leftmost equal element.
     *
     * @param {*} key the key whose insertion point to search for
     * @param {Array} a the array in which to search
     * @param {number} base the index of the first element in the range
     * @param {number} len the length of the range; must be > 0
     * @param {number} hint the index at which to begin the search, 0 <= hint < n.
     * The closer hint is to the result, the faster this method will run.
     * @param {*} c the comparator used to order the range, and to search
     * @return {number} the int k,  0 <= k <= n such that a[b + k - 1] < key <= a[b + k],
     * pretending that a[b - 1] is minus infinity and a[b + n] is infinity.
     * In other words, key belongs at index b + k; or in other words,
     * the first k elements of a should precede key, and the last n - k
     * should follow it.
     * @private
     */

    /*private*/
    static gallopLeft<T>(key: T, a: T[], base: number, len: number, hint: number, c: any): number {
        if (!(len > 0 && hint >= 0 && hint < len)) throw new Error("Assertion error line 406: assert len > 0 && hint >= 0 && hint < len;");
        ;
        let lastOfs: number = 0;
        let ofs: number = 1;
        if (c(key, a[base + hint]) > 0) {
            let maxOfs: number = len - hint;
            while ((ofs < maxOfs && c(key, a[base + hint + ofs]) > 0)) {
                lastOfs = ofs;
                ofs = (ofs << 1) + 1;
                if (ofs <= 0) ofs = maxOfs;
            }
            ;
            if (ofs > maxOfs) ofs = maxOfs;
            lastOfs += hint;
            ofs += hint;
        } else {
            let maxOfs: number = hint + 1;
            while ((ofs < maxOfs && c(key, a[base + hint - ofs]) <= 0)) {
                lastOfs = ofs;
                ofs = (ofs << 1) + 1;
                if (ofs <= 0) ofs = maxOfs;
            }
            ;
            if (ofs > maxOfs) ofs = maxOfs;
            let tmp: number = lastOfs;
            lastOfs = hint - ofs;
            ofs = hint - tmp;
        }
        if (!(-1 <= lastOfs && lastOfs < ofs && ofs <= len)) throw new Error("Assertion error line 431: assert -1 <= lastOfs && lastOfs < ofs && ofs <= len;");
        ;
        lastOfs++;
        while ((lastOfs < ofs)) {
            let m: number = lastOfs + ((ofs - lastOfs) >>> 1);
            if (c(key, a[base + m]) > 0) lastOfs = m + 1; else ofs = m;
        }
        ;
        if (!(lastOfs === ofs)) throw new Error("Assertion error line 437: assert lastOfs == ofs;");
        ;
        return ofs;
    }

    /**
     * Like gallopLeft, except that if the range contains an element equal to
     * key, gallopRight returns the index after the rightmost equal element.
     *
     * @param {*} key the key whose insertion point to search for
     * @param {Array} a the array in which to search
     * @param {number} base the index of the first element in the range
     * @param {number} len the length of the range; must be > 0
     * @param {number} hint the index at which to begin the search, 0 <= hint < n.
     * The closer hint is to the result, the faster this method will run.
     * @param {*} c the comparator used to order the range, and to search
     * @return {number} the int k,  0 <= k <= n such that a[b + k - 1] <= key < a[b + k]
     * @private
     */

    /*private*/
    static gallopRight<T>(key: T, a: T[], base: number, len: number, hint: number, c: any): number {
        if (!(len > 0 && hint >= 0 && hint < len)) throw new Error("Assertion error line 456: assert len > 0 && hint >= 0 && hint < len;");
        ;
        let ofs: number = 1;
        let lastOfs: number = 0;
        if (c(key, a[base + hint]) < 0) {
            let maxOfs: number = hint + 1;
            while ((ofs < maxOfs && c(key, a[base + hint - ofs]) < 0)) {
                lastOfs = ofs;
                ofs = (ofs << 1) + 1;
                if (ofs <= 0) ofs = maxOfs;
            }
            ;
            if (ofs > maxOfs) ofs = maxOfs;
            let tmp: number = lastOfs;
            lastOfs = hint - ofs;
            ofs = hint - tmp;
        } else {
            let maxOfs: number = len - hint;
            while ((ofs < maxOfs && c(key, a[base + hint + ofs]) >= 0)) {
                lastOfs = ofs;
                ofs = (ofs << 1) + 1;
                if (ofs <= 0) ofs = maxOfs;
            }
            ;
            if (ofs > maxOfs) ofs = maxOfs;
            lastOfs += hint;
            ofs += hint;
        }
        if (!(-1 <= lastOfs && lastOfs < ofs && ofs <= len)) throw new Error("Assertion error line 481: assert -1 <= lastOfs && lastOfs < ofs && ofs <= len;");
        ;
        lastOfs++;
        while ((lastOfs < ofs)) {
            let m: number = lastOfs + ((ofs - lastOfs) >>> 1);
            if (c(key, a[base + m]) < 0) ofs = m; else lastOfs = m + 1;
        }
        ;
        if (!(lastOfs === ofs)) throw new Error("Assertion error line 487: assert lastOfs == ofs;");
        ;
        return ofs;
    }

    /**
     * Merges two adjacent runs in place, in a stable fashion.  The first
     * element of the first run must be greater than the first element of the
     * second run (a[base1] > a[base2]), and the last element of the first run
     * (a[base1 + len1-1]) must be greater than all elements of the second run.
     *
     * For performance, this method should be called only when len1 <= len2;
     * its twin, mergeHi should be called if len1 >= len2.  (Either method
     * may be called if len1 == len2.)
     *
     * @param {number} base1 index of first element in first run to be merged
     * @param {number} len1  length of first run to be merged (must be > 0)
     * @param {number} base2 index of first element in second run to be merged
     * (must be aBase + aLen)
     * @param {number} len2  length of second run to be merged (must be > 0)
     * @private
     */

    /*private*/
    mergeLo(base1: number, len1: number, base2: number, len2: number) {
        if (!(len1 > 0 && len2 > 0 && base1 + len1 === base2)) throw new Error("Assertion error line 509: assert len1 > 0 && len2 > 0 && base1 + len1 == base2;");
        ;
        let a: T[] = this.a;
        let tmp: T[] = this.ensureCapacity(len1);
        /* arraycopy */
        ((srcPts, srcOff, dstPts, dstOff, size) => {
            if (srcPts !== dstPts || dstOff >= srcOff + size) {
                while (--size >= 0) dstPts[dstOff++] = srcPts[srcOff++];
            } else {
                let tmp = srcPts.slice(srcOff, srcOff + size);
                for (let i = 0; i < size; i++) dstPts[dstOff++] = tmp[i];
            }
        })(a, base1, tmp, 0, len1);
        let cursor1: number = 0;
        let cursor2: number = base2;
        let dest: number = base1;
        a[dest++] = a[cursor2++];
        if (--len2 === 0) {
            /* arraycopy */
            ((srcPts, srcOff, dstPts, dstOff, size) => {
                if (srcPts !== dstPts || dstOff >= srcOff + size) {
                    while (--size >= 0) dstPts[dstOff++] = srcPts[srcOff++];
                } else {
                    let tmp = srcPts.slice(srcOff, srcOff + size);
                    for (let i = 0; i < size; i++) dstPts[dstOff++] = tmp[i];
                }
            })(tmp, cursor1, a, dest, len1);
            return;
        }
        if (len1 === 1) {
            /* arraycopy */
            ((srcPts, srcOff, dstPts, dstOff, size) => {
                if (srcPts !== dstPts || dstOff >= srcOff + size) {
                    while (--size >= 0) dstPts[dstOff++] = srcPts[srcOff++];
                } else {
                    let tmp = srcPts.slice(srcOff, srcOff + size);
                    for (let i = 0; i < size; i++) dstPts[dstOff++] = tmp[i];
                }
            })(a, cursor2, a, dest, len2);
            a[dest + len2] = tmp[cursor1];
            return;
        }
        let c: any = <any>(this.c);
        let minGallop: number = this.minGallop;
        outer: while ((true)) {
            let count1: number = 0;
            let count2: number = 0;
            do {
                if (!(len1 > 1 && len2 > 0)) throw new Error("Assertion error line 532: assert len1 > 1 && len2 > 0;");
                ;
                if (c(a[cursor2], tmp[cursor1]) < 0) {
                    a[dest++] = a[cursor2++];
                    count2++;
                    count1 = 0;
                    if (--len2 === 0) break outer;
                } else {
                    a[dest++] = tmp[cursor1++];
                    count1++;
                    count2 = 0;
                    if (--len1 === 1) break outer;
                }
            } while (((count1 | count2) < minGallop));
            do {
                if (!(len1 > 1 && len2 > 0)) throw new Error("Assertion error line 546: assert len1 > 1 && len2 > 0;");
                ;
                count1 = TimSort.gallopRight<any>(a[cursor2], tmp, cursor1, len1, 0, <any>(c));
                if (count1 !== 0) {
                    /* arraycopy */
                    ((srcPts, srcOff, dstPts, dstOff, size) => {
                        if (srcPts !== dstPts || dstOff >= srcOff + size) {
                            while (--size >= 0) dstPts[dstOff++] = srcPts[srcOff++];
                        } else {
                            let tmp = srcPts.slice(srcOff, srcOff + size);
                            for (let i = 0; i < size; i++) dstPts[dstOff++] = tmp[i];
                        }
                    })(tmp, cursor1, a, dest, count1);
                    dest += count1;
                    cursor1 += count1;
                    len1 -= count1;
                    if (len1 <= 1) break outer;
                }
                a[dest++] = a[cursor2++];
                if (--len2 === 0) break outer;
                count2 = TimSort.gallopLeft<any>(tmp[cursor1], a, cursor2, len2, 0, <any>(c));
                if (count2 !== 0) {
                    /* arraycopy */
                    ((srcPts, srcOff, dstPts, dstOff, size) => {
                        if (srcPts !== dstPts || dstOff >= srcOff + size) {
                            while (--size >= 0) dstPts[dstOff++] = srcPts[srcOff++];
                        } else {
                            let tmp = srcPts.slice(srcOff, srcOff + size);
                            for (let i = 0; i < size; i++) dstPts[dstOff++] = tmp[i];
                        }
                    })(a, cursor2, a, dest, count2);
                    dest += count2;
                    cursor2 += count2;
                    len2 -= count2;
                    if (len2 === 0) break outer;
                }
                a[dest++] = tmp[cursor1++];
                if (--len1 === 1) break outer;
                minGallop--;
            } while ((((lhs, rhs) => lhs || rhs)(count1 >= TimSort.MIN_GALLOP, count2 >= TimSort.MIN_GALLOP)));
            if (minGallop < 0) minGallop = 0;
            minGallop += 2;
        }
        ;
        this.minGallop = minGallop < 1 ? 1 : minGallop;
        if (len1 === 1) {
            if (!(len2 > 0)) throw new Error("Assertion error line 574: assert len2 > 0;");
            ;
            /* arraycopy */
            ((srcPts, srcOff, dstPts, dstOff, size) => {
                if (srcPts !== dstPts || dstOff >= srcOff + size) {
                    while (--size >= 0) dstPts[dstOff++] = srcPts[srcOff++];
                } else {
                    let tmp = srcPts.slice(srcOff, srcOff + size);
                    for (let i = 0; i < size; i++) dstPts[dstOff++] = tmp[i];
                }
            })(a, cursor2, a, dest, len2);
            a[dest + len2] = tmp[cursor1];
        } else if (len1 === 0) {
            throw Object.defineProperty(new Error("Comparison method violates its general contract!"), '__classes', {
                configurable: true,
                value: ['java.lang.Throwable', 'java.lang.Object', 'java.lang.RuntimeException', 'java.lang.IllegalArgumentException', 'java.lang.Exception']
            });
        } else {
            if (!(len2 === 0)) throw new Error("Assertion error line 580: assert len2 == 0;");
            ;
            if (!(len1 > 1)) throw new Error("Assertion error line 581: assert len1 > 1;");
            ;
            /* arraycopy */
            ((srcPts, srcOff, dstPts, dstOff, size) => {
                if (srcPts !== dstPts || dstOff >= srcOff + size) {
                    while (--size >= 0) dstPts[dstOff++] = srcPts[srcOff++];
                } else {
                    let tmp = srcPts.slice(srcOff, srcOff + size);
                    for (let i = 0; i < size; i++) dstPts[dstOff++] = tmp[i];
                }
            })(tmp, cursor1, a, dest, len1);
        }
    }

    /**
     * Like mergeLo, except that this method should be called only if
     * len1 >= len2; mergeLo should be called if len1 <= len2.  (Either method
     * may be called if len1 == len2.)
     *
     * @param {number} base1 index of first element in first run to be merged
     * @param {number} len1  length of first run to be merged (must be > 0)
     * @param {number} base2 index of first element in second run to be merged
     * (must be aBase + aLen)
     * @param {number} len2  length of second run to be merged (must be > 0)
     * @private
     */

    /*private*/
    mergeHi(base1: number, len1: number, base2: number, len2: number) {
        if (!(len1 > 0 && len2 > 0 && base1 + len1 === base2)) throw new Error("Assertion error line 599: assert len1 > 0 && len2 > 0 && base1 + len1 == base2;");
        ;
        let a: T[] = this.a;
        let tmp: T[] = this.ensureCapacity(len2);
        /* arraycopy */
        ((srcPts, srcOff, dstPts, dstOff, size) => {
            if (srcPts !== dstPts || dstOff >= srcOff + size) {
                while (--size >= 0) dstPts[dstOff++] = srcPts[srcOff++];
            } else {
                let tmp = srcPts.slice(srcOff, srcOff + size);
                for (let i = 0; i < size; i++) dstPts[dstOff++] = tmp[i];
            }
        })(a, base2, tmp, 0, len2);
        let cursor1: number = base1 + len1 - 1;
        let cursor2: number = len2 - 1;
        let dest: number = base2 + len2 - 1;
        a[dest--] = a[cursor1--];
        if (--len1 === 0) {
            /* arraycopy */
            ((srcPts, srcOff, dstPts, dstOff, size) => {
                if (srcPts !== dstPts || dstOff >= srcOff + size) {
                    while (--size >= 0) dstPts[dstOff++] = srcPts[srcOff++];
                } else {
                    let tmp = srcPts.slice(srcOff, srcOff + size);
                    for (let i = 0; i < size; i++) dstPts[dstOff++] = tmp[i];
                }
            })(tmp, 0, a, dest - (len2 - 1), len2);
            return;
        }
        if (len2 === 1) {
            dest -= len1;
            cursor1 -= len1;
            /* arraycopy */
            ((srcPts, srcOff, dstPts, dstOff, size) => {
                if (srcPts !== dstPts || dstOff >= srcOff + size) {
                    while (--size >= 0) dstPts[dstOff++] = srcPts[srcOff++];
                } else {
                    let tmp = srcPts.slice(srcOff, srcOff + size);
                    for (let i = 0; i < size; i++) dstPts[dstOff++] = tmp[i];
                }
            })(a, cursor1 + 1, a, dest + 1, len1);
            a[dest] = tmp[cursor2];
            return;
        }
        let c: any = <any>(this.c);
        let minGallop: number = this.minGallop;
        outer: while ((true)) {
            let count1: number = 0;
            let count2: number = 0;
            do {
                if (!(len1 > 0 && len2 > 1)) throw new Error("Assertion error line 624: assert len1 > 0 && len2 > 1;");
                ;
                if (c(tmp[cursor2], a[cursor1]) < 0) {
                    a[dest--] = a[cursor1--];
                    count1++;
                    count2 = 0;
                    if (--len1 === 0) break outer;
                } else {
                    a[dest--] = tmp[cursor2--];
                    count2++;
                    count1 = 0;
                    if (--len2 === 1) break outer;
                }
            } while (((count1 | count2) < minGallop));
            do {
                if (!(len1 > 0 && len2 > 1)) throw new Error("Assertion error line 638: assert len1 > 0 && len2 > 1;");
                ;
                count1 = len1 - TimSort.gallopRight<any>(tmp[cursor2], a, base1, len1, len1 - 1, <any>(c));
                if (count1 !== 0) {
                    dest -= count1;
                    cursor1 -= count1;
                    len1 -= count1;
                    /* arraycopy */
                    ((srcPts, srcOff, dstPts, dstOff, size) => {
                        if (srcPts !== dstPts || dstOff >= srcOff + size) {
                            while (--size >= 0) dstPts[dstOff++] = srcPts[srcOff++];
                        } else {
                            let tmp = srcPts.slice(srcOff, srcOff + size);
                            for (let i = 0; i < size; i++) dstPts[dstOff++] = tmp[i];
                        }
                    })(a, cursor1 + 1, a, dest + 1, count1);
                    if (len1 === 0) break outer;
                }
                a[dest--] = tmp[cursor2--];
                if (--len2 === 1) break outer;
                count2 = len2 - TimSort.gallopLeft<any>(a[cursor1], tmp, 0, len2, len2 - 1, <any>(c));
                if (count2 !== 0) {
                    dest -= count2;
                    cursor2 -= count2;
                    len2 -= count2;
                    /* arraycopy */
                    ((srcPts, srcOff, dstPts, dstOff, size) => {
                        if (srcPts !== dstPts || dstOff >= srcOff + size) {
                            while (--size >= 0) dstPts[dstOff++] = srcPts[srcOff++];
                        } else {
                            let tmp = srcPts.slice(srcOff, srcOff + size);
                            for (let i = 0; i < size; i++) dstPts[dstOff++] = tmp[i];
                        }
                    })(tmp, cursor2 + 1, a, dest + 1, count2);
                    if (len2 <= 1) break outer;
                }
                a[dest--] = a[cursor1--];
                if (--len1 === 0) break outer;
                minGallop--;
            } while ((((lhs, rhs) => lhs || rhs)(count1 >= TimSort.MIN_GALLOP, count2 >= TimSort.MIN_GALLOP)));
            if (minGallop < 0) minGallop = 0;
            minGallop += 2;
        }
        ;
        this.minGallop = minGallop < 1 ? 1 : minGallop;
        if (len2 === 1) {
            if (!(len1 > 0)) throw new Error("Assertion error line 666: assert len1 > 0;");
            ;
            dest -= len1;
            cursor1 -= len1;
            /* arraycopy */
            ((srcPts, srcOff, dstPts, dstOff, size) => {
                if (srcPts !== dstPts || dstOff >= srcOff + size) {
                    while (--size >= 0) dstPts[dstOff++] = srcPts[srcOff++];
                } else {
                    let tmp = srcPts.slice(srcOff, srcOff + size);
                    for (let i = 0; i < size; i++) dstPts[dstOff++] = tmp[i];
                }
            })(a, cursor1 + 1, a, dest + 1, len1);
            a[dest] = tmp[cursor2];
        } else if (len2 === 0) {
            throw Object.defineProperty(new Error("Comparison method violates its general contract!"), '__classes', {
                configurable: true,
                value: ['java.lang.Throwable', 'java.lang.Object', 'java.lang.RuntimeException', 'java.lang.IllegalArgumentException', 'java.lang.Exception']
            });
        } else {
            if (!(len1 === 0)) throw new Error("Assertion error line 674: assert len1 == 0;");
            ;
            if (!(len2 > 0)) throw new Error("Assertion error line 675: assert len2 > 0;");
            ;
            /* arraycopy */
            ((srcPts, srcOff, dstPts, dstOff, size) => {
                if (srcPts !== dstPts || dstOff >= srcOff + size) {
                    while (--size >= 0) dstPts[dstOff++] = srcPts[srcOff++];
                } else {
                    let tmp = srcPts.slice(srcOff, srcOff + size);
                    for (let i = 0; i < size; i++) dstPts[dstOff++] = tmp[i];
                }
            })(tmp, 0, a, dest - (len2 - 1), len2);
        }
    }

    /**
     * Ensures that the external array tmp has at least the specified
     * number of elements, increasing its size if necessary.  The size
     * increases exponentially to ensure amortized linear time complexity.
     *
     * @param {number} minCapacity the minimum required capacity of the tmp array
     * @return {Array} tmp, whether or not it grew
     * @private
     */

    /*private*/
    ensureCapacity(minCapacity: number): T[] {
        if (this.tmp.length < minCapacity) {
            let newSize: number = minCapacity;
            newSize |= newSize >> 1;
            newSize |= newSize >> 2;
            newSize |= newSize >> 4;
            newSize |= newSize >> 8;
            newSize |= newSize >> 16;
            newSize++;
            if (newSize < 0) newSize = minCapacity; else newSize = Math.min(newSize, this.a.length >>> 1);
            let newArray: T[] = <T[]>new Array(newSize);
            this.tmp = newArray;
        }
        return this.tmp;
    }

    /**
     * Checks that fromIndex and toIndex are in range, and throws an
     * appropriate exception if they aren't.
     *
     * @param {number} arrayLen the length of the array
     * @param {number} fromIndex the index of the first element of the range
     * @param {number} toIndex the index after the last element of the range
     * @throws IllegalArgumentException if fromIndex > toIndex
     * @throws ArrayIndexOutOfBoundsException if fromIndex < 0
     * or toIndex > arrayLen
     * @private
     */

    /*private*/
    static rangeCheck(arrayLen: number, fromIndex: number, toIndex: number) {
        if (fromIndex > toIndex) throw Object.defineProperty(new Error("fromIndex(" + fromIndex + ") > toIndex(" + toIndex + ")"), '__classes', {
            configurable: true,
            value: ['java.lang.Throwable', 'java.lang.Object', 'java.lang.RuntimeException', 'java.lang.IllegalArgumentException', 'java.lang.Exception']
        });
        if (fromIndex < 0) throw Object.defineProperty(new Error(), '__classes', {
            configurable: true,
            value: ['java.lang.Throwable', 'java.lang.IndexOutOfBoundsException', 'java.lang.Object', 'java.lang.ArrayIndexOutOfBoundsException', 'java.lang.RuntimeException', 'java.lang.Exception']
        });
        if (toIndex > arrayLen) throw Object.defineProperty(new Error(), '__classes', {
            configurable: true,
            value: ['java.lang.Throwable', 'java.lang.IndexOutOfBoundsException', 'java.lang.Object', 'java.lang.ArrayIndexOutOfBoundsException', 'java.lang.RuntimeException', 'java.lang.Exception']
        });
    }
}

    //TimSort["__class"] = "java.util.TimSort";


