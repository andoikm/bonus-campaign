import { FC, PropsWithChildren } from 'react';
import { Button, ButtonProps, CircularProgress } from '@mui/material';
import { Dialog } from '@softland/design-system';
import { useTranslation } from '@softland/admin-internationalization';

interface ConfirmProps {
  title: string;
  loading?: boolean;
  onClose: () => void;
  onConfirm: () => void;
  cancelButtonText?: string;
  confirmButtonText?: string;
  cancelButtonProps?: ButtonProps;
  confirmButtonProps?: ButtonProps;
}

export const Confirm: FC<PropsWithChildren<ConfirmProps>> = ({
  title,
  loading = false,
  onClose,
  onConfirm,
  cancelButtonProps = {},
  confirmButtonProps = {},
  cancelButtonText = 'cancel',
  confirmButtonText = 'confirm',
  children,
}) => {
  const { t } = useTranslation();
  return (
    <Dialog
      actionButtons={[
        <Button onClick={onClose} key="0" {...cancelButtonProps}>
          {t(cancelButtonText)}
        </Button>,
        <Button
          onClick={onConfirm}
          key="1"
          variant="contained"
          disabled={loading}
          startIcon={loading && <CircularProgress size={18} />}
          {...confirmButtonProps}
        >
          {t(confirmButtonText)}
        </Button>,
      ]}
      onClose={onClose}
      dialogTitle={title}
    >
      {children}
    </Dialog>
  );
};
