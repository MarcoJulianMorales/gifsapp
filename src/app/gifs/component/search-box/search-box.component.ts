import { Component, ElementRef, EventEmitter, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { GifsService } from '../../services/gifs.service';
import { Subject, Subscription, debounceTime } from 'rxjs';

@Component({
    selector: 'gifs-search-box',
    template: `
        <h5>Search</h5>
        <input type="text"
        class="form-control"
        placeholder="Search Gifs..."
        (keyup)="emit()"
        #txtTagInput>`
})

export class SearchBoxComponent implements OnInit, OnDestroy {
    private deBouncer: Subject<string> = new Subject<string>();
    private deBouncerSuscription?: Subscription;

    @ViewChild('txtTagInput')
    public tagInput!: ElementRef<HTMLInputElement>;

    @Output()
    public onDebounce: EventEmitter<string> = new EventEmitter<string>();

    constructor(private gifsService: GifsService) {

    }

    ngOnInit(): void {
        this.deBouncerSuscription = this.deBouncer
            .pipe(
                debounceTime(500)
            )
            .subscribe(value => {
                this.searchTag();
            })
    }

    ngOnDestroy(): void {
        this.deBouncerSuscription?.unsubscribe()
    }

    emit(): void {
        this.deBouncer.next(this.tagInput.nativeElement.value);
    }

    searchTag(): void {
        const newTag = this.tagInput.nativeElement.value;
        this.gifsService.searchtag(newTag);
        this.tagInput.nativeElement.value = '';
    }
}