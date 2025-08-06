import { TestBed } from '@angular/core/testing';

import { DataService } from './data.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('DataService', () => {
  let service: DataService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    
    service = TestBed.inject(DataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});


// mport { TestBed } from '@angular/core/testing';
// import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
// import {HttpClientModule} from '@angular/common/http';
// import { myService } from './myservice';


// describe('myService', () => {

//       beforeEach(() => TestBed.configureTestingModule({
//         imports: [HttpClientTestingModule], 
//         providers: [myService]
//       }));

//        it('should be created', () => {
//         const service: myService = TestBed.get(myService);
//         expect(service).toBeTruthy();
//        });

//        it('should have getData function', () => {
//         const service: myService = TestBed.get(myService);
//         expect(service.getData).toBeTruthy();
//        });

//     });