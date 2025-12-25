/* eslint-disable */

const firstRow = 0;
const secondRow = 1;
const thirdRow = 2;
const firstColumn = 0;
const secondColumn = 1;
const thirdColumn = 2;

const playerO = "O";
const emptyPlay = " ";

export class Game {
  private _lastSymbol = emptyPlay;
  private _board: Board = new Board();

  public Play(symbol: string, x: number, y: number): void {
    this.validateFirstMove(symbol);
    this.validatePlayer(symbol);
    this.validatePositionIsEmpty(x, y);

    this.updateLastPlayer(symbol);
    this.updateBoard(symbol, x, y);
  }

  private validateFirstMove(player: string) {
    if (this._lastSymbol === emptyPlay && player === playerO) {
      throw new Error("Invalid first player");
    }
  }

  private validatePlayer(player: string) {
    if (player === this._lastSymbol) {
      throw new Error("Invalid next player");
    }
  }

  private validatePositionIsEmpty(x: number, y: number) {
    if (!this._board.isTileEmpty(x, y)) {
      throw new Error("Invalid position");
    }
  }

  private updateLastPlayer(player: string) {
    this._lastSymbol = player;
  }

  private updateBoard(player: string, x: number, y: number) {
    this._board.AddTileAt(player, x, y);
  }

  public Winner(): string {
    return this._board.findRowFullWithSamePlayer();
  }
}

interface Tile {
  X: number;
  Y: number;
  Symbol: string;

  isEmpty(): boolean;
  hasSameSymbolAs(other: Tile): boolean;
}

class Board {
  private _plays: Tile[] = [];

  constructor() {
    for (let i = firstRow; i <= thirdRow; i++) {
      for (let j = firstColumn; j <= thirdColumn; j++) {
        this._plays.push(this.createTile(i, j));
      }
    }
  }

  private createTile(x: number, y: number): Tile {
    return {
      X: x,
      Y: y,
      Symbol: emptyPlay,
      isEmpty() {
        return this.Symbol === emptyPlay;
      },
      hasSameSymbolAs(other: Tile) {
        return this.Symbol === other.Symbol;
      },
    };
  }

  public AddTileAt(symbol: string, x: number, y: number): void {
    this.findTile(x, y).Symbol = symbol;
  }

  public isTileEmpty(x: number, y: number): boolean {
    return this.findTile(x, y).isEmpty();
  }

  public findRowFullWithSamePlayer(): string {
    if (this.isRowWinner(firstRow)) {
      return this.findTile(firstRow, firstColumn).Symbol;
    }

    if (this.isRowWinner(secondRow)) {
      return this.findTile(secondRow, firstColumn).Symbol;
    }

    if (this.isRowWinner(thirdRow)) {
      return this.findTile(thirdRow, firstColumn).Symbol;
    }

    return emptyPlay;
  }

  private isRowWinner(row: number): boolean {
    return this.isRowFull(row) && this.isRowWithSameSymbol(row);
  }

  private isRowFull(row: number): boolean {
    return (
      !this.findTile(row, firstColumn).isEmpty() &&
      !this.findTile(row, secondColumn).isEmpty() &&
      !this.findTile(row, thirdColumn).isEmpty()
    );
  }

  private isRowWithSameSymbol(row: number): boolean {
    const first = this.findTile(row, firstColumn);
    return (
      first.hasSameSymbolAs(this.findTile(row, secondColumn)) &&
      first.hasSameSymbolAs(this.findTile(row, thirdColumn))
    );
  }

  private findTile(x: number, y: number): Tile {
    return this._plays.find(t => t.X === x && t.Y === y)!;
  }
}
