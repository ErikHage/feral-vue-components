import { scoreMatch } from '../../../src/components/FrCommandPalette/score';

describe("FrCommandPalette's scoreMatch", () => {
  it.each([
    ['plants', 'plants', 100],
    ['plants', 'pla', 80],
    ['activity log', 'log', 60],
    ['activity\tlog', 'log', 60],
    ['seedlings', 'lings', 40],
    ['my-plots', 'plots', 40],
    ['plants', 'plt', 20],
    ['activity schedules', 'acsch', 20],
    ['plants', 'tlp', 0],
    ['plants', 'plantsx', 0],
    ['', 'plants', 0],
    ['plants', '', 0],
  ])('scores %j against %j as %i', (text, query, score) => {
    expect(scoreMatch(text, query)).toBe(score);
  });
});
