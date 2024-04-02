interface UserAttributes {
    id?: string;
    username: string;
    password: string;
    refresh_token?: string;
    created_at?: Date;
    updated_at?: Date;
}

interface DevicesAttributes {
    id?: string;
    token?: string;
    device?: string;
    username: string;
}

interface MediaAttributes {
    id: string;
    title: string;
    link: string;
    current_episode: number;
    total_episodes: number;
    rating: number;
    description: string;
    type: string;
    status: string;
    created_at: Date;
    updated_at: Date;
    username: string;
}