
const axios = require('axios');

module.exports = {
    create: (req, res, next) => {
        const db = req.app.get('db');
        const {name, price, photo} = req.body;

        db.create_product([name, price, photo]).then(() => res.status(200).send()).catch(() => res.status(500).send());
    },

    one_product: (req, res, next) => {
        const db = req.app.get('db');
        const {params} = req;
        // console.log('hit', params);
        db.read_product(params.id).then(product => res.status(200).send(product)).catch(() => res.status(500).send());
    },

    all_products: (req, res, next) => {
        const db = req.app.get('db');
        
        db.read_products().then(products => res.status(200).send(products)).catch(() => res.status(500).send());
    },

    update: (req, res, next) => {
        const db = req.app.get('db');

        db.update_product([params.id]).then(() => res.status(200).send()).catch(() => res.status(500).send());
    },

    delete: (req, res, next) => {
        const db = req.app.get('db');
        const {params} = req;

        db.delete.product([params.id]).then(() => res.status(200).send()).catch(() => res.status(500).send());
    }, 

    auth: (req, res) => {
        axios
        .post(`https://${process.env.REACT_APP_AUTH0_DOMAIN}/oauth/token`, {
        client_id: process.env.REACT_APP_AUTH0_CLIENT_ID,
        client_secret: process.env.REACT_APP_AUTH0_CLIENT_SECRET,
        code: req.query.code,
        grant_type: "authorization_code",
        redirect_uri: `http://${req.headers.host}/auth/callback`
      })
      .then(accessTokenResponse => {
        const accessToken = accessTokenResponse.data.access_token;
        return axios
          .get(
            `https://${
              process.env.REACT_APP_AUTH0_DOMAIN
            }/userinfo/?access_token=${accessToken}`
          )
          .then(userInfoResponse => {
            const userData = userInfoResponse.data;
            return req.app
              .get("db")
              .find_user_by_auth0_id(userData.sub)
              .then(users => {
                if (users.length) {
                  const user = users[0];
                  console.log('user', user)
                  req.session.user = {
                    email: user.email,
                    name: user.name,
                    auth0_id: user.auth0_id,
                    admin: user.admin,
                    cart: []
                  };
                  if(req.session.user.admin){
                    res.redirect('/admin')
                  } else {
                  console.log(req.session.user)
                  res.redirect('/');
                  }
                } else {
                  const createData = [
                    userData.sub,
                    userData.email,
                    userData.name,
                    userData.auth0_id
                  ];
                  return req.app
                    .get("db")
                    .create_user(createData)
                    .then(newUsers => {
                      const user = newUsers[0];
                      req.session.user = {
                        email: user.email,
                        name: user.name,
                        cart: []
                      };
                    });
                  res.redirect("/");
                }
              });
          });
      })
      .catch(error => {
          console.log('error in /callback', error);
          res.status(500).json({ message: "An error occurred in the server"});
      });
    },

    logout: (req, res) => {
        req.session.destroy();
        res.json({ message: 'Please come back again soon'});
    },

    cart: (req, res) => {
        const { item_name, price, photo } = req.body;
        // console.log(req.body);
        req.session.user.push([...req.session.user, { item_name, price, photo }]);
        res.json({ cart: req.session.user });
    },

    admin: (req, res) => {
        const db = req.app.get('db');

        db.join().then(admin => res.status(200).json(admin));
    }
};