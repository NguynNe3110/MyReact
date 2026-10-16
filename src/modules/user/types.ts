export type UserAddress = {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: Geo
}

export type Geo = {
    lat: string;
    lng: string;
}


export type UserCompany = {
    name: string;
    catchPhrase: string;
    bs: string;
}

export type User = {
    id: number;
    name: string, 
    username: string;
    email: string;
    phone: string;
    website: string;
    company: UserCompany;
    address: UserAddress;
}

export type Profile = {
    name: string, 
    email: string, 
    phone: string, 
}