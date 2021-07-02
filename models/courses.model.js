const sql = require("../db");

const courses = function (course) {
  this.id = course.id;
  this.title = course.title;
  this.description = course.description;
  this.max_students = course.max_students;
  this.cost = course.cost;
};

courses.getAllCourses = () => {
  return new Promise((resolve, reject) => {
    sql.query("SELECT * FROM courses", (err, subscribers) => {
      if (err) reject(err);
      resolve(subscribers);
    });
  });
};

courses.create = (course) => {
  return new Promise((resolve, reject) => {
    sql.query("INSERT INTO courses SET ?", course, (err, res) => {
      if (err) reject(err);
      resolve(res);
    });
  });
};

courses.findById = (id) => {
  return new Promise((resolve, reject) => {
    sql.query("SELECT * FROM courses WHERE id = ?", id, (err, res) => {
      if (err) reject(err);
      resolve(res);
    });
  });
};

courses.update = (id, course) => {
  return new Promise((resolve, reject) => {
    sql.query(
      "UPDATE courses SET title = ?, description = ?, max_students = ?, cost = ? WHERE id = ?",
      [course.title, course.description, course.max_students, course.cost, id],
      (err, res) => {
        if (err) reject(err);
        resolve(res);
      }
    );
  });
};

courses.delete = (id) => {
  return new Promise((resolve, reject) => {
    sql.query("DELETE FROM courses WHERE id = ?", id, (err, res) => {
      if (err) reject(err);
      resolve(res);
    });
  });
};

module.exports = courses;
