import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgxEditorComponent, NgxEditorMenuComponent, Editor, toHTML, NgxEditorModule } from 'ngx-editor';
// import { schema } from 'ngx-editor/schema';
import { schema } from 'ngx-editor';
import { DOMParser as ProseMirrorDOMParser } from 'prosemirror-model';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Post } from '../../store/models/posts.model';

@Component({
  selector: 'create-post',
  imports: [NgxEditorComponent, NgxEditorMenuComponent, FormsModule, CommonModule, ReactiveFormsModule],
  templateUrl: './create-post.component.html',
  styleUrl: './create-post.component.scss'
})
export class CreatePostComponent implements OnInit, OnDestroy {
  html = '';
  editor!: Editor;
  form!: FormGroup;
  constructor(private fb: FormBuilder) { }
  ngOnInit(): void {
    this.editor = new Editor();
    this.form = this.fb.group({
      content: [''] // This will bind to the editor
    });
  }

  ngOnDestroy(): void {
    this.editor.destroy();
  }
  onSubmit(): void {
    const htmlContent = this.form.value.content;
    const newPost: Post = {
      id: Date.now(), // or let backend generate it
      title: 'Sample Title',
      body: htmlContent, // saving HTML
      tags: ['angular', 'editor'],
      reactions: { likes: 0, dislikes: 0 },
      views: 0,
      userId: 1, // fake user id
      image: 'assets/images/placeholder.jpg',
      authorName: 'Anonymous',
      publishedDate: new Date().toISOString()
    };
    console.log(newPost)

    // this.http.post<Post>('http://localhost:3000/posts', newPost).subscribe(() => {
    //   console.log('Post created!');
    // });
  }
}
