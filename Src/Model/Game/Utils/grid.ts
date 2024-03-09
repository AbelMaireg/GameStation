class Grid {
    protected _x: number;
    protected _y: number;

    public constructor(x: number, y: number) {
        this._x = x;
        this._y = y;
    }

    public get x(): number {
        return this._x;
    }

    public set x(value: number) {
        this._x = value;
    }

    public get y(): number {
        return this._y;
    }

    public set y(value: number) {
        this._y = value;
    }

    public getXY(): object {
        return {x: this._x, y: this._y};
    }

    public setXY(x: number, y: number): void {
        this.x = x;
        this.y = y;
    }    

    public equals(other: Grid): boolean {
        return this.x === other.x && this.y === other.y;
    }

    public inEquals(other: Grid): boolean {
        return !this.equals(other);
    }
}

export { Grid };