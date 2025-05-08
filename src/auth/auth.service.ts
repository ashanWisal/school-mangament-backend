import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './Entities/user.schema';
import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import { LoginDto, SignUpDto } from './Entities/dtos/user.dto';
import * as bcrypt from 'bcryptjs';
import { Student } from 'src/student/Entities/student.schema';
import { Teacher } from 'src/teacher/Entities/teacher.schema';

@Injectable()
export class AuthService {
    constructor(@InjectModel(User.name) private userModel: Model<User>,
        private jwtService: JwtService,
        @InjectModel(Student.name) private studentModel: Model<Student>,
        @InjectModel(Teacher.name) private teacherModel: Model<Teacher>) { }

    async signUp(signUpDto: SignUpDto): Promise<{ token: string }> {
        const { name, email, password, role, class: className, age, gender, subject } = signUpDto

        const existingUser = await this.userModel.findOne({ email });
        if (existingUser) {
            throw new ConflictException('Email already exists');
        }

        const hashedPassword = await bcrypt.hash(password, 10)

        const user = await this.userModel.create({
            name,
            email,
            password: hashedPassword,
            role
        })

        if (user.role === 'student') {
            const student = new this.studentModel({
                user: user._id,
                name: user.name,
                email: user.email,
                class: className,
                age,
                gender
            })
            await student.save()
        }

        if (user.role === 'teacher') {
            const teacher = new this.teacherModel({
                user: user._id,
                name: user.name,
                email: user.email,
                subject
            })
            await teacher.save()
        }
        const token = this.jwtService.sign({ id: user._id })
        return { token }
    }
    

    async loginUser(logingDto: LoginDto): Promise<{ token: string }> {
        const { email, password } = logingDto
        const user = await this.userModel.findOne({ email })

        if (!user) {
            throw new UnauthorizedException("invalid email")
        }

        const isPassword = await bcrypt.compare(password, user.password)

        if (!isPassword) {
            throw new UnauthorizedException("invalid password")
        }


        const token = this.jwtService.sign({ id: user._id })
        return { token }
    }
}
