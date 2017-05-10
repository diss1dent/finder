import {Component, OnInit} from '@angular/core';

import {AuthService} from "../../services/auth-service";
import {Comment} from "../../models/comments-model";
import {CommentsService} from "../../services/comments-service";

@Component({
    selector: 'comments-page',
    templateUrl: 'comments-page-template.html',
})

export class CommentsPageComponent {

    private comments: Comment[] = [];

    constructor(
        private commentsService: CommentsService,
        private auth: AuthService
    ) {}

    ngOnInit() {
        this.comments = this.commentsService.getCommentsByUser(this.auth.getCurrentUser());
    }

}