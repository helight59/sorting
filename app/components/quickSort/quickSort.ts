import sortArray from './lodashSort';

export default class quickSort {
    constructor() {
    }

    private static partition(mas: any[], l: number, r: number, field: string):number {
        function swap(mas: any[], a:any, b:any) {

            let tmp: any = mas[a];
            mas[a] = mas[b];
            mas[b] = tmp;

            return mas;
        }

        let pos: number = l-1;
        for (let i: number = l; i <= r; ++i) {
            if (+mas[i][field] <= +mas[r][field] )
                mas = swap(mas, ++pos, i);
        }

        return pos;
    }

    private quick_sort(mas: any[], l: number, r: number, field: string, pivot?: number) {
        if (l >= r) {
            return;
        }
        if (!pivot) {
            pivot = quickSort.partition(mas,l,r,field);
        }

        try {
            this.quick_sort(mas,l,pivot-1,field);
            this.quick_sort(mas,pivot+1,r,field);
        } catch (e) {
            return pivot;
        }

    }

    getSorted(array: any[], field: any) {
        let mas: any[] = [];
        let masHaveString: any[] = [];

        if (!field) {
            field = "id"
        }

        let stringFlag = false;
        if (!field) {
            field = "id";
        }



        array.forEach(function(item, i, arr) {

            if (!stringFlag) {
                if (!parseFloat(item[field])) {
                    stringFlag = true;
                }
            }
            mas[i] = item;
        });



        if (stringFlag) {
            return sortArray(mas, field);
        }


        let l:number = 0;
        let r:number = mas.length - 1;
        let result = this.quick_sort(mas,l,r,field);
        if ( result >= 0) {
            this.quick_sort(mas,l,r,field,result)
        }

        return mas;
    }
}