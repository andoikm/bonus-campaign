import { createContext, FC, PropsWithChildren, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { WebsiteModel } from '../models/website.model';
import { useGetWebsiteById } from '../api/hooks/useGetWebsiteById';
import { ErrorComponent } from '../components/ErrorComponent';
import { Loading } from '../components/Loading';

const WebsiteContext = createContext<WebsiteModel | null>(null);

export const useWebsite = (): WebsiteModel => {
  const context = useContext(WebsiteContext);
  if (!context) {
    throw new Error('useWebsiteInfo must be used within a WebsiteInfoProvider');
  }
  return context;
};

export const WebsiteProvider: FC<PropsWithChildren> = ({ children }) => {
  const { siteId } = useParams();
  const id = Number(siteId);

  const { data: website, isFetching, isError } = useGetWebsiteById(id);

  if (isFetching) {
    return <Loading />;
  }

  if (isError || !website) {
    return <ErrorComponent />;
  }

  return <WebsiteContext.Provider value={website}>{children}</WebsiteContext.Provider>;
};
