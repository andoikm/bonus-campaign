import { FC, ReactElement } from 'react';
import { useGetTemplate } from '../../api/hooks/useGetTemplate';
import { WithLoading } from '../../../common/components/hoc/WithLoading';
import { ErrorComponent } from '../../../common/components/ErrorComponent';
import { TemplateModel } from '../../models/templates-api.model';

interface WithTemplateProps {
  templateId: number;
  children: (props: { template: TemplateModel }) => ReactElement;
}

export const WithTemplate: FC<WithTemplateProps> = ({ templateId, children }) => {
  const { data, isFetching, isError } = useGetTemplate<TemplateModel>(templateId);

  if (isError) {
    return <ErrorComponent />;
  }

  return (
    <WithLoading loading={isFetching} height="100%">
      {data ? children({ template: data }) : null}
    </WithLoading>
  );
};
