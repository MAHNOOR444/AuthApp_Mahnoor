const { expect } = require('chai');
const path = require('path');
const { validateEmail, validatePassword, validateUsername } = require(path.resolve(__dirname, '../../src/utils/validation'));

describe('Unit Tests: Validation Utilities', () => {
    
    describe('Email Validation', () => {
        it('should return true for valid email', () => {
            expect(validateEmail('test@example.com')).to.be.true;
        });

        it('should return false for invalid email (no @)', () => {
            expect(validateEmail('testexample.com')).to.be.false;
        });

        it('should return false for invalid email (no domain)', () => {
            expect(validateEmail('test@')).to.be.false;
        });

        it('should return false for empty email', () => {
            expect(validateEmail('')).to.be.false;
        });
    });

    describe('Password Validation', () => {
        it('should return true for password >= 8 characters', () => {
            expect(validatePassword('12345678')).to.be.true;
        });

        it('should return false for password < 8 characters', () => {
            expect(validatePassword('1234567')).to.be.false;
        });

        it('should return false for empty password', () => {
            expect(validatePassword('')).to.be.false;
        });
    });

    describe('Username Validation', () => {
        it('should return true for alphanumeric username >= 3 characters', () => {
            expect(validateUsername('alice123')).to.be.true;
        });

        it('should return false for username < 3 characters', () => {
            expect(validateUsername('al')).to.be.false;
        });

        it('should return false for username with special characters', () => {
            expect(validateUsername('alice!')).to.be.false;
        });

        it('should return false for empty username', () => {
            expect(validateUsername('')).to.be.false;
        });
    });
});
