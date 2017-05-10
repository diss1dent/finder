import { Injectable } from '@angular/core';
import * as _ from 'lodash';

import {Comment} from "../models/comments-model";

@Injectable()
export class CommentsService {

    private comments:Comment[] = [
        {
            postID: '24689579',
            postType: 'vimeo',
            login: 'test',
            time: 1494363391312,
            text: 'this is just a test comment'
        }
    ];

    constructor () {
        !localStorage.getItem('comments') && localStorage.setItem('comments', JSON.stringify(this.comments));
    }

    private getAllComments():Comment[] {
        return JSON.parse(localStorage.getItem('comments'));
    }

    getCommentsByPost(id, kind):Comment[] {

        const comments = this.getAllComments();

        return _.filter(comments, (comment:Comment) => {
            return (comment.postID == id) && (comment.postType == kind)
        });

    }

    getCommentsByUser(login):Comment[] {

        const comments = this.getAllComments();

        return _.filter(comments, (comment:Comment) => {
            return (comment.login == login)
        });

    }

    addComment(comment:Comment):void {

        const comments = this.getAllComments();
        comments.push(comment);
        localStorage.setItem('comments', JSON.stringify(comments));

    }


}