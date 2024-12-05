/** @format */

// /** @format */

const Joi = require("joi");

// import { array, assert, boolean, define, is, number, object, optional, refine, string, validate } from "superstruct";

// // const user = object({
// // 	id: number(),
// // 	name: string(),
// // 	departments: array(string()),
// // });

// const Username = define("Username", (value) => {
// 	if (typeof value !== "string") {
// 		return "Username next be a string";
// 	}
// 	if (value.length < 3) {
// 		return "Username  must be at least 3 characters long ";
// 	}
// 	if (value.length > 10) {
// 		return "Username must be at least 10 characters long";
// 	}
// 	return true;
// });

// const User = object({
// 	name: Username,
// });

// const data2 = { name: "Shukur"}

// const DataStruct = array(
//     object({
//         name:string(),
//         id:number()
//     })
// )

// let regex = /.com$/gm;
//  const User3 = refine(
//     object({
//         name:string(),
//         email:string()
//     })
// ,"User",(value)=>{
//     if (!regex.test(value.email)) {
//         return "Invalid email format";
//     }
//     return value.email.includes("@")
// } )

// const user = {
//     name:"tesha",
//     email:"tesh123@gmail.com"
// }

// const [error , newData ] = validate(user,User3)

// if (error) {
//     console.log(error.message);
// }else{
//     console.log(newData)
// }

const schema = Joi.object({
	id: Joi.number().required(),
	name: Joi.string().max(10).min(3).default("Shukur"),
	email: Joi.string().email().required(),
	age: Joi.number().min(10).max(60).required().messages({
		"number.min": "Age must be at least 10.",
		"number.max": "Age must not exceed 60.",
	}),
});

const data = {
	id: 1,
	email: "jeki2004114r@gmail.com",
	age: 22,
};
const validate = schema.validate(data);
if (validate.error) {
	console.log(validate.error);
} else {
	console.log("Valid Data", validate.value);
}
