import { createContext, type ReactNode, useContext, useState } from 'react';
import { type AccommodationFormData } from '../types/accommodation-form-data.interface';
import { type AccommodationBasics } from '../types/accommodation-basics.type';

export interface AccommodationContextType {
  data: AccommodationFormData;
  updateData: (newData: Partial<AccommodationFormData>) => void;
  basics: AccommodationBasics;
  updateBasics: (newBasics: Partial<AccommodationBasics>) => void;
}

const AccommodationContext = createContext<AccommodationContextType>({
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
    amenityIds: [],
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
