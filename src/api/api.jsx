import axios from "axios";

const api = axios.create({
    baseURL: "https://jsonplaceholder.typicode.com"
});

//to fetch the data

export const fetchPosts = (page) => {
    return api.get(`/posts?_start=${5 * page}&_limit=5`);
}

export const fetchIndividual = async (id) => {
    try {
        const res = await api.get(`/posts/${id}`);
        return res.status ? res.data : null;
    } catch (error) {
        console.log(error);
    }
};

export const deletePost = async (id) => {
    try {
        console.log("delete post")
        return api.delete(`/posts/${id}`);
    } catch (error) {
        console.log(error);
    }
};

export const fetchUsers = async ({ pageParam }) => {
    try {
      const res = await axios.get(
        `https://api.github.com/users?per_page=10&page=${pageParam}`
      );
      return res.data;
    } catch (error) {
      console.log(error);
    }
  };

