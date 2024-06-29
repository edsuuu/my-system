import { isEmail } from 'validator';
import { ErrorType } from '../interfaces/validacao';

export class Validation {
    public errors: ErrorType[];

    constructor() {
        this.errors = [];
    }

    public getErrors(): ErrorType[] {
        return this.errors;
    }

    public clearErrors(): void {
        this.errors = [];
    }
}

export class IsEmpty extends Validation {
    public bodyIsEmpty(name: string, email: string, message: string, assunto: string): boolean {
        if (name.trim() === '') {
            this.errors.push({ message: 'O campo nome não pode ficar vazio' });
        }
        if (email.trim() === '') {
            this.errors.push({ message: 'O campo email não pode ficar vazio' });
        }
        if (assunto.trim() === '') {
            this.errors.push({ message: 'O campo email não pode ficar vazio' });
        }
        if (message.trim() === '') {
            this.errors.push({ message: 'O campo mensagem não pode ficar vazio' });
        }

        return this.errors.length === 0;
    }
}

export class ValidationEmail {
    public emailIsValid(email: string): boolean {
        return isEmail(email);
    }
}
