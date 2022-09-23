import Autocomplete from "@mui/material/Autocomplete";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import useMediaQuery from "@mui/material/useMediaQuery";
import React, { useEffect, useState } from "react";
import "./App.css";
import { ElementsData, fetchElementsData, getLabels } from "./lib/data";

export const App = () => {
  const [elementsData, setElementsData] = useState<ElementsData>();
  useEffect(() => {
    const fetchData = async () => {
      setElementsData(await fetchElementsData());
    };
    fetchData();
  }, []);

  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");

  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode: prefersDarkMode ? "dark" : "light",
        },
      }),
    [prefersDarkMode]
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className='App'>
        <header className='header'>
          <img
            src={"https://littlealchemy2.com/img/logo.2b0c661a.svg"}
            style={{ filter: "drop-shadow(rgba(0, 0, 0, 0.5) 5px 5px 3px)" }}
            className='logo'
            alt='Little Alchemy 2'
          />
          <p>Search for Elements</p>
          {elementsData && (
            <>
              <Autocomplete
                disablePortal
                id='combo-box-demo'
                options={getLabels(elementsData)}
                sx={{ width: 300 }}
                renderOption={(props, option) => (
                  <Box component='li' sx={{ "& > img": { mr: 2, flexShrink: 0 } }} {...props}>
                    <img
                      loading='lazy'
                      width='20'
                      src={option.image}
                      alt=''
                      style={{ filter: "drop-shadow(0 0 0 rgba(0,0,0,0.5))" }}
                    />
                    {option.label}
                  </Box>
                )}
                renderInput={(params) => <TextField {...params} label='Elements' />}
              />
              <Button variant={"contained"}>Search</Button>
            </>
          )}
        </header>
      </div>
    </ThemeProvider>
  );
};

export default App;
