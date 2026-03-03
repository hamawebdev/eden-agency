"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CheckCircle2, ArrowRight, ShoppingBag } from "lucide-react";
import { motion } from "framer-motion";
import { useEffect } from "react";
import * as fbq from "@/lib/fb-pixel";

export default function ThankYouPage() {
    useEffect(() => {
        // Fire Facebook Pixel Purchase event
        fbq.event("Purchase", { currency: "DA", value: 0.00 }); // Value can be updated dynamically if orders are passed here
    }, []);

    return (
        <div className="min-h-[80vh] flex items-center justify-center bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
            <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="max-w-md w-full space-y-8 bg-white p-10 rounded-3xl shadow-2xl shadow-green-100/50 text-center"
            >
                <motion.div
                    initial={{ scale: 0, rotate: -45 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ delay: 0.2, type: "spring", stiffness: 200, damping: 15 }}
                    className="mx-auto flex items-center justify-center h-28 w-28 rounded-full bg-green-50 shadow-inner"
                >
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.4, type: "spring", stiffness: 200 }}
                    >
                        <CheckCircle2 className="h-16 w-16 text-green-500" />
                    </motion.div>
                </motion.div>

                <div className="space-y-4 mt-8">
                    <motion.h2
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="text-3xl font-extrabold text-gray-900 tracking-tight"
                    >
                        Thank you for your order!
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className="text-base text-gray-500 leading-relaxed"
                    >
                        We&apos;ve successfully received your order. We&apos;ll be in touch shortly with your account details and next steps.
                    </motion.p>
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="mt-10 pt-8 border-t border-gray-100 flex flex-col space-y-4"
                >
                    <Button asChild size="lg" className="w-full text-base font-semibold rounded-2xl h-14 bg-gray-900 hover:bg-gray-800 transition-all group">
                        <Link href="/">
                            <ShoppingBag className="mr-2 h-5 w-5" />
                            Continue Shopping
                            <ArrowRight className="ml-2 h-5 w-5 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                        </Link>
                    </Button>
                    <Button asChild variant="ghost" size="lg" className="w-full text-base font-medium rounded-2xl h-14 hover:bg-gray-50 text-gray-600">
                        <Link href="/contact">
                            Contact Support
                        </Link>
                    </Button>
                </motion.div>
            </motion.div>
        </div>
    );
}
