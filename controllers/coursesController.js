const courses = require("../models/course.model");

exports.showCourses = (req, res) => {
  courses.getAllCourses((err, data) => {
    if (err) {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving customers.",
      });
    } else {
      res.render("courses/index", {
        courses: data,
      });
    }
    return;
  });
};

exports.showCourseDetails = (req, res) => {
  courses.findById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send("not found");
      } else {
        res.status(500).send("error");
      }
    } else {
      res.render("courses/show", {
        course: data,
      });
    }
  });
};

exports.editCourse = (req, res) => {
  courses.findById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send("not found");
      } else {
        res.status(500).send("error");
      }
    } else {
      res.render("courses/edit", {
        course: data,
      });
    }
  });
};

exports.updateCourse = (req, res) => {
  courses.updateCourseById(
    req.params.id,
    new courses(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Course with id:${req.params.id}.`,
          });
        } else {
          res.status(500).send({
            message: `Error updating Course with id:${req.params.id}`,
          });
        }
      } else {
        res.redirect("/courses");
      }
    }
  );
};

exports.deleteCourse = (req, res) => {
  courses.deleteById(req.params.id, (err, data) => {
    res.redirect("/courses");
  });
};

exports.newCourse = (req, res) => {
  res.render("courses/new");
};

exports.createCourse = (req, res) => {
  const course = new courses({
    title: req.body.title,
    description: req.body.description,
    max_students: req.body.max_students,
    cost: req.body.cost,
  });

  courses.createCourse(course, (err, data) => {
    if (err) {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Customer.",
      });
    } else {
      req.flash("success", `Success on making ${data.title} course`);
      res.redirect("/courses");
    }
  });
};
