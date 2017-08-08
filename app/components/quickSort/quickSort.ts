export default class quickSort {
    stringTable = {
        "0": "000",
        "1": "001",
        "2": "002",
        "3": "003",
        "4": "004",
        "5": "005",
        "6": "006",
        "7": "007",
        "8": "008",
        "9": "009",
        "A": "110",
        "B": "111",
        "C": "112",
        "D": "113",
        "E": "114",
        "F": "115",
        "G": "116",
        "H": "117",
        "I": "118",
        "J": "119",
        "K": "120",
        "L": "121",
        "M": "122",
        "N": "123",
        "O": "124",
        "P": "125",
        "Q": "126",
        "R": "127",
        "S": "128",
        "T": "129",
        "U": "130",
        "V": "131",
        "W": "132",
        "X": "133",
        "Y": "134",
        "Z": "135",
        "А": "136",
        "Б": "137",
        "В": "138",
        "Г": "139",
        "Д": "140",
        "Е": "141",
        "Ё": "142",
        "Ж": "143",
        "З": "144",
        "И": "145",
        "Й": "146",
        "К": "147",
        "Л": "148",
        "М": "149",
        "Н": "150",
        "О": "151",
        "П": "152",
        "Р": "153",
        "С": "154",
        "Т": "155",
        "У": "156",
        "Ф": "157",
        "Х": "158",
        "Ц": "159",
        "Ч": "160",
        "Ш": "161",
        "Щ": "162",
        "Ъ": "163",
        "Ы": "164",
        "Ь": "165",
        "Э": "166",
        "Ю": "167",
        "Я": "168",

};
    maxLen = [
        {
            "len": 0
        }
    ];

    constructor() {
    }

    private static partition(mas: any[], l: number, r: number):number {
        function swap(mas: any[], a:any, b:any) {

            let tmp: any = mas[a];
            mas[a] = mas[b];
            mas[b] = tmp;

            return mas;
        }

        let pos: number = l-1;
        for (let i: number = l; i <= r; ++i) {
            if (+mas[i]["__sortTMP__"] <= +mas[r]["__sortTMP__"] )
                mas = swap(mas, ++pos, i);
        }

        return pos;
    }

    private quick_sort(mas: any[], l: number, r: number, pivot?: number) {
        if (l >= r) {
            return;
        }
        if (!pivot) {
            pivot = quickSort.partition(mas,l,r);
        }

        try {
            this.quick_sort(mas,l,pivot-1);
            this.quick_sort(mas,pivot+1,r);
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

        let stringTable: any = this.stringTable;
        let maxLen = this.maxLen;

        array.forEach(function(item, i, arr) {

            let itemString: string = item[field].toString();

            if (itemString.length > maxLen[0].len) {
                maxLen[0].len = itemString.length;
            }

            mas[i] = item;
        });


        array.forEach(function(item, i, arr) {

            let itemString: string = item[field].toString().replace(/\s{2,}/g, ' ');
            let bigSize: string;

            if (maxLen[0].len > itemString.length) {
                let diff = maxLen[0].len - itemString.length;
                bigSize = itemString  + '0'.repeat(diff)
            } else if (maxLen[0].len === itemString.length) {
                bigSize = itemString;
            }

            arr[i]["__sortTMP__"] = bigSize.replace(/./gi,($0: any)=>stringTable[$0.toUpperCase()]||$0);


            mas[i] = item;
        });

        let l:number = 0;
        let r:number = mas.length - 1;
        let result = this.quick_sort(mas,l,r);
        if ( result >= 0) {
            this.quick_sort(mas,l,r,result)
        }

        return mas;
    }
}