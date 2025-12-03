import model from "./model.js";
export default function EnrollmentsDao(db) {

 async function findCoursesForUser(userId) {
   const enrollments = await model.find({ user: userId }).populate("course");
   return enrollments.map((enrollment) => enrollment.course);
 }
 async function findUsersForCourse(courseId) {
   const enrollments = await model.find({ course: courseId }).populate("user");
   return enrollments.map((enrollment) => enrollment.user);
 }


 async function enrollUserInCourse(userId, courseId) {
   const enrollmentId = `${userId}-${courseId}`;
   
   // Check if enrollment already exists
   const existingEnrollment = await model.findById(enrollmentId);
   if (existingEnrollment) {
     return existingEnrollment; // Already enrolled, return existing enrollment
   }
   
   // Create new enrollment
   return model.create({
     user: userId,
     course: courseId,
     _id: enrollmentId,
   });
 }

  function unenrollUserFromCourse(user, course) {
   return model.deleteOne({ user, course });
 }

 function unenrollAllUsersFromCourse(courseId) {
   return model.deleteMany({ course: courseId });
 }



 return {
   findCoursesForUser,
   findUsersForCourse,
   enrollUserInCourse,
   unenrollUserFromCourse,
   unenrollAllUsersFromCourse,
 };
}
