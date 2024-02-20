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
  tableData: [
    {
      Subject: "Hogwarts",
      People: [
        {
          name: "Harry Potter",
          description: "The boy Who Lived",
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
      House: ["Hogwarts", "Ravenclaw", "Gryffindor", "Slytherin", "Hufflepuff"],
    },
    {
      Subject: "Lord of the Rings",
      People: [
        { name: "Frodo", description: "Bearer of the One Ring" },
        { name: "Bilbo", description: "The Hobbit" },
        { name: "Sam", description: "Loyal Friend of Frodo" },
      ],
      House: ["The Fellowship"],
    },
    {
      Subject: "Eragon", // New section
      People: [
        { name: "Eragon", description: "Main character" },
        { name: "Saphira", description: "Eragon's dragon" },
        { name: "Brom", description: "Eragon's mentor" },
      ],
      House: ["Alagaësia"],
    },
  ],
  tableHeaders: ["Subject", "People", "House"],
};

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [state, setState] = useState(initialState);

  // Update tableData whenever variables change
  useEffect(() => {
    // Logic to update tableData based on variables goes here
    const updatedTableData = [
      {
        Subject: "Hogwarts",
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
      {
        Subject: "Lord of the Rings",
        People: [
          { name: "Frodo", description: "Bearer of the One Ring" },
          { name: "Bilbo", description: "The Hobbit" },
          { name: "Sam", description: "Loyal Friend of Frodo" },
        ],
        House: ["The Fellowship"],
      },
      {
        Subject: "Eragon", // New section
        People: [
          { name: "Eragon", description: "Main character" },
          { name: "Saphira", description: "Eragon's dragon" },
          { name: "Brom", description: "Eragon's mentor" },
        ],
        House: ["Alagaësia"],
      },
    ];

    setState((prevState) => ({
      ...prevState,
      tableData: updatedTableData,
    }));
  }, [state.variables]);

  return (
    <AppContext.Provider value={{ state, setState }}>
      {children}
    </AppContext.Provider>
  );
};
