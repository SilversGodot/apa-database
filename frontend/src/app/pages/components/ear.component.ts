import { Component, ElementRef, AfterViewInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'ear-svg',
  templateUrl: './ear.component.svg',
  styleUrls: ['./ear.component.css']
})
export class SvgComponent implements AfterViewInit {
    @Input() coord = {"x": 1, "y": 1};
    @Input() action: string;
    @Output() coordChanged: EventEmitter<object> = new EventEmitter();
    selectedElement = null;
    spot = null;

    constructor(private elementRef:ElementRef) {
    }

    ngAfterViewInit() {
        this.spot = this.elementRef.nativeElement.querySelector('circle');
        this.spot.setAttributeNS(null, "cx", this.coord.x);
        this.spot.setAttributeNS(null, "cy", this.coord.y);

        if(this.action != 'View')
        {
            this.spot.addEventListener('mousedown', this.startDrag.bind(this));
            this.spot.addEventListener('mousemove', this.drag.bind(this));
            this.spot.addEventListener('mouseup', this.endDrag.bind(this));
            this.spot.addEventListener('mouseleave', this.endDrag.bind(this));
        }
    }

    startDrag(event: any) {
        this.selectedElement = event.target;
    }

    drag(event: any) {
        if (this.selectedElement) {
            event.preventDefault();
            var CTM = this.spot.getScreenCTM();
            var dragX = (event.clientX - CTM.e) / CTM.a;
            var dragY = (event.clientY - CTM.f) / CTM.d;
            this.selectedElement.setAttributeNS(null, "cx", dragX);
            this.selectedElement.setAttributeNS(null, "cy", dragY);
        }
    }

    endDrag(event: any) {      
        this.selectedElement = null;
        let x = this.spot.getAttributeNS(null, "cx");
        let y = this.spot.getAttributeNS(null, "cy");
        this.coordChanged.emit({ "x": x, "y": y });
    }
}