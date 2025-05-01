export class UserEntity {
  id: string;
  email: string;
  name: string;
  password?: string;
  role: string;
  createdAt: Date;
  updatedAt: Date;
}
