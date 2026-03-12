import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PagosCreate } from './pagos-create';

describe('PagosCreate', () => {
  let component: PagosCreate;
  let fixture: ComponentFixture<PagosCreate>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PagosCreate]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PagosCreate);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
