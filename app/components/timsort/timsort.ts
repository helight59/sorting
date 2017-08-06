'use strict';

export default class timsort {
    array: any;
    n: number;

    constructor(testArray: any) {
        this.array = testArray;
        this.n = testArray.length;
        debugger
        //this.minrun = getMinrun(this.n);
    }

    getArray() {
        console.log("Minrun", this.getMinrun(this.n))
        return this.array;
    }

    getMinrun(n: number) {
        let r = 0;
        /* станет 1 если среди сдвинутых битов будет хотя бы 1 ненулевой */
        while (n >= 64) {
            r |= n & 1;
            n = n >> 1;
        }


        return n + r;
    }
}