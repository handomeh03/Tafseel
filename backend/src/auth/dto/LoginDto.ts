import { Matches, IsString } from 'class-validator';

export class LoginDto {
    @IsString({ message: 'Email must be a string' })
    @Matches(
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        {
            message: 'Please provide a valid email address',
        },
    )
    email: string;

    @IsString({ message: 'Password must be a string' })

    password: string;
}