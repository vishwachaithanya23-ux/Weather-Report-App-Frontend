import { Component, Input, AfterViewInit, OnChanges, SimpleChanges, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as L from 'leaflet';

@Component({
  selector: 'app-map-view',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './map-view.html',
  styleUrls: ['./map-view.css']
})
export class MapViewComponent implements AfterViewInit, OnChanges, OnDestroy {
  @Input() lat!: number;
  @Input() lon!: number;

  private map?: L.Map;
  private marker?: L.Marker;

  ngAfterViewInit(): void {
    // initialize with world view; will re-center if coords available
    this.initMap();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.map && this.lat != null && this.lon != null) {
      this.updateMarker();
    }
  }

  ngOnDestroy(): void {
    this.map?.remove();
  }

  private initMap() {
    if (this.map) return;
    this.map = L.map('mapbox', { zoomControl: false }).setView([20, 78], 4);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors'
    }).addTo(this.map);

    if (this.lat != null && this.lon != null) {
      this.updateMarker();
    }
  }

  private updateMarker() {
    if (!this.map) return;
    if (this.marker) {
      this.marker.setLatLng([this.lat, this.lon]);
    } else {
      this.marker = L.marker([this.lat, this.lon]).addTo(this.map);
    }
    this.map.setView([this.lat, this.lon], 10);
  }
}
