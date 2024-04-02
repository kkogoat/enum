import { 
    Table,
    Model,
    Column,
    DataType,
    PrimaryKey,
    BelongsTo,
    CreatedAt,
    UpdatedAt,
} from "sequelize-typescript";
import User from './user.js';

// TOKEN SCHEMA DEFINITION
@Table({
    timestamps: true,
    tableName: "devices",
    modelName: "Device"
})
class Device extends Model<DevicesAttributes> {
    
    // IDENTIFIERS
    @PrimaryKey
    @Column({
        type: DataType.UUID,
        defaultValue: DataType.UUIDV4
    })
    declare id: string;

    @Column({
        type: DataType.STRING,
    })
    declare token: string;

    // DATA
    @Column({
        type: DataType.STRING
    })
    declare device: string;

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

export default Device;