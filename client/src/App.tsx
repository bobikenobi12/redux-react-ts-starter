import { Provider } from "react-redux";
import { store } from "./app/store";

import { ChakraProvider } from "@chakra-ui/react";
import theme from "./theme";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Layout from "./components/layout";
import Root from "./routes/root";
import Home from "./routes/home";
import ErrorPage from "./routes/error-page";
import RequireAuth from "./features/auth/require-auth";

const router = createBrowserRouter([
	{
		path: "/",
		element: <Layout />,
		children: [
			{
				path: "/",
				element: <RequireAuth />,
				children: [
					{
						path: "/",
						element: <Root />,
					},
					{
						path: "home",
						element: <Home />,
					},
				],
			},
			{
				path: "*",
				element: <ErrorPage />,
			},
		],
	},
]);

export default function App() {
	return (
		<Provider store={store}>
			<ChakraProvider theme={theme}>
				<RouterProvider router={router} />
			</ChakraProvider>
		</Provider>
	);
}
