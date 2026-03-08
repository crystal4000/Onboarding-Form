import { useEffect, useState } from "react";

interface Country {
  name: string;
  code: string;
}
interface RawCountry {
  name: { common: string };
  cca2: string;
}

export function useCountries() {
  const [countries, setCountries] = useState<Country[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://restcountries.com/v3.1/all?fields=name,cca2")
      .then((res) => res.json())
      .then((data) => {
        const sorted = data
          .map((c: RawCountry) => ({ name: c.name.common, code: c.cca2 }))
          .sort((a: Country, b: Country) => a.name.localeCompare(b.name));
        setCountries(sorted);
      })
      .finally(() => setLoading(false));
  }, []);

  return { countries, loading };
}
