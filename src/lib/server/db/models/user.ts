import {
    Table,
    Column,
    Model,
    DataType,
    CreatedAt,
    UpdatedAt,
    HasMany
} from 'sequelize-typescript';
import Media from "./media.js";
import Device from "./device.js";

// USER SCHEMA DEFINITION
@Table({
    timestamps: true,
    tableName: "users",
    modelName: "User"
})
class User extends Model<UserAttributes> {

    // IDENTIFIERS
    @Column({
        primaryKey: true,
        type: DataType.UUID,
        defaultValue: DataType.UUIDV4
    })
    declare id: string;

    @Column({
        unique: true,
        type: DataType.STRING(15),
        allowNull: false
    })
    declare username: string;

    // SECURITY
    @Column({
        type: DataType.STRING(128),
        allowNull: false
    })
    declare password: string;

    // ASSOCIATIONS
    @HasMany(() => Media, {
        foreignKey: 'username',
        sourceKey: 'username'
    })
    medias: Media[];

    @HasMany(() => Device, {
        foreignKey: 'username',
        sourceKey: 'username'
    })
    devices: Device[];

    @CreatedAt
    declare created_at: Date;

    @UpdatedAt
    declare updated_at: Date;
}

export default User;