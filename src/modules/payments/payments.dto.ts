export enum VerifyResult {
  Confirmed = 'Confirmed',
  Declined = 'Declined',
}

export class VerifyOrderResponseDto {
  status: VerifyResult
}
