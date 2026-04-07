const request = require('supertest');
const { expect } = require('chai');
const app = require('../../src/app');
const signupPage = require('../pages/SignupPage');
const loginPage = require('../pages/LoginPage');

describe('Integration Tests: Authentication Flow', () => {

    describe('Signup Scenarios', () => {
        it('should successfully sign up with valid credentials', (done) => {
            const user = signupPage.getValidUser();
            request(app)
                .post('/signup')
                .send(user)
                .expect(302)
                .expect('Location', '/login')
                .end(done);
        });

        it('should fail sign up with invalid email', (done) => {
            const user = signupPage.getInvalidEmailUser();
            request(app)
                .post('/signup')
                .send(user)
                .expect(200)
                .end((err, res) => {
                    expect(res.text).to.contain('Please provide a valid email');
                    done();
                });
        });

        it('should fail sign up with short password', (done) => {
            const user = signupPage.getShortPasswordUser();
            request(app)
                .post('/signup')
                .send(user)
                .expect(200)
                .end((err, res) => {
                    expect(res.text).to.contain('Password must be at least 8 characters long');
                    done();
                });
        });

        it('should fail sign up with invalid username', (done) => {
            const user = signupPage.getInvalidUsernameUser();
            request(app)
                .post('/signup')
                .send(user)
                .expect(200)
                .end((err, res) => {
                    expect(res.text).to.contain('Username must be alphanumeric and at least 3 characters long');
                    done();
                });
        });

        it('should fail sign up with missing fields', (done) => {
            const user = signupPage.getMissingFieldsUser();
            request(app)
                .post('/signup')
                .send(user)
                .expect(200)
                .end((err, res) => {
                    expect(res.text).to.contain('Please provide all fields');
                    done();
                });
        });

        it('should not allow duplicate sign up with same email', (done) => {
            const user = signupPage.getValidUser();
            // First signup (already done in first test, but for clarity)
            request(app)
                .post('/signup')
                .send(user)
                .expect(302)
                .end(() => {
                    // Try to sign up again with same email
                    request(app)
                        .post('/signup')
                        .send(user)
                        .expect(200)
                        .end((err, res) => {
                            expect(res.text).to.contain('User already exists');
                            done();
                        });
                });
        });
    });

    describe('Login Scenarios', () => {
        it('should successfully login with valid credentials', (done) => {
            const user = signupPage.getValidUser();
            const credentials = { email: user.email, password: user.password };

            request(app)
                .post('/login')
                .send(credentials)
                .expect(200)
                .end((err, res) => {
                    expect(res.text).to.contain('Dashboard');
                    expect(res.text).to.contain(user.username);
                    done();
                });
        });

        it('should fail login with wrong password', (done) => {
            const user = signupPage.getValidUser();
            const credentials = { email: user.email, password: 'wrongpassword' };

            request(app)
                .post('/login')
                .send(credentials)
                .expect(200)
                .end((err, res) => {
                    expect(res.text).to.contain('Invalid email or password');
                    done();
                });
        });

        it('should fail login with non-existent user', (done) => {
            const credentials = { email: 'nonexistent@example.com', password: 'password123' };

            request(app)
                .post('/login')
                .send(credentials)
                .expect(200)
                .end((err, res) => {
                    expect(res.text).to.contain('Invalid email or password');
                    done();
                });
        });

        it('should fail login with missing fields', (done) => {
            const credentials = { email: '', password: '' };

            request(app)
                .post('/login')
                .send(credentials)
                .expect(200)
                .end((err, res) => {
                    expect(res.text).to.contain('Please provide email and password');
                    done();
                });
        });
    });
});
