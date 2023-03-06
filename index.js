const { Sequelize, DataTypes } = require('sequelize');

// Option 3: Passing parameters separately (other dialects)
const sequelize = new Sequelize('1tdb', 'root', 'ABC1efg22001q', {
    host: 'localhost',
    dialect: 'mysql'
});

const User = sequelize.define('author', {
    // Model attributes are defined here
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    first_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    last_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    birthday: {
        type: DataTypes.DATE,
        allowNull: true
    }
}, {
    // Other model options go here
    tableName: 'authors',
    timestamps: false
});


const Book = sequelize.define('books', {
    // Model attributes are defined here
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    published: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    genre_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    author_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    // Other model options go here
    tableName: 'books',
    timestamps: false
});


; (async () => {
    try {
        await User.sync({
            alter: true,
            force: false
        });

        await Book.sync({
            alter: true,
            force: false
        });


        //Получения списка из таблицы
        const user_find = await User.findAll();
        //Получение элемента по идентификатору и удаление его
        const user_destroy = await User.findByPk(4);
        user_destroy.destroy();
        user_destroy.save();
    
        //Добавление элемента
        const book_create = await Book.create({
            name: "Война и Мир Z",
            published: "2023",
            genre_id: "6",
            author_id: "18"
        });
        book_create.save();
       
            //Редактирование элемента
            const book_rename = await Book.findOne({
                where: {
                    name: "Война и мир Z"
                }
            });
            book_rename.first_name = "Война и мир V";
            book_rename.save();
        
         const user_find_where = await User.findAll({
             where: {
                 first_name: "Лев"
             }
         });

        console.log(user_find);
        console.log(user_destroy);
        console.log(book_create.id);
        console.log(book_rename);
        console.log(user_find_where);

    } catch (error) {
        console.error(error);
    }
})();

