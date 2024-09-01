import { ProjectHeader, ProjectMember, User } from "@/types";
import axios from "@/lib/axios";

export const getAuthToken = async (email: string, password: string) => {
  try {
    const resp = await axios.post("/auth/signin", {
      email,
      password,
    });
    return resp.data.user;
  } catch (error) {
    return null;
  }
};

export const getUserDataByToken = async (
  token: string
): Promise<User | null> => {
  try {
    const resp = await axios.get(`/users/${token}`);
    return resp.data.user as User;
  } catch (error) {
    return null;
  }
};

export const getUserProjects = async (
  userid: number
): Promise<ProjectHeader[] | null> => {
  try {
    const resp = await axios.get(`/projects/user/${userid}`);
    if (resp.data.projects.length === 0) {
      return null;
    }
    return resp.data.projects;
  } catch (error) {
    return null;
  }
};

export const getProjectMembers = async (
  projectid: number
): Promise<ProjectMember[] | null> => {
  try {
    const resp = await axios.get(`/members/project/${projectid}`);
    return resp.data.members;
  } catch (error) {
    return null;
  }
};
