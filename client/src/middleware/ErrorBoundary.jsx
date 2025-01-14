import React from "react";
import { useNavigate } from "react-router-dom";

import "react-toastify/dist/ReactToastify.css";

// Custom Fallback Component
export function ErrorFallback({ error, resetErrorBoundary }) {
      const navigate = useNavigate();

      // Chuyển hướng về trang chủ khi có lỗi
      React.useEffect(() => {
        // Sau khi bắt lỗi, điều hướng về trang chủ (hoặc bất kỳ trang nào)
        navigate("/");
      }, [error, navigate]);
  return (
    <div role="alert">
      <p>Something went wrong: {error.message}</p>
      <p>Redirecting to the home page...</p>
    </div>
  );
}
