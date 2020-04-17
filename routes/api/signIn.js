const User = require('../../models/user.model');
const UserSession = require('../../models/userSession.model')

module.exports = (app) => {
    /*
     * Sign Up
     */
    app.post('/api/account/signup', (req, res, next) => {
        const { body } = req;
        console.log('/api/account/signup body:', body)
        const {
            firstName,
            lastName,
            shippingAddress,
            password

        } = body;
        let { email } = body

        if (!firstName) {
            return res.send({
                success: false,
                message: 'Error: first name cannot be blank'
            })
        }
        if (!lastName) {
            return res.send({
                success: false,
                message: 'Error: last  name cannot be blank'
            })
        }
        if (!shippingAddress) {
            return res.send({
                success: false,
                message: 'Error: shipping adress cannot be blank'
            })
        }
        if (!email) {
            return res.send({
                success: false,
                message: 'Error: email cannot be blank'
            })
        }
        if (!password) {
            return res.send({
                success: false,
                message: 'Error: password cannot be blank'
            })
        }

        email = email.toLowerCase();
        email = email.trim();

        // Steps
        //1. verify email does not exist
        //2. save
        User.find({
            email: email
        }, (err, previousUser) => {
            if (err) {
                return res.send({
                    success: false,
                    message: 'Server error'
                });
            } else if (previousUser.length > 0) {
                return res.send({
                    success: false,
                    message: 'Account already exist.'
                })
            } else {
                //save the user
                const newUser = new User();
                newUser.firstName = firstName;
                newUser.lastName = lastName;
                newUser.shippingAddress = shippingAddress;
                newUser.email = email;
                newUser.password = newUser.generateHash(password);

                newUser.save((err, user) => {

                    if (err) {
                        return res.send({
                            success: false,
                            message: 'Error: Server error'
                        });
                    }

                    return res.send({
                        success: true,
                        message: 'Signed up'
                    });
                });
            }
        });
    }) // end of sign up endpoint

    app.post('/api/account/signin', (req, res, next) => {
        const { body } = req;

        console.log(body)
        const { password } = body;
        let { email } = body;

        if (!email) {
            return res.send({
                success: false,
                message: 'Error: email cannot be blank'
            })
        }
        if (!password) {
            return res.send({
                success: false,
                message: 'Error: password cannot be blank'
            })
        }

        email = email.toLowerCase();

        User.find({
            email: email
        }, (err, users) => {
            if (err) {
                return res.send({
                    success: false,
                    message: 'Error: Server Error'
                });
            };
            if (users.length != 1) {
                return res.send({
                    success: false,
                    message: 'Error: Invalid (number of users more than one !!!) ' + users.length
                });
            };

            const user = users[0];

            if (!user.validPassword(password)) {
                return res.send({
                    success: false,
                    message: 'Error: Invalid (password error)'
                });
            }

            //otherwise correct user
            const userSession = new UserSession();
            userSession.usersId = user._id;
            userSession.save((err, doc) => {
                if (err) {
                    return res.send({
                        success: false,
                        message: 'Error: Server error'
                    });
                };

                return res.send({
                    success: true,
                    message: 'Valide sign in',
                    token: doc._id
                })
            })

        })

    }); //end of signe in endpoint

    app.get('/api/account/verify', (req, res, next) => {
        const { query } = req;
        const { token } = query;
        console.log(query, token)

        UserSession.find({
            _id: token,
            isDeleted: false
        }, (err, session) => {
            if (err) {
                return res.send({
                    success: false,
                    message: 'Error: Server error'
                });
            }

            if (session.length != 1) {
                return res.send({
                    success: false,
                    message: 'Error: Invalid token'
                });
            } else {
                return res.send({
                    success: true,
                    message: 'token verified'
                });

            }
        })

    })

    app.get('/api/account/logout', (req, res, next) => {
        const { query } = req;
        const { token } = query;
        console.log(query, token)

        UserSession.findOneAndUpdate({
            _id: token,
            isDeleted: false
        }, {
            $set: { isDeleted: true }
        }, null, (err, session) => {
            if (err) {
                return res.send({
                    success: false,
                    message: 'Error: Server error'
                });
            }
            
            return res.send({
                success: true,
                message: 'token verified'
            });


        })

    })



}

