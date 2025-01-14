import { useState } from 'react';

// Custom hook để lưu trữ và truy xuất object từ IndexedDB
const useIndexedDB = (dbName, storeName, keyPath) => {
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState([]); // Lưu trữ dữ liệu đã lấy từ IndexedDB

  // Hàm lưu object vào IndexedDB
  const saveObjectToDB = (object) => {
    setIsSaving(true);
    setError(null);

    // Mở cơ sở dữ liệu
    const request = indexedDB.open(dbName, 1);

    request.onupgradeneeded = function (e) {
      const db = e.target.result;
      // Tạo object store nếu chưa có
      if (!db.objectStoreNames.contains(storeName)) {
        db.createObjectStore(storeName, { keyPath });
      }
    };

    request.onsuccess = function (e) {
      const db = e.target.result;

      // Tạo transaction và thêm object vào store
      const transaction = db.transaction(storeName, 'readwrite');
      const store = transaction.objectStore(storeName);

      // Thêm object vào store
      const addRequest = store.add(object);

      addRequest.onsuccess = function () {
        setIsSaving(false);
        console.log(`${storeName} object added to the store`);
      };

      addRequest.onerror = function (err) {
        setIsSaving(false);
        setError(err);
        console.error('Error adding object:', err);
      };
    };

    request.onerror = function (err) {
      setIsSaving(false);
      setError(err);
      console.error('Error opening IndexedDB:', err);
    };
  };

  // Hàm lấy tất cả dữ liệu từ IndexedDB
  const getDataFromDB = () => {
    const request = indexedDB.open(dbName, 1);

    request.onsuccess = function (e) {
      const db = e.target.result;
      const transaction = db.transaction(storeName, 'readonly');
      const store = transaction.objectStore(storeName);
      const getAllRequest = store.getAll(); // Lấy tất cả các object trong store

      getAllRequest.onsuccess = function () {
        setData(getAllRequest.result); // Lưu dữ liệu vào state
      };

      getAllRequest.onerror = function (err) {
        setError(err);
        console.error('Error getting data from store:', err);
      };
    };

    request.onerror = function (err) {
      setError(err);
      console.error('Error opening IndexedDB:', err);
    };
  };

  return { saveObjectToDB, getDataFromDB, data, isSaving, error };
};

export default useIndexedDB;
