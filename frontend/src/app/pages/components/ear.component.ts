import { Component, ElementRef, AfterViewInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'ear-svg',
  templateUrl: './ear.component.svg',
  styleUrls: ['./ear.component.css']
})
export class SvgComponent implements AfterViewInit {
    @Input() pointList = [{name: "", type: "ViewPoint", coord: { "x": 1, "y": 1, "z": 0 }}];
    @Output() coordChanged: EventEmitter<object> = new EventEmitter();
    selectedElement = null;
    spot = null;
    constructor(private elementRef:ElementRef) {
    }

    ngAfterViewInit() {
        this.pointList.forEach((pointData) => {
            this.createPoint(pointData.name, pointData.type, pointData.coord);
        });
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

        //// Notify parent component the new x and y coordination
        this.coordChanged.emit({ "x": x, "y": y });
    }

    createPoint(pointName: string, pointType: string, coord: any) {
        const svg = this.elementRef.nativeElement.querySelector('svg');

        let title = document.createElement("title");
        title.textContent = pointName;

        let point = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        point.setAttribute("cx", coord.x);
        point.setAttribute("cy", coord.y);

        if(pointType == "TreamtPoint") {
            point.setAttribute("r", "0.3");
            point.setAttribute("fill", "red");
        } else {
            point.innerHTML = '<animate attributetype="XML" attributename="fill" values="#007bff;#f00;#007bff;#007bff" dur="0.8s" repeatcount="indefinite" />';
            point.setAttribute("r", "0.5");
            point.setAttribute("stroke", "red");
            point.setAttribute("stroke-width", "0.2");
            point.setAttribute("fill", "#007bff");
            point.appendChild(title);

            if(pointType == "EditPoint") {
                point.setAttribute("style", "cursor: move;");
                point.addEventListener('mousedown', this.startDrag.bind(this));
                point.addEventListener('mousemove', this.drag.bind(this));
                point.addEventListener('mouseup', this.endDrag.bind(this));
                point.addEventListener('mouseleave', this.endDrag.bind(this));
            }

            this.spot = point;
        }

        svg.appendChild(point);
    }
}