import { Injectable, inject } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { IGroup } from '../interfaces/igroup';
import { firstValueFrom } from 'rxjs';


type CreateGroup = {title: string, description: string; participants: string[]; }


@Injectable({
  providedIn: 'root'
})
export class GroupsService {

  private baseUrl: string = `${environment.apiUrl}/groups`;
  private httpClient = inject(HttpClient)

  createHeaders(){
    return{
      headers: new HttpHeaders({
        'Authorization': localStorage.getItem('token_group')!
      })
    }
  }

  getAll(): Promise<IGroup[]> {
  const httpOptions = {
    headers: new HttpHeaders({
      'Authorization': localStorage.getItem('token_group')!
    })
  }

      return firstValueFrom(
        this.httpClient.get<IGroup[]>(this.baseUrl, httpOptions)
      )
    }

  getById(id: string): Promise<IGroup> {
      return firstValueFrom(this.httpClient.get<IGroup>(`${this.baseUrl}/${id}`))
  }

  delete(id: string): Promise<IGroup> {
    return firstValueFrom(this.httpClient.delete<IGroup>(`${this.baseUrl}/${id}`))
  }

 /*  update(formGroup: IGroup): Promise<IGroup> {
    return firstValueFrom(this.httpClient.put<IGroup>(`${this.baseUrl}/${id}`, FormGroup))
  } */

  insert(formGroup: IGroup): Promise<IGroup> {
    return firstValueFrom(this.httpClient.post<IGroup>(this.baseUrl, formGroup))
  }

  /**
   * Crea un nuevo grupo.
   * 
   * @param {CreateGroup} newGroup - El cuerpo de la solicitud que contiene los datos del nuevo grupo.
   * @returns {Promise<Igroup>} - Una promesa que se resuelve con los datos del grupo creado.
   */
  create(newGroup: CreateGroup): Promise<IGroup> {
    return firstValueFrom(
      this.httpClient.post<IGroup>(`${this.baseUrl}/`, newGroup, this.createHeaders())
    );
  }




}