class LoginPage {
    constructor() {
        this.path = '/login';
    }

    getValidCredentials() {
        return {
            email: 'test@example.com',
            password: 'password123'
        };
    }

    getInvalidCredentials() {
        return {
            email: 'wrong@example.com',
            password: 'wrongpassword'
        };
    }

    getEmptyCredentials() {
        return {
            email: '',
            password: ''
        };
    }
}

module.exports = new LoginPage();
