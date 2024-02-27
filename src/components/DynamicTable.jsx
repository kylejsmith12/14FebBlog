import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import { AppContext } from "../Context";

const DynamicTable = () => {
  const { state } = React.useContext(AppContext);
  const { tableHeaders, tableData } = state;

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            {tableHeaders.map((header) => (
              <TableCell key={header}>{header}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {Object.entries(tableData).map(([category, data]) => (
            <React.Fragment key={category}>
              {data.map((row, rowIndex) => (
                <React.Fragment key={rowIndex}>
                  <TableRow>
                    {/* Render the category in the first two columns */}
                    <TableCell colSpan={2}>
                      <h2>{category}</h2>
                    </TableCell>
                    {/* Render the extraText in the third column */}
                    <TableCell>{state.extraText[category]}</TableCell>
                  </TableRow>

                  <TableRow>
                    {/* Render other data in the row */}
                    {tableHeaders.map((header) => (
                      <TableCell key={header}>
                        {header === "People"
                          ? row[header].map((person, index) => (
                              <React.Fragment key={index}>
                                {index > 0 && ", "}
                                {`${person.name} - ${person.description}`}
                              </React.Fragment>
                            ))
                          : Array.isArray(row[header])
                          ? row[header].join(", ")
                          : row[header]}
                      </TableCell>
                    ))}
                  </TableRow>
                </React.Fragment>
              ))}
            </React.Fragment>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default DynamicTable;
