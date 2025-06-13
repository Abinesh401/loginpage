import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import { message } from "antd";

const useLogin = () => {
  const { login } = useAuth();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const loginUser = async (values) => {
    try {
      setError(null);
      setLoading(true);

      const res = await fetch("http://localhost:3333/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      const data = await res.json();

      if (res.status === 200) {
        message.success(data.message || "Login successful");
        login(data.token, data.user);
        navigate("/dashboard");
      } else {
        message.error(data.message || "Login failed");
        setError(data.message);
      }

    } catch (err) {
      console.error(err);
      message.error("Something went wrong");
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return { loading, error, loginUser };
};

export default useLogin;

