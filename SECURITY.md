# Security Policy

## Supported Versions

We release patches for security vulnerabilities for the following versions:

| Version | Supported          |
| ------- | ------------------ |
| 1.x.x   | :white_check_mark: |
| < 1.0   | :x:                |

## Reporting a Vulnerability

**Please do not report security vulnerabilities through public GitHub issues.**

Instead, please report them via email to: **devdollzai@gmail.com**

You should receive a response within 48 hours. If for some reason you do not, please follow up via email to ensure we received your original message.

### What to Include

Please include the following information:

- Type of vulnerability
- Full paths of source file(s) related to the vulnerability
- Location of the affected source code (tag/branch/commit or direct URL)
- Step-by-step instructions to reproduce the issue
- Proof-of-concept or exploit code (if possible)
- Impact of the issue, including how an attacker might exploit it

### What to Expect

1. **Acknowledgment**: Within 48 hours
2. **Initial Assessment**: Within 5 business days
3. **Status Updates**: Every 7 days until resolution
4. **Fix Timeline**: Depends on severity
   - Critical: 7 days
   - High: 30 days
   - Medium: 90 days
   - Low: Best effort

## Security Best Practices

### For Users

1. **Environment Variables**
   - Never commit `.env` files
   - Use `.env.example` as template
   - Rotate API keys regularly

2. **Dependencies**
   - Keep dependencies updated
   - Run `npm audit` regularly
   - Review security advisories

3. **Deployment**
   - Use HTTPS in production
   - Enable security headers
   - Implement rate limiting
   - Use environment-specific configs

### For Contributors

1. **Code Review**
   - No credentials in code
   - Validate all inputs
   - Sanitize user data
   - Use parameterized queries

2. **Authentication**
   - Implement proper session management
   - Use secure password hashing
   - Enable MFA where possible

3. **API Security**
   - Validate API keys
   - Implement rate limiting
   - Use CORS appropriately
   - Log security events

## Known Security Considerations

### Current Implementation

1. **API Keys**
   - Gemini API keys stored in environment variables
   - Keys should be rotated regularly
   - Never expose keys in client-side code

2. **Session Storage**
   - Bootstrap state stored in sessionStorage
   - Data cleared on tab close
   - No sensitive data should be stored

3. **Third-Party Dependencies**
   - Regular audits via `npm audit`
   - Automated dependency updates
   - Security patches prioritized

### Planned Improvements

- [ ] Implement Content Security Policy (CSP)
- [ ] Add Subresource Integrity (SRI) for CDN assets
- [ ] Implement request signing
- [ ] Add rate limiting middleware
- [ ] Implement security event logging
- [ ] Add automated security scanning

## Responsible Disclosure

We kindly ask security researchers to:

1. Allow reasonable time for fixes before public disclosure
2. Make a good faith effort to avoid:
   - Privacy violations
   - Destruction of data
   - Interruption of service
   - Physical security compromise

3. Contact us first for any vulnerabilities

## Recognition

We appreciate the security community's efforts. Valid security reports may be acknowledged in:

- Repository security advisories
- Release notes
- Hall of fame (with permission)

Thank you for helping keep HydraMax9 and its users safe!

## Security Resources

- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [Node.js Security Best Practices](https://nodejs.org/en/docs/guides/security/)
- [React Security Best Practices](https://reactjs.org/docs/dom-elements.html#dangerouslysetinnerhtml)
- [TypeScript Security](https://www.typescriptlang.org/docs/handbook/type-checking-javascript-files.html)

---

**Last Updated**: January 1, 2026
