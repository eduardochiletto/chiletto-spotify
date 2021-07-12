global.TIMEOUT = 10000;
global.BASE_URL = process.env.SPOTIFY_API;
global.EXPIRED_TOKEN = process.env.SPOTIFY_EXPIRED_TOKEN;

console.log('==========================');
console.log('==========================');
console.log('==========================');
console.log('==========================');
console.log(process.env.SPOTIFY_EXPIRED_TOKEN);
console.log(EXPIRED_TOKEN);
console.log('==========================');
console.log('==========================');
console.log('==========================');


global.USER = {

  exist: {
    email: 'eduardochiletto@gmail.com',
    password: '123456'
},


  notExist: {
    email: 'noexists@myspotify.com',
    password: '123456'
},

}

