import { TestBed, inject } from '@angular/core/testing';

import { SocialFirebaseService } from './social-firebase.service';

describe('SocialFirebaseService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SocialFirebaseService]
    });
  });

  it('should be created', inject([SocialFirebaseService], (service: SocialFirebaseService) => {
    expect(service).toBeTruthy();
  }));
});
