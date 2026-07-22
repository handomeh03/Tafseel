import { Injectable } from '@nestjs/common';
import { DatabaseService } from './database/database.service';

@Injectable()
export class AppService {
  constructor(private readonly Database: DatabaseService) { }
  async getHello() {
    return "jameelhandomeh";
  }
}
