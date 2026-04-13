import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NgLib } from './ng-lib';

describe('NgLib', () => {
   let component: NgLib;
   let fixture: ComponentFixture<NgLib>;

   beforeEach(async () => {
      await TestBed.configureTestingModule({
         imports: [NgLib],
      }).compileComponents();

      fixture = TestBed.createComponent(NgLib);
      component = fixture.componentInstance;
      fixture.detectChanges();
   });

   it('should create', () => {
      expect(component).toBeTruthy();
   });
});
