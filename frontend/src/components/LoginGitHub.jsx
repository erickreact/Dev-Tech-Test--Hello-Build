import React from "react";

const GITHUB_CLIENT_ID = "Ov23liQgnmN4K7rt77PX";
const REDIRECT_URI = "http://localhost:5173/auth/callback";

const LoginGitHub = () => {
	const handleLogin = () => {
		const githubAuthUrl = `https://github.com/login/oauth/authorize?client_id=${GITHUB_CLIENT_ID}&redirect_uri=${REDIRECT_URI}&scope=read:user user:email`;
		window.location.href = githubAuthUrl;
	};

	return (
		<div style={{ textAlign: "center", marginTop: "50px" }}>
			<button className="github-login-button" onClick={handleLogin}>
				<img
					width="50" height="50" src="https://img.icons8.com/stickers/50/github.png" alt="github"
				/>
			</button>
		</div>
	);
};

export default LoginGitHub;
