import { Field } from '../../Src/Model/Game/Utils/field';

describe('Field', () => {
    describe('constructor', () => {
        it('should initialize fields correctly', () => {
            const field = new Field(1, 2, true, 3);
            expect(field.x).toBe(1);
            expect(field.y).toBe(2);
            expect(field.isOpen).toBe(true);
            expect(field.minesAround).toBe(3);
        });
    });

    describe('setters and getters', () => {
        let field: Field;

        beforeEach(() => {
            field = new Field(0, 0);
        });

        it('should set and get x-coordinate correctly', () => {
            field.x = 2;
            expect(field.x).toBe(2);
        });

        it('should set and get y-coordinate correctly', () => {
            field.y = 2;
            expect(field.y).toBe(2);
        });

        it('should set and get x-coordinate and y-coordinate correctly', () => {
            field.setXY(1, 2);
            expect(field.getXY()).toEqual({
                x: 1, y: 2
            });
        });
        
        it('should set and get isVeiled correctly', () => {
            field.isOpen = true;
            expect(field.isOpen).toBe(true);
            field.isOpen = false;
            expect(field.isOpen).toBe(false);
        });

        it('should set and get minesAround correctly', () => {
            field.minesAround = 5;
            expect(field.minesAround).toBe(5);
        });
    });

    describe('incrementMinesAround', () => {
        let field: Field;

        beforeEach(() => {
            field = new Field(1,1)
        });

        it("should increment the minesAround property by one", () => {
            field.minesAround = 3;
            field.incrementMinesAround();
            expect(field.minesAround).toBe(4);
        });

        it("should not increment the minesAround value if it is 8", () => {
            field.minesAround = 8;
            field.incrementMinesAround();
            expect(field.minesAround).toBe(8);
        });
    })

    describe('decrementMinesAround', () => {
        let field: Field;

        beforeEach(() => {
            field = new Field(1, 1);
        });

        it("should decrement the minesAround property by one", () => {
            field.minesAround = 7;
            field.decrementMinesAround();
            expect(field.minesAround).toBe(6);
        });

        it("should not decrement the minesAround property if it is 0", () => {
            field.minesAround = 0;
            field.decrementMinesAround();
            expect(field.minesAround).toBe(0);
        });
    })

    describe('isNeighbor', () => {
        const field00 = new Field(0, 0);
        const field01 = new Field(0, 1);
        const field02 = new Field(0, 2);
        const field10 = new Field(1, 0);
        const field11 = new Field(1, 1);
        const field12 = new Field(1, 2);
        const field20 = new Field(2, 0);
        const field21 = new Field(2, 1);
        const field22 = new Field(2, 2);

        it('should return true for neighboring grids', () => {
            expect(field00.isNeighbor(field00)).toBe(false);
            expect(field10.isNeighbor(field11)).toBe(true);
            expect(field00.isNeighbor(field11)).toBe(true);
            expect(field00.isNeighbor(field22)).toBe(false);
        });
    });

    describe('logField', () => {
        it('should correctly format and log field information', () => {
            const field = new Field(1, 2, true, 3);
            const logSpy = jest.spyOn(process.stdout, 'write').mockImplementation();
            field.logField();
            expect(logSpy).toHaveBeenCalledTimes(1);
            logSpy.mockRestore();
        });
    });
});