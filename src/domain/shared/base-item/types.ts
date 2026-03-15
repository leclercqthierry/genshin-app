export type BaseItem = {
    id: number;
    name: string;
    iconUrl: string;
    createdAt: string;
};

export type DeleteAction = (
    formData: FormData
) => Promise<{ success: boolean; message?: string }>;