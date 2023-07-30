export const apiUrls = {
  maze: {
    create: "https://ponychallenge.trustpilot.com/pony-challenge/maze",
    getMazeState: (mazeId: string) =>
      `https://ponychallenge.trustpilot.com/pony-challenge/maze/${mazeId}`,
  },
  image: (imagePath: string) =>
    `https://ponychallenge.trustpilot.com/${imagePath}`,
};
