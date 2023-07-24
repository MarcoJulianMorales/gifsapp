import { Component, ElementRef, ViewChild } from '@angular/core';
import { GifsService } from '../../services/gifs.service';

@Component({
    selector: 'gifs-search-box',
    template: `
        <h5>Search</h5>
        <input type="text"
        class="form-control"
        placeholder="Search Gifs..."
        (keyup.enter)="searchTag()"
        #txtTagInput>`
})

export class SearchBoxComponent {

    @ViewChild('txtTagInput') 
    public tagInput!: ElementRef<HTMLInputElement>;

    constructor(private gifsService: GifsService){

    }

    searchTag(): void {
        const newTag = this.tagInput.nativeElement.value;
        this.gifsService.searchtag(newTag);
        this.tagInput.nativeElement.value = '';
        console.log('tag: ', newTag)
    }
}