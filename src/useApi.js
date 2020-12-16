export default () => ({
    //fake sign in
    signin:(email, password) => {
        return new Promise((resolve, reject) => {
            setTimeout(() =>{
                let json = {
                    error:'',
                    token:'123'
                };
                resolve(json);
            }, 1000)
        });
    },

    //fake sign up
    signup:(name, email, password) => {
        return new Promise((resolve, reject) => {
            setTimeout(() =>{
                let json = {
                    error:''
                };
                if (email == 'error@myride.com') {
                    json.error = "E-mail already registered!";
                } else {
                    json.token = '123';
                }
                resolve(json);
            }, 1000)
        });
    },

//calculate ride price
getRequestPrice:(distance) => {
    return new Promise((resolve, reject) => {
        setTimeout(() =>{
            let json = {
                error:''
            };
            //calculate fake price
            json.price = distance * 7;
            resolve(json);
        }, 1000)
    });
},

});

