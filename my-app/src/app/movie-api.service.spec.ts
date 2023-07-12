/*import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { MovieApiService } from './movie-api.service'; 

describe('MovieApiService', () => {
  let service: MovieApiService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
        providers: [MovieApiService],
        imports: [HttpClientTestingModule]
      });
      
    service = TestBed.inject(MovieApiService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should retrieve movie details', () => {
    const mockResponse = {
      results: [
        // Mock data for testing
      ]
    };

    service.getMovieDetails().subscribe(data => {
      expect(data).toEqual(mockResponse);
    });

    const request = httpMock.expectOne(service.url);
    expect(request.request.method).toBe('GET');
    request.flush(mockResponse);
  });
});
*/