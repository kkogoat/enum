import {
    Table,
    Column,
    Model,
    DataType,
    CreatedAt,
    UpdatedAt,
    BelongsTo
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
        primaryKey: true,
        type: DataType.UUID,
        defaultValue: DataType.UUIDV4
    })
    declare id: string;

    // DATA
    @Column({
        type: DataType.STRING(100),
        allowNull: false
    })
    declare title: string;

    @Column({
        type: DataType.STRING(100),
    })
    declare link: string;

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
        type: DataType.STRING(200)
    })
    declare description: string;

    @Column({
        type: DataType.STRING(15)
    })
    declare type: string;

    @Column({
        type: DataType.STRING(15)
    })
    declare status: string;

    // ASSOCIATIONS 
    @BelongsTo(() => User, {
        foreignKey: 'username',
        targetKey: 'username'
    })
    user: User;

    @CreatedAt
    declare created_at: Date;

    @UpdatedAt
    declare updated_at: Date;
}

export default Media;