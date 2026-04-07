class SignupPage {
    constructor() {
        this.path = '/signup';
    }

    getValidUser() {
        return {
            username: 'testuser',
            email: 'test@example.com',
            password: 'password123'
        };
    }

    getInvalidEmailUser() {
        return {
            username: 'testuser',
            email: 'invalid-email',
            password: 'password123'
        };
    }

    getShortPasswordUser() {
        return {
            username: 'testuser',
            email: 'test@example.com',
            password: '123'
        };
    }

    getInvalidUsernameUser() {
        return {
            username: 'tu@', // Too short or invalid character
            email: 'test@example.com',
            password: 'password123'
        };
    }

    getMissingFieldsUser() {
        return {
            username: '',
            email: '',
            password: ''
        };
    }
}

module.exports = new SignupPage();
