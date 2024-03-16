import User from '../models/User';

const users: User[] = [
  new User(1, 'John'),
  new User(2, 'ibu'),
  new User(3, 'nibu'),
]; 

const getAllUsers = () => {
  return users;
}

export default {
  getAllUsers
};