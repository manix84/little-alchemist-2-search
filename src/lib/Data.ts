import React, { useEffect } from "react";

export type RawData = {
  [key: string]: {
    prime?: boolean;
    n: string; // Name
    c?: string[]; // Makes
    p?: string[][]; // Combinations
  };
};

export interface AutocompleteOption {
  id: string;
  label: string;
  image?: string;
}

const useData = () => {
  const [isLoading, setIsLoading] = React.useState<boolean>(true);
  const [error, setError] = React.useState<Error>();
  const [data, setData] = React.useState<RawData>();

  useEffect(() => {
    const fetchData = async () =>
      setData(
        await fetch(`${process.env.PUBLIC_URL}/data/raw_data.json`)
          .then((response) => response.json())
          .catch((err) => setError(err))
      );
    fetchData();
  }, []);
  useEffect(() => {
    if (data) setIsLoading(false);
    if (error) console.error(error);
  }, [data, error]);

  return {
    isLoading,
    error,
    getName: (id: string) => data?.[id]?.n,
    getImage: (id: string) => `https://hints.littlealchemy2.com/icons/${id}.svg`,
    getCombinations: (id: string) => data?.[id]?.p,
    getMakes: (id: string) => data?.[id]?.c,
    getOptions: (): AutocompleteOption[] =>
      Object.entries(data || {})
        .map(([id, element]) => ({
          id,
          label: element.n,
          image: `https://hints.littlealchemy2.com/icons/${id}.svg`,
        }))
        .sort((a, b) => {
          const nameA = a.label.toUpperCase(); // ignore upper and lowercase
          const nameB = b.label.toUpperCase(); // ignore upper and lowercase
          if (nameA < nameB) {
            return -1;
          }
          if (nameA > nameB) {
            return 1;
          }

          // names must be equal
          return 0;
        }),
  };
};

export default useData;
