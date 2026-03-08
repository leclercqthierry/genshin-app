import { registerSchema } from "@/domain/auth/schema/register";

export function parseRegisterForm(formData: FormData) {
    const raw = {
        pseudo: formData.get("pseudo")?.toString() ?? "",
        email: formData.get("email")?.toString() ?? "",
        password: formData.get("password")?.toString() ?? "",
        password2: formData.get("password2")?.toString() ?? "",
    };

    return registerSchema.safeParse(raw);
}