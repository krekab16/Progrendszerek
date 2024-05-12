import { Component } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Event } from '../model/event';
import { Inject} from '@angular/core';
import { EventService } from '../services/event.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-event-modal',
  templateUrl: './edit-event-modal.component.html',
  styleUrl: './edit-event-modal.component.css'
})
export class EditEventModalComponent {



  constructor(
    public dialogRef: MatDialogRef<EditEventModalComponent>,  private eventService: EventService,
    @Inject(MAT_DIALOG_DATA) public event: Event,
  ) {}

  onCancelClick(): void {
    this.dialogRef.close();
  }



  onSubmit(){
    this.dialogRef.close(this.event);
  }


  

}





