import { Component, input, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

interface Comment {
  id?: string;
  postId: string; // changed from number to string
  userName: string;
  message: string;
  createdAt: string;
  parentId: string | null; // changed from number to string | null
}

@Component({
  selector: 'comments',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './comments.component.html',
  styleUrl: './comments.component.scss'
})
export class CommentsComponent implements OnInit {
  articleId = input<string>(); // changed input to string
  comments = signal<Comment[]>([]);
  newComment: string = '';
  replyTo: string | null = null;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    const postId = this.articleId();
    if (!postId) {
      console.warn('articleId input is missing');
      return;
    }
    this.fetchComments();
  }

  fetchComments(): void {
    const postId = this.articleId();
    if (!postId) return;

    this.http
      .get<Comment[]>(`http://localhost:3000/comments?postId=${postId}`)
      .subscribe(data => {
        this.comments.set(data);
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
      parentId: this.replyTo
    };

    this.http
      .post<Comment>('http://localhost:3000/comments', newEntry)
      .subscribe(() => {
        this.newComment = '';
        this.replyTo = null;
        this.fetchComments();
      });
  }

  setReply(commentId: string): void {
    this.replyTo = commentId;
  }

  cancelReply(): void {
    this.replyTo = null;
  }

  getReplies(parentId: string): Comment[] {
    return this.comments().filter(c => c.parentId === parentId);
  }

  topLevelComments(): Comment[] {
    return this.comments().filter(c => c.parentId == null);
  }
}
