import yelp from "../../yelp";

export const login = async (username, password) => {
  try {
    const response = await yelp.post("/login/", {
      username,
      password,
    });
    return response;
  } catch (err) {
    return err.message;
  }
};

export const register = async (email, username, password) => {
  try {
    const response = await yelp.post("/hufusers/", {
      email,
      username,
      password,
    });
    return response;
  } catch (err) {
    return err.message;
  }
};

// authenticate via facebook api token
export const facebookLogin = async (access_token) => {
  try {
    const response = await yelp.post("/rest-auth/fblogin/", {
      access_token,
    });
    return response;
  } catch (err) {
    return err.message;
  }
};

// calls API to verify authentication. If success, userinfo will be returned
// depreciated
export const facebookVerifyLoginAuth = async () => {
  try {
    const response = await yelp.get("/authenticateuser/", {
      headers: {
        withCredentials: true,
      },
    });
    return response;
  } catch (err) {
    return err.message;
  }
};

// get user info using access_token
export const facebookLoginGetUserInfo = async (access_token) => {
  try {
    const response = await yelp.post("/getinfo/", {
      access_token,
    });
    return response;
  } catch (err) {
    return err.message;
  }
};

//allow user to change password
export const changePassword = async (email) => {
  try {
    let passwordResetLink = "/forgot_password/".concat(email);
    const response = await yelp.get(passwordResetLink, {});
    return response;
  } catch (err) {
    return err.message;
  }
};
