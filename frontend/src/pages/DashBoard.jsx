import React, { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import Repositories from "../components/Repositories";
import LoginGitHub from '../components/LoginGitHub';
import '../assets/DashBoard.css'

const DashBoard = () => {
	const [user, setUser] = useState(null);
	const [repos, setRepos] = useState([]);

	useEffect(() => {
		const storedUser = localStorage.getItem("user");
		if (storedUser) {
			setUser(JSON.parse(storedUser));
		}
	}, []);

	const handleLogout = () => {
		localStorage.removeItem("user");
		setUser(null);
	};

	return (
		<>
			<NavBar user={user} onLogout={handleLogout} />
			<div className="dashboard-container">
				<h1>Welcome</h1>
				{user ? (
					<div className="dashboard-content">
						<p>
							<strong>{user.login || user.username}</strong> 👋
						</p>
						<div className="repositories-container">
							<h2>Repositories</h2>
							<LoginGitHub />
							<Repositories token={localStorage.getItem("access_token")} repos={repos} />
						</div>
					</div>
				) : (
					<div className="dashboard-content">
						<p>You are not authenticated. Connect with GitHub to continue.</p>
						<button className="button-primary">
							Login with GitHub
						</button>
					</div>
				)}
			</div>
		</>
	);
};

export default DashBoard;
