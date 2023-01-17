import { Form, useLoaderData } from "react-router-dom";
import { getPost } from "../posts";

export async function loader({ params }) {
    console.log(params);
    return getPost(params.postId);
  }

export default function Post() {
    
  const post = useLoaderData();

  return (
    <div id="post">
      <div>
        <img
          key={post.avatar}
          src={post.avatar || "https://img.freepik.com/fotos-premium/postit-amarillo-aislado_469558-6825.jpg?w=2000"}
        />
      </div>

      <div>
        <h1>
          {post.title || post.last ? (
            <>
              {post.title} {post.last}
            </>
          ) : (
            <i>No Name</i>
          )}{" "}
          <Favorite post={post} />
        </h1>

        {post.body && (
          <p>
            <a
              target="_blank"
              href={`https://twitter.com/${post.id}`}
            >
              {post.id}
            </a>
          </p>
        )}

        {post.body && <p>{post.body}</p>}

        <div>
          <Form action="edit">
            <button type="submit">Editar</button>
          </Form>
          <Form
            method="post"
            action="destroy"
            onSubmit={(event) => {
              if (
                !confirm(
                  "Please confirm you want to delete this record."
                )
              ) {
                event.preventDefault();
              }
            }}
          >
            <button type="submit">Borrar</button>
          </Form>
        </div>
      </div>
    </div>
  );
}

function Favorite({ post }) {
  // yes, this is a `let` for later
  let favorite = post.favorite;
  return (
    <Form method="post">
      <button
        name="favorite"
        value={favorite ? "false" : "true"}
        aria-label={
          favorite
            ? "Remove from favorites"
            : "Add to favorites"
        }
      >
        {favorite ? "★" : "☆"}
      </button>
    </Form>
  );
}