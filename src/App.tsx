import Autocomplete from "@mui/material/Autocomplete";
import styled from "styled-components/macro";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import useMediaQuery from "@mui/material/useMediaQuery";
import React, { useEffect, useState } from "react";
import "./App.css";
import useData from "./lib/Data";

export const App = () => {
  const { isLoading, getName, getImage, getOptions, getCombinations, getMakes } = useData();

  const [selectedID, setSelectedID] = useState<string>();
  const [selectedCombinations, setSelectedCombinations] = useState<string[][]>();
  const [selectedMakes, setSelectedMakes] = useState<string[]>();

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
  useEffect(() => {
    console.log({ selectedID });
    setSelectedCombinations(selectedID ? getCombinations(selectedID) : undefined);
    setSelectedMakes(selectedID ? getMakes(selectedID) : undefined);
  }, [selectedID]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <PageContainer>
        <Header>
          <img
            src={"https://littlealchemy2.com/img/logo.2b0c661a.svg"}
            style={{ filter: "drop-shadow(rgba(0, 0, 0, 0.5) 5px 5px 3px)" }}
            className='logo'
            alt='Little Alchemy 2'
          />
        </Header>
        <Main>
          <Autocomplete
            disablePortal
            loading={isLoading}
            isOptionEqualToValue={(option, value) => option.id === value.id}
            options={getOptions()}
            sx={{ width: 300 }}
            renderOption={(props, option) => (
              <Box component='li' sx={{ "& > img": { mr: 2, flexShrink: 0 } }} {...props}>
                <AutoCompleteIcons loading='lazy' src={option.image} alt={""} />
                {option.label}
              </Box>
            )}
            renderInput={(params) => <TextField {...params} label='Elements' />}
            onChange={(_event, option) => {
              setSelectedID(option?.id);
            }}
          />
          {selectedID && (
            <>
              <div>
                <ElementImg src={getImage(selectedID)} alt={getName(selectedID)} />
              </div>
              <div>{getName(selectedID)}</div>
              {selectedCombinations && (
                <>
                  <h2>Combinations</h2>
                  {selectedCombinations.map((combination: string[]) => (
                    <CombinationContainer>
                      {combination.map((elementID: string, index: number) => (
                        <>
                          {index > 0 && <ElementContainer>+</ElementContainer>}
                          <ElementContainer>
                            <ElementImg src={getImage(elementID)} />
                            <ElementName>{getName(elementID)}</ElementName>
                          </ElementContainer>
                        </>
                      ))}
                    </CombinationContainer>
                  ))}
                </>
              )}
              {selectedMakes && (
                <>
                  <h2>Makes</h2>
                  {selectedMakes.map((elementID: string) => (
                    <CombinationContainer>
                      <ElementContainer>
                        <ElementImg src={getImage(elementID)} />
                        <ElementName>{getName(elementID)}</ElementName>
                      </ElementContainer>
                    </CombinationContainer>
                  ))}
                </>
              )}
            </>
          )}
        </Main>
      </PageContainer>
    </ThemeProvider>
  );
};
export default App;

const PageContainer = styled.div`
  padding-top: 10vh;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2vh;
  font-size: calc(10px + 2vmin);
`;

const Header = styled.header`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const Main = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const AutoCompleteIcons = styled.img`
  width: 20px;
  filter: drop-shadow(0 0 0 rgba(0, 0, 0, 0.5));
`;

const ElementContainer = styled.div``;

const ElementImg = styled.img`
  width: 50px;
  filter: drop-shadow(0 0 0 rgba(0, 0, 0, 0.5));
`;

const ElementName = styled.div``;

const CombinationContainer = styled.div`
  display: flex;
  flex-direction: row;
`;
