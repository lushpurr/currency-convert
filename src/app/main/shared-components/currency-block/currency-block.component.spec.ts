import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrencyBlockComponent } from './currency-block.component';

describe('CurrencyBlockComponent', () => {
  let component: CurrencyBlockComponent;
  let fixture: ComponentFixture<CurrencyBlockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CurrencyBlockComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CurrencyBlockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
