import { UserInterface } from '@interfaces/user.interface';

export interface ReviewInterface {
  author: UserInterface;
  text: string;
  rating: number;
}
