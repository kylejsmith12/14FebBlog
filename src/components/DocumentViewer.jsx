import React, { useContext, useState, useEffect, forwardRef } from "react";
import { Typography, Paper, Button } from "@mui/material";
import { AppContext } from "../Context"; // Import the AppContext
import Dropdowns from "./Dropdowns";
import DynamicTable from "./DynamicTable";

const DocumentViewer = forwardRef(
  (
    { title, selectedCategory, selectedView, currentPage, setCurrentPage },
    ref
  ) => {
    const { state, setState } = useContext(AppContext);
    const { harryPotter, lordOfTheRings, dynamicTable } = state.variables;
    const totalPages = selectedView === "all" ? 2 : 1;

    const [updatedDynamicTable, setUpdatedDynamicTable] = useState(null);

    useEffect(() => {
      // Update the dynamic table variables when the context changes
      if (selectedCategory === "dynamicTable") {
        setUpdatedDynamicTable(state.variables.dynamicTable);
      }
    }, [selectedCategory, state.variables.dynamicTable]);

    const handleNextPage = () => {
      if (currentPage < totalPages) {
        setCurrentPage(currentPage + 1);
      }
    };

    const handlePrevPage = () => {
      if (currentPage > 1) {
        setCurrentPage(currentPage - 1);
      }
    };

    const handleVariableChange = (category, variable, value) => {
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

    const renderContent = (category) => {
      const paragraph = state.paragraphs[category];
      switch (selectedView) {
        case "all":
          return currentPage === 1 ? (
            <>
              <Typography variant="h6">{title}</Typography>
              <p>{paragraph}</p>
            </>
          ) : (
            <DynamicTable
              headers={state.tableHeaders}
              data={state.tableData}
              variables={state.variables.dynamicTable} // Pass dynamicTable directly
            />
          );
        case "single":
          return (
            <>
              <Typography variant="h6">{title}</Typography>
              <p>{paragraph}</p>
              {selectedCategory === "dynamicTable" && (
                <DynamicTable
                  headers={state.tableHeaders}
                  data={state.tableData}
                  variables={harryPotter} // Use harryPotter variables as an example, you can replace it with appropriate variables
                />
              )}
            </>
          );
        default:
          return null;
      }
    };

    return (
      <div ref={ref}>
        <div style={{ flex: "2", overflow: "hidden" }}>
          <Paper
            style={{
              width: "8.5in",
              height: "11in",
              margin: "auto",
              padding: "0.5in",
              overflow: "hidden",
            }}
          >
            <div>
              {/* Render content based on page and selectedCategory */}
              {renderContent(selectedCategory)}
            </div>
          </Paper>
          <div style={{ marginTop: "20px", textAlign: "center" }}>
            <Button onClick={handlePrevPage} disabled={currentPage === 1}>
              Previous Page
            </Button>{" "}
            <Button
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
            >
              Next Page
            </Button>
          </div>
        </div>
      </div>
    );
  }
);

export default DocumentViewer;
