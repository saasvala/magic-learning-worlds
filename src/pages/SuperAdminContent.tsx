import CurriculumExplorer from "@/components/CurriculumExplorer";
import { SuperAdminPageShell } from "@/components/SuperAdminPageShell";

export default function SuperAdminContent() {
  return (
    <SuperAdminPageShell>
      <CurriculumExplorer />
    </SuperAdminPageShell>
  );
}
