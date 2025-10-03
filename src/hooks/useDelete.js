import { useEffect, useState } from "react";

const useDelete = () => {
  const [deleteMessage, setDeleteMessage] = useState("");
  const [deleteError, setDeleteError] = useState("");
  const [deleteLoader, setDeleteLoader] = useState(false);

  const deleteHandler = (url) => {
    setDeleteLoader(true);
    setDeleteMessage("");
    setDeleteError("");

    return fetch(url, {
      method: "DELETE",
    })
      .then((res) => {
        if (!res.ok) {
          return res.json().then((err) => {
            throw new Error(err.error || "Failed to Delete.");
          });
        }
        return res.json();
      })
      .then((data) => {
        setDeleteMessage(data.message || "Delete Successfully.");
        return data;
      })
      .catch((error) => {
        setDeleteError(error.message || "Something went wrong.");
        return error;
      })
      .finally(() => {
        setDeleteLoader(false);
      });
  };

  useEffect(() => {
    if (deleteMessage || deleteError) {
      const timer = setTimeout(() => {
        setDeleteMessage("");
        setDeleteError("");
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [deleteMessage, deleteError]);

  return { deleteMessage, deleteError, deleteLoader, deleteHandler };
};
export default useDelete;
