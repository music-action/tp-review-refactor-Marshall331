/* eslint-disable */

const TOP_ROW = 0;
const MIDDLE_ROW = 1;
const BOTTOM_ROW = 2;

const LEFT_COLUMN = 0;
const CENTER_COLUMN = 1;
const RIGHT_COLUMN = 2;

const PLAYER_O = "O";
const EMPTY_CELL = " ";

export class Game {
  private _lastPlayedMark = EMPTY_CELL;
  private _grid: Grid = new Grid();

  public Play(mark: string, row: number, column: number): void {
    this.validateFirstTurn(mark);
    this.validateTurnOrder(mark);
    this.validateCellIsEmpty(row, column);

    this.updateLastPlayedMark(mark);
    this.placeMark(mark, row, column);
  }

  private validateFirstTurn(mark: string) {
    if (this._lastPlayedMark === EMPTY_CELL && mark === PLAYER_O) {
      throw new Error("Invalid first player");
    }
  }

  private validateTurnOrder(mark: string) {
    if (mark === this._lastPlayedMark) {
      throw new Error("Invalid next player");
    }
  }

  private validateCellIsEmpty(row: number, column: number) {
    if (this._grid.cellAt(row, column).isOccupied) {
      throw new Error("Invalid position");
    }
  }

  private updateLastPlayedMark(mark: string) {
    this._lastPlayedMark = mark;
  }

  private placeMark(mark: string, row: number, column: number) {
    this._grid.placeMarkAt(mark, row, column);
  }

  public Winner(): string {
    return this._grid.findWinningRow();
  }
}

class Cell {
  private row: number;
  private column: number;
  private mark: string;

  constructor(row: number, column: number, mark: string) {
    this.row = row;
    this.column = column;
    this.mark = mark;
  }

  get Mark() {
    return this.mark;
  }

  get isOccupied() {
    return this.mark !== EMPTY_CELL;
  }

  hasSameMarkAs(other: Cell) {
    return this.mark === other.mark;
  }

  hasSamePositionAs(other: Cell) {
    return this.row === other.row && this.column === other.column;
  }

  updateMark(newMark: string) {
    this.mark = newMark;
  }
}

class Grid {
  private _cells: Cell[] = [];

  constructor() {
    for (let row = TOP_ROW; row <= BOTTOM_ROW; row++) {
      for (let column = LEFT_COLUMN; column <= RIGHT_COLUMN; column++) {
        this._cells.push(new Cell(row, column, EMPTY_CELL));
      }
    }
  }

  public cellAt(row: number, column: number): Cell {
    return this._cells.find((cell) =>
      cell.hasSamePositionAs(new Cell(row, column, EMPTY_CELL))
    )!;
  }

  public placeMarkAt(mark: string, row: number, column: number): void {
    this._cells
      .find((cell) => cell.hasSamePositionAs(new Cell(row, column, mark)))!
      .updateMark(mark);
  }

  public findWinningRow(): string {
    if (this.isWinningRow(TOP_ROW)) {
      return this.cellAt(TOP_ROW, LEFT_COLUMN).Mark;
    }

    if (this.isWinningRow(MIDDLE_ROW)) {
      return this.cellAt(MIDDLE_ROW, LEFT_COLUMN).Mark;
    }

    if (this.isWinningRow(BOTTOM_ROW)) {
      return this.cellAt(BOTTOM_ROW, LEFT_COLUMN).Mark;
    }

    return EMPTY_CELL;
  }

  private isWinningRow(row: number) {
    return this.isRowComplete(row) && this.isRowSameMark(row);
  }

  private isRowComplete(row: number) {
    return (
      this.cellAt(row, LEFT_COLUMN).isOccupied &&
      this.cellAt(row, CENTER_COLUMN).isOccupied &&
      this.cellAt(row, RIGHT_COLUMN).isOccupied
    );
  }

  private isRowSameMark(row: number) {
    const firstCell = this.cellAt(row, LEFT_COLUMN);
    return (
      firstCell.hasSameMarkAs(this.cellAt(row, CENTER_COLUMN)) &&
      firstCell.hasSameMarkAs(this.cellAt(row, RIGHT_COLUMN))
    );
  }
}
