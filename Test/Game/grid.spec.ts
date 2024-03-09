import { Grid } from '../../Src/Model/Game/Utils/grid';

describe('Grid', () => {
  let grid: Grid;

  beforeEach(() => {
    grid = new Grid(1, 2);
  });

  describe('constructor', () => {
    it('should initialize x and y coordinates correctly', () => {
      expect(grid.x).toBe(1);
      expect(grid.y).toBe(2);
    });
  });

  describe('setters', () => {
    it('should set the x-coordinate correctly', () => {
      grid.x = 3;
      expect(grid.x).toBe(3);
    });

    it('should set the y-coordinate correctly', () => {
      grid.y = 4;
      expect(grid.y).toBe(4);
    });
  });

  describe('getXY and setXY', () => {
    it('should correctly get and set x and y coordinates', () => {
      grid.setXY(3, 4);
      expect(grid.getXY()).toEqual({ x: 3, y: 4 });
    });
  });

  describe('equals', () => {
    it('should return true for equal grids', () => {
      const otherGrid = new Grid(1, 2);
      expect(grid.equals(otherGrid)).toBe(true);
      expect(grid.inEquals(otherGrid)).toBe(false);
    });

    it('should return false for different grids', () => {
      const otherGrid = new Grid(3, 4);
      expect(grid.equals(otherGrid)).toBe(false);
      expect(grid.inEquals(otherGrid)).toBe(true);
    });
  });
});
