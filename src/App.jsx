// App.jsx
import React, { useRef, useContext, useState } from "react";
import {
  Container,
  Grid,
  Button,
  Toolbar,
  Typography,
  AppBar,
  CssBaseline,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from "@mui/material";
import DocumentViewer from "./components/DocumentViewer";
import { AppContext } from "./Context"; // Import the AppContext
import Dropdowns from "./components/Dropdowns";
import html2pdf from "html2pdf.js";
import PeopleDropdown from "./components/PeopleDropdown";
const App = () => {
  const { state, setState } = useContext(AppContext);
  const { selectedCategory, selectedView } = state;
  const documentDisplayRef = useRef(null);
  const [currentPage, setCurrentPage] = useState(1); // Lift the state up
  const [selectedPerson, setSelectedPerson] = useState(null); // State to store the selected person
  const handleDropdownChange = (category, variable, value) => {
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
    console.log("Updated variables:", category, variable, value);
  };

  const handlePersonChange = (personName) => {
    console.log("person name: ", personName);
    setSelectedPerson(personName);
    // Find the selected person's description from tableData
    const selectedPersonData = Object.values(state.tableData)
      .flatMap((category) => category.flatMap((item) => item.People))
      .find((person) => person.name === personName);

    console.log("Selected Person Data:", selectedPersonData); // Log the selected person's data

    // Update the state with the selected person's description
    setState((prevState) => ({
      ...prevState,
      variables: {
        ...prevState.variables,
        dynamicTable: {
          ...prevState.variables.dynamicTable,
          variable3: selectedPersonData.description,
        },
      },
    }));

    setSelectedPerson(personName);
  };

  function textDiff(paragraph1, paragraph2) {
    const words1 = paragraph1.split(/\s+/);
    const words2 = paragraph2.split(/\s+/);

    const diffMap = new Map();

    for (let i = 0; i < Math.max(words1.length, words2.length); i++) {
      const word1 = words1[i];
      const word2 = words2[i];

      if (word1 !== word2) {
        diffMap.set(i, {
          previousWord: word1 || null,
          newWord: word2 || null,
          position: i,
        });
      }
    }

    return diffMap;
  }

  // Example usage:
  const paragraph1 = "11 12 13 13131";
  const paragraph2 = "11 13 40 131312";

  const differences = textDiff(paragraph1, paragraph2);
  console.log("Differences:", differences);

  const handleExportPDF = async () => {
    const pdfOptions = {
      margin: 10,
      filename: "my_document.pdf",
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
    };

    // Create a container element to hold the content of both pages
    const container = document.createElement("div");

    // Render the first page content
    const firstPageContent = document.createElement("div");
    firstPageContent.innerHTML = documentDisplayRef.current.innerHTML;
    firstPageContent.style.height = "auto";
    container.appendChild(firstPageContent);

    // Render the second page content by setting the currentPage state to 2
    setCurrentPage(2);
    await new Promise((resolve) => setTimeout(resolve, 100)); // Wait for re-render

    // Render the second page content
    const secondPageContent = document.createElement("div");
    secondPageContent.innerHTML = documentDisplayRef.current.innerHTML;
    secondPageContent.style.height = "auto";
    container.appendChild(secondPageContent);

    // Convert the container element to a single PDF
    const combinedPdfBlob = await html2pdf()
      .from(container)
      .set(pdfOptions)
      .outputPdf("blob");

    // Create a download link for the combined PDF
    const downloadLink = document.createElement("a");
    downloadLink.href = URL.createObjectURL(combinedPdfBlob);
    downloadLink.download = pdfOptions.filename;
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  };

  const handleAddParagraph = () => {
    // Get the current paragraph text for the selected category
    const currentParagraphJSX = state.paragraphs[selectedCategory];

    // Extract text content from JSX element
    const currentParagraphText = extractTextFromJSX(currentParagraphJSX);
    console.log("current: ", currentParagraphText);
    // If currentParagraphText is undefined or null, initialize it as an empty string
    const newSentenceText = "New sentence text"; // Set the new sentence text here

    // Append the new sentence text to the current paragraph text
    const updatedParagraphText = `${
      currentParagraphText || ""
    } ${newSentenceText}`;
    console.log("updatedParagraph: ", updatedParagraphText);
    // Get the number of existing variables for the selected category
    const existingVariableCount =
      Object.keys(state.variables[selectedCategory]).length + 1;

    // Generate the key for the new variable
    const newVariableKey = `variable${existingVariableCount + 1}`;

    // Update the paragraphs and variables directly in the state
    setState((prevState) => ({
      ...prevState,
      paragraphs: {
        ...prevState.paragraphs,
        [selectedCategory]: updatedParagraphText,
      },
      variables: {
        ...prevState.variables,
        [selectedCategory]: {
          ...prevState.variables[selectedCategory],
          [newVariableKey]: newSentenceText,
        },
      },
    }));
  };

  // Helper function to extract text content from JSX element
  const extractTextFromJSX = (jsxElement) => {
    if (!jsxElement) return ""; // Return an empty string if jsxElement is null or undefined
    if (typeof jsxElement === "string") return jsxElement; // If jsxElement is already a string, return it directly
    if (Array.isArray(jsxElement)) {
      return jsxElement.map((child) => extractTextFromJSX(child)).join(""); // Recursively extract text from child elements
    }
    if (jsxElement.props && jsxElement.props.children) {
      return extractTextFromJSX(jsxElement.props.children); // Extract text from props.children
    }
    return ""; // Return an empty string if none of the above conditions are met
  };

  return (
    <Container style={{ minHeight: "100vh" }}>
      <CssBaseline />
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">My Blog</Typography>
        </Toolbar>
      </AppBar>
      <Toolbar />
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <FormControl fullWidth style={{ marginBottom: "20px" }}>
            <InputLabel id="view-select-label">View</InputLabel>
            <Select
              labelId="view-select-label"
              id="view-select"
              value={selectedView}
              onChange={(e) =>
                setState((prevState) => ({
                  ...prevState,
                  selectedView: e.target.value,
                }))
              }
            >
              <MenuItem value="single">Single</MenuItem>
              <MenuItem value="all">All</MenuItem>
            </Select>
          </FormControl>
          {selectedView !== "all" && (
            <FormControl fullWidth style={{ marginBottom: "20px" }}>
              <InputLabel id="category-select-label">Category</InputLabel>
              <Select
                labelId="category-select-label"
                id="category-select"
                value={selectedCategory}
                onChange={(e) =>
                  setState((prevState) => ({
                    ...prevState,
                    selectedCategory: e.target.value,
                  }))
                }
              >
                <MenuItem value="harryPotter">Harry Potter</MenuItem>
                <MenuItem value="lordOfTheRings">Lord of the Rings</MenuItem>
                <MenuItem value="dynamicTable">Dynamic Table</MenuItem>
              </Select>
              {selectedCategory in state.paragraphs && (
                <Button
                  variant="outlined"
                  color="primary"
                  onClick={() => handleAddParagraph()}
                >
                  Add Sentence
                </Button>
              )}
            </FormControl>
          )}
          {selectedView === "single" && selectedCategory === "dynamicTable" && (
            <PeopleDropdown
              variables={state.variables.dynamicTable}
              onChange={handlePersonChange}
            />
          )}
          <Dropdowns
            category={selectedCategory}
            variables={state.variables[selectedCategory]}
            onChange={handleDropdownChange} // Pass the handleDropdownChange function
            setState={setState} // Pass setState function here
          />
        </Grid>
        <Grid item xs={12} md={8}>
          <DocumentViewer
            ref={documentDisplayRef}
            title="My Blog Document"
            selectedCategory={selectedCategory}
            selectedView={selectedView}
            currentPage={currentPage} // Pass currentPage as a prop
            setCurrentPage={setCurrentPage} // Pass setCurrentPage as a prop
          />
          {selectedView === "all" && (
            <Button
              variant="outlined"
              color="secondary"
              onClick={handleExportPDF}
              style={{ marginTop: "20px" }}
            >
              Export to PDF
            </Button>
          )}
        </Grid>
      </Grid>
      <Toolbar>
        <Button variant="contained" color="primary">
          Save
        </Button>
        <Button onClick={() => textDiff(paragraph1, paragraph2)}>test</Button>
      </Toolbar>
    </Container>
  );
};

export default App;
