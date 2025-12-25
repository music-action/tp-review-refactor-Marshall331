/* eslint-disable */

export class Game {
  private lastSymbol: string = " ";
  private board: Board = new Board();

  public Play(symbol: string, x: number, y: number): void {
    this.checkFirstMove(symbol);
    this.checkNextPlayer(symbol);
    this.checkPosition(x, y);

    this.playMove(symbol, x, y);
  }

  private checkFirstMove(symbol: string): void {
    if (this.lastSymbol === " " && symbol === "O") {
      throw new Error("Invalid first player");
    }
  }

  private checkNextPlayer(symbol: string): void {
    if (this.lastSymbol === symbol) {
      throw new Error("Invalid next player");
    }
  }

  private checkPosition(x: number, y: number): void {
    if (this.board.TileAt(x, y).Symbol !== " ") {
      throw new Error("Invalid position");
    }
  }

  private playMove(symbol: string, x: number, y: number): void {
    this.board.AddTileAt(symbol, x, y);
    this.lastSymbol = symbol;
  }

  public Winner(): string {
    for (let row = 0; row < 3; row++) {
      const winner = this.checkRow(row);
      if (winner !== " ") {
        return winner;
      }
    }

    return " ";
  }

  private checkRow(row: number): string {
    const first = this.board.TileAt(row, 0).Symbol;
    const second = this.board.TileAt(row, 1).Symbol;
    const third = this.board.TileAt(row, 2).Symbol;

    if (first !== " " && first === second && second === third) {
      return first;
    }

    return " ";
  }
}

interface Tile {
  X: number;
  Y: number;
  Symbol: string;
}

class Board {
  private tiles: Tile[] = [];

  constructor() {
    this.createBoard();
  }

  private createBoard(): void {
    for (let x = 0; x < 3; x++) {
      for (let y = 0; y < 3; y++) {
        this.tiles.push({ X: x, Y: y, Symbol: " " });
      }
    }
  }

  public TileAt(x: number, y: number): Tile {
    return this.tiles.find(t => t.X === x && t.Y === y)!;
  }

  public AddTileAt(symbol: string, x: number, y: number): void {
    const tile = this.TileAt(x, y);
    tile.Symbol = symbol;
  }
}
