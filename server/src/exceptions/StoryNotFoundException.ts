import HttpException from './HttpException';

export default class NotFoundException extends HttpException {
  constructor(id: string) {
    super(404, `Story with id ${id} not found`);
  }
}
