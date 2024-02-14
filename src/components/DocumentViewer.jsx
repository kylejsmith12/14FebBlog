// DocumentViewer.jsx
import React, { useContext, useState, useEffect, forwardRef } from "react";
import { Typography, Paper, Button } from "@mui/material";
import { AppContext } from "../Context"; // Import the AppContext
import Dropdowns from "./Dropdowns";
import DynamicTable from "./DynamicTable";

const DocumentViewer = forwardRef(
  ({ title, selectedCategory, selectedView }, ref) => {
    console.log("ref: ", ref);
    const { state, setState } = useContext(AppContext);
    const { harryPotter, lordOfTheRings, dynamicTable } = state.variables;
    const [currentPage, setCurrentPage] = useState(1);
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

    const renderContent = () => {
      if (selectedView === "all") {
        if (currentPage === 1) {
          return (
            <>
              <Typography variant="h6">{title}</Typography>
              {(selectedCategory === "harryPotter" ||
                selectedView === "all") && (
                <p>
                  Nearly ten years had passed since the{" "}
                  <strong>{harryPotter["variable1"]}</strong> had woken up to
                  find their nephew on the front step, but{" "}
                  {harryPotter["variable2"]} had hardly changed at all. The sun
                  rose on the same tidy front gardens and lit up the brass
                  number four on the {harryPotter["variable1"]}' front door; it
                  crept into their living room, which was almost exactly the
                  same as it had been on the night when Mr.{" "}
                  {harryPotter["variable1"]} had seen that fateful news report
                  about the owls. Only the photographs on the mantelpiece really
                  showed how much time had passed. Ten years ago, there had been
                  lots of pictures of what looked like a large pink beach ball
                  wearing different-colored bonnets - but{" "}
                  {harryPotter["variable3"]} was no longer a baby, and now the
                  photographs showed a large blond boy riding his first bicycle,
                  on a carousel at the fair, playing a computer game with his
                  father, being hugged and kissed by his mother. The room held
                  no sign at all that another boy lived in the house, too.
                </p>
              )}
              {(selectedCategory === "lordOfTheRings" ||
                selectedView === "all") && (
                <p>
                  It takes a hobbit to describe the paradoxical majesty and
                  merriment of <strong>{lordOfTheRings["variable1"]}</strong>.{" "}
                  {lordOfTheRings["variable2"]} explains how folk get confused
                  by her power. She sees into their hearts and makes them look
                  at their mixed motives and ambitions, and some believe that
                  she planted the dark motives there herself. (You can read more
                  about this power <a href="#">here</a> and <a href="#">here</a>
                  .)
                </p>
              )}
              {/* {selectedView === "all" && (
              <DynamicTable
                headers={state.tableHeaders}
                data={state.tableData}
                variables={state.variables.dynamicTable} // Pass dynamicTable directly
              />
            )} */}
            </>
          );
        } else {
          console.log("currentPAge: ", currentPage);
          return (
            <>
              <DynamicTable
                headers={state.tableHeaders}
                data={state.tableData}
                variables={state.variables.dynamicTable} // Pass dynamicTable directly
              />
            </>
          );
        }
      } else if (selectedView === "single") {
        return (
          <>
            <Typography variant="h6">{title}</Typography>
            {(selectedCategory === "harryPotter" || selectedView === "all") && (
              <p>
                Nearly ten years had passed since the{" "}
                <strong>{harryPotter["variable1"]}</strong> had woken up to find
                their nephew on the front step, but {harryPotter["variable2"]}{" "}
                had hardly changed at all. The sun rose on the same tidy front
                gardens and lit up the brass number four on the{" "}
                {harryPotter["variable1"]}' front door; it crept into their
                living room, which was almost exactly the same as it had been on
                the night when Mr. {harryPotter["variable1"]} had seen that
                fateful news report about the owls. Only the photographs on the
                mantelpiece really showed how much time had passed. Ten years
                ago, there had been lots of pictures of what looked like a large
                pink beach ball wearing different-colored bonnets - but{" "}
                {harryPotter["variable3"]} was no longer a baby, and now the
                photographs showed a large blond boy riding his first bicycle,
                on a carousel at the fair, playing a computer game with his
                father, being hugged and kissed by his mother. The room held no
                sign at all that another boy lived in the house, too.
              </p>
            )}
            {(selectedCategory === "lordOfTheRings" ||
              selectedView === "all") && (
              <p>
                It takes a hobbit to describe the paradoxical majesty and
                merriment of <strong>{lordOfTheRings["variable1"]}</strong>.{" "}
                {lordOfTheRings["variable2"]} explains how folk get confused by
                her power. She sees into their hearts and makes them look at
                their mixed motives and ambitions, and some believe that she
                planted the dark motives there herself. (You can read more about
                this power <a href="#">here</a> and <a href="#">here</a>.)
              </p>
            )}
            {selectedCategory === "dynamicTable" && (
              <DynamicTable
                headers={state.tableHeaders}
                data={state.tableData}
                variables={harryPotter} // Use harryPotter variables as an example, you can replace it with appropriate variables
              />
            )}
          </>
        );
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
              {renderContent()}
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
