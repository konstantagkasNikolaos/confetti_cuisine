const courses = require("../models/courses.model");

module.exports = {
  index: (req, res, next) => {
    courses
      .getAllCourses()
      .then((courses) => {
        res.locals.courses = courses;
        next();
      })
      .catch((error) => {
        console.log(`Error fetching courses: ${error.message}`);
        next(error);
      });
  },

  indexView: (req, res) => {
    res.render("courses/index");
  },

  new: (req, res) => {
    res.render("courses/new");
  },

  create: (req, res, next) => {
    const course = {
      title: req.body.title,
      description: req.body.description,
      max_students: req.body.max_students,
      cost: req.body.cost,
    };
    courses
      .create(course)
      .then((course) => {
        res.locals.redirect = "/courses";
        res.locals.course = course;
        next();
      })
      .catch((error) => {
        console.log(`Error saving course: ${error.message}`);
        next(error);
      });
  },

  show: (req, res, next) => {
    courses
      .findById(req.params.id)
      .then((course) => {
        res.locals.course = course[0];
        next();
      })
      .catch((error) => {
        console.log(`Error fetching course by ID: ${error.message}`);
        next(error);
      });
  },

  showView: (req, res) => {
    res.render("courses/show");
  },

  edit: (req, res, next) => {
    courses
      .findById(req.params.id)
      .then((course) => {
        res.render("courses/edit", {
          course: course[0],
        });
      })
      .catch((error) => {
        console.log(`Error fetching course by ID: ${error.message}`);
        next(error);
      });
  },

  update: (req, res, next) => {
    course = {
      title: req.body.title,
      description: req.body.description,
      max_students: req.body.max_students,
      cost: req.body.cost,
    };

    courses
      .update(req.params.id, course)
      .then((course) => {
        res.locals.redirect = `/courses/${req.params.id}`;
        res.locals.course = course;
        next();
      })
      .catch((error) => {
        console.log(`Error updating course by ID: ${error.message}`);
        next(error);
      });
  },

  delete: (req, res, next) => {
    courses
      .delete(req.params.id)
      .then(() => {
        res.locals.redirect = "/courses";
        next();
      })
      .catch((error) => {
        console.log(`Error deleting course by ID: ${error.message}`);
        next();
      });
  },

  redirectView: (req, res, next) => {
    let redirectPath = res.locals.redirect;
    if (redirectPath !== undefined) res.redirect(redirectPath);
    else next();
  },
};
