

export interface SendOTPAPI {
  success: boolean;
  message: string;
}

export interface PurchasedPackageType {
  id: string;
  isTrash: boolean;
  userId: string;
  createdAt: string;
  updatedAt: string;
}