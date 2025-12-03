import { v4 as uuidv4 } from "uuid";
import model from "./model.js";


export default function CoursesDao(db) {

 function findAllCourses() {
 return model.find({}, { name: 1, description: 1 });
}


async function findCoursesForEnrolledUser(userId) {
 const { enrollments } = db;
 const courses = await model.find({}, { name: 1, description: 1 });
 const enrolledCourses = courses.filter((course) =>
   enrollments.some(
     (enrollment) =>
       enrollment.user === userId && enrollment.course === course._id
   )
 );
 return enrolledCourses;
}



function createCourse(course) {
  const newCourse = { ...course, _id: uuidv4() };
  return model.create(newCourse);

}

  async function deleteCourse(courseId) {
    // const { enrollments } = db;
    // db.enrollments = enrollments.filter(
    //   (enrollment) => enrollment.course !== courseId
    // );
    return await model.deleteOne({ _id: courseId });
  }

  async function updateCourse(courseId, courseUpdates) {
    return await model.updateOne({ _id: courseId }, { $set: courseUpdates });
  }

  return { findAllCourses, findCoursesForEnrolledUser, createCourse, deleteCourse, updateCourse };
}
