/* eslint-disable */

export enum Row {
  Top = 0,
  Middle = 1,
  Bottom = 2,
}

export enum Column {
  Left = 0,
  Center = 1,
  Right = 2,
}

const playerO = "O";
const noPlayer = " ";

export class Game {
  private _lastPlayer = noPlayer;
  private _board: Board = new Board();

  public Play(player: string, position: Position): void {
    this.validateFirstMove(player);
    this.validatePlayer(player);
    this.validatePositionIsEmpty(position);

    this.updateLastPlayer(player);
    this.updateBoard(new Tile(position, player));
  }

  private validateFirstMove(player: string) {
    if (this._lastPlayer == noPlayer) {
      if (player == playerO) {
        throw new Error("Invalid first player");
      }
    }
  }

  private validatePlayer(player: string) {
    if (player == this._lastPlayer) {
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

  private updateBoard(tile: Tile) {
    this._board.AddTileAt(tile);
  }

  public Winner(): string {
    return this._board.findRowFullWithSamePlayer();
  }
}

export class Position {
  constructor(public readonly row: Row, public readonly column: Column) {}
}

class Tile {
  constructor(private position: Position, private player: string) {}

  get Player() {
    return this.player;
  }

  get isNotEmpty() {
    return this.Player !== noPlayer;
  }

  hasSamePlayerAs(other: Tile) {
    return this.Player === other.Player;
  }

  hasSamePositionAs(other: Tile) {
    return this.position.row === other.position.row && this.position.column === other.position.column;
  }

  updatePlayer(newPlayer: string) {
    this.player = newPlayer;
  }
}

class Board {
  private _plays: Tile[] = [];

  constructor() {
    for (const row of [Row.Top, Row.Middle, Row.Bottom]) {
      for (const column of [Column.Left, Column.Center, Column.Right]) {
        this._plays.push(new Tile(new Position(row, column), noPlayer));
      }
    }
  }

  public isTilePlayedAt(position: Position) {
    return this.findTileAt(new Tile(position, noPlayer))!.isNotEmpty;
  }

  public AddTileAt(tile: Tile): void {
    this.findTileAt(tile)!.updatePlayer(tile.Player);
  }

  public findRowFullWithSamePlayer(): string {
    for (const row of [Row.Top, Row.Middle, Row.Bottom]) {
      if (this.isRowFull(row) && this.isRowFullWithSamePlayer(row)) {
        return this.playerAt(row, Column.Left);
      }
    }
    return noPlayer;
  }

  private findTileAt(tile: Tile) {
    return this._plays.find((t: Tile) => t.hasSamePositionAs(tile));
  }

  private hasSamePlayer(row: Row, column1: Column, column2: Column) {
    return this.TileAt(row, column1)!.hasSamePlayerAs(this.TileAt(row, column2)!);
  }

  private playerAt(row: Row, column: Column) {
    return this.TileAt(row, column)!.Player;
  }

  private TileAt(row: Row, column: Column): Tile {
    return this._plays.find((t: Tile) =>
      t.hasSamePositionAs(new Tile(new Position(row, column), noPlayer))
    )!;
  }

  private isRowFull(row: Row) {
    return (
      this.isTilePlayedAt(new Position(row, Column.Left)) &&
      this.isTilePlayedAt(new Position(row, Column.Center)) &&
      this.isTilePlayedAt(new Position(row, Column.Right))
    );
  }

  private isRowFullWithSamePlayer(row: Row) {
    return (
      this.hasSamePlayer(row, Column.Left, Column.Center) &&
      this.hasSamePlayer(row, Column.Center, Column.Right)
    );
  }
}
