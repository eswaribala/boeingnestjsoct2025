export declare class User {
    userId: number;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    contactNumber: number;
}
export declare class CreateUserInput {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    contactNumber: number;
}
export declare class UpdateUserInput {
    userId: number;
    email: string;
    password: string;
    contactNumber: number;
}
