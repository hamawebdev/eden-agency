"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CheckCircle2, ArrowRight, ShoppingBag, Copy, Mail, Building2, Wallet } from "lucide-react";
import { motion } from "framer-motion";
import { Suspense, useEffect, useRef, useState } from "react";
import * as fbq from "@/lib/fb-pixel";
import { useSearchParams } from "next/navigation";

function CopyButton({ text }: { text: string }) {
    const [copied, setCopied] = useState(false);

    const handleCopy = async () => {
        await navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <button
            onClick={handleCopy}
            className="flex items-center gap-1 text-sm text-blue-600 hover:text-blue-800 transition-colors font-medium whitespace-nowrap"
            aria-label={`نسخ ${text}`}
        >
            <Copy className="h-3.5 w-3.5" />
            {copied ? "تم" : "نسخ"}
        </button>
    );
}

function PaymentInfoCard({ 
    icon: Icon, 
    title, 
    children,
    variant = "default"
}: { 
    icon: React.ElementType, 
    title: string, 
    children: React.ReactNode,
    variant?: "default" | "ccp" | "baridi"
}) {
    const borderColors = {
        default: "border-gray-200",
        ccp: "border-blue-200 bg-blue-50/50",
        baridi: "border-green-200 bg-green-50/50"
    };
    
    const iconColors = {
        default: "text-gray-600",
        ccp: "text-blue-600",
        baridi: "text-green-600"
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`p-4 sm:p-5 rounded-xl sm:rounded-2xl border-2 ${borderColors[variant]} transition-all hover:shadow-lg`}
        >
            <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
                <div className={`p-1.5 sm:p-2 rounded-lg sm:rounded-xl ${variant === 'ccp' ? 'bg-blue-100' : variant === 'baridi' ? 'bg-green-100' : 'bg-gray-100'}`}>
                    <Icon className={`h-4 w-4 sm:h-6 sm:w-6 ${iconColors[variant]}`} />
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-gray-900">{title}</h3>
            </div>
            {children}
        </motion.div>
    );
}

function ThankYouPageContent() {
    const trackedPurchase = useRef(false);
    const searchParams = useSearchParams();

    useEffect(() => {
        if (trackedPurchase.current) return;

        const value = Number(searchParams.get("value") || 0);
        const eventId = searchParams.get("event_id") || undefined;

        fbq.event(
            "Purchase",
            { currency: "DZD", value: Number.isFinite(value) ? value : 0 },
            eventId
        );

        trackedPurchase.current = true;
    }, [searchParams]);

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-blue-50 px-3 sm:px-4 py-8 sm:py-12">
            <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="max-w-xl w-full space-y-6 sm:space-y-8 bg-white p-5 sm:p-8 rounded-2xl sm:rounded-3xl shadow-2xl shadow-blue-100/50 mx-2 sm:mx-4"
                dir="rtl"
            >
                {/* Success Icon */}
                <motion.div
                    initial={{ scale: 0, rotate: -45 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ delay: 0.2, type: "spring", stiffness: 200, damping: 15 }}
                    className="mx-auto flex items-center justify-center h-16 w-16 sm:h-24 sm:w-24 rounded-full bg-green-50 shadow-inner"
                >
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.4, type: "spring", stiffness: 200 }}
                    >
                        <CheckCircle2 className="h-10 w-10 sm:h-14 sm:w-14 text-green-500" />
                    </motion.div>
                </motion.div>

                {/* Main Thank You Message */}
                <div className="space-y-3 sm:space-y-4 text-center">
                    <motion.h2
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-gray-900 tracking-tight"
                    >
                        شكراً لطلبك! 🎉
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className="text-sm sm:text-base text-gray-600 leading-relaxed"
                    >
                        لقد استلمنا طلبك بنجاح. لإتمام عملية الشراء، يرجى إتمام الدفع باستخدام أحد الطرق التالية وإرسال إيصال الدفع إلى البريد الإلكتروني المحدد.
                    </motion.p>
                </div>

                {/* Important Notice */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.45 }}
                    className="bg-amber-50 border-2 border-amber-200 rounded-lg sm:rounded-xl p-3 sm:p-4 text-center"
                >
                    <p className="text-sm sm:text-base text-amber-800 font-semibold">
                        ⚠️ يرجى إتمام الدفع خلال 48 ساعة لضمان معالجة طلبك
                    </p>
                </motion.div>

                {/* Payment Methods Section */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="space-y-4 sm:space-y-6"
                >
                    <h3 className="text-xl sm:text-2xl font-bold text-gray-900 text-center">
                        طرق الدفع المتاحة
                    </h3>

                    {/* CCP Payment */}
                    <PaymentInfoCard icon={Building2} title="CCP (حوالة بريدية)" variant="ccp">
                        <div className="space-y-2 sm:space-y-3 text-right">
                            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 p-2.5 sm:p-3 bg-white rounded-lg border border-blue-100">
                                <span className="text-gray-600 font-medium text-sm sm:text-base">رقم الحساب:</span>
                                <div className="flex items-center gap-2 justify-end">
                                    <span className="text-blue-900 font-bold text-sm sm:text-lg break-all">004137509016</span>
                                    <CopyButton text="004137509016" />
                                </div>
                            </div>
                            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 p-2.5 sm:p-3 bg-white rounded-lg border border-blue-100">
                                <span className="text-gray-600 font-medium text-sm sm:text-base">صاحب الحساب:</span>
                                <span className="text-blue-900 font-bold text-sm sm:text-base">Ayoub Hamadouche</span>
                            </div>
                            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 p-2.5 sm:p-3 bg-white rounded-lg border border-blue-100">
                                <span className="text-gray-600 font-medium text-sm sm:text-base">الموقع:</span>
                                <span className="text-blue-900 font-bold text-sm sm:text-base">برج بوعريريج</span>
                            </div>
                        </div>
                    </PaymentInfoCard>

                    {/* BARIDI MOB Payment */}
                    <PaymentInfoCard icon={Wallet} title="باريد موب (Baridi Mob)" variant="baridi">
                        <div className="space-y-2 sm:space-y-3 text-right">
                            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 p-2.5 sm:p-3 bg-white rounded-lg border border-green-100">
                                <span className="text-gray-600 font-medium text-sm sm:text-base">رقم الحساب:</span>
                                <div className="flex items-center gap-2 justify-end">
                                    <span className="text-green-900 font-bold text-sm sm:text-lg break-all">00799999004137509016</span>
                                    <CopyButton text="00799999004137509016" />
                                </div>
                            </div>
                        </div>
                    </PaymentInfoCard>
                </motion.div>

                {/* Email Instruction */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                    className="bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-xl p-4 sm:p-5"
                >
                    <div className="flex items-center justify-center gap-2 sm:gap-3 mb-3 sm:mb-4">
                        <Mail className="h-5 w-5 sm:h-6 sm:w-6 text-blue-600" />
                        <h4 className="text-lg sm:text-xl font-bold text-gray-900">إرسال إيصال الدفع</h4>
                    </div>
                    <p className="text-gray-700 text-center text-sm sm:text-base mb-3 sm:mb-4">
                        بعد إتمام الدفع، يرجى إرسال إيصال الدفع إلى البريد الإلكتروني التالي:
                    </p>
                    <div className="flex flex-col sm:flex-row justify-center items-center gap-2 sm:gap-3 p-3 sm:p-4 bg-white rounded-xl border-2 border-blue-300">
                        <a 
                            href="mailto:edenagencydz@gmail.com" 
                            className="text-blue-600 hover:text-blue-800 font-bold text-sm sm:text-lg underline break-all text-center"
                        >
                            edenagencydz@gmail.com
                        </a>
                        <CopyButton text="edenagencydz@gmail.com" />
                    </div>
                    <p className="text-xs sm:text-sm text-gray-500 text-center mt-2 sm:mt-3">
                        📧 سيتم تأكيد طلبك بعد التحقق من إيصال الدفع
                    </p>
                </motion.div>

                {/* Action Buttons */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 }}
                    className="mt-6 sm:mt-8 pt-5 sm:pt-8 border-t border-gray-100 flex flex-col sm:flex-row gap-3 sm:gap-4"
                >
                    <Button asChild size="lg" className="flex-1 text-sm sm:text-base font-semibold rounded-xl sm:rounded-2xl h-11 sm:h-14 bg-gray-900 hover:bg-gray-800 transition-all group">
                        <Link href="/">
                            <ShoppingBag className="ml-1.5 sm:ml-2 h-4 w-4 sm:h-5 sm:w-5" />
                            متابعة التسوق
                            <ArrowRight className="mr-1.5 sm:mr-2 h-4 w-4 sm:h-5 sm:w-5 opacity-0 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                        </Link>
                    </Button>
                    <Button asChild variant="outline" size="lg" className="flex-1 text-sm sm:text-base font-medium rounded-xl sm:rounded-2xl h-11 sm:h-14 hover:bg-gray-50 text-gray-700 border-2">
                        <Link href="/contact">
                            <Mail className="ml-1.5 sm:ml-2 h-4 w-4 sm:h-5 sm:w-5" />
                            تواصل معنا
                        </Link>
                    </Button>
                </motion.div>

                {/* Support Note */}
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8 }}
                    className="text-center text-xs sm:text-sm text-gray-500"
                >
                    💬 هل تحتاج مساعدة؟ تواصل معنا على edenagencydz@gmail.com
                </motion.p>
            </motion.div>
        </div>
    );
}

export default function ThankYouPage() {
    return (
        <Suspense fallback={null}>
            <ThankYouPageContent />
        </Suspense>
    );
}
