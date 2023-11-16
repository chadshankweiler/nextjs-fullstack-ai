import { getUserByClerkId } from "@/utils/auth";
import { prisma } from "@/utils/db";
import { revalidatePath } from "next/cache";

export const POST = async () => {
    const user = await getUserByClerkId();
    const entry = await prisma.journalEntry.create({
        data: {
            userId: user.id,
            content: "Tell me about your day",
        },
    });

    revalidatePath("/journal");

    return Response.json({ data: entry });
};
