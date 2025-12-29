import { Game } from "./kata";

describe("TicTacToe game", () => {
  let game: Game;

  beforeEach(() => {
    game = new Game();
  });

  test("should not allow player O to play first", () => {
    expect(() => {
      game.Play("O", 0, 0);
    }).toThrow();
  });

  it("should not allow player x to play twice in a row", () => {
    game.Play("X", 0, 0);
    expect(() => {
      game.Play("X", 1, 0);
    }).toThrow();
  });

  it("should not allow a player to play in last played position", () => {
    game.Play("X", 0, 0);
    expect(() => {
      game.Play("O", 0, 0);
    }).toThrow();
  });

  it("should not allow a player to play in any played position", () => {
    game.Play("X", 0, 0);
    game.Play("O", 1, 0);
    expect(() => {
      game.Play("X", 0, 0);
    }).toThrow();
  });

  it("should declare player X as winner if it plays three in top row", () => {
    game.Play("X", 0, 0);
    game.Play("O", 1, 0);
    game.Play("X", 0, 1);
    game.Play("O", 1, 1);
    game.Play("X", 0, 2);

    const winner = game.Winner();

    expect(winner).toBe("X");
  });

  it("should declare player O as winner if it plays three in top row", () => {
    game.Play("X", 1, 0);
    game.Play("O", 0, 0);
    game.Play("X", 1, 1);
    game.Play("O", 0, 1);
    game.Play("X", 2, 2);
    game.Play("O", 0, 2);

    const winner = game.Winner();

    expect(winner).toBe("O");
  });

  it("should declare player X as winner if it plays three in middle row", () => {
    game.Play("X", 1, 0);
    game.Play("O", 0, 0);
    game.Play("X", 1, 1);
    game.Play("O", 0, 1);
    game.Play("X", 1, 2);

    const winner = game.Winner();

    expect(winner).toBe("X");
  });

  it("should declare player O as winner if it plays three in middle row", () => {
    game.Play("X", 0, 0);
    game.Play("O", 1, 0);
    game.Play("X", 2, 1);
    game.Play("O", 1, 1);
    game.Play("X", 2, 2);
    game.Play("O", 1, 2);

    const winner = game.Winner();

    expect(winner).toBe("O");
  });

  it("should declare player X as winner if it plays three in bottom row", () => {
    game.Play("X", 2, 0);
    game.Play("O", 0, 0);
    game.Play("X", 2, 1);
    game.Play("O", 0, 1);
    game.Play("X", 2, 2);

    const winner = game.Winner();

    expect(winner).toBe("X");
  });

  it("should declare player O as winner if it plays three in bottom row", () => {
    game.Play("X", 0, 0);
    game.Play("O", 2, 0);
    game.Play("X", 1, 1);
    game.Play("O", 2, 1);
    game.Play("X", 0, 1);
    game.Play("O", 2, 2);

    const winner = game.Winner();

    expect(winner).toBe("O");
  });

  describe("Board initialization", () => {
    it("should create a 3x3 board (9 tiles total)", () => {
      const board = (game as any)._board;
      expect(board._plays.length).toBe(9);
    });

    it("should not find tiles outside of the 3x3 boundaries", () => {
      const board = (game as any)._board;
      expect(board.TileAt(0, 0)).toBeDefined();
      expect(board.TileAt(2, 2)).toBeDefined();
      expect(board.TileAt(3, 3)).toBeUndefined();
    });
  });

  describe("Error messages", () => {
    test('should throw "Invalid first player" when O starts', () => {
      expect(() => {
        game.Play("O", 0, 0);
      }).toThrow("Invalid first player");
    });

    it('should throw "Invalid next player" when same player plays twice', () => {
      game.Play("X", 0, 0);
      expect(() => {
        game.Play("X", 1, 1);
      }).toThrow("Invalid next player");
    });

    it('should throw "Invalid position" when playing on an occupied tile', () => {
      game.Play("X", 0, 0);
      expect(() => {
        game.Play("O", 0, 0);
      }).toThrow("Invalid position");
    });
  });
});
