import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import Point from 'src/app/models/point';
import EarRegion from '@app/models/earRegion';
import BodyPart from '@app/models/bodyPart';

import { PointService } from '@app/services/point.service';
import { EarRegionService } from '@app/services/earRegion.service';
import { BodyPartService } from '@app/services/bodyPart.service';

@Component({
  selector: 'point-view',
  templateUrl: './point-view.component.html',
  styleUrls: ['./point-view.component.css']
})
export class PointViewComponent implements OnInit {
    pointId: string;
    point: Point;
    earRegions: EarRegion[] = [];
    bodyParts: BodyPart[] = [];
    isLoading = true;

    constructor(
        private route: ActivatedRoute,
        private pointService: PointService,
        private earRegionService: EarRegionService,
        private bodyPartService: BodyPartService,
        private location: Location
    ) { 
    }

    ngOnInit(): void {    
        const id: string = this.route.snapshot.paramMap.get('pointId');

        this.pointService.getPoint(id)
            .subscribe((point: Point) => {
            this.point = point;
            this.isLoading = false;
        });

        this.earRegionService.getEarRegions()
            .subscribe((earRegions: EarRegion[]) => this.earRegions = earRegions);

        this.bodyPartService.getBodyParts()
            .subscribe((bodyParts: BodyPart[]) => this.bodyParts = bodyParts);
    }
    
    goBack(): void {
        this.location.back();
    }
}