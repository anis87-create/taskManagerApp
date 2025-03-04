import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const API_REGISTER = `http://localhost:5000/api/users/`;
const API_LOGIN = `http://localhost:5000/api/users/login`;
const API_FETCH_USERS = `http://localhost:5000/api/users`;
const API_CURRENT_USER = `http://localhost:5000/api/users/me`;
const API_UDPATE_USER = `http://localhost:5000/api/users`;


// ✅ Inscription (register)
export const register = createAsyncThunk(
  "user/register",
  async (userData, { rejectWithValue }) => {
    try {
      const res = await axios.post(API_REGISTER, userData);
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Erreur API");
    }
  }
);

// ✅ Connexion (login)
export const login = createAsyncThunk(
  "user/login",
  async (userData, { rejectWithValue }) => {
    try {
      const res = await axios.post(API_LOGIN, userData);
      localStorage.setItem("token", res.data.token);
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Erreur API");
    }
  }
);

// ✅ Récupérer l'utilisateur connecté
export const authMe = createAsyncThunk(
  "user/currentUser",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("Aucun token trouvé");

      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };
      const res = await axios.get(API_CURRENT_USER, config);
      
      return res.data;
    } catch (error) {   
      console.log(error.response?.data?.message);
         
      return rejectWithValue(error.response?.data?.message || "Erreur API");
    }
  }
);

// ✅ Récupérer tous les utilisateurs
export const fetchAllUsers = createAsyncThunk(
  "user/fetchUsers",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("Aucun token trouvé");

      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };
      const res = await axios.get(API_FETCH_USERS, config);

      return res.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Erreur API");
    }
  }
);
export const updateUser = createAsyncThunk('user/updateUser',
  async({user, id}, {rejectWithValue}) => {
    try {
      await axios.put(`${API_UDPATE_USER}/${id}`, user);
    } catch (error) {
      console.log(error);
      
      return rejectWithValue(error.response?.data?.message || "Erreur API");
    }
  }

)

// ✅ Slice Redux
const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
    loading: false,
    token:null,
    isConnected: false,
    errors: null,
    users: [],
  },
  reducers: {
    logout: (state) => {
      localStorage.removeItem("token");
      state.isConnected = false;
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // 🚀 Register
      .addCase(register.pending, (state) => {
        state.loading = true;
        state.errors = null;
      })
      .addCase(register.fulfilled, (state, { payload }) => {
        state.loading = false;
      })
      .addCase(register.rejected, (state, { payload }) => {
        state.loading = false;
        state.errors = payload;
      })

      // 🚀 Login
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.errors = null;
        state.user = null;
        state.isConnected = false;
      })
      .addCase(login.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.isConnected = true;
        state.user = payload.user;
        state.token = payload.token;
      })
      .addCase(login.rejected, (state, { payload }) => {
        state.loading = false;
        state.errors = payload;
        state.isConnected = false;
      })

      // 🚀 Fetch All Users
      .addCase(fetchAllUsers.pending, (state) => {
        state.loading = true;
        state.errors = null;
      })
      .addCase(fetchAllUsers.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.users = payload;
      })
      .addCase(fetchAllUsers.rejected, (state, { payload }) => {
        state.loading = false;
        state.errors = payload;
      })

      // 🚀 Auth Me
      .addCase(authMe.pending, (state) => {
        state.loading = true;
        state.errors = null;
      })
      .addCase(authMe.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.user = payload;
      })
      .addCase(authMe.rejected, (state, { payload }) => {
        console.log(payload);
        state.loading = false;
        state.user = null;
      })
      .addCase(updateUser.pending, (state) => {
        state.loading= false;
        state.errors = null;
      })
      .addCase(updateUser.fulfilled, (state) => {
        state.loading= true;
        state.errors = null;
      })
      .addCase(updateUser.rejected, (state, {payload}) => {
        state.loading= false;
        state.errors = payload;
      })
      
  },
});

export const { logout } = userSlice.actions;

export default userSlice.reducer;
