import { FC } from 'react';
import { CampaignDetailsView, CampaignDetailsViewProps } from './CampaignDetailsView';
import { CampaignDetailsCreate, CampaignDetailsCreateProps } from './CampaignDetailsCreate';
import { CampaignDetailsEdit, CampaignDetailsEditProps } from './CampaignDetailsEdit';

export const enum CampaignDetailsEnum {
  VIEW = 'view',
  CREATE = 'create',
  EDIT = 'edit',
}

type CampaignDetailsProps =
  | ({ mode: CampaignDetailsEnum.VIEW } & CampaignDetailsViewProps)
  | ({ mode: CampaignDetailsEnum.CREATE } & CampaignDetailsCreateProps)
  | ({ mode: CampaignDetailsEnum.EDIT } & CampaignDetailsEditProps);

export const CampaignDetails: FC<CampaignDetailsProps> = props => {
  switch (props.mode) {
    case CampaignDetailsEnum.CREATE:
      return <CampaignDetailsCreate {...props} />;
    case CampaignDetailsEnum.EDIT:
      return <CampaignDetailsEdit {...props} />;
    case CampaignDetailsEnum.VIEW:
      return <CampaignDetailsView {...props} />;
  }
};
