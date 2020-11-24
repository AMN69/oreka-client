import React, { Component } from "react";
import auth from "./auth-service"; // importamos funciones para llamadas axios a la API
const { Consumer, Provider } = React.createContext();

//HOC para crear Consumer
const withAuth = (WrappedComponent) => {
  return class extends Component {
    render() {
      return (
        <Consumer>
          {({ login, signup, user, logout, creagen, getagen, isLoggedin }) => {
            return (
              <WrappedComponent
                login={login}
                signup={signup}
                user={user}
                logout={logout}
                creagen={creagen}
                getagen={getagen}
                isLoggedin={isLoggedin}
                {...this.props}
              />
            );
          }}
        </Consumer>
      );
    }
  };
};

// Provider
class AuthProvider extends Component {
  state = { isLoggedin: false, user: null, isLoading: true };

  componentDidMount() {
    auth
      .me()
      .then((user) =>
        this.setState({ isLoggedin: true, user: user, isLoading: false })
      )
      .catch((err) =>
        this.setState({ isLoggedin: false, user: null, isLoading: false })
      );
  }

  signup = (user) => {
    const { email, password, username, usersurname, age, userImgUrl } = user;
    // lamamos a auth.signup que se conecta con la ruta del backend
    auth
      .signup({ email, password, username, usersurname, age, userImgUrl })
      .then((user) => this.setState({ isLoggedin: true, user }))
      .catch(({ error }) =>
        this.setState({ message: error.data.statusMessage })
      );
  };

  login = async (user) => {
    const { email, password } = user;

    try {
      const user = await auth.login({ email, password });
      this.setState({ isLoggedin: true, user });
    } catch (error) {
      console.log(error);
    }
  };

  logout = async () => {
    try {
      await auth.logout();
      this.setState({ isLoggedin: false, user: null });
    } catch (error) {
      console.log(error);
    }
  };

  creagen = (datagen) => {
    const { month, year, userId } = datagen;
    // lamamos a auth.creagen que se conecta con la ruta del backend
    auth
      .creagen({ month, year, userId })
      .catch(({ error }) =>
        this.setState({ message: error.data.statusMessage })
      );
  };

  getagen = (datagen) => {
    console.log("I'm within getagen on AuthProvider")
    const { year, month, userId } = datagen;
    // lamamos a auth.getagen que se conecta con la ruta del backend
    auth
      .getagen({ month, year, userId })
      .then(({ agenda }) => 
        {console.log("I'm back within getagen on AuthProvider", agenda)
        return agenda})
      .catch(({ error }) =>
        this.setState({ message: error.data.statusMessage })
      );
  };

  render() {
    const { isLoading, isLoggedin, user } = this.state;
    const { login, logout, signup, creagen, getagen } = this;

    return isLoading ? (
      <div>Loading...</div>
    ) : (
      /* dentro del value del provider tendremos datos que estarán disponibles para todos los componentes <Consumer> */
      <Provider value={{ isLoggedin, user, login, logout, creagen, getagen, signup }}>
        {this.props.children}
      </Provider>
    );
  }
}

export { Consumer, withAuth };
export default AuthProvider;
