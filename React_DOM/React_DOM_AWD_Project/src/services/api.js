import axios from "axios";

const API = axios.create({
  baseURL: "https://dummyjson.com",
});

export const getIssues = async () => {
  const res = await API.get("/todos");
  return res.data.todos;
};


export const getIssueById = async (id) => {
  const res = await API.get(`/todos/${id}`);
  return res.data;
};