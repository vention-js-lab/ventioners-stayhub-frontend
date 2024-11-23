import { createContext, type ReactNode, useContext, useState } from 'react';
import { type AccommodationBasics, type AccommodationFormData } from '#/modules/host/types';

export interface AccommodationContextType {
  data: AccommodationFormData;
  updateData: (newData: Partial<AccommodationFormData>) => void;
  basics: AccommodationBasics;
  updateBasics: (newBasics: Partial<AccommodationBasics>) => void;
}

export const AccommodationContext = createContext<AccommodationContextType>({
  data: {} as AccommodationFormData,
  updateData: () => {},
  basics: {} as AccommodationBasics,
  updateBasics: () => {},
});

export function AccommodationProvider({ children }: { children: ReactNode }) {
  const [data, setData] = useState<AccommodationFormData>({
    name: '',
    description: '',
    images: [],
    location: '',
    pricePerNight: 0,
    categoryId: '',
  });

  const [basics, setBasics] = useState<AccommodationBasics>({
    guests: 1,
    bedrooms: 1,
    beds: 1,
    bathrooms: 1,
  });

  const updateData = (newData: Partial<AccommodationFormData>) => {
    setData((prev) => ({ ...prev, ...newData }));
  };

  const updateBasics = (newBasics: Partial<AccommodationBasics>) => {
    setBasics((prev) => ({ ...prev, ...newBasics }));
  };

  return (
    <AccommodationContext.Provider value={{ data, updateData, basics, updateBasics }}>{children}</AccommodationContext.Provider>
  );
}

export const useAccommodation = () => useContext(AccommodationContext);
