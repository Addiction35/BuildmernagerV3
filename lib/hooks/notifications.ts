import axiosInstance from "../axios";

export const fetchNotificationsById = async (id) => {
  const { data } = await axiosInstance.get(`/notifications/user/${id}`);
  return data;
};