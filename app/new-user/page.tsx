import { prisma } from "@/utils/db";
import { UserButton, currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";

const createNewUser = async () => {
    const user = await currentUser();
    console.log(user.id);
    const match = await prisma.user.findUnique({
        where: {
            clerkId: user.id as String,
        },
    });

    if (!match) {
        await prisma.user.create({
            data: {
                clerkId: user.id,
                email: user?.emailAddresses[0].emailAddress
            },
        });
    }

    redirect("/journal");
};

const NewUser = async () => {
    await createNewUser();
    return (
        <div>
            <UserButton afterSignOutUrl="127.0.0.1:3000" />
        </div>
    );
};

export default NewUser;
