import API from "@/services/API";
import {Notification, User, Module} from "@/helpers/types"

class NotificationService {

    //TODO: Return / check response codes
    getNotificationsForUser(user : User): Promise<any> {
        return API.get(`notifications/user/${user.user_id}`);
    }

    getNotificationsForModule(module : Module): Promise<any> {
        return API.get(`notifications/module/${module.module_id}`);
    }

    getNotificationsTypes(): Promise<any> {
        return API.get(`notifications/types`);
    }

    markNotificationAsRead(notification: Notification, user : User): Promise<any> {
        return API.put(`notifications/user/${notification.notification_id}/${user.user_id}`, notification);
    }

    addNotification(notification: Notification): Promise<any> {
        return API.post(`notifications`, notification);
    }

    addNotificationToModule(notification: Notification, module : Module): Promise<any> {
        return API.post(`notifications/module`, notification);
    }

    deleteAllNotificationForUser(user : User): Promise<any> {
        return API.delete(`notifications/user/${user.user_id}`);
    }

    deleteNotificationForEveryone(notification: Notification): Promise<any> {
        return API.delete(`notifications/${notification.notification_id}`);
    }

    deleteSingleNotificationForUser(notification : Notification, user : User): Promise<any> {
        return API.delete(`notifications/user/${notification.notification_id}/${user.user_id}`);
    }

    deleteNotificationForModule(notification : Notification, module : Module): Promise<any> {
        return API.delete(`notifications/module/${notification.notification_id}/${module.module_id}`);
    }

}

export default new NotificationService();