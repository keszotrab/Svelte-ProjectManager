import { BehaviorSubject, Observable } from 'rxjs';

export type ISOString = string;
export type Notification = {
  id: string,
  title: string,
  message: string,
  date: ISOString,
  priority: 'low' | 'medium' | 'high',
  read: boolean,
};

class NotificationService {
  private notifications$ = new BehaviorSubject<Notification[]>([]);
  private unreadCount$ = new BehaviorSubject<number>(0);
  private storageKey = 'notifications';
  private highPriorityNotification$ = new BehaviorSubject<Notification | null>(null);

  constructor() {
    this.loadNotifications();
  }

  send(notification: Notification) {
    const currentNotifications = this.notifications$.value;
    const updatedNotifications = [notification, ...currentNotifications];
    this.notifications$.next(updatedNotifications);
    this.updateUnreadCount(updatedNotifications);
    this.saveNotifications(updatedNotifications);

    if (notification.priority === 'high' && !notification.read) {
        this.highPriorityNotification$.next(notification);  // Emit high priority notification
      }
  
  }

  list(): Observable<Notification[]> {
    return this.notifications$.asObservable();
  }

  unreadCount(): Observable<number> {
    return this.unreadCount$.asObservable();
  }

  markAsRead(id: string) {
    const updatedNotifications = this.notifications$.value.map(notification =>
      notification.id === id ? { ...notification, read: true } : notification
    );
    this.notifications$.next(updatedNotifications);
    this.updateUnreadCount(updatedNotifications);
    this.saveNotifications(updatedNotifications);
  }

  private loadNotifications() {
    if (typeof window === 'undefined') return; // Prevent SSR issues

    const savedNotifications = localStorage.getItem(this.storageKey);
    if (savedNotifications) {
      const notifications = JSON.parse(savedNotifications) as Notification[];
      this.notifications$.next(notifications);
      this.updateUnreadCount(notifications);
    }
  }

  private saveNotifications(notifications: Notification[]) {
    if (typeof window === 'undefined') return; // Prevent SSR issues

    localStorage.setItem(this.storageKey, JSON.stringify(notifications));
  }

  private updateUnreadCount(notifications: Notification[]) {
    const unreadCount = notifications.filter(n => !n.read).length;
    this.unreadCount$.next(unreadCount);
  }

  getHighPriorityNotification(): Observable<Notification | null> {
    return this.highPriorityNotification$.asObservable();
  }



}




export const notificationService = new NotificationService();
