export class ApiResponseDto {
  success!: boolean;
  message!: string;
  data!: any;
}

export class ApiResponseDtoTyped<T> {
  success!: boolean;
  message!: string;
  data!: T;
}
