// DynamicTable.jsx
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
  const { tableHeaders, tableData, variables } = state;

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
            <TableRow key={rowIndex}>
              {Object.entries(row).map(([key, value]) => (
                <TableCell key={key}>
                  {Array.isArray(value)
                    ? value.map((person, index) => (
                        <React.Fragment key={index}>
                          {index > 0 && " / "}
                          {`${person.name} - ${person.description}`}
                        </React.Fragment>
                      ))
                    : value}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default DynamicTable;
