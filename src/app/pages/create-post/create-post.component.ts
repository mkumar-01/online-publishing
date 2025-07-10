import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgxEditorComponent, NgxEditorMenuComponent, Editor } from 'ngx-editor';
import { Store } from '@ngrx/store';
import { Post } from '../../store/models/posts.model';
import * as CreatePostActions from '../../store/actions/createpost.actions';
import { AppState } from '../../store/reducers';

@Component({
  selector: 'create-post',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgxEditorComponent,
    NgxEditorMenuComponent
  ],
  templateUrl: './create-post.component.html',
  styleUrl: './create-post.component.scss'
})
export class CreatePostComponent implements OnInit, OnDestroy {
  html = '';
  editor!: Editor;
  form!: FormGroup;

  constructor(private fb: FormBuilder, private store: Store<AppState>) { }

  ngOnInit(): void {
    this.editor = new Editor();
    this.form = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
      content: ['', Validators.required],
      tags: ['', Validators.required],
      authorName: ['', Validators.required],
      authorPhoto: ['']
    });
  }

  ngOnDestroy(): void {
    this.editor.destroy();
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const { title, content, tags, authorName, authorPhoto } = this.form.value;
    console.log(authorPhoto)
    const newPost: Post = {
      id: Date.now(),
      title: title,
      body: content,
      tags: tags.split(',').map((tag: string) => tag.trim()), // Convert comma-separated string to array
      reactions: { likes: 0, dislikes: 0 },
      views: 0,
      userId: 1,
      image: '',
      authorName: authorName,
      publishedDate: new Date().toISOString()
    };

    const endPoint = 'http://localhost:3000/posts';
    console.log(newPost)
    this.store.dispatch(CreatePostActions.createPost({ endPoint, post: newPost }));
  }

}
