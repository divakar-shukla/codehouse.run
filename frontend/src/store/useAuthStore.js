import { create } from "zustand";
import authService from "../lib/authService";
import toast from "react-hot-toast";

export const useAuthStore = create(
    (set) => ({
      authUser: null,
      isRegistering: false,
      isLoging: false,
      isGetingProfile: false,

      getProfile: async () => {
        try {
          set({ isGetingProfile: true });
          const res = await authService.profile();
          console.log(res);
          set({ authUser: res.data });
          toast.success(res.message);
        } catch (error) {
          console.log("Something went wrong in fetch profile", error);
          toast.error(error.response ? error.response.data.message : error.message);
          set({ authUser: null });
        } finally {
          set({ isGetingProfile: false });
        }
      },

      login: async (data) => {
        try {
          set({ isLoging: true });
          const res = await authService.login(data);
          console.log(res);
          set({ authUser: res.data });
          toast.success(res.message);
          return res.data;
        } catch (error) {
          console.log("Error while login", error);
          toast.error(error.response ? error.response.data.message : error.message);
          set({ authUser: null });
          return null;
        } finally {
          set({ isLoging: false });
        }
      },

      Register: async (data) => {
        try {
          set({ isRegistering: true });
          const res = await authService.register(data);
          console.log(res);
          set({ authUser: res.data });
          toast.success(res.message);
        } catch (error) {
          console.error("Error while signing up", error);
          toast.error(error.response ? error.response.data.message : error.message);
          set({ authUser: null });
        } finally {
          set({ isRegistering: false });
        }
      },

      LogOut: async () => {
        try {
          const res = await authService.logOut();
          console.log(res);
          set({ authUser: null });
          toast.success(res.message);
        } catch (error) {
          console.log("Error in logout processing", error);
          toast.error(error.response ? error.response.data.message : error.message);
        }
      },
    })
);
