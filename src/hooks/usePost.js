import { useEffect, useState } from "react";

const usePost = () => {
  const [addMessage, setAddMessage] = useState("");
  const [addError, setAddError] = useState("");
  const [addLoading, setAddLoading] = useState(false);

  const addHandler = (url, payload) => {
    setAddMessage("");
    setAddError("");
    setAddLoading(true);

    return fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    })
      .then((res) => {
        if (!res.ok) {
          return res.json().then((err) => {
            throw new Error(err.error || "Failed to Add.");
          });
        }
        return res.json();
      })
      .then((data) => {
        setAddMessage(data.message || "Added Successfully.");
        return data;
      })
      .catch((error) => {
        setAddError(error.message || "Something Went Wrong.");
        throw error;
      })
      .finally(() => {
        setAddLoading(false);
      });
  };

  useEffect(() => {
    if (addMessage || addError) {
      const timer = setTimeout(() => {
        setAddMessage("");
        setAddError("");
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [addMessage, addError]);

  return { addMessage, addError, addLoading, addHandler };
};
export default usePost;
