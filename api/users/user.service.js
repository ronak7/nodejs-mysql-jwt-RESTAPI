const pool = require("../../config/database");

module.exports = {
  create: (data, callBack) => {
    pool.query(
      `insert into users(firstname, lastname, gender, email, password, role) 
                values(?,?,?,?,?,?)`,
      [
        data.firstname,
        data.lastname,
        data.gender,
        data.email,
        data.password,
        data.role
      ],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results);
      }
    );
  },
  getUserByUserEmail: (email, callBack) => {
    pool.query(
      `select * from users where email = ?`,
      [email],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results[0]);
      }
    );
  },
  getUserByUserId: (id, callBack) => {
    pool.query(
      `select id,firstname,lastname,gender,email,role from users where id = ?`,
      [id],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results[0]);
      }
    );
  },
  getUsers: callBack => {
    pool.query(
      `select id,firstname,lastname,gender,email,role from users where isActive = 1`,
      [],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results);
      }
    );
  },
  updateUser: (data, callBack) => {
    pool.query(
      `update users set firstname=?, lastname=?, gender=?, email=?, password=?, role=? where id = ?`,
      [
        data.firstname,
        data.lastname,
        data.gender,
        data.email,
        data.password,
        data.role,
        data.id
      ],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results[0]);
      }
    );
  },
  deleteUser: (data, callBack) => {
    pool.query(
      `update users set isActive=? where id = ?`,
      [0, data.id],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results[0]);
      }
    );
  }
};
