import CoursesDao from "./dao.js";
import EnrollmentsDao from "../Enrollments/dao.js";
export default function CourseRoutes(app, db) {
  const dao = CoursesDao(db);
   const enrollmentsDao = EnrollmentsDao(db);
  const createCourse = (req, res) => {
    console.log("Session:", req.session);
    const currentUser = req.session["currentUser"];
    console.log("Current user from session:", currentUser);
    if (!currentUser) {
      console.log("No current user found in session");
      res.status(401).json({ message: "No user session found. Please sign in again." });
      return;
    }
    try {
      const newCourse = dao.createCourse(req.body);
      console.log("Created course:", newCourse);
      enrollmentsDao.enrollUserInCourse(currentUser._id, newCourse._id);
      console.log("Enrolled user in course");
      res.json(newCourse);
    } catch (error) {
      console.error("Error in createCourse:", error);
      res.status(500).json({ message: "Failed to create course", error: error.message });
    }
  };
  app.post("/api/users/current/courses", createCourse);
    const findCoursesForEnrolledUser = (req, res) => {
    let { userId } = req.params;
    if (userId === "current") {
      const currentUser = req.session["currentUser"];
      if (!currentUser) {
        res.sendStatus(401);
        return;
      }
      userId = currentUser._id;
    }
    const courses = dao.findCoursesForEnrolledUser(userId);
    res.json(courses);
  };

  const findAllCourses = (req, res) => {
    const courses = dao.findAllCourses();
    res.send(courses);
  }
    const deleteCourse = (req, res) => {
    const { courseId } = req.params;
    const status = dao.deleteCourse(courseId);
    res.send(status);
  }
    const updateCourse = (req, res) => {
    const { courseId } = req.params;
    const courseUpdates = req.body;
    const status = dao.updateCourse(courseId, courseUpdates);
    res.send(status);
  }
  app.put("/api/courses/:courseId", updateCourse);
  app.delete("/api/courses/:courseId", deleteCourse);
  app.get("/api/users/:userId/courses", findCoursesForEnrolledUser);
  app.get("/api/courses", findAllCourses);
}
