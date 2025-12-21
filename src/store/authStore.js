import { create } from "zustand";
import { useAuthApi } from "../Hooks/useAuth";
import { jwtDecode } from "jwt-decode";

export const useAuthStore = create((set) => {
  const { login, register, forgetPassword, resetPassword, verifyAccount } =
    useAuthApi();
  return {
    loading: false,
    error: null,
    token: null,
    user: localStorage.getItem("access_token")
      ? jwtDecode(localStorage.getItem("access_token"))
      : null,
    LoginUser: async (data, toast, navigate) => {
      try {
        set({ loading: true });
        const response = await login(data);
        const token = response.token;
        localStorage.setItem("access_token", token);
        const decodedUser = jwtDecode(token);
        set({ token: token, user: decodedUser, loading: false });
        toast.success("Login is Success");
        navigate("/dashboard");
      } catch (error) {
        set({ loading: false, error });
        toast.error(error);
      }
    },
    RegisterUser: async (data, toast, navigate) => {
      try {
        set({ loading: true });
        const response = await register(data);
        toast.success(response.data.message);
        set({ loading: false });
        navigate("/verify-account");
      } catch (error) {
        set({ loading: false });

        toast.error(error?.response?.data?.message);
      }
    },
    ForgetUserPassword: async (data, toast, navigate) => {
      try {
        set({ loading: true });

        const response = await forgetPassword(data);

        toast.success(response.message);
        set({ loading: false });

        navigate("/reset-pass");
      } catch (error) {
        set({ loading: false });

        toast.error(error?.response?.data?.message);
      }
    },
    ResetUserPassword: async (data, toast, navigate) => {
      try {
        set({ loading: true });

        const response = await resetPassword(data);
        toast.success(response.message);
        set({ loading: false });

        navigate("/login");
      } catch (error) {
        set({ loading: false });
        toast.error(error?.response?.data?.message);
      }
    },
    VerifyAcc: async (data, toast, navigate) => {
      try {
        set({ loading: true });
        const response = await verifyAccount(data);
        toast.success(response.message);
        set({ loading: false });
        navigate("/login");
      } catch (error) {
        toast.error(error?.response?.data?.message);
      }
    },
    LogoutUser: (navigate) => {
      localStorage.removeItem("access_token");
      set({ user: null });
      navigate("/");
    },
  };
});
