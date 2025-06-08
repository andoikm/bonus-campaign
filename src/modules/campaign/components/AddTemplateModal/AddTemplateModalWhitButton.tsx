import { FC, Fragment, useState } from 'react';
import { Button } from '@mui/material';
import { AddOutlined } from '@mui/icons-material';
import { AddTemplateModal } from './AddTemplateModal';
import { useTranslation } from '@softland/admin-internationalization';
import { TemplateBaseModel } from '../../models/templates-api.model';

interface AddTemplateModalWhitButtonProps {
  onSelect: (payload: TemplateBaseModel) => void;
}

export const AddTemplateModalWhitButton: FC<AddTemplateModalWhitButtonProps> = ({ onSelect }) => {
  const { t } = useTranslation();
  const [open, setOpen] = useState<boolean>(false);

  const handleSelect = (payload: TemplateBaseModel) => {
    onSelect(payload);
    setOpen(false);
  };

  return (
    <Fragment>
      <Button startIcon={<AddOutlined />} onClick={() => setOpen(true)} disabled={false}>
        {t('add_bonus')}
      </Button>
      {open && <AddTemplateModal onClose={() => setOpen(false)} onSelect={handleSelect} />}
    </Fragment>
  );
};
