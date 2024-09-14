import { User } from "src/database/entities/user.entity";
import { Role } from "src/models/roles";


export const USER_MOCK: User = {
  email: 'rivera.armando997@gmail.com',
  name: 'Armando',
  password: '1234',
  id: 3,
  role: Role.customer,
  avatar: '',
  lastname: "",
  cellphone: "",
  ci: "",
  addresses: [],
  creationAt: undefined,
  updatedAt: undefined
};
