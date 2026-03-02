import { FileText, LayoutDashboard, Phone, Settings, ShoppingBag, User } from "lucide-react";

export const sidebarConfig = {
    admin: [
        { label: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
        { label: "Products", path: "/products", icon: FileText },
        { label: "Invoices", path: "/invoices",icon: User },
        { label: "Profile", path: "/profile", icon: Settings }
    ],

    staff: [
        { label: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
        { label: "Invoices", path: "/invoices", icon: FileText  },
        { label: "Create Invoice", path: "/invoice/create", icon: User },
        { label: "Profile", path: "/profile", icon: Settings }
    ],

    customer: [
        { label: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
        { label: "Shop", path: "/products", icon: ShoppingBag },
        { label: "My Invoices", path: "/invoices", icon: FileText },
        { label: "Contact", path: "/contact", icon: Phone },
        { label: "Profile", path: "/profile", icon: Settings }
    ]
};