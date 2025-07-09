export interface Authors {
    id: number;
    name: string;
    body: string;
    postId: number;
    photo: string;
}

// This matches the API response
// export interface AuthorsResponse {
//     data: Authors[];
//     loading: boolean;
//     error: any;
// }
// export interface AuthorsResponse {
//     first: number;
//     prev: number | null;
//     next: number | null;
//     last: number;
//     pages: number;
//     items: number;
//     data: Authors[];
// }
