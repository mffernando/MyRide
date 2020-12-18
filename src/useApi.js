export default () => ({
    //fake sign in
    signin:(email, password) => {
        return new Promise((resolve, reject) => {
            setTimeout(() =>{
                let json = {
                    error:'',
                    token:'123',
                    name:'My Name',
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
                    json.name= 'My Name';
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

findDriver:(options) => {
    return new Promise((resolve, reject) => {
        setTimeout(() =>{
            let json = {
                error:''
            };
            //find fake driver
            //json.error = 'No Driver Found!';
            json.driver = {
                name: 'Fake Driver',
                avatar: 'https://cdn.icon-icons.com/icons2/1879/PNG/512/iconfinder-7-avatar-2754582_120519.png',
                stars: 5,
                carName: 'Bugatti Veyron',
                carColor: 'Black',
                carPlate: 'AAA-0000'
            };

            resolve(json);
        }, 3000)
    });
},

//fake rating
setRating:(rating) => {
    return new Promise((resolve, reject) => {
        setTimeout(() =>{
            let json = {
                error:''
            };
            resolve(json);
        }, 1000)
    });
},

});

