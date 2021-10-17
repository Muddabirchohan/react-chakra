export const userLogin = async ({ email, password }) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (email === 'test@test.com' && password === 'password') {
          resolve();
        } else {
          reject();
        }
      }, 3000);
    });
  };


  export const userSignup = async ({ name,email, password,image }) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (email  && password && name && image) {
          resolve();
        } else {
          reject();
        }
      }, 3000);
    });
  };