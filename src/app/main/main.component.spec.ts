import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MainComponent } from './main.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { DataService } from '../services/data/data.service';
import { of, throwError } from 'rxjs';

describe('MainComponent', () => {
  let component: MainComponent;
  let fixture: ComponentFixture<MainComponent>;
  let dataService: jasmine.SpyObj<DataService>;

  beforeEach(async () => {
    const dataServiceMock = jasmine.createSpyObj('DataService', ['fetchCurrencyData', 'calculateCurrencyValue']);

    await TestBed.configureTestingModule({
      imports: [MainComponent, HttpClientTestingModule],
      providers: [{ provide: DataService, useValue: dataServiceMock }]
    }).compileComponents();

    fixture = TestBed.createComponent(MainComponent);
    component = fixture.componentInstance;
    dataService = TestBed.inject(DataService) as jasmine.SpyObj<DataService>;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call fetchCurrencyData on init', () => {
    const fetchSpy = spyOn(component, 'fetchCurrencyData');
    component.ngOnInit();
    expect(fetchSpy).toHaveBeenCalled();
  });

  it('should populate currencyData and call initialiseValues & selectDefaultCurrencies', () => {
    const mockResponse = {
      response: [
        { name: 'Pound Sterling', short_code: 'GBP' },
        { name: 'Euro', short_code: 'EUR' }
      ]
    };
    dataService.fetchCurrencyData.and.returnValue(of(mockResponse));
    const initSpy = spyOn(component, 'initialiseValues');
    const selectSpy = spyOn(component, 'selectDefaultCurrencies');

    component.fetchCurrencyData();

    expect(component.currencyData).toEqual(mockResponse.response);
    expect(initSpy).toHaveBeenCalled();
    expect(selectSpy).toHaveBeenCalled();
  });

  it('should handle error in fetchCurrencyData', () => {
    dataService.fetchCurrencyData.and.returnValue(throwError(() => new Error('Failed')));
    component.fetchCurrencyData();
    expect(component.isLoadingDropdown).toBeFalse();
  });

  it('should set toValue from getRate', () => {
    const mockRate = { value: 123.45 };
    dataService.calculateCurrencyValue.and.returnValue(of(mockRate));

    component.getRate('GBP', 'EUR', 1, 'from');

    expect(component.toValue).toBe(123.45);
  });
});
