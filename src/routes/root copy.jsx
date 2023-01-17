import { 
    Outlet,
    NavLink,
    Link,
    useLoaderData,
    Form,
    redirect,
    useNavigation,
} from "react-router-dom";
import { getPosts, createPost } from "../posts";

export async function action() {
    const post = await createPost();
    return redirect(`/posts/${post.id}/edit`);
  }

export async function loader() {
    const posts = await getPosts();
    return { posts };
  }
export default function Root() {
    const { posts } = useLoaderData();
    const navigation = useNavigation();

    return (
      <>
        <div id="sidebar">
          <h1>React Router Posts</h1>
          <div>
            <form id="search-form" role="search">
              <input
                id="q"
                aria-label="Search posts"
                placeholder="Search"
                type="search"
                name="q"
              />
              <div
                id="search-spinner"
                aria-hidden
                hidden={true}
              />
              <div
                className="sr-only"
                aria-live="polite"
              ></div>
            </form>
            <Form method="post">
              <button type="submit">New</button>
            </Form>
          </div>
          <nav>
            {posts.length ? (
                <ul>
                {posts.map((post) => (
                    <li key={post.id}>
                        <NavLink
                        to={`posts/${post.id}`}
                        className={({ isActive, isPending }) =>
                        isActive
                            ? "active"
                            : isPending
                            ? "pending"
                            : ""
                        }
                        >
                            <Link to={`posts/${post.id}`}>
                                {post.title || post.last ? (
                                <>
                                    {post.title} {post.last}
                                </>
                                ) : (
                                <i>No Name</i>
                                )}{" "}
                                {post.favorite && <span>★</span>}
                            </Link>
                        </NavLink>
                    </li>
                ))}
                </ul>
            ) : (
                <p>
                <i>No posts</i>
                </p>
            )}
          </nav>
        </div>
        <div 
            id="detail"
            className={
                navigation.state === "loading" ? "loading" : ""
            }
        >
            <Outlet />
        </div>
      </>
    );
  }