/* eslint-disable */

const firstRow = 0;
const secondRow = 1;
const thirdRow = 2;
const firstColumn = 0;
const secondColumn = 1;
const thirdColumn = 2;

const playerO = "O";
const noPlayer = " ";

export class Game {
  private _lastPlayer = noPlayer;
  private _board: Board = new Board();

  public Play(move: Move): void {
    this.validateFirstMove(move.player);
    this.validatePlayer(move.player);
    this.validatePositionIsEmpty(move.position);

    this.updateLastPlayer(move.player);
    this.updateBoard(move);
  }

  private validateFirstMove(player: string) {
    if (this._lastPlayer === noPlayer && player === playerO) {
      throw new Error("Invalid first player");
    }
  }

  private validatePlayer(player: string) {
    if (player === this._lastPlayer) {
      throw new Error("Invalid next player");
    }
  }

  private validatePositionIsEmpty(position: Position) {
    if (this._board.isTilePlayedAt(position)) {
      throw new Error("Invalid position");
    }
  }

  private updateLastPlayer(player: string) {
    this._lastPlayer = player;
  }

  private updateBoard(move: Move) {
    this._board.addMove(move);
  }

  public Winner(): string {
    return this._board.findRowFullWithSamePlayer();
  }
}

export class Position {
  constructor(
    public readonly row: number,
    public readonly column: number
  ) {}

  isSameAs(other: Position) {
    return this.row === other.row && this.column === other.column;
  }
}

export class Move {
  constructor(
    public readonly position: Position,
    public readonly player: string
  ) {}
}

class Tile {
  constructor(
    private position: Position,
    private player: string = noPlayer
  ) {}

  get Player() {
    return this.player;
  }

  get isNotEmpty() {
    return this.player !== noPlayer;
  }

  hasSamePlayerAs(other: Tile) {
    return this.player === other.player;
  }

  isAt(position: Position) {
    return this.position.isSameAs(position);
  }

  updatePlayer(player: string) {
    this.player = player;
  }
}

class Board {
  private _tiles: Tile[] = [];

  constructor() {
    for (let row = firstRow; row <= thirdRow; row++) {
      for (let column = firstColumn; column <= thirdColumn; column++) {
        this._tiles.push(new Tile(new Position(row, column)));
      }
    }
  }

  public isTilePlayedAt(position: Position) {
    return this.tileAt(position).isNotEmpty;
  }

  public addMove(move: Move): void {
    this.tileAt(move.position).updatePlayer(move.player);
  }

  public findRowFullWithSamePlayer(): string {
    if (this.isWinningRow(firstRow)) {
      return this.playerAt(new Position(firstRow, firstColumn));
    }

    if (this.isWinningRow(secondRow)) {
      return this.playerAt(new Position(secondRow, firstColumn));
    }

    if (this.isWinningRow(thirdRow)) {
      return this.playerAt(new Position(thirdRow, firstColumn));
    }

    return noPlayer;
  }

  private isWinningRow(row: number) {
    return this.isRowFull(row) && this.isRowFullWithSamePlayer(row);
  }

  private isRowFull(row: number) {
    return (
      this.isTilePlayedAt(new Position(row, firstColumn)) &&
      this.isTilePlayedAt(new Position(row, secondColumn)) &&
      this.isTilePlayedAt(new Position(row, thirdColumn))
    );
  }

  private isRowFullWithSamePlayer(row: number) {
    const first = this.tileAt(new Position(row, firstColumn));
    return (
      first.hasSamePlayerAs(this.tileAt(new Position(row, secondColumn))) &&
      first.hasSamePlayerAs(this.tileAt(new Position(row, thirdColumn)))
    );
  }

  private playerAt(position: Position) {
    return this.tileAt(position).Player;
  }

  private tileAt(position: Position): Tile {
    return this._tiles.find((t) => t.isAt(position))!;
  }
}
