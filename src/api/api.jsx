// api.js

export const fetchHouseData = async () => {
  // Simulate fetching data from an API
  return {
    movies: [
      {
        Subject: "Harry Potter",
        House: [
          "Hogwarts",
          "Ravenclaw",
          "Gryffindor",
          "Slytherin",
          "Hufflepuff",
        ],
      },
      // Other movie objects...
    ],
    tvShows: [
      {
        Subject: "Game of Thrones",
        House: ["Stark", "Targaryen", "Lannister"],
      },
      // Other TV show objects...
    ],
    music: [
      {
        Subject: "The Beatles",
        House: ["Liverpool"],
      },
      // Other music objects...
    ],
  };
};
