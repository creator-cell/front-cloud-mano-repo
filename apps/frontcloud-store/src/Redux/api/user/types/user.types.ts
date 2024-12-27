export interface UserData {
    UserID: number;
    UserName: string;
    Email: string;
    RoleID: number;
    StoreID: number;
    StoreName: string;
    OwnerName: string;
    Location: string;
    TotalSales: number;
    RoleName: string;
}

export interface UserResponse {
    Message: string;
    Data: UserData;
}


export interface AddtoCartPayloadType {
    ProductId: number;
    Quantity: number;
    UserId: number;
    StoreId: number;
}

export interface userSignInResponse {
    User: {
        UserID: number;
        UserName: string;
        Email: string;
        StoreID: number;
        RoleID: number;
        RoleName: string;
    };
    Token: string;
}