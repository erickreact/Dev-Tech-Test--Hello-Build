import React, { useState, useEffect } from "react";
import '../assets/Repositories.css'

const Repositories = ({ token }) => {
	const [user, setUser] = useState(null);
	const [repos, setRepos] = useState([]);
	const [favorites, setFavorites] = useState([]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);

	useEffect(() => {
		const token = localStorage.getItem("access_token");
		if (token) {
			fetchData(token);
		} else {
			setError("No access token found. Please authenticate.");
		}
	}, [token]);

	const fetchData = async (token) => {
		setLoading(true);
		setError(null);

		const query = `
      query {
        viewer {
          login
          repositories(first: 10) {
            nodes {
              id
              name
              description
              url
              isPrivate
            }
          }
        }
      }
    `;

		try {
			const response = await fetch("https://api.github.com/graphql", {
				method: "POST",
				headers: {
					Authorization: `Bearer ${token}`,
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ query }),
			});

			if (!response.ok) {
				throw new Error("Error getting data from GitHub");
			}

			const { data } = await response.json();
			setUser(data.viewer.login);
			setRepos(data.viewer.repositories.nodes);

			const storedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
			setFavorites(storedFavorites);
		} catch (err) {
			setError(err.message);
		} finally {
			setLoading(false);
		}
	};

	const toggleFavorite = (repo) => {
		const isFavorited = favorites.some((fav) => fav.id === repo.id);
		let updatedFavorites;

		if (isFavorited) {
			updatedFavorites = favorites.filter((fav) => fav.id !== repo.id);
		} else {
			updatedFavorites = [...favorites, repo];
		}

		setFavorites(updatedFavorites);
		localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
	};

	return (
		<div className="repositories-container">
			<h1>User GitHub: {user || "User"}</h1>
			{loading && <p className="loading-message">Loading data...</p>}
			{error && <p className="error-message">{error}</p>}

			<div className="repositories-section">
				<div className="repo-list">
					<h2>Your Repositories</h2>
					<ul>
						{repos.map((repo) => {
							const isFavorited = favorites.some((fav) => fav.id === repo.id);

							return (
								<li key={repo.id}>
									<a href={repo.url} target="_blank" rel="noopener noreferrer">
										<strong>{repo.name}</strong>
									</a>
									<p>{repo.description || "No description"}</p>
									<span>{repo.isPrivate ? "Private" : "Public"}</span>
									<button
										className={`favorite-button ${isFavorited ? "favorited" : ""}`}
										onClick={() => toggleFavorite(repo)}
									>
										{isFavorited ? "Delete" : "Add to favorites"}
									</button>
								</li>
							);
						})}
					</ul>
				</div>

				<div className="favorites-list">
					<h2>Favorite Repositories</h2>
					<ul>
						{favorites.map((repo) => (
							<li key={repo.id}>
								<a href={repo.url} target="_blank" rel="noopener noreferrer">
									<strong>{repo.name}</strong>
								</a>
								<p>{repo.description || "No description"}</p>
								<button
									className="favorite-button favorited"
									onClick={() => toggleFavorite(repo)}
								>
									Delete
								</button>
							</li>
						))}
					</ul>
				</div>
			</div>
		</div>
	);
};

export default Repositories;
