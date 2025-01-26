import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getBaseURL } from "../../../utils/getBaseUrl";

const baseQuery = fetchBaseQuery({
  baseUrl: `${getBaseURL()}/api/orders`,
  credentials: 'include',
  prepareHeaders: (Headers) => {
    const token = localStorage.getItem('token')
    if (token) {
      Headers.set("Authorization", `Bearer ${token}`)
    }
    return Headers
  }
})

const orderApi = createApi({
  reducerPath: "orderApi",
  baseQuery,
  tagTypes: ["Order"],
  endpoints: (builder) => ({
    createOrder: builder.mutation({
      query: (orderData) => ({
        url: "/",
        method: "POST",
        body: orderData,
        header: {
          "Content-type": "application/json",
        },
      }),
    }),
    getAllOrders: builder.query({
      query: (email) => ({
        url: `/email/${email}`,
        // method: "POST",
        // body: email,
        // header: {
        //   "Content-type": "application/json",
        // },
      }),
      providesTags: ["Order"],
    }),
  }),
})

export const {
  useCreateOrderMutation,
  useGetAllOrdersQuery,
} = orderApi

export default orderApi
