import globalAxios from "axios";
import { clearTokens, getTokens, setTokens } from "../stores/tokenStore.ts";
import {
  AuthApi,
  ClassApi,
  ScheduleApi,
  SubjectsApi,
  TeacherApi,
} from "./client";

class Api {
  Auth: AuthApi;
  Schedule: ScheduleApi;
  Teacher: TeacherApi;
  Subject: SubjectsApi;
  Class: ClassApi;

  constructor() {
    const BASE_URL = import.meta.env.VITE_BASE_API_URL;
    const apiArgs = [null, BASE_URL, globalAxios];

    this.initAxiosInterceptors();
    this.Auth = new AuthApi(...apiArgs);
    this.Schedule = new ScheduleApi(...apiArgs);
    this.Teacher = new TeacherApi(...apiArgs);
    this.Subject = new SubjectsApi(...apiArgs);
    this.Class = new ClassApi(...apiArgs);
  }

  initAxiosInterceptors() {
    globalAxios.interceptors.response.use(
      async (response) => response,
      async (error) => {
        const originalRequest = error.config;
        if (error.response.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true;
          try {
            const refreshToken = getTokens().refresh_token;
            if (!refreshToken) {
              throw new Error("No refresh token found");
            }
            const response = await this.Auth.authRefresh({
              refresh_token: refreshToken,
            });
            const {
              access_token: newAccessToken,
              refresh_token: newRefreshToken,
            } = response.data;
            setTokens({
              access_token: newAccessToken,
              refresh_token: newRefreshToken,
            });
            globalAxios.defaults.headers.common["Authorization"] =
              `Bearer ${newAccessToken}`;
            return globalAxios(originalRequest);
          } catch (refreshError) {
            console.error("Token refresh failed:", refreshError);
            clearTokens();
            window.location.href = "/login";
            return Promise.reject(refreshError);
          }
        }
        return Promise.reject(error);
      },
    );

    globalAxios.interceptors.request.use((config) => {
      const accessToken = getTokens().access_token;
      if (accessToken) {
        config.headers["Authorization"] = `Bearer ${accessToken}`;
      }
      return config;
    });
  }
}

const api = new Api();
export default api;
