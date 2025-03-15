import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
const API_ADD_TASK = 'http://localhost:5000/api/tasks/';
const API_GET_TASKS ='http://localhost:5000/api/tasks/';

export const addNewTask = createAsyncThunk('task/addTask', async (newTask, { rejectWithValue }) => {
    try {
        const token = localStorage.getItem("token");
        const config = {
            headers: { Authorization: `Bearer ${token}` },
          };
         await axios.post(API_ADD_TASK, newTask, config);
    } catch (error) {
        return rejectWithValue(error.response?.data?.message || "Erreur API");
    }
});

export const getTasks = createAsyncThunk('task/getTasks', async(_, {rejectWithValue}) => {
   
    try {
        const token = localStorage.getItem("token");
        const config = {
            headers: { Authorization: `Bearer ${token}` },
          };
       const res =  await axios.get(API_GET_TASKS, config);
       return res.data;
    } catch (error) {
        console.log(error.response?.data?.message);
        return rejectWithValue(error.response?.data?.message || "Erreur API");
    }
});


const taskSlice =  createSlice({ 
    name:'task',
    initialState: {
       tasks:[],
       loading: false,
       error: null
    },
    extraReducers: (builder) =>{
       builder.addCase(addNewTask.pending, (state, { payload }) => {
          state.loading = true;
          state.error = false;
       })
       .addCase(addNewTask.fulfilled,(state, { payload }) => {
          state.loading = false;
          state.error = false;
       })
       .addCase(addNewTask.rejected,(state, { payload }) => {
          state.loading = false;
          state.error = payload;
       })
       .addCase(getTasks.pending, (state, {payload}) => {
          state.loading = false;
          state.error = false;
       })
       .addCase(getTasks.fulfilled, (state, {payload}) => {
          state.loading = false;
          state.tasks = payload;
          state.error = false;
        })
        .addCase(getTasks.rejected, (state, {payload}) => {
          state.loading = false;
          state.error = payload;
          console.log(payload);
          
        })
       ;
    }
});

export default taskSlice.reducer;