import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './entities/user.entity';
import { Model } from 'mongoose';
import { CreateUserDto } from './dtos/create-user.dto';
import * as bcrypt from 'bcrypt';
import { ResponseUserDto } from './dtos/reponse-user.dto';
import { LoginDto } from './dtos/login.dto';
@Injectable()
export class JwtUserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {

  }
    async create(dto: CreateUserDto) : Promise<ResponseUserDto> {
    const exists = await this.userModel.findOne({ email: dto.email }).lean();
    if (exists) throw new ConflictException('Email already registered');
    const passwordHash = await bcrypt.hash(dto.passwordHash, 12);
    const user = await this.userModel.create({
      email: dto.email,
      passwordHash,
      name: dto.name,
      roles: ['USER'],
    });
    const responseUserDto=new ResponseUserDto();
    responseUserDto._id=user._id.toString();
    responseUserDto.email=user.email;
    responseUserDto.roles=user.roles;
    responseUserDto.name=user.name;
    return responseUserDto;
  }
    async findByEmail(email: string) : Promise<ResponseUserDto> {
    const u = await this.userModel.findOne({ email }).lean();
    if (!u) throw new NotFoundException('User not found');
    const responseUserDto = new ResponseUserDto();
    responseUserDto._id = u._id.toString();
    responseUserDto.email = u.email;
    responseUserDto.roles = u.roles;
    responseUserDto.name = u.name;
    return responseUserDto;
  }

  async validateUser(loginDto: any) : Promise<ResponseUserDto | null> {
    console.log('Validating user:', loginDto);
    const u = await this.userModel.findOne({ email: loginDto.email });
    console.log('Validating user:', loginDto.email);
    if (!u) return null;
    const ok = await bcrypt.compare(loginDto.password, u.passwordHash);
    console.log('Password match:', ok);
    if (!ok) return null;
    const responseUserDto = new ResponseUserDto();
    responseUserDto._id = u._id.toString();
    responseUserDto.email = u.email;
    responseUserDto.roles = u.roles;
    responseUserDto.name = u.name;
    return responseUserDto;
  }

}
