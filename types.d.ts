export type User = {
  user_id: number;
  username: string;
  fname: string;
  lname: string;
  email: string;
};

export type ProjectHeader = {
  project_id: number;
  project_name: string;
};

export type ProjectMember = {
  user_id: number;
  fname: string;
  username: string;
  role: string;
};
