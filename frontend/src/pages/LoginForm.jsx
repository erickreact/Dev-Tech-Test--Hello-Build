import React, { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import "../assets/LoginForm.css";

const LoginForm = () => {
	const [formData, setFormData] = useState({ email: "", password: "" });
	const [error, setError] = useState("");
	const { login } = useContext(AuthContext);
	const navigate = useNavigate();

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData({ ...formData, [name]: value });
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		const users = JSON.parse(localStorage.getItem("users")) || [];
		const user = users.find(
			(u) => u.email === formData.email && u.password === formData.password
		);

		if (user) {
			login(user);
			navigate("/dashboard");
		} else {
			setError("Incorrect email or password.");
		}
	};

	return (
		<div className="login-container">
			<form onSubmit={handleSubmit} className="login-form">
				<h2 className="form-title">Login</h2>
				{error && <p style={{ color: "red" }}>{error}</p>}
				<div className="form-group">
					<label>Email:</label>
					<input
						type="email"
						name="email"
						placeholder="Email address"
						value={formData.email}
						onChange={handleChange}
						className={error.email ? "input-error" : ""}
					/>
					{error.email && <p className="error-message">{error.email}</p>}
				</div>
				<div className="form-group">
					<label>Password:</label>
					<input
						type="password"
						name="password"
						placeholder="Password"
						value={formData.password}
						onChange={handleChange}
						className={error.password ? "input-error" : ""}
					/>
					{error.password && <p className="error-message">{error.password}</p>}
				</div>
				<button type="submit" className="login-button">Log In</button>
			</form>
			<p className="signup-prompt">
				Don&apos;t have an account? <Link to="/register" className="signup-link">
					Sign up
				</Link>
			</p>
		</div>
	);
};

export default LoginForm;
