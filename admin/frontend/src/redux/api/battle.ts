import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {IBattle, IArgument} from "../../types/types";
import React from "react";

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const {asl_battles_rest_uri: url, nonce} = asl_battles_admin

export const battleApi = createApi({
    reducerPath: 'battleApi',
    baseQuery: fetchBaseQuery({
        baseUrl: `${url}asl-battle/v1/`
    }),
    tagTypes: ['Battle'],
    endpoints: (build) => ({
        fetchBattles: build.query<IBattle[], unknown>({
            query: () => ({
                url: `battles`
            }),
            providesTags: result => ['Battle']
        }),
        fetchBattle: build.query<IBattle, string>({
            query: (id) => ({
                url: `battles/${id}`
            }),
            providesTags: result => ['Battle']
        }),
        deleteBattle: build.mutation<string, React.Key>({
            query: (id: string) => ({
                url: `battles/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Battle']
        }),
        createBattle: build.mutation<IBattle, IBattle>({
            query: (data) => ({
                url: `battles`,
                method: "POST",
                body: data
            }),
            invalidatesTags: ['Battle']
        }),
        updateBattle: build.mutation<IBattle, IBattle>({
            query: (data) => ({
                url: `battles/${data.id}`,
                method: "POST",
                body: data
            }),
            invalidatesTags: ['Battle']
        })
    })
})

export const argumentApi = createApi({
    reducerPath: 'argumentApi',
    baseQuery: fetchBaseQuery({
        baseUrl: `${url}asl-battle/v1/`
    }),
    tagTypes: ['Argument'],
    endpoints: (build) => ({
        fetchArguments: build.query<IArgument[], unknown>({
            query: (id: string) => ({
                url: `battles/${id}/arguments/`
            }),
            providesTags: result => ['Argument']
        }),
        addArgument: build.mutation<IArgument, IArgument>({
            query: (data) => ({
                url: `battles/${data.id_item}/arguments/`,
                method: "POST",
                body: data
            }),
            invalidatesTags: ['Argument']
        }),
        fetchArgument: build.query<any, any>({
            query: ({id, argumentId}) => ({
                url: `battles/${id}/arguments/${argumentId}`
            }),
            providesTags: result => ['Argument']
        }),
        editArgument: build.mutation<IArgument, any>({
            query: (data) => ({
                url: `/battles/${data.id_item}/arguments/${data.id}`,
                method: "POST",
                body: data
            }),
            invalidatesTags: ['Argument']
        }),
        deleteArgument: build.mutation({
            query: ({id_item, id}) => ({
                url: `/battles/${id_item}/arguments/${id}`,
                method: "DELETE"
            }),
            invalidatesTags: ['Argument']
        })
    })
})

export const commentApi = createApi({
    reducerPath: 'commentApi',
    baseQuery: fetchBaseQuery({
        baseUrl: `${url}asl-battle/v1/`
    }),
    tagTypes: ['Comment'],
    endpoints: (build) => ({
        getComments: build.query({
            query: (id: string) => ({
                url: `battles/${id}/comments`
            }),
            providesTags: result => ['Comment']
        }),
        getComment: build.query({
            query: ({id, commentId}) => ({
                url: `battles/${id}/comments/${commentId}`
            }),
            providesTags: result => ['Comment']
        }),
        addComment: build.mutation({
            query: (data) => ({
                url: `battles/${data.id_item}/comments`,
                method: "POST",
                body: data
            }),
            invalidatesTags: ['Comment']
        }),
        editComment: build.mutation({
            query: (data) => ({
                url: `/battles/${data.item_id}/comments/${data.id}`,
                method: "PUT",
                body: data
            }),
            invalidatesTags: ['Comment']
        }),
        deleteComment: build.mutation({
            query: ({item_id, id}) => ({
                url: `/battles/${item_id}/comments/${id}`,
                method: "DELETE"
            }),
            invalidatesTags: ['Comment']
        })
    })
})

export const {
    useFetchBattlesQuery,
    useFetchBattleQuery,
    useDeleteBattleMutation,
    useCreateBattleMutation,
    useUpdateBattleMutation,
} = battleApi

export const {
    useFetchArgumentsQuery,
    useAddArgumentMutation,
    useFetchArgumentQuery,
    useEditArgumentMutation,
    useDeleteArgumentMutation
} = argumentApi

export const {
    useAddCommentMutation,
    useDeleteCommentMutation,
    useEditCommentMutation,
    useGetCommentQuery,
    useGetCommentsQuery
} = commentApi
