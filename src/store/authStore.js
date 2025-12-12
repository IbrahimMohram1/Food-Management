import { create } from "zustand";
import { useAuthApi } from "../Hooks/useAuth";

export const useAuthStore = create((set) => {
  const { login, register, forgetPassword, resetPassword, verifyAccount } =
    useAuthApi();
  return {
    loading: false,
    error: null,
    token: null,
    LoginUser: async (data, toast, navigate) => {
      try {
        const response = await login(data);
        const token = response.token;
        localStorage.setItem("access_token", token);
        toast.success("Login is Success");
        navigate("/dashboard");
      } catch (error) {
        toast.error(error);
      }
    },
    RegisterUser: async (data, toast, navigate) => {
      try {
        const response = await register(data);
        toast.success(response.data.message);
        navigate("/verify-account");
      } catch (error) {
        toast.error(error?.response?.data?.message);
      }
    },
    ForgetUserPassword: async (data, toast, navigate) => {
      try {
        const response = await forgetPassword(data);

        toast.success(response.message);
        navigate("/reset-pass");
      } catch (error) {
        toast.error(error?.response?.data?.message);
      }
    },
    ResetUserPassword: async (data, toast, navigate) => {
      try {
        const response = await resetPassword(data);
        toast.success(response.message);
        navigate("/login");
      } catch (error) {
        toast.error(error?.response?.data?.message);
      }
    },
    VerifyAcc: async (data, toast, navigate) => {
      try {
        const response = await verifyAccount(data);
        toast.success(response.message);
        navigate("/login");
      } catch (error) {
        toast.error(error?.response?.data?.message);
      }
    },
    LogoutUser: () => {
      set({ token: null });
    },
  };
});
