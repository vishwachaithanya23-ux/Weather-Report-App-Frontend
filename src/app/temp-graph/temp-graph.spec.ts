import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TempGraph } from './temp-graph';

describe('TempGraph', () => {
  let component: TempGraph;
  let fixture: ComponentFixture<TempGraph>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TempGraph]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TempGraph);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
