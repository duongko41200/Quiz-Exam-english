import { useState, useEffect } from "react";

const useIndexedDB = (dbName, storeName, keyPath) => {
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState([]);

  useEffect(() => {
    // Mở cơ sở dữ liệu với phiên bản mới để kích hoạt onupgradeneeded
    const request = indexedDB.open(dbName, 2); // Tăng phiên bản lên 2

    request.onupgradeneeded = function (e) {
      const db = e.target.result;

      
      if (!db.objectStoreNames.contains(storeName)) {
        console.log(`Creating store: ${storeName}`);
        db.createObjectStore(storeName, { keyPath });
      } else {
        console.log(`Store ${storeName} already exists`);
      }
    };

    request.onerror = function (err) {
      setError(err);
      console.error("Error opening IndexedDB:", err);
    };

    request.onsuccess = function (e) {
      console.log("Database opened successfully");
    };
  }, [dbName, storeName, keyPath]);

  const saveObjectToDB = (object) => {
    setIsSaving(true);
    setError(null);

    const request = indexedDB.open(dbName, 2);

    request.onsuccess = function (e) {
      const db = e.target.result;
      const transaction = db.transaction(storeName, "readwrite");
      const store = transaction.objectStore(storeName);

      const addRequest = store.add(object);

      addRequest.onsuccess = function () {
        setIsSaving(false);
        console.log(`${storeName} object added to the store`);
      };

      addRequest.onerror = function (err) {
        setIsSaving(false);
        setError(err);
        console.error("Error adding object:", err);
      };
    };

    request.onerror = function (err) {
      setIsSaving(false);
      setError(err);
      console.error("Error opening IndexedDB:", err);
    };
  };

  const getDataFromDB = () => {
    const request = indexedDB.open(dbName, 2);

    request.onsuccess = function (e) {
      const db = e.target.result;
      const transaction = db.transaction(storeName, "readonly");
      const store = transaction.objectStore(storeName);
      const getAllRequest = store.getAll();

      getAllRequest.onsuccess = function () {
        setData(getAllRequest.result);
      };

      getAllRequest.onerror = function (err) {
        setError(err);
        console.error("Error getting data from store:", err);
      };
    };

    request.onerror = function (err) {
      setError(err);
      console.error("Error opening IndexedDB:", err);
    };
  };

  return { saveObjectToDB, getDataFromDB, data, isSaving, error };
};

export default useIndexedDB;
