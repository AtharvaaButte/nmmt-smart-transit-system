import crypto from 'crypto';

export function geratePasswrod(lenghth = 8) {
    let password='';
    const alphabet =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZ' +
    'abcdefghijklmnopqrstuvwxyz';

    const number = '0123456789' ;
    const symbol = '!@#$%^&*';

    const bytes = crypto.randomBytes(lenghth)

    
    for (let i = 0; i < bytes.length; i++) {
        password += charset[bytes[i] % charset.length]
    }
    console.log(password);
    
    return password;
}

geratePasswrod()