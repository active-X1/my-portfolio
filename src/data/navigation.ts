export interface NavItem {
  label: string;
  href: string;
  description?: string;
}

export const primaryNav: NavItem[] = [
  { label: "About", href: "/about" },
  { label: "Projects", href: "/projects" },
  { label: "Stacks", href: "/stacks" },
  { label: "Blog", href: "/blog" },
];

export const moreNav: NavItem[] = [
  { label: "Gallery", href: "/gallery", description: "Screenshots and milestones" },
  { label: "Certificates", href: "/certificates", description: "Verified qualifications" },
  { label: "Reviews", href: "/reviews", description: "Feedback from collaborators" },
];

export const contactNav: NavItem = { label: "Contact", href: "/contact" };

export const allNav: NavItem[] = [
  { label: "Home", href: "/" },
  ...primaryNav,
  ...moreNav,
  contactNav,
];
