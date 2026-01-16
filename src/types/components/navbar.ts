export interface PropsNavbar {
    navLinks: Links[];
    href?: string;
}

interface Links {
    href: string;
    label: string;
}