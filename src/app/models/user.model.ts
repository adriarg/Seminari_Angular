// Interfaz que define la estructura de un usuario
export interface User {
    id?: number | string;
    _id?: string;
    name: string;
    age: number;
    email: string;
    password?: string;
}

// Clase concreta que implementa la interfaz User para poder crear instancias
export class UserModel implements User {
    id?: number | string;
    _id?: string;
    name: string = "";
    age: number = 0;
    email: string = "";
    password?: string;
    
    constructor(data?: Partial<User>) {
        if (data) {
            this.id = data.id;
            this._id = data._id;
            this.name = data.name || "";
            this.age = data.age || 0;
            this.email = data.email || "";
            this.password = data.password;
        }
    }
}
  