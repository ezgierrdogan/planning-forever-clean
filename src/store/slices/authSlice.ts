import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { AuthState, LoginCredentials, RegisterCredentials, User } from '../../types/auth';
import { authService } from '../../services/authService';
import { auth, db } from '../../config/firebase';
import { doc, updateDoc } from 'firebase/firestore';

const initialState: AuthState = {
  user: null,
  loading: false,
  error: null
};

export const login = createAsyncThunk(
  'auth/login',
  async (credentials: LoginCredentials) => {
    return await authService.login(credentials);
  }
);

export const register = createAsyncThunk(
  'auth/register',
  async (credentials: RegisterCredentials) => {
    return await authService.register(credentials);
  }
);

export const logout = createAsyncThunk(
  'auth/logout',
  async () => {
    await authService.logout();
  }
);

export const updateProfile = createAsyncThunk(
  'auth/updateProfile',
  async ({ userId, updates }: { userId: string; updates: Partial<User> }) => {
    try {
      const userRef = doc(db, 'users', userId);
      await updateDoc(userRef, updates);
      return updates;
    } catch (error) {
      throw new Error('Profil güncellenirken bir hata oluştu');
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
    clearUser: (state) => {
      state.user = null;
    }
  },
  extraReducers: (builder) => {
    builder
      // Login
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Giriş başarısız oldu';
      })
      // Register
      .addCase(register.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Kayıt başarısız oldu';
      })
      // Logout
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
      })
      // Update Profile
      .addCase(updateProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.loading = false;
        if (state.user) {
          state.user = { ...state.user, ...action.payload };
        }
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Bir hata oluştu';
      });
  }
});

export const { clearError, setUser, clearUser } = authSlice.actions;
export default authSlice.reducer; 