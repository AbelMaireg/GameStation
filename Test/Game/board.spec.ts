import { Board } from '../../Src/Model/Game/Utils/board';
import { Field } from '../../Src/Model/Game/Utils/field';
import { Grid } from "../../Src/Model/Game/Utils/grid";

describe('Board', () => {
    let board: Board;

    beforeEach(() => {
        board = new Board("abelmaire", "1", 4, 4);
    });

    it('constructor creates the board with the correct dimensions', () => {
        expect(board.rows).toBe(4);
        expect(board.columns).toBe(4);
        expect(board.fields.length).toBe(4);
        expect(board.fields[0].length).toBe(4);
    });

    it('getFieldAt returns the correct field', () => {
        let field: Field = board.getFieldAtPosition(new Grid(2, 2));
        expect(field).toBeInstanceOf(Field);
        expect(field.x).toBe(2);
        expect(field.y).toBe(2);
    });

    it('traverseZeros correctly traverses the board', () => {
        board.putMineAt(new Grid(0, 3));
        board.putMineAt(new Grid(3, 0));
        board.putMineAt(new Grid(3, 3));
        board.traverseZeros(new Grid(0, 0));
        expect(board.getFieldAtPosition(new Grid(0, 0)).isOpen).toBe(true);
        expect(board.getFieldAtPosition(new Grid(0, 1)).isOpen).toBe(true);
        expect(board.getFieldAtPosition(new Grid(0, 2)).isOpen).toBe(true);
        expect(board.getFieldAtPosition(new Grid(1, 0)).isOpen).toBe(true);
        expect(board.getFieldAtPosition(new Grid(1, 1)).isOpen).toBe(true);
        expect(board.getFieldAtPosition(new Grid(1, 2)).isOpen).toBe(true);
        expect(board.getFieldAtPosition(new Grid(2, 0)).isOpen).toBe(true);
        expect(board.getFieldAtPosition(new Grid(2, 1)).isOpen).toBe(true);
        expect(board.getFieldAtPosition(new Grid(2, 2)).isOpen).toBe(true);

        expect(board.getFieldAtPosition(new Grid(0, 3)).isOpen).toBe(false);
        expect(board.getFieldAtPosition(new Grid(1, 3)).isOpen).toBe(false);
        expect(board.getFieldAtPosition(new Grid(2, 3)).isOpen).toBe(false);
        expect(board.getFieldAtPosition(new Grid(3, 3)).isOpen).toBe(false);
        expect(board.getFieldAtPosition(new Grid(3, 2)).isOpen).toBe(false);
        expect(board.getFieldAtPosition(new Grid(3, 1)).isOpen).toBe(false);
        expect(board.getFieldAtPosition(new Grid(3, 0)).isOpen).toBe(false);
        
    });
});
