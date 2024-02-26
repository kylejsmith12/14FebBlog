import React, { createContext, useState, useEffect } from "react";

export const initialState = {
  selectedView: "all",
  selectedCategory: "harryPotter",
  variables: {
    harryPotter: {
      variable1: "Dursleys",
      variable2: "Privet Drive",
      variable3: "Dudley Dursley",
    },
    lordOfTheRings: {
      variable1: "Galadriel",
      variable2: "Sam",
      variable3: "Lorien",
    },
    dynamicTable: {
      variable0: "boy",
      variable1: "friend",
      variable2: "reliable",
      variable3: "Hermione",
    },
  },
  tableData: {
    movies: [
      {
        Subject: "Harry Potter",
        ExtraText: "Movie extra text", // Add additional string for movies
        People: [
          { name: "Harry Potter", description: "The boy Who Lived" },
          { name: "Ron Weasley", description: "Best friend of Harry" },
          { name: "Hermione Granger", description: "Smart and reliable" },
        ],
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
        ExtraText: "tv show extra text", // Add additional string for movies
        People: [
          { name: "Jon Snow", description: "King in the North" },
          { name: "Daenerys Targaryen", description: "Mother of Dragons" },
          { name: "Tyrion Lannister", description: "The Imp" },
        ],
        House: ["Stark", "Targaryen", "Lannister"],
      },
      // Other TV show objects...
    ],
    music: [
      {
        Subject: "The Beatles",
        ExtraText: "music extratext", // Add additional string for movies
        People: [
          { name: "John Lennon", description: "Imagine" },
          { name: "Paul McCartney", description: "Yesterday" },
        ],
        House: ["Liverpool"],
      },
      // Other music objects...
    ],
  },

  tableHeaders: ["Subject", "People", "House"],
};

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [state, setState] = useState(initialState);

  return (
    <AppContext.Provider value={{ state, setState }}>
      {children}
    </AppContext.Provider>
  );
};
