/** @format */

import { useForm } from "react-hook-form";
import { struct, string, number, refine, StructError } from "superstruct";

interface FormData {
	name: string;
	email: string;
	age: number;
}

// Validatsiya xabarlarini alohida obyektga ajratish
const validationMessages = {
	required: "Bu maydon to'ldirilishi shart",
	email: "Email formatini to'g'ri kiriting",
	age: "Yosh 18 dan katta bo'lishi kerak",
};

const FormSchema = struct({
	name: refine(string(), "name", (value) => value.length >= 2), // Ismning minimal uzunligi
	email: refine(string(), "email", (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)),
	age: refine(number(), "age", (value) => value >= 18 && value <= 100), // Yosh chegarasi
});

const MyForm = () => {
	const {
		register,
		handleSubmit,
		setError,
		formState: { errors, isSubmitting },
	} = useForm<FormData>({
		defaultValues: {
			name: "",
			email: "",
			age: 18, // Default yosh 0 emas, 18 dan boshlansin
		},
	});

	const onSubmit = async (data: FormData) => {
		try {
			FormSchema.assert(data);
			// Ma'lumotlarni yuborish
			await new Promise((resolve) => setTimeout(resolve, 1000)); // API chaqiruvi simulyatsiyasi
			alert("Form muvaffaqiyatli yuborildi! ✅");
		} catch (error) {
			if (error instanceof StructError) {
				setError(error.key as keyof FormData, {
					message:
						validationMessages[error.key as keyof typeof validationMessages] || error.message,
				});
			}
		}
	};

	return (
		<form
			onSubmit={handleSubmit(onSubmit)}
			className='space-y-4 bg-blue-400 font-bold text-white max-w-md mx-auto p-6'>
			<div className="flex flex-col w-full justify-start ">
				<label className='font-medium w-[40px]'>Ism</label>
				<input
					{...register("name", { required: validationMessages.required })}
					type='text'
					className='border rounded w-full p-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
					placeholder='Ismingizni kiriting'
				/>
				{errors.name && <p className='text-red-500 text-sm mt-1'>{errors.name.message}</p>}
			</div>

            <div className="flex flex-col w-full justify-start ">

				<label className='w-[40px] font-medium mb-1'>Email</label>
				<input
					{...register("email", { required: validationMessages.required })}
					type='email'
					className='border rounded w-full p-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
					placeholder='Email manzilingizni kiriting'
				/>
				{errors.email && <p className='text-red-500 text-sm mt-1'>{errors.email.message}</p>}
			</div>

            <div className="flex flex-col w-full justify-start ">

				<label className='w-[40px] font-medium mb-1'>Yosh</label>
				<input
					{...register("age", {
						required: validationMessages.required,
						valueAsNumber: true,
						min: { value: 18, message: validationMessages.age },
					})}
					type='number'
					className='border text-black rounded w-full p-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
					placeholder='Yoshingizni kiriting'
				/>
				{errors.age && <p className='text-red-500 text-sm mt-1'>{errors.age.message}</p>}
			</div>

			<button
				type='submit'
				disabled={isSubmitting}
				className='w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:bg-blue-300 transition-colors'>
				{isSubmitting ? "Yuborilmoqda..." : "Yuborish"}
			</button>
		</form>
	);
};

export default MyForm;
