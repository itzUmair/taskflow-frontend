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

export type ProjectTask = {
  task_id: number;
  title: string;
  description: string;
  status: string;
  date_of_creation: string;
  created_by: string;
  priority: string;
};
