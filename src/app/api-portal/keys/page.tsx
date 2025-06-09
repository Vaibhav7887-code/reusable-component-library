import { ApiKeysCard } from "@/components/molecules/api-portal/api-keys-card";

export default function ApiKeysPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">API Keys</h1>
        <p className="text-muted-foreground">
          Manage your API keys and access credentials
        </p>
      </div>
      <ApiKeysCard />
    </div>
  );
} 