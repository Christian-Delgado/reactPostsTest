import localforage from "localforage";
import { matchSorter } from "match-sorter";
import sortBy from "sort-by";
import axios from "axios";

export async function getPosts(query) {
  
  try {
    const response = await axios.get('https://jsonplaceholder.typicode.com/posts');
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(error);
    return error;
  }
  
}

export async function createPost() {
  axios.post('/https://jsonplaceholder.typicode.com/posts', {
    title: 'Fred',
    body: 'Flintstone'
  })
  .then(function (response) {
    console.log(response.data);
    return response.data;
  })
  .catch(function (error) {
    console.log(error);
    return error;
  });
  
}

export async function getPost(id) {
  try {
    const response = await axios.get('https://jsonplaceholder.typicode.com/posts/'+id);
    console.log(response.data);
    return response.data ?? null;
  } catch (error) {
    console.error(error);
    return error;
  }
  
}

export async function updatePost(id, updates) {
  axios.put('https://jsonplaceholder.typicode.com/posts/'+id, {
    title: 'Fred',
    body: 'Flintstone'
  })
  .then(function (response) {
    console.log(response.data);
    return response.data;
  })
  .catch(function (error) {
    console.log(error);
    return error;
  });
  
}

export async function deletePost(id) {
  axios.delete('https://jsonplaceholder.typicode.com/posts/1')
  .then(function (response) {
    console.log(response.data);
    return true;
  })
  .catch(function (error) {
    console.log(error);
    return false;
  });
  
}
