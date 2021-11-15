class BubbleSort {
    constructor(time = 500) {
        this.time = time;
    }

    prettifyArray(array, compareIndex, symbol = " ") {
        let prettyArray = "";
        for (let i = 0; i < array.length; i++) {
            if (compareIndex === undefined) {
                prettyArray += "  " + array[i] + "  ";
            } else {
                if (compareIndex == i) {
                    prettyArray += " (" + array[i] + " " + symbol;
                } else if (compareIndex + 1 == i) {
                    prettyArray += "  " + array[i] + ") ";
                } else {
                    prettyArray += "  " + array[i] + "  ";
                }
            }
        }
        return prettyArray;
    }

    printDashboard({
        totalOperation,
        status,
        arrayCopy,
        arrayOfItem,
        checkedIndex = undefined,
        sleep = true,
        clearScreen = true,
    }) {
        console.log(":: SORTING");
        console.log("Status         :   " + status);
        console.log("Operation      :   " + totalOperation);
        console.log("Unsorted Array :", this.prettifyArray(arrayCopy));
        console.log(
            "Sorted Array   :",
            this.prettifyArray(
                arrayOfItem,
                checkedIndex === undefined ? undefined : checkedIndex,
                ">"
            )
        );
        if (sleep) this.sleep(this.time);
        if (clearScreen) this.clearScreen();
    }

    sort(arrayOfItem) {
        this.clearScreen();
        const arrayCopy = [...arrayOfItem];
        let totalOperation = 0;
        let finish = false;
        while (!finish) {
            finish = true;
            for (let i = 0; i < arrayOfItem.length - 1; i++) {
                totalOperation++;
                this.printDashboard({
                    totalOperation,
                    status: "check",
                    arrayCopy,
                    arrayOfItem,
                    checkedIndex: i,
                });
                let isSwap = false;
                if (arrayOfItem[i] > arrayOfItem[i + 1]) {
                    [arrayOfItem[i], arrayOfItem[i + 1]] = [
                        arrayOfItem[i + 1],
                        arrayOfItem[i],
                    ];
                    finish = false;
                    isSwap = true;
                }
                this.printDashboard({
                    totalOperation,
                    status: isSwap ? "swap" : "stay",
                    arrayCopy,
                    arrayOfItem,
                    checkedIndex: i,
                });
            }
        }
        this.printDashboard({
            totalOperation,
            status: "sorted",
            arrayCopy,
            arrayOfItem,
            clearScreen: false,
        });

        return arrayOfItem;
    }

    sleep(milliseconds) {
        let start = new Date().getTime();
        for (let i = 0; i < 1e7; i++) {
            if (new Date().getTime() - start > milliseconds) {
                break;
            }
        }
    }

    clearScreen() {
        // Un-comment this line if you have trouble with console.clear();
        // return process.stdout.write('\033c');
        console.clear();
    }
}

// ? uncomment to run sorting
// const bbShort = new BubbleSort(500);
// bbShort.sort([4, 52, 234, 35, 0, 2]);

module.exports = BubbleSort;
