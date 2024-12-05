/** @format */

import { useForm } from "react-hook-form";
import { struct, string, number, refine, StructError } from "superstruct";

// 1. Interface yaratish
interface FormData {
	name: string;
	email: string;
	age: number;
}

// 2. Superstruct validatsiya strukturasini yaratish
const FormSchema = struct({
	name: string(),
	email: refine(
		string(),
		"email",
		(value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) // Email validatsiyasi
	),
	age: refine(number(), "age", (value) => value >= 18), // 18 dan katta bo'lishi kerak
});

// 3. Form componentini yaratish
const MyForm = () => {
	const {
		register,
		handleSubmit,
		setError,
		formState: { errors },
	} = useForm<FormData>({
		defaultValues: {
			name: "",
			email: "",
			age: 0,
		},
	});

	// 4. Formni yuborish funksiyasi
	const onSubmit = (data: FormData) => {
		console.log("Submitted Data:", data);

		try {
			FormSchema.assert(data); // Superstruct validatsiyasi
			alert("Form muvaffaqiyatli yuborildi! ✅");
		} catch (error) {
			if (error instanceof StructError) {
				// Superstruct xatolarini aniqlash va ko'rsatish
				setError(error.key as keyof FormData, { message: error.message });
			}
		}
	};

	return (
		<form
			onSubmit={handleSubmit(onSubmit)}
			className='space-y-4 max-w-md mx-auto'>
			{/* Name */}
			<div>
				<label className='block font-medium'>Name</label>
				<input
					{...register("name")}
					type='text'
					className='border rounded w-full p-2'
                    placeholder="Enter your Name"
				/>
				{errors.name && <p className='text-red-500'>{errors.name.message}</p>}
			</div>

			{/* Email */}
			<div>
				<label className='block font-medium'>Email</label>
				<input
					{...register("email")}
					type='email'
					className='border rounded w-full p-2'
                    placeholder="Enter your Email"
				/>
				{errors.email && <p className='text-red-500'>{errors.email.message}</p>}
			</div>

			{/* Age */}
			<div>
				<label className='block font-medium'>Age</label>
				<input
					{...register("age", { valueAsNumber: true })}
					type='number'
					className='border rounded w-full p-2'
				/>
				{errors.age && <p className='text-red-500'>{errors.age.message}</p>}
			</div>

			{/* Submit */}
			<button
				type='submit'
				className='bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600'>
				Submit
			</button>
		</form>
	);
};

export default MyForm;
