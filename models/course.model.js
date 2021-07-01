const sql = require("../db");

const courses = function (course) {
  this.id = course.id;
  this.title = course.title;
  this.description = course.description;
  this.max_students = course.max_students;
  this.cost = course.cost;
};

courses.getAllCourses = (result) => {
  sql.query("SELECT * FROM courses", (err, res) => {
    if (err) {
      console.log(err);
      result(null, err);
      return;
    }
    result(null, res);
  });
};

courses.createCourse = (course, result) => {
  sql.query("INSERT INTO courses SET ?", course, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    result(null, { id: res.insertId, ...course });
  });
};

courses.findById = (id, result) => {
  sql.query("SELECT * FROM courses where id=?", id, (err, res) => {
    if (err) {
      console.log("error:" + err);
      result(null, err);
    } else if (res.length) {
      console.log(res[0]);
      result(null, res[0]);
    } else {
      result({ kind: "not_found" }, null);
    }
  });
};

courses.updateCourseById = (id, course, result) => {
  console.log("edww:" + JSON.stringify(course));
  sql.query(
    "UPDATE courses SET title=? ,description=? ,max_students=? ,cost=? where id=?",
    [course.title, course.description, course.max_students, course.cost, id],
    (err, res) => {
      if (err) {
        console.log("error:", err);
        result(null, err);
      }
      if (res.affectedRows == 0) {
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated course: ", { id: id, ...course });
      result(null, { id: id, ...course });
    }
  );
};

courses.deleteById = (id, result) => {
  sql.query("DELETE FROM courses WHERE id=?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found Customer with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted customer with id: ", id);
    result(null, res);
  });
};

module.exports = courses;
