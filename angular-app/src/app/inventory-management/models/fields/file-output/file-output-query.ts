import { ConfigurationOutput } from '../configuration-output';

export class FileOutputQuery extends ConfigurationOutput {
  fileOutputType!: string;
  fileOutputExtension!: string;
  filePath!: string;
}
