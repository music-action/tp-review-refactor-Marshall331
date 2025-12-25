/* eslint-disable */

export class Game {
  public static readonly EMPTY_PLAY = " ";
  public static readonly PLAYER_O = "O";

  private _lastSymbol = Game.EMPTY_PLAY;
  private _board: Board = new Board();

  public Play(symbol: string, x: number, y: number): void {
    this.validateFirstMove(symbol);
    this.validatePlayer(symbol);
    this.validatePositionIsEmpty(x, y);

    this.updateLastPlayer(symbol);
    this.updateBoard(symbol, x, y);
  }

  private validateFirstMove(player: string): void {
    if (this._lastSymbol === Game.EMPTY_PLAY && player === Game.PLAYER_O) {
      throw new Error("Invalid first player");
    }
  }

  private validatePlayer(player: string): void {
    if (player === this._lastSymbol) {
      throw new Error("Invalid next player");
    }
  }

  private validatePositionIsEmpty(x: number, y: number): void {
    if (this._board.TileAt(x, y).Symbol !== Game.EMPTY_PLAY) {
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
    for (let row = 0; row < 3; row++) {
      if (this.isRowWinner(row)) {
        return this._board.TileAt(row, 0).Symbol;
      }
    }

    return Game.EMPTY_PLAY;
  }

  private isRowWinner(row: number): boolean {
    return this.isRowFull(row) && this.isRowWithSameSymbol(row);
  }

  private isRowFull(row: number): boolean {
    for (let column = 0; column < 3; column++) {
      if (this._board.TileAt(row, column).Symbol === Game.EMPTY_PLAY) {
        return false;
      }
    }
    return true;
  }

  private isRowWithSameSymbol(row: number): boolean {
    const firstSymbol = this._board.TileAt(row, 0).Symbol;

    for (let column = 1; column < 3; column++) {
      if (this._board.TileAt(row, column).Symbol !== firstSymbol) {
        return false;
      }
    }
    return true;
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
        this._plays.push({ X: x, Y: y, Symbol: Game.EMPTY_PLAY });
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
