import { Settings as SettingsIcon } from "lucide-react";

const SettingsPage = () => {
  return (
    <div className="space-y-6 animate-slide-up">
      <div>
        <h1 className="font-heading text-2xl font-bold flex items-center gap-2">
          <SettingsIcon className="w-6 h-6 text-primary" /> Settings
        </h1>
        <p className="text-sm text-muted-foreground">Platform configuration and preferences</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="indra-card p-5">
          <h3 className="font-heading font-semibold text-sm mb-4">General Settings</h3>
          <div className="space-y-4">
            {[
              { label: "Platform Language", value: "English" },
              { label: "Timezone", value: "IST (UTC+5:30)" },
              { label: "Data Refresh Rate", value: "Real-time" },
              { label: "Alert Notifications", value: "Enabled" },
            ].map(s => (
              <div key={s.label} className="flex items-center justify-between py-2 border-b border-border/50">
                <span className="text-sm">{s.label}</span>
                <span className="text-sm text-muted-foreground">{s.value}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="indra-card p-5">
          <h3 className="font-heading font-semibold text-sm mb-4">Data Sources</h3>
          <div className="space-y-3">
            {[
              { name: "IMD Weather API", status: "Connected" },
              { name: "ISRO Satellite Feed", status: "Connected" },
              { name: "Census Database", status: "Connected" },
              { name: "Mandi Price API", status: "Connected" },
              { name: "Social Media Monitor", status: "Connected" },
            ].map(d => (
              <div key={d.name} className="flex items-center justify-between p-2 rounded-lg bg-muted/30">
                <span className="text-sm">{d.name}</span>
                <span className="text-xs status-success px-2 py-0.5 rounded">{d.status}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
