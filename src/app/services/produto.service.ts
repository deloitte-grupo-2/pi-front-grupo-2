import { Injectable } from '@angular/core';
import { Subject } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ProdutoService {

  private subject = new Subject<any>();

  constructor() { }

  sendClick(){
      this.subject.next();
  }

  getClick() {
      return this.subject.asObservable();
  }

}
