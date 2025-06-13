import { useState } from "react";
import { useAuth } from "../context/AuthContext.jsx";
import { useNavigate } from "react-router-dom";
import { message } from "antd";

const useSignup = () => {
  const { login } = useAuth();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const registerUser = async (values) => {
    if (values.password !== values.passwordConfirm) {
      setError("Passwords do not match");
      return;
    }

    try {
      setError(null);
      setLoading(true);

      const res = await fetch("http://localhost:3333/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: values.name,
          email: values.email,
          password: values.password,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        message.success(data.message || "Registration successful");
        login(data.token, data.user);
        navigate("/dashboard");
      } else {
        setError(data.message || "Registration failed");
        message.error(data.message || "Registration failed");
      }
    } catch (err) {
      console.error(err);
      setError("An unexpected error occurred");
      message.error("An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  return { loading, error, registerUser };
};

export default useSignup;



