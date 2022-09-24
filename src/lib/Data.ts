export type ElementsData = {
  [key: string]: {
    id: number;
    name: string;
    imageURL: string;
    combinations?: string[][];
    combination_ids?: number[][];
    produces?: string[];
    produce_ids?: number[];
  };
};

export const fetchElementsData = (): Promise<ElementsData> =>
  fetch("data/elements.json")
    .then((response) => response.json())
    .catch(console.error);

type Labels = { id: string; label: string; image: string }[];
export const getLabels = (elementsData: ElementsData): Labels =>
  Object.entries(elementsData)
    .map(([id, obj]) => ({
      id,
      label: obj.name,
      image: obj.imageURL,
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
    });
