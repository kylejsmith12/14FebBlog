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
              <TableRow>
                <TableCell colSpan={tableHeaders.length}>
                  <h2>{category}</h2> {/* Render the category as header */}
                </TableCell>
              </TableRow>
              {data.map((row, rowIndex) => (
                <TableRow key={rowIndex}>
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
              ))}
            </React.Fragment>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default DynamicTable;
