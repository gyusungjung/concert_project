import { compare, hash } from 'bcrypt';
import _ from 'lodash';
import { Repository } from 'typeorm';

import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';

import { User } from './entities/user.entity';
import { RegisterDto } from './dto/register.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  async register(registerDto: RegisterDto) {
    const { email, password, passwordConfirm, userName } = registerDto;

    if (password !== passwordConfirm) {
      throw new ConflictException('비밀번호가 일치하지 않습니다.');
    }

    //이메일 중복확인
    const existingUser = await this.findByEmail(email);
    if (existingUser) {
      throw new ConflictException(
        '이미 해당 이메일로 가입된 사용자가 있습니다!',
      );
    }

    //비밀번호 해싱 및 사용자 저장
    const hashedPassword = await hash(password, 10);
    const newUser = this.userRepository.create({
      email,
      password: hashedPassword,
      userName,
      isAdmin: false, // 관리자 여부 기본값: false
      point: 1000000, // 포인트 기본값: 1000000
    });

    await this.userRepository.save(newUser);
    return newUser;
  }

  async login(email: string, password: string) {
    const user = await this.userRepository.findOne({
      where: { email },
      select: ['userId', 'email', 'password'],
    });

    if (!user) {
      throw new UnauthorizedException('이메일을 확인해주세요.');
    }

    const isValidPassword = await compare(password, user.password);
    if (!isValidPassword) {
      throw new UnauthorizedException('비밀번호를 확인해주세요.');
    }

    const payload = { email, userId: user.userId };
    console.log('payload :', payload);
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async findByEmail(email: string) {
    return await this.userRepository.findOneBy({ email });
  }

  async findOne(userId: number): Promise<User | undefined> {
    return this.userRepository.findOneBy({ userId });
  }

  async updateUserPoints(user: any) {
    await this.userRepository.save(user);
  }
}
