import axiosInstance from "../axios";

export const fetchPOref = async () => {
  const { data } = await axiosInstance.get('/summary/purchase-orders');
  return data;
};
export const fetchWageref = async () => {
  const { data } = await axiosInstance.get('/summary/wages');
  return data;
};
export const fetchExpRef = async () => {
  const { data } = await axiosInstance.get('/summary/expenses');
  return data;
};

//get graph stats for dashboard
export const DashBoardStats = async () => {
  const { data } = await axiosInstance.get('/dashboard/financials');
  return data;
};
