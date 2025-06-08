import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { MFEConfigModel } from '@softland/mfe-loader';
import { MFEConfigProvider } from '@softland/contexts';
import { CampaignRoutes } from './CampaignRoutes';

const queryApp = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
    },
  },
});
type AppConfig = MFEConfigModel[];

interface AppProps {
  configs: AppConfig;
  basepath: string;
}

function CampaignApp({ basepath, configs }: AppProps) {
  return (
    <MFEConfigProvider value={{ basepath, config: configs }}>
      <QueryClientProvider client={queryApp}>
        <CampaignRoutes />
      </QueryClientProvider>
    </MFEConfigProvider>
  );
}

// eslint-disable-next-line import/no-default-export
export default CampaignApp;
