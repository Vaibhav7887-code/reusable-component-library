import { FleetDashboard } from "@/components/showcase/fleet-management";
import { FleetManagementLayout } from "@/components/layouts/fleet-management-layout";

export default function InsightsPage() {
  return (
    <FleetManagementLayout>
      <FleetDashboard />
    </FleetManagementLayout>
  );
} 