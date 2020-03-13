import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { IRoom } from '../../models/iroom';
import { IEquipsDB } from '../../models/iequipsdb';


@Injectable({
  providedIn: 'root'
})
export class LoadRoomService {

  constructor(private http: HttpClient) { }

  testMethod(str: string): string {
      return str;
  }

  loadRoom() : Observable<IRoom[]> {
    return this.http.get(`assets/db.json`).pipe(
        
        map(rooms =>
            Object.entries(rooms).map(
                ([roomName, equipsdb]: [string, IEquipsDB], index) =>
                    <IRoom>{
                        id : index,
                        roomName: roomName,
                        equipsdb: equipsdb,
                    },
            ),
        ),
    );
}
}
