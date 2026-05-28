import api from '../../services/api';

//GET MY NOTIFICATIPONS
export const getMyNotifications = () => {
    return api.get("/notifications/my");
};

//MARK AS READ
export const markNotificationAsRead = (id) => {
    return api.put('/notifications/${id}/read');
};