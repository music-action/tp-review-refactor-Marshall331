import { Game } from './kata';
import { Move, Position } from './kata';

describe('TicTacToe game', () => {
  let game: Game;

  beforeEach(() => {
    game = new Game();
  });

  test('should not allow player O to play first', () => {
    expect(() => {
      game.Play(new Move(new Position(0, 0), 'O'));
    }).toThrow();
  });

  it('should not allow player X to play twice in a row', () => {
    game.Play(new Move(new Position(0, 0), 'X'));
    expect(() => {
      game.Play(new Move(new Position(1, 0), 'X'));
    }).toThrow();
  });

  it('should not allow a player to play in last played position', () => {
    game.Play(new Move(new Position(0, 0), 'X'));
    expect(() => {
      game.Play(new Move(new Position(0, 0), 'O'));
    }).toThrow();
  });

  it('should not allow a player to play in any played position', () => {
    game.Play(new Move(new Position(0, 0), 'X'));
    game.Play(new Move(new Position(1, 0), 'O'));
    expect(() => {
      game.Play(new Move(new Position(0, 0), 'X'));
    }).toThrow();
  });

  it('should declare player X as winner if it plays three in top row', () => {
    game.Play(new Move(new Position(0, 0), 'X'));
    game.Play(new Move(new Position(1, 0), 'O'));
    game.Play(new Move(new Position(0, 1), 'X'));
    game.Play(new Move(new Position(1, 1), 'O'));
    game.Play(new Move(new Position(0, 2), 'X'));

    const winner = game.Winner();

    expect(winner).toBe('X');
  });

  it('should declare player O as winner if it plays three in top row', () => {
    game.Play(new Move(new Position(1, 0), 'X'));
    game.Play(new Move(new Position(0, 0), 'O'));
    game.Play(new Move(new Position(1, 1), 'X'));
    game.Play(new Move(new Position(0, 1), 'O'));
    game.Play(new Move(new Position(2, 2), 'X'));
    game.Play(new Move(new Position(0, 2), 'O'));

    const winner = game.Winner();

    expect(winner).toBe('O');
  });

  it('should declare player X as winner if it plays three in middle row', () => {
    game.Play(new Move(new Position(1, 0), 'X'));
    game.Play(new Move(new Position(0, 0), 'O'));
    game.Play(new Move(new Position(1, 1), 'X'));
    game.Play(new Move(new Position(0, 1), 'O'));
    game.Play(new Move(new Position(1, 2), 'X'));

    const winner = game.Winner();

    expect(winner).toBe('X');
  });

  it('should declare player O as winner if it plays three in middle row', () => {
    game.Play(new Move(new Position(0, 0), 'X'));
    game.Play(new Move(new Position(1, 0), 'O'));
    game.Play(new Move(new Position(2, 1), 'X'));
    game.Play(new Move(new Position(1, 1), 'O'));
    game.Play(new Move(new Position(2, 2), 'X'));
    game.Play(new Move(new Position(1, 2), 'O'));

    const winner = game.Winner();

    expect(winner).toBe('O');
  });

  it('should declare player X as winner if it plays three in bottom row', () => {
    game.Play(new Move(new Position(2, 0), 'X'));
    game.Play(new Move(new Position(0, 0), 'O'));
    game.Play(new Move(new Position(2, 1), 'X'));
    game.Play(new Move(new Position(0, 1), 'O'));
    game.Play(new Move(new Position(2, 2), 'X'));

    const winner = game.Winner();

    expect(winner).toBe('X');
  });

  it('should declare player O as winner if it plays three in bottom row', () => {
    game.Play(new Move(new Position(0, 0), 'X'));
    game.Play(new Move(new Position(2, 0), 'O'));
    game.Play(new Move(new Position(1, 1), 'X'));
    game.Play(new Move(new Position(2, 1), 'O'));
    game.Play(new Move(new Position(0, 1), 'X'));
    game.Play(new Move(new Position(2, 2), 'O'));

    const winner = game.Winner();

    expect(winner).toBe('O');
  });
});
