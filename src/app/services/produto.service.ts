import { Injectable, EventEmitter } from '@angular/core';
import { Observable, Subject } from "rxjs";
import { take } from 'rxjs/operators';
import { Produto } from 'src/app/models/Produto'
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class ProdutoService {

  private subject = new Subject<any>();

  private readonly chave:string = "PRODUTOS";
  private readonly url = "https://api-salom-doces.herokuapp.com";

  static onProdutosMudaram:EventEmitter<Produto[]> = new EventEmitter();

  constructor(private http:HttpClient) { }

  getProdutos():Observable<Produto[]> {
    let token:string = 'Basic YnJ1bm9zYWJpYUBnbWFpbC5jb206YnJ1bm9zYWJpYTIwMjE=';
    return this.http.get<Produto[]>(this.url + '/produto/consultar', {headers:{Authorization:`${token}`}})
  }

  sendClick(){
      this.subject.next();
  }

  getClick() {
      return this.subject.asObservable();
  }

  addProduto(produto:Produto):Observable<Produto> {
    return this.http.post<Produto>(`${this.url}/produto/cadastrar`, produto);
  }
}
