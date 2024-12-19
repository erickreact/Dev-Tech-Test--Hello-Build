import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import LoginForm from "./pages/LoginForm";
import DashBoard from "./pages/DashBoard";
import RegisterForm from "./pages/RegisterForm";
import AuthCallback from "./components/AuthCallBack";

const App = () => (
	<AuthProvider>
		<Router>
			<Routes>
				<Route path="/" element={<LoginForm />} />
				<Route path="/login" element={<LoginForm />} />
				<Route path="/register" element={<RegisterForm />} />
				<Route path="/dashboard" element={<DashBoard />} />
				<Route path="/auth/callback" element={<AuthCallback />} />
			</Routes>
		</Router>
	</AuthProvider>
);

export default App;
