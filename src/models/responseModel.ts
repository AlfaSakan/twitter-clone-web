export interface Response<DataType> {
  status: number;
  message: string;
  data: DataType | undefined;
}
