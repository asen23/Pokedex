// 1) Variable Keyword
    // a. var [not recommended - mutable]
    var cobaTest = "Test"
    cobaTest = "Checking"
    console.log(cobaTest)

    // b. let [recommended - mutable]
    let cobaLet = "Let"
    cobaLet = "Ok"
    console.log(typeof cobaLet)

    // c. const
    const gaBisaUbahNilai = "Cannot change"
    // gaBisaUbahNilai = "Forced change"

// 2) Data Type
/*
Data Type in JS: undefined, boolean, number, string, bigint, symbol, null, object, function
Data Type in TS: undefined, boolean, number, string, number, symbol, null, object, function, any, union, intersection, enum, void, advance type
*/
    // a. primitive
    let iniTeks: string = "Ini teks"
    let iniAngka: number = 10
    let iniBool: boolean = true
    console.log(typeof iniTeks)
    console.log(iniAngka)
    console.log(typeof iniBool)

    // b. array
        // i. Type Inference
        let array = [1,2,3,4]
        console.log(array)
        // ii. Square Brackets (ideal)
        let arrayAngka: number[] = [5,6,7,8]
        console.log(arrayAngka)
        // iii. Generic Array (kurang lazim di JavaScript)
        let buah: Array<string> = ["Apel", "Mangga", "Jeruk"]
        console.log(buah)

    // c. tuple
        // i. Type Inference
        let tupleEx = ["test", 1, 2]
        console.log(tupleEx)
        // ii. Square Brackets (ideal)
        let tupleDef: [string, number, number] = ["teks", 0, 9]
        console.log(tupleDef)

    // d. enum
    enum Shape {
        CIRCLE = "Circle",
        SQUARE = "Square",
        TRIANGLE = "Triagle"
    }
    let bentuk = Shape.SQUARE
    console.log(bentuk)

    // e. any, void, null, undefined
    let anything: any = ["string", 1]
    console.log(anything)
    let nilaiNull = null
    console.log(typeof nilaiNull)
    let isiKosong
    console.log(isiKosong)

    // f. object
        // i. simple object literal
        var obj = { warna: "biru", bentuk: "lingkaran", harga: 5000, tipe: "standar" };
        console.log(obj)
        let arrObj = [
            {warna: "biru", bentuk: "lingkaran"},
            {warna: "merah", bentuk: "kotak"}
        ]
        console.log(arrObj)

        // ii. nested, object
        let nestedObj = {
            id: "ID-1",
            price: 20000,
            detailProduct: {
                amount: 2,
                type: "original"
            }
        }
        console.log(nestedObj)

        // iii. nested, object of array
        let nestedObjArr = {
            id: "ID-1",
            totalPrice: 20000,
            listProduct: [
                {
                    name: "ayam",
                    price: 15000
                },
                {
                    name: "pensil",
                    price: 5000
                }
            ]
        }
        console.log(nestedObjArr)

        // iv. nested, object of object (dynamic properties)
        let dynamicProp = {
            id: "ID-1",
            items: {
                p1: {
                    id: "P1",
                    name: "item A",
                    price: 2000
                },
                p2: {
                    id: "P2",
                    name: "item B",
                    price: 5000
                }
            }
        }
        console.log(dynamicProp)

// 3) Destructuring
const { harga, tipe } = obj
console.log(harga)
console.log(tipe)

// 4) Union Type
let flexNumText: number | string = 10
flexNumText = "Contoh"

// 5) Type Aliases
type CustomType = boolean | number
let iniCustom: CustomType
iniCustom = true
console.log(iniCustom)

// 6) Type Assertion
function sayHello(name: string) {
    return `Hello ${name}`
}
let iniCast1: string = sayHello("React Native") as string
let iniCast2: string = <string>sayHello("ReactNative")
console.log(iniCast1)
console.log(iniCast2)

// 7) Condition
    // a. if-else
    let angkaRandom = 12
    if(angkaRandom < 10) console.log("Angka kurang dari 10")
    else if(angkaRandom == 10) console.log("Angkanya pas 10")
    else {
        console.log("Angka 11 ke atas")
    }

    // b. ternary operator
    console.log(angkaRandom < 10 ? "Angka kurang dari 10" : "Angka 10 ke atas")

    // c. switch
    angkaRandom = 8
    switch (angkaRandom) {
        case 12:
            console.log("Ini angka 12")
            break;
        default:
            console.log("Ini angka selain 12")
            break;
    }

// 8) Loop
    // a. for loop
    let listPakaian = ["Baju", "Celana", "Rok", "Sepatu"]
    for (let index = 0; index < listPakaian.length; index++) {
        const currPakaian = listPakaian[index];
        console.log(currPakaian)
    }

    // b. for of loop
    for(let value of listPakaian) {
        console.log(value)
    }

    // c. for in loop
    for(let index in listPakaian) {
        console.log(index)
    }

    // d. while
    let indeks = 2
    while(indeks > 0) {
        console.log(indeks--)
    }

    // e. do while
    do {
        console.log("ini kecetak")
    }
    while(indeks > 5)

// 9) Interface
    // a. inline interface
    let mahasiswa: {name: string, nim: string} = {
        name: "mhs 1",
        nim: "260123456"
    }
    console.log(mahasiswa)

    // b. simple interface
    interface Trainee {
        name: string;
        joinDate: string;
        traineeId: string;
        age: number;
    }
    let trainee: Trainee = {
        name: "Trainee A",
        joinDate: "19 Jan 23",
        traineeId: "1",
        age: 20
    }
    console.log(trainee)
    console.log(typeof trainee)

    // c. optional properties
    interface OptTrainee {
        name: string;
        joinDate?: string;
        traineeId: string;
        age: number;
    }
    let oldTrainee: OptTrainee = {
        name: "Trainee A",
        traineeId: "1",
        age: 20
    }
    console.log(oldTrainee)

    // d. readonly properties
    interface ReadOnlyTrainee {
        readonly name: string;
        joinDate?: string;
        traineeId: string;
        age: number;
    }
    let newTrainee: ReadOnlyTrainee = {
        name: "Trainee A",
        traineeId: "1",
        age: 20
    }
    // newTrainee.name = "Ganti nama" // ga bisa diganti namanya

    // e. function properties
    interface TraineeFunc {
        name: string;
        sayHello(name: string): string;
    }
    let funcTrainee: TraineeFunc = {
        name: "Test",
        sayHello: (name) => {
            return `Halo ${name} di React Native`
        }
    }

// 10) Function
    // a. function
    function addNum(x, y) {
        return x + y;
    }
    console.log(addNum(5, 4));

    // b. arrow function
    var sumNumber = function (a, b) {
        return a + b;
    };
    console.log(sumNumber(4, 7));

    // c. optional parameter
    function generateFullname(firstName, lastName) {
        if (lastName)
            return "".concat(firstName, " ").concat(lastName);
        else
            return "".concat(firstName, " aja");
    }
    console.log(generateFullname("Angelia"));

    // d. default parameter
    function generateForcedLastName(firstName, lastName) {
        if (lastName === void 0) { lastName = "Belakang"; }
        return "".concat(firstName, " ").concat(lastName);
    }
    console.log(generateForcedLastName("Angelia"));
    console.log(generateForcedLastName("Angelia", "Widjaja"));

    // e. rest parameter
    function sumAll(initial) {
        var numbers = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            numbers[_i - 1] = arguments[_i];
        }
        var total = initial;
        for (var _a = 0, numbers_1 = numbers; _a < numbers_1.length; _a++) {
            var num = numbers_1[_a];
            total = total + num;
        }
        return total;
    }
    console.log(sumAll(5, 6, 4, 7, 3));
    console.log(sumAll(5, 6, 4, 7, 3, 8, 2));

    // f. anonymous function
    var cobaHello = function (name) {
        return "Hello ".concat(name);
    };
    function sample(cobaHello) {
        console.log(cobaHello("Angel"));
    }
    sample(cobaHello);