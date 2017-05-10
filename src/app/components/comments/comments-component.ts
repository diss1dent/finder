import {Component, OnInit} from '@angular/core';
import {Store} from "@ngrx/store";

import {AuthService} from "../../services/auth-service";
import {Comment} from "../../models/comments-model";
import ACTIONTYPES from "../../actions/types";
import {CommentsService} from "../../services/comments-service";

@Component({
    selector: 'comments',
    templateUrl: 'comments-template.html',
})

export class CommentsComponent {

    private subscription;
    private subscription2;
    private comments: Comment[] = [];
    private post = {
        id: '',
        kind: ''
    };
    currentComment:string = '';

    constructor(
        private store: Store<any>,
        private commentsService: CommentsService,
        private auth: AuthService
    ) {}

    ngOnInit() {
        this.subscription = this.store
            .select('currentSearch')
            .subscribe((state: any) => {
                if (state && state.post && (state.postType == 'youtube')) {
                    this.post.id = state.post.items[0].id;
                } else if (state && state.post && (state.postType == 'twitter')) {
                    this.post.id = state.post.id_str;
                } else if (state && state.post && (state.postType == 'vimeo')) {
                    this.post.id = state.post.body && state.post.body.link && state.post.body.link.split('https://vimeo.com/')[1];
                }
                state && state.post && (this.post.kind = state.postType);
                this.comments = this.commentsService.getCommentsByPost(this.post.id, this.post.kind);
            });
        this.subscription2 = this.store
            .select('commentsState')
            .subscribe((state: any) => {
                if (state && state.commentsAdd) {
                    const comment:Comment = {
                        postID: this.post.id,
                        postType: this.post.kind,
                        login: this.auth.getCurrentUser(),
                        time: new Date().getTime(),
                        text: this.currentComment
                    }
                    this.comments.push(comment);
                    this.commentsService.addComment(comment);
                }
            });
    }

    ngOnDestroy(){
        this.subscription.unsubscribe();
        this.subscription2.unsubscribe();
    }

    addNewComment() {
        (this.currentComment !== '') && this.store.dispatch({
            type: ACTIONTYPES.commentsAdd,
            payload: {
                commentsAdd : true
            }
        });
        this.currentComment = '';
    }

}