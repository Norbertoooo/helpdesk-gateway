import {UserModel} from './user.model';

export class TicketModel {
  constructor(
    public id: string,
    // tslint:disable-next-line:variable-name
    public number: number,
    public title: string,
    public status: string,
    public priority: string,
    public image: string,
    public user: UserModel,
    public assignedUser: UserModel,
    public date: string,
    public changes: Array<string>
  ) {
  }

  public equals(obj: TicketModel): boolean {
    return this.number === obj.number;
  }

}
