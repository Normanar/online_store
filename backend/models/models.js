const sequelize = require('../db')

// импортирую класс DataTypes с помощью которого описываются типы того или иного поля
const {INTEGER, STRING} = require('sequelize')

// описываю модели
const User = sequelize.define('user', {
    id: {type: INTEGER, primaryKey: true, autoIncrement: true},
    email: {type: STRING, unique: true},
    password: {type: STRING},
    role: {type: STRING, defaultValue: "USER"},
})

const Basket = sequelize.define('basket', {
    id: {type: INTEGER, primaryKey: true, autoIncrement: true},
})

const BasketDevice = sequelize.define('basket_device', {
    id: {type: INTEGER, primaryKey: true, autoIncrement: true},
})

const Device = sequelize.define('device', {
    id: {type: INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: STRING, unique: true, allowNull: false},
    price: {type: INTEGER, allowNull: false},
    rating: {type: INTEGER, defaultValue: 0},
    img: {type: STRING, allowNull: false},
})

const Type = sequelize.define('type', {
    id: {type: INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: STRING, unique: true, allowNull: false},
})

const Brand = sequelize.define('brand', {
    id: {type: INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: STRING, unique: true, allowNull: false},
})

const Rating = sequelize.define('rating', {
    id: {type: INTEGER, primaryKey: true, autoIncrement: true},
    rate: {type: INTEGER, allowNull: false},
})

const DeviceInfo = sequelize.define('device_info', {
    id: {type: INTEGER, primaryKey: true, autoIncrement: true},
    title: {type: STRING, allowNull: false},
    description: {type: STRING, allowNull: false},
})

// описание связей моделей друг с другом

const TypeBrand = sequelize.define('type_brand', {
    id: {type: INTEGER, primaryKey: true, autoIncrement: true},
})

User.hasOne(Basket)
Basket.belongsTo(User)

User.hasMany(Rating)
Rating.belongsTo(User)

Basket.hasMany(BasketDevice)
BasketDevice.belongsTo(Basket)

Type.hasMany(Device)
Device.belongsTo(Type)

Brand.hasMany(Device)
Device.belongsTo(Brand)

Device.hasMany(Rating)
Rating.belongsTo(Device)

Device.hasMany(BasketDevice)
BasketDevice.belongsTo(Device)

Device.hasMany(DeviceInfo)
DeviceInfo.belongsTo(Device)

// при связи "многим ко многим", создается промежуточная таблица, в которой хранится информация о том какой бренд
// принадлежит какому типу и какой тип связан с каким брендом, поэтому передается вторым аргументом объект со
// свойством "through" где указываем связующую таблицу

Type.belongsToMany(Brand, {through: TypeBrand})
Brand.belongsToMany(Type, {through: TypeBrand})

module.exports =
    {
        User,
        Basket,
        BasketDevice,
        Device,
        Type,
        Brand,
        Rating,
        DeviceInfo
    }