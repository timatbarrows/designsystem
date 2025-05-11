// themes/theme.ts
export type ComponentStyle = Record<string, string>;

export type ModalStyle = {
  container: string;
  overlay: string;
  content: string;
  toasterText: string;
  toasterPositionTopLeft: string;
  toasterPositionTopCenter: string;
  toasterPositionTopRight: string;
  toasterPositionBottomLeft: string;
  toasterPositionBottomCenter: string;
  toasterPositionBottomRight: string;
  modalCloseButton: string;
  toasterWrapper: string;
  toasterContent: string;
  toasterCloseButton: string;
  animateInTopLeft: string,
  animateOutTopLeft: string,
  animateInTopCenter: string,
  animateOutTopCenter: string,  
  animateInTopRight: string,
  animateOutTopRight: string,
  animateInBottomLeft: string,
  animateOutBottomLeft: string,
  animateInBottomCenter: string,
  animateOutBottomCenter: string,
  animateInBottomRight: string,
  animateOutBottomRight: string,
  animateIn: string,
  animateOut: string,
};

export interface Theme {
  CheckBox: ComponentStyle;
  Toggle: ComponentStyle;
  RadioButton: ComponentStyle;
  Input: ComponentStyle;
  TextArea: ComponentStyle;
  CodeBlock: ComponentStyle;
  Button: ComponentStyle;
  DatePicker: ComponentStyle;
  FileUploader: ComponentStyle;
  modal: ModalStyle;
  Select: ComponentStyle;
}
