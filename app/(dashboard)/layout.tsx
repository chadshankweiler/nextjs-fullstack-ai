import { UserButton, UserProfile } from "@clerk/nextjs";

const links = [
    { href: "/", label: "Home" },
    { href: "/journal", label: "Journal" },
];

const DashboardLayout = ({ children }) => {
    return (
        <div className="h-screen w-screen relative">
            <aside className="absolute w-[200px] top-0 left-0 h-full border-r border-black/20 ">
                <ul>
                    {links.map((link) => (
                        <li key={link.label}>
                            <a href={link.href}> 
                                {link.label}
                            </a>
                        </li>
                    ))}
                </ul>
            </aside>
            <div className="ml-[200px] h-full">
                <header className="h-[60px] border-b border-black/20">
                    <div className="h-full w-full px-6 flex items-center justify-end">
                        <UserButton />
                    </div>
                </header>
                <div className="h-[calc(100vh-60px)]">{children}</div>
            </div>
        </div>
    );
};

export default DashboardLayout;
