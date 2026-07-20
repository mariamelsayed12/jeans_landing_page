import * as yup from "yup";



export const schema = (locale: string) => {
  const isRtl = locale === "ar";

  return yup.object().shape({
    fullName: yup
      .string()
      .required(isRtl ? "الاسم الكامل مطلوب" : "Full name is required")
      .min(3, isRtl ? "الاسم يجب أن يكون 3 أحرف على الأقل" : "Name must be at least 3 characters"),
    phoneNumber: yup
      .string()
      .required(isRtl ? "رقم الهاتف مطلوب" : "Phone number is required")
      .matches(/^01[0125][0-9]{8}$/, isRtl ? "الرجاء إدخال رقم هاتف مصري صحيح" : "Please enter a valid Egyptian phone number"),
    city: yup
      .string()
      .required(isRtl ? "الرجاء اختيار المدينة" : "Please select a city"),
    detailedAddress: yup
      .string()
      .required(isRtl ? "العنوان بالتفصيل مطلوب" : "Detailed address is required")
      .min(5, isRtl ? "العنوان قصير جداً" : "Address is too short"),
  });
};
