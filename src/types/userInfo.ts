export namespace User {
  export type Photo = {
    id: number;
    image: string | null;
  };

  export type Interests = {
    id: number;
    title: string | null;
  };
}

export type UserInfo = any;
