import { TestBed } from '@angular/core/testing';

import { SupabaseServices } from './supabase-services';

describe('SupabaseServices', () => {
  let service: SupabaseServices;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SupabaseServices);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
