import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gif, SearchResponse } from '../interface/gifs.interfaces';

@Injectable({providedIn: 'root'})
export class GifsService {
    public gifsList: Gif[] = [];

    private apikey = 'ZQfcrIp3HB5c7UlEG8u8aWQ32ksWtr6p';
    private giphyUrl = 'https://api.giphy.com/v1/gifs';
    private _tagsHistory: string [] = [];

    constructor(private http: HttpClient) { 
        this.getHistoryFromLocalStorage();
    }
    
    get tagsHistory(){
        return [...this._tagsHistory];
    }

    private organizehistory(tag: string): void{
        tag = tag.toLocaleLowerCase();

        if(this._tagsHistory.includes(tag)){
            this._tagsHistory = this._tagsHistory.filter( (oldTag) => oldTag != tag);
        }
        
        this._tagsHistory.unshift(tag);
        this._tagsHistory = this._tagsHistory.splice(0,10);

        this.saveHistoryToLocalStorage();
    }

    private saveHistoryToLocalStorage(): void{
        localStorage.setItem('history', JSON.stringify(this._tagsHistory));
    }

    private getHistoryFromLocalStorage(): void{
        if(!localStorage.getItem('history')) return;
        
        this._tagsHistory = JSON.parse(localStorage.getItem('history')!);

        if(this.tagsHistory.length > 0)
            this.searchtag(this.tagsHistory[0]);
    }

    public  searchtag(tag: string):void {
        if(tag.length === 0) return;

        this.organizehistory(tag);

        const params = new HttpParams()
        .set('api_key', this.apikey)
        .set('limit', 10)
        .set('q', tag);
        
        this.http.get<SearchResponse>(`${this.giphyUrl}/search`, { params })
        .subscribe(resp => {
            this.gifsList = resp.data;
        });
    }
}