import { redirect } from "react-router-dom";
import { deletePost } from "../posts";

export async function action({ params }) {
  //throw new Error("oh dang!");
  await deletePost(params.postId);
  return redirect("/");
}