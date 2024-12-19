import React, { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const AuthCallback = () => {
	const [searchParams] = useSearchParams();
	const code = searchParams.get("code");

	const navigate = useNavigate();

	useEffect(() => {
		if (code) {
			fetch("http://localhost:5000/auth/github", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ code }),
			})
				.then((response) => response.json())
				.then((data) => {
					if (data.access_token) {
						localStorage.setItem("access_token", data.access_token);
						if (data.user) {
							localStorage.setItem("user", JSON.stringify(data.user));
						}
						navigate('/dashboard');
					} else {
						console.error("Error: An access token was not received.");
					}
				})
				.catch((error) => console.error("Error:", error));
		}
	}, [code]);

	return <div>Processing authentication...</div>;
};

export default AuthCallback;
