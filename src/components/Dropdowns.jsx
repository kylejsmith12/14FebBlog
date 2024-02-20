import React from "react";
import {
  TextField,
  MenuItem,
  FormControl,
  Select,
  InputLabel,
} from "@mui/material";

const Dropdowns = ({ category, variables, onChange, setState }) => {
  const handleVariableChange = (variable, value) => {
    onChange(category, variable, value);
    console.log(`Updating ${category}.${variable} to ${value}`);
    setState((prevState) => ({
      ...prevState,
      variables: {
        ...prevState.variables,
        [category]: {
          ...prevState.variables[category],
          [variable]: value,
        },
      },
    }));
  };

  return (
    <div>
      {Object.entries(variables).map(([variableName, variableValue]) => (
        <div key={variableName}>
          {variableName === "variable2" && category === "harryPotter" ? (
            <FormControl fullWidth>
              <InputLabel>
                {variableName.charAt(0).toUpperCase() + variableName.slice(1)}
              </InputLabel>
              <Select
                value={variableValue}
                onChange={(e) =>
                  handleVariableChange(variableName, e.target.value)
                }
              >
                <MenuItem value="Privet Drive">Privet Drive</MenuItem>
                <MenuItem value="The Burrow">The Burrow</MenuItem>
                <MenuItem value="Grimmauld Place">Grimmauld Place</MenuItem>
              </Select>
            </FormControl>
          ) : variableName === "variable0" && category === "dynamicTable" ? (
            <FormControl fullWidth>
              <InputLabel>
                {variableName.charAt(0).toUpperCase() + variableName.slice(1)}
              </InputLabel>
              <Select
                value={variableValue}
                onChange={(e) =>
                  handleVariableChange(variableName, e.target.value)
                }
              >
                <MenuItem value="boy">Boy</MenuItem>
                <MenuItem value="girl">Girl</MenuItem>
              </Select>
            </FormControl>
          ) : (
            <TextField
              label={
                variableName.charAt(0).toUpperCase() + variableName.slice(1)
              }
              value={variableValue}
              onChange={(e) =>
                handleVariableChange(variableName, e.target.value)
              }
            />
          )}
        </div>
      ))}
    </div>
  );
};

export default Dropdowns;
