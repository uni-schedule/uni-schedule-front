import {
  AuthApi,
  ClassApi,
  ScheduleApi,
  SubjectsApi,
  TeacherApi,
} from "./client";
import globalAxios from "axios";
import { getTokens } from "../stores/tokenStore.ts";

class Api {
  Auth: AuthApi;
  Schedule: ScheduleApi;
  Teacher: TeacherApi;
  Subject: SubjectsApi;
  Class: ClassApi;

  constructor() {
    this.initAxiosInterceptors();

    this.Auth = new AuthApi();
    this.Schedule = new ScheduleApi();
    this.Teacher = new TeacherApi();
    this.Subject = new SubjectsApi();
    this.Class = new ClassApi();
  }

  initAxiosInterceptors() {
    globalAxios.interceptors.request.use(
      (config) => {
        const accessToken = getTokens().access_token;
        if (accessToken) {
          config.headers["Authorization"] = `Bearer ${accessToken}`;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      },
    );
  }
}

const api = new Api();
export default api;
