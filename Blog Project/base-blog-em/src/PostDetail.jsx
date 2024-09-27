import "./PostDetail.css";
import {useQuery} from "@tanstack/react-query";

async function fetchComments(postId) {
    const response = await fetch(`https://jsonplaceholder.typicode.com/comments?postId=${postId}`);

    return response.json();
}

export function PostDetail({post}) {
    const {data, isLoading, isError, error} = useQuery({
        queryKey: ["comments", post.id],
        queryFn: fetchComments(post.id)
    });
    if (isLoading) return <h3>Loading ...</h3>;
    if (isError) return (
        <>
            <h3>Oops, Something went wrong ...</h3>
            <p>{error.toString()}</p>
        </>
    );

    return (
        <>
            <h3 style={{color: "blue"}}>{post.title}</h3>
            <button>Delete</button>
            <button>Update title</button>
            <p>{post.body}</p>
            <h4>Comments</h4>
            {data.map((comment) => (
                <li key={comment.id}>
                    {comment.email}: {comment.body}
                </li>
            ))}
        </>
    );
}
