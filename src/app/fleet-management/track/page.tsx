import { FleetTracking } from "@/components/showcase/fleet-management";
import { FleetManagementLayout } from "@/components/layouts/fleet-management-layout";

export default function TrackPage() {
  return (
    <FleetManagementLayout>
      <FleetTracking />
    </FleetManagementLayout>
  );
} 