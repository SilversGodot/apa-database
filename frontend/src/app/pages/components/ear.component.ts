import { Component, ElementRef, AfterViewInit } from '@angular/core';

@Component({
  selector: 'ear-svg',
  templateUrl: './ear.component.svg',
  styleUrls: ['./ear.component.css']
})
export class SvgComponent implements AfterViewInit {
    selectedElement = null;
    spot = null;

    constructor(private elementRef:ElementRef) {
    }

    ngAfterViewInit() {
        this.spot = this.elementRef.nativeElement.querySelector('circle');     
        this.spot.addEventListener('mousedown', this.startDrag.bind(this));
        this.spot.addEventListener('mousemove', this.drag.bind(this));
        this.spot.addEventListener('mouseup', this.endDrag.bind(this));
        this.spot.addEventListener('mouseleave', this.endDrag.bind(this));
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
        // let x = this.selectedElement.getAttributeNS(null, "cx");
        // let y = this.selectedElement.getAttributeNS(null, "cy");
        // console.log("CX: " + x + ", CY:" + y);    
        this.selectedElement = null;
    }
}