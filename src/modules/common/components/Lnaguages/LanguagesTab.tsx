import { FC } from 'react';
import { CircularProgress, IconButton, Stack, Tab, Tabs, Typography } from '@mui/material';
import { styled } from '@mui/system';
import type { TabProps } from '@mui/material/Tab';
import { ClearIcon } from '@softland/x-premium/date-pickers-pro';
import { LanguageAddButton } from './LanguageAddButton';
import { useGetWebsiteLanguages } from '../../utils/hooks/useGetWebsiteLanguages';

export const enum TabModeEnum {
  VIEW = 'view',
  EDIT = 'edit',
}

const StyledContainer = styled(Stack)(({ theme }) => ({
  borderBottom: '1px solid',
  borderColor: theme.palette.divider,
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
}));

const StyledTabs = styled(Tabs)(() => ({
  'minHeight': '42px',
  '& .MuiTabs-scrollButtons.Mui-disabled': {
    display: 'none',
  },
}));

interface CustomTabProps extends TabProps {
  hasError?: boolean;
}

const StyledTab = styled(({ hasError, ...props }: CustomTabProps) => (
  <Tab {...props} />
))<CustomTabProps>(({ theme, hasError }) => ({
  'borderRadius': 0,
  'border': 'none',
  'boxShadow': 'none',
  'height': '100%',
  'maxHeight': '42px',
  'color': hasError ? theme.palette.error.main : undefined,

  '&.Mui-selected': {
    color: hasError ? theme.palette.error.main : theme.palette.primary.main,
    backgroundColor: theme.palette.background.paper,
  },
}));

export interface LanguagesTabProps {
  mode: TabModeEnum;
  errors: string[];
  existingLanguages: string[];
  selectedLanguage: string;
  onAddLanguage?: (language: string) => void;
  onDeleteLanguage?: (language: string) => void;
  onSelectLanguage: (language: string) => void;
}

export const LanguagesTab: FC<LanguagesTabProps> = ({
  mode,
  errors = [],
  existingLanguages,
  onAddLanguage,
  onDeleteLanguage,
  onSelectLanguage,
  selectedLanguage,
}) => {
  const { data: languages, isFetching } = useGetWebsiteLanguages();

  if (isFetching) {
    return <CircularProgress size="20px" />;
  }

  if (!languages) {
    return null;
  }

  const existingLanguagesSet = new Set(existingLanguages);
  const languagesTabs = languages.supportedLanguages.filter(({ key }) =>
    existingLanguagesSet.has(key)
  );
  const availableLanguages = languages.supportedLanguages.filter(
    ({ key }) => !existingLanguagesSet.has(key)
  );

  return (
    <StyledContainer flexShrink={0}>
      <StyledTabs
        value={selectedLanguage || ''}
        onChange={(e, value: string) => onSelectLanguage(value)}
        variant="scrollable"
      >
        {languagesTabs.map(({ name, key }) => (
          <StyledTab
            key={key}
            component="span"
            hasError={errors.includes(key)}
            label={
              <Stack direction="row" gap={0.5} alignItems="center">
                <Typography variant="button" fontSize="14px">
                  {name}{' '}
                  {key === languages.defaultLanguage!.key && (
                    <Typography variant="caption" textTransform="none">
                      (main)
                    </Typography>
                  )}
                </Typography>
                {key !== languages.defaultLanguage!.key && mode === TabModeEnum.EDIT && (
                  <IconButton
                    size="small"
                    onClick={e => {
                      e.stopPropagation();
                      onDeleteLanguage?.(key);
                    }}
                  >
                    <ClearIcon fontSize="small" />
                  </IconButton>
                )}
              </Stack>
            }
            value={key}
          />
        ))}
      </StyledTabs>
      {mode === TabModeEnum.EDIT && (
        <LanguageAddButton
          languages={availableLanguages}
          onAdd={({ key }) => onAddLanguage?.(key)}
        />
      )}
    </StyledContainer>
  );
};
