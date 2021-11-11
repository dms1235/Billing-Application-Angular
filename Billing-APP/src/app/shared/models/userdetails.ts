export interface IUserLogIn {
    username: string;
    password: string;
  }


  export class iUserLogIn implements IUserLogIn   {
    username = ""
    password = ""
  }

  export interface IUserDetails {
    UserName: any;
    Password:  any;
    IsActive:  any;
    Name:  any;
    Email:  any;
    MobileNumber:  any;
    ExpireDate:any;
  }
  

  export class iUserDetails implements IUserDetails{
    UserName: "";
    Password:  "";
    IsActive:  "";
    Name:  "";
    Email:  "";
    MobileNumber:  "";
    ExpireDate:"";
  }

  export interface IUserRegisters{
    username: string;
    password: string;
    email:any;
    MobileNumber:any;
    Name:string;
    IsActive:boolean;
  }


  export class iUserRegister implements IUserRegisters   {
    username = ""
    password = ""
    email:""
    MobileNumber:""
    Name:""
    IsActive:true
  }
  

  export interface IUserResponse {
    Entity: any;
    DetailsEnglish:any;
    Status:any;
    MessageEnglish:any;
    CachingStatus:any
  }
  

  export class iUserRegisterResponse implements IUserResponse{
    Entity: "";
    DetailsEnglish:  "";
    Status:  "";
    MessageEnglish:  "";
    CachingStatus:  "";
  }