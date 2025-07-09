import { Component, input, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

interface Comment {
  id?: number;
  postId: number;
  userName: string;
  message: string;
  createdAt: string;
  parentId?: number | null;
}

@Component({
  selector: 'comments',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './comments.component.html',
  styleUrl: './comments.component.scss'
})
export class CommentsComponent implements OnInit {
  articleId = input<number>(); // now required input
  comments: Comment[] = [];
  newComment: string = '';
  replyTo: number | null = null;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.fetchComments();
  }

  fetchComments(): void {
    const postId = this.articleId();
    if (!postId) return;

    this.http.get<Comment[]>(`http://localhost:3000/comments?postId=${postId}`).subscribe(data => {
      this.comments = data;
    });
  }

  postComment(): void {
    const postId = this.articleId();
    if (!postId || !this.newComment.trim()) return;

    const newEntry: Comment = {
      postId: postId,
      userName: 'Anonymous',
      message: this.newComment.trim(),
      createdAt: new Date().toISOString(),
      parentId: this.replyTo ?? null
    };

    this.http.post<Comment>('http://localhost:3000/comments', newEntry).subscribe(() => {
      this.newComment = '';
      this.replyTo = null;
      this.fetchComments();
    });
  }

  setReply(commentId: number): void {
    this.replyTo = commentId;
  }

  cancelReply(): void {
    this.replyTo = null;
  }

  getReplies(parentId: number): Comment[] {
    return this.comments.filter(c => c.parentId === parentId);
  }

  topLevelComments(): Comment[] {
    return this.comments.filter(c => c.parentId == null);
  }
}
