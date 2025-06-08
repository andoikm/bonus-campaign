import { FC, Fragment, useState } from 'react';
import { TabContent, TabModel, TabsWithActions } from '../../../common/components/TabsWithActions';
import { Typography } from '@mui/material';
import { useTranslation } from '@softland/admin-internationalization';
import { EmptyPlaceholder } from '@softland/design-system';
import { Delete as DeleteFilled, Edit as EditFilled } from '@mui/icons-material';
import { AddTemplateModalWhitButton } from '../AddTemplateModal/AddTemplateModalWhitButton';
import { TemplateBaseModel } from '../../models/templates-api.model';
import { CampaignBonusForm } from './CampaignBonusForm';
import { WithTemplate } from '../hoc/WithTemplate';

export const CampaignBonuses: FC = () => {
  const { t } = useTranslation();

  const [activeTemplateId, setActiveTemplateId] = useState<number | null>(null);
  const [templateTabs, setTemplateTabs] = useState<TabModel[]>([]);

  const handleDeleteBonus = (tabId: number) => {
    setTemplateTabs(tabs => {
      const newTabs = tabs.filter(tabs => tabs.id !== tabId);
      setActiveTemplateId(newTabs[0]?.id ?? null);
      return newTabs;
    });
  };

  const handleSelect = (template: TemplateBaseModel) => {
    setTemplateTabs(prev => [
      ...prev,
      {
        id: template.id,
        title: template.name,
      },
    ]);
    setActiveTemplateId(template.id);
  };

  const tabsWithActions = templateTabs.map(tab => ({
    ...tab,
    menuItems: [
      {
        title: t('edit'),
        icon: EditFilled,
        onClick: () => {},
        disabled: false,
      },
      {
        title: t('delete'),
        icon: DeleteFilled,
        onClick: () => handleDeleteBonus(tab.id),
        disabled: false,
      },
    ],
  }));

  return (
    <Fragment>
      <Typography mb={2} variant="subtitle1">
        {t('bonuses')}
      </Typography>
      <TabsWithActions
        activeTab={activeTemplateId}
        onChange={tab => setActiveTemplateId(tab)}
        tabs={tabsWithActions}
        extraComponents={<AddTemplateModalWhitButton onSelect={handleSelect} />}
      />
      {activeTemplateId && (
        <TabContent>
          <WithTemplate templateId={activeTemplateId}>
            {({ template }) => <CampaignBonusForm key={activeTemplateId} template={template} />}
          </WithTemplate>
        </TabContent>
      )}

      {tabsWithActions.length === 0 && (
        <EmptyPlaceholder placeholder={t('bonuses_empty_placeholder')} />
      )}
    </Fragment>
  );
};
