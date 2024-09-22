import { Component, computed, EventEmitter, input, Input, Output, output } from '@angular/core';
import { User } from '../services/user.service';

 

@Component({
  selector: 'app-user-card',
  standalone: true,
  imports: [],
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.css']
})
export class UserCardComponent {
  @Input({required: true}) user!: User

  @Output() selectedSignal = new EventEmitter<string>()
  //selectedSignal = output<string>()

  /* MAIS RECENTE ABORDAGEM! Mais otimizada por ser gerenciada pelo angular como sinais mais precisos das mudanças, sem precisar checar em todos os componentes da aplicação.

  avatar = input.required<string>() //read only!!!
  name = input.required<string>()
  id = input.required<string>()
  // nesse input pode ser colocado um valor inicial dentro dos parenteses.
    
  imagePath = computed(()=> {return 'assets/users/' + this.avatar})
  */


  get imagePath (){
    return 'assets/users/' + this.user.avatar
  }

  userCardOnClick() {
    this.selectedSignal.emit(this.user.id);
  }

}