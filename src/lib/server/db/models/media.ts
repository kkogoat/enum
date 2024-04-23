import {
    Table,
    Column,
    Model,
    DataType,
    CreatedAt,
    UpdatedAt,
    BelongsTo,
    PrimaryKey
} from 'sequelize-typescript';
import User from './user.js';

// MEDIA SCHEMA DEFINITION
@Table({
    timestamps: true,
    tableName: "medias",
    modelName: "Media"
})
class Media extends Model<MediaAttributes> {
    
    // IDENTIFIERS
    @Column({
        unique: true,
        type: DataType.UUID,
        defaultValue: DataType.UUIDV4
    })
    declare id: string;

    // DATA
    @PrimaryKey
    @Column({
        type: DataType.STRING(100),
        allowNull: false
    })
    declare title: string;

    @Column({
        type: DataType.STRING(100),
        defaultValue: ""
    })
    declare link: string;

    @Column({
        type: DataType.STRING
    })
    declare image: string;

    @Column({
        type: DataType.INTEGER,
        defaultValue: 0
    })
    declare current_episode: number;

    @Column({
        type: DataType.INTEGER,
    })
    declare total_episodes: number;

    @Column({
        type: DataType.FLOAT,
    })
    declare rating: number;

    @Column({
        type: DataType.STRING(5000)
    })
    declare description: string;

    @PrimaryKey
    @Column({
        type: DataType.STRING(15),
        defaultValue: ""
    })
    declare type: string;

    @Column({
        type: DataType.STRING(15),
        defaultValue: ""
    })
    declare status: string;

    // ASSOCIATIONS 
    @PrimaryKey
    @Column({
        type: DataType.STRING(15),
        allowNull: false
    })
    declare username: string;

    @BelongsTo(() => User, {
        foreignKey: 'username',
        targetKey: 'username',
    })
    user: User;

    @CreatedAt
    declare created_at: Date;

    @UpdatedAt
    declare updated_at: Date;
}

export default Media;