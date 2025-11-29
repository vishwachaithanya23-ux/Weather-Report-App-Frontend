import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForecastWeather } from './forecast-weather';

describe('ForecastWeather', () => {
  let component: ForecastWeather;
  let fixture: ComponentFixture<ForecastWeather>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ForecastWeather]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ForecastWeather);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
