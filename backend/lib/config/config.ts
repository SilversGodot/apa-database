const config = {
    app: {
        port: process.env.PORT || 3000
    },
    db: {
        mongoUrl: process.env["MONGODB_URI"] || 'mongodb+srv://apa-admin:nov11222@apa-database.hszts.mongodb.net/apa?retryWrites=true&w=majority'
    },
    jwt: {
        secret: process.env["JWT_SECRET"] || 'TopSecret'
    }
};

export default config;