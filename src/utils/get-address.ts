export const getPreferredAddress = (results: google.maps.GeocoderResult[]): string => {
  const preferredLanguages = ['en', 'uz', 'ru'];

  const isPreferredLanguage = (address: string) => {
    return preferredLanguages.some((lang) => address.toLowerCase().includes(lang.toLowerCase()));
  };

  const hasStreetNumber = (address_components: google.maps.GeocoderAddressComponent[]) => {
    return address_components.some((component) => component.types.includes('street_number'));
  };

  const hasStreetName = (address_components: google.maps.GeocoderAddressComponent[]) => {
    return address_components.some((component) => component.types.includes('route'));
  };

  for (const result of results) {
    const { formatted_address, address_components } = result;

    if ((hasStreetNumber(address_components) || hasStreetName(address_components)) && isPreferredLanguage(formatted_address)) {
      return formatted_address;
    }
  }

  return results[0]?.formatted_address || 'Unknown location';
};
