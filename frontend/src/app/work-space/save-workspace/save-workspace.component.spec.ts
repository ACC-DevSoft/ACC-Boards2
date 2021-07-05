import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SaveWorkspaceComponent } from './save-workspace.component';

describe('SaveWorkspaceComponent', () => {
  let component: SaveWorkspaceComponent;
  let fixture: ComponentFixture<SaveWorkspaceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SaveWorkspaceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SaveWorkspaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
