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
  extraText: {
    movies: "Movie extra text",
    tvShows: "TV show extra text",
    music: "Music extra text",
  },
  tableHeaders: ["Subject", "People", "House"],
  paragraphs: {
    harryPotter: "",
    lordOfTheRings: "",
  },
};

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [state, setState] = useState(initialState);

  useEffect(() => {
    // Logic to update paragraphs based on variables goes here
    const updatedParagraphs = {
      harryPotter: (
        <>
          Nearly ten years had passed since the{" "}
          <strong>{state.variables.harryPotter.variable1}</strong> had woken up
          to find their nephew on the front step, but{" "}
          {state.variables.harryPotter.variable2} had hardly changed at all. The
          sun rose on the same tidy front gardens and lit up the brass number
          four on the {state.variables.harryPotter.variable1}' front door; it
          crept into their living room, which was almost exactly the same as it
          had been on the night when Mr. {state.variables.harryPotter.variable1}{" "}
          had seen that fateful news report about the owls. Only the photographs
          on the mantelpiece really showed how much time had passed. Ten years
          ago, there had been lots of pictures of what looked like a large pink
          beach ball wearing different-colored bonnets - but{" "}
          {state.variables.harryPotter.variable3} was no longer a baby, and now
          the photographs showed a large blond boy riding his first bicycle, on
          a carousel at the fair, playing a computer game with his father, being
          hugged and kissed by his mother. The room held no sign at all that
          another boy lived in the house, too.
        </>
      ),
      lordOfTheRings: (
        <>
          It takes a hobbit to describe the paradoxical majesty and merriment of{" "}
          <strong>{state.variables.lordOfTheRings.variable1}</strong>.{" "}
          {state.variables.lordOfTheRings.variable2} explains how folk get
          confused by her power. She sees into their hearts and makes them look
          at their mixed motives and ambitions, and some believe that she
          planted the dark motives there herself. (You can read more about this
          power <a href="#">here</a> and <a href="#">here</a>.)
        </>
      ),
    };

    const updatedTableData = {
      movies: [
        {
          Subject: "Harry Potter",
          People: [
            {
              name: "Harry Potter",
              description: `The ${state.variables.dynamicTable.variable0} who lived`,
            },
            {
              name: "Ron Weasley",
              description: "Best friend of Harry",
            },
            {
              name: "Hermione Granger",
              description: "Smart and reliable",
            },
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
          People: [
            { name: "John Lennon", description: "Imagine" },
            { name: "Paul McCartney", description: "Yesterday" },
          ],
          House: ["Liverpool"],
        },
        // Other music objects...
      ],
    };

    setState((prevState) => ({
      ...prevState,
      paragraphs: updatedParagraphs,
      tableData: updatedTableData,
    }));
  }, [state.variables]);

  return (
    <AppContext.Provider value={{ state, setState }}>
      {children}
    </AppContext.Provider>
  );
};
