import { z } from "zod"

// Product schema - types will be inferred from this
export const ProductSchema = z.object({
  id: z.string(),
  name: z.string(),
  price: z.number().positive(),
  originalPrice: z.number().positive().optional(),
  image: z.string(),
  rating: z.number().min(0).max(5),
  reviews: z.number().min(0),
  category: z.string().optional(),
  badge: z.string().optional(),
  description: z.string().optional(),
  images: z.array(z.string()).optional(),
  colors: z
    .array(
      z.object({
        name: z.string(),
        value: z.string(),
      }),
    )
    .optional(),
  sizes: z.array(z.string()).optional(),
  features: z.array(z.string()).optional(),
})

// Cart item schema
export const CartItemSchema = z.object({
  id: z.string(),
  name: z.string(),
  price: z.number().positive(),
  image: z.string(),
  quantity: z.number().min(1),
})

// User schema
export const UserSchema = z.object({
  id: z.string(),
  email: z.string().email(),
  firstName: z.string(),
  lastName: z.string(),
})

// Auth forms schemas
export const SignInSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
})

export const SignUpSchema = z
  .object({
    firstName: z.string().min(1, "First name is required"),
    lastName: z.string().min(1, "Last name is required"),
    email: z.string().email("Please enter a valid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  })

export const ForgotPasswordSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
})

// Checkout form schema
export const CheckoutSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  fullName: z.string().min(1, "Full name is required"),
  phone: z.string().min(1, "Phone number is required"),
})

// Contact form schema
export const ContactSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().optional(),
  subject: z.string().min(1, "Subject is required"),
  message: z.string().min(10, "Message must be at least 10 characters"),
  orderNumber: z.string().optional(),
})

// Infer types from schemas
export type Product = z.infer<typeof ProductSchema>
export type CartItem = z.infer<typeof CartItemSchema>
export type User = z.infer<typeof UserSchema>
export type SignInForm = z.infer<typeof SignInSchema>
export type SignUpForm = z.infer<typeof SignUpSchema>
export type ForgotPasswordForm = z.infer<typeof ForgotPasswordSchema>
export type CheckoutForm = z.infer<typeof CheckoutSchema>
export type ContactForm = z.infer<typeof ContactSchema>
