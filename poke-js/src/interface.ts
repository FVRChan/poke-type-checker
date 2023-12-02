export interface typeCheckerI {
    [index: string]: boolean;
  }
  export interface typeToString {
    [index: string]: string;
  }
  export interface typeToEffects {
    [index: string]: { [index: string]: number };
  }
