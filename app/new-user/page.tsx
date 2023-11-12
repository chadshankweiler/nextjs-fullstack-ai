import { UserButton } from "@clerk/nextjs";

const NewUser = () => {
    return (
        <div>
            <UserButton afterSignOutUrl="127.0.0.1:3000"/>
        </div>
    );
};

export default NewUser;
