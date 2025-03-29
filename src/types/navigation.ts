import { NavigatorScreenParams } from '@react-navigation/native';
import { Task } from './task';

export type RootStackParamList = {
  Auth: NavigatorScreenParams<AuthStackParamList>;
  Main: NavigatorScreenParams<DrawerParamList>;
};

export type AuthStackParamList = {
  Login: undefined;
  Register: undefined;
};

export type DrawerParamList = {
  Tasks: undefined;
  Profile: undefined;
};

export type TaskStackParamList = {
  TaskList: undefined;
  TaskDetail: { taskId: string };
  TaskForm: { task?: Task };
}; 