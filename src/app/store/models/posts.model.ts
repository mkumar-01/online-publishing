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
}

// This matches the API response
export interface PostResponse {
    data: Post[];
    loading: boolean;
    error: any;
}
