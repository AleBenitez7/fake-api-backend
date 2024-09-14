import { User } from "src/database/entities/user.entity";
import { Role } from "src/models/roles";


export const USERS_MOCK: User[] = [
  {
    id: 1,
    email: 'john@mail.com',
    password: 'changeme',
    name: 'Jhon',
    role: Role.customer,
    avatar: '',
    lastname: "",
    cellphone: "",
    ci: "",
    addresses: [],
    creationAt: undefined,
    updatedAt: undefined
  },
  {
    id: 2,
    email: 'maria@mail.com',
    password: '12345',
    name: 'Maria',
    role: Role.customer,
    avatar: '',
    lastname: "",
    cellphone: "",
    ci: "",
    addresses: [],
    creationAt: undefined,
    updatedAt: undefined
  },
  {
    id: 3,
    email: 'admin@mail.com',
    password: 'admin123',
    name: 'Admin',
    role: Role.admin,
    avatar: '',
    lastname: "",
    cellphone: "",
    ci: "",
    addresses: [],
    creationAt: undefined,
    updatedAt: undefined
  },
];
