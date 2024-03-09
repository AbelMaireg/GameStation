import { Grid } from "./grid";

class Field extends Grid {
    private _isOpen: boolean;
    private _minesAround: number;

    constructor(
        x: number,
        y: number,
        isOpen: boolean = false,
        minesAround: number = 0
    ) {
        super(x, y);
        this._isOpen = isOpen;
        this._minesAround = minesAround;
    }

    public get isOpen(): boolean {
        return this._isOpen;
    }

    public set isOpen(value: boolean) {
        this._isOpen = value;
    }

    public get minesAround(): number {
        return this._minesAround;
    }

    public set minesAround(value: number) {
        this._minesAround = value;
    }

    public incrementMinesAround(): void {
        if (this.minesAround == 8) return;
        this._minesAround += 1;
    }

    public decrementMinesAround(): void {
        if (this.minesAround == 0) return;
        this._minesAround -= 1;
    }

    public isMine(): boolean {
        return this._minesAround == -1;
    }

    public isSafe(): boolean {
        return !this.isMine();
    }

    public isNullField(): boolean {
        return this.minesAround == 0 ? true : false;
    }

    public open(): boolean {
        if (this.isOpen) {
            return false;
        } else {
            this.isOpen = true;
            return true;
        }
    }

    public isNeighbor(other: Grid): boolean {
        return Math.abs(this.x - other.x) == 1 && Math.abs(this.y - other.y) == 1
            ? true
            : Math.abs(this.x - other.x) == 1 && Math.abs(this.y - other.y) == 0
                ? true
                : Math.abs(this.x - other.x) == 0 && Math.abs(this.y - other.y) == 1
                    ? true
                    : false;
    }

    public logField(): void {
        const colorReset = "\x1b[0m";
        const colorRed = "\x1b[31m";
        const colorGreen = "\x1b[32m";
        const colorYellow = "\x1b[33m";
        const colorBlue = "\x1b[34m";
        const backgroundColor = this.isSafe() ? colorGreen : colorRed;

        const fieldValue = this._minesAround.toString().padStart(2, " ");

        process.stdout.write(`${backgroundColor}${fieldValue}${colorReset} | `);
    }

    public logForPlay(): void {
        const colorReset = "\x1b[0m";
        const colorRed = "\x1b[31m";
        const colorGreen = "\x1b[32m";
        const colorYellow = "\x1b[33m";
        const colorBlue = "\x1b[34m";
        let backgroundColor;

        const fieldValue = this._minesAround.toString().padStart(2, " ");

        if (this.isOpen) {
            backgroundColor = this.isSafe() ? colorGreen : colorRed;
            process.stdout.write(`${backgroundColor}${fieldValue}${colorReset} | `);
        } else {
            backgroundColor = colorBlue;
            process.stdout.write(
                `${backgroundColor}${String.fromCharCode(3332).padStart(
                    2,
                    " "
                )}${colorReset} | `
            );
        }
    }

    public log(): void {
        const colorReset = "\x1b[0m";
        const colorRed = "\x1b[31m";
        const colorGreen = "\x1b[32m";
        const colorYellow = "\x1b[33m";
        const colorBlue = "\x1b[34m";
        const backgroundColor = this._minesAround !== -1 ? colorGreen : colorRed;

        process.stdout.write(`${colorBlue}${this._x}${colorReset} | `);
        process.stdout.write(`${colorBlue}${this._y}${colorReset} | `);
        process.stdout.write(
            `${backgroundColor}${this._minesAround}${colorReset} | `
        );
    }
}

export { Field };
