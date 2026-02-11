/** Navigation link */
export interface NavItem {
  label: string;
  href: string;
}

/** Product card data */
export interface Product {
  title: string;
  description: string;
  icon: string;
  comingSoon?: boolean;
  link?: string
  target?: string
}

/** Feature card data */
export interface Feature {
  title: string;
  description: string;
  icon: string;
}

/** Team member data */
export interface TeamMember {
  name: string;
  role: string;
  bio: string;
}

/** Contact form data */
export interface ContactFormData {
  fullName: string;
  email: string;
  company: string;
  subject: string;
  message: string;
}
