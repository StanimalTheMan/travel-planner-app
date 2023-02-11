import Card from "./Card";
import SidebarLink from "./SidebarLink";

const links = [
  { label: "Home", icon: "Grid", link: "/home" },
  {// in future, do I want to have a calendar for users to specify when they want to visit a place by,
  // complete actions at that place by etc.?
    label: "Calendar",
    icon: "Calendar",
    link: "/calendar",
  },
  { label: "Profile", icon: "User", link: "/profile" },
  {
    label: "Settings",
    icon: "Settings",
    link: "/settings",
  },
];

const Sidebar = () => {
  return (
    <Card className="h-full w-40 flex items-center justify-between flex-wrap">
      {links.map((link) => (
        <SidebarLink key={link} link={link} />
      ))}
    </Card>
  )
}

export default Sidebar;