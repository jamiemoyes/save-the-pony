export const apiUrls = {
  maze: {
    create: "https://ponychallenge.trustpilot.com/pony-challenge/maze",
    getMazeState: (mazeId: string) =>
      `https://ponychallenge.trustpilot.com/pony-challenge/maze/${mazeId}`,
    print: (mazeId: string) =>
      `https://ponychallenge.trustpilot.com/pony-challenge/maze/${mazeId}/print`,
  },
  ponies: {
    getAll: "https://ponyapi.net/v1/character/all",
  },
  image: (imagePath: string) =>
    `https://ponychallenge.trustpilot.com/${imagePath}`,
};
