export type TokenParams = {
  account_number: string;
  account_type: string;
  job: string;
  mode: string;
  org_name: string;
  routing_number: string;
  skip_exit_survey: boolean;
  skip_intro_screen: boolean;
};

export type Event = {
  eventName: string;
  payload: any;
};
