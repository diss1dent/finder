import {Http, Headers} from '@angular/http';
import {Injectable} from '@angular/core';
import {BehaviorSubject} from "rxjs";
import * as moment from 'moment';
import {CurrentSearch} from "../models/current-search.model";
import {Store} from "@ngrx/store";
import ACTIONTYPES from "../actions/types";

const CONSUMER_KEY = '3nnMcXVV5JIGanoGTJtTiSKyb';
const CONSUMER_SECRET = 'WPcdzaXvT6sQxW9JhHTOT0MJXb0gv5WlrN5FgTGRsqD0xIJDQz';
const ENCODE_SECRET = new Buffer(CONSUMER_KEY + ':' + CONSUMER_SECRET).toString('base64');

@Injectable()
export class TwitterService {

	searchquery = '';
	searchResults: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);

	constructor(
		private http: Http,
		private store: Store<any>
	){}

	search(searchquery: CurrentSearch) {
		var headers = new Headers();
		var searchterm = 'query=' + searchquery.name;

		headers.append('Content-Type', 'application/X-www-form-urlencoded');

		return this.http.post('/backend/twitter.php', searchterm, {headers: headers})
			.map((res) => {

				let result;

				if(res.json()) {
					result = res.json().statuses.map((item:any) => {
						return {
							id: item.id_str,
							kind: 'twitter',
							title: item.text,
							description: `${item.user.name} @ ${moment(item.created_at).format("MMM Do YYYY")}`,
							thumbnailUrl: item.entities.media && item.entities.media["0"] && item.entities.media["0"].media_url
						};
					});
				}

				console.log('TWresult->', result);
				return result;
			})
			.subscribe((results) => {
				this.store.dispatch({
					type: ACTIONTYPES.progressBar,
					payload: {
						progressBarStatus: true,
						progressBarText: 'twitter results loaded'
					}
				});
				this.searchResults.next(results);
			})
	}

	getPostById(id: string) {
		var headers = new Headers();
		var searchterm = 'id=' + id;

		headers.append('Content-Type', 'application/X-www-form-urlencoded');

		return this.http.post('/backend/twitter.php', searchterm, {headers: headers})
			.map((response) => response.json())
			.subscribe((result) => {
				this.store.dispatch({
					type: ACTIONTYPES.post,
					payload: {
						postLoaded: result,
						postType: 'twitter'
					}
				})
			});
	}

}
