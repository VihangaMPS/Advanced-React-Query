import "./PostDetail.css";
import {useMutation, useQuery} from "@tanstack/react-query";

async function fetchComments(postId) {
    const response = await fetch(`https://jsonplaceholder.typicode.com/comments?postId=${postId}`);

    return response.json();
}
async function deletePost(postId) {
    const response = await fetch(`https://jsonplaceholder.typicode.com/postId=${postId}`, {method: "DELETE"});

    return response.json();
}
async function updatePost(postId) {
    const response = await fetch(`https://jsonplaceholder.typicode.com/postId=${postId}`, {method: "PATCH", data: { title: "REACT QUERY FOREVER !!!"}});

    return response.json();
}

export function PostDetail({post}) {
    const {data, isLoading, isError, error} = useQuery({
        queryKey: ["comments", post.id],
        queryFn: () => fetchComments(post.id)
    });

    const deleteMutation = useMutation({
        mutationFn: (postId) => deletePost(postId)
    });

    const updateMutation = useMutation({
        mutationFn: (postId) => updatePost(postId)
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

            <button onClick={() => deleteMutation.mutate(post.id)}>Delete</button>
            {deleteMutation.isError && <p style={{color: 'red'}}>Error deleting the post</p>}
            {deleteMutation.isSuccess && <p style={{color: 'blue'}}>Post Deleted</p>}

            <button onClick={() => updateMutation.mutate(post.id)}>Update title</button>
            {updateMutation.isError && <p style={{color: 'red'}}>Error Updating the post</p>}
            {updateMutation.isSuccess && <p style={{color: 'blue'}}>Post Updated</p>}

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
