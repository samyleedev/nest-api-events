import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LoginUserDto } from './dto/login-user.dto';
import { SubscribeUserDto } from './dto/subscribe-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserEntity } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
    private jwtService: JwtService,
  ) {}

  register(userData: SubscribeUserDto): Promise<UserEntity> {
    const newUser = this.userRepository.create(userData);
    return this.userRepository.save(newUser);
  }

  async login(credentials: LoginUserDto) {
    const { email, password } = credentials;
    let isMatch = false;
    const user = await this.userRepository.findOne({ where: { email: email } });
    if (user) {
      isMatch = await bcrypt.compare(password, user.password);
    }
    if (!user || !isMatch) {
      throw new NotFoundException("L'email ou le mot de passe est incorrect");
    } else {
      const payload = {
        username: user.username,
        email: user.email,
        role: user.role,
      };
      const jwt = this.jwtService.sign(payload);
      return {
        access_token: jwt,
      };
    }
  }

  findAll(): Promise<SubscribeUserDto[]> {
    return this.userRepository.find();
  }

  findOne(id: number) {
    return this.userRepository.findOne(id);
  }
  update(id: number, updateUserDto: UpdateUserDto) {
    return this.userRepository.update(id, updateUserDto);
  }

  remove(id: number) {
    return this.userRepository.delete(id);
  }
}
