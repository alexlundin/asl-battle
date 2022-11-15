export interface IBattle {
    id: string;
    title: string;
    content: string;
    first_argument_head: string;
    second_argument_head: string;
    rating: string;
    username: string;
    arguments: IArgument[]
}

export interface IArgument {
    id: string;
    id_item: string;
    argument: string;
    rating: string;
    title: string;
    text: string;
    moderate: string;
    username: string;
}
