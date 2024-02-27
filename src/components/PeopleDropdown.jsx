import React, { useContext } from "react";
import { MenuItem, Select, FormControl, InputLabel } from "@mui/material";
import { AppContext } from "../Context";

const PeopleDropdown = ({ variables, onChange }) => {
  const { state } = useContext(AppContext);

  // Extract people names from each category in tableData
  const people = Object.values(state.tableData)
    .map((category) => category.flatMap((item) => item.People))
    .flatMap((people) => people.map((person) => person.name));

  const handlePersonChange = (personName) => {
    // Find the selected person's variables from tableData
    const selectedPerson = Object.values(state.tableData)
      .flatMap((category) => category.flatMap((item) => item.People))
      .find((person) => person.name === personName);

    // Update the state with the selected person's variables
    onChange("dynamicTable", selectedPerson.name, selectedPerson.description);
  };

  return (
    <FormControl fullWidth style={{ marginBottom: "20px" }}>
      <InputLabel id="person-select-label">Select Person</InputLabel>
      <Select
        labelId="person-select-label"
        id="person-select"
        value=""
        onChange={(e) => handlePersonChange(e.target.value)}
      >
        {people.map((person) => (
          <MenuItem key={person} value={person}>
            {person}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default PeopleDropdown;
