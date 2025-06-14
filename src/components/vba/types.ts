
export interface VBARequirements {
  projectName: string;
  description: string;
  sourceRange: string;
  targetRange: string;
  transformations: string[];
  formatting: string[];
  errorHandling: boolean;
  optimization: boolean;
}

export interface VBARequirementsFormProps {
  onRequirementsChange: (requirements: VBARequirements) => void;
  onCodeGenerated: (code: string) => void;
}
