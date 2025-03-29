import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { TaskState, Task } from '../../types/task';
import { taskService } from '../../services/taskService';

const initialState: TaskState = {
  tasks: [],
  loading: false,
  error: null,
  selectedTask: null,
};

export const fetchTasks = createAsyncThunk(
  'tasks/fetchTasks',
  async (userId: string) => {
    return await taskService.getTasks(userId);
  }
);

export const fetchTask = createAsyncThunk(
  'tasks/fetchTask',
  async (taskId: string) => {
    return await taskService.getTask(taskId);
  }
);

export const createTask = createAsyncThunk(
  'tasks/createTask',
  async (task: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>) => {
    return await taskService.createTask(task);
  }
);

export const updateTask = createAsyncThunk(
  'tasks/updateTask',
  async ({ taskId, updates }: { taskId: string; updates: Partial<Task> }) => {
    await taskService.updateTask(taskId, updates);
    return { taskId, updates };
  }
);

export const deleteTask = createAsyncThunk(
  'tasks/deleteTask',
  async (taskId: string) => {
    await taskService.deleteTask(taskId);
    return taskId;
  }
);

const taskSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    setSelectedTask: (state, action) => {
      state.selectedTask = action.payload;
    },
    clearSelectedTask: (state) => {
      state.selectedTask = null;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Tasks
      .addCase(fetchTasks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.loading = false;
        state.tasks = action.payload;
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Görevler yüklenirken bir hata oluştu';
      })
      // Fetch Single Task
      .addCase(fetchTask.fulfilled, (state, action) => {
        state.selectedTask = action.payload;
      })
      // Create Task
      .addCase(createTask.fulfilled, (state, action) => {
        state.tasks.push(action.payload);
      })
      // Update Task
      .addCase(updateTask.fulfilled, (state, action) => {
        const { taskId, updates } = action.payload;
        const taskIndex = state.tasks.findIndex(task => task.id === taskId);
        if (taskIndex !== -1) {
          state.tasks[taskIndex] = { ...state.tasks[taskIndex], ...updates };
        }
        if (state.selectedTask?.id === taskId) {
          state.selectedTask = { ...state.selectedTask, ...updates };
        }
      })
      // Delete Task
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.tasks = state.tasks.filter(task => task.id !== action.payload);
        if (state.selectedTask?.id === action.payload) {
          state.selectedTask = null;
        }
      });
  },
});

export const { setSelectedTask, clearSelectedTask, clearError } = taskSlice.actions;
export default taskSlice.reducer; 