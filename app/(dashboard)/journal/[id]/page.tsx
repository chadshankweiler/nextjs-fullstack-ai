import Analysis from "@/components/Analysis";
import Editor from "@/components/Editor";
import { getUserByClerkId } from "@/utils/auth";
import { prisma } from "@/utils/db";

const getEntry = async (id) => {
    const user = await getUserByClerkId();
    const data = await prisma.journalEntry.findUnique({
        where: {
            id: id,
            userId: user.id,
        },
        include: {
            analysis: true,
        },
    });

    return data;
};

const JournalPage = async ({ params }) => {
    const entry = await getEntry(params.id);
    return (
        <div className="h-full w-full"> 
            <Editor entry={entry} />
        </div>
    );
};

export default JournalPage;
