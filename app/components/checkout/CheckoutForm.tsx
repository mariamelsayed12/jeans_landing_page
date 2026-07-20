"use client";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useLocale } from "next-intl";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { FiChevronDown } from "react-icons/fi";
import { RootState } from "@/app/redux/store";
import { ClearCartAction } from "@/app/redux/feature/CartSlice";
import Input from "../ui/Input";
import Button from "../ui/Button";
import CheckoutSummary from "./CheckoutSummary";
import InputErrorMessage from "../ui/InputErrorMessage";
import { cn } from "@/app/lib/utils";
import { schema } from "@/validation";

interface CheckoutFormProps {
  onSuccess: () => void;
}

interface IFormInput {
  fullName: string;
  phoneNumber: string;
  city: string;
  detailedAddress: string;
}

const egyptCities = [
  { value: "cairo", en: "Cairo", ar: "القاهرة" },
  { value: "giza", en: "Giza", ar: "الجيزة" },
  { value: "alexandria", en: "Alexandria", ar: "الإسكندرية" },
  { value: "qalyubia", en: "Qalyubia", ar: "القليوبية" },
  { value: "dakahlia", en: "Dakahlia", ar: "الدقهلية" },
  { value: "gharbia", en: "Gharbia", ar: "الغربية" },
  { value: "sharqia", en: "Sharqia", ar: "الشرقية" },
  { value: "monufia", en: "Monufia", ar: "المنوفية" },
  { value: "beheira", en: "Beheira", ar: "البحيرة" },
  { value: "fayoum", en: "Fayoum", ar: "الفيوم" },
];

export default function CheckoutForm({ onSuccess }: CheckoutFormProps) {
  const locale = useLocale();
  const dispatch = useDispatch();
  const isRtl = locale === "ar";

  const { cartProducts } = useSelector((state: RootState) => state.Cart);

  const subtotal = cartProducts.reduce(
    (sum, item) => sum + item.price * (item.quantity || 1),
    0
  );

  
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<IFormInput>({
    resolver: yupResolver(schema(locale)),
    defaultValues: {
      fullName: "",
      phoneNumber: "",
      city: "",
      detailedAddress: "",
    },
  });

  const onSubmit = async (data: IFormInput) => {
    // Mocking API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    
    // Order Placed Successfully
    toast.success(
      isRtl
        ? "تم تأكيد طلبك بنجاح! شكراً لك."
        : "Order confirmed successfully! Thank you.",
      { duration: 4000 }
    );
    
    // Clear shopping cart
    dispatch(ClearCartAction());
    
    // Invoke success callback to close the drawer
    onSuccess();
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col flex-1 justify-between min-h-0 w-full"
    >
      {/* Scrollable contents */}
      <div className="flex-1 overflow-y-auto pr-1 flex flex-col gap-[32px] select-none">
        {/* Order Summary Section */}
        <CheckoutSummary />

        {/* Separator Line */}
        <div className="w-full h-px bg-neutral-200" />

        {/* Delivery Info Section */}
        <div className="flex flex-col gap-[24px] w-full">
          <h3 className="font-poppins font-medium text-[19px] text-[#464646] text-start w-full">
            {isRtl ? "معلومات التوصيل" : "Delivery info"}
          </h3>

          <div className="flex flex-col gap-[16px] w-full">
            {/* Full Name */}
            <Input
              {...register("fullName")}
              label={isRtl ? "الاسم الكامل" : "Full name"}
              placeholder={isRtl ? "أدخل الاسم الكامل" : "Enter full name"}
              required
              error={errors.fullName?.message}
            />

            {/* Phone Number */}
            <Input
              {...register("phoneNumber")}
              type="tel"
              label={isRtl ? "رقم الهاتف" : "Phone number"}
              placeholder={isRtl ? "أدخل رقم الهاتف" : "Enter phone number"}
              required
              error={errors.phoneNumber?.message}
            />

            {/* City (Dropdown select style) */}
            <div className="flex flex-col gap-[8px] w-full text-start relative">
              <label className="font-poppins font-normal text-[16px] text-[#121212] select-none">
                {isRtl ? "المدينة" : "City"}
                <span className="text-red-500 ml-0.5">*</span>
              </label>
              <div className="relative w-full">
                <select
                  {...register("city")}
                  className={cn(
                    "w-full h-[48px] px-[12px] bg-white border border-[#d4d5d8] rounded-[8px] font-poppins font-normal text-[16px] text-[#141414] focus:outline-none focus:border-[#121212] focus:ring-1 focus:ring-[#121212] appearance-none cursor-pointer transition-all duration-150",
                    errors.city && "border-red-500 focus:border-red-500 focus:ring-red-500"
                  )}
                >
                  <option value="">{isRtl ? "اختر المدينة" : "Choose city"}</option>
                  {egyptCities.map((city) => (
                    <option key={city.value} value={city.value}>
                      {isRtl ? city.ar : city.en}
                    </option>
                  ))}
                </select>
                <div className="absolute top-1/2 right-[12px] rtl:left-[12px] rtl:right-auto -translate-y-1/2 pointer-events-none text-[#747474]">
                  <FiChevronDown className="size-[20px]" />
                </div>
              </div>
              {errors.city && <InputErrorMessage msg={errors.city.message} />}
            </div>

            {/* Detailed Address */}
            <div className="flex flex-col gap-[8px] w-full text-start">
              <label className="font-poppins font-normal text-[16px] text-[#121212] select-none">
                {isRtl ? "العنوان بالتفصيل" : "Detailed address"}
                <span className="text-red-500 ml-0.5">*</span>
              </label>
              <textarea
                {...register("detailedAddress")}
                placeholder={isRtl ? "أدخل العنوان بالتفصيل" : "Enter detailed address"}
                className={cn(
                  "w-full p-[12px] bg-white border border-[#d4d5d8] rounded-[8px] font-poppins font-normal text-[16px] text-[#141414] placeholder-[#747474] transition-all duration-150 focus:outline-none focus:border-[#121212] focus:ring-1 focus:ring-[#121212] resize-none min-h-[110px]",
                  errors.detailedAddress && "border-red-500 focus:border-red-500 focus:ring-red-500"
                )}
              />
              {errors.detailedAddress && <InputErrorMessage msg={errors.detailedAddress.message} />}
            </div>
          </div>
        </div>
      </div>

      {/* Checkout Footer containing Total & Confirm Order button */}
      <div className="flex gap-[16px] items-center justify-between pt-[20px] border-t border-gray-100 bg-[#EFF1F4] select-none">
        {/* Total Price */}
        <div className="flex flex-col font-poppins items-start text-start shrink-0">
          <span className="text-[#464646] text-[16px] font-normal leading-[1.2]">
            {isRtl ? "إجمالي:" : "Total:"}
          </span>
          <span className="text-[#141414] text-[19px] font-semibold leading-[1.2] mt-1">
            {subtotal} {isRtl ? "جنيه" : "EGP"}
          </span>
        </div>

        {/* Confirm Order Button */}
        <Button
          type="submit"
          variant="primary"
          size="lg"
          loading={isSubmitting}
          className="flex-1 max-w-[280px]"
        >
          {isRtl ? "تأكيد الطلب" : "Confirm Order"}
        </Button>
      </div>
    </form>
  );
}
