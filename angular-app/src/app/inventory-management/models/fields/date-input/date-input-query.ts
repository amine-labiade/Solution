import { ConfigurationInput } from "../configuration-input";

export class DateInputQuery extends ConfigurationInput {
    minDate! : Date;
    maxDate! : Date;
}