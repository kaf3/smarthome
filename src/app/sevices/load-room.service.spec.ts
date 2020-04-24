import {TestBed} from '@angular/core/testing';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {LoadRoomService} from './load-room.service';

describe('LoadRoomService', () => {
  let service: LoadRoomService;
  let httpContoller: HttpTestingController;


  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [LoadRoomService]
    });
    service = TestBed.inject(LoadRoomService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('loadRoom have been called', () => {
    const methodSpy = spyOn(service, 'testMethod');
    methodSpy.and.returnValue('wow');

  });
});
