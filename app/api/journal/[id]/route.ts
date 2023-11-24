import { analyse } from "@/utils/ai";
import { getUserByClerkId } from "@/utils/auth";
import { prisma } from "@/utils/db";
import { NextResponse } from "next/server";

export const PATCH = async (
    request: Request,
    { params }: { params: { id: string } }
) => {
    const { content } = await request.json();
    const user = await getUserByClerkId();
    const updateEntry = await prisma.journalEntry.update({
        where: {
            userId: user.id,
            id: params.id,
        },
        data: {
            content: content,
        },
    });

    const analysis = await analyse(updateEntry.content);

    const updateAnalysis = await prisma.analysis.upsert({
        where: {
            entryId: updateEntry.id,
        },
        create: {
            userId: user.id,
            entryId: updateEntry.id,
            ...analysis,
        },
        update: analysis,
    });

    return NextResponse.json({ data: { ...updateEntry, analysis: updateAnalysis } });
};
