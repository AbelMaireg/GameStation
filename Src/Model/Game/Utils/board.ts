import { Grid } from "./grid";
import { Field } from "./field";
import { Stack } from "../Algorithm/stack"
import { Queue } from "../Algorithm/queue"
import { Database } from "../Router/database"

class Board {
    private _userId: string;
    private _gameId: string;
    private _rows: number;
    private _columns: number;
    private _fields: Field[][];
    private _mineSize: number = 0;
    private _database: Database;

    constructor(userId:string, gameId: string, rows: number, columns: number) {
        this._userId = userId;
        this._gameId = gameId;
        this._rows = rows;
        this._columns = columns;
        this._fields = [];
        this._database = new Database('localhost', 'root', '6006174009010', 'Minesweeper');

        for (let r = 0; r < this._rows; ++r) {
            const newRow: Field[] = [];
            for (let c = 0; c < this._columns; ++c) {
                newRow.push(new Field(r, c));
            }
            this._fields.push(newRow);
        }
    }
    
    public get userId() {
        return this._userId;
    }

    public get gameId() {
        return this._gameId;
    }
    
    public get rows() {
        return this._rows;
    }

    public get columns() {
        return this._columns;
    }

    public get fields() {
        return this._fields;
    }

    public get mineSize() {
        return this._mineSize;
    }

    public getFieldAt(x: number, y: number): Field {
        return this.fields[x][y];
    }

    public getFieldAtPosition(position: Grid): Field {
        return this.fields[position.x][position.y];
    }

    public isAFieldSatisfied(position: Grid): boolean {
        let field = this.getFieldAtPosition(position);

        if (field.isOpen && field.isSafe()) {
            let minesAround = field.minesAround;

            for (let i = position.x - 1; i <= position.x + 1; ++i) {
                for (let j = position.y - 1; j <= position.y + 1; ++j) {
                    if (this.validateGrid(i, j) &&
                        field.inEquals(this.fields[position.x][position.y]) &&
                        field.isSafe()
                    ) {
                        minesAround--;
                    }
                }
            }

            if (minesAround == 0)
                return true;
        }

        return false;
    }

    public incrementMineSize() {
        this._mineSize++;
    }

    public decrementMineSize() {
        this._mineSize--;
    }

    private validateGrid(x: number, y: number): boolean {
        return (x < 0 || x >= this.rows) ? false : (y < 0 || y >= this.columns) ? false : true;
    }

    private validatePosition(position: Grid): boolean {
        return this.validateGrid(position.x, position.y);
    }
    
    public putMineAt(position: Grid): boolean {
        if (this.validatePosition(position) && this._fields[position.x][position.y].isSafe()){
            this._fields[position.x][position.y].minesAround = -1;

            for (let i = position.x - 1; i <= position.x + 1; ++i) {
                for (let j = position.y - 1; j <= position.y + 1; ++j) {
                    if (this.validateGrid(i, j) &&
                        this._fields[i][j].inEquals(this._fields[position.x][position.y]) &&
                        this._fields[i][j].isSafe()
                    ) {
                        this._fields[i][j].incrementMinesAround();
                    }
                }
            }
            this.incrementMineSize();
            return true;
        }
        else return false;
    }

    public neutralizeMineAt(position: Grid): boolean {
        if (this.validatePosition(position) && this.getFieldAtPosition(position).isMine()) {
            for (let i = position.x - 1; i <= position.x + 1; ++i) {
                for (let j = position.y - 1; j <= position.y + 1; ++j) {
                    if (this.validateGrid(i, j) &&
                        this._fields[i][j].inEquals(this._fields[position.x][position.y]) &&
                        this._fields[i][j].isSafe()
                    ) {
                        this._fields[i][j].decrementMinesAround();
                    }
                }
            }
            
            this.getFieldAtPosition(position).minesAround = 0;
            this.decrementMineSize();
            return true;
        }

        else return false;
    }

    public traverseZeros(position: Grid): Queue {
        let nullFields: Stack = new Stack();
        let nomansFields: Queue = new Queue();
        nullFields.push(this.getFieldAtPosition(position));
        nomansFields.enqueue(this.getFieldAtPosition(position));

        while (!nullFields.isEmpty()) {
            let currentField = nullFields.pop();
            currentField.open();

            if (currentField.minesAround == 0) {
                for (let i = position.x - 1; i <= position.x + 1; ++i) {
                    for (let j = position.y - 1; j <= position.y + 1; ++j) {
                        if (this.validateGrid(i, j)
                        ) {
                            if (this.fields[i][j].open() && this.fields[i][j].isNullField()) {
                                nullFields.push(this.fields[i][j]);
                                nomansFields.enqueue(this.fields[i][j]);
                                this.traverseZeros(new Grid(i, j));
                            }
                        }
                    }
                }
            }
        }

        return nomansFields;
    }

    public solve(): void {
        
    };

    public async save(): Promise<Boolean> {
        let result: Boolean = await this._database.saveBoard(this); 
        return result;
    };

    public load(): void {

    };

    // prints the board revieling all the fields open
    public logBoard() {
        for (let r = 0; r < this._rows; ++r) {
            for (let c = 0; c < this._columns; ++c) {
                this._fields[r][c].logField();
            }
            process.stdout.write("\n");
        }

        process.stdout.write('\n');
    }

    // prints the board reveiling the fields which are open
    public logBoardForPlay() {
        for (let r = 0; r < this._rows; ++r) {
            for (let c = 0; c < this._columns; ++c) {
                this._fields[r][c].logForPlay();
            }
            process.stdout.write("\n");
        } 

        process.stdout.write('\n');
    }

    public log() {
        for (let r = 0; r < this._rows; ++r) {
            for (let c = 0; c < this._columns; ++c) {
                this._fields[r][c].log();
            }
            process.stdout.write(`\n`);
        } 
    }
}

export { Board };
