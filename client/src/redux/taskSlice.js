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
        return rejectWithValue(error.response?.data?.errors || "Erreur API");
    }
});

export const getTasks = createAsyncThunk('task/getTasks', async(_, {rejectWithValue}) => { 
    try {
        const token = localStorage.getItem("token");
        const config = {
            headers: { Authorization: `Bearer ${token}` },
          };
       await new Promise((resolve) => setTimeout(resolve, 2000)); // 5-second delay   
       const res =  await axios.get(API_GET_TASKS, config);
       return res.data;
    } catch (error) {
        return rejectWithValue(error.response?.data?.errors || "Erreur API");
    }
});

export const findOneTask = createAsyncThunk('task/findTask', async(id, {rejectWithValue}) => {
   try {
      const API_GET_TASK = `http://localhost:5000/api/tasks/${id}`;
      const token = localStorage.getItem('token');
      const config = {
         headers: { Authorization: `Bearer ${token}` },
       };
      const res = await axios.get(API_GET_TASK, config);
      return res.data;
   } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Erreur API");
   }
});

export const updateTask = createAsyncThunk('task/updateTask', async({id, task}, {rejectWithValue}) => {   
   try {
      const API_UPDATE_TASK = `http://localhost:5000/api/tasks/${id}`;
      const token = localStorage.getItem('token');
      const config = {
         headers: { Authorization: `Bearer ${token}` },
       };

      await axios.put(API_UPDATE_TASK,task, config);
   } catch (error) {            
      return rejectWithValue(error.response?.data?.errors || "Erreur API");
   }
});

export const deleteTask = createAsyncThunk('task/deleteTask', async({id}, {rejectWithValue}) => {
   try {
      const API_DELETE_TASK = `http://localhost:5000/api/tasks/${id}`;
      const token = localStorage.getItem('token');
      const config = {
         headers: { Authorization: `Bearer ${token}` },
       };
      await axios.delete(API_DELETE_TASK, config);
   } catch (error) {
      return rejectWithValue(error.response?.data?.errors || "Erreur API");
   }
});

const taskSlice =  createSlice({ 
    name:'task',
    initialState: {
       tasks:[],
       loading: false,
       errors: [],
       task: null
    },
    reducers:{
      tasksAdded: (state, action) => {
         state.tasks.push(action.payload);
      }
    },
    extraReducers: (builder) =>{
       builder.addCase(addNewTask.pending, (state, { payload }) => {
          state.loading = true;
          state.errors = [];
       })
       .addCase(addNewTask.fulfilled,(state, { payload }) => {
          state.loading = false;
          state.errors = [];
       })
       .addCase(addNewTask.rejected,(state, { payload }) => {
          state.loading = false;
          state.errors = Array.isArray(payload) ? payload : [payload];  
       })
       .addCase(getTasks.pending, (state, {payload}) => {
          state.tasks = [];
          state.loading = true;
       })
       .addCase(getTasks.fulfilled, (state, {payload}) => {
          state.loading = false;
          state.tasks = payload;
        })
        .addCase(getTasks.rejected, (state, {payload}) => {
          state.loading = false;
        })
        .addCase(findOneTask.pending, (state, {payload}) => {
          state.errors = []; 
        })
        .addCase(findOneTask.fulfilled, (state, {payload}) => {
          state.task = payload
          state.errors = []; 
        })
        .addCase(findOneTask.rejected,(state, {payload}) => {
          state.task =null;
          state.errors = Array.isArray(payload) ? payload : [payload]; 
        })
        .addCase(updateTask.pending, (state,{payload}) => {         
          state.loading = false;
          state.errors = [];
        })
        .addCase(updateTask.fulfilled, (state,{payload}) => {
         state.loading = true;
         state.errors = [];
       })
       .addCase(updateTask.rejected, (state,{payload}) => {         
         state.loading = false;
         state.errors = Array.isArray(payload) ? payload : [payload]; 
       })
       .addCase(deleteTask.pending, (state,{payload}) => {         
         state.loading = false;
         state.errors = [];
       })
       .addCase(deleteTask.fulfilled, (state,{payload}) => {
        state.loading = true;
        state.errors = [];
      })
      .addCase(deleteTask.rejected, (state,{payload}) => {         
        state.loading = false;
        state.errors = Array.isArray(payload) ? payload : [payload]; 
      })
       
       ;
    }
});
export const {tasksAdded} = taskSlice.actions;
export default taskSlice.reducer;