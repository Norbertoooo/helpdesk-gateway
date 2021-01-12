import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {TicketModel} from '../model/ticket.model';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TicketService {

  urlTicketApi = environment.urlApi.concat('/ticket');

  urlSummaryApi = this.urlTicketApi.concat('/summary');

  constructor(private http: HttpClient) {
  }

  createOrUpdate(ticket: TicketModel): Observable<any> {
    if (ticket.id != null && ticket.id !== '') {
      return this.http.put(this.urlTicketApi, ticket);
    } else {
      ticket.id = null;
      ticket.status = 'New';
      return this.http.post(this.urlTicketApi, ticket);
    }
  }

  findAll(page: number, count: number): Observable<any> {
    return this.http.get(this.urlTicketApi.concat('/' + page + '/' + count));
  }

  findById(id: string): Observable<any> {
    return this.http.get(this.urlTicketApi.concat('/' + id));
  }

  delete(id: string): Observable<any> {
    return this.http.delete(this.urlTicketApi.concat('/' + id));
  }

  findByParams(page: number, count: number, assignedToMe: boolean, t: TicketModel): Observable<any> {
    t.number = t.number == null ? 0 : t.number;
    t.title = t.title === '' ? 'uninformed' : t.title;
    t.status = t.status === '' ? 'uninformed' : t.status;
    t.priority = t.priority === '' ? 'uninformed' : t.priority;
    return this.http.get(this.urlTicketApi
      .concat('/' + page + '/' + count + '/' + t.number + '/' + t.status + '/' + t.priority + '/' + assignedToMe));
  }

  changeStatus(status: string, ticket: TicketModel): Observable<any> {
    return this.http.put(this.urlTicketApi.concat('/' + ticket.id + '/' + status), ticket);
  }

  summary(): Observable<any> {
    return this.http.get(this.urlSummaryApi);
  }

}
