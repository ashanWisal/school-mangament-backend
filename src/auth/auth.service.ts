import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './Entities/user.schema';
import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import { LoginDto, SignUpDto } from './Entities/dtos/user.dto';
import * as bcrypt from 'bcryptjs';
import { Student } from 'src/student/Entities/student.schema';
import { Teacher } from 'src/teacher/Entities/teacher.schema';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private jwtService: JwtService,
    @InjectModel(Student.name) private studentModel: Model<Student>,
    @InjectModel(Teacher.name) private teacherModel: Model<Teacher>
  ) {}

  async signUp(signUpDto: SignUpDto): Promise<{ accessToken: string; refreshToken: string }> {
    const { name, email, password, role, className, age, gender, subject } = signUpDto;

    const existingUser = await this.userModel.findOne({ email });
    if (existingUser) {
      throw new ConflictException('Email already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await this.userModel.create({
      name,
      email,
      password: hashedPassword,
      role,
    });

    if (user.role === 'student') {
      await this.studentModel.create({
        user: user._id,
        name: user.name,
        email: user.email,
       className,
        age,
        gender,
      });
    }

    if (user.role === 'teacher') {
      await this.teacherModel.create({
        user: user._id,
        name: user.name,
        email: user.email,
        subject,
      });
    }

    const expiresIn = user.role === 'teacher' ? '6h' : '5h';
    const payload = { id: user._id, role: user.role };

    return this.generateToken(payload, expiresIn);
  }

  async loginUser(loginDto: LoginDto): Promise<{ accessToken: string; refreshToken: string }> {
    const { email, password } = loginDto;
    const user = await this.userModel.findOne({ email });

    if (!user) {
      throw new UnauthorizedException('Invalid email');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid password');
    }

    const expiresIn = user.role === 'teacher' ? '6h' : '5h';
    const payload = { id: user._id, role: user.role };

    const token= this.generateToken(payload, expiresIn);
    return{
      ...token,
      user:{
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      }
    }
  }

  async generateToken(payload: any, expiresIn: string): Promise<{ accessToken: string; refreshToken: string }> {
    const accessToken = this.jwtService.sign(payload, { expiresIn });
    const refreshToken = uuidv4();

    await this.storeRefreshToken(refreshToken, payload.id);

    return { accessToken, refreshToken };
  }

  async storeRefreshToken(token: string, userId: string): Promise<void> {
    const refreshExpiry = new Date();
    refreshExpiry.setDate(refreshExpiry.getDate() + 3); // 3-day refresh token validity

    await this.userModel.findByIdAndUpdate(userId, {
      refreshToken: token,
      refreshTokenExpiry: refreshExpiry,
    });
  }
}
