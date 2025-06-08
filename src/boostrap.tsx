import React from 'react';
import ReactDOM from 'react-dom/client';
import { Button, CssBaseline, Stack, ThemeProvider } from '@mui/material';
import { lightTheme } from '@softland/design-system';
import { SnackbarProvider } from 'notistack';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import './index.css';
import { IdentityContext } from '@softland/backoffice_identity';
import axios from 'axios';
import { I18nService, InternationalizationProvider } from '@softland/admin-internationalization';
import CampaignApp from './modules/campaign/CampaignApp';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

const url =
  process.env.NODE_ENV === 'development' && process.env.REACT_APP_API_URL
    ? process.env.REACT_APP_API_URL
    : '/';
export const iService = new I18nService({
  useLanguageDetectors: true,
  queryFn: async (scope, lng) => {
    const { data } = await axios.get<any[]>(
      `${url}api/cmsgateway/api/v1/backofficeTranslations/cache`,
      {
        params: {
          appScopes: [scope],
        },
        headers: {
          'Accept-Language': lng,
        },
      }
    );
    return data[0].translations;
  },
});

iService.init({
  scope: 'Common',
  fallbackLng: 'en',
  lng: 'en',
  supportedLngs: ['en'],
});

const getMe = () => axios.get(`${url}api/v1/me`);

getMe().then((data: any) => {
  const userPermissionsMap = new Map<string, Set<string>>();
  Object.entries(data.data.user.permissions).forEach(([scope, permissions]) => {
    userPermissionsMap.set(scope, new Set(permissions as any));
  });

  root.render(
    <BrowserRouter>
      <React.StrictMode>
        <IdentityContext.Provider
          value={{ identity: { ...data.data.user, permissions: userPermissionsMap } }}
        >
          <InternationalizationProvider serviceInstance={iService}>
            <ThemeProvider theme={lightTheme}>
              <CssBaseline />
              <SnackbarProvider>
                <Routes>
                  <Route
                    path="/"
                    element={
                      <Stack
                        direction="row"
                        spacing={2}
                        height="100%"
                        justifyContent="center"
                        alignItems="center"
                      >
                        <Link rel="stylesheet" to="/bonus-campaign">
                          <Button variant="contained">Campaign</Button>
                        </Link>
                      </Stack>
                    }
                  />
                  <Route
                    path="/bonus-campaign/*"
                    element={<CampaignApp basepath="/bonus-campaign" configs={[]} />}
                  />
                </Routes>
              </SnackbarProvider>
            </ThemeProvider>
          </InternationalizationProvider>
        </IdentityContext.Provider>
      </React.StrictMode>
    </BrowserRouter>
  );
});

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
