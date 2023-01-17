import localforage from "localforage";
import { matchSorter } from "match-sorter";
import sortBy from "sort-by";

export async function getPosts(query) {
  await fakeNetwork(`getPosts:${query}`);
  let posts = await localforage.getItem("posts");
  if (!posts) posts = [];
  if (query) {
    posts = matchSorter(posts, query, { keys: ["first", "last"] });
  }
  return posts.sort(sortBy("last", "createdAt"));
}

export async function createPost() {
  await fakeNetwork();
  let id = Math.random().toString(36).substring(2, 9);
  let post = { id, createdAt: Date.now() };
  let posts = await getPosts();
  posts.unshift(post);
  await set(posts);
  return post;
}

export async function getPost(id) {
  await fakeNetwork(`post:${id}`);
  let posts = await localforage.getItem("posts");
  let post = posts.find(post => post.id === id);
  return post ?? null;
}

export async function updatePost(id, updates) {
  await fakeNetwork();
  let posts = await localforage.getItem("posts");
  let post = posts.find(post => post.id === id);
  if (!post) throw new Error("No post found for", id);
  Object.assign(post, updates);
  await set(posts);
  return post;
}

export async function deletePost(id) {
  let posts = await localforage.getItem("posts");
  let index = posts.findIndex(post => post.id === id);
  if (index > -1) {
    posts.splice(index, 1);
    await set(posts);
    return true;
  }
  return false;
}

function set(posts) {
  return localforage.setItem("posts", posts);
}

// fake a cache so we don't slow down stuff we've already seen
let fakeCache = {};

async function fakeNetwork(key) {
  if (!key) {
    fakeCache = {};
  }

  if (fakeCache[key]) {
    return;
  }

  fakeCache[key] = true;
  return new Promise(res => {
    setTimeout(res, Math.random() * 800);
  });
}