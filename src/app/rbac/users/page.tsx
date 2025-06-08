import { UserManagementPage } from "@/rbac/pages/users";

export default function UsersPage() {
  return <UserManagementPage />;
}
 
export const metadata = {
  title: "User Management - RBAC System",
  description: "Manage user access, roles, and permissions across FleetEdge modules",
}; 