import {Component, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {Store} from "@ngrx/store";
import { FormsModule } from '@angular/forms';

import {CurrentSearch} from "../../models/current-search.model";
import {AllResults, SearchResult} from "../../models/search-result.model";
import {YouTubeService} from "../../services/youtube.service";
import {PagerService} from "../../services/pagination";
import {TwitterService} from "../../services/twitter.service";

@Component({
    selector: 'search-page',
    templateUrl: 'search-page-template.html',
    providers: [TwitterService]
})

export class SearchPageComponent {

    private state: CurrentSearch;
    private searchResults: SearchResult[] = [];
    private availableResults: number = 0;
    private disableSearch = false;
    private errorEmptySearch = true;
    private errorLocation = false;
    private errorLocationMessage = '';

    pager: any = {};
    pagedItems: any[];

    constructor(
        private store: Store<CurrentSearch>,
        private youtube: YouTubeService,
        private pagerService: PagerService,
        private twitter: TwitterService,
    ) {}
    ngOnInit() {

        //subscribe to search input changes
        this.store.select<CurrentSearch>('currentSearch').subscribe((state: CurrentSearch) => {
            this.state = state;

            if (state && state.name && state.name.length > 0) {
                this.disableSearch = false;
                this.errorEmptySearch = false;
                this.youtube.search(state);
                this.twitter.searchcall(state);
            } else {
                this.disableSearch = true;
                this.errorEmptySearch = true;
                this.searchResults = [];
                this.availableResults = 0;
            }
            if (state && state.error) {
                this.errorLocation = true;
                this.errorLocationMessage = state.error;
            } else {
                this.errorLocation = false;
            }
        });

        //subscribe to youtube results
        this.youtube.searchResults.subscribe((results: AllResults) => {
            this.availableResults = results.availableResults;
            this.searchResults.push(...results.searchResults);
            this.setPage(1);
        });

        //subscribe to twitter results
        this.twitter.searchResults.subscribe((results) => {
            this.searchResults.push(...results);
            this.searchResults = this.searchResults.sort(compareRandom);
            this.setPage(1);
        });

        function compareRandom(a:any, b:any) {
            return Math.random() - 0.5;
        }

    }

    setPage(page: number) {
        this.pager = this.pagerService.getPager(this.searchResults.length, page);
        this.pagedItems = this.searchResults.slice(this.pager.startIndex, this.pager.endIndex + 1);
    }

}