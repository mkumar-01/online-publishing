export interface Post {
    id: number;
    title: string;
    body: string;
    tags: string[];
    reactions: {
        likes: number;
        dislikes: number;
    };
    views: number;
    userId: number;
    image: string;
    authorName: string;
    publishedDate: string;
    comments?: Comment[];
}
export interface Comment {
    id: number;
    postId: number;
    userName: string;
    message: string;
    createdAt: string;
    replies?: Comment[]; // optional nested replies
}


// This matches the API response
export interface PostResponse {
    data: Post[];
    loading: boolean;
    error: any;
}
export interface PostResponse {
    first: number;
    prev: number | null;
    next: number | null;
    last: number;
    pages: number;
    items: number;
    data: Post[];
}
