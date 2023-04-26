import { ConfigurationInput } from '../configuration-input';

export class FileInputQuery extends ConfigurationInput {
  fileInputtype!: string;
  fileInputExtension!: string;
  minSize!: number;
  maxSize!: number;
}
