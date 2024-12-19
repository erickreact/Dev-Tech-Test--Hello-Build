import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "../assets/RegisterForm.css";

const RegisterForm = () => {
	const [formData, setFormData] = useState({
		username: "",
		email: "",
		password: "",
	});
	const [errors, setErrors] = useState({});
	const [isSubmitted, setIsSubmitted] = useState(false);
	const navigate = useNavigate();

	const validateForm = () => {
		const newErrors = {};
		if (!formData.username) {
			newErrors.username = "Username is required.";
		}
		if (!formData.email) {
			newErrors.email = "Email is required.";
		} else if (!/\S+@\S+\.\S+/.test(formData.email)) {
			newErrors.email = "Email format is not valid.";
		}
		if (!formData.password) {
			newErrors.password = "Password is required.";
		} else if (formData.password.length < 6) {
			newErrors.password = "Password must be at least 6 characters.";
		}

		const existingUsers = JSON.parse(localStorage.getItem("users")) || [];
		const emailExists = existingUsers.some((user) => user.email === formData.email);
		if (emailExists) {
			newErrors.email = "This email is already registered.";
		}

		return newErrors;
	};

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData({ ...formData, [name]: value });
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		setErrors({});
		const validationErrors = validateForm();

		if (Object.keys(validationErrors).length === 0) {
			const existingUsers = JSON.parse(localStorage.getItem("users")) || [];
			const newUsers = [...existingUsers, formData];

			localStorage.setItem("users", JSON.stringify(newUsers));
			setIsSubmitted(true);

			navigate("/login");
		} else {
			setErrors(validationErrors);
		}
	};

	return (
		<div className="register-container">
			<form onSubmit={handleSubmit} className="register-form">
				<h2 className="form-title">Singup</h2>
				<div className="form-group">
					<label htmlFor="username">Username:</label>
					<input
						type="text"
						id="username"
						name="username"
						placeholder="Username"
						icon="person"
						value={formData.username}
						onChange={handleChange}
						className={errors.username ? "input-error" : ""}
					/>
					{errors.username && <p className="error-message">{errors.username}</p>}
				</div>

				<div className="form-group">
					<label htmlFor="email">Email:</label>
					<input
						type="email"
						id="email"
						name="email"
						placeholder="Email address"
						icon="mail"
						value={formData.email}
						onChange={handleChange}
						className={errors.email ? "input-error" : ""}
					/>
					{errors.email && <p className="error-message">{errors.email}</p>}
				</div>

				<div className="form-group">
					<label htmlFor="password">Password:</label>
					<input
						type="password"
						id="password"
						name="password"
						placeholder="Password"
						icon="lock"
						value={formData.password}
						onChange={handleChange}
						className={errors.password ? "input-error" : ""}
					/>
					{errors.password && (
						<p className="error-message">{errors.password}</p>
					)}
				</div>

				<button type="submit" className="register-button">
					Create account
				</button>
				<p className="signup-prompt">
					Do you have an account? <Link to="/login" className="signup-link">
						Login
					</Link>
				</p>
			</form>
		</div>
	);
};

export default RegisterForm;
