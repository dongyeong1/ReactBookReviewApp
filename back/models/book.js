module.exports=(sequelize,DataTypes)=>{
    const Book =sequelize.define('Book',{
        
        bookname:{
            type:DataTypes.STRING(200),
            allowNull:false,
        },
        isbn:{
            type:DataTypes.BIGINT,
            allowNull:false
        }
      
    },{
        charset:'utf8mb4',
        collate:'utf8mb4_general_ci'
    })
    Book.associate=(db)=>{
    
        db.Book.hasMany(db.Post)
        db.Book.hasOne(db.Image)
    };
    return Book;
}