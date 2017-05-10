import { NgModule }               from "@angular/core";
import { BrowserModule }          from "@angular/platform-browser";
import { HttpModule }             from '@angular/http';
import { ReactiveFormsModule,
    FormsModule }                 from '@angular/forms';
import { StoreModule }            from "@ngrx/store";
import { StoreDevtoolsModule }    from '@ngrx/store-devtools';

import { AppRoutingModule }       from './app-routing-module';

import { AppComponent }           from "./app-component";
import { LoginPageComponent }     from "./components/login/login-page-component";
import { SearchPageComponent }    from "./components/search/search-page-component";
import { SearchInputComponent }   from "./components/search/search-input-component";
import { LoginFormComponent }     from "./components/login/login-form-component";
import { AsideComponent }         from "./components/aside/aside-component";
import { PostPageComponent }      from "./components/post/post-page-component";
import { BookmarksPageComponent } from "./components/bookmarks/bookmarks-page-component";
import { ProgressBarComponent }   from "./components/progress/progress-bar-component";
import { CommentsComponent }      from "./components/comments/comments-component";
import { CommentsPageComponent }  from "./components/comments/comments-page-component";

import { SearchReducer }          from "./reducers/search.reducer";
import { LoginReducer }           from "./reducers/login.reducer";
import { BookmarkReducer }        from "./reducers/bookmark-reducer";
import { ProgressBarReducer }     from "./reducers/progress-bar-reducer";
import { CommentsReducer }        from "./reducers/comments-reducer";

import { YouTubeService }         from "./services/youtube.service";
import { PagerService }           from "./services/pagination";
import { AuthService }            from "./services/auth-service";
import { VimeoService }           from "./services/vimeo-service";
import { TwitterService }         from "./services/twitter.service";
import { CommentsService }        from "./services/comments-service";

import { SafePipe }               from "./pipes/safe-pipe";

const storeManager = StoreModule.provideStore({
    currentSearch: SearchReducer,
    loginState: LoginReducer,
    bookmarkState: BookmarkReducer,
    progressBarState: ProgressBarReducer,
    commentsState: CommentsReducer
});

@NgModule({
    imports: [
        BrowserModule,
        HttpModule,
        ReactiveFormsModule,
        FormsModule,
        AppRoutingModule,
        StoreModule,
        storeManager,
        StoreDevtoolsModule.instrumentOnlyWithExtension({
            maxAge: 5
        })
    ],
    declarations: [
        AppComponent,
        LoginPageComponent,
        SearchPageComponent,
        SearchInputComponent,
        LoginFormComponent,
        AsideComponent,
        PostPageComponent,
        BookmarksPageComponent,
        ProgressBarComponent,
        CommentsComponent,
        CommentsPageComponent,
        SafePipe
    ],
    providers: [
        YouTubeService,
        PagerService,
        VimeoService,
        TwitterService,
        AuthService,
        CommentsService
    ],
    bootstrap: [
        AppComponent
    ]
})

export default class AppModule { }