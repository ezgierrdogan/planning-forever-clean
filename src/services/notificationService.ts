import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';
import { Task } from '../types/task';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

export const notificationService = {
  async requestPermissions() {
    const { status } = await Notifications.requestPermissionsAsync();
    return status === 'granted';
  },

  async scheduleTaskNotification(task: Task) {
    if (!task.dueDate) return;

    const dueDate = task.dueDate instanceof Date ? task.dueDate : new Date(task.dueDate);
    const now = new Date();

    if (dueDate < now) return;

    try {

      await this.cancelTaskNotification(task.id);


      await Notifications.scheduleNotificationAsync({
        content: {
          title: 'Görev Hatırlatması',
          body: `"${task.title}" görevi için son tarih geldi!`,
          data: { taskId: task.id },
        },
        trigger: dueDate as any, 
      });
    } catch (error) {
      console.error('Bildirim planlanırken hata oluştu:', error);
    }
  },

  async cancelTaskNotification(taskId: string) {
    try {
      const notifications = await Notifications.getAllScheduledNotificationsAsync();
      const notification = notifications.find(
        n => n.content.data?.taskId === taskId
      );

      if (notification) {
        await Notifications.cancelScheduledNotificationAsync(notification.identifier);
      }
    } catch (error) {
      console.error('Bildirim iptal edilirken hata oluştu:', error);
    }
  },

  async setupInitialNotifications(tasks: Task[]) {
    for (const task of tasks) {
      if (!task.completed && task.dueDate) {
        await this.scheduleTaskNotification(task);
      }
    }
  },
}; 