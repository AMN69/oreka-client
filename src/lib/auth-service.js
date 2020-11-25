import axios from "axios";

class Auth {
  constructor() {
    this.auth = axios.create({
      baseURL: process.env.REACT_APP_API_URL,
      withCredentials: true,
    });
  };

  signup({ email, password, username, usersurname, age, userImgUrl }) {
    return this.auth
      .post("/auth/signup", { email, password, username, usersurname, age, userImgUrl })
      .then(({ data }) => data);
    // .then((response) => response.data);
  }

  login({ email, password }) {
    return this.auth
      .post("/auth/login", { email, password })
      .then(({ data }) => data);
    // .then((response) => response.data);
  }

  logout() {
    return this.auth.post("/auth/logout", {}).then(({ data }) => data);
    // return this.auth.post("/auth/logout", {}).then((response) => response.data);
  }

  creagen = async ({ month, year, userId}) => {
    const postRoute = "/agenda-routes/agendacreate/" + userId
    try {
      const res = await this.auth.post(postRoute, { month, year});
      return res.data;
    } catch (error) {
      console.log(error);
    }
  }
  
  getagen = async ({ year, month, userId }) => {
    const getRoute = "/agenda-routes/agenda?year=" + year + "&month=" + month; 
    try {
      const res = await this.auth.get(getRoute, { userId });
      return res.data;
    } catch (error) {
        console.log(error);
    }
  }

  updateagen = async ( agenId, field, agenda ) => {
    const putRoute = "/agenda-routes/agendamodify/" + agenId + "/" + field;
    try {
      const res = await this.auth.patch(putRoute, {agenda});
      return res.data;
    } catch (error) {
        console.log(error);
    }
  }

  /*updateagen = async ({ agenId, agenda }) => {
    const putRoute = "/agenda-routes/agendamodify/" + agenId
    try {
      console.log("Agenda before update in auth-service: ", agenda);
      const res = await this.auth.patch(putRoute, {agenda});
      console.log("auth-service return: ", res.data);
      return res.data;
    } catch (error) {
        console.log(error);
    }
  }*/

  me() {
    return this.auth.get("/auth/me").then(({ data }) => data);
    // return this.auth.get("/auth/me").then((response) => response.data);
  }

  // From dashboard.js will come here to look for an agenda month with the data (formYear, formMonth)
  // this data must be taken and pass to the backend (in this case by query)
  // the backend returns an agenda sheet on agenda

  dashboardGet({formYear, formMonth}) {
    const getRoute = "/agenda-routes/agenda?year=" + formYear + "&month=" + formMonth;

    return this.auth
      .get(getRoute)
      .then(({agenda}) => agenda);
  }

  // From userprofile.js will come here to modify the agenda month with the data (userId and formUsername, formUsersurname, formAge, formUserImgUrl)
  // this data must be taken and pass to the backend (in this case by id and body)
  // the backend returns a message on message

  userprofile({userId, username, usersurname, age, userImgUrl }) {
    const putRoute = "/agenda-routes/usermodify/" + userId;
    return this.auth
      .put(putRoute, { username, usersurname, age, userImgUrl })
      .then(({message}) => message);
  }

  // From dashboard.js

  dashboardPut({ userId, agenda }) {
    const putRoute = "/agenda-routes/agendamodify/" + userId;

    return this.auth
      .put(putRoute, { agenda })
      .then(({message}) => message);
  }

  //[AMN-start] This is a service that receives the file with the user photo and sends it to the backend to upload in cloudinary.
  handleUpload = async (theFile) => {

    try {
      const res = await this.auth.post("/agenda-routes/upload", theFile);
      return res.data;
    } catch (error) {
      console.log(error);
    }
  };
  //[AMN-end]
} 

const axiosRequestFunctions = new Auth();

export default axiosRequestFunctions;
