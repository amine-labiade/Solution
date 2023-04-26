export class StepQuery {
    id? :string;
    name! :string;
    description! :string;
    creationDate : string = (new Date()).toISOString();
    previousStepId! : string ;
    stepFields : any[] = []
} 