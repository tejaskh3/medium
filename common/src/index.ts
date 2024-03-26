import z from "zod";

// will be used by backend
export const signUpInput = z.object({
  email: z.string().email(),
  password: z.string(),
  name: z.string(),
});

export const signInInput = z.object({
    email: z.string().email(),
    password: z.string(),
});

export const createBlogInput = z.object({
    title: z.string(),
    content: z.string(),
    thumbnail: z.string(),
});


export const updateBlogInput = z.object({
    title: z.string().optional(),
    content: z.string().optional(),
});

// will be used by frontend
export type SignUpType = z.infer<typeof signUpInput>;
export type SignInType = z.infer<typeof signInInput>;
export type CreateBlogType = z.infer<typeof createBlogInput>;
export type UpdateBlogType = z.infer<typeof updateBlogInput>;
