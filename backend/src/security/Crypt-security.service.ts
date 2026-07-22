import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
@Injectable()
export class CryptSecuirtyService {
  async hash(data: string, salat: number = 10) {
    return await bcrypt.hash(data, salat);
  }

  async compare(data: string, encrypted: string) {
    return await bcrypt.compare(data, encrypted);
  }
}
