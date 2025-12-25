/* eslint-disable */

export class Game {
  private _lastSymbol = " ";
  private _board: Board = new Board();

  public Play(symbol: string, x: number, y: number): void {
    this.validateFirstMove(symbol);
    this.validatePlayer(symbol);
    this.validatePositionIsEmpty(x, y);

    this.updateLastPlayer(symbol);
    this.updateBoard(symbol, x, y);
  }

  private validateFirstMove(player: string): void {
    if (this._lastSymbol === " " && player === "O") {
      throw new Error("Invalid first player");
    }
  }

  private validatePlayer(player: string): void {
    if (player === this._lastSymbol) {
      throw new Error("Invalid next player");
    }
  }

  private validatePositionIsEmpty(x: number, y: number): void {
    if (this._board.TileAt(x, y).Symbol !== " ") {
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
    if (this.isFirstRowWinner()) {
      return this._board.TileAt(0, 0).Symbol;
    }

    if (this.isSecondRowWinner()) {
      return this._board.TileAt(1, 0).Symbol;
    }

    if (this.isThirdRowWinner()) {
      return this._board.TileAt(2, 0).Symbol;
    }

    return " ";
  }

  private isFirstRowWinner(): boolean {
    return this.isRowFull(0) && this.isRowSameSymbol(0);
  }

  private isSecondRowWinner(): boolean {
    return this.isRowFull(1) && this.isRowSameSymbol(1);
  }

  private isThirdRowWinner(): boolean {
    return this.isRowFull(2) && this.isRowSameSymbol(2);
  }

  private isRowFull(row: number): boolean {
    return (
      this._board.TileAt(row, 0).Symbol !== " " &&
      this._board.TileAt(row, 1).Symbol !== " " &&
      this._board.TileAt(row, 2).Symbol !== " "
    );
  }

  private isRowSameSymbol(row: number): boolean {
    const first = this._board.TileAt(row, 0).Symbol;
    return (
      first === this._board.TileAt(row, 1).Symbol &&
      first === this._board.TileAt(row, 2).Symbol
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
    for (let x = 0; x < 3; x++) {
      for (let y = 0; y < 3; y++) {
        this._plays.push({ X: x, Y: y, Symbol: " " });
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
