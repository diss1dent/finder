import {Observable, BehaviorSubject} from 'rxjs/Rx';
import {Injectable} from '@angular/core';
import {Http, Headers} from '@angular/http';
import {AllResults} from '../models/search-result.model';
import {CurrentSearch} from '../models/current-search.model';
import {Store} from "@ngrx/store";
import ACTIONTYPES from "../actions/types";

const VIMEO_API_URL         = '/backend/vimeo.php';
const VIMEO_APP_ID          = '101369';

@Injectable()
export class VimeoService {

    searchResults: BehaviorSubject<AllResults> = new BehaviorSubject<AllResults>({
        availableResults: 0,
        searchResults: []
    });

    constructor(
        private http: Http,
        private store: Store<any>
    ) {}

    search(query: CurrentSearch): Observable<AllResults>  {

        const params = [
            `query=${query.name}`,
            `per_page=100`
        ];

        let headers = new Headers();

        headers.append('Content-Type', 'application/x-www-form-urlencoded');

        this.http.post(VIMEO_API_URL, params.join('&'), {headers: headers})
            .map((response:any) => {
                const mapresults = (response._body && JSON.parse(response._body));
                const allResults = {
                    availableResults: 0,
                    searchResults: mapresults && mapresults.body && mapresults.body.data && mapresults.body.data.map((item:any) => {
                        return {
                            id: item.link.split('https://vimeo.com/')[1],
                            kind: 'vimeo',
                            title: item.name,
                            description: item.description,
                            thumbnailUrl: item.pictures && item.pictures.sizes && item.pictures.sizes["0"] && item.pictures.sizes["0"].link
                        };
                    })
                };
                allResults.searchResults = allResults.searchResults || [];
                console.log('Vimeoresult->', allResults.searchResults);
                return allResults;
            })
            .subscribe((allResults: AllResults) => {
                this.store.dispatch({
                    type: ACTIONTYPES.progressBar,
                    payload: {
                        progressBarStatus: true,
                        progressBarText: 'vimeo results loaded'
                    }
                });
                return this.searchResults.next(allResults);
            });

        return this.searchResults;
    }

    getVideoById(id: string) {
        var headers = new Headers();
        var searchterm = 'video_id=' + id;

        headers.append('Content-Type', 'application/X-www-form-urlencoded');

        return this.http.post('/backend/vimeo.php', searchterm, {headers: headers})
            .map((response) => response.json())
            .subscribe((result) => {
                this.store.dispatch({
                    type: ACTIONTYPES.post,
                    payload: {
                        postLoaded: result,
                        postType: 'vimeo'
                    }
                })
            });
    }

}
