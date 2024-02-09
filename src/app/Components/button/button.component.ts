import { Component, Input} from '@angular/core';
import { SharedServiceService } from '../../services/shared/shared-service.service';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent {
  @Input() display= '';
  @Input() userName = '';
  constructor(private sharedService: SharedServiceService){ }

  onClick(){
    // Passing the click event to other components
    this.sharedService.emitClick(this.userName);
  }
}
