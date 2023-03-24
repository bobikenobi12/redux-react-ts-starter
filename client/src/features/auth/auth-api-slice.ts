import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { setCredentials, logout } from "../../features/auth/auth-slice";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { RootState } from "../../app/store";
import { User } from "../../app/api/types/index";

export const authApi = createApi({
	reducerPath: "authApi",
	baseQuery: fetchBaseQuery({
		baseUrl: "http://localhost:3000/auth",
		credentials: "include",
		prepareHeaders: headers => {
			const token = useAppSelector(state => state.auth._token);
			if (token) {
				headers.set("authorization", `Bearer ${token}`);
			}
			return headers;
		},
	}),
	endpoints: builder => ({
		login: builder.mutation<User, { email: string; password: string }>({
			query: body => ({
				url: "/login",
				method: "POST",
				body,
			}),
			transformResponse: (response: Response) => {
				return response.json();
			},
			onQueryStarted: (body, { dispatch, queryFulfilled }) => {
				queryFulfilled.then(result => {
					if (result.data) {
						dispatch(setCredentials(result.data));
					}
				});
			},
		}),
		register: builder.mutation<
			User,
			{
				first_name: string;
				last_name: string;
				username: string;
				email: string;
				password: string;
			}
		>({
			query: body => ({
				url: "/register",
				method: "POST",
				body,
			}),
			transformResponse: (response: Response) => {
				return response.json();
			},
			onQueryStarted: (body, { dispatch, queryFulfilled }) => {
				queryFulfilled.then(result => {
					if (result.data) {
						dispatch(setCredentials(result.data));
					}
				});
			},
		}),
		logout: builder.mutation<User, void>({
			query: () => ({
				url: "/logout",
				method: "GET",
			}),
			transformResponse: (response: Response) => {
				return response.json();
			},
			onQueryStarted: (body, { dispatch, queryFulfilled }) => {
				queryFulfilled.then(result => {
					if (result.data) {
						dispatch(logout());
					}
				});
			},
		}),
	}),
});

export const { useLoginMutation, useRegisterMutation, useLogoutMutation } =
	authApi;
