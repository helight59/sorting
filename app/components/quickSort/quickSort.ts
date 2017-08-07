export default class quickSort {
    stringTable: string[] = [
        "A",
        "B",
        "C",
        "D",
        "E",
        "F",
        "G",
        "H",
        "I",
        "J",
        "K",
        "L",
        "M",
        "N",
        "O",
        "P",
        "Q",
        "R",
        "S",
        "T",
        "U",
        "V",
        "W",
        "X",
        "Y",
        "Z",
        "А",
        "Б",
        "В",
        "Г",
        "Д",
        "Е",
        "Ё",
        "Ж",
        "З",
        "И",
        "Й",
        "К",
        "Л",
        "М",
        "Н",
        "О",
        "П",
        "Р",
        "С",
        "Т",
        "У",
        "Ф",
        "Х",
        "Ц",
        "Ч",
        "Ш",
        "Щ",
        "Ъ",
        "Ы",
        "Ь",
        "Э",
        "Ю",
        "Я",
        "0",
        "1",
        "2",
        "3",
        "4",
        "5",
        "6",
        "7",
        "8",
        "9"
    ];

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
            if (+mas[i].id <= +mas[r][field] )
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

    getSorted(array: any[], field: any) {
        let mas: any[] = [];
        let masHaveString: any[] = [];

        if (!field) {
            field = "id"
        }
        let stringTable: string[] = this.stringTable;

        array.forEach(function(item, i, arr) {
            arr[i]["__sortTMP__"] =
                stringTable.indexOf( item[field].toString().charAt(0).toUpperCase() );
            debugger
        });

        if (masHaveString.length >= 2) {
            let l:number = 0;
            let r:number = masHaveString.length - 1;

            this.quick_sort(masHaveString,l,r,field);
        }

        let l:number = 0;
        let r:number = mas.length - 1;
        this.quick_sort(mas,l,r,field);

        return mas.concat(masHaveString);
    }
}