export interface Task {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  dueDate?: Date;
  category?: string;
  location?: {
    latitude: number;
    longitude: number;
    address?: string;
  };
  userId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface TaskState {
  tasks: Task[];
  loading: boolean;
  error: string | null;
  selectedTask: Task | null;
}

export type TaskCategory = 'İş' | 'Kişisel' | 'Öğrenme' | 'Diğer'; 