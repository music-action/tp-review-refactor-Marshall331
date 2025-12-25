import { Game, Position, Row, Column } from './kata';

describe('TicTacToe game', () => {
  let game: Game;

  beforeEach(() => {
    game = new Game();
  });

  test('should not allow player O to play first', () => {
    expect(() => {
      game.Play('O', new Position(Row.Top, Column.Left));
    }).toThrow();
  });

  it('should not allow player X to play twice in a row', () => {
    game.Play('X', new Position(Row.Top, Column.Left));
    expect(() => {
      game.Play('X', new Position(Row.Middle, Column.Left));
    }).toThrow();
  });

  it('should not allow a player to play in last played position', () => {
    game.Play('X', new Position(Row.Top, Column.Left));
    expect(() => {
      game.Play('O', new Position(Row.Top, Column.Left));
    }).toThrow();
  });

  it('should not allow a player to play in any played position', () => {
    game.Play('X', new Position(Row.Top, Column.Left));
    game.Play('O', new Position(Row.Middle, Column.Left));
    expect(() => {
      game.Play('X', new Position(Row.Top, Column.Left));
    }).toThrow();
  });

  it('should declare player X as winner if it plays three in top row', () => {
    game.Play('X', new Position(Row.Top, Column.Left));
    game.Play('O', new Position(Row.Middle, Column.Left));
    game.Play('X', new Position(Row.Top, Column.Center));
    game.Play('O', new Position(Row.Middle, Column.Center));
    game.Play('X', new Position(Row.Top, Column.Right));

    const winner = game.Winner();

    expect(winner).toBe('X');
  });

  it('should declare player O as winner if it plays three in top row', () => {
    game.Play('X', new Position(Row.Middle, Column.Left));
    game.Play('O', new Position(Row.Top, Column.Left));
    game.Play('X', new Position(Row.Middle, Column.Center));
    game.Play('O', new Position(Row.Top, Column.Center));
    game.Play('X', new Position(Row.Bottom, Column.Right));
    game.Play('O', new Position(Row.Top, Column.Right));

    const winner = game.Winner();

    expect(winner).toBe('O');
  });

  it('should declare player X as winner if it plays three in middle row', () => {
    game.Play('X', new Position(Row.Middle, Column.Left));
    game.Play('O', new Position(Row.Top, Column.Left));
    game.Play('X', new Position(Row.Middle, Column.Center));
    game.Play('O', new Position(Row.Top, Column.Center));
    game.Play('X', new Position(Row.Middle, Column.Right));

    const winner = game.Winner();

    expect(winner).toBe('X');
  });

  it('should declare player O as winner if it plays three in middle row', () => {
    game.Play('X', new Position(Row.Top, Column.Left));
    game.Play('O', new Position(Row.Middle, Column.Left));
    game.Play('X', new Position(Row.Bottom, Column.Center));
    game.Play('O', new Position(Row.Middle, Column.Center));
    game.Play('X', new Position(Row.Bottom, Column.Right));
    game.Play('O', new Position(Row.Middle, Column.Right));

    const winner = game.Winner();

    expect(winner).toBe('O');
  });

  it('should declare player X as winner if it plays three in bottom row', () => {
    game.Play('X', new Position(Row.Bottom, Column.Left));
    game.Play('O', new Position(Row.Top, Column.Left));
    game.Play('X', new Position(Row.Bottom, Column.Center));
    game.Play('O', new Position(Row.Top, Column.Center));
    game.Play('X', new Position(Row.Bottom, Column.Right));

    const winner = game.Winner();

    expect(winner).toBe('X');
  });

  it('should declare player O as winner if it plays three in bottom row', () => {
    game.Play('X', new Position(Row.Top, Column.Left));
    game.Play('O', new Position(Row.Bottom, Column.Left));
    game.Play('X', new Position(Row.Middle, Column.Center));
    game.Play('O', new Position(Row.Bottom, Column.Center));
    game.Play('X', new Position(Row.Top, Column.Center));
    game.Play('O', new Position(Row.Bottom, Column.Right));

    const winner = game.Winner();

    expect(winner).toBe('O');
  });
});
