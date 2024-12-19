import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import "../assets/NavBar.css";

const NavBar = ({ children }) => {
	const { user, logout } = useContext(AuthContext);
	const navigate = useNavigate();

	const handleLogout = () => {
		logout();
		navigate("/login");
	};

	return (
		<div className="template-container">
			<nav className="navbar">
				<div className="navbar-brand">Dev Tech Test- Hello Build</div>
				<div className="dropdown">
					<button className="dropdown-toggle">
						{user?.username || "User"}
					</button>
					<div className="dropdown-menu">
						<p className="dropdown-item">{user?.email || "Guest"}</p>
						<button className="dropdown-item logout-btn" onClick={handleLogout}>
							Logout
						</button>
					</div>
				</div>
			</nav>
			<div className="main-content">{children}</div>
		</div>
	);
};

export default NavBar;
