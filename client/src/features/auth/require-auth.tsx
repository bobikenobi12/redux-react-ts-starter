import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectCurrentUserToken } from "./auth-slice";

export default function RequireAuth() {
	const location = useLocation();
	const token = useSelector(selectCurrentUserToken);

	return token ? (
		<Outlet />
	) : (
		<Navigate to="/login" state={{ from: location }} replace />
	);
}
