import { FieldResponse } from '../field-response';
import { LinkOutputQuery } from './link-output-query';
import { LinkOutputResponse } from './link-output-response';
import { LinkOutputUpdate } from './link-output-update';

export class LinkOutputConfigurationPage {
  fieldConfiguration: LinkOutputQuery = new LinkOutputQuery();
  fieldResponse: LinkOutputResponse = new LinkOutputResponse();
  fieldUpdated: LinkOutputUpdate = new LinkOutputUpdate();
}
