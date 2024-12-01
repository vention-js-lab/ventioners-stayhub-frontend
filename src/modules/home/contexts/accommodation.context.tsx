import { createContext, type ReactNode, useContext, useState } from 'react';
import { type AccommodationFormData } from '../types/accommodation-form-data.interface';

export interface AccommodationContextType {
  data: AccommodationFormData;
  updateData: (newData: Partial<AccommodationFormData>) => void;
}

const AccommodationContext = createContext<AccommodationContextType | null>({
  data: {} as AccommodationFormData,
  updateData: () => {},
});

export function AccommodationProvider({ children }: { children: ReactNode }) {
  const [data, setData] = useState<AccommodationFormData>({} as AccommodationFormData);

  const updateData = (newData: Partial<AccommodationFormData>) => {
    setData((prev) => ({ ...prev, ...newData }));
  };

  return <AccommodationContext.Provider value={{ data, updateData }}>{children}</AccommodationContext.Provider>;
}

export const useAccommodationContext = () => {
  const context = useContext(AccommodationContext);

  if (!context) {
    throw new Error('useAccommodationContext must be used within a AccommodationProvider');
  }

  return context;
};
