import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { getBaseURL } from "../../../utils/getBaseUrl"

const baseQuery = fetchBaseQuery({
  baseUrl: `${getBaseURL()}/api/books`,
  credentials: 'include',
  prepareHeaders: (Headers) => {
    const token = localStorage.getItem('token')
    if (token) {
      Headers.set("Authentication", `Bearer ${token}`)
    }
    return Headers
  }
})

const bookApi = createApi({
  reducerPath: "bookApi",
  baseQuery,
  tagTypes: ["Books"],
  endpoints: (builder) => ({
    fetchAll: builder.query({
      query: () => "/",
      providesTags: ["Books"],
    }),
    fetchBookById: builder.query({
      query: (id) => `/${id}`,
      providesTags: (results, error, id) => [{type: "Books", id}]
    }),
    addBook: builder.mutation({
      query: (newBook) => ({
        url: '/',
        method: "POST",
        body: newBook,
        headers: {
          "Content-Type": "application/json",
        },
      }),
      invalidatesTags: ["Books"]
    }),
    updateBook: builder.mutation({
      query: ({id, ...updatedBook}) => ({
        url: `/${id}`,
        method: "PUT",
        body: updatedBook,
        headers: {
          "Content-Type": "application/json",
        },
      }),
      invalidatesTags: ["Books"]
    }),
    deleteBook: builder.mutation({
      query: (id) => ({
        url: `/${id}`,
        method: "DELETE",
        headers: {
          "Content-type": "application/json",
        },
      }),
      invalidatesTags: ["Books"],
    }),
  }),
})

export const {
  useFetchAllQuery, 
  useFetchBookByIdQuery, 
  useAddBookMutation, 
  useUpdateBookMutation, 
  useDeleteBookMutation
} = bookApi

export default bookApi
