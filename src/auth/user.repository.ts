import { EntityRepository, Repository } from 'typeorm';
import { User } from './user.entity';
import { AuthCredetentialsDto } from './dto/auth-credetentials.dto';
import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  /**
   *
   * @param authCredentialsDto
   */
  async createUser(authCredentialsDto: AuthCredetentialsDto): Promise<void> {
    const { username, password, firstName, lastName } = authCredentialsDto;

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = this.create({
      username,
      password: hashedPassword,
      firstName,
      lastName,
    });

    try {
      await this.save(user);
    } catch (error) {
      if (error.code === '23505') {
        // duplicate username
        throw new ConflictException('Username already exists');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }
}
