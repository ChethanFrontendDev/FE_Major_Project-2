import { useEffect, useState } from "react";

const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchData = () => {
    setLoading(true);
    setError("");

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setData(data);
      })
      .catch((error) => setError(error.message))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchData();
  }, [url]);

  return { data, loading, error, refetch: fetchData };
};
export default useFetch;
