export interface IProps {
  navigation: any;
  locale: string;
  dispatch(fun: object): any;
  handleSubmit(fun: object): any;
  loading: boolean;
  initialValues: any;
  roleId: number | string;
  isCreateScreen: boolean;
  isEditScreen: boolean;
  isAllowToEdit: boolean;
  isAllowToDelete: boolean;
  permissions: Array<any>;
  formattedPermissions: Array<any>;
  theme: any;
  formData: any;
}

export interface IStates {
  isFetchingInitialData: boolean;
}
