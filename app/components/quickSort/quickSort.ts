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
            if (mas[i].id <= mas[r][field] )
                mas = swap(mas, ++pos, i);
        }

        return pos;
    }

    private quick_sort(mas: any[], l: number, r: number, field: string) {
        if (l >= r) {
            return;
        }
        let pivot: number = quickSort.partition(mas,l,r,field);

        this.quick_sort(mas,l,pivot-1,field);
        this.quick_sort(mas,pivot+1,r,field);
    }

    getSorted(array: any[], l: number, r: number, field: string) {
        let mas: any[] = [];

        array.forEach(function(item, i, arr) {
            mas[i] = item;
        });

        this.quick_sort(mas,l,r,field);
        return mas;
    }
}