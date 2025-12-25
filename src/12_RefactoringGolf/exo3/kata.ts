/* eslint-disable */

const EMPTY_SYMBOL = " ";
const PLAYER_O = "O";
const FIRST_ROW = 0;
const SECOND_ROW = 1;
const THIRD_ROW = 2;
const BOARD_SIZE = 3;

export class Game {
  private _lastSymbol = EMPTY_SYMBOL;
  private _board: Board = new Board();

  public Play(symbol: string, x: number, y: number): void {
    this.validateFirstMove(symbol);
    this.validatePlayer(symbol);
    this.validatePositionIsEmpty(x, y);

    this.updateLastPlayer(symbol);
    this.updateBoard(symbol, x, y);
  }

  private validateFirstMove(player: string): void {
    if (this._lastSymbol === EMPTY_SYMBOL && player === PLAYER_O) {
      throw new Error("Invalid first player");
    }
  }

  private validatePlayer(player: string): void {
    if (player === this._lastSymbol) {
      throw new Error("Invalid next player");
    }
  }

  private validatePositionIsEmpty(x: number, y: number): void {
    if (this._board.TileAt(x, y).Symbol !== EMPTY_SYMBOL) {
      throw new Error("Invalid position");
    }
  }

  private updateLastPlayer(player: string): void {
    this._lastSymbol = player;
  }

  private updateBoard(player: string, x: number, y: number): void {
    this._board.AddTileAt(player, x, y);
  }

  public Winner(): string {
    if (this.isRowWinner(FIRST_ROW)) {
      return this._board.TileAt(FIRST_ROW, 0).Symbol;
    }

    if (this.isRowWinner(SECOND_ROW)) {
      return this._board.TileAt(SECOND_ROW, 0).Symbol;
    }

    if (this.isRowWinner(THIRD_ROW)) {
      return this._board.TileAt(THIRD_ROW, 0).Symbol;
    }

    return EMPTY_SYMBOL;
  }

  private isRowWinner(row: number): boolean {
    return this.isRowFull(row) && this.isRowFullWithSameSymbol(row);
  }

  private isRowFull(row: number): boolean {
    return (
      this._board.TileAt(row, 0).Symbol !== EMPTY_SYMBOL &&
      this._board.TileAt(row, 1).Symbol !== EMPTY_SYMBOL &&
      this._board.TileAt(row, 2).Symbol !== EMPTY_SYMBOL
    );
  }

  private isRowFullWithSameSymbol(row: number): boolean {
    const firstSymbol = this._board.TileAt(row, 0).Symbol;

    return (
      firstSymbol === this._board.TileAt(row, 1).Symbol &&
      firstSymbol === this._board.TileAt(row, 2).Symbol
    );
  }
}

interface Tile {
  X: number;
  Y: number;
  Symbol: string;
}

class Board {
  private _plays: Tile[] = [];

  constructor() {
    for (let x = 0; x < BOARD_SIZE; x++) {
      for (let y = 0; y < BOARD_SIZE; y++) {
        this._plays.push({ X: x, Y: y, Symbol: EMPTY_SYMBOL });
      }
    }
  }

  public TileAt(x: number, y: number): Tile {
    return this._plays.find(t => t.X === x && t.Y === y)!;
  }

  public AddTileAt(symbol: string, x: number, y: number): void {
    this.TileAt(x, y).Symbol = symbol;
  }
}
