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
          {tableData.map((row, rowIndex) => (
            <React.Fragment key={rowIndex}>
              {
                // Add this condition to render the header or div before each new section
                <TableRow>
                  <TableCell colSpan={tableHeaders.length}>
                    <h2>{row.Subject}</h2> {/* Render the section title */}
                  </TableCell>
                </TableRow>
              }
              <TableRow>
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
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default DynamicTable;
