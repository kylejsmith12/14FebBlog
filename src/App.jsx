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

const App = () => {
  const { state, setState } = useContext(AppContext);
  const { selectedCategory, selectedView } = state;
  const documentDisplayRef = useRef(null);
  const [currentPage, setCurrentPage] = useState(1); // Lift the state up

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
            </FormControl>
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
      </Toolbar>
    </Container>
  );
};

export default App;
