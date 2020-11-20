import HttpException from './HttpException';

export default class NotFoundException extends HttpException {
  constructor(id: string) {
    super(404, `User with id ${id} not found`);
  }
}
