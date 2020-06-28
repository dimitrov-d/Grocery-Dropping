/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { SavedService } from './saved.service';

describe('Service: Saved', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SavedService]
    });
  });

  it('should ...', inject([SavedService], (service: SavedService) => {
    expect(service).toBeTruthy();
  }));
});
